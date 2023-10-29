import axios from "axios";

const LOCAL_URL="http://localhost:8000"
const PROD_URL="https://api.cyphermanager.com"

const axiosGoogleClient = axios.create({
  baseURL: PROD_URL, 
  withCredentials: false, 
});

export default axiosGoogleClient;
