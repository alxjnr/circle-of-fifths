import Scorecard from "./Scorecard";
import { CurrentIndexContext } from "../context/CurrentIndexContext";
import { NotesArrContext } from "../context/NotesArrContext";
import { useContext, useEffect, useState } from "react";
import { majorNotes } from "../data/Notes";
import { minorNotes } from "../data/Notes";
import { majorCircles } from "../data/Circles";
import { minorCircles } from "../data/Circles";
// import useSound from "use-sound";
// import 'bloop-edited. from '../sounds'

export default function Circle() {
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndexContext);
  const { notesArr, setNotesArr } = useContext(NotesArrContext);
  const [isShowingAnswer, setIsShowingAnswer] = useState(
    new Array(24).fill(false)
  );

  useEffect(() => {}, [isShowingAnswer]);

  return (
    <div className="circle">
      <Scorecard
        isShowingAnswer={isShowingAnswer}
        setIsShowingAnswer={setIsShowingAnswer}
      />
      {majorCircles.map((e) => {
        return (
          <div
            className="guess-zones"
            style={{ top: e.top, left: e.left }}
            onClick={() => {
              checkAnswer(
                currentIndex,
                setCurrentIndex,
                notesArr,
                setIsShowingAnswer,
                e.index,
                e.note
              );
            }}
          >
            {isShowingAnswer[e.index] ? <h2>{e.note}</h2> : <></>}
          </div>
        );
      })}
      {minorCircles.map((e) => {
        return (
          <div
            className="guess-zones"
            style={{ top: e.top, left: e.left, width: "50px", height: "50px" }}
            onClick={() => {
              checkAnswer(
                currentIndex,
                setCurrentIndex,
                notesArr,
                setIsShowingAnswer,
                e.index,
                e.note
              );
            }}
          >
            {isShowingAnswer[e.index] ? <h4>{e.note}</h4> : <></>}
          </div>
        );
      })}
    </div>
  );
}

function playHoverSound() {}

function checkAnswer(
  currentIndex,
  setCurrentIndex,
  notesArr,
  setIsShowingAnswer,
  num,
  note
) {
  if (notesArr[currentIndex] === note) {
    console.log(majorNotes[currentIndex]);
    setCurrentIndex((prev) => prev + 1);
    setIsShowingAnswer((prev) => {
      const newState = [...prev];
      newState[num] = true;
      return newState;
    });
  }
}
