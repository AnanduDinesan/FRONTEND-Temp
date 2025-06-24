import { useEffect, useState, ChangeEvent } from 'react';
import api from '../../api';

// === Interfaces ===
interface Department {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: Department;
  departmentId?: number;
}

interface Subject {
  id: number;
  name: string;
  semester: string;
  department: Department;
  departmentId?: number;
}

const ShowDetails = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});

  const [editingDeptId, setEditingDeptId] = useState<number | null>(null);
  const [editedDeptName, setEditedDeptName] = useState<string>('');

  const [editingSubjectId, setEditingSubjectId] = useState<number | null>(null);
  const [editedSubject, setEditedSubject] = useState<Partial<Subject>>({});

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
    fetchSubjects();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get<User[]>('/User/all');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get<Department[]>('/departments');
      setDepartments(res.data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.get<Subject[]>('/Subjects');
      setSubjects(res.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  // User handlers (unchanged)
  const handleDeleteUser = async (id: number) => {
    try {
      await api.delete(`/User/${id}`);
      await fetchUsers();
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const handleEditClickUser = (user: User) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user, departmentId: user.department?.id });
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

  const handleInputChangeUser = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: name === 'departmentId' ? parseInt(value) : value,
    }));
  };

  // Department handlers (unchanged)
  const handleEditDept = (dept: Department) => {
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

  const handleDeleteDept = async (id: number) => {
    try {
      await api.delete(`/departments/${id}`);
      await fetchDepartments();
      alert('Department deleted successfully');
    } catch (err) {
      console.error('Error deleting department:', err);
      alert('Failed to delete department');
    }
  };

  // Subject handlers (unchanged)
  const handleEditSubject = (sub: Subject) => {
    setEditingSubjectId(sub.id);
    setEditedSubject({
      name: sub.name,
      semester: sub.semester,
      departmentId: sub.department?.id,
    });
  };

  const handleCancelSubjectEdit = () => {
    setEditingSubjectId(null);
    setEditedSubject({});
  };

  const handleInputChangeSubject = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleDeleteSubject = async (id: number) => {
    try {
      await api.delete(`/Subjects/${id}`);
      await fetchSubjects();
      alert('Subject deleted successfully');
    } catch (err) {
      console.error('Error deleting subject:', err);
      alert('Failed to delete subject');
    }
  };

  // === RENDER TABLES ===
  const tableClass = 'w-full text-sm border border-gray-300 rounded-md';
  const thClass = 'bg-indigo-600 text-white px-4 py-2';
  const tdClass = 'px-4 py-2 border border-gray-200';

  const renderTable = () => {
    if (selectedType === 'users') {
      return (
        <table className={tableClass}>
          <thead><tr><th className={thClass}>Name</th><th className={thClass}>Email</th><th className={thClass}>Role</th><th className={thClass}>Department</th><th className={thClass}>Edit</th><th className={thClass}>Delete</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className={tdClass}>{editingUserId === u.id ? <input name="name" value={editedUser.name || ''} onChange={handleInputChangeUser} className="input" /> : u.name}</td>
                <td className={tdClass}>{editingUserId === u.id ? <input name="email" value={editedUser.email || ''} onChange={handleInputChangeUser} className="input" /> : u.email}</td>
                <td className={tdClass}>{editingUserId === u.id ? (
                  <select name="role" value={editedUser.role || ''} onChange={handleInputChangeUser} className="input">
                    <option value="admin">admin</option>
                    <option value="teacher">teacher</option>
                    <option value="student">student</option>
                  </select>) : u.role}</td>
                <td className={tdClass}>{editingUserId === u.id ? (
                  <select name="departmentId" value={editedUser.departmentId || ''} onChange={handleInputChangeUser} className="input">
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>) : u.department?.name}</td>
                <td className={tdClass}>{editingUserId === u.id ? (
                  <>
                    <button onClick={handleSaveEditUser} className="btn-primary mr-2">Save</button>
                    <button onClick={handleCancelEditUser} className="btn-secondary">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClickUser(u)} className="btn-primary">Edit</button>
                )}</td>
                <td className={tdClass}><button onClick={() => handleDeleteUser(u.id)} className="btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (selectedType === 'departments') {
      return (
        <table className={tableClass}>
          <thead><tr><th className={thClass}>Name</th><th className={thClass}>Edit</th><th className={thClass}>Delete</th></tr></thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className={tdClass}>{editingDeptId === d.id ? <input value={editedDeptName} onChange={(e) => setEditedDeptName(e.target.value)} className="input" /> : d.name}</td>
                <td className={tdClass}>{editingDeptId === d.id ? (
                  <>
                    <button onClick={handleSaveDeptEdit} className="btn-primary mr-2">Save</button>
                    <button onClick={handleCancelDeptEdit} className="btn-secondary">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditDept(d)} className="btn-primary">Edit</button>
                )}</td>
                <td className={tdClass}><button onClick={() => handleDeleteDept(d.id)} className="btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (selectedType === 'subjects') {
      return (
        <table className={tableClass}>
          <thead><tr><th className={thClass}>Name</th><th className={thClass}>Department</th><th className={thClass}>Semester</th><th className={thClass}>Edit</th><th className={thClass}>Delete</th></tr></thead>
          <tbody>
            {subjects.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className={tdClass}>{editingSubjectId === sub.id ? <input name="name" value={editedSubject.name || ''} onChange={handleInputChangeSubject} className="input" /> : sub.name}</td>
                <td className={tdClass}>{editingSubjectId === sub.id ? (
                  <select name="departmentId" value={editedSubject.departmentId || ''} onChange={handleInputChangeSubject} className="input">
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>) : sub.department?.name}</td>
                <td className={tdClass}>{editingSubjectId === sub.id ? <input name="semester" value={editedSubject.semester || ''} onChange={handleInputChangeSubject} className="input" /> : sub.semester}</td>
                <td className={tdClass}>{editingSubjectId === sub.id ? (
                  <>
                    <button onClick={handleSaveSubjectEdit} className="btn-primary mr-2">Save</button>
                    <button onClick={handleCancelSubjectEdit} className="btn-secondary">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditSubject(sub)} className="btn-primary">Edit</button>
                )}</td>
                <td className={tdClass}><button onClick={() => handleDeleteSubject(sub.id)} className="btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Show Details</h2>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">Select Category:</label>
        <select
          id="dataSelector"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-64 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
        >
          <option value="">-- Choose an option --</option>
          <option value="users">Users</option>
          <option value="departments">Departments</option>
          <option value="subjects">Subjects</option>
        </select>
      </div>
      {selectedType && <div className="overflow-x-auto">{renderTable()}</div>}
    </div>
  );
};

export default ShowDetails;