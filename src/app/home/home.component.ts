import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
