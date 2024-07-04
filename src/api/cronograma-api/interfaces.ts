export interface Cronograma{
  id: number;
  allDay: boolean;
  start: Date;
  end: Date;
  title: string;
  url: string
  backgroundColor: string
  extendedProps: ExtendedProps;
}

export interface ExtendedProps{
  name: string;
}

export interface CrearCronograma{
  todoDia: boolean
  fechaInicio: string
  fechaFin: string
  nombreEvento: string
  nombre: string
  url: string
  nombreUsuario: string
  colorFondo: string
}
