import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Pokemon } from '../../models/pokemon.model';

// Use a constant to store the row height for each number of columns.
// Use the TypeScript Index Signature to specify the type for the property name inside an object
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  type = '';

  constructor(private cartService: CartService) { }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;

    // Set the row height based on the number of columns
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowType(newType: string): void {
    this.type = newType;
  }

  onAddToCart(pokemon: Pokemon): void {
    this.cartService.addToCart({
      image: pokemon.image,
      name: pokemon.name,
      price: pokemon.price,
      quantity: 1,
      id: pokemon.id
    });
  }
}
