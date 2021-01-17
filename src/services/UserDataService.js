import axios from 'axios';
// import http from "../http-common";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/eventor/';

class UserDataService {
  getAll() {
    return axios.get(API_URL + 'users/all', { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `users/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `users/${id}`, data, { headers: authHeader() });
  }

  updateRole(id, user) {
    return axios.put(API_URL + `users/role/${id}` , user , { headers: authHeader() });
  }

  delete(id)
  {
    return axios.delete(API_URL + `users/${id}` , { headers: authHeader() });
  }
}

export default new UserDataService();