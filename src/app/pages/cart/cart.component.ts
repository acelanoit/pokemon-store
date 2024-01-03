import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart.model';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
        name: 'Blastoise',
        price: 200,
        quantity: 1,
        id: 9
      },
      {
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
        name: 'Blastoise',
        price: 200,
        quantity: 3,
        id: 6
      }
    ]
  };
  dataSource: CartItem[] = [];
  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    console.log(this.dataSource);
  }

  getTotal(items: CartItem[]): number {
    return this._cartService.getTotal(items);
  }

}
