import { useState } from 'react';
import '../styling/adminShowDetails.css';
import Navbar from './adminNavbar';

const ShowDetails = () => {
  // Dummy Users
  const users = [
    { id: 'U001', name: 'Alice', email: 'alice@example.com', role: 'student', deptid: 'CSE' },
    { id: 'U002', name: 'Bob', email: 'bob@example.com', role: 'teacher', deptid: 'ECE' },
  ];

  // Dummy Departments
  const departments = [
    { deptId: 'CSE', deptName: 'Computer Science' },
    { deptId: 'ECE', deptName: 'Electronics and Communication' }
  ];

  // Dummy Subjects
  const subjects = [
    { id: 'S101', name: 'Data Structures', deptId: 'CSE', semesterId: '3' },
    { id: 'S102', name: 'Circuits', deptId: 'ECE', semesterId: '2' }
  ];

  const [showUsers, setShowUsers] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);

  return (
    <>
      <Navbar />
      <div className="show-details-container">
        <h2>Show Details</h2>

        <div className="horizontal-sections">
          {/* Users */}
          <div className="section">
            <button onClick={() => setShowUsers(!showUsers)}>
              {showUsers ? 'Hide Users' : 'Show Users'}
            </button>
            {showUsers && (
              <div className="data-list">
                {users.map((user, index) => (
                  <div key={index}>
                    ID: {user.id}, Name: {user.name}, Role: {user.role}, Email: {user.email}, Dept: {user.deptid}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Departments */}
          <div className="section">
            <button onClick={() => setShowDepartments(!showDepartments)}>
              {showDepartments ? 'Hide Departments' : 'Show Departments'}
            </button>
            {showDepartments && (
              <div className="data-list">
                {departments.map((dept, index) => (
                  <div key={index}>
                    Dept ID: {dept.deptId}, Name: {dept.deptName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subjects */}
          <div className="section">
            <button onClick={() => setShowSubjects(!showSubjects)}>
              {showSubjects ? 'Hide Subjects' : 'Show Subjects'}
            </button>
            {showSubjects && (
              <div className="data-list">
                {subjects.map((sub, index) => (
                  <div key={index}>
                    Subject ID: {sub.id}, Name: {sub.name}, Dept: {sub.deptId}, Semester: {sub.semesterId}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDetails;
