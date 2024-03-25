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
  isCorrect,
  setIsCorrect,
  isPlaying,
  setIsPlaying,
  points,
  setPoints,
}) {
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndexContext);
  const { notesArr, setNotesArr } = useContext(NotesArrContext);
  const [playRoundFinishedSfx] = useSound(roundFinishedSfx);
  const [isDisplayingPoints, setIsDisplayingPoints] = useState(false);
  const [selectedGame, setSelectedGame] = useState(0);

  useEffect(() => {
    if (selectedGame == 1) {
      if (currentIndex > 23) {
        playRoundFinishedSfx();
        setIsDisplayingPoints(true);
      }
    } else if (selectedGame == 2 || selectedGame == 3) {
      if (currentIndex > 11) {
        playRoundFinishedSfx();
        setIsDisplayingPoints(true);
      }
    }
  }, [isPlaying, currentIndex, notesArr.length, playRoundFinishedSfx]);

  function resetActivity() {
    setCurrentIndex(0);
    setIsDisplayingPoints(false);
    setIsPlaying(false);
    setSelectedGame(0);
  }

  function allNotes() {
    setIsShowingAnswer(new Array(24).fill(false));
    setIsCorrect(new Array(24).fill(false));
    setCurrentIndex(0);
    setSelectedGame(1);
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
    setPoints(0);
  }

  function justMajors() {
    setIsShowingAnswer(new Array(12).fill(false));
    setIsCorrect(new Array(12).fill(false));
    setCurrentIndex(0);
    setSelectedGame(2);
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
    setPoints(0);
  }

  function justMinors() {
    setIsShowingAnswer(new Array(12).fill(false));
    setIsCorrect(new Array(12).fill(false));
    setCurrentIndex(0);
    setSelectedGame(3);
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
    setPoints(0);
  }

  return (
    <div className="scorecard">
      {!isPlaying ? (
        <div className="scorecard-button-container">
          <button
            onClick={() => {
              allNotes();
            }}
          >
            All notes
          </button>
          <button
            onClick={() => {
              justMajors();
            }}
          >
            Majors
          </button>
          <button
            onClick={() => {
              justMinors();
            }}
          >
            Minors
          </button>
        </div>
      ) : (
        <div>
          <h1>{notesArr[currentIndex]}</h1>
          {isDisplayingPoints ? (
            <div>
              <h4>You scored {points} points.</h4>
              <button onClick={resetActivity}>Play again</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
