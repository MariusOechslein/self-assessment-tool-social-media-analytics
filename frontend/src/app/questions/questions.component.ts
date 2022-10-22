import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questionsPerPage: number = 10;
  pageNumber: number = 0;
  questions: string[] = ["Frage 1", "Liebt mein bubs mich?", "Frage 3", "Frage 4", "Frage 5", "6", "7", "8", "9", "10", "11", "Frage 12"];
  displayedQuestions: string[] = [];

  constructor() {
    this.getInitialQuestions();
  }

  ngOnInit(): void {
  }

  getInitialQuestions() {
    let result: string[] = [];
    let startPosition: number = this.pageNumber * this.questionsPerPage;
    let endPosition: number = startPosition + this.questionsPerPage;
    for (let i = startPosition; i < endPosition; i++) {
      result.push(this.questions[i]);
    }

    this.displayedQuestions.push(...result);
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
    let result: string[] = [];
    let startPosition: number = this.pageNumber * this.questionsPerPage;
    let endPosition: number = startPosition + this.questionsPerPage;
    for (let i = startPosition; i < endPosition; i++) {
      result.push(this.questions[i]);
    }
    return result;
  }

}
