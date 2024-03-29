import { useState } from "react";
import Navbar from "../components/Navbar";
import { questions } from "../data/QuizQuestions";

export default function Quiz() {
  const [questionsArr, setQuestionsArr] = useState(questions);
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scoreLabel, setScoreLabel] = useState("");
  const [correctAnswerLabel, setCorrectAnswerLabel] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  function checkAnswer(answer) {
    if (questionsArr[index].correct_answer == answer) {
      setPoints((prev) => prev + 1);
      setCorrectAnswerLabel("Correct!");
    } else {
      setCorrectAnswerLabel(
        `The correct answer was ${questionsArr[index].correct_answer}`
      );
    }
    setButtonsDisabled(true);
    setTimeout(() => {
      setIndex((prev) => prev + 1);
      if (index >= 4) setIsPlaying(false);
      setScoreLabel(`You scored ${points} / 5`);
      setCorrectAnswerLabel("");
      setButtonsDisabled(false);
    }, 2000);
  }

  function beginQuiz() {
    setPoints(0);
    setScoreLabel("");
    setIndex(0);

    const shuffledQuestions = [...questionsArr].map((question) => {
      let shuffledAnswers = [...question.answers];
      for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [
          shuffledAnswers[j],
          shuffledAnswers[i],
        ];
      }
      return { ...question, answers: shuffledAnswers };
    });

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
        <div className="quiz-container">
          {isPlaying ? (
            <div>
              <div className="quiz-question-wrapper">
                <h4>Question {index + 1}</h4>
                <h2>{questionsArr[index].question}</h2>
              </div>
              <div className="quiz-answer-container">
                {questionsArr[index].answers.map((e) => {
                  return (
                    <button
                      onClick={() => checkAnswer(e)}
                      disabled={buttonsDisabled}
                    >
                      {e}
                    </button>
                  );
                })}
              </div>
              <h3>{correctAnswerLabel}</h3>
              <h4>Score: {points} / 5</h4>
            </div>
          ) : (
            <div className="activity-outline-container">
              <p>
                This quiz will test your ability to recall chords in different
                keys.
              </p>
              <p>Good luck!</p>
              <button onClick={beginQuiz}>Begin</button>
              <h3>{scoreLabel}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
