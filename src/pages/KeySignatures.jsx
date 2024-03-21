import { useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { questions } from "../data/KeySignatureQuestions";
import { pianoKeys } from "../data/PianoKeys";
import useSound from "use-sound";
import bloopRight from "../sounds/bloop-right-sfx-002.mp3";
import bloopWrong from "../sounds/bloop-wrong-sfx.mp3";

export default function KeySignatures() {
  const [questionsArr, setQuestionsArr] = useState(questions);
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [pianoKeysArr, setPianoKeysArr] = useState(pianoKeys);
  const [correctAnswerLabel, setCorrectAnswerLabel] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [playBloopRight] = useSound(bloopRight, 1);
  const [playBloopWrong] = useSound(bloopWrong, 1);

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
    const questionAnswers = questionsArr[index].answer.sort();
    const userAnswers = [];
    pianoKeysArr.forEach((e) => {
      if (e.key_selected) userAnswers.push(e.key_name);
    });
    if (questionAnswers.join() == userAnswers.sort().join()) {
      setCorrectAnswerLabel("Correct!");
      setPoints((prev) => prev + 1);
      playBloopRight();
    } else {
      setCorrectAnswerLabel(
        // `Incorrect, the answer is ${questionAnswers.join(" - ")}`
        "Incorrect!"
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
          questionAnswers.forEach((answer) => {
            if (key.key_name == answer) key.key_selected = true;
          });
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
    console.log(questionAnswers.join());
  }

  function beginQuiz() {
    setPoints(0);
    setCorrectAnswerLabel("");
    setIndex(0);

    const shuffledQuestions = [...questionsArr];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [
        shuffledQuestions[j],
        shuffledQuestions[i],
      ];
    }
    setQuestionsArr(shuffledQuestions);
    setIsPlaying(true);
  }

  return (
    <div>
      <div className="main-centered">
        {isPlaying ? (
          <div className="key-signatures-container">
            <div>
              <h3>Question {index + 1}</h3>
              <h2>{questionsArr[index].question}</h2>
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
            <p>
              This quiz will test your ability to identify sharps and flats in
              each key.
            </p>
            <p>Good luck!</p>
            <button onClick={beginQuiz}>Begin</button>
          </div>
        )}
      </div>
    </div>
  );
}
