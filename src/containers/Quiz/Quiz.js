import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuestion from "../../components/ActiveQuestion/ActiveQuestion";
import Finish from "../../components/Finish/Finish";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Input/Loader/Loader";
import { NavLink } from "react-router-dom";

class Quiz extends Component {
  state = {
    ActiveQuestion: 0,
    onCheckPress: 0,
    answerState: null,
    isFinished: false,
    results: {},
    isRight: null,
    length: null,
    answerArray: [],
    cheers: [
      "1 памыляючыся, ты вучышся новаму. Так трымаць!",
      "2 памыляючыся, ты вучышся новаму. Так трымаць!",
      "3 памыляючыся, ты вучышся новаму. Так трымаць!",
    ],
    quiz: [],
    loading: true,
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerArray.indexOf(answerId) === -1) {
      let array = this.state.answerArray;
      array.push(answerId);
      this.setState({ answerArray: array });
    } else {
      let array = this.state.answerArray;
      array.splice(array.indexOf(answerId), 1);
      this.setState({ answerArray: array });
    }
  };

  onCheckClick = () => {
    const question = this.state.quiz.tasks[this.state.ActiveQuestion];
    const answers = this.state.answerArray;
    const rightAnswers = question.rightAnswer;
    const results = this.state.results;

    // если это не первое нажатие на кнопку
    if (results[question.id - 1]) {
      // первое нажатие при правильной первой попытке
      if (results[question.id - 1] === "success") {
        console.log(this.state.length, this.state.ActiveQuestion);
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
    return this.state.ActiveQuestion + 1 === this.state.quiz.tasks.length;
  }

  componentDidMount = async () => {
    // console.log("Quiz ID ", this.props.match.params.id);
    try {
      const response = await axios.get(
        `/quizes/${this.props.match.params.id}.json`
      );
      const quiz = response.data;

      this.setState({ quiz, loading: false });
      this.setState((state) => {
        return {
          length: this.state.quiz.tasks.length,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <div id="telegram">
          <div className="wrapper">
            Новыя відэа ды тэсты курса “Вывучаем бел. мову ў сістэме” з’яўляюцца
            кожны тыдзень!&nbsp;
            <a href="https://web.telegram.org/k/">Наш бот ў тэлеграм.</a>
          </div>
        </div>
        <header className="header">
          <div className="wrapper">
            <NavLink to="/">
              <div className="logo">Твой Бескаштоўны Рэпетытар</div>
            </NavLink>
            <ul className="menu" style={{ width: "450px" }}>
              <li className="menu__item">
                Курс “Вывучаем бел. мову ў сістэме”
              </li>
              <li>
                <a href="https://www.youtube.com/">
                  <button className="btn btn_nofill btn-watch">
                    Глядзець курс
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </header>
        <div className="wrapper">
          {this.state.isFinished ? (
            <Finish
              results={this.state.results}
              tasks={this.state.quiz.tasks}
            />
          ) : (
            <div className="Quiz">
              {this.state.loading ? (
                <Loader />
              ) : (
                <>
                  <ActiveQuestion
                    question={this.state.quiz.tasks[this.state.ActiveQuestion]}
                    answersList={
                      this.state.quiz.tasks[this.state.ActiveQuestion].answers
                    }
                    onAnswerClick={this.onAnswerClickHandler}
                    state={this.state.answerState}
                    onCheckClick={this.onCheckClick}
                    isRight={this.state.isRight}
                    results={this.state.results}
                    ActiveQuestion={this.state.ActiveQuestion}
                    onCheckPress={this.state.onCheckPress}
                    cheers={this.state.cheers}
                    answerArray={this.state.answerArray}
                    length={this.state.length}
                  />
                  <div className="Quiz__info">
                    <h3>Інфармацыя пра тэст</h3>
                    <p>
                      <b>Тэма:&nbsp;</b>
                      {this.state.quiz.quizTheme}
                    </p>
                    <p>
                      <b>Узровень цяжкасці:&nbsp;</b>
                      {this.state.quiz.quizLevel}
                    </p>
                    <p>
                      <b>Відэазанятак па гэтай тэме:&nbsp;</b>
                      <a href={this.state.quiz.videoLink}>спасылка</a>.
                    </p>
                    <p>
                      <b>Каментар ад стваральнікаў: </b>
                      {this.state.quiz.creatorComment}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Quiz;
