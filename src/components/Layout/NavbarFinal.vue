<template>
<div class="navbar-div">
        <!-- NavBar fixed-top in class "" -->
        <b-navbar toggleable="lg" class="navbar fixed-top">

            <!-- Logo -->
            <b-navbar-brand class="mr-auto logo-item">
                <a class="logo-link" href="#landingPage" v-smooth-scroll="{ duration: 2000 }">
                        <img src="../../assets/logo.png" id="logo" alt="Eventor logo">
                </a>
            </b-navbar-brand>

            

            <!-- Collapse the following menu items on smaller screen -->
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                
                <b-collapse id="nav-collapse" is-nav>

                    <!-- Menu items -->
                    <b-navbar-nav class="ml-auto content-items">

                        <b-nav-item class="nav-item" v-if="!currentUser">
                            <a class="nav-link" href="#about" v-smooth-scroll="{ duration: 2000 }">
                            About
                            </a>
                        </b-nav-item>

                        <b-nav-item class="nav-item" v-if="!currentUser">
                            <a class="nav-link" id="immerge-item" href="#logIn-signUp" v-smooth-scroll="{ duration: 2000 }">
                            <b-icon id="immerge-icon" icon="people-fill" scale="1.5"></b-icon>
                            Immerge
                            </a>
                        </b-nav-item>

                        <b-nav-item class="nav-item" v-if="currentUser">
                            <router-link :to = "{name: 'events-my'}" class="nav-link" id="events-link">
                            My events
                            </router-link>
                        </b-nav-item>

                        <b-nav-item class="nav-item" v-if="currentUser">
                            <router-link :to = "{name: 'events-subscribed'}" class="nav-link" id="events-link">
                            Subscriptions
                            </router-link>
                        </b-nav-item>

                        <b-nav-item class="nav-item" v-if="currentUser">
                            <router-link :to = "{name: 'events'}" class="nav-link" id="events-link">
                            Discover
                            </router-link>
                        </b-nav-item>
                        <b-nav-item class="nav-item" v-if="currentUser">
                            <router-link :to = "{name: 'add'}" class="nav-link" id="add-event">
                            Organize
                            </router-link>
                        </b-nav-item>

                        <b-nav-item class="nav-item" v-if="currentUser">
                            <router-link to="/eventor/users" class="nav-link">Users</router-link>
                        </b-nav-item>

                        <b-nav-item class="nav-item" id="notifications" v-if="currentUser">
                            <notification-bell 
                                id="notificationBell"
                                :count ="newNotifications.length" 
                                :upperLimit="20"
                                :size="27" 
                                counterLocation="upperRight"
                                counterPadding="0.1em"
                                counterStyle="round"
                                iconColor="rgb(159, 161, 160)"
                                counterBackgroundColor="rgb(55, 235, 55)"
                            /> 
                        </b-nav-item>
                        <b-popover class="popover" animation
                                target="notifications"
                                placement="bottom"
                                triggers="click"
                                v-if="currentUser"
                                @show="openNotifications"
                                @hidden="changeNotificationsStatus"
                        >
                            <NotificationsPopover v-bind:newNotifications="recentNotifications" v-bind:allNotifications="notificationsDB" />
                        </b-popover>

                        <b-nav-item class="nav-item">
                            <router-link v-if="currentUser" to="/eventor/profile" class="nav-link"> {{ currentUser.username }}</router-link>
                        </b-nav-item>
                        
                        <b-nav-item class="nav-item" v-if="currentUser">
                            <a class="nav-link" href @click.prevent="logOut">
                                LogOut
                            </a>
                        </b-nav-item>

                    </b-navbar-nav>

                </b-collapse>

        </b-navbar>
</div>
</template>

<script>
import NotificationBell from 'vue-notification-bell'
import NotificationsPopover from '../loggedIn-pages/NotificationsPopover'
import NotificationDataService from '../../services/NotificationDataService'

