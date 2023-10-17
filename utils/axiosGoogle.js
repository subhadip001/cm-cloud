// axiosClient.js
import axios from "axios";

const axiosGoogleClient = axios.create({
  baseURL: "https://api.cyphermanager.com", // Replace with your server's URL
  withCredentials: true, // Include credentials (cookies) in the requests
});

export default axiosGoogleClient;
