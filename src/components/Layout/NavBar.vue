<template>
    <div>
        <b-navbar toggleable="lg" class="navbar">
            <b-navbar-brand class="mr-auto logo-item">
                <router-link :to = "{name: 'front-page'}" class="nav-link">
                            <img src="../../assets/logo.png" width="300" alt="Eventor logo">
                </router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                

            <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto menu-items">
                    <b-navbar-nav class="content-items">
                        <b-nav-item>
                            <router-link :to = "{name: 'about'}" class="nav-link">
                            About
                            <i class="" />
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link :to = "{name: 'events'}" class="nav-link">
                            Events
                            <i class="" />
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link :to = "{name: 'services'}" class="nav-link">
                            Services
                            <i class="" />
                            </router-link>
                        </b-nav-item>
                    </b-navbar-nav>
                    <!-- <b-nav-item id="log-in">
                        <router-link :to = "{name: 'log-in'}" class="nav-link">
                        Log in
                        <i class="" />
                        </router-link>
                    </b-nav-item> -->
                    <b-nav-item id="sign-up">
                        <router-link :to = "{name: 'sign-up'}" class="nav-link">
                        Immerge
                        <i class="" />
                        </router-link>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <!-- Logged in user -->
        <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <!-- <b-nav-item-dropdown right> -->
        <!-- Using 'button-content' slot -->
            <!-- <template #button-content>
                <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
@import 'https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css';

.navbar{
    background-color:white;
 }
 .content-items .nav-link{
     color:#1ddb1d!important;
 }
.nav-link{
     color:#1ddb1d!important;
     font-size: 27px;
 }
 .nav-link:hover{
     color:  #1beb1b!important;
 }
 .nav-link:focus{
     color:  #1beb1b!important;
     text-decoration:underline;
 }
 #sign-up{
     background-color: #FAFF06!important;
 }
</style> 