import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartItem } from '../models/cart.model';

// NoopAnimationsModule is a module provided by Angular that disables animations for testing.
// When we add an item to the cart, if that action triggers a change in the Material Badge
// (like showing or updating the badge), it could be triggering an animation.
// This module allows Angular to handle animation events without actually performing any animations.
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {

    // The TestBed.configureTestingModule method is used to configure and create an Angular testing module.
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule]
    });

    // TestBed.inject is an Angular testing utility for dependency injection. It retrieves an instance of a service from the testing module.
    // The reason for using TestBed.inject instead of just creating an instance of CartService directly (service = new CartService();)
    // is that Angular's dependency injection system is used to manage the instances of services. By using TestBed.inject,
    // you ensure that the service is provided with any dependencies it needs,
    // and it follows the same mechanism as it would in a real Angular application.
    service = TestBed.inject(CartService);

    // Clear the cart before each test
    service.clearCart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    const item: CartItem = {
      image: 'https://example.com/image.jpg',
      name: 'Test Pokemon',
      price: 13,
      quantity: 1,
      id: 24
    };
    service.addToCart(item);
    service.cart.subscribe(cart => {
      expect(cart.items).toContain(item);
    });
  });

  it('should increment the quantity if the item is already in the cart', () => {
    const item: CartItem = {
      image: 'https://example.com/image.jpg',
      name: 'Test Pokemon',
      price: 13,
      quantity: 1,
      id: 31
    };
    service.addToCart(item);
    service.addToCart(item);
    service.cart.subscribe(cart => {
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(2);
    });
  });

  it('should reduce the quantity of an item', () => {
    const item: CartItem = {
      image: 'https://example.com/image.jpg',
      name: 'Test Pokemon',
      price: 13,
      quantity: 3,
      id: 53
    };
    service.addToCart(item);
    service.removeQuantity(item);
    service.cart.subscribe(cart => {
      expect(cart.items[0].quantity).toBe(2);
    });
  });

  it('should remove an item from the cart', () => {
    const item: CartItem = {
      image: 'https://example.com/image.jpg',
      name: 'Test Pokemon',
      price: 13,
      quantity: 1,
      id: 42
    };
    service.addToCart(item);
    service.removeFromCart(item);
    service.cart.subscribe(cart => {
      expect(cart.items).not.toContain(item);
    });
  });

  it('should calculate the total price of the items in the cart', () => {
    const items: CartItem[] = [
      {
        image: 'https://example.com/image.jpg',
        name: 'Test Pokemon',
        price: 13,
        quantity: 2,
        id: 42
      },
      {
        image: 'https://example.com/image.jpg',
        name: 'Test Pokemon 2',
        price: 10,
        quantity: 1,
        id: 43
      }
    ];
    service.cart.next({ items });
    service.cart.subscribe(cart => {
      expect(service.getTotal(cart.items)).toBe(36);
    });
  });
});
