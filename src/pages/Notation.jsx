import { useState } from "react";
import Navbar from "../components/Navbar";
import { pianoKeys } from "../data/PianoKeys";
import { notationQuestions } from "../data/NotationQuestions";
import useSound from "use-sound";
import bloopRight from "../sounds/bloop-right-sfx-002.mp3";
import bloopWrong from "../sounds/bloop-wrong-sfx.mp3";
import trebleStaff from "../images/treble-staff.png";
import trebleClef from "../images/treble-clef-note-PNG.png";

export default function Notation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [questionsArr, setQuestionsArr] = useState(notationQuestions);
  const [correctAnswerLabel, setCorrectAnswerLabel] = useState("");
  const [pianoKeysArr, setPianoKeysArr] = useState(pianoKeys);

  const [playBloopRight] = useSound(bloopRight, 1);
  const [playBloopWrong] = useSound(bloopWrong, 1);

  function beginQuiz() {
    setPoints(0);
    setIndex(0);
    const shuffledArr = [...questionsArr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    setQuestionsArr(shuffledArr);
    setIsPlaying(true);
  }

  function selectKey(key) {
    setPianoKeysArr((prev) => {
      const arrCopy = [...prev];
      arrCopy.forEach((e) => {
        if (e.key_name == key.key_name) e.key_selected = !e.key_selected;
      });
      return arrCopy;
    });
  }

  function checkAnswer() {
    setButtonDisabled(true);
    const selectedKey = pianoKeysArr.filter((e) => e.key_selected);
    if (questionsArr[index].answer == selectedKey[0].key_name) {
      setCorrectAnswerLabel("Correct!");
      setPoints((prev) => prev + 1);
      playBloopRight();
    } else {
      setCorrectAnswerLabel(
        `Incorrect, the answer is ${questionsArr[index].answer}`
      );
      setPianoKeysArr((prev) => {
        const arrCopy = [...prev];
        arrCopy.forEach((e) => {
          if (e.key_selected) e.key_selected = false;
        });
        return arrCopy;
      });
      setPianoKeysArr((prev) => {
        const arrClone = [...prev];
        arrClone.forEach((key) => {
          if (key.key_name == questionsArr[index].answer)
            key.key_selected = true;
        });
        return arrClone;
      });
      playBloopWrong();
    }
    setTimeout(() => {
      if (index >= 4) {
        setIsPlaying(false);
      }
      setCorrectAnswerLabel("");
      setIndex((prev) => prev + 1);
      setPianoKeysArr((prev) => {
        const arrCopy = [...prev];
        arrCopy.forEach((e) => {
          if (e.key_selected) e.key_selected = false;
        });
        return arrCopy;
      });
      setButtonDisabled(false);
    }, 2500);
  }

  return (
    <div>
      <div className="main-centered">
        {isPlaying ? (
          <div className="key-signatures-container">
            <div>
              <h3>Question {index + 1}</h3>
              <div className="notation-questions-graphic">
                <img
                  src={trebleStaff}
                  style={{ width: "100%", objectFit: "contain" }}
                />
                <div
                  style={{
                    width: "8%",
                    height: "5%",
                    objectFit: "contain",
                    position: "absolute",
                    left: questionsArr[index].question.left,
                    top: questionsArr[index].question.top,
                    backgroundColor: "black",
                    borderRadius: "50%",
                    border: "solid black 2px",
                  }}
                />
              </div>
            </div>
            <div className="piano-container">
              {pianoKeysArr.map((e) => {
                return (
                  <div
                    className={`${e.key_style} ${
                      e.key_selected ? "piano-key-selected" : ""
                    }`}
                    style={{ left: `${e.key_position}%` }}
                    onClick={() => {
                      selectKey(e);
                    }}
                  />
                );
              })}
            </div>
            <button onClick={checkAnswer} disabled={buttonDisabled}>
              Submit
            </button>
            <h3>{correctAnswerLabel}</h3>
            <h5>Score: {points} / 5</h5>
          </div>
        ) : (
          <div className="activity-outline-container">
            <p>This is a quiz on music notation.</p>
            <p>
              The objective of this quiz is to correctly identify the note
              displayed on the staff. Good luck!
            </p>
            <button onClick={beginQuiz}>Begin</button>
          </div>
        )}
      </div>
    </div>
  );
}
