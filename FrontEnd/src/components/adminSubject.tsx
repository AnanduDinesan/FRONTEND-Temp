import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import '../styling/adminSubject.css';
import Navbar from './adminNavbar';
import api from '../api';

// Define types
interface FormData {
  id: string;
  name: string;
  departmentId: string;
  semester: string;
}

interface Department {
  id: string;
  name: string;
}

interface Semester {
  id: string;
  name: string;
}

const Subject = () => {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    departmentId: '',
    semester: ''
  });

  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get<Department[]>('/departments');
        console.log(res.data);
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };
    fetchDepartments();
  }, []);

  // Static semester list
  const semesters: Semester[] = [
    { id: '1', name: 'Semester 1' },
    { id: '2', name: 'Semester 2' },
    { id: '3', name: 'Semester 3' },
    { id: '4', name: 'Semester 4' },
    { id: '5', name: 'Semester 5' },
    { id: '6', name: 'Semester 6' },
    { id: '7', name: 'Semester 7' },
    { id: '8', name: 'Semester 8' }
  ];

  // Handle input and select changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.departmentId || !formData.semester) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await api.post("/Subjects", formData);
      console.log(res);
      alert("Subject added successfully!");

      // Reset the form
      setFormData({
        id: '',
        name: '',
        departmentId: '',
        semester: ''
      });
    } catch (err) {
      console.error("Error adding subject:", err);
      alert("Failed to add subject.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="subject-container">
        <h2>Add Subject</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Subject Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Semester:</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="">Select Semester</option>
              {semesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Add Subject</button>
        </form>
      </div>
    </>
  );
};

export default Subject;
