import React from "react";
import "./AnswersList.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => (
  <ul className="AnswersList">
    {props.answersList.map((answer, index) => {
      return (
        <AnswerItem
          answer={answer}
          key={index}
          onAnswerClick={props.onAnswerClick}
        />
      );
    })}
  </ul>
);

export default AnswersList;
