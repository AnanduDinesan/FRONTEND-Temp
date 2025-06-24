import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';


interface LoginDetails {
  email: string;
  password: string;
}

interface ResponseStruct {
  token: string;
  role: string;
}
const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginDetails>({
    email: '',
    password: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post<ResponseStruct>('auth/login', formData);
      console.log(response.data);
      const role:string = response.data.role;

      localStorage.setItem('jwt', response.data.token);

      if (role === 'admin') navigate('/admin');
      else if (role === 'teacher') navigate('/teacher');
      else if (role === 'student') navigate('/student');
      else setError('Invalid user role.');
    } catch (err: any) {
      console.log(err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-[#00162c] to-[#082d6c] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#00162c] mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:shadow-md transition-all duration-300"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:shadow-md transition-all duration-300 "
        />

        {error && (
          <p className="text-red-600 text-center text-lg font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#082d6c] hover:bg-[#2653a0e4] text-white py-2 rounded-md font-semibold transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;