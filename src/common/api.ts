import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:3000/', timeout: 4500 });

export default client;
