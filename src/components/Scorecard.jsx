import { useState, useContext, useEffect } from "react";
import { majorNotes } from "../data/Notes";
import { minorNotes } from "../data/Notes";
import { CurrentIndexContext } from "../context/CurrentIndexContext";
import { NotesArrContext } from "../context/NotesArrContext";

export default function Scorecard({ isShowingAnswer, setIsShowingAnswer }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndexContext);
  const { notesArr, setNotesArr } = useContext(NotesArrContext);

  useEffect(() => {
    setNotesArr(() => {
      const newArr = [...majorNotes, ...minorNotes];
      for (let i = newArr.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
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
          <h1>{notesArr[currentIndex]}</h1>
        </div>
      )}
    </div>
  );
}

function fisherShuffle(prev) {}
