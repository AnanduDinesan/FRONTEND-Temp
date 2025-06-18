import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <aside
        className="bg-dark text-white d-flex flex-column justify-content-between"
        style={{ width: "220px", minHeight: "100vh" }}
      >
        <div className="p-4">
          <div className="h4 mb-4 d-flex align-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Logo"
              width="30"
              className="me-2"
            />
            <span>TeachNote</span>
          </div>
          <nav className="nav flex-column">
            <button className="btn text-start text-white mb-2" onClick={() => navigate("/homePage")}>
              <i className="fas fa-home me-2"></i> Home
            </button>
            <Link to="/addNotes" className="nav-link text-white">
              <i className="fas fa-sticky-note me-2"></i> Add Notes
            </Link>
            <Link to="/uploadMarks" className="nav-link text-white">
              <i className="fas fa-upload me-2"></i> Upload Marks
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column bg-lightblue">
        {/* Top Navbar */}
        <header className="d-flex justify-content-end align-items-center p-3 border-bottom bg-white shadow-sm">
          <div className="d-flex align-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Teacher Avatar"
              className="rounded-circle me-3"
              width="40"
              height="40"
            />
            <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </header>

        {/* Centered Dashboard Card */}
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div
            className="card p-5 shadow-lg bg-white rounded-4 border-0"
            style={{ maxWidth: "600px", width: "90%" }}
          >
            <h1 className="mb-3 fw-bold text-primary text-center">Teacher Dashboard</h1>
            <p className="text-muted text-center">Welcome to the Teacher Dashboard!</p>
            <p className="text-muted text-center">
              Manage your classes, add notes, and upload student marks from here.
            </p>

            <div className="row mt-5 g-4">
              <div className="col-md-6">
                <button
                  className="btn btn-lg w-100 d-flex align-items-center justify-content-center animated-btn btn-gradient-blue"
                  onClick={() => navigate("/addNotes")}
                >
                  <i className="fas fa-plus me-2 icon-animate"></i> Add Notes
                </button>
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-lg w-100 d-flex align-items-center justify-content-center animated-btn btn-gradient-green"
                  onClick={() => navigate("/uploadMarks")}
                >
                  <i className="fas fa-upload me-2 icon-animate"></i> Upload Marks
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
