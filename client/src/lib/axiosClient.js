import axios from 'axios';

const axiosClient = (key) => {

  console.log(process.env[`REACT_APP_SERVER_BASE_URL_${key}`])
  const client = axios.create({ baseURL: process.env[`REACT_APP_SERVER_BASE_URL_${key}`] });

  client.interceptors.request.use(async (config) => config);

  client.interceptors.response.use(
    async (config) => config,
    (error) => Promise.reject(error.response.data)
  );

  return client;
};

export default axiosClient;
