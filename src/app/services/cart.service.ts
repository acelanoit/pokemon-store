import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shopping_cart';

  // Define a BehaviorSubject to hold the current state of the shopping cart
  cart = new BehaviorSubject<Cart>({ items: [] });

  // Constructor that takes MatSnackBar as a parameter for displaying notifications:
  // private is an access modifier, indicating that _snackBar is a private property of the class.
  // It means that this property is not directly accessible from outside the class.
  // _snackBar: This is the name of the property. The underscore at the beginning of the name
  // is a common convention to indicate that it is a private variable.
  // MatSnackBar: This is the type of the property. It indicates that _snackBar
  // is expected to be an instance of the MatSnackBar class.
  // By including this parameter in the constructor, you are telling Angular's dependency injection system that this class
  // requires an instance of the MatSnackBar service. Angular will then automatically
  // provide an instance of the MatSnackBar service when an object of this class is created.
  // The purpose of injecting the MatSnackBar service in the constructor is to make it available within the class.
  // This allows the class to use methods and features provided by the MatSnackBar service.
  // Typically, the MatSnackBar service is used for displaying snack bar notifications in the user interface.
  // For example, within methods of this class, you can use _snackBar.open(...) to display a snack bar notification.
  // This injection mechanism helps in achieving better modularity, testability, and maintainability in your Angular application.
  constructor(private _snackBar: MatSnackBar) {

    // Retrieve cart data from localStorage on service initialization
    const storedCart = localStorage.getItem(this.cartKey);
    if (storedCart) {
      this.cart.next(JSON.parse(storedCart));
    }
  }

  // Method to add an item to the shopping cart
  addToCart(item: CartItem): void {
    // Create a copy of the current items in the cart
    const items = [...this.cart.value.items];
    // Making a copy of the cart before modifying it is a common practice in state management to ensure immutability.
    // Immutability means that the original state is not changed directly; instead, a new state is created with the desired modifications.

    // Check if the item is already in the cart
    const itemInCart = items.find(_item => _item.id === item.id);

    // If the item is in the cart, increment its quantity; otherwise, add it to the cart
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    // Update the shopping cart state with the new items using the The next method of BehaviorSubject.
    // This triggers the emission of the updated state to all subscribers.
    this.cart.next({ items }); // Equivalent to this.cart.next({ items: items });

    // Display a notification indicating that an item has been added to the cart
    this._snackBar.open('1 item added to cart!', 'Ok', { duration: 3000 });

    // Update localStorage with the new cart data
    localStorage.setItem(this.cartKey, JSON.stringify({ items }));
  }

  removeQuantity(item: CartItem): void {
    const items = [...this.cart.value.items];
    const filteredItems = items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
      }
      return _item;
    });
    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart!', 'Ok', { duration: 3000 });
    localStorage.setItem(this.cartKey, JSON.stringify({ items: filteredItems }));
  }

  getTotal(items: CartItem[]): number {
    return items.map(item => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart cleared!', 'Ok', { duration: 3000 });

    // Clear localStorage when the cart is cleared
    localStorage.removeItem(this.cartKey);
  }

  removeFromCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const filteredItems = items.filter(_item => _item.id !== item.id);
    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart!', 'Ok', { duration: 3000 });
    localStorage.setItem(this.cartKey, JSON.stringify({ items: filteredItems }));
  }
}
