import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          localStorage.setItem("isLoggedIn", "true");
          alert("Login successful");
          navigate("/dashboard");
        } else {
          alert("Invalid credentials");
        }
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
            <h2 style={{ textAlign: "center" }}>Login</h2>

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
              onClick={handleLogin}
              style={{ width: "100%" }}
            >
              Login
            </button>

            <p style={{ marginTop: "10px", textAlign: "center" }}>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      );
}

export default Login;