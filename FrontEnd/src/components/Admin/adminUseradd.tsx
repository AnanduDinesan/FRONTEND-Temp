import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '../../api';

interface UserFormData {
  id: string;
  name: string;
  email: string;
  role: string;
  departmentId: string;
  password: string;
}

interface Department {
  id: string;
  name: string;
}

function User() {
  const [formData, setFormData] = useState<UserFormData>({
    id: '0',
    name: '',
    email: '',
    role: '',
    departmentId: '',
    password: ''
  });

  const [departments, setDepartments] = useState<Department[]>([]);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, name, email, role, departmentId, password } = formData;

    if (!name || !email || !role || !departmentId || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await api.post("/User/add", formData);
      alert("User added successfully!");

      setFormData({
        id: '',
        name: '',
        email: '',
        role: '',
        departmentId: '',
        password: ''
      });
    } catch (err) {
      console.error("Error creating user:", err.response.data);
      alert(err.response.data);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-14 bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="bg-indigo-700 text-white py-4 px-6 text-center text-xl font-semibold">
        Create New User
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* <div>
          <label className="block mb-1 text-gray-700 font-medium">User ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter User ID"
          />
        </div> */}

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter Full Name"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter Email Address"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Department</label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Create Password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition"
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export default User;