import axios from "axios";

const LIVE_URL = "https://nb6y2cwyo7.execute-api.ap-south-1.amazonaws.com/prod/femto";
const LOCAL_URL = "http://localhost:5000/femto";

const axiosClient = axios.create({
  baseURL: LIVE_URL, 
  withCredentials: false, 
});

export default axiosClient;
