import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Comida} from "./interfaces";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ComidaApiService {

  httpClient = inject(HttpClient)

  listarComidas(){
    return lastValueFrom(this.httpClient.get<Comida[]>(environment.urlMicroservicioDieta+'/comida/listar/'));
  }

  buscarComida(comida: string){
    return lastValueFrom(this.httpClient.get<Comida>(environment.urlMicroservicioDieta+'/comida/buscar/'+comida));
  }
}
