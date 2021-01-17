import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080", //old = baseURL: "http://localhost:8080/eventor",
  headers: {
    "Content-type": "application/json"
  }
});