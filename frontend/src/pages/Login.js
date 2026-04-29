import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔥 Wait for Render cold start (clean approach)
      await new Promise((res) => setTimeout(res, 25000));

      const res = await fetch("https://freshhire-4a8k.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.message) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }

    } catch (err) {
      console.error(err);
      alert("Server waking up... please try again in a few seconds");
    }

    setLoading(false);
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
          disabled={loading}
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;