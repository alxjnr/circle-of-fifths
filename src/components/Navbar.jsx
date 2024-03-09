import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h3 onClick={() => navigate("/")}>Circle</h3>
      <h3 onClick={() => navigate("/quiz")}>Quiz</h3>
      <h3 onClick={() => navigate("/key-signatures")}>Key Signatures</h3>
    </div>
  );
}
