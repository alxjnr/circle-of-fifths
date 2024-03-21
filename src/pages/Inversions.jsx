import { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { questions } from "../data/InversionsQuestions";
import { largePianoKeys } from "../data/LargePianoKeys";
import useSound from "use-sound";
import bloopRight from "../sounds/bloop-right-sfx-002.mp3";
import bloopWrong from "../sounds/bloop-wrong-sfx.mp3";

export default function Inversions() {
  const [questionsArr, setQuestionsArr] = useState(questions);
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [pianoKeysArr, setPianoKeysArr] = useState(largePianoKeys);
  const [correctAnswerLabel, setCorrectAnswerLabel] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [playBloopRight] = useSound(bloopRight, 1);
  const [playBloopWrong] = useSound(bloopWrong, 1);

  useEffect(() => {
    const shuffledQuestions = [...questionsArr];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [
        shuffledQuestions[j],
        shuffledQuestions[i],
      ];
    }
    setQuestionsArr(shuffledQuestions);
  }, []);

  useEffect(() => {}, [pianoKeysArr]);

  function selectKey(key1, key2, key3) {
    setPianoKeysArr((prev) => {
      const arrCopy = [...prev];
      arrCopy.forEach((e) => {
        if (e.key_name == key1 || e.key_name == key2 || e.key_name == key3)
          e.key_selected = !e.key_selected;
      });
      return arrCopy;
    });
    console.log(key1, key2, key3);
  }

  function checkAnswer(ans) {
    setButtonDisabled(true);
    if (questionsArr[index].correct_answer == ans) {
      setCorrectAnswerLabel("Correct!");
      setPoints((prev) => prev + 1);
      playBloopRight();
    } else {
      setCorrectAnswerLabel(
        `Incorrect, the answer is ${questionsArr[index].correct_answer}`
      );
      playBloopWrong();
    }
    setTimeout(() => {
      if (index >= 4) {
        setIsPlaying(false);
      }
      setCorrectAnswerLabel("");
      setPianoKeysArr((prev) => {
        const arrCopy = [...prev];
        arrCopy.forEach((e) => {
          if (e.key_selected) e.key_selected = false;
        });
        return arrCopy;
      });
      setIndex((prev) => {
        let newIndex = prev + 1;
        selectKey(
          questionsArr[newIndex].question[0],
          questionsArr[newIndex].question[1],
          questionsArr[newIndex].question[2]
        );
        return prev + 1;
      });

      setButtonDisabled(false);
    }, 2500);
  }

  function beginQuiz() {
    setPoints(0);
    setCorrectAnswerLabel("");
    setIndex(0);
    setIsPlaying(true);
    selectKey(
      questionsArr[0].question[0],
      questionsArr[0].question[1],
      questionsArr[0].question[2]
    );
  }

  return (
    <div>
      <div className="main-centered">
        {isPlaying ? (
          <div className="key-signatures-container">
            <div>
              <h3>Question {index + 1}</h3>
            </div>
            <div className="large-piano-container">
              {pianoKeysArr.map((e) => {
                return (
                  <div
                    className={`${e.key_style} ${
                      e.key_selected ? "piano-key-selected" : ""
                    }`}
                    style={{ left: `${e.key_position}%` }}
                    onClick={() => {}}
                  />
                );
              })}
            </div>
            <div className="interval-answers-container">
              {questionsArr[index].answers.map((e) => {
                return (
                  <button
                    disabled={buttonDisabled}
                    onClick={() => checkAnswer(e)}
                  >
                    {e}
                  </button>
                );
              })}
            </div>
            <h3>{correctAnswerLabel}</h3>
            <h5>Score: {points} / 5</h5>
          </div>
        ) : (
          <div className="activity-outline-container">
            <p>This quiz will test your knowledge of inversions.</p>
            <p>
              The objective is to choose the correct chord, based on the notes
              displayed on the piano. Good luck!
            </p>
            <button onClick={beginQuiz}>Begin</button>
          </div>
        )}
      </div>
    </div>
  );
}
