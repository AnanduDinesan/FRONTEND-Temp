import { useState } from 'react';
import api from '../api'; 
import '../styling/adminDepartment.css';
import Navbar from './adminNavbar';

interface DepartmentFormData{
  id: string;
  name: string;
}
const Department:React.FC= () => {
  const [formData, setFormData] = useState<DepartmentFormData>({
    id: '',
    name: ''
  });

  const handleChange = (e:React.ChangeEvent <HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
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
    } catch (error:any) {
      console.error('Error adding department:', error);
      alert('Failed to add department. Please check the console.');

      const message = error.response?.data?.message || 'Failed to add department.';
      alert(message);
      console.log(message);
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