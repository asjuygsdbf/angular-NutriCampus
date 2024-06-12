import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

let previosTitle = document.title;

window.addEventListener('blur', () =>{
  previosTitle = document.title
  document.title = 'No te vayas sonso'
})

window.addEventListener('focus', () =>{
  document.title = previosTitle
})
