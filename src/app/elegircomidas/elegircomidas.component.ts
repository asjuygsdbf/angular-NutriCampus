import {Component, inject, OnInit} from '@angular/core';
import {Comida} from "../../api/comida-api/interfaces";
import {ComidaApiService} from "../../api/comida-api/comida-api.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-elegircomidas',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './elegircomidas.component.html',
  styleUrl: './elegircomidas.component.scss'
})
export class ElegircomidasComponent implements OnInit{

  // Variable donde se almacenara todas las comidas registradas
  comidas: Comida[] = []

  // Inyeccion del servicio Comida
  comidaApiService = inject(ComidaApiService)

  // Contador del total de calorias
  calorias = 0

  async ngOnInit(){
    await this.loadData()
  }

  private async loadData(){
    this.comidas = await this.comidaApiService.listarComidas()
  }
}
