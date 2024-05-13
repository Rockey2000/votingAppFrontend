/* eslint-disable prettier/prettier */
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.1.5:5000/api', // Replace this with your actual URL
  baseURL: 'http://192.168.1.13:5000/api', // Replace this with your actual URL
  // baseURL: 'http://192.168.0.105:5000/api', // Replace this with your actual URL
});

export default api;
