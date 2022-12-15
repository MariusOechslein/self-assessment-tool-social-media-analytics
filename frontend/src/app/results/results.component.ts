import {Component, OnInit} from '@angular/core';
import {AppComponent, MultipleChoiceQuestion, QuestionType, SingleChoiceQuestion} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  showAnsweredQuestions: boolean = false;

  questions: (MultipleChoiceQuestion | SingleChoiceQuestion)[] = [];
  skillLevelProzesse?: Reifegrad;
  reifegradeProzesse: Reifegrad[] = [
    { level: 0, title: "Nicht-Existent", text: "Es sind keine oder noch keine Prozesse geplant oder vorhanden. Verbesserungsvorschlag: Es müssen Vorgehensmodelle für Prozesse oder Projektmanagement geschaffen werden. Das Team sollte Mitglieder beinhalten, welche die nötige Kompetenz besitzen und diese an andere Kollegen weitertragen. In- und Outputs von Prozessen sollten bekannt gemacht werden, um eine vorübergehende Planung zu ermöglichen. " },
    { level: 1, title: "Unvollständige Prozesse", text: "Es gibt keine oder nur unvollständige Vorgehensmodelle für Prozesse oder Projektmanagement von Seiten des Unternehmens. Erfolg und Misserfolg eines Prozesses hängen vollständig von der persönlichen Kompetenz einzelner Personen ab. Erfolge können nicht systematisch reproduziert werden. Die Vorgehensweise sowie In- und Outputs sind zwar bekannt, die Qualität ist damit aber nicht vorhersehbar. Die Planung erfolgt nicht konsequent und erzeugt damit eine Aufgabenfolge, welche zeitlich und logisch nicht kalkulierbar ist. Verbesserungsvorschlag: Prozesse sollten dokumentiert und dadurch auch wiederholbar gemacht werden. In- und Outputs sollten analysiert bzw. ausgewertet werden, um auf Basis dieser ein Vorgehensmodell für das Prozessmanagement zu entwickeln. Erfahrungswerte aus der Vergangenheit sollten in die Prozessziele mit einfließen. Qualität der Prozesse muss stetig überprüft werden. " },
    { level: 2, title: "Strukturierte Prozesse", text: "Prozesse haben sich im Unternehmen zum Teil etabliert und werden dokumentiert. Eine systematische Analyse bisheriger In- und Outputs von Prozessen wird durchgeführt und die daraus resultierenden Erfahrungen ausgewertet. Aus den Erkenntnissen wird ein Vorgehensmodell zum Prozessmanagement entwickelt und im Unternehmen installiert. Prozessziele werden auf der Basis realistischer Erfahrungswerte vereinbart und geplant. Damit ergibt sich eine überprüfbare Qualität, welche aber nicht auf einem Niveau stagniert. Verbesserungsvorschlag: Prozesse sollten vollständig dokumentiert und wiederholbar gemacht werden. Prozesse werden damit zu Standprozessen, welche idealerweise unternehmens- oder abteilungsweit eingeführt werden. Diese müssen alle wesentlichen Prozesselemente beinhalten. Für die Standardprozesse könnte eine Organisationseinheit geschaffen werden, welche für die Umsetzung dieser verantwortlich ist. Kennzahlen und Zeiten müssen hierbei festgelegt werden. " },
    { level: 3, title: "Standardisierte Prozesse", text: "Die Standardprozesse, welche die unabdingbaren Prozesselemente aufnehmen, sind vollständig dokumentiert und wurden unternehmens- oder abteilungsweit eingeführt. Die Prozesse sind transparent und überprüfbar. Eine Organisationseinheit wurde für die Umsetzung dieser Standardprozesse definiert. Hierbei werden Kennzahlen sowie Zeiten festgelegt und identifiziert. Qualität ist noch schwankend und stagniert nicht auf einem Niveau. Verbesserungsvorschlag: Alle nötigen bzw. wichtigen Prozessparameter sollten über Metriken überwacht und auch gesteuert werden. Das gleiche gilt für die Zielerreichung. Prognosen bezüglich der Prozessergebnisse sollten äußerst zuverlässig sein. Dafür könnte ein Riskmanagement eingeführt werden, um Gefährdungen durch Ungewissheit zu vermeiden.  " },
    { level: 4, title: "Beherrschte Prozesse", text: "Auf dieser Stufe existiert ein quantifizierter Qualitätsplan für die Prozesse. Alle wesentlichen Prozessparameter sowie die Zielerreichung werden über Metriken überwacht und gesteuert. Ein Risikomanagement ist definiert und etabliert. Die Vorhersagbarkeit bezüglich der Zeiten und der Qualität von Prozessergebnissen ist sehr hoch und zuverlässig kontrollierbar. Verbesserungsvorschlag: Die Organisation sollte über die nötigen Mittel verfügen Schwächen bzw. Fehler in den Prozessen zu identifizieren, um diese zu beseitigen und damit eine stetige Prozessverbesserung zu gewährleisten. Fehler werden hiermit proaktiv vermieden.  Für die Lösungen dieser Art ist stets an Best-Practice zu orientieren. Dafür könnte man regelmäßige Prozessaudits stattfinden lassen, um diesen Standard zu erreichen. " },
    { level: 5, title: "Optimierte Prozesse", text: "Das gesamte Unternehmen macht die Prozesse zur Routine und verbessert diese kontinuierlich. Die Organisation verfügt über die Werkzeuge und Mittel, Stärken und Schwächen in den Prozessen systematisch zu erkennen, mit dem Ziel, das Auftreten von Fehlern proaktiv zu vermeiden. Ziele werden hierbei strategisch festgelegt. Best-Practice-Lösungen werden über Benchmarking identifiziert und allgemein zur Verfügung gestellt. Prozessaudits finden in regelmäßigen Abständen statt. Verbesserungsvorschlag: Sie haben bereits den höchsten Reifegrad erreicht." }
  ];
  skillLevelTechnologie?: Reifegrad;
  reifegradeTechnologie: Reifegrad[] = [
    { level: 0, title: "Nicht-Existent", text: "Es sind keine oder noch keine Technologien zur Auswertung von Social Media Daten geplant oder vorhanden. Verbesserungsvorschlag: Es sollte sich ausgiebig mit den Technologien für Social Media Analytics auseinandergesetzt werden. Zunächst sind hier vor allem die Analytics-Bereiche Social Listening und Reporting interessant. Hierbei geht es um die Auswertung von historischen Daten. Damit können Erwähnungen zu Produkten, zur Marke oder zum Unternehmen wahrgenommen werden. Zudem können Social Media Engagements(Likes, Reposts, usw.) ausgewertet werden. Damit wird insbesondere der Kundenservice und die Krisenkommunikation unterstützt. Es sollten Reports erstellt werden, welche Live für unterschiedliche Nutzer sichtbar und zudem auch benutzerfreundlich gestaltet sind. " },
    { level: 1, title: "Social Listening und Reporting", text: "Es geht um die Auswertung historischer Daten, sprich Mentions zu Produkten, zur Marke und zum Unternehmen sowie der Auswertung des Social Media Engagements bezüglich Likes, Reposts usw. Das Ganze dient der Unterstützung und dem Beleg des Social Media Managements, der Kundenservice-Kommunikation sowie der Krisenkommunikation. Bei diesem Reifegrad geht es zunehmend um die Benutzung von Management Dashboards. Das heißt, dass unterschiedliche Nutzer direkt auf aggregierte Live-Reports in Systemen zugreifen können und anwenderfreundliche Visualisierungen zur Verfügung stehen haben. Verbesserungsvorschlag: Der Echtzeit-Support bezüglich Social Media und Customer Engagement Management sollte ausgebaut werden. Für das Mention-Tracking wird hierbei ein Verarbeitungsprozess integriert, welcher die Beantwortung selbst ansteuert.  Bei der Erfassung und Auswertung sollte der Fokus auf Echtzeit-Daten gesetzt werden. Für Reports könnten insbesondere Modelle wie Share of Voice oder tiefergehende Brand Image Analysen interessant sein. " },
    { level: 2, title: "Social Media Monitoring und Realtime Engagement Support", text: "Hierbei geht es um den Ausbau des Echtzeit-Supports bei Social Media und Customer Engagement Management. Dabei folgt dem Mentions-Tracking ein regelbasierter Verarbeitungsprozess, mit dem die Beantwortung prozessual ausgesteuert wird. Bei diesem Reifegrad geht es vor allem um Echtzeit-Daten, ihre Erfassung und Auswertung sowie prozessuale Verarbeitung. Aus Reporting-Sicht sind dabei natürlich die prozessualen Veränderungen interessant, sprich Change KPIs, wie sich der Share of Voice inhaltlich und quantitativ über die Zeit verändert. Zudem ordnet man dieser Reifestufe tiefergehende Brand Image Analysen zu, bei denen entlang der Auswertung des inhaltlichen Kontextes von Marken-Mentions das Markenbild auf Kunden bzw. Interessenten ermittelt wird. Verbesserungsvorschlag: In Zukunft sollte man sich tiefgehend mit Customer Insights Analytics und Customer Centric Marketing Support beschäftigen. Dabei geht es nicht mehr um simple Datenaggregationen oder Kennwert-Analysen, sondern um Meinung- und Verhaltensstrukturen hinter Kommentaren in Social Media. Hierfür braucht man in der Regel mehrere Tools, da die Modellierung der Datenanalyse und die Interpretation nur bedingt automatisiert werden können.  " },
    { level: 3, title: "Customer Insights Analytics und Customer Centric Marketing Support", text: "Neben Datenaggregationen und einfachen Kennwert-Analysen beinhaltet die Reifegradstufe 3, die Erkenntnisgewinnung von Meinungs- und Verhaltensstrukturen hinter den Meinungsäußerungen. Hierbei geht es um eine tiefergehende analytische Aufbereitung der Daten. Für diese Aufbereitung braucht es in der Regel mehr als ein Tool, da aufgrund der Modellierung der Datenanalyse und der Interpretation der Datenergebnisse, was immer ein Zusammenspiel zwischen Mensch und Maschine ist, nur in Teilen automatisiert werden kann. Die Automatisierung bedarf aber bereits einer Intelligenz zur Mustererkennung. Die Interpretation der Mustererkennung braucht aber auch noch eine menschliche Komponente. Verbesserungsvorschlag: Um den derzeitigen Social-Media-Analytics Technologiestand weiter auszuweiten, müsste dieser um Techniken erweitert werden, welche Aussagen über künftige Entwicklungen erstellen können. Konkret geht es darum, aus analysierten Daten Entwicklungen und Trends hervorzusagen. Hierfür sind KI-Methoden und reichlich bzw. ausreichend Daten von Nöten. Verbesserungsvorschlag: Sie haben bereits den höchsten Reifegrad erreicht." },
    { level: 4, title: "Text Mining / Analytics und Customer Behavior Prediction Support ", text: "Bei der obersten Reifestufe geht es dann um die Vorhersage von Trends und Entwicklung auf Basis der analysierten Daten. Hierzu werden KI-Möglichkeiten genutzt und ausreichend Daten zur Verfügung gestellt. " },
  ];
  skillLevelOrganisation?: Reifegrad;
  reifegradeOrganisation: Reifegrad[] = [
    { level: 0, title: "Nicht-Existent", text: "Es sind keine oder noch keine organisatorischen Handlungen geplant oder vorhanden. Verbesserungsvorschlag: Der erste Schritt sollte der Aufbau einer Organisation sein. Das Team sollte aus Mitgliedern bestehen, welche die nötige Kompetenz besitzen und diese an andere Kollegen weitertragen. Entscheidungen müssen zunächst nicht langfristig, sondern können auch nur reaktiv auf eine Situation erfolgen.  " },
    { level: 1, title: "Macht und Dominanz", text: "Die Führung der Organisation erfolgt strikt autoritär. Die Geschäftsleitung delegiert Aufgaben an die Mitarbeiter. Entscheidungen erfolgen von ganz oben und werden streng kontrolliert. Planung basiert nicht auf langfristigen Entscheidungen, sondern erfolgt als Reaktion auf bestimmte Situationen kurzfristig. Die in einer Organisation vorhandenen Fähigkeiten hängen von einzelnen individuellen Personen ab und nicht vom gesamten Team. Verbesserungsvorschlag: Man sollte sich von der dominanten und autoritären Führung lösen und eine hierarchische Struktur mit über- und untergeordneten Stellen aufbauen. Standards sollten fortan dokumentiert und Prozesse reproduzierbar gemacht werden. " },
    { level: 2, title: "Hierarchie und Struktur", text: "In der Organisation herrscht ein allgemeines Ordnungsprinzip, welches Überordnung und Unterordnung von Stellen sowie formalisierte Rollen innerhalb einer hierarchischen Struktur beinhaltet. Standards werden dokumentiert und geben Stabilität innerhalb der Organisation, indem Prozesse wiederholbar gemacht werden. Verbesserungsvorschlag: Es sollte sich als Ziel genommen werden, Innovationen voranzutreiben und innerhalb der Organisation zu verankern. Die Leistungsanforderungen der Mitarbeiter sollten deshalb hoch angesiedelt und zudem auch sichergestellt werden. Wissen muss auf Grund dessen für alle Teammitglieder transparent gemacht werden. Prozesse sollten des Weiteren für spätere Auswertungen mittels Kennzahlen gemessen werden. " },
    { level: 3, title: "Leistungsorientierung und Innovation", text: "In diesem Reifegrad ist es das Ziel, Innovationen voranzutreiben, um diese innerhalb der kompletten Organisation weiterzutragen. Aufgrund dieser Anforderungen ist eine hohe Leistungsanforderung der Mitarbeiter essenziell. Das wird erreicht, indem Wissen bzw. Erfahrungen stetig weiter ausgebaut und dokumentiert werden. Dazu zählen auch messbare Kennzahlen innerhalb der zu betrachteten Prozesse. Verbesserungsvorschlag: Es sollte innerhalb der Organisation das kulturelle Wertemuster des Unternehmens integriert werden. Die Mitarbeitermotivation ist nicht nur konstant auf einem hohen Niveau zu halten, sondern sollte stetig verbessert bzw. hoher angesiedelt werden.  Die Organisation sollte sich an Best Practices aus anderen Unternehmen orientieren. " },
    { level: 4, title: "Werteorientierung und Motivation", text: "Das Ziel ist es eine Unternehmenskultur, in der kulturelle Wertemuster innerhalb der kompletten Organisation verankert werden, zu entwickeln. Fundamental ist dafür die Mitarbeitermotivation stetig zu verbessern oder durchgehend auf einem hohen Niveau zu halten. Das bedeutet eine Orientierung der Organisation an Best Practices aus Benchmarking mit anderen Organisationen. Verbesserungsvorschlag: Die Organisation sollte in selbstständige Teams gegliedert werden und dabei trotzdem von der kollektiven Intelligenz profitieren. Dafür sollte das komplette Wissen für jeden sichtbar und nutzbar gemacht werden. Die Eigeninitiative der Organisation ist diesbezüglich essenziell und sicherzustellen. " },
    { level: 5, title: "Ganzheitlichkeit und Methodenkompetenz", text: "Die Organisation besteht aus mehreren selbst führenden Teams ohne konkurrierende Ambitionen. Wichtig ist bei diesem Reifegrad vor allem die Nutzung der kollektiven Intelligenz. Dies wird erreicht, indem das Wissen für die komplette Organisation transparent und nutzbar gemacht wird. Fundamental ist dafür die Eigeninitiative der Organisation einen kontinuierlichen Lern- und Verbesserungsprozess zu betreiben. Verbesserungsvorschlag: Sie haben bereits den höchsten Reifegrad erreicht." }
  ];

  skillLevelHard: boolean = false; // easy = false, hard = true

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
      this.skillLevelHard = true; 
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
    if (this.skillLevelHard == false) {
      // easy questions
      if (points < 25) {
        return this.reifegradeProzesse[0];
      } else if (points < 54) {
        return this.reifegradeProzesse[1];
      } else if (points < 108) {
        return this.reifegradeProzesse[2];
      } else if (points < 162) {
        return this.reifegradeProzesse[3];
      } else if (points < 216) {
        return this.reifegradeProzesse[4];
      } else {
        return this.reifegradeProzesse[5];
      }
    } else {
      // hard questions
      if (points < 40) {
        return this.reifegradeProzesse[0];
      } else if (points < 80) {
        return this.reifegradeProzesse[1];
      } else if (points < 161) {
        return this.reifegradeProzesse[2];
      } else if (points < 241) {
        return this.reifegradeProzesse[3];
      } else if (points < 322) {
        return this.reifegradeProzesse[4];
      } else {
        return this.reifegradeProzesse[5];
      }
    }
    
  }

  calcSkillLevelTechnologie(): Reifegrad {
    let points = this.calcPoints("Technologie");
    if (this.skillLevelHard == false) {
      // easy questions
      if (points < 5) {
        return this.reifegradeTechnologie[0];
      } else if (points < 10) {
        return this.reifegradeTechnologie[1];
      } else if (points < 20) {
        return this.reifegradeTechnologie[2];
      } else if (points < 30) {
        return this.reifegradeTechnologie[3];
      } else {
        return this.reifegradeTechnologie[4];
      }
    } else {
      // hard questions
      if (points < 7) {
        return this.reifegradeTechnologie[0];
      } else if (points < 14) {
        return this.reifegradeTechnologie[1];
      } else if (points < 29) {
        return this.reifegradeTechnologie[2];
      } else if (points < 43) {
        return this.reifegradeTechnologie[3];
      } else {
        return this.reifegradeTechnologie[4];
      }
    }
    
  }

  calcSkillLevelOrganisation(): Reifegrad {
    let points = this.calcPoints("Organisation");
    if (this.skillLevelHard == false) {
      // easy questions
      if (points < 8) {
        return this.reifegradeOrganisation[0];
      } else if (points < 16) {
        return this.reifegradeOrganisation[1];
      } else if (points < 33) {
        return this.reifegradeOrganisation[2];
      } else if (points < 49) {
        return this.reifegradeOrganisation[3];
      } else if (points < 66) {
        return this.reifegradeOrganisation[4];
      } else {
        return this.reifegradeOrganisation[5];
      }
    } else {
      // hard questions
      if (points < 14) {
        return this.reifegradeOrganisation[0];
      } else if (points < 29) {
        return this.reifegradeOrganisation[1];
      } else if (points < 59) {
        return this.reifegradeOrganisation[2];
      } else if (points < 88) {
        return this.reifegradeOrganisation[3];
      } else if (points < 118) {
        return this.reifegradeOrganisation[4];
      } else {
        return this.reifegradeOrganisation[5];
      }
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
