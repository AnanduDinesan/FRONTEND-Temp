import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import api from '../../api';


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
    id: '0',
    name: '',
    departmentId: '',
    semester: ''
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.departmentId || !formData.semester) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await api.post("/Subjects", formData);
      alert("Subject added successfully!");
      setFormData({ id: '', name: '', departmentId: '', semester: '' });
    } catch (err) {
      console.error("Error adding subject:", err);
      alert("Failed to add subject.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-14 bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="bg-indigo-700 text-white py-4 px-6 text-center text-xl font-semibold">
        Create New Subject
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* <div>
          <label className="block mb-1 text-gray-700 font-medium">Subject ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter Subject ID"
          />
        </div> */}

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Subject Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter Subject Name"
          />
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
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem.id} value={sem.id}>
                {sem.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Subject;