import axios from 'axios';

// Backend URL'i environment variable'dan veya direkt localhost'tan alır
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const getTrainers = () => api.get('/trainers');
export const deleteTrainer = (id) => api.delete(`/trainers/${id}`);
export const createTrainer = (data) => api.post('/trainers', data);

export default api;