import { Component } from '@angular/core';

export enum QuestionType {
  "multipleChoice", "singleChoice"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'self-assessment-tool';

  // global declaration of questions to be able to use it every component
  // has to be sorted after question group
  public static questions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [
    { group: "Prozesse-Plan", title: "Frage 1", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: true, points: -1 }, { title: "Antwort 2", initialChecked: false, checked: false, points: +2 }, { title: "Antwort 3", initialChecked: false, checked: true, points: 0 }]},
    { group: "Prozesse-Plan", title: "Frage 1.1", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: false, points: +3 }, { title: "Antwort 2", initialChecked: false, checked: false, points: -1 }, { title: "Antwort 3", initialChecked: false, checked: true, points: +1 }]},
    { group: "Prozesse-Plan", title: "Frage 1.2", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: false, points: 0 }, { title: "Antwort 2", initialChecked: false, checked: true, points: 0 }, { title: "Antwort 3", initialChecked: false, checked: true, points: +4 }]},
    { group: "Prozesse-Metriken", title: "Frage 2", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: false, points: -1 }, { title: "Antwort 2", initialChecked: false, checked: false, points: +2 }, { title: "Antwort 3", initialChecked: false, checked: true, points: +2 }]},
    { group: "Technologie", title: "Frage 3", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: true, points: +1 }, { title: "Antwort 2", initialChecked: false, checked: true, points: -2 }, { title: "Antwort 3", initialChecked: false, checked: true, points: +2 }]},
    { group: "Organisation", title: "Single Choice Question", type: QuestionType.singleChoice, singleChoiceInitialAnswer: 0, singleChoiceAnswer: 0, answers: [ { title: "Antwort 1", initialChecked: false, checked: true, points: +2 }, { title: "Antwort 2", initialChecked: false, checked: true, points: -1 }, { title: "Antwort 3", initialChecked: false, checked: true, points: -3 }]},
  ];

  state: Question[] = [];
}

interface Question {
  title: string;
  type: QuestionType;
  answers: Answer[];
  group: string;
}

export interface SingleChoiceQuestion extends Question {
  type: QuestionType.singleChoice;
  singleChoiceAnswer: number;
  singleChoiceInitialAnswer: number;
}

export interface MultipleChoiceQuestion extends Question {
  type: QuestionType.multipleChoice;
}

export interface Answer {
  title: string;
  initialChecked: boolean;
  checked: boolean;
  points: number;
}
