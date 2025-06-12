import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import StudentHomePage from "./components/StudentHomePage";
import StudentMarkPage from "./components/StudentMarkPage";
import StudentNotePage from "./components/StudentNotePage";

import HomePage from "./components/HomePage";
import UploadMarks from "./components/UploadMarks";
import AddNotes from "./components/AddNotes";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentHomePage />} />
        <Route path="/student-marks" element={<StudentMarkPage />} />
        <Route path="/student-notes" element={<StudentNotePage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/uploadMarks" element={<UploadMarks />} />
        <Route path="/addNotes" element={<AddNotes />} />
      </Routes>
    </Router>
  );
}

export default App;

