import { useState } from 'react';
import { createProject } from '../services/api';

export const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [bookingUrl, setBookingUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    if (bookingUrl) {
      formData.append('bookingUrl', bookingUrl);
    }

    try {
      await createProject(formData); // ❗️FormData, а не JSON
      alert('Проект добавлен');
      setTitle('');
      setDescription('');
      setImage(null);
      setBookingUrl('');
    } catch (err) {
      console.error(err);
      alert('Ошибка при добавлении');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Добавить проект</h3>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Ссылка на бронирование (опционально)"
        value={bookingUrl}
        onChange={(e) => setBookingUrl(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};