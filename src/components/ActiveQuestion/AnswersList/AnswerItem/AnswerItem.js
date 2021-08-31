import React from "react";
import "./AnswerItem.css";

const AnswerItem = (props) => (
  <li>
    <p
      className="AnswerItem"
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </p>
  </li>
);

export default AnswerItem;
