import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrearCronograma, Cronograma, EditarCronograma} from "./interfaces";
import {lastValueFrom} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CronogramaApiService {

  httpClient = inject(HttpClient)

  crearCronograma(cronograma: CrearCronograma){
    return lastValueFrom(this.httpClient.post<Cronograma>(environment.urlBack+'/cronograma/crear/', cronograma));
  }

  editarCronograma(cronograma: EditarCronograma, id: number){
    return lastValueFrom(this.httpClient.put<Cronograma>(environment.urlBack+'/cronograma/editar/'+id, cronograma))
  }
}
