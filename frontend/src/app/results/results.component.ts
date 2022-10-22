import { Component, OnInit } from '@angular/core';
import {AppComponent, Question} from "../app.component";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: Question[] = [];

  constructor() { }

  ngOnInit(): void {
    this.results = AppComponent.questions;
  }

}
