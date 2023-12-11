import axios from "axios";

const LOCAL_URL="http://localhost:8000"
const PROD_URL="https://api.cyphermanager.com"

const axiosGoogleClient = axios.create({
  baseURL: LOCAL_URL, 
  withCredentials: false, 
});

const API_URL = LOCAL_URL

export default axiosGoogleClient;
export { API_URL };
