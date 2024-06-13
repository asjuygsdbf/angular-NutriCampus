import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {UserApiService} from "../../api/user-api/user-api.service";
import {ObtenerUsuario, TokenResponse} from "../../api/user-api/interfaces";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  obtenerUsuario: ObtenerUsuario = {
    token: "",
    relleno: ""
  }

  user: TokenResponse = {
    nombreUsuario: ''
  }

  // Para sacar los datos del usuario logeado
  userApiService = inject(UserApiService)

  // Para la navegabilidad
  router = inject(Router)

  //Identificador de si esta logeado el usuario
  userLoginOn : boolean = false;

  async ngOnInit() {
    this.userApiService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
    console.log("El userLoginOn es " + this.userLoginOn);
    if (this.userLoginOn) {
      this.obtenerUsuario.token = this.userApiService.userToken;
      console.log(this.obtenerUsuario);
      this.user = await this.userApiService.obtenerUsuarioViaToken(this.obtenerUsuario);
      console.log('Usuario obtenido:', this.user);
    }
  }

  cerrarSesion(){
    if(this.user.nombreUsuario != ''){
      this.userApiService.cerrarSesion();
      window.location.reload();
    }else{
      this.router.navigateByUrl('/login')
    }

  }
}
