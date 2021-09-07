import React, { Component } from "react";
import "./LesssonItem.css";
import { NavLink } from "react-router-dom";

const LessonItem = ({ lesson }) => {
  return (
    <div className="lesson">
      <div className="circle-title">
        <div className="circle">{lesson.id}</div>
        <div className="lesson__title">{lesson.title}</div>
      </div>
      <div className="lesson__description">{lesson.description}</div>
      <div className="buttons">
        <NavLink to={lesson.testLink}>
          <div className="btn btn_fill btn-start">Пачаць</div>
        </NavLink>
        <a href={lesson.videoLink}>
          <div className="btn btn_gold_nofill btn-lesson">Відэа па тэме</div>
        </a>
      </div>
    </div>
  );
};

export default LessonItem;
