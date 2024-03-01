import Scorecard from "./Scorecard";
import { CurrentIndexContext } from "../context/CurrentIndexContext";
import { useContext, useEffect, useState } from "react";
import { majorNotes } from "../data/Notes";
// import useSound from "use-sound";
// import 'bloop-edited. from '../sounds'

export default function Circle() {
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndexContext);
  const [isShowingAnswer, setIsShowingAnswer] = useState(
    new Array(12).fill(false)
  );

  useEffect(() => {}, [isShowingAnswer]);

  return (
    <div className="circle">
      <Scorecard
        isShowingAnswer={isShowingAnswer}
        setIsShowingAnswer={setIsShowingAnswer}
      />
      {/* boxes positioned at 1, 4, 7, 10 */}
      <div
        className="guess-zones"
        style={{ left: "16rem", top: "1rem" }}
        onMouseOver={playHoverSound()}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            0,
            "C"
          );
        }}
      >
        {isShowingAnswer[0] ? <h2>C</h2> : <></>}
      </div>
      <div
        className="guess-zones"
        style={{ left: "31rem", top: "16rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            1,
            "A"
          );
        }}
      >
        {isShowingAnswer[1] ? <h2>A</h2> : <></>}
      </div>
      <div
        className="guess-zones"
        style={{ left: "16rem", top: "31rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            2,
            "Gb/F#"
          );
        }}
      >
        {isShowingAnswer[2] ? <h2>Gb/F#</h2> : <></>}
      </div>
      <div
        className="guess-zones"
        style={{ left: "1rem", top: "16rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            3,
            "Eb"
          );
        }}
      >
        {isShowingAnswer[3] ? <h2>Eb</h2> : <></>}
      </div>
      {/* {boxes at 2, 6} */}
      <div
        className="guess-zones"
        style={{ left: "23.5rem", top: "3rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            4,
            "G"
          );
        }}
      >
        {isShowingAnswer[4] ? <h2>G</h2> : <></>}
      </div>
      <div
        className="guess-zones"
        style={{ left: "23.5rem", top: "29rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            5,
            "B/Cb"
          );
        }}
      >
        {isShowingAnswer[5] ? <h2>B/Cb</h2> : <></>}
      </div>
      {/* {boxes at 12, 8} */}
      <div
        className="guess-zones"
        style={{ left: "8.5rem", top: "3rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            6,
            "F"
          );
        }}
      >
        {isShowingAnswer[6] ? <h2>F</h2> : <></>}
      </div>
      <div
        className="guess-zones"
        style={{ left: "8.5rem", top: "29rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            7,
            "Db/C#"
          );
        }}
      >
        {isShowingAnswer[7] ? <h2>Db/C#</h2> : <></>}
      </div>
      {/* {boxes at 3, 5} */}
      <div
        className="guess-zones"
        style={{ left: "29rem", top: "8.5rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            8,
            "D"
          );
        }}
      >
        {isShowingAnswer[8] ? <h2>D</h2> : <></>}
      </div>
      <div
        className="guess-zones"
        style={{ left: "29rem", top: "23rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            9,
            "E"
          );
        }}
      >
        {isShowingAnswer[9] ? <h2>E</h2> : <></>}
      </div>
      {/* {boxes at 9, 11} */}
      <div
        className="guess-zones"
        style={{ left: "3rem", top: "8.5rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            10,
            "Bb"
          );
        }}
      >
        {isShowingAnswer[10] ? <h2>Bb</h2> : <></>}
      </div>
      <div
        className="guess-zones"
        style={{ left: "3rem", top: "23rem" }}
        onClick={() => {
          checkAnswer(
            currentIndex,
            setCurrentIndex,
            setIsShowingAnswer,
            11,
            "Ab"
          );
        }}
      >
        {isShowingAnswer[11] ? <h2>Ab</h2> : <></>}
      </div>
    </div>
  );
}

function playHoverSound() {}

function checkAnswer(
  currentIndex,
  setCurrentIndex,
  setIsShowingAnswer,
  num,
  note
) {
  if (majorNotes[currentIndex] === note) {
    setCurrentIndex((prev) => prev + 1);
    setIsShowingAnswer((prev) => {
      const newState = [...prev];
      newState[num] = true;
      return newState;
    });
  }
}
