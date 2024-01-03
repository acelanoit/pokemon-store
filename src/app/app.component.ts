import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// You can use the ngOnInit method in an Angular component without explicitly implementing the OnInit interface.
// The OnInit interface is not mandatory for using the ngOnInit lifecycle hook.
// Implementing the OnInit interface is more of a best practice,
// and it ensures that you correctly implement the ngOnInit method if you intend to use it
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {

    // The subscribe method of the BehaviorSubject class allows you to listen for values emitted by an observable and react to those values
    this._cartService.cart.subscribe(_cart => this.cart = _cart);
  }

}
