import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/eventor/';

class UploadFilesService {
  uploadProfileImage(id, file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return axios.post(API_URL + `files/upload/users/${id}`, formData, { 
        headers: 
            authHeader()
        ,
        onUploadProgress
    });
  }

  getProfileImage(id) {
    return axios.get(API_URL + `files/users/${id}`, { headers: authHeader() });
  }

}

export default new UploadFilesService();