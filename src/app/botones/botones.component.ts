import {Component, OnInit, inject} from '@angular/core';
import {BuscarUsuario, ObtenerUsuario, TokenResponse, Usuario} from "../../api/user-api/interfaces";
import {UserApiService} from "../../api/user-api/user-api.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-botones',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './botones.component.html',
  styleUrl: './botones.component.scss'
})
export class BotonesComponent implements OnInit{

  obtenerUsuario: ObtenerUsuario = {
    token: "",
    relleno: ""
  }

  user: TokenResponse = {
    nombreUsuario: ''
  }

  buscarUsuario: BuscarUsuario = {
    nombreUsuario: ''
  }

  usuario?: Usuario

  // Para sacar los datos del usuario logeado
  userApiService = inject(UserApiService)

  async ngOnInit(){
    await this.loadData()
    await this.obtenerNombreCompleto()
  }

  private async loadData(){
    this.obtenerUsuario.token = this.userApiService.userToken;
    this.user = await this.userApiService.obtenerUsuarioViaToken(this.obtenerUsuario);
    this.buscarUsuario.nombreUsuario = this.user.nombreUsuario
  }

  private async obtenerNombreCompleto(){
    this.usuario = await this.userApiService.buscarPorUsuario(this.buscarUsuario)
  }
}
