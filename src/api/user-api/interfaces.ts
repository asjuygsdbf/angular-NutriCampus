import {Dieta} from "../dieta-api/interfaces";

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
  cronogramaSemanal: CronogramaSemanal[]
}

export interface CronogramaSemanal{
  fechaInicio: Date;
  fechaFin: Date;
  dia: string;
  completado: boolean;
  rutinas: Rutina[];
  dietas: Dieta[];
}

export interface Rutina{
  repeticiones: number
  tiempo: string
  ejercicios: EjercicioHoraDia[]
}

export interface EjercicioHoraDia{
  ejercicio: Ejercicio
  fecha: HoraDia
}

export interface Ejercicio{
  nombre: string
  descripcion: string
  tiempoEjercicio: string
  caloriasQuemadas: number
  velocidadEjercicio: string
}

export interface HoraDia{
  fecha: Date
  hora: string
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
