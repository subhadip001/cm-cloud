import axios from "axios";

const axiosGoogleClient = axios.create({
  baseURL: "https://api.cyphermanager.com", 
  withCredentials: false, 
});

export default axiosGoogleClient;
