import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styling/LoginPage.css';

interface LoginDetails{
  email: string;
  password: string;
}

interface ResponseStruct{
  token: string;
  id: string;
  name: string;
  role: string;
  email: string;
  departmentId: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginDetails>({
    email: '',
    password: ''
  });
  const handleChange= (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))};
  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post<ResponseStruct>('auth/login', formData);
      console.log(response.data);
      const { role, name, id, departmentId, email} = response.data;

      localStorage.setItem('jwt', response.data.token);
      localStorage.setItem('user', JSON.stringify({ id, name, role, email, departmentId }));

      if (role === 'admin') navigate('/admin');
      else if (role === 'teacher') navigate('/teacher');
      else if (role === 'student') navigate('/student');
      else setError('Invalid user role.');
    } catch (err:any) {
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
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
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