import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/department', label: 'Departments' },
    { path: '/user', label: 'Users' },
    { path: '/subject', label: 'Subjects' },
    { path: '/showdetails', label: 'Show Details' },
  ];

  return (
    <div className="h-full flex flex-col p-6 space-y-4 text-sm">
      <h1 className="text-xl font-bold text-center mb-8">Admin</h1>
      {navItems.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`py-2 px-4 rounded-lg transition-all duration-200 ${
            location.pathname === path
              ? 'bg-indigo-600 text-white'
              : 'hover:bg-indigo-500 hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;