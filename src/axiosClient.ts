import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const axiosClient = axios.create({
  // baseURL: 'http://ferfilmBack.kushtrim.net',
  baseURL: 'http://localhost:8000/',
});

export default axiosClient;