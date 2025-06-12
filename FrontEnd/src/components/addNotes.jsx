import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

function AddNotes() {
  const [noteData, setNoteData] = useState({
    description: "",
    subjectId: "",
    pdfFile: null,
  });

  const [subjects, setSubjects] = useState([]);
  const [submittedNotes, setSubmittedNotes] = useState([]);
  const [filterSemester, setFilterSemester] = useState("");
  const [filterSubjectId, setFilterSubjectId] = useState("");

  const navigate = useNavigate();

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("https://localhost:5197/api/subjects");
        if (!response.ok) throw new Error("Failed to fetch subjects.");
        const data = await response.json();
        setSubjects(data);
      } catch (err) {
        console.error(err);
        alert("Unable to load subjects.");
      }
    };

    fetchSubjects();
  }, []);

  // Fetch uploaded notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("https://localhost:5197/api/notes");
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data = await response.json();
        setSubmittedNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setNoteData((prev) => ({
        ...prev,
        pdfFile: file,
      }));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noteData.pdfFile || !noteData.subjectId || !noteData.description) {
      alert("Please fill in all required fields and upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", noteData.pdfFile);
    formData.append("subjectId", parseInt(noteData.subjectId));
    formData.append("description", noteData.description);

    try {
      const response = await fetch("https://localhost:5197/api/notes/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();
      alert("Note uploaded successfully!");
      console.log(result);

      setNoteData({
        description: "",
        subjectId: "",
        pdfFile: null,
      });
      document.getElementById("pdfUpload").value = "";

      // Refresh the notes list
      const updatedNotes = await fetch("https://localhost:5197/api/notes");
      setSubmittedNotes(await updatedNotes.json());
    } catch (error) {
      console.error("Upload failed:", error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  // Get unique semesters from subjects
  const uniqueSemesters = [...new Set(subjects.map((sub) => sub.semester))];

  // Filter notes
  const filteredNotes = submittedNotes.filter((note) => {
    const matchSemester = filterSemester
      ? note.subjects?.semester === parseInt(filterSemester)
      : true;
    const matchSubject = filterSubjectId
      ? note.subjectId === parseInt(filterSubjectId)
      : true;
    return matchSemester && matchSubject;
  });

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4 d-flex flex-column" style={{ width: "220px" }}>
        <h4 className="mb-4 text-center">
          <i className="fas fa-user-tie me-2"></i>Teacher Panel
        </h4>
        <nav className="nav flex-column">
          <button className="btn text-start text-white mb-2 sidebar-link" onClick={() => navigate("/homePage")}>
            <i className="fas fa-home me-2"></i>Home
          </button>
          <button className="btn text-start text-white mb-2 sidebar-link" onClick={() => navigate("/uploadMarks")}>
            <i className="fas fa-upload me-2"></i>Upload Marks
          </button>
          <button className="btn btn-outline-light text-start active mb-2 sidebar-link" disabled>
            <i className="fas fa-book me-2"></i>Add Notes
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-light overflow-auto">
        <div className="container">
          {/* Upload Card */}
          <div className="card shadow-lg mx-auto border-0 rounded-4" style={{ maxWidth: "700px" }}>
            <div className="card-header bg-info text-white rounded-top-4">
              <h4 className="mb-0">
                <i className="fas fa-sticky-note me-2"></i>Upload Notes as PDF
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={noteData.description}
                    onChange={handleChange}
                    placeholder="Enter note title"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Subject</label>
                  <select
                    className="form-select"
                    name="subjectId"
                    value={noteData.subjectId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Subject --</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Upload PDF</label>
                  <input
                    type="file"
                    className="form-control"
                    id="pdfUpload"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-info w-100 text-white fw-semibold">
                  <i className="fas fa-upload me-2"></i>Upload PDF
                </button>
              </form>
            </div>
          </div>

          {/* Filter Section */}
          <div className="d-flex gap-3 my-4">
            <div className="form-group">
              <label className="fw-bold">Semester</label>
              <select
                  className="form-select"
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)}
                >
                  <option value="">Semester 1</option>
                  {[1, 2, 3, 4, 5, 6,7,8].map((sem) => (
                    <option key={sem} value={sem}>{`Semester ${sem}`}</option>
                  ))}
                </select>
            </div>

            <div className="form-group">
              <label className="fw-bold">Subject</label>
              <select
                className="form-select"
                value={filterSubjectId}
                onChange={(e) => setFilterSubjectId(e.target.value)}
              >
                <option value="">All Subjects</option>
                {subjects.map((subj) => (
                  <option key={subj.id} value={subj.id}>
                    {subj.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Uploaded Notes List */}
          {filteredNotes.length > 0 ? (
            <div className="card shadow-sm mx-auto my-4 border-0 rounded-4" style={{ maxWidth: "800px" }}>
              <div className="card-header bg-secondary text-white rounded-top-4">
                <h5 className="mb-0">
                  <i className="fas fa-file-pdf me-2"></i>Filtered Uploaded Notes
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                {filteredNotes.map((note) => (
                  <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{note.description}</strong> ({note.subjects?.name || "Unknown Subject"}, Semester {note.subjects?.semester}) <br />
                      <small className="text-muted">{note.pdfFile?.split("/").pop()}</small>
                    </div>
                    <a
                      href={`https://localhost:5197/api/notes/download/${note.pdfFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="fas fa-eye me-1"></i>View
                    </a>
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
  );
}

export default AddNotes;
