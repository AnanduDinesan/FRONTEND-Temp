<<<<<<< HEAD
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
=======
import React, { ChangeEvent, FormEvent, useState } from 'react';
import api from '../api'; // Ensure api is typed or use axios.create with types
import '../styling/adminDepartment.css';
import Navbar from './adminNavbar';

// Define the structure of form data
interface DepartmentForm {
  id: string;
  name: string;
}

const Department: React.FC = () => {
  const [formData, setFormData] = useState<DepartmentForm>({
>>>>>>> d4b1be159f326588ef6b88586d2926260f8658fe
    id: '',
    name: ''
  });

<<<<<<< HEAD
  const handleChange = (e:React.ChangeEvent <HTMLInputElement>) => {
=======
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
>>>>>>> d4b1be159f326588ef6b88586d2926260f8658fe
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

<<<<<<< HEAD
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
=======
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
>>>>>>> d4b1be159f326588ef6b88586d2926260f8658fe
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
<<<<<<< HEAD
    } catch (error:any) {
=======
    } catch (error: any) {
>>>>>>> d4b1be159f326588ef6b88586d2926260f8658fe
      console.error('Error adding department:', error);
      const message = error.response?.data?.message || 'Failed to add department.';
      alert(message);
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
<<<<<<< HEAD
=======

>>>>>>> d4b1be159f326588ef6b88586d2926260f8658fe
export default Department;