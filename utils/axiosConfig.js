import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:9000/femto", 
  withCredentials: false, 
});

export default axiosClient;
