import React, { useState, useEffect } from 'react';
import api from '../api';
import Sidebar from './StudentSidebar';
import '../styling/StudentMarkPage.css';

interface LocalUser{
    role:string; 
    name: string;
    id: string;
    departmentId: string;
    email: string;
}

interface MarkStruct{
    mark:{
        id: number;
        subjectId: number;
        internal1: number;
        internal2: number;
        external: number;
        total: number;
        userId: string;
    }
    subject:{
        id: number;
        name: string;
        semester: number;
        departmentId: string;
    }
}

interface ResponseStruct{
    semester: number;
    semesterTotal: number|null;
    subjects: MarkStruct[];
}


const StudentMarkPage :React.FC = () => {
    const localuser = localStorage.getItem('user');
    const user: LocalUser | null = localuser ? JSON.parse(localuser) : null
    const studentId = user?.id;

    const [semester, setSemester] = useState<number|''>('');
    const [marks, setMarks] = useState<MarkStruct[]>([]);
    const [semesterTotal, setSemesterTotal] = useState<number|null>(null);
    const [error, setError] = useState<string>('');

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
            if (studentId && semester !== '') {
                try {
                    const res = await api.get<ResponseStruct>(`marks/student/${studentId}/semester/${semester}`);
                    console.log(res.data);
                    setMarks(res.data.subjects || []);
                    setSemesterTotal(res.data.semesterTotal || null);
                    setError('');
                } catch (error:any) {
                    setError('No marks found for this semester.');
                    setMarks([]);
                    setSemesterTotal(null);
                }
            }
        };
        fetchStudentMarks();
    }, [studentId, semester]);

    return (
        <div className="student-dashboard">
            <Sidebar />
            <div className="mark-page-container">
                <h2>Your Marks</h2>

                <select
                    className="semester-select"
                    value={semester}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSemester(Number(e.target.value))}>
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
                                {marks.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.subject.name}</td>
                                        <td>{item.mark.internal1}</td>
                                        <td>{item.mark.internal2}</td>
                                        <td>{item.mark.external}</td>
                                        <td>{item.mark.internal1 + item.mark.internal2 + item.mark.external}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {semesterTotal !== null && (
                    <div className="semester-total">
                        <p>Total Marks for Semester {semester}: <strong>{semesterTotal}</strong></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentMarkPage;
