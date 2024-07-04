import {Component, inject, OnInit} from '@angular/core';
import {CrearCronograma} from "../../api/cronograma-api/interfaces";
import {ObtenerUsuarioToken, TokenResponse} from "../../api/user-api/interfaces";
import {UserApiService} from "../../api/user-api/user-api.service";
import {CronogramaApiService} from "../../api/cronograma-api/cronograma-api.service";
import {Router} from "@angular/router";
import {Ejercicio} from "../../api/ejercicio-api/interfaces";
import {EjercicioApiService} from "../../api/ejercicio-api/ejercicio-api.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-elegirejercicios',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './elegirejercicios.component.html',
  styleUrl: './elegirejercicios.component.scss'
})
export class ElegirejerciciosComponent implements OnInit{
  ejercicio: Ejercicio = {
    nombre: '',
    descripcion: '',
    tiempoEjercicio: '',
    caloriasQuemadas: 0,
    velocidadEjercicio: ''
  }

  evento: CrearCronograma = {
    todoDia: false,
    fechaInicio: '',
    fechaFin: '',
    nombreEvento: '',
    nombre: '',
    url: '',
    nombreUsuario: '',
    colorFondo: '#F85205'
  }

  nombreEjercicio: string = ''

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
  ejercicioApiService = inject(EjercicioApiService)
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

  async buscarEjercicio(){
    if(this.nombreEjercicio != ''){
      this.ejercicio = await this.ejercicioApiService.buscarEjercicio(this.nombreEjercicio)
    }else{
      alert("Input vacio")
    }
  }

  agregarEjercicio(){
    this.evento.nombre = this.ejercicio.nombre
    this.evento.nombreUsuario = this.user.nombreUsuario
    console.log(this.evento)
    this.cronogramaApiService.crearCronograma(this.evento)
    this.router.navigateByUrl('/calendario').then(() => {
      window.location.reload();
    });
  }
}
