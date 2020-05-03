import axios from "axios";

const api = axios.create({
  baseURL: "http://cptec-api.herokuapp.com/",
});

export default api;
