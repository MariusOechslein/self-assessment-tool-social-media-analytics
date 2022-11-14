import { Component } from '@angular/core';

export enum QuestionType {
  "multipleChoice", "singleChoice"
}

export enum Difficulty {
  "EASY", "HARD"
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
  public static questionsEasy: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [
    { textField: false, group: "Prozesse-Plan", title: "Frage zu Plan", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: true, points: -1 }, { title: "Antwort 2", initialChecked: false, checked: false, points: +2 }, { title: "Antwort 3", initialChecked: false, checked: true, points: 0 }]},
    { textField: false, group: "Prozesse-Plan", title: "Frage 1.1", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: false, points: +3 }, { title: "Antwort 2", initialChecked: false, checked: false, points: -1 }, { title: "Antwort 3", initialChecked: false, checked: true, points: +1 }]},
    {textField: true, 'title': 'Gibt es einen Plan für Social Media Analytics?',
      'group': 'Prozesse-Plan',
      'type': 0,
      'answers': [{'title': 'Antwortmöglichkeit 1 ',
        'points': 3,
        'checked': false,
        'initialChecked': false},
        {'title': 'Möglichkeit 2 ',
          'points': -2,
          'checked': false,
          'initialChecked': false},
        {'title': 'Möglichkeit 3',
          'points': -1,
          'checked': false,
          'initialChecked': false}]},
    { textField: true, group: "Prozesse-Plan", title: "Frage 1.2", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: false, points: 0 }, { title: "Antwort 2", initialChecked: false, checked: true, points: 0 }, { title: "Antwort 3", initialChecked: false, checked: true, points: +4 }]},
    { textField: false, group: "Prozesse-Metriken", title: "Frage 2", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: false, points: -1 }, { title: "Antwort 2", initialChecked: false, checked: false, points: +2 }, { title: "Antwort 3", initialChecked: false, checked: true, points: +2 }]},
    { textField: false, group: "Technologie", title: "Frage 3", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: true, points: +1 }, { title: "Antwort 2", initialChecked: false, checked: false, points: -2, subquestions: [
          { textField: true, group: "Technologie", title: "Wie stehen Sie dazu?", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: false, points: -1 }, { title: "Antwort 2", initialChecked: false, checked: false, points: +2 }, { title: "Antwort 3", initialChecked: false, checked: true, points: +2 }]},

        ] }, { title: "Antwort 3", initialChecked: false, checked: true, points: +2 }]},
    { textField: true, group: "Organisation", title: "Single Choice Question", type: QuestionType.singleChoice, singleChoiceInitialAnswer: 0, singleChoiceAnswer: 0, answers: [ { title: "Antwort 1", initialChecked: false, checked: true, points: +2}, { title: "Antwort 2", initialChecked: false, checked: true, points: -1 }, { title: "Antwort 3", initialChecked: false, checked: true, points: -3 }]},
  ];

  public static questionsHard: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [
    { textField: false, group: "Difficulty Hard Questions", title: "Sample Question 1", type: QuestionType.multipleChoice, answers: [ { title: "Antwort 1", initialChecked: false, checked: true, points: -1 }, { title: "Antwort 2", initialChecked: false, checked: false, points: +2 }, { title: "Antwort 3", initialChecked: false, checked: true, points: 0 }]},
  ]

  state: Question[] = [];
}

interface Question {
  title: string;
  type: QuestionType;
  answers: Answer[];
  group: string;
  showSubquestion?: boolean
  textField: boolean;
  // textFieldValue, um den Text nach dem Laden zu behalten? zum Auswerten?
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
  subquestions?: (SingleChoiceQuestion | MultipleChoiceQuestion)[];
}
