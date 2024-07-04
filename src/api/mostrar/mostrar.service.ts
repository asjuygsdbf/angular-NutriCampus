import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})

export class MostrarService {

  mostrarHeaderAndFooter(mostrar: boolean){
    console.log(document.URL)
    return !(document.URL == environment.urlFront + '/login' || document.URL == environment.urlFront + '/registro');
  }
}
