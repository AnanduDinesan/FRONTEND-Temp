import React, { useEffect, useState } from 'react';
import api from '../api';
import Sidebar from './StudentSidebar';
import '../styling/StudentNotePage.css';

interface LocalUser{
    role:string; 
    name: string;
    id: number;
    departmentId: number;
    email: string;
}

interface SubjectStruct {
    id: number;
    name: string;
    semester: number;
    departmentId: number;
}

interface NoteStruct{
    id: number;
    description: string;
    pdfFile: string;
    postedDate: string;
    subjectId: number;
    userId: number;
    subjects: SubjectStruct;
}

const StudentNotePage:React.FC = () => {
  const localuser = localStorage.getItem('user');
  const user:LocalUser|null = localuser ?JSON.parse(localuser) : null;
  const departmentId = user?.departmentId;

  const [subjects, setSubjects] = useState<SubjectStruct[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number|''>('');
  const [notes, setNotes] = useState<NoteStruct[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      if (departmentId) {
        try {
          const res = await api.get<SubjectStruct[]>(`/Subjects/department/${departmentId}`);
          setSubjects(res.data);
        } catch (err:any) {
          setError('Error fetching subjects.');
        }
      }
    };
    fetchSubjects();
  }, [departmentId]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = selectedSubject
          ? await api.get<NoteStruct[]>(`/notes/filter?subjectId=${selectedSubject}`)
          : await api.get<NoteStruct[]>(`/notes/department/${departmentId}`);
        setNotes(res.data);
        setError('');
      } catch (err:any) {
        setNotes([]);
        setError(selectedSubject ? 'No notes found for the selected subject.' : 'No notes found.');
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
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSubject(Number(e.target.value))}
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
            {notes.map((note) => (
              <li key={note.id} className="note-item">
                <div>
                  <strong>{note.description}</strong> ({note.subjects.name || "Unknown Subject"})<br />
                  <small className="text-muted">{note.pdfFile}</small>
                </div>
                <p>{new Date(note.postedDate).toLocaleDateString()}</p>
                <div>
                  <a
                    href={`http://localhost:5197/api/notes/view/${note.pdfFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    <i className="fas fa-eye me-1"></i> View
                  </a>
                  <a
                    href={`http://localhost:5197/api/notes/download/${note.pdfFile}`}
                    className="btn btn-outline-success btn-sm ms-2"
                  >
                    <i className="fas fa-download me-1"></i> Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentNotePage;
