import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'self-assessment-tool';

  public stateEnum = stateEnum;
  public state: stateEnum = stateEnum.GREETINGS;
}

export enum stateEnum {"GREETINGS", "QUESTIONS", "RESULTS"}
