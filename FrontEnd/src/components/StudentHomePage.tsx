import React, { useEffect, useState } from 'react';
import api from '../api';
import Sidebar from './StudentSidebar';

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
    <div className='flex flex-row min-h-screen w-full'>
      <div>
      <Sidebar />
      </div>
      <div className='flex justify-center'>
      <div className="flex flex-col items-center shadow-lg m-16 w-4xl bg-white rounded-lg">
        <div className="text-center mb-8 font-bold mt-10 text-xl">
          <h2> Welcome, {studentDetails?.name || 'Student'}!</h2>
          <p className="subheading">Here’s a quick overview of your profile.</p>
        </div>

        {error && <p className="error-text">{error}</p>}

        {studentDetails && (
          <div className="flex flex-col items-start gap-2 p-4 ml-4 w-full max-w-md text-xl">
            <div ><span>👤</span> <strong>Name:</strong> {studentDetails.name}</div>
            <div ><span>📧</span> <strong>Email:</strong> {studentDetails.email}</div>
            <div ><span>🏫</span> <strong>Department:</strong> {studentDetails.department.name}</div>
            <div ><span>🎓</span> <strong>Role:</strong> {studentDetails.role}</div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default StudentHomePage;
