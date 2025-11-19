import axios from 'axios';

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  bookingUrl?: string;
}

const API_BASE = 'http://localhost:3000'; // Убедись, что сервер запущен

export const fetchPosters = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>(`${API_BASE}/poster`);
    return response.data;
  } catch (e) {
    console.error('Failed to fetch posters:', e);
    return [];
  }
};

export const fetchProjects = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>(`${API_BASE}/project`);
    return response.data;
  } catch (e) {
    console.error('Failed to fetch projects:', e);
    return [];
  }
};