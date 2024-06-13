import {Ingrediente} from "../ingrediente-api/interfaces";

export interface Comida{
  nombre: string
  descripcion: string
  tipo: string
  ingrediente: Ingrediente
}
