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
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Failed to fetch posters:', msg);
    return [];
  }
};

export const fetchProjects = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>(`${API_BASE}/project`);
    return response.data;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Failed to fetch projects:', msg);
    return [];
  }
};

interface PromoItem {
  id: number;
  code: string;
  createdAt?: string;
  expiresAt?: string | null;
}

export const fetchPromos = async (): Promise<PromoItem[]> => {
  try {
    const response = await axios.get<PromoItem[]>(`${API_BASE}/promo`);
    return response.data;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Failed to fetch promos:', msg);
    return [];
  }
};

interface SubscriberItem {
  id: number;
  chatId: string;
  posters: boolean;
  projects: boolean;
}

export const fetchSubscribers = async (): Promise<SubscriberItem[]> => {
  try {
    const response = await axios.get<SubscriberItem[]>(`${API_BASE}/subscribe`);
    return response.data;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Failed to fetch subscribers:', msg);
    return [];
  }
};

export const subscribeChat = async (chatId: string, posters = true, projects = true) => {
  try {
    const response = await axios.post(`${API_BASE}/subscribe`, { chatId: String(chatId), posters, projects });
    return response.data;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Failed to subscribe:', msg);
    throw e;
  }
};

export const unsubscribeChat = async (chatId: string) => {
  try {
    const response = await axios.delete(`${API_BASE}/subscribe/${encodeURIComponent(String(chatId))}`);
    return response.data;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Failed to unsubscribe:', msg);
    throw e;
  }
};