import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Token varsa her isteğe ekle (Giriş yapıldıysa)
const token = localStorage.getItem('token');
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

// Mevcut Fonksiyonlarınız...
export const getTrainers = () => api.get('/trainers');
export const createTrainer = (data) => api.post('/trainers', data);
export const deleteTrainer = (id) => api.delete(`/trainers/${id}`);

// --- YENİ EKLENENLER (AUTH) ---
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);

// ... (Önceki importlar ve kodlar)

// --- YENİ EKLENENLER (ADMIN İÇİN) ---
export const getAllUsers = () => api.get('/auth/users');
export const deleteUser = (id) => api.delete(`/auth/users/${id}`);

export default api;