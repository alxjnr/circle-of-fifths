import { useState, useContext, useEffect } from "react";
import { majorNotes } from "../data/Notes";
import { CurrentIndexContext } from "../context/CurrentIndexContext";

export default function Scorecard({ isShowingAnswer, setIsShowingAnswer }) {
  const [majorNotesArr, setMajorNotesArr] = useState(majorNotes);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndexContext);

  useEffect(() => {
    setMajorNotesArr((prev) => {
      for (let i = prev.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [prev[i], prev[j]] = [prev[j], prev[i]];
      }
      prev.push(
        <button
          className="button-17"
          onClick={() => {
            setIsShowingAnswer(new Array(12).fill(false));
            setCurrentIndex(0);
          }}
        >
          Restart
        </button>
      );
      return prev;
    });
  }, []);

  return (
    <div className="scorecard">
      {!isPlaying ? (
        <button
          className="button-17"
          onClick={() => {
            setIsPlaying(true);
          }}
        >
          Begin
        </button>
      ) : (
        <div>
          <h1>{majorNotesArr[currentIndex]}</h1>
        </div>
      )}
    </div>
  );
}

function fisherShuffle(prev) {}
