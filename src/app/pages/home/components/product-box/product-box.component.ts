import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../../../models/pokemon.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  pokemon: Pokemon | undefined = {
    id: 3,
    name: 'Venusaur',
    price: 400,
    types: 'Grass',
    description: 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
  };
  @Output() addToCart = new EventEmitter<Pokemon>();

  constructor() { }

  ngOnInit(): void {

  }

  onAddToCart(): void {
    this.addToCart.emit(this.pokemon);
  }

}
