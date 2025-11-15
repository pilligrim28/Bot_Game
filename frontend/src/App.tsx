import { PosterForm } from './components/PosterForm';
import { ProjectForm } from './components/ProjectForm';
import { PosterList } from './components/PosterList';
import { ProjectList } from './components/ProjectList';
import './App.css'; // Подключаем стили

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Админка для афиш и проектов</h1>
      </header>
      <div className="app-content">
        <div className="forms-section">
          <div className="form-container">
            <h2>Добавить афишу</h2>
            <PosterForm />
          </div>
          <div className="form-container">
            <h2>Добавить проект</h2>
            <ProjectForm />
          </div>
        </div>
        <div className="lists-section">
          <div className="list-container">
            <h2>Афиши</h2>
            <PosterList />
          </div>
          <div className="list-container">
            <h2>Проекты</h2>
            <ProjectList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;