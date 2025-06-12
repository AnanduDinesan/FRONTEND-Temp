import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import StudentHomePage from "./components/StudentHomePage";
import StudentMarkPage from "./components/StudentMarkPage";
import StudentNotePage from "./components/StudentNotePage";

import HomePage from "./components/HomePage";
import UploadMarks from "./components/UploadMarks";
import AddNotes from "./components/addNotes";

import Department from './components/adminDepartment';
import User from './components/adminUseradd';
import Subject from './components/adminSubject';
import ShowDetails from './components/adminShowDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<Department />} />
        <Route path="/department" element={<Department />} />
        <Route path="/user" element={<User />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/showdetails" element={<ShowDetails />} />
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

