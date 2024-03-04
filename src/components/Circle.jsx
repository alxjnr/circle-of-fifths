import Scorecard from "./Scorecard";
import { CurrentIndexContext } from "../context/CurrentIndexContext";
import { NotesArrContext } from "../context/NotesArrContext";
import { useContext, useEffect, useState } from "react";
import { majorNotes } from "../data/Notes";
import { minorNotes } from "../data/Notes";
import { majorCircles } from "../data/Circles";
import { minorCircles } from "../data/Circles";
import useSound from "use-sound";
import bloopRight from "../sounds/bloop-right.mp3";
import bloopWrong from "../sounds/bloop-wrong.mp3";

export default function Circle() {
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndexContext);
  const { notesArr, setNotesArr } = useContext(NotesArrContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingAnswer, setIsShowingAnswer] = useState(
    new Array(24).fill(false)
  );

  const [playBloopRight] = useSound(bloopRight);
  const [playBloopWrong] = useSound(bloopWrong);

  useEffect(() => {}, [isShowingAnswer]);

  return (
    <div className="circle">
      <Scorecard
        isShowingAnswer={isShowingAnswer}
        setIsShowingAnswer={setIsShowingAnswer}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      {majorCircles.map((e) => {
        return (
          <div
            className={
              isShowingAnswer[e.index]
                ? "guess-zones-correct guess-zones"
                : !isPlaying
                ? "guess-zones guess-zones-incorrect"
                : "guess-zones"
            }
            style={{ top: e.top, left: e.left }}
            onClick={() => {
              checkAnswer(
                currentIndex,
                setCurrentIndex,
                notesArr,
                setIsShowingAnswer,
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
                ? "guess-zones-correct guess-zones"
                : !isPlaying
                ? "guess-zones guess-zones-incorrect"
                : "guess-zones"
            }
            style={{ top: e.top, left: e.left, width: "8%", height: "8%" }}
            onClick={() => {
              checkAnswer(
                currentIndex,
                setCurrentIndex,
                notesArr,
                setIsShowingAnswer,
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
  num,
  note,
  playBloopRight,
  playBloopWrong
) {
  if (notesArr[currentIndex] === note) {
    playBloopRight();
    console.log(majorNotes[currentIndex]);
    setCurrentIndex((prev) => prev + 1);
    setIsShowingAnswer((prev) => {
      const newState = [...prev];
      newState[num] = true;
      return newState;
    });
  } else {
    setCurrentIndex((prev) => prev + 1);
    playBloopWrong();
  }
}
