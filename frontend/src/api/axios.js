import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://job-tracker-api-xga3.onrender.com/api',
});

export default instance;