import React from "react";
import "./AnswerItem.css";

const AnswerItem = (props) => {
  const classes = ["AnswerItem"];
  if (props.state) {
    // console.log(props.state);
    classes.push(props.state);
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
