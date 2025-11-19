import { useEffect, useState } from 'react';
import { fetchPosters, deletePoster } from '../services/api';
import type { Poster } from '../types';

interface PosterListProps {
  onEdit: (item: Poster) => void;
}

export const PosterList: React.FC<PosterListProps> = ({ onEdit }) => {
  const [posters, setPosters] = useState<Poster[]>([]);

  useEffect(() => {
    const loadPosters = async () => {
      try {
        const response = await fetchPosters();
        setPosters(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadPosters();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Удалить эту афишу?')) {
      try {
        await deletePoster(id);
        setPosters(posters.filter(p => p.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h3>Афиши</h3>
      {posters.length === 0 ? (
        <p>Нет афиш</p>
      ) : (
        posters.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            {p.imageUrl && <img src={p.imageUrl} alt={p.title} style={{ maxWidth: '200px' }} />}
            <div>
              <button onClick={() => onEdit(p)}>Редактировать</button>
              <button onClick={() => handleDelete(p.id)}>Удалить</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};