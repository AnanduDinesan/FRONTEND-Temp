import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './StudentSidebar';

const StudentLayOut: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>
      <main className="p-6 overflow-auto flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayOut;