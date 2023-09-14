import dotenv from 'dotenv';

dotenv.config();

import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.baseURL = process.env.API_URL

    console.log('axiosInstance config:', config.baseURL);

    return config;
});

export default axiosInstance;
