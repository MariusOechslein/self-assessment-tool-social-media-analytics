import {Component, OnInit} from '@angular/core';
import {AppComponent, MultipleChoiceQuestion, QuestionType, SingleChoiceQuestion} from "../app.component";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  questions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
  skillLevelProzesse?: Reifegrad;
  reifegradeProzesse: Reifegrad[] = [
    { level: 0, title: "Nicht Existent", text: "Sie haben kein Wissen über Social Media Analytics Prozesse" },
    { level: 1, title: "Unvollständige Prozesse", text: "Sie haben ein wenig Verständnis" },
    { level: 2, title: "Strukturierte Prozesse", text: "Nicht schlecht" },
    { level: 3, title: "Standardisierte Prozesse", text: "Besser" },
    { level: 4, title: "Beherrschte Prozesse", text: "Super" },
    { level: 5, title: "Optimierte Prozesse", text: "Einfach toll" }
  ];
  // TODO: reifegradeTechnologie
  // TODO: reifegradeOrganisation

  constructor() { }

  ngOnInit(): void {
    this.questions = AppComponent.questions;
    this.skillLevelProzesse = this.calcSkillLevelProzesse();
  }

  calcSkillLevelProzesse(): Reifegrad {
    let points = this.calcPoints();
    if (points < 0) {
      return this.reifegradeProzesse[0];
    } else if (points < 10) {
      return this.reifegradeProzesse[1];
    } else if (points < 30) {
      return this.reifegradeProzesse[2];
    } else if (points < 40) {
      return this.reifegradeProzesse[3];
    } else if (points < 50) {
      return this.reifegradeProzesse[4];
    } else {
      return this.reifegradeProzesse[5];
    }
  }

  calcPoints(): number {
    let sum = 0;
    for (let question of this.questions) {
      // if single choice question -> add points of selected answer
      if (question.type === QuestionType.singleChoice) {
        sum += question.answers[question.singleChoiceAnswer].points;
      }

      // if multiple choice question -> add points of all selected answers
      if (question.type === QuestionType.multipleChoice) {
        for (let answer of question.answers) {
          if (answer.checked) {
            sum += answer.points;
          }
        }
      }
    }
    return sum;
  }
}

interface Reifegrad {
  level: number;
  title: string;
  text: string;
}
