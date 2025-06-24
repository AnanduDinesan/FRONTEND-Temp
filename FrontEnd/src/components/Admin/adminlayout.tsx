import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './adminsidebar';
import Topbar from './admintopbar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white shadow-xl">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white px-6 py-4 shadow sticky top-0 z-10">
          <Topbar />
        </header>

        <main className="p-6 overflow-auto flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;