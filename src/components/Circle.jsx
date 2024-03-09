import Scorecard from "./Scorecard";
import { CurrentIndexContext } from "../context/CurrentIndexContext";
import { NotesArrContext } from "../context/NotesArrContext";
import { useContext, useEffect, useState } from "react";
import { majorNotes } from "../data/Notes";
import { minorNotes } from "../data/Notes";
import { majorCircles } from "../data/Circles";
import { minorCircles } from "../data/Circles";
import useSound from "use-sound";
import bloopRight from "../sounds/bloop-right-sfx-002.mp3";
import bloopWrong from "../sounds/bloop-wrong-sfx.mp3";

export default function Circle() {
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndexContext);
  const { notesArr, setNotesArr } = useContext(NotesArrContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingAnswer, setIsShowingAnswer] = useState(
    new Array(24).fill(false)
  );
  const [isCorrect, setIsCorrect] = useState(new Array(24).fill(false));

  const [playBloopRight] = useSound(bloopRight);
  const [playBloopWrong] = useSound(bloopWrong);

  useEffect(() => {}, [isShowingAnswer]);

  return (
    <div className="circle">
      <Scorecard
        isShowingAnswer={isShowingAnswer}
        setIsShowingAnswer={setIsShowingAnswer}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      {majorCircles.map((e) => {
        return (
          <div
            className={
              isShowingAnswer[e.index]
                ? isCorrect[e.index]
                  ? "guess-zones-correct guess-zones"
                  : "guess-zones-incorrect guess-zones"
                : "guess-zones"
            }
            style={{ top: e.top, left: e.left }}
            onClick={() => {
              checkAnswer(
                currentIndex,
                setCurrentIndex,
                notesArr,
                setIsShowingAnswer,
                setIsCorrect,
                e.index,
                e.note,
                playBloopRight,
                playBloopWrong
              );
            }}
          >
            {isShowingAnswer[e.index] || !isPlaying ? <h2>{e.note}</h2> : <></>}
          </div>
        );
      })}
      {minorCircles.map((e) => {
        return (
          <div
            className={
              isShowingAnswer[e.index]
                ? isCorrect[e.index]
                  ? "guess-zones-correct guess-zones"
                  : "guess-zones-incorrect guess-zones"
                : "guess-zones"
            }
            style={{ top: e.top, left: e.left, width: "8%", height: "8%" }}
            onClick={() => {
              checkAnswer(
                currentIndex,
                setCurrentIndex,
                notesArr,
                setIsShowingAnswer,
                setIsCorrect,
                e.index,
                e.note,
                playBloopRight,
                playBloopWrong
              );
            }}
          >
            {isShowingAnswer[e.index] || !isPlaying ? <h4>{e.note}</h4> : <></>}
          </div>
        );
      })}
    </div>
  );
}

function checkAnswer(
  currentIndex,
  setCurrentIndex,
  notesArr,
  setIsShowingAnswer,
  setIsCorrect,
  num,
  note,
  playBloopRight,
  playBloopWrong
) {
  if (notesArr[currentIndex] === note) {
    playBloopRight();
    setIsCorrect((prev) => {
      const newState = [...prev];
      newState[num] = true;
      return newState;
    });
    setIsShowingAnswer((prev) => {
      const newState = [...prev];
      newState[num] = true;
      return newState;
    });
  } else {
    playBloopWrong();
    majorCircles.forEach((e) => {
      if (e.note == notesArr[currentIndex]) {
        setIsShowingAnswer((prev) => {
          const newState = [...prev];
          newState[e.index] = true;
          return newState;
        });
        setIsCorrect((prev) => {
          const newState = [...prev];
          newState[e.index] = false;
          return newState;
        });
      }
    });
    minorCircles.forEach((e) => {
      if (e.note == notesArr[currentIndex]) {
        setIsShowingAnswer((prev) => {
          const newState = [...prev];
          newState[e.index] = true;
          return newState;
        });
        setIsCorrect((prev) => {
          const newState = [...prev];
          newState[e.index] = false;
          return newState;
        });
      }
    });
  }
  setCurrentIndex((prev) => prev + 1);
}
