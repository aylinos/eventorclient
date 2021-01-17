<template>
    <div>
        <h3 id="eventTitle"> {{ this.eventInfo.title }} </h3>

        <br>

        <div class="integerStatistics">
          <div id="content">
            <h5>Total subscriptions: </h5>
            <h4>{{ totalSubscriptions }} </h4>
          </div>
        </div>

        <br> <br>

        <div>
          <line-chart :data="dateWithSubscriptions"></line-chart>
        </div>
        
        <br> <br>
        
        <b-input-group class="mb-3">
            <b-form-input
                id="example-input"
                v-model="value"
                type="text"
                placeholder="View new subscriptions for a chosen date"
                autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
                <b-form-datepicker
                v-model="value"
                button-only
                right
                locale="en-US"
                aria-controls="example-input"
                @context="onContext"
                ></b-form-datepicker>
            </b-input-group-append>
        </b-input-group>
        <p>Chosen date: '{{ formatted }}'</p>

        <button id="btnNewSubscriptions" v-if="value" @click="getSubscriptionsForDate"> Get new subscriptions </button>

        <br> 

        <div v-if="requested" class="integerStatistics" id="newSubscriptions">
          <div id="content">
            <h5>New subscriptions: </h5>
            <br> 
            <h4> {{ subscriptions }} </h4>
          </div>
        </div>
    </div>
</template>

<script>
import SubscriptionDataService from "../../services/SubscriptionDataService";
export default {
    props: {
        eventInfo:Object
    },
    data() {
      return {
        value: '',
        formatted: '',
        requested: false,
        subscriptions: 0,
        totalSubscriptions: 0,
        dateWithSubscriptions: [],
        datee: null
      }
    },
    methods: {
      onContext(ctx) {
        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted
      },
      getSubscriptionsForDate() {
        this.requested = true;
        SubscriptionDataService.getSubscriptionsForDate(this.eventInfo.id, this.value)
        .then(response => {
            this.subscriptions = response.data;
            console.log(response.data);
        })
        .catch(e => {
                console.log(e);
        });
      },
      getTotalSubscriptions() {
        SubscriptionDataService.getTotalSubscriptions(this.eventInfo.id)
        .then(response => {
        this.totalSubscriptions = response.data;
        console.log(response.data);
        })
        .catch(e => {
                console.log(e);
        });
      },
      getStatistics() {
        SubscriptionDataService.getStatistics(this.eventInfo.id)
        .then(response => {
            response.data.forEach(x => this.dateWithSubscriptions.push([x.date, x.totalSubscriptions]));
        })
        .catch(e => {
                console.log(e);
        });
      }
    },
    mounted() {
        this.getTotalSubscriptions();
        this.getStatistics();
    }
}
</script>

<style scoped>
#eventTitle{
  text-align: center;
  color: #2a302c;
}
.integerStatistics {
  /* padding: 1px; */
  color: black;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border:  3px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto; /*centers in the middle of row*/
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
  background-image: linear-gradient(white,white), linear-gradient(to right, rgb(182, 150, 245),  rgb(55, 235, 55));
  background-origin: border-box;
  background-clip: content-box, border-box;

  /* animation:rot 1s linear infinite;  */
}

#content {
  display: inline-block;
  text-align: center;
}

#btnNewSubscriptions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: wheat;
}

/* @keyframes rot {
   0%
  {
    transform:rotate(0deg)
  }
   25%
  {
    transform:rotate(90deg)
  }
  50%
  {
    transform:rotate(180deg)
  }
   75%
  {
    transform:rotate(270deg)
  }
  100% {
    transform:rotate(360deg)
  }
} */


</style>