import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";


interface Subject { id: number; name: string; semester: number; }
interface Note { id: number; description: string; subjectId: number; pdfFile: string; subjects: Subject; }
interface NoteData { userId: number; description: string; subjectId: number; pdfFile: File | null; }
interface User { id: number; departmentId: number; }

function AddNotes() {
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;
  const departmentId = user?.departmentId;

  const [noteData, setNoteData] = useState<NoteData>({
    userId: userId ?? 0,
    description: "",
    subjectId: 0,
    pdfFile: null
  });

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [submittedNotes, setSubmittedNotes] = useState<Note[]>([]);
  const [filterSemester, setFilterSemester] = useState<string>("");
  const [filterSubjectId, setFilterSubjectId] = useState<string>("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');  
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get(`/subjects/department/${departmentId}`);
        setSubjects(res.data);
      } catch {
        alert("Unable to load subjects.");
      }
    };

    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/teacher/${userId}`);
        setSubmittedNotes(res.data);
      } catch {}
    };

    if (departmentId && userId) {
      fetchSubjects();
      fetchNotes();
    }
  }, [departmentId, userId]);

  // Handles input and select changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles PDF file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setNoteData((prev) => ({ ...prev, pdfFile: file }));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Submit note to server
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { description, pdfFile, subjectId } = noteData;

    if (!description || !pdfFile || !subjectId)
      return alert("Fill all fields and upload a PDF.");

    const formData = new FormData();
    formData.append("pdfFile", pdfFile);
    formData.append("subjectId", subjectId.toString());
    formData.append("description", description);
    formData.append("userId", userId?.toString() ?? "");

    try {
      await api.post("/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Note uploaded!");

      // Reset form
      const inputEl = document.getElementById("pdfUpload") as HTMLInputElement;
      if (inputEl) inputEl.value = "";
      setNoteData({ userId: userId ?? 0, description: "", subjectId: 0, pdfFile: null });

      // Refresh notes list
      const updated = await api.get(`/notes/teacher/${userId}`);
      setSubmittedNotes(updated.data);
    } catch {
      alert("Upload failed.");
    }
  };

  // Delete a note
  const handleDelete = async (noteId: number) => {
    if (!confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${noteId}`);
      setSubmittedNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch {
      alert("Delete failed.");
    }
  };

  // Unique semesters for filtering
  const uniqueSemesters = [...new Set(subjects.map((s) => s.semester))];

  // Filter notes by semester and subject
  const filteredNotes = submittedNotes.filter((note) => {
    const matchSemester = filterSemester ? note.subjects?.semester === parseInt(filterSemester) : true;
    const matchSubject = filterSubjectId ? note.subjectId === parseInt(filterSubjectId) : true;
    return matchSemester && matchSubject;
  });

  return (
    <div className="flex h-screen">
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
      <div className="flex-1 flex flex-col bg-blue-50">
        <header className="flex justify-end items-center p-4 shadow bg-white">
          <div className="flex items-center gap-4">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Avatar" className="w-10 h-10 rounded-full" />
            <button onClick={handleLogout} className="text-red-500 border border-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white">Logout</button>
          </div>
        </header>

        <main className="p-6 overflow-y-auto">
          {/* Upload Form */}
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Upload Notes</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title Field */}
              <div>
                <input
                  type="text"
                  name="description"
                  value={noteData.description}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Subject Dropdown with gap */}
              <div className="mt-4">
                <select
                  name="subjectId"
                  value={noteData.subjectId}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">-- Select Subject --</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* File Upload */}
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                id="pdfUpload"
                required
                className="w-full"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Upload
              </button>
            </form>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mt-6">
            <select
              className="p-2 border rounded"
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
            >
              <option value="">All Semesters</option>
              {uniqueSemesters.map((s) => <option key={s} value={s}>{`Semester ${s}`}</option>)}
            </select>
            <select
              className="p-2 border rounded"
              value={filterSubjectId}
              onChange={(e) => setFilterSubjectId(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          {/* Notes List */}
          {filteredNotes.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {filteredNotes.map((note) => (
                <li key={note.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{note.description}</h3>
                    <p className="text-sm text-gray-500">{note.subjects.name} - Semester {note.subjects.semester}</p>
                    <p className="text-xs text-gray-400">{note.pdfFile?.split("/").pop()}</p>
                  </div>
                  <div className="flex gap-2">
                    <a href={`http://localhost:5197/api/notes/view/${note.pdfFile}`} target="_blank" className="text-blue-500 underline text-sm">View</a>
                    <a href={`http://localhost:5197/api/notes/download/${note.pdfFile}`} className="text-green-600 underline text-sm">Download</a>
                    <button onClick={() => handleDelete(note.id)} className="text-red-500 underline text-sm">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-center text-gray-600">No notes found.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default AddNotes;