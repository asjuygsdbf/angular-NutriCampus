import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {HomeComponent} from "./home/home.component";
import {EjerciciosComponent} from "./ejercicios/ejercicios.component";
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {FormsComponent} from "./forms/forms.component";
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent,
    EjerciciosComponent, CommonModule, LoginComponent, SignupComponent, FormsComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-NutriCampus';
}
