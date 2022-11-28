import {Component, OnInit} from '@angular/core';
import {AppComponent, MultipleChoiceQuestion, QuestionType, SingleChoiceQuestion} from "../app.component";
import {Router} from "@angular/router";

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
  skillLevelTechnologie?: Reifegrad;
  reifegradeTechnologie: Reifegrad[] = [
    { level: 0, title: "Nicht Existent", text: "Sie haben kein Wissen über Social Media Analytics Prozesse" },
    { level: 1, title: "Unvollständige Prozesse", text: "Sie haben ein wenig Verständnis" },
    { level: 2, title: "Strukturierte Prozesse", text: "Nicht schlecht" },
    { level: 3, title: "Standardisierte Prozesse", text: "Besser" },
    { level: 4, title: "Beherrschte Prozesse", text: "Super" },
    { level: 5, title: "Optimierte Prozesse", text: "Einfach toll" }
  ];
  skillLevelOrganisation?: Reifegrad;
  reifegradeOrganisation: Reifegrad[] = [
    { level: 0, title: "Nicht Existent", text: "Sie haben kein Wissen über Social Media Analytics Prozesse" },
    { level: 1, title: "Unvollständige Prozesse", text: "Sie haben ein wenig Verständnis" },
    { level: 2, title: "Strukturierte Prozesse", text: "Nicht schlecht" },
    { level: 3, title: "Standardisierte Prozesse", text: "Besser" },
    { level: 4, title: "Beherrschte Prozesse", text: "Super" },
    { level: 5, title: "Optimierte Prozesse", text: "Einfach toll" }
  ];

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.questions = this.getQuestions();
    this.skillLevelProzesse = this.calcSkillLevelProzesse();
    this.skillLevelTechnologie = this.calcSkillLevelTechnologie();
    this.skillLevelOrganisation = this.calcSkillLevelOrganisation();
  }

  getQuestions(): (SingleChoiceQuestion | MultipleChoiceQuestion)[] {
    let output: (SingleChoiceQuestion | MultipleChoiceQuestion)[] = [];

    let questions = AppComponent.questionsEasy;
    if (this.router.url.includes("hard")) {
      questions = AppComponent.questionsHard;
    }

    for (let question of questions) {
      // add question
      output.push(question);
      // add subquestions of question too
      for (let answer of question.answers) {
        if (answer.subquestions !== undefined) {
          for (let subquestion of answer.subquestions) {
            subquestion.showSubquestion = false;
            output.push(subquestion);
          }
        }
      }
    }

    return output;
  }

  calcSkillLevelProzesse(): Reifegrad {
    let points = this.calcPoints("Prozesse");
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

  calcSkillLevelTechnologie(): Reifegrad {
    let points = this.calcPoints("Technologie");
    if (points < 0) {
      return this.reifegradeTechnologie[0];
    } else if (points < -20) {
      return this.reifegradeTechnologie[1];
    } else if (points < -10) {
      return this.reifegradeTechnologie[2];
    } else if (points < 0) {
      return this.reifegradeTechnologie[3];
    } else if (points < 5) {
      return this.reifegradeTechnologie[4];
    } else {
      return this.reifegradeTechnologie[5];
    }
  }

  calcSkillLevelOrganisation(): Reifegrad {
    let points = this.calcPoints("Organisation");
    if (points < 0) {
      return this.reifegradeOrganisation[0];
    } else if (points < -10) {
      return this.reifegradeOrganisation[1];
    } else if (points < 0) {
      return this.reifegradeOrganisation[2];
    } else if (points < 5) {
      return this.reifegradeOrganisation[3];
    } else if (points < 10) {
      return this.reifegradeOrganisation[4];
    } else {
      return this.reifegradeOrganisation[5];
    }
  }

  calcPoints(keyword: string): number {
    let sum = 0.0;
    for (let question of this.questions) {
      // if single choice question -> add points of selected answer
      if (question.type === QuestionType.singleChoice) {
        if (question.group.toLowerCase().includes(keyword.toLowerCase())) {
          if (question.singleChoiceAnswer !== undefined) {
            sum += question.answers[question.singleChoiceAnswer].points;
          }
        }
      }

      // if multiple choice question -> add points of all selected answers
      if (question.type === QuestionType.multipleChoice) {
        for (let answer of question.answers) {
          if (answer.checked) {
            if (question.group.toLowerCase().includes(keyword.toLowerCase())) {
              sum += answer.points;
            }
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
