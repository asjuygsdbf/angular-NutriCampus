import {Cronograma} from "../cronograma-api/interfaces";

export interface Usuario{
  nombreUsuario: string
  nombreCompleto: string
  foto: string
  edad: number
  peso: number
  talla: number
  genero: string
  nivelActividad: string
  historialSalud: string
  meta: string
  preferenciasDieteticas: string
  alimentos: string
  cronogramaSemanal: Cronograma[]
}

export interface CrearUsuario{
  nombreUsuario: string
  nombreCompleto: string
  correo: string
  contra: string
  foto: string
  edad: number
  peso: number
  talla: number
  genero: string
  nivelActividad: string
  historialSalud: string
  meta: string
  preferenciasDieteticas: string
  alimentos: string
}

export interface AutenticacionUsuario{
  nombreUsuario: string
  contra: string
}

export interface TokenResponse{
  nombreUsuario: string
}

export interface ObtenerUsuarioToken{
  token: string
}
