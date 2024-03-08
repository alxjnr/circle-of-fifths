import "../App.css";
import Circle from "../components/Circle";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="main-centered">
        <Circle />
      </div>
    </div>
  );
}
