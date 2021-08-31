import React from "react";

const Finish = (props) => (
  <ul>
    {props.quiz.map((question, id) => {
      return (
        <li key={id}>
          <span>
            {question.text}
            <i>{props.results[id]}</i>
          </span>
        </li>
      );
    })}
  </ul>
);

export default Finish;
