import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';
import type { Project } from '../types';

export const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadProjects();
  }, []);

  return (
    <div>
      <h3>Проекты</h3>
      {projects.length === 0 ? (
        <p>Нет проектов</p>
      ) : (
        projects.map((p) => (
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