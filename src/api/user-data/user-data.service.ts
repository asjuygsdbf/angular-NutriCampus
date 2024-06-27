import { Injectable } from '@angular/core';
import {CrearUsuario} from "../user-api/interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private usuarioSource = new BehaviorSubject<CrearUsuario | null>(null);
  currentUsuario = this.usuarioSource.asObservable();

  updateUsuario(usuario: CrearUsuario) {
    this.usuarioSource.next(usuario);
  }
}
