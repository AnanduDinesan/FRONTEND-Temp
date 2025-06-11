import React, { useEffect, useState } from 'react';
import api from '../api';
import Sidebar from './StudentSidebar';
import '../styling/StudentNotePage.css';

const StudentNotePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const departmentId = user?.departmentId;

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
        if (departmentId) {
        try {
            const res = await api.get('/subjects', { params: { departmentId } });
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
            const res = await api.get('/notes', { params: { subject: selectedSubject } });
            setNotes(res.data);
            setError('');
        } catch (err) {
            setNotes([]);
            setError('No notes found for the selected subject.');
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
            <option key={subj.id} value={subj.name}>
              {subj.name}
            </option>
          ))}
        </select>

        {error && <p className="error-text">{error}</p>}

        {notes.length > 0 && (
          <ul className="notes-list">
            {notes.map((note, index) => (
              <li key={index} className="note-item">
                <p><strong>{note.subject}</strong> - {new Date(note.postedDate).toLocaleDateString()}</p>
                <a href={note.link} target="_blank" rel="noopener noreferrer" download>
                  Download
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
