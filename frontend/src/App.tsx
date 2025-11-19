// frontend/src/App.tsx
import { useState } from 'react';
import { PosterForm } from './components/PosterForm';
import { ProjectForm } from './components/ProjectForm';
import { PromoForm } from './components/PromoForm';
import { PosterList } from './components/PosterList';
import { ProjectList } from './components/ProjectList';
import { PromoList } from './components/PromoList'; // ✅
import { ModalWrapper } from './components/Modal';
import type { Poster, Project } from './types';
import './App.css';

function App() {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [editingPoster, setEditingPoster] = useState<Poster | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEditPoster = (item: Poster) => {
    setEditingPoster(item);
    setIsPosterModalOpen(true);
  };

  const handleEditProject = (item: Project) => {
    setEditingProject(item);
    setIsProjectModalOpen(true);
  };

  const handleSaved = () => {
    setIsPosterModalOpen(false);
    setIsProjectModalOpen(false);
    setIsPromoModalOpen(false);
    setEditingPoster(null);
    setEditingProject(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Админка для афиш, проектов и промокодов</h1>

      <div>
        <button onClick={() => setIsPosterModalOpen(true)}>Добавить афишу</button>
        <button onClick={() => setIsProjectModalOpen(true)}>Добавить проект</button>
        <button onClick={() => setIsPromoModalOpen(true)}>Добавить промокод</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div>
          <PosterList onEdit={handleEditPoster} />
          <ProjectList onEdit={handleEditProject} />
          <PromoList /> {/* ✅ Добавим список промокодов */}
        </div>
      </div>

      {/* Модальное окно для афиши */}
      <ModalWrapper
        isOpen={isPosterModalOpen}
        onClose={() => {
          setIsPosterModalOpen(false);
          setEditingPoster(null);
        }}
        title={editingPoster ? 'Редактировать афишу' : 'Добавить афишу'}
      >
        <PosterForm itemToEdit={editingPoster} onSaved={handleSaved} />
      </ModalWrapper>

      {/* Модальное окно для проекта */}
      <ModalWrapper
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        title={editingProject ? 'Редактировать проект' : 'Добавить проект'}
      >
        <ProjectForm itemToEdit={editingProject} onSaved={handleSaved} />
      </ModalWrapper>

      {/* Модальное окно для промокода */}
      <ModalWrapper
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        title="Добавить промокод"
      >
        <PromoForm onSaved={handleSaved} />
      </ModalWrapper>
    </div>
  );
}

export default App;