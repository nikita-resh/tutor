import React, { Component } from "react";
import "./Main.css";
import { NavLink } from "react-router-dom";
import LessonItem from "../../components/LessonItem/LessonItem";

class Main extends Component {
  state = {
    lessons: [
      {
        id: 1,
        title: "Раздзелы беларускай мовы. Нормы беларускай літаратурнай мовы.",
        description:
          "За гэты час мы з вамі зможам вывучыць ды паўтарыць 95% навучальнай праграмы Міністэрства Адукацыі РБ.",
        lessonLink: "https://www.youtube.com/",
        testLink: "/quiz-base",
      },
      {
        id: 2,
        title: "Раздзелы беларускай мовы. Нормы беларускай літаратурнай мовы.",
        description:
          "За гэты час мы з вамі зможам вывучыць ды паўтарыць 95% навучальнай праграмы Міністэрства Адукацыі РБ.",
        lessonLink: "https://www.youtube.com/",
        testLink: "/quiz-base",
      },
      {
        id: 3,
        title: "Раздзелы беларускай мовы. Нормы беларускай літаратурнай мовы.",
        description:
          "За гэты час мы з вамі зможам вывучыць ды паўтарыць 95% навучальнай праграмы Міністэрства Адукацыі РБ.",
        lessonLink: "https://www.youtube.com/",
        testLink: "/quiz-base",
      },
      {
        id: 4,
        title: "Раздзелы беларускай мовы. Нормы беларускай літаратурнай мовы.",
        description:
          "За гэты час мы з вамі зможам вывучыць ды паўтарыць 95% навучальнай праграмы Міністэрства Адукацыі РБ.",
        lessonLink: "https://www.youtube.com/",
        testLink: "/quiz-base",
      },
      {
        id: 5,
        title: "Раздзелы беларускай мовы. Нормы беларускай літаратурнай мовы.",
        description:
          "За гэты час мы з вамі зможам вывучыць ды паўтарыць 95% навучальнай праграмы Міністэрства Адукацыі РБ.",
        lessonLink: "https://www.youtube.com/",
        testLink: "/quiz-base",
      },
      {
        id: 6,
        title: "Раздзелы беларускай мовы. Нормы беларускай літаратурнай мовы.",
        description:
          "За гэты час мы з вамі зможам вывучыць ды паўтарыць 95% навучальнай праграмы Міністэрства Адукацыі РБ.",
        lessonLink: "https://www.youtube.com/",
        testLink: "/quiz-base",
      },
    ],
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
        <header className="header" style={{ boxShadow: "none" }}>
          <div className="wrapper">
            <div className="logo">Твой Бескаштоўны Рэпетытар</div>
            <ul className="menu">
              <li className="menu__item">
                Курс “Вывучаем бел. мову ў сістэме”
              </li>
              <li className="menu__item">
                <NavLink to="/quiz-base">База тэстаў</NavLink>
              </li>
              <li className="menu__item">
                <a href="#creators">Пра нас</a>
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
        <main className="main">
          <section className="info">
            <div className="bg">
              <div className="wrapper">
                <small> Твой Бескаштоўны Рэпетытар 2021-2022 </small>
                <h2>
                  Найбуйнейшая база інтэрактыўных тэстаў па беларускай мове
                </h2>
                <p className="offer">
                  Прыдатак да бескаштоўнага курса “Вывучэнне беларускай мовы ў
                  сістэме”, які дапаможа вам падрыхтавацца да ЦТ на 95+ балаў
                </p>
                <a href="https://www.youtube.com/">
                  <button className="btn btn_fill btn-watch">
                    Глядзець курс
                  </button>
                </a>
                <a href="#lessons">
                  <button className="btn btn_nofill btn-more-info">
                    Больш інфармацыі
                  </button>
                </a>
              </div>
            </div>
          </section>
          <section id="lessons" className="lessons">
            <div className="wrapper">
              <div className="chapter-title">Уводзіны</div>
              <div className="lessons-items">
                <LessonItem lesson={this.state.lessons[0]} />
                <LessonItem lesson={this.state.lessons[1]} />
              </div>

              <div className="chapter-title">Фанетыка і арфаэпія</div>
              <div className="lessons-items">
                <LessonItem lesson={this.state.lessons[2]} />
                <LessonItem lesson={this.state.lessons[3]} />
                <LessonItem lesson={this.state.lessons[4]} />
                <LessonItem lesson={this.state.lessons[5]} />
              </div>
            </div>
          </section>
          <section id="creators" className="creators">
            <div className="wrapper">
              <small>Каму дзякаваць за тэсты?</small>
              <h3>Пра тых, хто стварае гэтую базу тэстаў</h3>
              <div className="creators-info">
                <p className="creator-name">Муліца Канстанцін</p>
                <ul>
                  <li>Студэнт БДУ.</li>
                  <li>Здаў ЦТ-2021 па мове на 95 балаў.</li>
                  <li>
                    Пераможца рэспубліканскага беларускамоўнага праекта
                    “Першыя”.
                  </li>
                  <li>
                    Спікер беларускамоўнай канферэнцыі TEDxYouth@Minsk 2020.
                  </li>
                  <li>
                    Удзельнік абласных конкурсаў беларускай прозы і паэзіі, у
                    тым ліку конкурсаў “Жывая класіка”, “Чытаем па-беларуску з
                    velcom”.
                  </li>
                </ul>
                <p className="creator-name">Калуга Кацярына</p>
                <ul>
                  <li>Студэнтка БДУ.</li>
                  <li>Здала ЦТ-2021 па мове на 91 бал.</li>
                  <li>
                    Паўфіналістка конкурса «Чытаем па-беларуску з velcom».
                  </li>
                  <li>
                    Пераможца міжрэгіянальных чытанняў, прысвечаных Году малой
                    радзімы 2018 (Аршанскі раён)..
                  </li>
                </ul>
              </div>
              <div className="btn btn_nofill">Глядзець прэв’ю курса</div>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="wrapper">
            <span>
              @Copyright 2021 | Сайт стварыў:&nbsp;
              <a href="https://nikita-resh.github.io/rsschool-cv/">
                Мікіта Рашэтнікаў
              </a>
            </span>
            <a href="#creators">Кантакты стваральнікаў курса</a>
          </div>
        </footer>
      </>
    );
  }
}

export default Main;
