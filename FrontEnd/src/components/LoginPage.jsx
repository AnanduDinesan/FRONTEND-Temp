import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styling/LoginPage.css';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('auth/login', { email, password });
      const { role, name, id, departmentId } = response.data;

      localStorage.setItem('jwt', response.data.token);
      const user = jwtDecode(response.data.token);
      localStorage.setItem('user', JSON.stringify({ id, name, role, email, departmentId }));

      if (role === 'admin') navigate('/admin');
      else if (role === 'teacher') navigate('/teacher');
      else if (role === 'student') navigate('/student');
      else setError('Invalid user role.');
    } catch (err) {
      console.log(err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
