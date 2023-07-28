import axios from 'axios';

// if not auth
const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
});

// if auth
const authInstance = instance;

const withToken = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

authInstance.interceptors.request.use(withToken);

export { instance, authInstance };
