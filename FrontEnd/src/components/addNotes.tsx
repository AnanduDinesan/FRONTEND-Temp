import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Type definitions
interface Subject {
  id: number;
  name: string;
  semester: number;
}

interface Note {
  id: number;
  description: string;
  subjectId: number;
  pdfFile: string;
  subjects: Subject;
}

interface NoteData {
  userId: number;
  description: string;
  subjectId: number;
  pdfFile: File | null;
}

interface User {
  id: number;
  departmentId: number;
}

function AddNotes() {
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;
  const departmentId = user?.departmentId;

  const [noteData, setNoteData] = useState<NoteData>({
    userId: userId ?? 0,
    description: "",
    subjectId: 0,
    pdfFile: null,
  });

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [submittedNotes, setSubmittedNotes] = useState<Note[]>([]);
  const [filterSemester, setFilterSemester] = useState<string>("");
  const [filterSubjectId, setFilterSubjectId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get<Subject[]>(`/subjects/department/${departmentId}`);
        setSubjects(response.data);
      } catch (err) {
        console.error(err);
        alert("Unable to load subjects.");
      }
    };

    const fetchNotes = async () => {
      try {
        const response = await api.get<Note[]>(`/notes/teacher/${userId}`);
        setSubmittedNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (departmentId && userId) {
      fetchSubjects();
      fetchNotes();
    }
  }, [departmentId, userId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setNoteData((prev) => ({
        ...prev,
        pdfFile: file,
      }));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!noteData.pdfFile || !noteData.subjectId || !noteData.description) {
      alert("Please fill in all required fields and upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", noteData.pdfFile);
    formData.append("subjectId", noteData.subjectId.toString());
    formData.append("description", noteData.description);
    formData.append("userId", noteData.userId.toString());

    try {
      await api.post("/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Note uploaded successfully!");
      const inputEl = document.getElementById("pdfUpload") as HTMLInputElement;
      if (inputEl) inputEl.value = "";

      setNoteData({
        userId: userId ?? 0,
        description: "",
        subjectId: 0,
        pdfFile: null,
      });

      const updatedNotes = await api.get<Note[]>(`/notes/teacher/${userId}`);
      setSubmittedNotes(updatedNotes.data);
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(`Upload failed: ${error.response?.data || error.message}`);
    }
  };

  const handleDelete = async (noteId: number) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${noteId}`);
      alert("Note deleted successfully.");
      setSubmittedNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("An error occurred while deleting.");
    }
  };

  const uniqueSemesters = [...new Set(subjects.map((sub) => sub.semester))];

  const filteredNotes = submittedNotes.filter((note) => {
    const matchSemester = filterSemester ? note.subjects?.semester === parseInt(filterSemester) : true;
    const matchSubject = filterSubjectId ? note.subjectId === parseInt(filterSubjectId) : true;
    return matchSemester && matchSubject;
  });

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <aside className="bg-dark text-white d-flex flex-column justify-content-between" style={{ width: "220px", minHeight: "100vh" }}>
        <div className="p-4">
          <div className="h4 mb-4 d-flex align-items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" width="30" className="me-2" />
            <span>TeachNote</span>
          </div>
          <nav className="nav flex-column">
            <button className="btn text-start text-white mb-2" onClick={() => navigate("/homePage")}>
              <i className="fas fa-home me-2"></i> Home
            </button>
            <button className="btn text-start text-white mb-2" onClick={() => navigate("/uploadMarks")}>
              <i className="fas fa-upload me-2"></i> Upload Marks
            </button>
            <button className="btn btn-outline-light text-start active" disabled>
              <i className="fas fa-sticky-note me-2"></i> Add Notes
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column bg-lightblue">
        <header className="d-flex justify-content-end align-items-center p-3 border-bottom bg-white shadow-sm">
          <div className="d-flex align-items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Teacher Avatar" className="rounded-circle me-3" width="40" height="40" />
            <button className="btn btn-outline-danger" onClick={() => navigate("/")}>Logout</button>
          </div>
        </header>

        <main className="flex-grow-1 overflow-auto p-4">
          <div className="container">
            <div className="card shadow-lg p-4 rounded-4 border-0 mx-auto" style={{ maxWidth: "700px" }}>
              <h4 className="fw-bold mb-3 text-primary text-center">
                <i className="fas fa-sticky-note me-2"></i>Upload Notes
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input type="text" className="form-control" name="description" value={noteData.description} onChange={handleChange} placeholder="Enter note title" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Subject</label>
                  <select className="form-select" name="subjectId" value={noteData.subjectId} onChange={handleChange} required>
                    <option value="">-- Select Subject --</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Upload PDF</label>
                  <input type="file" className="form-control" id="pdfUpload" accept="application/pdf" onChange={handleFileChange} required />
                </div>
                <button type="submit" className="btn btn-info text-white w-100 fw-semibold">
                  <i className="fas fa-upload me-2"></i>Upload
                </button>
              </form>
            </div>

            {/* Filters */}
            <div className="d-flex gap-3 my-4">
              <div className="form-group">
                <label className="fw-bold">Semester</label>
                <select className="form-select" value={filterSemester} onChange={(e:React.ChangeEvent<HTMLSelectElement> ) => setFilterSemester(e.target.value)}>
                  <option value="">All Semesters</option>
                  {uniqueSemesters.map((sem) => (
                    <option key={sem} value={sem.toString()}>Semester {sem}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="fw-bold">Subject</label>
                <select className="form-select" value={filterSubjectId} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setFilterSubjectId(e.target.value)}>
                  <option value="">All Subjects</option>
                  {subjects.map((subj) => (
                    <option key={subj.id} value={subj.id.toString()}>{subj.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes List */}
            {filteredNotes.length > 0 ? (
              <div className="card shadow-sm rounded-4 border-0">
                <div className="card-header bg-secondary text-white rounded-top-4">
                  <h5 className="mb-0"><i className="fas fa-file-pdf me-2"></i>Uploaded Notes</h5>
                </div>
                <ul className="list-group list-group-flush">
                  {filteredNotes.map((note) => (
                    <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{note.description}</strong> ({note.subjects?.name || "Unknown Subject"}, Semester {note.subjects?.semester})
                        <br />
                        <small className="text-muted">{note.pdfFile?.split("/").pop()}</small>
                      </div>
                      <div className="d-flex">
                        <a href={`http://localhost:5197/api/notes/view/${note.pdfFile}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                          <i className="fas fa-eye me-1"></i>View
                        </a>
                        <a href={`http://localhost:5197/api/notes/download/${note.pdfFile}`} className="btn btn-outline-success btn-sm ms-2">
                          <i className="fas fa-download me-1"></i>Download
                        </a>
                        <button onClick={() => handleDelete(note.id)} className="btn btn-outline-danger btn-sm ms-2">
                          <i className="fas fa-trash me-1"></i>Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="alert alert-warning mt-4">No notes found for the selected filters.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddNotes;
