import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Poster
export const fetchPosters = () => api.get('/poster');
export const createPoster = (formData: FormData) => api.post('/poster', formData);
export const updatePoster = (id: number, formData: FormData) => api.put(`/poster/${id}`, formData);
export const deletePoster = (id: number) => api.delete(`/poster/${id}`);

// Project
export const fetchProjects = () => api.get('/project');
export const createProject = (formData: FormData) => api.post('/project', formData);
export const updateProject = (id: number, formData: FormData) => api.put(`/project/${id}`, formData);
export const deleteProject = (id: number) => api.delete(`/project/${id}`);

// Promo
export const createPromo = (code: string) => api.post('/promo', { code }); // ✅
export const fetchPromos = () => api.get('/promo'); 