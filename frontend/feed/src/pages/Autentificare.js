import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Autentificare.css';

function Autentificare() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const users = [
    { username: 'student1', password: 'abcd', role: 'student' },
    { username: 'student2', password: 'abcde', role: 'student'},
    { username: 'profesor1', password: 'abcdef', role: 'profesor' },
  ];

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      if (user.role === 'student') {
        navigate('/Student');
      } else if (user.role === 'profesor') {
        navigate('/Profesor');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <h2>Continuous Feedback Application</h2>
      
      <div className="input-container">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
      </div>

      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </div>

      <button onClick={handleLogin}>Log in</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Autentificare;