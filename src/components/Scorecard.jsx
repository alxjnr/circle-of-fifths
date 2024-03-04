import { useState, useContext, useEffect } from "react";
import { majorNotes } from "../data/Notes";
import { minorNotes } from "../data/Notes";
import { CurrentIndexContext } from "../context/CurrentIndexContext";
import { NotesArrContext } from "../context/NotesArrContext";
import useSound from "use-sound";
import roundFinishedSfx from "../sounds/round-finished.mp3";

export default function Scorecard({
  isShowingAnswer,
  setIsShowingAnswer,
  isPlaying,
  setIsPlaying,
}) {
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndexContext);
  const { notesArr, setNotesArr } = useContext(NotesArrContext);
  const [playRoundFinishedSfx] = useSound(roundFinishedSfx);

  useEffect(() => {
    if (!isPlaying || currentIndex > notesArr.length - 1) {
      setIsPlaying(false);
      playRoundFinishedSfx();
    }
  }, [isPlaying, currentIndex, notesArr.length, playRoundFinishedSfx]);

  return (
    <div className="scorecard">
      {!isPlaying || currentIndex > notesArr.length - 1 ? (
        <div className="scorecard-button-container">
          <button
            onClick={() => {
              allNotes(
                setNotesArr,
                setCurrentIndex,
                setIsShowingAnswer,
                setIsPlaying
              );
            }}
          >
            All notes
          </button>
          <button
            onClick={() => {
              justMajors(
                setNotesArr,
                setCurrentIndex,
                setIsShowingAnswer,
                setIsPlaying
              );
            }}
          >
            Majors
          </button>
          <button
            onClick={() => {
              justMinors(
                setNotesArr,
                setCurrentIndex,
                setIsShowingAnswer,
                setIsPlaying
              );
            }}
          >
            Minors
          </button>
        </div>
      ) : (
        <div>
          <h1>{notesArr[currentIndex]}</h1>
        </div>
      )}
    </div>
  );
}

function allNotes(
  setNotesArr,
  setCurrentIndex,
  setIsShowingAnswer,
  setIsPlaying
) {
  setIsShowingAnswer(new Array(24).fill(false));
  setCurrentIndex(0);
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
  setIsPlaying(true);
}

function justMajors(
  setNotesArr,
  setCurrentIndex,
  setIsShowingAnswer,
  setIsPlaying
) {
  setIsShowingAnswer(new Array(12).fill(false));
  setCurrentIndex(0);
  setNotesArr(() => {
    const newArr = [...majorNotes];
    for (let i = newArr.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      let j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices i and j
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  });
  setIsPlaying(true);
}

function justMinors(
  setNotesArr,
  setCurrentIndex,
  setIsShowingAnswer,
  setIsPlaying
) {
  setIsShowingAnswer(new Array(12).fill(false));
  setCurrentIndex(0);
  setNotesArr(() => {
    const newArr = [...minorNotes];
    for (let i = newArr.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      let j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices i and j
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  });
  setIsPlaying(true);
}
