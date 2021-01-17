<template>

  <div class="submit-form">
    <div v-if="!created">
      <div class="form-group">
        <label for="title">Title</label>
        <textarea
          type="text"
          class="form-control"
          id="title"
          rows="3"
          required
          v-model="event.title"
          name="title"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="information">Information</label>
        <textarea
          class="form-control"
          id="information"
          rows="10"
          required
          v-model="event.information"
          name="information"
        ></textarea>
      </div>

      <div class="form-group">
          <b-form-radio v-model="event.private" :value="true">Private</b-form-radio>
          <b-form-radio v-model="event.private" :value="false">Public</b-form-radio>
      </div>

      <button @click="saveEvent" class="btn btn-success">Create</button>
      <div v-if="message"
                    class="alert"
                    :class="created ? 'alert-success' : 'alert-danger'">
                     {{message.message}} 
      </div>
    </div>

    <div v-else>
      <h4>You created event successfully!</h4>
      <router-link :to = "{name: 'add'}">
        <button class="btn btn-success" @click="newEvent">Add another event</button>
      </router-link>
    </div>
  </div>
</template>


<script>
import EventDataService from "../services/EventDataService";

export default {
  name: "add-event",
  data() {
    return {
      event: {
        id: null,
        user: this.currentUser,
        title: "",
        information: "",
        published: false,
        private: true,
      },
      created: false,
      message: ""
    };
  },
  computed: {
    currentUser() {
        return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/'); //old (for example) = this.$router.push('/login');
    }
  },
  methods: {
    saveEvent() {
      var data = {
        creator: this.currentUser,
        title: this.event.title,
        information: this.event.information,
        private: this.event.private,
      };
      console.log(data);
      EventDataService.create(data)
        .then(response => {
          this.event.id = response.data.id;
          console.log(response.data);
          this.created = true;
        })
        .catch(e => {
          console.log(e);
          this.message=
          (e.response && e.response.data) ||
                e.message ||
                e.toString();
        });
    },
    
    newEvent() {
      this.created = false;
      this.event.title = "";
      this.event.information = "";
      this.published=false;
      this.private=true;
      this.message = "";
    }
   }
};
</script>


<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>