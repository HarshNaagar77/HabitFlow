// Centralized API base URL for axios
import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API = axios.create({
  baseURL: isLocalhost ? 'http://localhost:5000' : 'https://habitflow-28ga.onrender.com',
  withCredentials: true,
});

export default API;
