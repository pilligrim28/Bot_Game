import { useEffect, useState } from 'react';
import { fetchPosters } from '../services/api';
import type { Poster } from '../types';

export const PosterList = () => {
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

  return (
    <div>
      <h3>Афиши</h3>
      {posters.length === 0 ? (
        <p>Нет афиш</p>
      ) : (
        posters.map((p) => (
          <div key={p.id}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            {p.imageUrl && <img src={p.imageUrl} alt={p.title} style={{ maxWidth: '200px' }} />}
          </div>
        ))
      )}
    </div>
  );
};