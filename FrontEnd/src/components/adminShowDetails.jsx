import { useState } from 'react';
import '../styling/adminShowDetails.css';
import Navbar from './adminNavbar';

const ShowDetails = () => {
  const users = [
    { id: 'U001', name: 'Alice', email: 'alice@example.com', role: 'student', deptid: 'CSE' },
    { id: 'U002', name: 'Bob', email: 'bob@example.com', role: 'teacher', deptid: 'ECE' },
  ];

  const departments = [
    { deptId: 'CSE', deptName: 'Computer Science' },
    { deptId: 'ECE', deptName: 'Electronics and Communication' }
  ];

  const subjects = [
    { id: 'S101', name: 'Data Structures', deptId: 'CSE', semesterId: '3' },
    { id: 'S102', name: 'Circuits', deptId: 'ECE', semesterId: '2' }
  ];

  const [selectedType, setSelectedType] = useState('');

  const renderTable = () => {
    if (selectedType === 'users') {
      return (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.deptid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (selectedType === 'departments') {
      return (
        <table className="data-table">
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index}>
                <td>{dept.deptId}</td>
                <td>{dept.deptName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (selectedType === 'subjects') {
      return (
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, index) => (
              <tr key={index}>
                <td>{sub.id}</td>
                <td>{sub.name}</td>
                <td>{sub.deptId}</td>
                <td>{sub.semesterId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return null;
  };

  return (
    <>
      <Navbar />
      <div className="show-details-container">
        <h2 className="show-details-header">Show Details</h2>

        <div className="section">
          <label htmlFor="dataSelector" style={{ fontWeight: 'bold', fontSize: '16px' }}>Select Category:</label>
          <select
            id="dataSelector"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '16px',
              marginTop: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '100%',
              marginBottom: '20px',
            }}
          >
            <option value="">-- Choose an option --</option>
            <option value="users">Users</option>
            <option value="departments">Departments</option>
            <option value="subjects">Subjects</option>
          </select>

          {selectedType && (
            <div className="data-table-container">
              {renderTable()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowDetails;
