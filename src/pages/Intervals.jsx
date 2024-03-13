import { useState } from "react";
import Navbar from "../components/Navbar";
import { generateNewQuestions, intervals } from "../data/IntervalSamples";
import { questions } from "../data/IntervalSamples";
import useSound from "use-sound";

export default function Intervals() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [questionsArr, setQuestionsArr] = useState(questions);
  const [index, setIndex] = useState(0);
  const [answerLabel, setAnswerLabel] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [totalPointsLabel, setTotalPointsLabel] = useState("");

  const [playSound1] = useSound(questionsArr[index].question.sounds[0]);
  const [playSound2] = useSound(questionsArr[index].question.sounds[1]);

  function generateQuestions() {
    setTotalPointsLabel("");
    setPoints(0);
    setIndex(0);
    setAnswerLabel("");
    generateNewQuestions();
    setQuestionsArr(questions);
  }

  function playSamples() {
    playSound1();
    setTimeout(() => {
      playSound2();
    }, 1000);
  }

  function checkAnswer(answer) {
    setButtonDisabled(true);
    if (answer == questionsArr[index].question.answer) {
      setAnswerLabel("Correct!");
      setPoints((prev) => prev + 1);
    } else {
      setAnswerLabel(
        `Incorrect! The answer was: ${questionsArr[index].question.answer}`
      );
    }
    setTimeout(() => {
      if (index >= 4) {
        setIsPlaying(false);
        setTotalPointsLabel(`You scored ${points} / 5!`);
      } else {
        setIndex((prev) => prev + 1);
        setAnswerLabel("");
      }
      setButtonDisabled(false);
    }, 2500);
  }

  return (
    <div>
      <Navbar />
      <div className="main-centered">
        {isPlaying && questionsArr.length > 0 ? (
          <div className="interval-questions-container">
            <h2>Question {index + 1}</h2>
            <button onClick={playSamples}>Play sound</button>
            <div className="interval-answers-container">
              {intervals.map((e) => {
                return (
                  <button
                    onClick={() => checkAnswer(e)}
                    disabled={buttonDisabled}
                  >
                    {e}
                  </button>
                );
              })}
            </div>
            <h3>{answerLabel}</h3>
            <h3>Score: {points} / 5</h3>
          </div>
        ) : (
          <div className="activity-outline-container">
            <p>
              The intervals quiz will test your ability to identify musical
              intervals by ear.
            </p>
            <p>You will hear two notes, and must pick the correct interval.</p>
            <button
              onClick={() => {
                generateQuestions();
                setIsPlaying(true);
              }}
            >
              Begin
            </button>
            <h3>{totalPointsLabel}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
