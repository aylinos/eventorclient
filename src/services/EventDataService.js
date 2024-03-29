import axios from 'axios';

import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/eventor/';

class EventDataService {
  getAll() {
    return axios.get(API_URL + 'events', { headers: authHeader() });
  }

  getMyEvents(creator) {
    return axios.get(API_URL + `events/my?creator=${creator.id}`, { headers: authHeader() });
  }

  getAllPublished() {
    return axios.get(API_URL + 'events/published', { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `events/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL + 'events', data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `events/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `events/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(API_URL + `events`, { headers: authHeader() });
  }

  findByTitle(title) {
    return axios.get(API_URL + `events?title=${title}`, { headers: authHeader() });
  }
}

export default new EventDataService();