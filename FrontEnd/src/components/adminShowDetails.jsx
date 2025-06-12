import { useEffect, useState } from 'react';
import '../styling/adminShowDetails.css';
import Navbar from './adminNavbar';
import api from '../api'; 

const ShowDetails = () => {
  const [users,setUsers] =useState([])
   useEffect(() => {
    const fetchuser = async () => {
      try{
        const res=await api.get('/User/all');
        setUsers(res.data);
      }
      catch(err)
      {
        console.error('error in fecting the users',err);
      }
    };
    fetchuser();

   },[]);

  const [departments,setDepartments]=useState([]);
  useEffect(() => {
    const fetchDepartments =async () =>{
      try{
        const res=await api.get('departments');
        setDepartments(res.data);
      }
            catch(err)
      {
        console.error('error in fecting the users',err);
      }
    };
    fetchDepartments();
  },[]);
  const [subjects,setsubject]=useState([]);
  useEffect(() => {
    const fetchsubject = async() =>{
      try {
        const res=await api.get('/Subjects');
        setsubject(res.data);
      }
      catch(err)
      {
        console.error('error in fectching the subject',err);
      }
    };
    fetchsubject();
  },[]);

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
                <td>{user.department.name}</td>
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
                <td>{dept.id}</td>
                <td>{dept.name}</td>
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
              <td>{sub.department?.name}</td>
              <td>{sub.semester}</td>
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
