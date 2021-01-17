<template>
    <div class="body">

        <!-- Search bar -->
        <div class="input-group searchBar">

            <!-- Lens box with search icon -->
            <span class="input-group-text" id="lensBox">
                <mdbIcon icon="search"/>
            </span>

            <!-- Search input box -->
            <input class="form-control searchInput" 
                type="text" 
                placeholder="Search event" 
                v-model="searchInput" />

            <!-- Filter -->
            <b-dropdown right text="Filter" variant="green"
                id="filterDropdown"
                class="filterDropdown" >
                <b-dropdown dropright text="Type" variant="green" 
                    id="typeDropdown"
                    class="typeDropdown">
                    <b-dropdown-item href="#">Concert</b-dropdown-item>
                    <b-dropdown-item href="#">Study</b-dropdown-item>
                </b-dropdown>
                <b-dropdown-item href="#">Date</b-dropdown-item>
                <b-dropdown-item href="#">Location</b-dropdown-item>
            </b-dropdown>
        </div>

        <!-- Events list -->
        <b-card-group deck class = "row" v-if="filteredList.length">
            <!-- Event card -->
            <router-link id="cardLink"
                :disabled="!cardLink" 
                :event="cardLink ? 'click' : ''"
                :to = "{name: 'event-details', params: {id: event.id}}"
                :class="{ active: index == currentIndex }"
                v-for="(event, index) in filteredList"
                :key="index">
                <b-card class="card" bg-variant="dark" text-variant="white" :id="`item-${event.id}`"
                    @mouseover="setActiveEvent(event, index)">
                    <h4 id="title"> {{ event.title }} </h4>
                    <b-card-text>
                        <i id="date" class="fas fa-calendar-alt"> {{ formatDate(event.startDate) }} </i>
                    </b-card-text>

                    <div v-if="!isCreator(event)">
                        <button id="unsubscribeButton" v-if="isSubscribed(event)" @click="unsubscribe">
                            Unsubscribe
                        </button>
                        <button id="subscribeButton" v-else @click="subscribe">
                            Subscribe
                        </button>
                    </div>

                    <div v-else>
                        <button @click="disableCardLink" id="statisticsButton" v-b-modal.statisticsModal>
                            Statistics
                        </button>
                    </div>

                    <!-- Delete event -->
                    <div v-if="showAdminButtons()">
                        <b-button @click="deleteEvent(event)" variant="info" class="m-1">Delete event</b-button>
                    </div>

                </b-card>
            </router-link>
        </b-card-group>

        <!-- No results message  -->
        <p id="noResultsParagraph" v-else> Nothing found </p>

        <!-- Statistics modal -->
        <b-modal hide-footer id="statisticsModal" title="Statistics" @hidden="enableCardLink"> 
            <StatisticsModal v-bind:eventInfo="currentEvent"/>
        </b-modal>

        <!-- Delete event alert -->
         <b-alert
            class="position-fixed fixed-bottom m-2 rounded-1"
            :show="dismissCountDown"
            dismissible
            :variant="deleted ? 'success' : 'warning'"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            {{ message }}
        </b-alert>

    </div>
</template>

<script>
import $ from 'jquery';
import moment from 'moment';
import { mdbIcon } from 'mdbvue';
import StatisticsModal from "./loggedIn-pages/StatisticsModal";
import EventDataService from "../services/EventDataService";
import SubscriptionDataService from "../services/SubscriptionDataService";

