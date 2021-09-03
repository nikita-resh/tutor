import React from "react";
import "./ActiveQuestion.css";
import AnswersList from "./AnswersList/AnswersList";
import Cheer from "./Cheer/Cheer";

const ActiveQuestion = (props) => {
  const questionClasses = ["ActiveQuestion"];
  questionClasses.push(props.isRight === null ? "" : `${props.isRight}`);
  // console.log(questionClasses);

  return (
    <div className={"ActiveQuestion"}>
      <h2 className={questionClasses.join(" ")}>{props.question.question}</h2>
      <AnswersList
        answersList={props.answersList}
        onAnswerClick={props.onAnswerClick}
        rightAnswer={props.question.rightAnswer}
        state={props.state}
      />
      <button className="btn-check" onClick={() => props.onCheckClick()}>
        Адказаць
      </button>
      <Cheer
        onCheckPress={props.onCheckPress}
        results={props.results}
        ActiveQuestion={props.ActiveQuestion}
        isRight={props.isRight}
        cheers={props.cheers}
      />
    </div>
  );
};

export default ActiveQuestion;
