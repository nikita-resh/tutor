import React from "react";
import "./Finish.css";

const Finish = (props) => {
  console.log(props);
  return (
    <div className="Results">
      <h1>Вынік</h1>
      {props.tasks.map((task, id) => {
        const cls = ["resultsItem"];
        if (props.results[id] === "error") {
          cls.push("error");
        }
        return (
          <p className={cls.join(" ")} key={id}>
            {id + 1}.&nbsp;
            <span>{task.question}</span>
          </p>
        );
      })}
    </div>
  );
};

export default Finish;
