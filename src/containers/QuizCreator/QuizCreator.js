import React, { Component } from "react";
import "./QuizCreator.css";
import { createControl } from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Input/Select/Select";
import { validate } from "../../form/formFramework";
import { validateForm } from "../../form/formFramework";
import axios from "../../axios/axios-quiz";

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      {
        required: true,
      }
    ),
    option1: createControl(
      {
        label: "Вариант 1",
        errorMessage: "Значение не может быть пустым",
        id: 1,
      },
      { required: true }
    ),
    option2: createControl(
      {
        label: "Вариант 2",
        errorMessage: "Значение не может быть пустым",
        id: 2,
      },
      { required: true }
    ),
    option3: createControl(
      {
        label: "Вариант 3",
        errorMessage: "Значение не может быть пустым",
        id: 3,
      },
      { required: true }
    ),
    option4: createControl(
      {
        label: "Вариант 4",
        errorMessage: "Значение не может быть пустым",
        id: 4,
      },
      { required: true }
    ),
  };
}
export default class QuizCreator extends Component {
  state = {
    quiz: {
      tasks: [],
    },
    formControls: createFormControls(),
    isFormValid: false,
    rightAnswer: [],
    exlanation: "",
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({ formControls, isFormValid: validateForm(formControls) });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            key={index}
            errorMessage={control.errorMessage}
            onChange={(e) => this.changeHandler(e.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </>
      );
    });
  }

  renderExplanation() {
    return (
      <Input
        label="Паясненне"
        value={this.state.exlanation}
        onChange={(e) => this.onChangeExplanation(e.target.value)}
      />
    );
  }

  onChangeExplanation = (value) => {
    this.setState({
      exlanation: value,
    });
  };

  selectChangeHandler = (e) => {
    // console.log(e.target.value);

    let array = [...this.state.rightAnswer];

    if (
      this.state.rightAnswer.indexOf(+e.target.value) === -1 &&
      e.target.value !== ""
    ) {
      array.push(+e.target.value);
    } else {
      array.splice(array.indexOf(+e.target.value), 1);
    }

    this.setState({
      rightAnswer: array,
    });
  };

  addQuestionHandler = (e) => {
    e.preventDefault();

    const quiz = this.state.quiz;
    const tasks = quiz.tasks.concat();
    const index = quiz.tasks.length + 1;

    let answers = [];
    for (let key in this.state.formControls) {
      if (key !== "question") {
        answers.push({
          text: this.state.formControls[key].value,
          id: this.state.formControls[key].id,
        });
      }
    }

    const questionItem = {
      question: this.state.formControls.question.value,
      id: index,
      rightAnswer: this.state.rightAnswer,
      answers: answers,
      explanation: this.state.exlanation,
    };

    tasks.push(questionItem);

    this.setState({
      quiz: { ...quiz, tasks: tasks },
      formControls: createFormControls(),
      isFormValid: false,
      rightAnswer: [],
      explanation: "",
    });
  };

  addAnswerHandler = () => {
    let index = Object.keys(this.state.formControls).length;

    let str = "option" + index;

    this.setState((state) => {
      return {
        formControls: {
          ...this.state.formControls,
          [str]: createControl(
            {
              label: `Вариант ${index}`,
              errorMessage: "Значение не может быть пустым",
              id: index,
            },
            { required: true }
          ),
        },
      };
    });
  };

  createQuizHandler = async (e) => {
    e.preventDefault();

    console.log(this.state.quiz);
    try {
      await axios.post("/quizes.json", this.state.quiz);
      this.setState({
        quiz: { tasks: [] },
        formControls: createFormControls(),
        isFormValid: false,
        rightAnswer: [],
        explanation: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  render = () => {
    let index = Object.keys(this.state.formControls).length;

    const options = [];
    for (let i = 1; i < index; i++) {
      options.push({ text: i, value: i });
    }
    const select = (
      <Select
        label="Выбирете правильный ответ"
        value={this.state.rightAnswer}
        onChange={this.selectChangeHandler}
        key={Math.random()}
        options={options}
      />
    );

    return (
      <div className="QuizCreator">
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}
            {this.renderExplanation()}
            <button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </button>
            <button
              type="primary"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.tasks.length === 0}
            >
              Создать тест
            </button>
            <button type="primary" onClick={this.addAnswerHandler}>
              Добавить вариант ответа
            </button>
          </form>
        </div>
      </div>
    );
  };
}
