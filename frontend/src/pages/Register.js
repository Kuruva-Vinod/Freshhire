import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Registered successfully");
        navigate("/login");
      });
  };

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f1f5f9"
    }}>
        <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <button
            onClick={handleRegister}
            style={{ width: "100%" }}
        >
            Register
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
        </p>
        </div>
    </div>
);
}

export default Register;