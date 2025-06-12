import { useState } from 'react';
import '../styling/adminUseradd.css'; 
import Navbar from './adminNavbar'; // ✅ Navbar imported locally

function User() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    deptid: '',
    password: ''
  });

  const departments = [
    { deptId: 'CSE', deptName: 'Computer Science' },
    { deptId: 'ECE', deptName: 'Electronics and Communication' },
    { deptId: 'ME', deptName: 'Mechanical Engineering' },
    { deptId: 'CE', deptName: 'Civil Engineering' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.email || !formData.role || !formData.deptid || !formData.password) {
      alert("Please fill all fields.");
      return;
    }

    console.log("Submitted user data:", formData);
    alert("User created successfully!");

    setFormData({
      id: '',
      name: '',
      email: '',
      role: '',
      deptid: '',
      password: ''
    });
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
            <select name="deptid" value={formData.deptid} onChange={handleChange} required>
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.deptId} value={dept.deptId}>
                  {dept.deptName}
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



// // src/components/User.jsx
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './styles/User.css'; // Optional styling

// const User = () => {
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     email: '',
//     role: '',
//     deptid: '',
//     password: ''
//   });

//   const [departments, setDepartments] = useState([]);

//   // Fetch departments from backend
//   useEffect(() => {
//     axios.get("http://localhost:8080/api/departments")
//       .then(res => {
//         setDepartments(res.data); 
//       })
//       .catch(err => {
//         console.error("Error fetching departments:", err);
//       });
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Submit form to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.id || !formData.name || !formData.email || !formData.role || !formData.deptid || !formData.password) {
//       alert("Please fill all fields.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:8080/api/users", formData);
//       alert("User created successfully!");

//       // Reset form
//       setFormData({
//         id: '',
//         name: '',
//         email: '',
//         role: '',
//         deptid: '',
//         password: ''
//       });
//     } catch (err) {
//       console.error("Error creating user:", err);
//       alert("Failed to create user.");
//     }
//   };

//   return (
//     <div className="user-container">
//       <h2>Create User</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>ID:</label>
//           <input type="text" name="id" value={formData.id} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Role:</label>
//           <select name="role" value={formData.role} onChange={handleChange} required>
//             <option value="">Select Role</option>
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Department:</label>
//           <select name="deptid" value={formData.deptid} onChange={handleChange} required>
//             <option value="">Select Department</option>
//             {departments.map(dept => (
//               <option key={dept.deptId} value={dept.deptId}>
//                 {dept.deptName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Password:</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>

//         <button type="submit">Create User</button>
//       </form>
//     </div>
//   );
// };

// export default User;
