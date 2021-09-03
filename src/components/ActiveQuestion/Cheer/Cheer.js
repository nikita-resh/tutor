import React from "react";
import "./Cheer.css";

const Cheer = (props) => {
  let currentResult = props.isRight;
  let onCheckPress = props.onCheckPress;
  let cheers = props.cheers;

  if (currentResult === true) {
    return (
      <div className="Cheer">
        Малайчына, але зараз паглядзі наша паясненне гэтаму заданню. Калі пасля
        яго у цябе засталіся пытанні, то задай іх ў нашым тэлеграм-чаце:&nbsp;
        <a href="goocle.com">спасылка</a>.
      </div>
    );
  }
  if (currentResult === false && onCheckPress === 1) {
    return (
      <div className="Cheer">
        {cheers[Math.floor(Math.random() * cheers.length)]}
      </div>
    );
  }
  if (currentResult === false && onCheckPress === 2) {
    return (
      <div className="Cheer">
        Што ж, а зараз паглядзі наша паясненне гэтаму заданню. Калі і яно не
        дапаможа, то задай пытанне ў нашым тэлеграм-чаце:
        <a href="goocle.com">спасылка</a>.
      </div>
    );
  }
  if (onCheckPress === 0) {
    return <></>;
  }
};

export default Cheer;
