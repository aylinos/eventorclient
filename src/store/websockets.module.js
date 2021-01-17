import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import NotificationDataService from './../services/NotificationDataService';

export const websockets = {
    namespaced: true,
    state: {
        stompClient: null,
        newNotifications: [],
        recentNotifications: [],
        notificationsdb: [],
        connected: false
    },
    actions: {
        initializeNewNotifications({commit})
        {
            commit('initialNewNotifications');
        },
        initializeRecentNotifications({commit})
        {
            commit('initialRecentNotifications');
        },
        initializeNotificationsDB({commit})
        {
            commit('initialNotificationsDB');
        },
        getAllNotificationsDB({commit})
        {
            let currentUser = JSON.parse(localStorage.getItem('user'));
            NotificationDataService.getAll(currentUser)
            .then(response => {
                if(response.data.item)
                { 
                    let notifications = response.data.item;
                    for(var notification in notifications)
                    {
                        if(!notifications[notification].opened)
                        {
                            commit('saveNewNotification', notifications[notification]);
                        }
                        else 
                        {
                            commit('saveNotificationDB', notifications[notification]);
                        }
                    }
                }
            })
            .catch(e => {
            console.log(e);
            });
        },
        connect({commit}) {
            this.socket = new SockJS("http://localhost:8080/gs-guide-websocket");
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
              {},
              frame => {
                console.log(frame);
                let notification = '';
                let currentUser = JSON.parse(localStorage.getItem('user'));
                this.stompClient.subscribe("/notifications/subscribers", tick => {
                if(currentUser.id == JSON.parse(tick.body).event.creator.id)
                {
                    console.log("yes");
                    notification = JSON.parse(tick.body);
                    commit('saveNewNotification', notification);
                }
                })
                commit('saveStompClient', this.stompClient);
              },
              error => {
                console.log(error);
              }
            );
        },
        disconnect({commit}) {
            commit('removeStompClient');
            commit('removeNotifications');
        },
        emptyNotificationsCounter({commit})
        {
            commit('emptyNotificationsCounter');
        },
        emptyRecentNotifications({commit})
        {
            commit('emptyRecentNotifications');
        }
    },
    mutations: {
        initialNewNotifications(state)
        {
            let newNotifications = [];
            newNotifications = JSON.parse(localStorage.getItem('newNotifications'));
            if(newNotifications && newNotifications.length > 0)
            { state.newNotifications = newNotifications; }
        },
        initialRecentNotifications(state)
        {
            let recentNotifications = [];
            recentNotifications = JSON.parse(localStorage.getItem('recentNotifications'));
            if(recentNotifications && recentNotifications.length > 0)
            { state.recentNotifications = recentNotifications; }
        },
        initialNotificationsDB(state)
        {
            let allNotifications = [];
            allNotifications = JSON.parse(localStorage.getItem('notificationsDB'));
            if(allNotifications && allNotifications.length > 0)
            { state.notificationsdb = allNotifications; }
        },
        saveStompClient(state, stompClient)
        {
            state.stompClient = stompClient;
            state.connected = true;
        },
        saveNewNotification(state, recent)
        {
            state.newNotifications.push(recent); //push to last 
            localStorage.setItem('newNotifications', JSON.stringify(state.newNotifications));
            state.recentNotifications.unshift(recent); //push to front
            localStorage.setItem('recentNotifications', JSON.stringify(state.recentNotifications));
        },
        saveNotificationDB(state, notification)
        {
            state.notificationsdb.unshift(notification);
            localStorage.setItem('notificationsDB', JSON.stringify(state.notificationsdb));
        },
        removeStompClient(state)
        {
            state.stompClient.disconnect();
            state.stompClient = null;
            state.connected = false;
        },
        emptyNotificationsCounter(state)
        {
            state.newNotifications.splice(0);
            localStorage.setItem('newNotifications', JSON.stringify(state.newNotifications));
        },
        emptyRecentNotifications(state)
        {
            for(var notification in state.recentNotifications)
            {
                state.notificationsdb.unshift(state.recentNotifications[notification]);
            }
            state.recentNotifications.splice(0);
            localStorage.setItem('recentNotifications', JSON.stringify(state.recentNotifications));
            localStorage.setItem('notificationsDB', JSON.stringify(state.notificationsdb));
        },
        removeNotifications(state)
        {
            state.newNotifications.splice(0);
            state.recentNotifications.splice(0);
            state.notificationsdb.splice(0);
            localStorage.removeItem('newNotifications');
            localStorage.removeItem('recentNotifications');
            localStorage.removeItem('notificationsDB');
        }
    }
};