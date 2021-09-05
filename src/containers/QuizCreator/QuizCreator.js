import React, { Component } from "react";
import "./QuizCreator.css";
import { createControl } from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Input/Select/Select";
import { validate } from "../../form/formFramework";
import { validateForm } from "../../form/formFramework";

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
    quiz: [],
    formControls: createFormControls(),
    isFormValid: false,
    rightAnswer: [],
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

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

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
    };

    quiz.push(questionItem);

    this.setState({
      quiz,
      formControls: createFormControls(),
      isFormValid: false,
      rightAnswer: [],
    });
  };

  addAnswerHandler = () => {
    let index = 0;
    for (let key in this.state.formControls) {
      index++;
    }
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

  createQuizHandler = (e) => {
    console.log(this.state.quiz);
  };

  render = () => {
    let index = 0;
    for (let key in this.state.formControls) {
      index++;
    }
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
              disabled={this.state.quiz.length === 0}
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
