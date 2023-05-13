import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const client = axios.create({ baseURL: API_URL, timeout: 4500 });

export default client;
