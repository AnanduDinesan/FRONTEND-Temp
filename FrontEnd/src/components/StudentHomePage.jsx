import React, { useEffect, useState } from 'react';
import api from '../api';
import Sidebar from './StudentSidebar';
import '../styling/StudentHomePage.css';

const StudentHomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const studentId = user?.id;

  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (studentId) {
        try {
          const res = await api.get('/students', {
            params: { studentId }
          }); 
          setStudentDetails(res.data);
          setError('');
        } catch (error) {
          setError('Failed to fetch student details.');
        }
      }
    };
    fetchStudentDetails();
  }, [studentId]);


  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="home-page-container">
        <h2>Welcome, {studentDetails?.name || 'Student'}</h2>
        {error && <p className="error-text">{error}</p>}

        {studentDetails && (
          <div className="student-info-card">
            <p><strong>Name:</strong> {studentDetails.name}</p>
            <p><strong>Email:</strong> {studentDetails.email}</p>
            <p><strong>Department:</strong> {studentDetails.departmentName}</p>
            <p><strong>Role:</strong> {studentDetails.role}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHomePage;
