import React, { useState } from 'react';

interface Props {
  onLogin: () => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuth', 'true');
      onLogin();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container" style={{ maxWidth: 420, margin: '40px auto' }}>
        <h2 style={{ textAlign: 'center' }}>Вход в админку</h2>
        <form className="login-form" onSubmit={submit}>
          <input
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
