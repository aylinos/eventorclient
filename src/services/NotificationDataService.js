import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/eventor/';

class NotificationDataService {
  getAll(receiver) {
    return axios.get(API_URL + `notifications?receiver=${receiver.id}`, { headers: authHeader() });
  }

  changeStatus(notifications)
  {
    return axios.put(API_URL + 'notifications/updateStatus', notifications , { headers: authHeader() });
  }
}

export default new NotificationDataService();