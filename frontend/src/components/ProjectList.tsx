import { useEffect, useState } from 'react';
import { fetchProjects, deleteProject } from '../services/api';
import { API_BASE_URL } from '../services/api';
import type { Project } from '../types';

interface ProjectListProps {
  onEdit: (item: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onEdit }) => {
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

  const handleDelete = async (id: number) => {
    if (window.confirm('Удалить этот проект?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h3>Проекты</h3>
      {projects.length === 0 ? (
        <p>Нет проектов</p>
      ) : (
        projects.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            {p.imageUrl && (
              <img
                src={p.imageUrl.startsWith('http') ? p.imageUrl : `${API_BASE_URL}${p.imageUrl}`}
                alt={p.title}
                style={{ maxWidth: '200px' }}
              />
            )}
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