import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// ❗️Для FormData не отправляем Content-Type
export const createPoster = (formData: FormData) => api.post('/poster', formData);
export const fetchPosters = () => api.get('/poster');

export const createProject = (formData: FormData) => api.post('/project', formData);
export const fetchProjects = () => api.get('/project');