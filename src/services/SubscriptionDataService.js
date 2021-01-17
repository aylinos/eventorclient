import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/eventor/';

class SubscriptionDataService {
    subscribeToEvent(user_id, event) {
        return axios.put(API_URL + `subscriptions/subscribe/${user_id}`, event , { headers: authHeader() });
    }

    getSubscribedEvents(user_id)
    {
        return axios.get(API_URL + `subscriptions/${user_id}` , { headers: authHeader() });
    }

    unsubscribeToEvent(user_id, event) {
        return axios.put(API_URL + `subscriptions/unsubscribe/${user_id}`, event , { headers: authHeader() });
    }

    getNrSubscriptionsForDate(event_id)
    {
        return axios.get(API_URL + `subscriptions/date/${event_id}` , { headers: authHeader() });
    }
    getSubscriptionsForDate(event_id, date)
    {
        return axios.get(API_URL + `subscriptions/datee/${event_id}?date=${date}` , { headers: authHeader() });
    }
    getTotalSubscriptions(event_id)
    {
        return axios.get(API_URL + `subscriptions/total/${event_id}` , { headers: authHeader() });
    }
    getStatistics(event_id)
    {
        return axios.get(API_URL + `subscriptions/statistics/${event_id}` , { headers: authHeader() });
    }
}

export default new SubscriptionDataService();