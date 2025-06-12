import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      {/* SIDEBAR */}
      <aside className="bg-dark text-white p-4" style={{ width: "220px", minHeight: "100vh" }}>
        <div className="h4 mb-4 d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            width="30"
            className="me-2"
          />
          MySchool
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/addNotes" className="nav-link text-white">
              <i className="fas fa-sticky-note me-2"></i> Add Notes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/uploadMarks" className="nav-link text-white">
              <i className="fas fa-upload me-2"></i> Upload Marks
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <i className="fas fa-chart-bar me-2"></i> Reports
            </a>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* TOP NAVBAR */}
        <header className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
          <input
            type="text"
            placeholder="Search students..."
            className="form-control w-50"
          />
          <div className="d-flex align-items-center">
            <img
              src="https://i.pravatar.cc/40"
              alt="Teacher Avatar"
              className="rounded-circle me-3"
              style={{ width: "40px", height: "40px" }}
            />
            <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="p-4 bg-body-secondary h-100">
          <div className="card p-4 shadow-lg">
            <h1 className="mb-3">Teacher Dashboard</h1>
            <p>Welcome to the Teacher Dashboard!</p>
            <p>Here you can manage your classes, view student notes, and more.</p>

            <div className="mt-4">
              <button
                className="btn btn-primary me-3"
                onClick={() => navigate("/addNotes")}
              >
                <i className="fas fa-plus me-1"></i> Add Notes
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate("/uploadMarks")}
              >
                <i className="fas fa-upload me-1"></i> Upload Marks
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
