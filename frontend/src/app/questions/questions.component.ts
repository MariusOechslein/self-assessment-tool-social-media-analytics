import {Component, OnInit} from '@angular/core';
import {Answer, AppComponent, MultipleChoiceQuestion, QuestionType, SingleChoiceQuestion} from "../app.component";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questionsPerPage: number = 4;
  pageNumber: number = 0;
  questions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
  displayedQuestions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.questions = AppComponent.questions;
    this.updateDisplay();
  }

  getNextQuestions() {
    // update positions
    this.pageNumber = this.pageNumber + 1;
    this.updateDisplay();
  }

  getPreviousQuestions() {
    // update positions
    this.pageNumber = this.pageNumber - 1;
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayedQuestions = [];
    this.displayedQuestions.push(...this.getQuestions());
  }

  getQuestions() {
    // save state of checkboxes
    for (let question of this.questions) {
      for (let answer of question.answers) {
        answer.initialChecked = answer.checked;
      }
      if (question.type == QuestionType.singleChoice) {
        question.singleChoiceInitialAnswer = question.singleChoiceAnswer;
      }
    }

    let result: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
    let startPosition: number = this.pageNumber * this.questionsPerPage;
    let endPosition: number = startPosition + this.questionsPerPage;
    for (let i = startPosition; i < endPosition; i++) {
      // edge case for last page, which probably contains less than this.questionsPerPage questions
      if (i >= this.questions.length) {
        break;
      }
      result.push(this.questions[i]);
    }
    return result;
  }

  handleCheckbox(event: any, answer: Answer) {
    answer.checked = !event.checked;
  }

  handleRadio(question: SingleChoiceQuestion, index: number) {
    question.singleChoiceAnswer = index
  }
}
