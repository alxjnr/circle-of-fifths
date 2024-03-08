import { useState } from "react";
import Navbar from "../components/Navbar";
import { questions } from "../data/Questions";

export default function Quiz() {
  const [questionsArr, setQuestionsArr] = useState(questions);

  return (
    <div>
      <Navbar />
      <div className="main-centered">
        <div className="quiz-container">
          {questionsArr.map((e) => {
            return (
              <div>
                <div>
                  <h2>{e.question}</h2>
                </div>
                <div className="quiz-answer-container">
                  {e.answers.map((i) => {
                    return <button>{i}</button>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
