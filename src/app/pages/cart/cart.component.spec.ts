import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { commonDeclarations, commonImports, commonProviders } from '../../test-setup';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {

    // Configure testing module
    await TestBed.configureTestingModule({
      imports: [...commonImports],
      declarations: [...commonDeclarations],
      providers: [...commonProviders]
    }).compileComponents();

    // Create component and fixture
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Inject CartService and clear cart before each test
    cartService = TestBed.inject(CartService);
    cartService.clearCart();
  });

  it('should create', () => {

    // Assert that the component is created successfully
    expect(component).toBeTruthy();
  });

  // This is an integration test that checks if the component and the service work together as expected.
  it('should handle increase button click and increase quantity', async () => {

    // This line is setting up a spy on the addToCart method of the cartService object.
    // A spy allows you to track calls to a function/method and optionally modify its behavior.
    // The callThrough() part means that the original implementation of addToCart will be invoked when the spy is called.
    // This is useful when you still want the actual method to be executed along with tracking its invocation.
    // If your real method doesn't return a value and you don't want to call through to the actual implementation,
    // you can use and.stub() as an alternative to and.callThrough(). Note that if you add the spy (with and.stub())
    // after the first click, the configuration will only affect subsequent calls to the method,so the first call will still be executed.
    const addToCartSpy = spyOn(cartService, 'addToCart').and.callThrough();

    // Prepare initial data
    const initialQuantity = 3;
    const item: CartItem = {
      image: 'image.jpg',
      name: 'Item 1',
      price: 100,
      quantity: initialQuantity,
      id: 5
    };

    // Add item to the cart
    cartService.addToCart(item);

    // In Angular testing, fixture.detectChanges() is a method used to trigger change detection in a component.
    // Change detection is a mechanism in Angular that determines if and how the UI should be updated
    // based on changes to the component's data and state.
    fixture.detectChanges();

    // Find the increase button in the DOM.
    // In Angular testing, the DebugElement is a wrapper around a DOM element that provides additional debugging information and Angular-specific features.
    // When you use fixture.debugElement.query(...), you are obtaining a DebugElement that represents the selected DOM element.
    // DebugElement is part of Angular's testing utilities, and it allows you to interact with the element in an Angular-aware way.
    // You can leverage these utilities to perform actions like triggering events (triggerEventHandler) or querying for associated Angular directives.
    // While you could interact directly with the native DOM element using fixture.nativeElement.querySelector(...),
    // using DebugElement provides a more Angular-friendly and test-oriented approach.

    // By.css is a method of the By class, which is used to select elements in the DOM using CSS selectors.
    const increaseButton: DebugElement = fixture.debugElement.query(By.css('[data-testid="increase"]'));

    // Check if the increase button is found
    if (increaseButton) {

      // Trigger click event on the increase button.
      // For a basic click event simulation, you don't need to provide any additional information about the event
      // (like where the mouse was clicked or other details). So, you can pass null as a placeholder for the event object.
      increaseButton.triggerEventHandler('click', null);

      // This line is using whenStable() to wait until all pending promises
      // (such as promises in asynchronous operations) are resolved. It ensures that the Angular testing environment
      // has stabilized before proceeding with further assertions or expectations. In this specific case,
      // it's waiting for any asynchronous tasks triggered by the click event to complete before moving on
      // to the next part of the test. This is important for asynchronous operations like updating
      // the component's state, making it easier to write reliable and stable tests.
      // When a user clicks a button, the actual event handling (i.e., the code inside the click event handler) is synchronous.
      // The method called by the click event (onAddQuantity) calls addToCart (a method of the cart service) which triggers this.cart.next({ items })
      // The next method itself is synchronous: It immediately emits the new value to all subscribers. However,
      // the processing of that emitted value by the subscribers (such as updating the view) can happen asynchronously,
      // especially in the context of Angular change detection. If you are unsure about the nature of the code
      // (sync or async) and want to ensure robustness, using await fixture.whenStable() instead of the synchronous operation
      // fixture.detectChanges() is a safer approach. It might add a slight overhead due to the waiting, but it ensures
      // that your test is stable even if there are asynchronous operations.
      await fixture.whenStable();

      // Assert that addToCart method was called
      expect(cartService.addToCart).toHaveBeenCalled();

      // Check if addToCart was called twice
      expect(addToCartSpy.calls.count()).toBe(2);

      // Check if the item's quantity is increased by 1
      const updatedItem = cartService.cart.value.items.find(_item => _item.id === item.id);
      expect(updatedItem?.quantity).toBe(initialQuantity + 1);
    } else {

      // Fail the test if increase button is not found
      fail('Increase button not found');
    }
  });
});
