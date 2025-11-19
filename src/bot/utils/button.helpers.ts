import { InlineKeyboardButton } from 'telegraf/types';
import axios from 'axios';

interface Item {
  id: number;
  title: string;
  bookingUrl?: string;
}

const API_BASE = 'http://localhost:3000'; // Убедись, что сервер запущен

export const getPostersWithButtons = async (): Promise<InlineKeyboardButton[][]> => {
  try {
    const response = await axios.get<Item[]>(`${API_BASE}/poster`);
    // Фильтруем, чтобы url был определён
    return response.data
      .filter(item => item.bookingUrl) // ✅ Только с bookingUrl
      .map((p) => [
        {
          text: p.title,
          url: p.bookingUrl!, // ✅ Уверены, что url есть
        },
      ]);
  } catch (e) {
    console.error('Failed to fetch posters:', e);
    return [];
  }
};

export const getProjectsWithButtons = async (): Promise<InlineKeyboardButton[][]> => {
  try {
    const response = await axios.get<Item[]>(`${API_BASE}/project`);
    // Фильтруем, чтобы url был определён
    return response.data
      .filter(item => item.bookingUrl) // ✅ Только с bookingUrl
      .map((p) => [
        {
          text: p.title,
          url: p.bookingUrl!, // ✅ Уверены, что url есть
        },
      ]);
  } catch (e) {
    console.error('Failed to fetch projects:', e);
    return [];
  }
};