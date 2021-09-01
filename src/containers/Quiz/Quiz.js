import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuestion from "../../components/ActiveQuestion/ActiveQuestion";
import Finish from "../../components/Finish/Finish";

class Quiz extends Component {
  state = {
    ActiveQuestion: 0,
    attempts: 0,
    quizTheme: "Раздзелы беларускай мовы. Паняцці мовы і маўлення.",
    quizLevel: "лёгкі.",
    videoLink: "",
    creatorComment:
      "“Выканайце гэты тэст увесь за адзін раз. Не трэба падзяляць яго на часткі: так працэс навучэння будзе праходзіць больш эфектыўна”.",
    answerState: null,
    isFinished: false,
    results: {},
    answerArray: [],
    quiz: [
      {
        rightAnswer: [1, 2],
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
        rightAnswer: [2, 3],
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
        rightAnswer: [3],
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
    // if (this.state.answerState) {
    //   let key = Object.keys(this.state.answerState)[0];
    //   if (this.state.answerState[key] === "succes") {
    //     return;
    //   }
    // }
    // const question = this.state.quiz[this.state.ActiveQuestion];
    // const results = this.state.results;
    // если выбран правильный ответ
    // if (question.rightAnswer === answerId) {
    //   //если это первая попытка
    //   if (!results[this.state.ActiveQuestion]) {
    //     results[this.state.ActiveQuestion] = "success";
    //   }
    //   this.setState({ answerState: { [answerId]: "success" }, results });
    //   console.log(this.state.results);
    //   const timeout = window.setTimeout(() => {
    //     if (this.isQuizFinished()) {
    //       console.log("Finished");
    //       this.setState({ isFinished: true });
    //     } else {
    //       this.setState({
    //         ActiveQuestion: this.state.ActiveQuestion + 1,
    //         answerState: null,
    //       });
    //     }
    //     window.clearTimeout(timeout);
    //   }, 1000);
    // }
    // если выбран неправильный вариант
    // else {
    //   results[this.state.ActiveQuestion] = "error";
    //   this.setState({ answerState: { [answerId]: "error" }, results });
    //   console.log(this.state.results);
    // }

    // todo push into array
    if (this.state.answerArray.indexOf(answerId) === -1) {
      let array = this.state.answerArray;
      array.push(answerId);
      this.setState({ answerArray: array });
    } else {
      let array = this.state.answerArray;
      array.splice(array.indexOf(answerId, 1));
      this.setState({ answerArray: array });
    }
    const question = this.state.quiz[this.state.ActiveQuestion];
    console.log(this);
  };

  onCheckClick = () => {
    const question = this.state.quiz[this.state.ActiveQuestion];
    const answers = this.state.answerArray;
    const rightAnswers = question.rightAnswer;

    if (answers.length === rightAnswers.length) {
      answers.sort((a, b) => a - b);
      rightAnswers.sort((a, b) => a - b);
      console.log(answers, rightAnswers);

      for (let i = 0; i < answers.length; i++) {
        if (answers[i] !== rightAnswers[i]) {
          console.log(false);
          break;
        }
      }
      console.log(true);
    } else {
      console.log(false);
    }
  };

  isQuizFinished() {
    return this.state.ActiveQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return this.state.isFinished ? (
      <Finish results={this.state.results} quiz={this.state.quiz} />
    ) : (
      <div className="Quiz">
        <ActiveQuestion
          question={this.state.quiz[this.state.ActiveQuestion]}
          answersList={this.state.quiz[this.state.ActiveQuestion].answers}
          onAnswerClick={this.onAnswerClickHandler}
          state={this.state.answerState}
          onCheckClick={this.onCheckClick}
        />
        <div className="Quiz__info">
          <h3>Інфармацыя пра тэст</h3>
          <p>
            <b>Тэма:&nbsp;</b>
            {this.state.quizTheme}
          </p>
          <p>
            <b>Узровень цяжкасці:&nbsp;</b>
            {this.state.quizLevel}
          </p>
          <p>
            <b>Відэазанятак па гэтай тэме:&nbsp;</b>
            <a href="https://www.google.com/search?q=tutoronline&oq=tutor&aqs=chrome.0.0i512j69i57j0i512l3j69i60j69i61l2.1286j0j7&sourceid=chrome&ie=UTF-8">
              спасылка
            </a>
            .
          </p>
          <p>
            <b>Каментар ад стваральнікаў:&nbsp;</b>
            {this.state.creatorComment}
          </p>
        </div>
      </div>
    );
  }
}

export default Quiz;
