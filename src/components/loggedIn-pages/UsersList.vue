<template>
    <div class="users">

        <!-- User modal -->
        <b-modal hide-footer id="userModal" title="Contact"> 
            <UserModal v-bind:userInfo="currentUser"/>
        </b-modal>

        <!-- Search bar -->
        <div class="search-bar">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search user"
                v-model="searchInput"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">
                        Search
                    </button>
                </div>
            </div>
        </div>

        <!-- List of users -->
        <div class="users-list">
            <h4>Users</h4>
            <ul class="list-group">
                <li class="list-group-item" :id="`item-${user.id}`"
                    :class="{ active: index == currentIndex }"
                    v-for="(user, index) in filteredList"
                    :key="index"
                    @click="setActiveUser(user, index)"
                >
                    <b-button v-b-modal.userModal>Show modal</b-button>
                    <b-button :id="`userPopover-${user.id}`">Show popover</b-button>
                    <b-popover class="popover"
                        :target="`userPopover-${user.id}`"
                        placement="right" 
                        title="Contact"
                        triggers="hover focus"
                    >
                        <UserPopover v-bind:userInfo="user"/>
                    </b-popover>
                    <b-avatar v-if="user.profileImg != null" 
                        :src="'http://localhost:8080/eventor/files/file/' 
                        + user.profileImg" size="lg">
                    </b-avatar>
                    {{ user.username }} NAMES: {{ user.firstName }} {{ user.lastName }}

                    <!-- Change user role -->
                    <div v-if="showAdminButtons(user)">
                        <b-button v-if="user.roles.length > 1" @click="updateRole(user, 2)" variant="info" class="m-1">User only</b-button>
                        <b-button v-else @click="updateRole(user, 1)" variant="info" class="m-1">Make Admin</b-button>

                        <b-button @click="deleteUser(user)" variant="info" class="m-1">Delete user</b-button>
                    </div>

                    
                </li>
            </ul>
        </div>

         <!-- Updated role & Delete user alert -->
         <b-alert
            class="position-fixed fixed-bottom m-2 rounded-1"
            :show="dismissCountDown"
            dismissible
            :variant="success || deleted ? 'success' : 'warning'"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            {{ message }}
        </b-alert>
    </div>
</template>

<script>
import $ from 'jquery';
import UserModal from "./UserModal";
import UserPopover from "./UserPopover";
import UserDataService from "../../services/UserDataService";

export default {
    name: "users-list",
    components: {
        UserModal,
        UserPopover
    },
    data() {
        return {
        users: [],
        currentUser: null,
        currentIndex: -1,
        searchInput: "",
        success: false,
        deleted: false, 
        message: "",
        dismissSecs: 3,
        dismissCountDown: 0
        };
    },
    methods: {
        retrieveUsers() {
            if(this.loggedUser)
            {
                UserDataService.getAll()
                .then(response => {
                this.users = response.data;
                console.log(response.data);
                })
                .catch(e => {
                console.log(e);
                });
            }
        },

        refreshList() {
        this.retrieveUsers();
        this.currentUser = null;
        this.currentIndex = -1;
        },

        setActiveUser(user, index) {
            console.log(user);
        this.currentUser = user;
        this.currentIndex = index;
        },

        updateRole(user, roles)
        {
            this.success = false;
            UserDataService.updateRole(this.loggedUser.id, user)
            .then(response => {
                this.success = response.data.item;
                this.message = "Role changed successfully!";
                if(roles == 1)
                {
                    user.roles.length = 2;
                }
                else 
                {
                    user.roles.length = 1;
                }
            })
            .catch(e => {
                this.message = "Something went wrong: " + e;
            });
            this.dismissCountDown = this.dismissSecs;
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAdminButtons(user) {
        if (this.loggedUser && this.loggedUser.roles && this.loggedUser.id != user.id) {
            return this.loggedUser.roles.includes('ROLE_ADMIN');
        }

        return false;
        },

        deleteUser(user) {
            this.deleted = false;
            UserDataService.delete(user.id)
            .then(response => {
                if(response.status == 200)
                { this.deleted = true; }
                this.message = "User deleted successfully";
                this.userVisible(user);

            })
            .catch(e => {
                this.message = "Something went wrong: " + e;
            });
            this.dismissCountDown = this.dismissSecs;
        },

        userVisible(user)
        {
            if(this.deleted)
            {
                $(`#item-${user.id}`).css({'display':'none'});
            }
            else 
            {
                $(`#item-${user.id}`).css({'display':'block'});
            }
        }

    },
    computed: {
        loggedUser() {
            return this.$store.state.auth.user;
        },
        filteredList() {
            return this.users.filter(user => {
                return user.username.toLowerCase().includes(this.searchInput.toLowerCase()) ||
                (user.firstName && user.firstName.toLowerCase().includes(this.searchInput.toLowerCase())) ||
                (user.lastName && user.lastName.toLowerCase().includes(this.searchInput.toLowerCase()))
            })
        }
    },
    mounted() {
        if (!this.loggedUser) {
            this.$router.push('/'); //old (for example) = this.$router.push('/login');
        }
        this.retrieveUsers();
    }
}
</script>

<style scoped>
.users {
    margin: 10px;
    align-content: center;
}
.users-list {
    width: 50%;
    margin: 0 auto;
}
.popover {
    min-width: 30em !important;
}
</style>