import React from "react";
import "./ActiveQuestion.css";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuestion = (props) => {
  return (
    <div className="ActiveQuestion">
      <h1 className="Question">{props.question.question}</h1>
      <AnswersList
        answersList={props.answersList}
        onAnswerClick={props.onAnswerClick}
        rightAnswer={props.question.rightAnswer}
        state={props.state}
      />
      <button onClick={() => props.onCheckClick()}>Submit</button>
    </div>
  );
};

export default ActiveQuestion;
