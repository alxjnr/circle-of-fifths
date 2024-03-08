import { useState } from "react";
import Navbar from "../components/Navbar";
import { questions } from "../data/Questions";

export default function Quiz() {
  const [questionsArr, setQuestionsArr] = useState(questions);
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scoreLabel, setScoreLabel] = useState("");

  function checkAnswer(answer) {
    if (questionsArr[index].correct_answer == answer) {
      setPoints((prev) => prev + 1);
    }
    setIndex((prev) => prev + 1);
    if (index >= 14) setIsPlaying(false);
    setScoreLabel(`You scored ${points}/15`);
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
      <Navbar />
      <div className="main-centered">
        <div className="quiz-container">
          {isPlaying ? (
            <div>
              <div className="quiz-question-wrapper">
                <h2>{questionsArr[index].question}</h2>
              </div>
              <div className="quiz-answer-container">
                {questionsArr[index].answers.map((e) => {
                  return <button onClick={() => checkAnswer(e)}>{e}</button>;
                })}
              </div>
              <h4>{points}/15</h4>
            </div>
          ) : (
            <div>
              <button onClick={beginQuiz}>Start Quiz</button>
              <h3>{scoreLabel}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
