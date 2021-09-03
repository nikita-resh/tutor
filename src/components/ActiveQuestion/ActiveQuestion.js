import React from "react";
import "./ActiveQuestion.css";
import AnswersList from "./AnswersList/AnswersList";
import Cheer from "./Cheer/Cheer";
import Explanation from "./Explanation/Explanation";

const ActiveQuestion = (props) => {
  const questionClasses = ["ActiveQuestion"];
  questionClasses.push(props.isRight === null ? "" : `${props.isRight}`);

  return (
    <div>
      <div className={"ActiveQuestion"}>
        <h2 className={questionClasses.join(" ")}>
          {props.question.question}
          <small>
            {props.question.id}/{props.length}
          </small>
        </h2>
        <AnswersList
          answersList={props.answersList}
          onAnswerClick={props.onAnswerClick}
          rightAnswer={props.question.rightAnswer}
          state={props.state}
          answerArray={props.answerArray}
          results={props.results}
        />
        <button className="btn-check" onClick={() => props.onCheckClick()}>
          {props.onCheckPress === 0
            ? "Адказаць"
            : props.isRight === true && props.onCheckPress === 1
            ? "Наступнае пытанне"
            : props.onCheckPress === 1 && props.isRight === false
            ? "Адказаць яшчэ раз"
            : "Наступнае пытанне"}
        </button>
      </div>
      <Cheer
        onCheckPress={props.onCheckPress}
        results={props.results}
        ActiveQuestion={props.ActiveQuestion}
        isRight={props.isRight}
        cheers={props.cheers}
      />
      <Explanation
        onCheckPress={props.onCheckPress}
        question={props.question}
        isRight={props.isRight}
      />
    </div>
  );
};

export default ActiveQuestion;
