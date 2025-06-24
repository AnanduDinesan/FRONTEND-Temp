import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen w-70 bg-gradient-to-b from-[#00162c] to-[#082d6c] text-white shadow-lg">
      <h3 className="text-3xl font-bold text-center py-6 border-b border-white/20">Student Panel</h3>

      <nav className="flex-1 px-4 py-6 space-y-4">
        <NavLink
          to="/student"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md text-xl no-underline transition-all duration-200 hover:text-2xl ${
              isActive 
            ? 'bg-white text-[#082d6c] font-semibold' 
            : '!text-white hover:bg-white/20'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/student-marks"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md transition-all duration-200 no-underline hover:text-2xl ${
              isActive 
                ? 'bg-white !text-[#082d6c] font-semibold' 
                : '!text-white hover:bg-white/20'
            }`
          }
          style={{ textDecoration: 'none' }}
        >
          Marks
        </NavLink>
        <NavLink
          to="/student-notes"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md transition-all duration-200 no-underline hover:text-2xl ${
              isActive 
                ? 'bg-white !text-[#082d6c] font-semibold' 
                : '!text-white hover:bg-white/20'
            }`
            
          }
          style={{ textDecoration: 'none' }}
        >
          Notes
        </NavLink>
      </nav>

      <div className="px-4 py-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="w-full text-center py-2 text-white bg-red-500 hover:!bg-red-600 hover:!text-xl hover:-translate-y-1 !rounded-xl !font-bold transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;