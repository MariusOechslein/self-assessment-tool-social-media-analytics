import {Component, OnInit} from '@angular/core';
import {Answer, AppComponent, Question} from "../app.component";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questionsPerPage: number = 2;
  pageNumber: number = 0;
  questions: Question[] = [];
  displayedQuestions: Question[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.questions = AppComponent.questions;
    this.displayedQuestions.push(...this.getQuestions());
  }

  getNextQuestions() {
    // update positions
    this.pageNumber = this.pageNumber + 1;

    // update display
    this.displayedQuestions = [];
    this.displayedQuestions.push(...this.getQuestions());
  }

  getPreviousQuestions() {
    // update positions
    this.pageNumber = this.pageNumber - 1;

    // update display
    this.displayedQuestions = [];
    this.displayedQuestions.push(...this.getQuestions());
  }

  getQuestions() {
    // save state of checkboxes
    for (let question of this.questions) {
      for (let answer of question.answers) {
        answer.initialChecked = answer.checked;
      }
    }

    let result: Question[] = [];
    let startPosition: number = this.pageNumber * this.questionsPerPage;
    let endPosition: number = startPosition + this.questionsPerPage;
    for (let i = startPosition; i < endPosition; i++) {
      // if outside of bounds -> break;
      if (i >= this.questions.length) {
        break;
      }
      result.push(this.questions[i]);
    }
    return result;
  }

  handleCheckbox(event: any, answer: Answer) {
    // rerender problem. checkbox wird erst rerendered wenn ich das zweite mal draufdrücke
    answer.checked = !event.checked;
    console.log(answer.checked);
  }
}
