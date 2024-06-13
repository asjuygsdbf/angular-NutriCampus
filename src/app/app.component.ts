import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {HomeComponent} from "./home/home.component";
import {EjerciciosComponent} from "./ejercicios/ejercicios.component";
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {FormsComponent} from "./forms/forms.component";
import {ContactComponent } from './contact/contact.component';
import {BotonesComponent} from "./botones/botones.component";
import {PasoRutinaComponent} from "./paso-rutina/paso-rutina.component";
import {ElegircomidasComponent} from "./elegircomidas/elegircomidas.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent,
    EjerciciosComponent, CommonModule, LoginComponent, SignupComponent,
    FormsComponent, ContactComponent, BotonesComponent, PasoRutinaComponent, ElegircomidasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Nutricampus'
  mostrar = true

  mostrarHeaderAndFooter(){
    if(document.URL == 'http://localhost:4200/login' || document.URL == 'http://localhost:4200/registro' ){
      this.mostrar = false
    }
  }

  ngOnInit(): void {
    this.mostrarHeaderAndFooter()
  }

}
