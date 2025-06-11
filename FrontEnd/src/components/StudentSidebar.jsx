import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styling/StudentSidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Student</h3>
      <NavLink to="/student" className="sidebar-link">Home</NavLink>
      <NavLink to="/student-marks" className="sidebar-link">Marks</NavLink>
      <NavLink to="/student-notes" className="sidebar-link">Notes</NavLink>
      <button onClick={handleLogout} className="sidebar-logout">Logout</button>
    </div>
  );
};

export default Sidebar;
