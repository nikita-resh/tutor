import React from "react";
import "./AnswerItem.css";

const AnswerItem = (props) => {
  const classes = ["AnswerItem"];
  if (props.answerArray.indexOf(props.index + 1) > -1) {
    classes.push("selected");
  }

  return (
    <li>
      <p
        className={classes.join(" ")}
        onClick={() => props.onAnswerClick(props.answer.id)}
      >
        {props.answer.text}
      </p>
    </li>
  );
};

export default AnswerItem;