export default {
  name: "events-list",
  components: {
    mdbIcon,
    StatisticsModal
  },
  props: {
    content: String,
  },
  data() {
    return {
      events: [],
      subscribedEvents: [],
      currentEvent: null,
      currentIndex: -1,
      searchInput: "",
      subscriptionDate: null,
      date: String,
      cardLink: true,
      deleted: false,
      message: '',
      dismissSecs: 3,
      dismissCountDown: 0
    };
  },
  methods: {
    retrieveEvents() {
      if(this.currentUser)
      {
          if(this.content == "all")
          {
            EventDataService.getAllPublished()
            .then(response => {
                this.events = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
          }
          else if(this.content == "my")
          {
              EventDataService.getMyEvents(this.currentUser)
                .then(response => {
                    this.events = response.data.item;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
          }
          else 
          {
            this.retrieveSubscriptions();
          }
      }
    },

    retrieveSubscriptions()
    {
      SubscriptionDataService.getSubscribedEvents(this.currentUser.id)
      .then(response => {
        this.subscribedEvents = response.data;
        if(this.content == "subscriptions")
        {
          console.log("if");
            this.events = response.data;
        }
      })
      .catch(e => {
            console.log(e);
      });
    },

    refreshList() {
      this.retrieveEvents();
      this.currentEvent = null;
      this.currentIndex = -1;
    },

    setActiveEvent(event, index) {
      this.currentEvent = event;
      this.currentIndex = index;
    },

    statistics(){
      SubscriptionDataService.getNrSubscriptionsForDate(this.currentEvent.id)
      .then(response => {
          console.log(response);
      })
      .catch(e => {
          console.log(e);
        });
    },

    formatDate(date) {
        if(!date)
        {
            return "Time is not available yet";
        }
        return moment(String(date)).format('DD/MM/YYYY HH:mm')
    },

    disableCardLink() {
        this.cardLink = false;
    },

    enableCardLink() {
        this.cardLink = true;
    },

    send() {
      console.log("events:");
      let stompClient = this.$store.state.websockets.stompClient;
      console.log("events:" + stompClient);
      if (stompClient && stompClient.connected) {
        console.log("send");
        const content = { subscriber: this.currentUser , myEvent: this.currentEvent}
        stompClient.send("/new", JSON.stringify(content), {});
      }
    },

    subscribe(){
      this.disableCardLink();
      this.subscriptionDate = new Date();
      console.log(this.subscriptionDate);
      this.currentEvent.lastSubscription = this.subscriptionDate;
      SubscriptionDataService.subscribeToEvent(this.currentUser.id, this.currentEvent)
      .then(response => {
          console.log(response.data);
          this.send();
          this.retrieveSubscriptions();
          this.enableCardLink();
      })
      .catch(e => {
          console.log(e);
        });
    },

    unsubscribe(){
      this.disableCardLink();
      SubscriptionDataService.unsubscribeToEvent(this.currentUser.id, this.currentEvent)
      .then(response => {
          console.log(response.data);
          this.retrieveSubscriptions();
          this.enableCardLink();
      })
      .catch(e => {
          console.log(e);
        });
    },

    isCreator(event)
    {
        if(event.creator && event.creator.id == this.currentUser.id)
        {
            return true;
        }
        return false;
    },

    isSubscribed(event) {
        for( let subscription of this.subscribedEvents ) {
        if (subscription.id == event.id) {
            return true;
        }
      }
      return false;
    },

    deleteEvent(event) {
        this.disableCardLink();
        this.deleted = false;
        EventDataService.delete(event.id)
        .then(() => {
            this.deleted = true;
            this.message = "Event deleted successfully";
            this.eventVisible(event);
            this.enableCardLink();

        })
        .catch(e => {
            this.message = "Something went wrong: " + e;
        });
        this.dismissCountDown = this.dismissSecs;
    },

    eventVisible(event)
    {
        if(this.deleted)
        {
            $(`#item-${event.id}`).css({'display':'none'});
        }
        else 
        {
            $(`#item-${event.id}`).css({'display':'block'});
        }
    },

    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
    },

    showAdminButtons() {
        if (this.currentUser && this.currentUser.roles) {
            return this.currentUser.roles.includes('ROLE_ADMIN');
        }

        return false;
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    filteredList() {
        if(this.events)
        {
            return this.events.filter(event => {
            return event.title.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            (event.information && event.information.toLowerCase().includes(this.searchInput.toLowerCase()))
        })
        }
        return [];
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/'); 
    }
    this.retrieveEvents();
    if(this.content == "all")
    {
      this.retrieveSubscriptions();
    }
  }
}
</script>

<style scoped>
.body {
    /* border: 3px solid black; */
    margin: 1rem;
}

.searchBar {
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 40vw;
}

#lensBox {
    background-color:rgb(104, 243, 104);
}

.searchInput {
    font-size : 17px;
    border-width: 0 0 3px;
    border-color: rgb(104, 243, 104)
}

.searchInput:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
}

.filterDropdown {
    background-color:rgb(104, 243, 104)!important;
    margin-left: 0.1rem;
}

.row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(47vw, 1fr));
}

#cardLink {
    text-decoration: none; 
}

.card {
    margin-bottom: 4vh;
    border-radius: 0.7rem!important
}

.card:hover {
    box-shadow: -1px 2px 7px 7px  rgb(117, 243, 117);
}

#date {
    font-size: 15px;
    font-weight:normal;
}

#statisticsButton {
    border-radius: 0.3rem;
    font-size : 17px;
    background: -webkit-linear-gradient(left, rgb(55, 235, 55), rgb(182, 150, 245));
}

#noResultsParagraph {
    text-align: center;
}

@media only screen and (max-width: 769px) {
    .searchBar {
        width: 57vw;;
    }

    .row {
        grid-template-columns: repeat(auto-fill, minmax(70vw, 1fr));
    }
}

</style>