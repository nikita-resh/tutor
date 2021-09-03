import React from "react";
import "./Cheer.css";
import success from "../../../success.png";
import error from "../../../error.png";

const Cheer = (props) => {
  let currentResult = props.isRight;
  let onCheckPress = props.onCheckPress;
  let cheers = props.cheers;
  // let imgSrc = currentResult === true ? success : error;

  if (currentResult === true) {
    return (
      <div className="Cheer">
        <img src={success} alt="success/error"></img>
        <span>
          Малайчына, але зараз паглядзі наша паясненне гэтаму заданню. Калі
          пасля яго у цябе засталіся пытанні, то задай іх ў нашым
          тэлеграм-чаце:&nbsp;
          <a href="goocle.com">спасылка</a>.
        </span>
      </div>
    );
  }
  if (currentResult === false && onCheckPress === 1) {
    return (
      <div className="Cheer">
        <img src={error} alt="success/error"></img>
        <span> {cheers[Math.floor(Math.random() * cheers.length)]}</span>
      </div>
    );
  }
  if (currentResult === false && onCheckPress === 2) {
    return (
      <div className="Cheer">
        <img src={error} alt="success/error"></img>
        <span>
          Што ж, а зараз паглядзі наша паясненне гэтаму заданню. Калі і яно не
          дапаможа, то задай пытанне ў нашым тэлеграм-чаце:&nbsp;
          <a href="google.com">спасылка</a>.
        </span>
      </div>
    );
  }
  if (onCheckPress === 0) {
    return <></>;
  }
};

export default Cheer;
