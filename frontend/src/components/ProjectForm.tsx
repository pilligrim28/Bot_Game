import { useState } from 'react';
import { createProject, updateProject } from '../services/api';
import type { Project } from '../types';

interface ProjectFormProps {
  itemToEdit?: Project | null;
  onSaved: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ itemToEdit, onSaved }) => {
  const [title, setTitle] = useState(itemToEdit?.title || '');
  const [description, setDescription] = useState(itemToEdit?.description || '');
  const [image, setImage] = useState<File | null>(null);
  const [bookingUrl, setBookingUrl] = useState(itemToEdit?.bookingUrl || '');

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
      if (itemToEdit) {
        await updateProject(itemToEdit.id, formData);
      } else {
        await createProject(formData);
      }
      alert('Сохранено');
      onSaved();
      setTitle('');
      setDescription('');
      setImage(null);
      setBookingUrl('');
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">{itemToEdit ? 'Обновить' : 'Добавить'}</button>
    </form>
  );
};