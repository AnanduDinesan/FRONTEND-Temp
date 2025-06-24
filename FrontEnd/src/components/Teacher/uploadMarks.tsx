import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

interface MarkDetails {
  subject: string;
  userId: number;
  internal1: number;
  internal2: number;
  external: number;
}

const UploadMarks: React.FC = () => {

  const [formData, setFormData] = useState<MarkDetails>({
    subject: "",
    userId: 0,
    internal1: 0,
    internal2: 0,
    external: 0,
  });

  const [subjects, setSubjects] = useState<any[]>([]);
  const [submittedData, setSubmittedData] = useState<MarkDetails[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get(`subjects/dept`);
        setSubjects(res.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["internal1", "internal2", "external", "userId"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedSubject = subjects.find((s) => s.name === formData.subject);
    if (!selectedSubject) {
      alert("Invalid subject selected.");
      return;
    }

    const payload = {
      subjectId: selectedSubject.id,
      userId: formData.userId,
      internal1: formData.internal1,
      internal2: formData.internal2,
      external: formData.external,
    };

    try {
      await api.post("/marks", payload);
      setSubmittedData([...submittedData, { ...formData }]);
      setFormData({
        subject: "",
        userId: 0,
        internal1: 0,
        internal2: 0,
        external: 0,
      });
    } catch (error: any) {
      console.error("Error saving marks:", error.response?.data?.message);
      alert("Failed to submit marks.\n" + error.response?.data?.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
     <aside className="w-56 bg-gray-800 text-white flex flex-col justify-between">
  <div className="p-6">
    <div className="text-2xl font-bold mb-8">TeachNote</div>

    <nav className="space-y-4">
      <button
        className="w-full text-left text-lg px-4 py-3 hover:bg-gray-700 rounded"
        onClick={() => navigate("/homePage")}
      >
        Home
      </button>

      <button
        className="w-full text-left text-lg px-4 py-3 hover:bg-gray-700 rounded"
        onClick={() => navigate("/addNotes")}
      >
        Add Notes
      </button>

      <button
        className="w-full text-left text-lg px-4 py-3 hover:bg-gray-700 rounded"
        onClick={() => navigate("/uploadMarks")}
      >
        Upload Marks
      </button>
    </nav>
  </div>
</aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Top Navbar */}
        <header className="flex justify-end items-center px-6 py-4 bg-white shadow">
          <div className="flex items-center gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Upload Form */}
        <main className="flex-1 overflow-auto p-6 flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Upload Student Marks</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">-- Select Subject --</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name} (Sem {subject.semester},{" "}
                        {subject.department?.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Student ID</label>
                  <input
                    type="number"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">
                      Internal Mark 1
                    </label>
                    <input
                      type="number"
                      name="internal1"
                      value={formData.internal1}
                      onChange={handleChange}
                      min="0"
                      max="25"
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Internal Mark 2
                    </label>
                    <input
                      type="number"
                      name="internal2"
                      value={formData.internal2}
                      onChange={handleChange}
                      min="0"
                      max="25"
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">External Marks</label>
                  <input
                    type="number"
                    name="external"
                    value={formData.external}
                    onChange={handleChange}
                    min="0"
                    max="50"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Submit Marks
                </button>
              </form>
            </div>

            {/* Submitted Data */}
            {submittedData.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Submitted Marks</h3>
                <div className="overflow-auto">
                  <table className="w-full border text-center text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border px-2 py-1">#</th>
                        <th className="border px-2 py-1">Subject</th>
                        <th className="border px-2 py-1">User ID</th>
                        <th className="border px-2 py-1">Internal 1</th>
                        <th className="border px-2 py-1">Internal 2</th>
                        <th className="border px-2 py-1">External</th>
                        <th className="border px-2 py-1">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedData.map((entry, index) => (
                        <tr key={index}>
                          <td className="border px-2 py-1">{index + 1}</td>
                          <td className="border px-2 py-1">{entry.subject}</td>
                          <td className="border px-2 py-1">{entry.userId}</td>
                          <td className="border px-2 py-1">{entry.internal1}</td>
                          <td className="border px-2 py-1">{entry.internal2}</td>
                          <td className="border px-2 py-1">{entry.external}</td>
                          <td className="border px-2 py-1">
                            {entry.internal1 + entry.internal2 + entry.external}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadMarks;