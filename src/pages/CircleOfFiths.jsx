import { useState } from "react";
import "../App.css";
import Circle from "../components/Circle";
import Navbar from "../components/Navbar";

export default function CircleOfFifths() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <div className="main-centered">
        {isPlaying ? (
          <Circle />
        ) : (
          <div>
            <p>
              This activity will train your knowledge of the circle of fifths.
            </p>
            <br></br>
            <p>The goal is to correctly fill in the circle. Good luck!</p>
            <br></br>
            <button onClick={() => setIsPlaying(true)}>Begin</button>
          </div>
        )}
      </div>
    </div>
  );
}
