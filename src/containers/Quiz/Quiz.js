import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuestion from "../../components/ActiveQuestion/ActiveQuestion";
import Finish from "../../components/Finish/Finish";

class Quiz extends Component {
  state = {
    ActiveQuestion: 0,
    onCheckPress: 0,
    quizTheme: "Раздзелы беларускай мовы. Паняцці мовы і маўлення.",
    quizLevel: "лёгкі.",
    videoLink: "",
    creatorComment:
      "“Выканайце гэты тэст увесь за адзін раз. Не трэба падзяляць яго на часткі: так працэс навучэння будзе праходзіць больш эфектыўна”.",
    answerState: null,
    isFinished: false,
    results: {},
    isRight: null,
    answerArray: [],
    cheers: [
      "1 памыляючыся, ты вучышся новаму. Так трымаць!",
      "2 памыляючыся, ты вучышся новаму. Так трымаць!",
      "3 памыляючыся, ты вучышся новаму. Так трымаць!",
    ],
    quiz: [
      {
        rightAnswer: [1, 2],
        id: 1,
        question:
          "Што з ніжэй пералічанага НЕ з’яўляецца раздзелам сучаснай беларускай мовы?",
        answers: [
          { text: "Чёрное", id: 1 },
          { text: "Синее", id: 2 },
          { text: "Красное", id: 3 },
          { text: "Голубое", id: 4 },
        ],
        explanation:
          "Сананіміка - гэта не раздзел беларускай мовы, а проста прыдуманае намі паняцце, звязанае са словам сінонім. Архіптыка ўвогуле не мае ніякага лагічнага апраўдання. Гэта правіла базіруецца на простым разуменні таго, якія разделы мовы існуюць: раім пераглядзець відэаўрок.",
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
        explanation:
          "Сананіміка - гэта не раздзел беларускай мовы, а проста прыдуманае намі паняцце, звязанае са словам сінонім. Архіптыка ўвогуле не мае ніякага лагічнага апраўдання. Гэта правіла базіруецца на простым разуменні таго, якія разделы мовы існуюць: раім пераглядзець відэаўрок.",
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
        explanation:
          "Сананіміка - гэта не раздзел беларускай мовы, а проста прыдуманае намі паняцце, звязанае са словам сінонім. Архіптыка ўвогуле не мае ніякага лагічнага апраўдання. Гэта правіла базіруецца на простым разуменні таго, якія разделы мовы існуюць: раім пераглядзець відэаўрок.",
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerArray.indexOf(answerId) === -1) {
      let array = this.state.answerArray;
      array.push(answerId);
      this.setState({ answerArray: array });
    } else {
      let array = this.state.answerArray;
      array.splice(array.indexOf(answerId, 1));
      this.setState({ answerArray: array });
    }
  };

  onCheckClick = () => {
    const question = this.state.quiz[this.state.ActiveQuestion];
    const answers = this.state.answerArray;
    const rightAnswers = question.rightAnswer;
    const results = this.state.results;

    // если это не первое нажатие на кнопку
    if (results[question.id - 1]) {
      // первое нажатие при правильной первой попытке
      if (results[question.id - 1] === "success") {
        this.setState((state) => {
          return {
            onCheckPress: 0,
            isRight: null,
            answerArray: [],
            ActiveQuestion: question.id,
            isFinished: this.isQuizFinished(),
          };
        });
      }
      // не первое нажатие при неправильной первой попытке
      else {
        if (this.state.onCheckPress === 1) {
          if (answers.length === rightAnswers.length) {
            // если выбирали не в том порядке, что в ключах
            answers.sort((a, b) => a - b);
            rightAnswers.sort((a, b) => a - b);

            let indicator = 0;
            for (let i = 0; i < answers.length; i++) {
              if (answers[i] !== rightAnswers[i]) {
                this.setState((state) => {
                  return {
                    isRight: false,
                    onCheckPress: this.state.onCheckPress + 1,
                  };
                });
                indicator++;
                break;
              }
            }
            if (indicator === 0) {
              this.setState((state) => {
                return {
                  isRight: true,
                  onCheckPress: this.state.onCheckPress + 1,
                };
              });
            }
          } else {
            this.setState((state) => {
              return {
                isRight: false,
                onCheckPress: this.state.onCheckPress + 1,
              };
            });
          }
        }
        if (this.state.onCheckPress === 2) {
          this.setState((state) => {
            return {
              onCheckPress: 0,
              isRight: null,
              answerArray: [],
              ActiveQuestion: question.id,
              isFinished: this.isQuizFinished(),
            };
          });
        }
      }
    } else {
      if (answers.length === rightAnswers.length) {
        // если выбирали не в том порядке, что в ключах
        answers.sort((a, b) => a - b);
        rightAnswers.sort((a, b) => a - b);

        let indicator = 0;
        for (let i = 0; i < answers.length; i++) {
          if (answers[i] !== rightAnswers[i]) {
            this.setState((state) => {
              return {
                results: { ...results, [question.id - 1]: "error" },
                isRight: false,
                onCheckPress: this.state.onCheckPress + 1,
              };
            });
            indicator++;
            break;
          }
        }
        if (indicator === 0) {
          this.setState((state) => {
            return {
              results: { ...results, [question.id - 1]: "success" },
              isRight: true,
              onCheckPress: this.state.onCheckPress + 1,
            };
          });
        }
      } else {
        this.setState((state) => {
          return {
            results: { ...this.state.results, [question.id - 1]: "error" },
            isRight: false,
            onCheckPress: this.state.onCheckPress + 1,
          };
        });
      }
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
          isRight={this.state.isRight}
          results={this.state.results}
          ActiveQuestion={this.state.ActiveQuestion}
          onCheckPress={this.state.onCheckPress}
          cheers={this.state.cheers}
          answerArray={this.state.answerArray}
          length={this.state.quiz.length}
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
            <b>Каментар ад стваральнікаў: </b>
            {this.state.creatorComment}
          </p>
        </div>
      </div>
    );
  }
}

export default Quiz;
