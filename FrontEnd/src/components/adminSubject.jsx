import { useState } from 'react';
import axios from 'axios';
import '../styling/adminSubject.css';
import Navbar from './adminNavbar';

const Subject = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    deptId: '',
    semesterId: ''
  });

  // Static department data
  const departments = [
    { deptId: 'CSE', deptName: 'Computer Science' },
    { deptId: 'ECE', deptName: 'Electronics and Communication' },
    { deptId: 'ME', deptName: 'Mechanical Engineering' },
    { deptId: 'CE', deptName: 'Civil Engineering' }
  ];

  // Static semester list
  const semesters = [
    { id: '1', name: 'Semester 1' },
    { id: '2', name: 'Semester 2' },
    { id: '3', name: 'Semester 3' },
    { id: '4', name: 'Semester 4' },
    { id: '5', name: 'Semester 5' },
    { id: '6', name: 'Semester 6' },
    { id: '7', name: 'Semester 7' },
    { id: '8', name: 'Semester 8' }
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.deptId || !formData.semesterId) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/subjects", formData);
      alert("Subject added successfully!");

      setFormData({
        id: '',
        name: '',
        deptId: '',
        semesterId: ''
      });
    } catch (err) {
      console.error("Error adding subject:", err);
      alert("Failed to add subject.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="subject-container">
        <h2>Add Subject</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject ID:</label>
            <input type="text" name="id" value={formData.id} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Subject Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select name="deptId" value={formData.deptId} onChange={handleChange} required>
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.deptId} value={dept.deptId}>
                  {dept.deptName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Semester:</label>
            <select name="semesterId" value={formData.semesterId} onChange={handleChange} required>
              <option value="">Select Semester</option>
              {semesters.map(sem => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Add Subject</button>
        </form>
      </div>
    </>
  );
};

export default Subject;

