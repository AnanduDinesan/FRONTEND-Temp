import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

function UploadMarks() {

  const user = JSON.parse(localStorage.getItem('user'));
  const departmentId = user?.departmentId;

  const [formData, setFormData] = useState({
    subject: "",
    userId: "",
    internal1: "",
    internal2: "",
    external: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get(`subjects/department/${departmentId}`);
        console.log("Subjects fetched:", res.data);
        setSubjects(res.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the selected subject object
    const selectedSubject = subjects.find((s) => s.name === formData.subject);
    if (!selectedSubject) {
      alert("Invalid subject selected.");
      return;
    }

    const payload = {
      subjectId: selectedSubject.id,
      userId: Number(formData.userId),
      internal1: Number(formData.internal1),
      internal2: Number(formData.internal2),
      external: Number(formData.external),
    };

    try {
      const response = await api.post("/marks", payload);
      console.log("Saved successfully:", response.data);

      setSubmittedData([...submittedData, { ...formData }]);
      setFormData({
        subject: "",
        userId: "",
        internal1: "",
        internal2: "",
        external: "",
      });
    } catch (error) {
      console.error("Error saving marks:", error);
      alert("Failed to submit marks. Please try again.");
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4 d-flex flex-column" style={{ width: "220px" }}>
        <h4 className="mb-4 text-center">
          <i className="fas fa-user-tie me-2"></i>Teacher Panel
        </h4>
        <nav className="nav flex-column">
          <button className="btn text-start text-white mb-2 sidebar-link" onClick={() => navigate("/homePage")}>
            <i className="fas fa-home me-2"></i>Home
          </button>
          <button className="btn text-start text-white mb-2 sidebar-link" onClick={() => navigate("/addNotes")}>
            <i className="fas fa-book me-2"></i>Add Notes
          </button>
          <button className="btn btn-outline-light text-start active mb-2 sidebar-link" disabled>
            <i className="fas fa-upload me-2"></i>Upload Marks
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-light overflow-auto">
        <div className="container">
          <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: "750px" }}>
            <div className="card-header bg-primary text-white rounded-top-4">
              <h4 className="mb-0">
                <i className="fas fa-upload me-2"></i>Upload Student Marks
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Subject Dropdown */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Subject</label>
                  <select
                    className="form-select"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Subject --</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name} (Sem {subject.semester}, {subject.department?.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* User ID */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="Enter student ID"
                    required
                  />
                </div>

                {/* Internal Marks */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Internal Mark 1</label>
                    <input
                      type="number"
                      className="form-control"
                      name="internal1"
                      value={formData.internal1}
                      onChange={handleChange}
                      min="0"
                      max="25"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Internal Mark 2</label>
                    <input
                      type="number"
                      className="form-control"
                      name="internal2"
                      value={formData.internal2}
                      onChange={handleChange}
                      min="0"
                      max="25"
                      required
                    />
                  </div>
                </div>

                {/* External Marks */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">External Marks</label>
                  <input
                    type="number"
                    className="form-control"
                    name="external"
                    value={formData.external}
                    onChange={handleChange}
                    min="0"
                    max="50"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100 fw-semibold">
                  <i className="fas fa-check-circle me-2"></i>Submit Marks
                </button>
              </form>
            </div>
          </div>

          {/* Display Section */}
          {submittedData.length > 0 && (
            <div className="card shadow-sm mx-auto my-5 border-0 rounded-4" style={{ maxWidth: "850px" }}>
              <div className="card-header bg-secondary text-white rounded-top-4">
                <h5 className="mb-0">
                  <i className="fas fa-list me-2"></i>Submitted Marks
                </h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered mb-0 text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Subject</th>
                        <th>User ID</th>
                        <th>Internal 1</th>
                        <th>Internal 2</th>
                        <th>External</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedData.map((entry, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{entry.subject}</td>
                          <td>{entry.userId}</td>
                          <td>{entry.internal1}</td>
                          <td>{entry.internal2}</td>
                          <td>{entry.external}</td>
                          <td>{+entry.internal1 + +entry.internal2 + +entry.external}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default UploadMarks;
