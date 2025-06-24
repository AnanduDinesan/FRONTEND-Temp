import { useState } from 'react';
import api from '../../api';

interface DepartmentFormData {
  id: string;
  name: string;
}

const Department: React.FC = () => {
  const [formData, setFormData] = useState<DepartmentFormData>({ id: '0', name: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.id || !formData.name) {
      alert('All fields are required');
      return;
    }

    try {
      // ✅ Send only name in the body, id in query string
      const res = await api.post(`/departments?id=${formData.id}`, {
        name: formData.name,
      });

      console.log(res.data);
      alert('Department added successfully!');
      setFormData({ id: '', name: '' });
    } catch (error: any) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Failed to add department.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-14 bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="bg-indigo-700 text-white py-4 px-6 text-center text-xl font-semibold">
        Create New Department
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* <div>
          <label className="block mb-1 text-gray-700 font-medium">Department ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter Department ID"
          />
        </div> */}

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Department Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter Department Name"
          />
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

export default Department;