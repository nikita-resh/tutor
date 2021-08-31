import React from "react";
import "./ActiveQuestion.css";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuestion = (props) => {
  return (
    <div className="ActiveQuestion">
      <h1 className="Question">{props.question}</h1>
      <AnswersList
        answersList={props.answersList}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  );
};

export default ActiveQuestion;
