import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>FreshHire AI </h1>
      <p>Apply 10x faster. Track applications easily.</p>

      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default Landing;