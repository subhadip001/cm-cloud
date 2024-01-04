import axios from "axios";

const LIVE_URL = "https://6hvjwmwdp4wfznzh4evxqntkmq0ilmlh.lambda-url.ap-south-1.on.aws/femto";
const LOCAL_URL = "http://localhost:9000/femto";

const axiosClient = axios.create({
  baseURL: LIVE_URL,
  withCredentials: true, 
});

export default axiosClient;
