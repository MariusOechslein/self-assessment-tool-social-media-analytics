import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GreetingComponent} from "./greeting/greeting.component";
import {QuestionsComponent} from "./questions/questions.component";
import {ResultsComponent} from "./results/results.component";

const routes: Routes = [
  { path: '',   redirectTo: '/greetings', pathMatch: 'full' },
  { path: 'greetings', component: GreetingComponent },
  { path: 'questions-easy', component: QuestionsComponent },
  { path: 'questions-hard', component: QuestionsComponent },
  { path: 'results-easy', component: ResultsComponent },
  { path: 'results-hard', component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
