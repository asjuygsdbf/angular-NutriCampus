import {Component, inject, OnInit} from '@angular/core';
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions, EventSourceInput} from "@fullcalendar/core";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listWeek from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import {UserApiService} from "../../api/user-api/user-api.service";
import {Router} from "@angular/router";
import {Cronograma} from "../../api/cronograma-api/interfaces";
import {ObtenerUsuarioToken, TokenResponse} from "../../api/user-api/interfaces";

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
  router = inject(Router);

  user: TokenResponse = {
    nombreUsuario: ''
  }

  request: ObtenerUsuarioToken = {
    token: ""
  }

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
    events: []
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
}
