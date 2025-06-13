import { useEffect, useState } from 'react';
import '../styling/adminShowDetails.css';
import Navbar from './adminNavbar';
import api from '../api';

const ShowDetails = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const [editingDeptId, setEditingDeptId] = useState(null);
  const [editedDeptName, setEditedDeptName] = useState('');

  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [editedSubject, setEditedSubject] = useState({});

  // Fetching Functions
  const fetchUsers = async () => {
    try {
      const res = await api.get('/User/all');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get('/departments');
      setDepartments(res.data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/Subjects');
      setSubjects(res.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
    fetchSubjects();
  }, []);

  // === USERS ===
  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/User/${id}`);
      await fetchUsers();
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const handleEditClickUser = (user) => {
    setEditingUserId(user.id);
    setEditedUser({
      ...user,
      departmentId: user.department?.id || ''
    });
  };

  const handleCancelEditUser = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleSaveEditUser = async () => {
    try {
      await api.put(`/User/update/${editingUserId}`, editedUser);
      await fetchUsers();
      setEditingUserId(null);
      alert('User updated successfully');
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user');
    }
  };

  const handleInputChangeUser = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: name === 'departmentId' ? parseInt(value) : value,
    }));
  };

  // === DEPARTMENTS ===
  const handleEditDept = (dept) => {
    setEditingDeptId(dept.id);
    setEditedDeptName(dept.name);
  };

  const handleCancelDeptEdit = () => {
    setEditingDeptId(null);
    setEditedDeptName('');
  };

  const handleSaveDeptEdit = async () => {
    try {
      await api.put(`/departments/${editingDeptId}`, {
        id: editingDeptId,
        name: editedDeptName,
      });
      await fetchDepartments();
      setEditingDeptId(null);
      alert('Department updated successfully');
    } catch (err) {
      console.error('Error updating department:', err);
      alert('Failed to update department');
    }
  };

  const handleDeleteDept = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      await fetchDepartments();
      alert('Department deleted successfully');
    } catch (err) {
      console.error('Error deleting department:', err);
      alert('Failed to delete department');
    }
  };

  // === SUBJECTS ===
  const handleEditSubject = (sub) => {
    setEditingSubjectId(sub.id);
    setEditedSubject({
      name: sub.name,
      semester: sub.semester,
      departmentId: sub.department?.id || '',
    });
  };

  const handleCancelSubjectEdit = () => {
    setEditingSubjectId(null);
    setEditedSubject({});
  };

  const handleInputChangeSubject = (e) => {
    const { name, value } = e.target;
    setEditedSubject((prev) => ({
      ...prev,
      [name]: name === 'departmentId' ? parseInt(value) : value,
    }));
  };

  const handleSaveSubjectEdit = async () => {
    try {
      await api.put(`/Subjects/${editingSubjectId}`, {
        id: editingSubjectId,
        ...editedSubject,
      });
      await fetchSubjects();
      setEditingSubjectId(null);
      alert('Subject updated successfully');
    } catch (err) {
      console.error('Error updating subject:', err);
      alert('Failed to update subject');
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await api.delete(`/Subjects/${id}`);
      await fetchSubjects();
      alert('Subject deleted successfully');
    } catch (err) {
      console.error('Error deleting subject:', err);
      alert('Failed to delete subject');
    }
  };

  // === RENDERING ===
  const renderTable = () => {
    if (selectedType === 'users') {
      return (
        <table className="data-table">
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Edit</th><th>Delete</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{editingUserId === u.id ? <input name="name" value={editedUser.name || ''} onChange={handleInputChangeUser} /> : u.name}</td>
                <td>{editingUserId === u.id ? <input name="email" value={editedUser.email || ''} onChange={handleInputChangeUser} /> : u.email}</td>
                <td>{editingUserId === u.id ? (
                  <select name="role" value={editedUser.role || ''} onChange={handleInputChangeUser}>
                    <option value="admin">admin</option>
                    <option value="teacher">teacher</option>
                    <option value="student">student</option>
                  </select>) : u.role}
                </td>
                <td>{editingUserId === u.id ? (
                  <select name="departmentId" value={editedUser.departmentId || ''} onChange={handleInputChangeUser}>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>) : u.department?.name}
                </td>
                <td>{editingUserId === u.id ? (
                  <>
                    <button onClick={handleSaveEditUser}>Save</button>
                    <button onClick={handleCancelEditUser}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClickUser(u)}>Edit</button>
                )}</td>
                <td><button onClick={() => handleDeleteUser(u.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (selectedType === 'departments') {
      return (
        <table className="data-table">
          <thead><tr><th>ID</th><th>Name</th><th>Edit</th><th>Delete</th></tr></thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{editingDeptId === d.id ? <input value={editedDeptName} onChange={(e) => setEditedDeptName(e.target.value)} /> : d.name}</td>
                <td>{editingDeptId === d.id ? (
                  <>
                    <button onClick={handleSaveDeptEdit}>Save</button>
                    <button onClick={handleCancelDeptEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditDept(d)}>Edit</button>
                )}</td>
                <td><button onClick={() => handleDeleteDept(d.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (selectedType === 'subjects') {
      return (
        <table className="data-table">
          <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Semester</th><th>Edit</th><th>Delete</th></tr></thead>
          <tbody>
            {subjects.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{editingSubjectId === sub.id ? <input name="name" value={editedSubject.name || ''} onChange={handleInputChangeSubject} /> : sub.name}</td>
                <td>{editingSubjectId === sub.id ? (
                  <select name="departmentId" value={editedSubject.departmentId || ''} onChange={handleInputChangeSubject}>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>) : sub.department?.name}</td>
                <td>{editingSubjectId === sub.id ? (
                  <input name="semester" value={editedSubject.semester || ''} onChange={handleInputChangeSubject} />
                ) : sub.semester}</td>
                <td>{editingSubjectId === sub.id ? (
                  <>
                    <button onClick={handleSaveSubjectEdit}>Save</button>
                    <button onClick={handleCancelSubjectEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditSubject(sub)}>Edit</button>
                )}</td>
                <td><button onClick={() => handleDeleteSubject(sub.id)}>Delete</button></td>
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
          <label htmlFor="dataSelector"><b>Select Category:</b></label>
          <select id="dataSelector" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">-- Choose an option --</option>
            <option value="users">Users</option>
            <option value="departments">Departments</option>
            <option value="subjects">Subjects</option>
          </select>
          {selectedType && <div className="data-table-container">{renderTable()}</div>}
        </div>
      </div>
    </>
  );
};

export default ShowDetails;
