import { Component } from '@angular/core';

@Component({
  selector: 'app-elegircomidas',
  standalone: true,
  imports: [],
  templateUrl: './elegircomidas.component.html',
  styleUrl: './elegircomidas.component.scss'
})
export class ElegircomidasComponent {

  products = [
    { id: 'id-1', name: 'Samsung Galaxy Note 4', quantity: 1, price: 2890.66 },
    { id: 'id-2', name: 'Logitech Keyboard', quantity: 1, price: 120.50 }
  ];
  total = 0;
  selected: string[] = [];
  product: string | undefined;
}


