<template>

<!-- Display event details, if an event is clicked on from the list -->
  <div v-if="currentEvent" class="edit-form">
    <h4>Event</h4>
    <div class="creator">
      <h4>Creator: 
        <b-popover class="popover"
            target="creatorPopover"
            placement="right" 
            title="Contact"
            triggers="hover focus"
        >
            <UserPopover v-bind:userInfo="currentEvent.creator"/>
        </b-popover>
        <b-button id="creatorPopover">{{ currentEvent.creator.username }}</b-button>
      </h4>
    </div>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <b-form-input readonly name="title" class="form-control" id="title" rows="3"
          v-model="currentEvent.title" 
        ></b-form-input>
      </div>

      <VueCtkDateTimePicker id="startDate" 
        :disabled="disable"
        :label="label"
        v-model="currentEvent.startDate"
        format="YYYY-MM-DDTHH:mm:ssZ" />

      <div class="form-group">
        <label for="information">Information</label>
        <textarea class="form-control" id="information" rows="10"
          v-model="currentEvent.information"
        ></textarea>
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentEvent.published ? "Published" : "Pending" }}
      </div>

      <div class="form-group">
        <label><strong>Visibility:</strong></label>
        {{ currentEvent.private ? "Private" : "Public" }}
      </div>

      <div class="form-group">
        <b-form-radio v-model="currentEvent.private" :value="true">Private</b-form-radio>
        <b-form-radio v-model="currentEvent.private" :value="false">Public</b-form-radio>
      </div>
    </form>

<div id="buttons">
<!-- Buttons for possible actions with chosen event - (un)publish, delete & update -->
    <button class="badge badge-primary mr-2" id="buttonUnpublish"
      v-if="currentEvent.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button class="badge badge-primary mr-2" id="buttonPublish"
      v-else
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" id="buttonDelete"
      @click="deleteEvent"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success" id="buttonUpdate"
      @click="updateEvent"
    >
      Update
    </button>
    <p v-if="message"
                    class="alert"
                    :class="updated ? 'alert-success' : 'alert-danger'">
                     {{message.message}}</p>
    <p v-if="successMessage"
                    class="alert"
                    :class="updated ? 'alert-success' : 'alert-danger'">
                     {{successMessage}}</p>
</div>
  </div>

  <div v-else>
    <br />
    <p>Please click on an Event...</p>
  </div>
</template>


<script>
import moment from 'moment';
import $ from 'jquery';
import EventDataService from "../services/EventDataService";
import UserPopover from "./loggedIn-pages/UserPopover";

export default {
  name: "event",
  components: {
    UserPopover
  },
  data() {
    return {
      currentEvent: null,
      message: '',
      updated: false,
      successMessage: '',
      datePickerDisabled: false,
    };
  },
  methods: {
    getEvent(id) {
      console.log("event");
      EventDataService.get(id)
        .then(response => {
          this.currentEvent = response.data;
          console.log(response.data);

          this.readonly();
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      this.updated = false;
      this.successMessage = "";
      this.message = "";
      this.currentEvent.publishDate = new Date();
      var data = {
        id: this.currentEvent.id,
        title: this.currentEvent.title,
        information: this.currentEvent.information,
        published: status,
        publishDate: this.currentEvent.publishDate
      };
      console.log(moment(new Date()).format('DD-MM-YYYY'));
      EventDataService.update(this.currentEvent.id, data)
        .then(response => {
          this.updated = true;
          this.currentEvent.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateEvent() {
      // 2021-01-12T09:00:24+01:00
      this.updated = false;
      this.successMessage = "";
      this.message = "";
      EventDataService.update(this.currentEvent.id, this.currentEvent)
        .then(response => {
          console.log(response.data);
          this.updated = true;
          this.successMessage = 'The event was updated successfully!';
        })
        .catch(e => {
          console.log(e);
          this.message=
          (e.response && e.response.data) ||
                e.message ||
                e.toString();
        });
    },

    deleteEvent() {
      EventDataService.delete(this.currentEvent.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "events" });
        })
        .catch(e => {
          console.log(e);
        });
    },

    readonly() {
      if(this.currentEvent.creator.id == this.currentUser.id || 
        this.currentUser.roles.includes('ROLE_ADMIN') ||
        this.currentUser.roles.includes('ROLE_MODERATOR'))
      {
        this.datePickerDisabled = false;
        $(function() {
          $('#title').removeAttr('readonly');
          $('#information').attr('readonly', false);
          $('#buttons').css({'display':'block'});
        })
      }else if(!this.currentEvent.published)
      {
        this.$router.push('/eventor/events');
      }else{
          this.datePickerDisabled = true;
          $(function() {
          $('#title').attr('readonly', true);
          $('#information').attr('readonly', true);
          $('#buttons').css({'display':'none'});
        })
      }
    }
  },
  computed: {
    currentUser() {
      console.log("user");
      return this.$store.state.auth.user;
    },
    disable()
    {
      return this.datePickerDisabled;
    },
    label()
    {
      if(!this.currentEvent.startDate)
      {
        return "Time is not available yet";
      }
      return "Begins on";
    }
  },
  mounted() {
    this.message = '';
    this.getEvent(this.$route.params.id);
    if (!this.currentUser) {
      this.$router.push('/'); //old (for example) = this.$router.push('/login');
    }
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.popover {
  min-width: 30em !important;
}
#creatorPopover {
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color:green;
}
#title, #information {
  background-color: transparent;
  border: none;
}
</style>