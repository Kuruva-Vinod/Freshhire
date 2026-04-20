import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({ skills: "", domain: "" });
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSuggest = () => {
    fetch("http://localhost:5000/suggest-jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => setJobs(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  const [form, setForm] = useState({
  name: "",
  company: "",
  role: "",
  status: "",
});

const handleFormChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleAddApplication = () => {
  fetch("http://localhost:5000/add-application", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Application added");

      // refresh data
      fetch("http://localhost:5000/applications")
        .then((res) => res.json())
        .then((data) => setApplications(data));
    });
};
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      
       <div className="sidebar" style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <h2>FresherHire</h2>

          <button
            className={`sidebar-btn ${active === "dashboard" ? "active" : ""}`}
            onClick={() => {
              setActive("dashboard");
              navigate("/dashboard");
            }}
          >
             Dashboard
          </button>

          <button
            className={`sidebar-btn ${active === "applications" ? "active" : ""}`}
            onClick={() => {
              setActive("applications");
              document.getElementById("applications")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
             Applications
          </button>

          <button
            className={`sidebar-btn ${active === "jobs" ? "active" : ""}`}
            onClick={() => {
              setActive("jobs");
              document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
             AI Jobs
          </button>

          <button onClick={handleLogout} style={{ marginTop: "20px" }}>
            Logout
          </button>
        </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px", background: "#f1f5f9" }}>

        <h1>Dashboard </h1>
          <div style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px"
          }}>
            <div style={{ background: "#3b82f6", color: "white", padding: "20px", borderRadius: "10px", flex: 1 }}>
              <h4>Total</h4>
              <h2>{applications.length}</h2>
            </div>

            <div style={{ background: "#f59e0b", color: "white", padding: "20px", borderRadius: "10px", flex: 1 }}>
              <h4>Applied</h4>
              <h2>{applications.filter(a => a.status === "Applied").length}</h2>
            </div>

            <div style={{ background: "#10b981", color: "white", padding: "20px", borderRadius: "10px", flex: 1 }}>
              <h4>Selected</h4>
              <h2>{applications.filter(a => a.status === "Selected").length}</h2>
            </div>
          </div>
        <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px"
            }}>
            <h3>Add Application </h3>

            <input name="name" placeholder="Your Name" onChange={handleFormChange} />
            <input name="company" placeholder="Company" onChange={handleFormChange} />
            <input name="role" placeholder="Role" onChange={handleFormChange} />
            <input name="status" placeholder="Status" onChange={handleFormChange} />

            <button onClick={handleAddApplication}>Add</button>
        </div>

        {/* PROFILE */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}>
          <h3>Find Jobs </h3>

          <input
            name="skills"
            placeholder="Skills"
            onChange={handleProfileChange}
          />

          <input
            name="domain"
            placeholder="Domain"
            onChange={handleProfileChange}
          />

          <button onClick={handleSuggest}>Find Jobs</button>
        </div>

        {/* JOBS */}
        {jobs.length > 0 && (
          <div id="jobs" style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px"
          }}>
            <h3>Suggested Jobs</h3>

            {jobs.map((job, index) => (
              <div key={index}>
                <strong>{job.company}</strong> — {job.role}
              </div>
            ))}
          </div>
        )}

        {/* APPLICATIONS */}
        <div id="applications" style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}>
            <h3>Your Applications</h3>

          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.name}</td>
                  <td>{app.company}</td>
                  <td>{app.role}</td>
                  <td>{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;