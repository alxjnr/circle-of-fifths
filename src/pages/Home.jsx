import "../App.css";
import Circle from "../components/Circle";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <div className="main-centered">
        <div>
          <h4>Welcome to Harmony Hub</h4>
          <p>
            Choose an activity to begin, or begin a training session by pressing
            the 'Train' button below
          </p>
          <br></br>
          <button disabled={true}>Train mode under construction</button>
        </div>
      </div>
    </div>
  );
}
