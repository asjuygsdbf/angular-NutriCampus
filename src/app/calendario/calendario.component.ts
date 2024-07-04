import {Component, inject, OnInit} from '@angular/core';
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions, EventDropArg, EventSourceInput} from "@fullcalendar/core";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {EventReceiveArg} from '@fullcalendar/interaction';
import listWeek from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import {UserApiService} from "../../api/user-api/user-api.service";
import {Router} from "@angular/router";
import {Cronograma, EditarCronograma} from "../../api/cronograma-api/interfaces";
import {ObtenerUsuarioToken, TokenResponse} from "../../api/user-api/interfaces";
import {CronogramaApiService} from "../../api/cronograma-api/cronograma-api.service";
import Tooltip from "tooltip.js";
import {EjercicioApiService} from "../../api/ejercicio-api/ejercicio-api.service";
import {ComidaApiService} from "../../api/comida-api/comida-api.service";
import {Ejercicio} from "../../api/ejercicio-api/interfaces";
import {Comida} from "../../api/comida-api/interfaces";

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit{

  events: Cronograma[] = []

  userApiService = inject(UserApiService);
  ejercicioApiService = inject(EjercicioApiService);
  comidaApiService = inject(ComidaApiService);
  router = inject(Router);

  ejercicio?: Ejercicio
  comida?: Comida
  description: string = ''

  user: TokenResponse = {
    nombreUsuario: ''
  }

  request: ObtenerUsuarioToken = {
    token: ""
  }

  editarEvento: EditarCronograma = {
    fechaInicio: '',
    fechaFin: '',
    nombreEvento: '',
    nombre: '',
    url: '',
    colorFondo: ''
  }

  cronogramaApiService = inject(CronogramaApiService)

  //Identificador de si esta logeado el usuario
  userLoginOn : boolean = false;

  calendarOptions: CalendarOptions = {
    headerToolbar : {
      start: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      center: 'title',
      end: 'today prevYear,prev,next,nextYear'
    },
    footerToolbar : {
      center : 'agregarComida,agregarEjercicio'
    },
    customButtons : {
      agregarComida: {
        text: 'Añadir Comida',
        click: this.agregarComida.bind(this)
      },
      agregarEjercicio: {
        text: 'Añadir Ejercicio',
        click: this.agregarEjercicio.bind(this)
      }
    },
    buttonText : {
      today: 'Hoy',
      dayGridMonth: 'Mensual',
      timeGridWeek: 'Semanal',
      timeGridDay: 'Diario',
      listWeek: "Lista"
    },
    navLinks: true,
    nowIndicator: true,
    handleWindowResize: true,
    stickyHeaderDates: true,
    timeZone: 'UTC-5',
    selectable: true,
    initialView: 'dayGridMonth',
    plugins: [timeGridPlugin, interactionPlugin, listWeek, dayGridPlugin],
    events: [],
    droppable: true,
    editable: true,
    eventReceive: this.handleEventChange.bind(this),
    eventDrop: this.handleEventChange.bind(this),
    eventDidMount: this.handleEventDidMount.bind(this)
  };

  async ngOnInit() {
    this.userApiService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
    if (this.userLoginOn) {
      this.request.token = this.userApiService.userToken;
      this.user = await this.userApiService.obtenerUsuarioViaToken(this.request);
    }
    await this.loadData();
  }

  private async loadData(){
    this.events = await this.userApiService.listarCronogramasPorUsuario(this.user.nombreUsuario);
    this.calendarOptions.events = this.events as EventSourceInput;
  }

  agregarComida(){
    this.router.navigateByUrl('/elegircomidas')
  }

  agregarEjercicio(){
    this.router.navigateByUrl('/elegirejercicios')
  }

  async handleEventChange(info: EventReceiveArg | EventDropArg) {
    this.editarEvento.fechaInicio = info.event.startStr
    this.editarEvento.fechaFin = info.event.endStr
    this.editarEvento.nombreEvento = info.event.title
    this.editarEvento.nombre = info.event.extendedProps['name']
    this.editarEvento.url = info.event.url
    this.editarEvento.colorFondo = info.event.backgroundColor

    await this.cronogramaApiService.editarCronograma(this.editarEvento, Number(info.event.id));
  }

  async handleEventDidMount(info: any) {
    if(info.event.backgroundColor == '#F85205'){
      this.ejercicio = await this.ejercicioApiService.buscarEjercicio(info.event.extendedProps.name);
      this.description = this.ejercicio.descripcion;
    }
    if(info.event.backgroundColor == '#16C8F4'){
      this.comida = await this.comidaApiService.buscarComida(info.event.extendedProps.name);
      this.description = this.comida.descripcion;
    }

    const tooltip = new Tooltip(info.el, {
      title: this.description,
      placement: 'bottom-start',
      trigger: 'hover',
      container: 'body'
    });
  }

}
