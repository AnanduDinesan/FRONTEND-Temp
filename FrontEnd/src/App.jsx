import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import StudentHomePage from "./components/Student/StudentHomePage";
import StudentMarkPage from "./components/Student/StudentMarkPage";
import StudentNotePage from "./components/Student/StudentNotePage";

import HomePage from "./components/Teacher/HomePage";
import UploadMarks from "./components/Teacher/UploadMarks";
import AddNotes from "./components/Teacher/addNotes";

import Department from './components/Admin/adminDepartment';
import User from './components/Admin/adminUseradd';
import Subject from './components/Admin/adminSubject';
import ShowDetails from './components/Admin/adminShowDetails';
import MainLayout from "./components/Admin/adminLayout";
import StudentLayout from "./components/Student/StudentLayOut";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<Department />} />
          <Route path="/department" element={<Department />} />
          <Route path="/user" element={<User />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/showdetails" element={<ShowDetails />} />
        </Route>
        <Route element={<StudentLayout />}>
          <Route path="/student" element={<StudentHomePage />} />
          <Route path="/student-marks" element={<StudentMarkPage />} />
          <Route path="/student-notes" element={<StudentNotePage />} />
        </Route>
        <Route path="/teacher" element={<HomePage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/uploadMarks" element={<UploadMarks />} />
        <Route path="/addNotes" element={<AddNotes />} />
      </Routes>
    </Router>
  );
}

export default App;

