import { useEffect, useState } from 'react';
import { fetchPromos } from '../services/api';
import type { Promo } from '../types';

export const PromoList = () => {
  const [promos, setPromos] = useState<Promo[]>([]);

  useEffect(() => {
    const loadPromos = async () => {
      try {
        const response = await fetchPromos();
        setPromos(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadPromos();
  }, []);

  return (
    <div>
      <h3>Промокоды</h3>
      {promos.length === 0 ? (
        <p>Нет промокодов</p>
      ) : (
        <ul>
          {promos.map((p) => (
            <li key={p.id}>
              <strong>{p.code}</strong> — {new Date(p.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};