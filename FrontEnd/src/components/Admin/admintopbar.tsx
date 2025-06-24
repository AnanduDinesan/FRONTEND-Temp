// admintopbar.tsx
import { Link, useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  // Optional: Persist random avatar across reloads


  return (
    <div className="flex justify-between items-center">
      {/* Left Navigation */}
      <div className="space-x-6 font-medium text-gray-600">
        <Link to="/" className="hover:text-indigo-700 transition">Home</Link>
        <Link to="/enquire" className="hover:text-indigo-700 transition">Enquire</Link>
        <Link to="/helps" className="hover:text-indigo-700 transition">Helps</Link>
      </div>

      {/* Logout Avatar + Label */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogout}>
        <span className="text-sm font-semibold text-red-600 hover:underline">Logout</span>
      </div>
    </div>
  );
};

export default Topbar;