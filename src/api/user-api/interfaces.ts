export interface Usuario{
  nombreUsuario: string,
  nombreCompleto: string,
  edad: number
  peso: number
  talla: number
  genero: string
  nivelActividad: string
  meta: number
  velocidadEjercicio: string
}

export interface CrearUsuario{
  nombreUsuario: string
  correo: string
  contra: string
  edad: number
  peso: number
  talla: number
  genero: string
  nivelActividad: string
  meta: number
  velocidadEjercicio: string
}

export interface AutenticacionUsuario{
  nombreUsuario: string
  contra: string
}

export interface ObtenerUsuario{
  token: string,
  relleno: string
}

export interface TokenResponse{
  nombreUsuario: string
}
