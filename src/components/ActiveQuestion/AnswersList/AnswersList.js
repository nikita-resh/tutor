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
          index={index}
          results={props.results}
          answerArray={props.answerArray}
          answerId={index}
          onAnswerClick={props.onAnswerClick}
          rightAnswer={props.rightAnswer}
          state={props.state ? props.state[answer.id] : null}
        />
      );
    })}
  </ul>
);

export default AnswersList;
