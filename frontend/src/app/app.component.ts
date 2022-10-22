import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'self-assessment-tool';

  // global declaration of questions to be able to use it every component
  public static questions: Question[] = [
    { title: "Frage 1", answers: [ { title: "Antwort 1", initialChecked: false, checked: true }, { title: "Antwort 2", initialChecked: false, checked: false }, { title: "Antwort 3", initialChecked: false, checked: true }]},
    { title: "Frage 2", answers: [ { title: "Antwort 1", initialChecked: false, checked: false }, { title: "Antwort 2", initialChecked: false, checked: false }, { title: "Antwort 3", initialChecked: false, checked: true }]},
    { title: "Frage 3", answers: [ { title: "Antwort 1", initialChecked: false, checked: true }, { title: "Antwort 2", initialChecked: false, checked: true }, { title: "Antwort 3", initialChecked: false, checked: true }]},
  ];

  state: Question[] = [];
}

export interface Question {
  title: string;
  answers: Answer[];
}

export interface Answer {
  title: string;
  initialChecked: boolean;
  checked: boolean;
}
