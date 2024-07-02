import {Component, OnInit, inject} from '@angular/core';
import {ObtenerUsuarioToken, TokenResponse, Usuario} from "../../api/user-api/interfaces";
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

  user: TokenResponse = {
    nombreUsuario: ''
  }

  request: ObtenerUsuarioToken = {
    token: ''
  }

  usuario?: Usuario

  // Para sacar los datos del usuario logeado
  userApiService = inject(UserApiService)

  async ngOnInit(){
    await this.loadData()
    await this.obtenerNombreCompleto()
  }

  private async loadData(){
    this.request.token = this.userApiService.userToken;
    this.user = await this.userApiService.obtenerUsuarioViaToken(this.request);
  }

  private async obtenerNombreCompleto(){
    this.usuario = await this.userApiService.buscarPorUsuario(this.user.nombreUsuario);
  }
}
