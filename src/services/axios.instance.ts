import axios from 'axios';
import { EXPO_CONSTANTS } from '../utils/config';

const api = axios.create({
  baseURL: EXPO_CONSTANTS.API_URL,
  headers: {
    authorization: `Bearer ${EXPO_CONSTANTS.AUTH_TOKEN}`,
  },
});

export default api;
