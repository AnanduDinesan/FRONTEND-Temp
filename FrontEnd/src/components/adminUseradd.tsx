import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '../api';
import '../styling/adminUseradd.css';
import Navbar from './adminNavbar';

// ✅ Interface for user form data
interface UserFormData {
  id: string;
  name: string;
  email: string;
  role: string;
  departmentId: string;
  password: string;
}

// ✅ Interface for department data
interface Department {
  id: string;
  name: string;
}

function User() {
  const [formData, setFormData] = useState<UserFormData>({
    id: '',
    name: '',
    email: '',
    role: '',
    departmentId: '',
    password: ''
  });

  const [departments, setDepartments] = useState<Department[]>([]);

  // ✅ Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get<Department[]>('/departments');
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  // ✅ Handle input/select change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, name, email, role, departmentId, password } = formData;

    if (!id || !name || !email || !role || !departmentId || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await api.post("/User/add", formData);
      console.log(res);
      alert("User added successfully!");

      // Reset form
      setFormData({
        id: '',
        name: '',
        email: '',
        role: '',
        departmentId: '',
        password: ''
      });
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="user-container">
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID:</label>
            <input type="text" name="id" value={formData.id} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select name="departmentId" value={formData.departmentId} onChange={handleChange} required>
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit">Create User</button>
        </form>
      </div>
    </>
  );
}

export default User;
