import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AddNotes() {
  const [noteData, setNoteData] = useState({
    description: "",
    subjectId: "",
    pdfFile: null,
  });

  // used for displaying subject from db
  const [subjects, setSubjects] = useState([]);

  // used for storing subjects from db
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("https://localhost:5197/api/subjects");   //Get method is default
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

  const [submittedNotes, setSubmittedNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("https://localhost:5197/api/notes"); // ✅ your backend endpoint
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data = await response.json();
        setSubmittedNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const navigate = useNavigate();

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!noteData.pdfFile) {
  //     alert("Please upload a PDF file.");
  //     return;
  //   }

  //   const fileURL = URL.createObjectURL(noteData.pdfFile);

  //   setSubmittedNotes([
  //     ...submittedNotes,
  //     {
  //       title: noteData.description,
  //       subject: noteData.subjectId,
  //       fileName: noteData.pdfFile.name,
  //       fileURL: fileURL,
  //     },
  //   ]);

  //   setNoteData({
  //     description: "",
  //     subjectId: "",
  //     pdfFile: null,
  //   });

  //   document.getElementById("pdfUpload").value = "";
  // };

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

    } catch (error) {
      console.error("Upload failed:", error);
      alert(`Upload failed: ${error.message}`);
    }
  };

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
                    {/* add subject id to value and subject name to label */}
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

          {/* Uploaded Notes List */}
          {submittedNotes.length > 0 && (
            <div className="card shadow-sm mx-auto my-5 border-0 rounded-4" style={{ maxWidth: "800px" }}>
              <div className="card-header bg-secondary text-white rounded-top-4">
                <h5 className="mb-0">
                  <i className="fas fa-file-pdf me-2"></i>Uploaded Notes
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                {submittedNotes.map((note, index) => (
                  <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{note.description}</strong> ({note.subjects?.name || "Unknown Subject"}) <br />
                      <small className="text-muted">{note.pdfFile.split("/").pop()}</small>
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
          )}

        </div>
      </main>
    </div>
  );
}

export default AddNotes;
