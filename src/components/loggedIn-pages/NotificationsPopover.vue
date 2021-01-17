<template>
    <div class="body">

        <!-- User modal -->
        <b-modal hide-footer id="userModal" title="Contact"> 
            <UserModal v-bind:userInfo="currentSender"/>
        </b-modal>

        <div v-if="newNotifications.length">
            <b-list-group 
                v-for="(notification, index) in newNotifications"
                :key="index"
            >
                <b-list-group-item class="flex-column align-items-start text-white newNotification" @click="setActiveUser(notification.sender)" v-b-modal.userModal>
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ notification.sender.firstName }} {{notification.sender.lastName}}</h5>
                        </div>

                        <p class="mb-1">
                        subscribed to
                        </p>

                        <h5 class="mb-1">{{ notification.event.title }}</h5>

                        <small>{{ formatDate(notification.created) }}</small>
                </b-list-group-item>
            </b-list-group>
        </div>

        <!-- Notifications list -->
        <div v-if="allNotifications">
            <b-list-group 
                v-for="(notification, index) in allNotifications"
                :key="index"
            >
                <b-list-group-item class="flex-column align-items-start bg-dark text-white-50 openedNotification" @click="setActiveUser(notification.sender)" v-b-modal.userModal>
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ notification.sender.firstName }} {{notification.sender.lastName}}</h5>
                        </div>

                        <p class="mb-1">
                        subscribed to
                        </p>

                        <h5 class="mb-1">{{ notification.event.title }}</h5>

                        <small>{{ formatDate(notification.created) }}</small>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import UserModal from "./UserModal";

export default {
    props: {
        newNotifications: Array,
        allNotifications: Array
    },
    components: {
        UserModal
    },
    data() {
        return {
            currentSender: '',
        }
    },
    methods: {
        setActiveUser(sender) {
            this.currentSender = sender;
        },
        formatDate(date) {
            if(!date)
            {
                return "Time is not available yet";
            }
            return moment(String(date)).format('DD/MM/YYYY HH:mm')
        },
    },
}
</script>

<style scoped>
.body{
    margin: 0;
    padding: 0;
}
.newNotification {
    background-color: rgb(55, 235, 55);
    border-radius: 0.7rem!important
}
.openedNotification {
    border-radius: 0.7rem!important
}
.list-group { 
    margin: 0;
    width: 100%;
 } 
</style>