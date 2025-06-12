import { useState } from 'react';
import api from '../api'; // Ensure this is correctly configured
import '../styling/adminDepartment.css';
import Navbar from './adminNavbar';

const Department = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id || !formData.name) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await api.post('/departments', formData);
      console.log(res.data);
      alert('Department added successfully!');
      setFormData({ id: '', name: '' });
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Failed to add department. Please check the console.');
    }
  };

  return (
    <>
    <Navbar />
      <div className="department-container">
        <h2>Department Creation</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Department ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create Department</button>
        </form>
      </div>
      </>
  );
};

export default Department;
