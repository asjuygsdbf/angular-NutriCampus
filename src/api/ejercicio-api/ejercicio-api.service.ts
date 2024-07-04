import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {environment} from "../../environments/environment.development";
import {Ejercicio} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class EjercicioApiService {

  httpClient = inject(HttpClient)

  buscarEjercicio(nombreEjercicio: string){
    return lastValueFrom(this.httpClient.get<Ejercicio>(environment.urlMicroservicioRutina+'/ejercicio/buscar/'+nombreEjercicio))
  }
}
