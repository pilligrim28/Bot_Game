import { useState } from 'react';
import { createPromo } from '../services/api';

interface PromoFormProps {
  onSaved: () => void;
}

export const PromoForm: React.FC<PromoFormProps> = ({ onSaved }) => {
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPromo(code);
      alert('Промокод добавлен');
      onSaved();
      setCode('');
    } catch (err) {
      console.error(err);
      alert('Ошибка при добавлении промокода');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Промокод (буквы и цифры)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        pattern="[A-Za-z0-9]+"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};