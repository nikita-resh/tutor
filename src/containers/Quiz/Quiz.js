import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuestion from "../../components/ActiveQuestion/ActiveQuestion";
import Finish from "../../components/Finish/Finish";

class Quiz extends Component {
  state = {
    ActiveQuestion: 0,
    answerState: null,
    isFinished: false,
    results: {},
    quiz: [
      {
        rightAnswer: 2,
        id: 1,
        question: "Какого цвета небо?",
        answers: [
          { text: "Чёрное", id: 1 },
          { text: "Синее", id: 2 },
          { text: "Красное", id: 3 },
          { text: "Голубое", id: 4 },
        ],
      },
      {
        rightAnswer: 2,
        id: 2,
        question: "Какого цвета трава?",
        answers: [
          { text: "Чёрное", id: 1 },
          { text: "Зелёная", id: 2 },
          { text: "Красное", id: 3 },
          { text: "Голубое", id: 4 },
        ],
      },
      {
        rightAnswer: 2,
        id: 3,
        question: "Какого цвета земля?",
        answers: [
          { text: "Чёрное", id: 1 },
          { text: "Коричневая", id: 2 },
          { text: "Красное", id: 3 },
          { text: "Голубое", id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    // при попытке ответить еще раз
    if (this.state.answerState) {
      let key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "succes") {
        return;
      }
    }

    const question = this.state.quiz[this.state.ActiveQuestion];
    const results = this.state.results;

    // если выбран правильный ответ
    if (question.rightAnswer === answerId) {
      //если это первая попытка
      if (!results[this.state.ActiveQuestion]) {
        results[this.state.ActiveQuestion] = "success";
      }

      this.setState({ answerState: { [answerId]: "success" }, results });
      console.log(this.state.results);

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log("Finished");
          this.setState({ isFinished: true });
        } else {
          this.setState({
            ActiveQuestion: this.state.ActiveQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    }
    // если выбран неправильный вариант
    else {
      results[this.state.ActiveQuestion] = "error";
      this.setState({ answerState: { [answerId]: "error" }, results });
      console.log(this.state.results);
    }
  };

  isQuizFinished() {
    return this.state.ActiveQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return this.state.isFinished ? (
      <Finish results={this.state.results} quiz={this.state.quiz} />
    ) : (
      <ActiveQuestion
        question={this.state.quiz[this.state.ActiveQuestion]}
        answersList={this.state.quiz[this.state.ActiveQuestion].answers}
        onAnswerClick={this.onAnswerClickHandler}
        state={this.state.answerState}
      />
    );
  }
}

export default Quiz;
