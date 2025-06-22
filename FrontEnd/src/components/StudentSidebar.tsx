import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Student Panel</h3>
      <NavLink to="/student" className="sidebar-link">Home</NavLink>
      <NavLink to="/student-marks" className="sidebar-link">Marks</NavLink>
      <NavLink to="/student-notes" className="sidebar-link">Notes</NavLink>
      <button onClick={handleLogout} className="sidebar-logout">Logout</button>
    </div>
  );
};

export default Sidebar;
