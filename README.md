# self-assessment-tool-social-media-analytics
IT Projekt: Self-Assessment-Tool für Social Media Analytics 


### Was man braucht:
- npm: Windows Intallation: https://phoenixnap.com/kb/install-node-js-npm-on-windows
- Angular: npm install -g @angular/cli

### Setup:
- Intstall Dependencies: npm install
- Run App: ng serve 
- Then App is available on: http://localhost:4200/greetings

### Struktur:
- 3 Seiten: greetings, questions und results - jeweils eigene Komponente, jede Komponente hat die Logik in .ts und die Darstellung in .html
- Fragen definiert in src/app/app.component.ts
- Reifegrade definiert in src/app/results/results.component.ts
