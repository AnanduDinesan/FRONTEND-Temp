import React, { useEffect, useState } from 'react';
import api from '../api';
import Sidebar from './StudentSidebar';
import '../styling/StudentHomePage.css';

interface StudentDetailsStruct{
  id:string;
  name:string;
  email:string;
  department: {
    name:string;
  };
  role:string;
}

const StudentHomePage: React.FC = () => {

  const [studentDetails, setStudentDetails] = useState<StudentDetailsStruct | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentDetails = async () => {
        try {
          const res = await api.get<StudentDetailsStruct>(`/user/profile`);
          console.log("Student Details:", res.data);
          setStudentDetails(res.data);
          setError('');
        } catch (error:any) {
          setError('Failed to fetch student details.');
        }
      };
      fetchStudentDetails();
    }, []);

  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="home-page-container">
        <div className="welcome-banner">
          <h2> Welcome, {studentDetails?.name || 'Student'}!</h2>
          <p className="subheading">Here’s a quick overview of your profile.</p>
        </div>

        {error && <p className="error-text">{error}</p>}

        {studentDetails && (
          <div className="student-info-card">
            <div className="info-row"><span>👤</span> <strong>Name:</strong> {studentDetails.name}</div>
            <div className="info-row"><span>📧</span> <strong>Email:</strong> {studentDetails.email}</div>
            <div className="info-row"><span>🏫</span> <strong>Department:</strong> {studentDetails.department.name}</div>
            <div className="info-row"><span>🎓</span> <strong>Role:</strong> {studentDetails.role}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHomePage;
