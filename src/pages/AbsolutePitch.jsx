import { useState } from "react";
import Navbar from "../components/Navbar";
import { absolutePitchKeys } from "../data/AbsolutePitchKeys";
import useSound from "use-sound";

export default function AbsolutePitch() {
  const [pianoKeysArr, setPianoKeysArr] = useState(absolutePitchKeys);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [questionsArr, setQuestionsArr] = useState(pianoKeysArr);
  const [playSound, { stop }] = useSound(questionsArr[index].key_sound, 1);
  const [correctAnswerLabel, setCorrectAnswerLabel] = useState("");

  function selectKey(key) {
    setPianoKeysArr((prev) => {
      const arrCopy = [...prev];
      arrCopy.forEach((e) => {
        if (e.key_name == key.key_name) e.key_selected = !e.key_selected;
      });
      return arrCopy;
    });
  }

  function playQuestionSound() {
    playSound();
  }

  function beginQuiz() {
    setPoints(0);
    setIndex(0);
    const shuffledArr = [...pianoKeysArr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    setQuestionsArr(shuffledArr);
    setIsPlaying(true);
  }

  function checkAnswer() {
    stop();
    setButtonDisabled(true);
    const selectedKey = pianoKeysArr.filter((e) => e.key_selected == true);
    if (selectedKey[0].key_name == questionsArr[index].key_name) {
      setCorrectAnswerLabel("Correct!");
      setPoints((prev) => prev + 1);
    } else {
      setCorrectAnswerLabel("Incorrect!");
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
          if (key.key_name == questionsArr[index].key_name)
            key.key_selected = true;
        });
        return arrClone;
      });
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
      <Navbar />
      <div className="main-centered">
        {isPlaying ? (
          <div className="key-signatures-container">
            <div>
              <h3>Question {index + 1}</h3>
            </div>
            <button onClick={playQuestionSound}>Play Sound</button>
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
          <button onClick={beginQuiz}>Start</button>
        )}
      </div>
    </div>
  );
}
