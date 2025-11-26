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
import Login from './components/Login';

function App() {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [editingPoster, setEditingPoster] = useState<Poster | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean>(() => localStorage.getItem('isAuth') === 'true');

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

  if (!isAuth) {
    return <Login onLogin={() => setIsAuth(true)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Админка для афиш, проектов и промокодов</h1>
      </header>

      <div className="app-content">
        <div className="forms-section">
          <div style={{ marginBottom: 12 }}>
            <button onClick={() => setIsPosterModalOpen(true)}>Добавить афишу</button>
            <button onClick={() => setIsProjectModalOpen(true)} style={{ marginLeft: 8 }}>Добавить проект</button>
            <button onClick={() => setIsPromoModalOpen(true)} style={{ marginLeft: 8 }}>Добавить промокод</button>
            <button style={{ marginLeft: 12 }} onClick={() => { localStorage.removeItem('isAuth'); setIsAuth(false); }}>Выйти</button>
          </div>

          <div className="list-container">
            <PosterList onEdit={handleEditPoster} />
            <ProjectList onEdit={handleEditProject} />
            <PromoList />
          </div>
        </div>
      </div>

      {/* FAB for mobile quick add */}
      <div className="fab-wrapper">
        {isFabOpen && (
          <div className="fab-menu">
            <button className="fab-item" onClick={() => { setIsPosterModalOpen(true); setIsFabOpen(false); }}>Афиша</button>
            <button className="fab-item" onClick={() => { setIsProjectModalOpen(true); setIsFabOpen(false); }}>Проект</button>
            <button className="fab-item" onClick={() => { setIsPromoModalOpen(true); setIsFabOpen(false); }}>Промокод</button>
          </div>
        )}
        <button className="fab" onClick={() => setIsFabOpen((s) => !s)} aria-label="Добавить">+</button>
      </div>

      {/* Modals */}
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