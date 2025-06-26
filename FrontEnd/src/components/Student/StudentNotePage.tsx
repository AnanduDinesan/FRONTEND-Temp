import React, { useEffect, useState } from 'react';
import api from '../../api';
import Sidebar from './StudentSidebar';

interface SubjectStruct {
  id: number;
  name: string;
  semester: number;
  departmentId: number;
}

interface NoteStruct {
  id: number;
  description: string;
  pdfFile: string;
  postedDate: string;
  subjectId: number;
  userId: number;
  subjects: SubjectStruct;
}

const StudentNotePage: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectStruct[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | ''>('');
  const [notes, setNotes] = useState<NoteStruct[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get<SubjectStruct[]>(`/Subjects/dept`);
        setSubjects(res.data);
      } catch (err: any) {
        setError('Error fetching subjects.');
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = selectedSubject
          ? await api.get<NoteStruct[]>(`/notes/filter?subjectId=${selectedSubject}`)
          : await api.get<NoteStruct[]>(`/notes/dept`);
        setNotes(res.data);
        setError('');
      } catch (err: any) {
        setNotes([]);
        setError(selectedSubject ? 'No notes found for the selected subject.' : 'No notes found.');
      }
    };
    fetchNotes();
  }, [selectedSubject]);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col flex-grow items-center bg-gray-50 px-6 py-10">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-[#082d6c] mb-6">Download Notes</h2>

          <select
            className="w-full p-3 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00162c] mb-6"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(Number(e.target.value))}
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.name}
              </option>
            ))}
          </select>

          {error && <p className="text-center text-red-600 font-medium">{error}</p>}

          {notes.length > 0 && (
            <ul className="space-y-4 mt-4">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="md:col-span-2">
                    <p className="font-semibold text-lg text-gray-800">{note.description}</p>
                    <p className="text-sm text-gray-600">Subject: {note.subjects.name || 'Unknown'}</p>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    Posted: {new Date(note.postedDate).toLocaleDateString()}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mr-6">
                    <a
                      href={`http://localhost:5197/api/notes/view/${note.pdfFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </a>

                    <a
                      href={`http://localhost:5197/api/notes/download/${note.pdfFile}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  </div>

                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentNotePage;
