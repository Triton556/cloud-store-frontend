import axios from 'axios';
import { parseCookies } from 'nookies';

export const API_BASE_URL = 'http://localhost:7777/';
axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const { _token } = parseCookies();

    config.headers.Authorization = 'Bearer ' + _token;
  }
  return config;
});

export default axios;
