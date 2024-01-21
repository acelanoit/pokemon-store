import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart.model';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };
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
    this._cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return this._cartService.getTotal(items);
  }

  onClearCart(): void {
    this._cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this._cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this._cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    if (item.quantity === 1) this._cartService.removeFromCart(item);
    else this._cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this._cartService.checkout();
  }
}
