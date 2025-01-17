import {Component, inject, OnInit} from '@angular/core';
import {Comida} from "../../api/comida-api/interfaces";
import {ComidaApiService} from "../../api/comida-api/comida-api.service";
import {FormsModule} from "@angular/forms";
import {CrearCronograma} from "../../api/cronograma-api/interfaces";
import {ObtenerUsuarioToken, TokenResponse} from "../../api/user-api/interfaces";
import {UserApiService} from "../../api/user-api/user-api.service";
import {CronogramaApiService} from "../../api/cronograma-api/cronograma-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-elegircomidas',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './elegircomidas.component.html',
  styleUrl: './elegircomidas.component.scss'
})
export class ElegircomidasComponent implements OnInit{

  comida: Comida = {
    nombre: '',
    tipo: '',
    descripcion: '',
    calorias: 0
  }

  evento: CrearCronograma = {
    todoDia: false,
    fechaInicio: '',
    fechaFin: '',
    nombreEvento: '',
    nombre: '',
    url: '',
    nombreUsuario: '',
    colorFondo: '#16C8F4'
  }

  nombreComida: string = ''

  user: TokenResponse = {
    nombreUsuario: ''
  }

  request: ObtenerUsuarioToken = {
    token: ""
  }

  // Para sacar los datos del usuario logeado
  userApiService = inject(UserApiService)

  //Identificador de si esta logeado el usuario
  userLoginOn : boolean = false;

  // Inyeccion del servicio Comida
  comidaApiService = inject(ComidaApiService)
  cronogramaApiService = inject(CronogramaApiService)
  router = inject(Router)

  async ngOnInit() {
    this.userApiService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
    if (this.userLoginOn) {
      this.request.token = this.userApiService.userToken;
      this.user = await this.userApiService.obtenerUsuarioViaToken(this.request);
    }
  }

  async buscarComida(){
    if(this.nombreComida != ''){
      this.comida = await this.comidaApiService.buscarComida(this.nombreComida)
    }else{
      alert("Input vacio")
    }
  }

  agregarComida(){
    this.evento.nombre = this.comida.nombre
    this.evento.nombreUsuario = this.user.nombreUsuario
    console.log(this.evento)
    this.cronogramaApiService.crearCronograma(this.evento)
    this.router.navigateByUrl('/calendario').then(() => {
      window.location.reload();
    });
  }
}
