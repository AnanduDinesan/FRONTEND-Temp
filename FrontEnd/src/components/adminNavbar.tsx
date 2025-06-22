// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <> 
      <nav className="top-navbar">
        <ul className="top-nav-list">
          <li><Link to="/" className="top-nav-button">Home</Link></li>
          <li><Link to="/enquire" className="top-nav-button">Enquire</Link></li>
          <li><Link to="/helps" className="top-nav-button">Helps</Link></li>
        </ul>
        <div className="logout-button-container">
          <Link to="/" className="logout-button">Logout</Link>
        </div>
      </nav>

      <nav className="dashboard-navbar">
        <ul className="dashboard-nav-list">
          <li><Link to="/department" className="dashboard-nav-button">Department</Link></li>
          <li><Link to="/user" className="dashboard-nav-button">User</Link></li>
          <li><Link to="/subject" className="dashboard-nav-button">Subject</Link></li>
          <li><Link to="/showdetails" className="dashboard-nav-button">Show Details</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
