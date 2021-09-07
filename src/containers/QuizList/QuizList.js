import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./QuizList.css";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Input/Loader/Loader";

export default class QuizList extends Component {
  state = { quizes: [], loading: true };

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://react-quiz-c09a9-default-rtdb.europe-west1.firebasedatabase.app/quizes.json"
      );

      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        console.log();
        quizes.push({
          id: key,
          name: `${response.data[key].quizTheme} Узровень складанасці: ${response.data[key].quizLevel}`,
        });
      });

      this.setState({
        quizes,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

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
        <div className="QuizList">
          <div className="wrapper">
            <div>
              <h1>Спіс тэстаў</h1>
              {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
            </div>
          </div>
        </div>
      </>
    );
  }
}
