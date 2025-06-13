import React, { useEffect, useState } from 'react';
import api from '../api';
import Sidebar from './StudentSidebar';
import '../styling/StudentNotePage.css';

const StudentNotePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const departmentId = user?.departmentId;
  // const departmentId = 2;    //used for static testing
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
        if (departmentId) {
        try {
            const res = await api.get(`/Subjects/department/${departmentId}`);
            setSubjects(res.data);
        } catch (err) {
            setError('Error fetching subjects.');
        }
        }
    };
    fetchSubjects();
  }, [departmentId]);

  useEffect(() => {
    const fetchNotes = async () => {
        if (selectedSubject) {
          try {
              const res = await api.get(`/notes/filter?subjectId=${selectedSubject}`);
              setNotes(res.data);
              setError('');
          } catch (err) {
              setNotes([]);
              setError('No notes found for the selected subject.');
          }
        }else{
          try{
            const res = await api.get(`/notes/department/${departmentId}`);
            setNotes(res.data);
            console.log(res);
              setError('');
          } catch (err) {
              setNotes([]);
              setError('No notes found.');
          }
        }
    };
    fetchNotes();
  }, [selectedSubject]);


  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="note-page-container">
        <h2>Download Notes</h2>
        <select
          className="subject-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((subj) => (
            <option key={subj.id} value={subj.id}>
              {subj.name}
            </option>
          ))}
        </select>

        {error && <p className="error-text">{error}</p>}

        {notes.length > 0 && (
          <ul className="notes-list">
            {notes.map((note, index) => (
              <li key={index} className="note-item">
                <div>
                  <strong>{note.description}</strong> ({note.subjects?.name || "Unknown Subject"}) <br />
                  <small className="text-muted">{note.pdfFile}</small>
                </div>
                <p><strong>{note.subject}</strong> {new Date(note.postedDate).toLocaleDateString()}</p>
                <a
                  href={`http://localhost:5197/api/notes/view/${note.pdfFile}`}    // GET: api/notes/view/abc123.pdf 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                <i className="fas fa-eye me-1"></i>View
                </a>
                <a
                  href={`http://localhost:5197/api/notes/download/${note.pdfFile}`}
                  className="btn btn-outline-success btn-sm ms-2"
                >
                 <i className="fas fa-download me-1"></i>Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentNotePage;
