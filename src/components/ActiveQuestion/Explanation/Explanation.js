import React from "react";
import "./Explanation.css";

const Explanation = (props) => {
  if (
    props.onCheckPress === 2 ||
    (props.onCheckPress === 1 && props.isRight === true)
  ) {
    return <p className="Explanation">{props.question.explanation}</p>;
  } else {
    return <div></div>;
  }
};

export default Explanation;
