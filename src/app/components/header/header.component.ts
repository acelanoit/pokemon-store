import { Component, Input } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  // The @Input decorator is applied to the get accessor of the cart property.
  // This decorator marks the property as an input property, allowing it to receive
  // values from a parent component through property binding
  @Input()

  // The getter defines the public property named cart. It returns the value of the private property _cart.
  // This is the property that can be bound to from a parent component's template.
  get cart(): Cart {
    return this._cart;
  }

  // The setter is part of the same property definition.
  // It is invoked when a new value is assigned to the cart property from the parent component.
  // It updates the private _cart property and performs additional logic, such as calculating itemsQuantity.

  // To clarify, the property name for external use is cart, and internally,
  // the data is stored in the private property _cart.
  // The underscore is a convention to signal that _cart is intended for internal use
  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map(item => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private _cartService: CartService) { }

  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items);
  }

  onClearCart(): void {
    this._cartService.clearCart();
  }
}