export default {
    components: {
        NotificationBell,
        NotificationsPopover
    },
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    newNotifications() {
      return this.$store.state.websockets.newNotifications;
    },
    recentNotifications() {
        return this.$store.state.websockets.recentNotifications;
    },
    notificationsDB() {
        return this.$store.state.websockets.notificationsdb;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('websockets/disconnect');
      this.$store.dispatch('auth/logout');
      this.$router.push('/eventor');
    },
    openNotifications() {
        console.log("opened");
        this.$store.dispatch('websockets/emptyNotificationsCounter');
    },
    changeNotificationsStatus() {
        console.log("close");
        if(this.recentNotifications && this.recentNotifications.length > 0)
        {
            NotificationDataService.changeStatus(this.recentNotifications)
            .then(response => {
                if(response.data.item == true)
                { 
                    this.$store.dispatch('websockets/emptyRecentNotifications');
                }
            })
            .catch(e => {
            console.log(e);
            });
        }
    }
  },
  mounted() {
    if(this.currentUser)
    {
        this.$store.dispatch('websockets/connect').then(
            () => {
                this.$store.dispatch('websockets/initializeNewNotifications').then(
                    () => {
                        this.$store.dispatch('websockets/initializeRecentNotifications').then(
                            () => {
                                this.$store.dispatch('websockets/initializeNotificationsDB');
                            }
                        )
                    }
                )
            }
        )
    }
  }
}
</script>

<style scoped>

    .popover {
        min-width: 30em !important;
    }
    /* Height of the navbar component - other pages start below this height of the SPA */
    .navbar-div{
        height: 80px;
        margin-bottom: 3px;
        /* box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22); */
    }

    .navbar{
        /* position: fixed; */
        /* top: 0; */
        width: 100%;
        background-color:white;
    }

    #logo {
        width: 300px;
    }

    /* All menu items */
    .nav-link{
        /* No added color - i like default one */
        font-size: 20px;
    }
    .nav-link:hover{
        color: rgb(55, 235, 55)!important;
    }
    .nav-link:focus{
        color:  rgb(55, 235, 55)!important;
    }

    /* Immerge menu item */
    #immerge-item {
        color: white;
        border-radius: 15px;
        background: -webkit-linear-gradient(left,rgb(182, 150, 245), rgb(55, 235, 55));
    }
    #immerge-item:hover{
        color: white!important;
        background: -webkit-linear-gradient(left, rgb(55, 235, 55), rgb(182, 150, 245));
    }
    #immerge-item:focus{
        color:white!important;
        background: -webkit-linear-gradient(left, rgb(55, 235, 55), rgb(182, 150, 245));
    }
    #immerge-icon{
        color:white;
    }
    #notifications{
        background-color: rgb(239, 255, 230);
        margin: 10px;
        border-radius: 10px;
    }
    #notifications:hover{
        background-color: rgb(221, 252, 215);
    }
    #sidebar-right{
        width: 130px;
  position: fixed;
  z-index: 1;
  top: 20px;
  left: 10px;
  background: #eee;
  overflow-x: hidden;
  padding: 8px 0;
    }
    

@media only screen and (max-width:130px){
    .navbar-div{
        height: 100px;
    }
    #logo {
        width: 50px;
    }
}

@media only screen and (min-width:131px) and (max-width:187px){
    .navbar-div{
        height: 100px;
    }
    #logo {
        width: 100px;
    }
}

@media only screen and (min-width:188px) and (max-width:260px){
    .navbar-div{
        height: 60px;
    }
    #logo {
        width: 100px;
    }
}

@media only screen and (min-width:261px) and (max-width:380px){
    .navbar-div{
        height: 60px;
    }
    #logo {
        width: 170px;
    } 

}
@media only screen and (min-width:381px) and (max-width:790px){
    .navbar-div{
        height: 70px;
    }
    #logo {
        width: 250px;
    }
}
    
</style>