import { useState } from 'react';
import api from '../api'; // Ensure this is correctly configured
import '../styling/adminDepartment.css';
import Navbar from './adminNavbar';

const Department = () => {
  const [formData, setFormData] = useState({
    deptId: '',
    deptName: ''
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

    if (!formData.deptId || !formData.deptName) {
      alert('All fields are required');
      return;
    }

    try {
      await api.post('/departments', formData);
      alert('Department added successfully!');
      setFormData({ deptId: '', deptName: '' });
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
              name="deptId"
              value={formData.deptId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department Name:</label>
            <input
              type="text"
              name="deptName"
              value={formData.deptName}
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
