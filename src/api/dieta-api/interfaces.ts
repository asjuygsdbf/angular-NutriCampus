import {Comida} from "../comida-api/interfaces";
import {HoraDia} from "../user-api/interfaces";

export interface Dieta{
  raciones: number
  comidas: ComidaHoraDia[]
}

export interface ComidaHoraDia{
  comida: Comida
  fecha: HoraDia
}
