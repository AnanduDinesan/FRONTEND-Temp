import React, { useState, useEffect } from 'react';
import api from '../api';
import Sidebar from './StudentSidebar';
import '../styling/StudentMarkPage.css';

const StudentMarkPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user?.id;
    
    const [semester, setSemester] = useState('');
    const [marks, setMarks] = useState([]);
    const [error, setError] = useState('');

    const semesterOptions = [
        { label: 'Sem 1', value: 1 },
        { label: 'Sem 2', value: 2 },
        { label: 'Sem 3', value: 3 },
        { label: 'Sem 4', value: 4 },
        { label: 'Sem 5', value: 5 },
        { label: 'Sem 6', value: 6 },
        { label: 'Sem 7', value: 7 },
        { label: 'Sem 8', value: 8 }
    ];

    useEffect(() => {
    const fetchStudentMarks = async () => {
        if (studentId) {
        try {
            const res = await api.get('/marks', {
            params: { studentId, semester }
            });
            setMarks(res.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch student Marks.');
        }
        }
    };
    fetchStudentMarks();
    }, [studentId]);


    return (
    <div className="student-dashboard">
        <Sidebar />
        <div className="mark-page-container">
        <h2>Your Marks</h2>
        <select
            className="semester-select"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
        >
            <option value="">---Select Semester---</option>
            {semesterOptions.map((sem) => (
            <option key={sem.value} value={sem.value}>
                {sem.label}
            </option>
            ))}
        </select>

        {error && <p className="error-text">{error}</p>}

        {marks.length > 0 && (
            <div className="marks-table">
            <table>
                <thead>
                <tr>
                    <th>Subject</th>
                    <th>Internal 1</th>
                    <th>Internal 2</th>
                    <th>External</th>
                    <th>Total Mark</th>
                </tr>
                </thead>
                <tbody>
                {marks.map((mark, index) => (
                    <tr key={index}>
                    <td>{mark.subject}</td>
                    <td>{mark.exam1}</td>
                    <td>{mark.exam2}</td>
                    <td>{mark.semExam}</td>
                    <td>{mark.exam1 + mark.exam2 + mark.semExam}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    </div>
    );
};

export default StudentMarkPage;
