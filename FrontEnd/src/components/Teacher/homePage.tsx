import React from "react";
import { useNavigate, Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
     <aside className="w-56 bg-gray-800 text-white flex flex-col justify-between">
  <div className="p-6">
    
    <div className="text-2xl font-bold mb-8">TeachNote</div>

    <nav className="space-y-4">
      <button
        className="w-full text-left text-lg px-4 py-3 hover:bg-gray-700 rounded"
        onClick={() => navigate("/homePage")}
      >
        Home
      </button>
      <Link
        to="/addNotes"
        className="block text-lg px-4 py-3 hover:bg-gray-700 rounded"
      >
        Add Notes
      </Link>
      <Link
        to="/uploadMarks"
        className="block text-lg px-4 py-3 hover:bg-gray-700 rounded"
      >
        Upload Marks
      </Link>
    </nav>
  </div>
</aside>


      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-blue-100">
        {/* Top Navbar */}
         
        <header className="bg-white shadow p-4 flex justify-end items-center">
  <div className="flex items-center space-x-4">
    {/* Avatar Image */}
    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      alt="Teacher Avatar"
      className="w-10 h-10 rounded-full"
    />
            <button
              className="px-4 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition"
              onClick={() => navigate("/")}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Card */}
        <main className="flex-1 flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-11/12 max-w-xl text-center">
            <h1 className="text-2xl text-blue-600 font-bold mb-2">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600 mb-1">
              Welcome to the Teacher Dashboard!
            </p>
            <p className="text-gray-600 mb-6">
              Manage your classes, add notes, and upload student marks from
              here.
            </p>
            <button
              className="w-full py-3 mb-4 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition"
              onClick={() => navigate("/addNotes")}
            >
              Add Notes
            </button>
            <button
              className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition"
              onClick={() => navigate("/uploadMarks")}
            >
              Upload Marks
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;