import { Routes } from '@angular/router';
import {EjerciciosComponent} from "./ejercicios/ejercicios.component";
import {HomeComponent} from "./home/home.component";
import {DietComponent} from "./diet/diet.component";
import {AboutComponent} from "./about/about.component";
import { LoginComponent } from './auth/login/login.component';
import {SignupComponent} from "./auth/signup/signup.component";
import {FormsComponent} from "./forms/forms.component";
import {ContactComponent} from "./contact/contact.component";
import {BotonesComponent} from "./botones/botones.component";
import {PasoRutinaComponent} from "./paso-rutina/paso-rutina.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'diet', component: DietComponent},
  {path: 'ejercicios', component: EjerciciosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: SignupComponent},
  {path: 'paso1', component: FormsComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'principal', component: BotonesComponent},
  {path: 'mirutina', component: PasoRutinaComponent}

];
