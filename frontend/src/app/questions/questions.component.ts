import {Component, OnInit} from '@angular/core';
import {
  Answer,
  AppComponent,
  Difficulty,
  MultipleChoiceQuestion,
  QuestionType,
  SingleChoiceQuestion
} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questionsPerPage: number = 20;
  pageNumber: number = 0;
  groupPosition: number = 0; // 0: Prozesse, 1: Technologie, 2: Organisation
  questions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
  displayedQuestions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
  subquestionIdentifier: string = " - Unterfrage";
  difficulty: Difficulty = Difficulty.EASY;

  constructor(public router: Router) {
  }

  ngOnInit(): void {
    if (this.router.url.includes("hard")) {
      this.difficulty = Difficulty.HARD;
    }

    if (this.difficulty == Difficulty.EASY) {
      this.questions = AppComponent.questionsEasy;
    } else {
      this.questions = AppComponent.questionsHard;
    }
    this.updateDisplay();
  }

  getNextQuestions() {
    // update positions
    this.pageNumber = this.pageNumber + 1;
    this.groupPosition = this.groupPosition + 1;
    this.updateDisplay();
  }

  getPreviousQuestions() {
    // update positions
    this.pageNumber = this.pageNumber - 1;
    this.groupPosition = this.groupPosition - 1;
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

        // check subquestions too
        if (answer.subquestions !== undefined) {
          for (let subquestion of answer.subquestions) {
            for (let subquestionAnswer of subquestion.answers) {
              subquestionAnswer.initialChecked = subquestionAnswer.checked;
            }
            if (subquestion.type == QuestionType.singleChoice) {
              subquestion.singleChoiceInitialAnswer = subquestion.singleChoiceAnswer;
            }
          }
        }
      }
      if (question.type == QuestionType.singleChoice) {
        question.singleChoiceInitialAnswer = question.singleChoiceAnswer;
      }
    }

    let result: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
    let startPosition: number = this.pageNumber * this.questionsPerPage;
    let endPosition: number = startPosition + this.questionsPerPage;

    // group Questions in Categories
    const processQuestions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
    const technologyQuestions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
    const organisationQuestions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
    for (const question of this.questions) {
      if (question.group.includes("Technologie")) {
        technologyQuestions.push(question);
      } else if (question.group.includes("Organisation")) {
        organisationQuestions.push(question);
      } else if (question.group.includes("Prozesse")) {
        processQuestions.push(question);
      } else {
        console.log(question);
      }
    }
    const questionCatalogue: (MultipleChoiceQuestion | SingleChoiceQuestion)[][] = [processQuestions, technologyQuestions, organisationQuestions];
    console.log("num all quesitons:", processQuestions.length + technologyQuestions.length + organisationQuestions.length);
    console.log("num process questions:", processQuestions.length);
    console.log("num technology questions:", technologyQuestions.length);
    console.log("num organisation questions:", organisationQuestions.length);

    // Lösung mit 1 Gruppe pro Seite - group Position mit questionCatalogue
    for (const question of questionCatalogue[this.groupPosition]) {
      // edge case for last page, which probably contains less than this.questionsPerPage questions
      if (question == undefined) {
        break;
      }

      // add question
      result.push(question);
      // add subquestions of question too
      for (let answer of question.answers) {
        if (answer.subquestions !== undefined) {
          for (let subquestion of answer.subquestions) {
            subquestion.showSubquestion = false;
            if (answer.checked) {
              // only show subquestions if answer is checked
              subquestion.showSubquestion = true;
            }
            /*
            // check if subquestion has identifier in title, if not, add it
            if (!subquestion.title.includes(this.subquestionIdentifier)) {
              subquestion.title += this.subquestionIdentifier;
            }*/
            result.push(subquestion);
          }
        }
      } 
    }

    /*
    // If commenting in - don't forget .html buttons
    // Lösung mit fester Anzahl von Fragen pro Seite - questionsPerPage for loop
    for (let i = startPosition; i < endPosition; i++) {
      // edge case for last page, which probably contains less than this.questionsPerPage questions
      if (i >= this.questions.length) {
        break;
      }

      // add question
      result.push(this.questions[i]);
      // add subquestions of question too
      for (let answer of this.questions[i].answers) {
        if (answer.subquestions !== undefined) {
          for (let subquestion of answer.subquestions) {
            subquestion.showSubquestion = false;
            if (answer.checked) {
              // only show subquestions if answer is checked
              subquestion.showSubquestion = true;
            }
            // check if subquestion has identifier in title, if not, add it
            //if (!subquestion.title.includes(this.subquestionIdentifier)) {
              //subquestion.title += this.subquestionIdentifier;
            //}
            result.push(subquestion);
          }
        }
      }
    }*/
    return result;
  }

  handleCheckbox(event: any, answer: Answer, question: MultipleChoiceQuestion) {
    // update progress bar progress
    AppComponent.progress = this.calcProgress(question);
    
    if (answer.subquestions !== undefined) {
      for (let subquestion of answer.subquestions) {
        subquestion.showSubquestion = !subquestion.showSubquestion;
      }
    }
    answer.checked = !event.checked;
  }

  handleRadio(question: SingleChoiceQuestion, index: number) {
    // update progress bar progress
    AppComponent.progress = this.calcProgress(question);

    // deselect first answer -> hide subquestions
    if (question.singleChoiceAnswer != undefined) {
      let answerBefore = question["answers"][question.singleChoiceAnswer];
      if (answerBefore.subquestions !== undefined) {
        for (let subquestion of answerBefore.subquestions) {
          subquestion.showSubquestion = false;
        }
      }
    }

    question.singleChoiceAnswer = index

    // new selection -> show subquestions
    let answerAfter = question["answers"][question.singleChoiceAnswer];
    if (answerAfter.subquestions !== undefined) {
      for (let subquestion of answerAfter.subquestions) {
        subquestion.showSubquestion = true;
      }
    }
  }

  calcProgress(question: SingleChoiceQuestion | MultipleChoiceQuestion) {
    const numOfQuestions: number = this.questions.length;
    let index = 1;
    for (const questionIter of this.questions) {
      if (questionIter.title == question.title) {
        return index / numOfQuestions;
      }
      index += 1;
    }
    return AppComponent.progress;
  }

  handleTextAreaEvent(index: number, event: any) {
    // TODO: Bug if any input other than typing or normal backward
    if (event.inputType == "insertText") {
      this.displayedQuestions[index].text += event.data;
    } else if (event.inputType == "deleteContentBackward") {
      this.displayedQuestions[index].text = this.displayedQuestions[index].text?.slice(0,-1);
    } else {
      // TODO: handle other inputTypes
    }
  }
}
