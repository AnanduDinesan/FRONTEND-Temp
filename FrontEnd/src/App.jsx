import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import StudentMarkPage from './components/StudentMarkPage';
import StudentNotePage from './components/StudentNotePage';
import StudentHomePage from './components/StudentHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentHomePage />} />
        <Route path="/student-marks" element={<StudentMarkPage />} />
        <Route path="/student-notes" element={<StudentNotePage />} />
        </Routes>
    </Router>
  );
}

export default App;
