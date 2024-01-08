import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../../../models/pokemon.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() pokemon: Pokemon | undefined;
  @Output() addToCart = new EventEmitter<Pokemon>();

  constructor() { }

  ngOnInit(): void { }

  onAddToCart(): void {
    this.addToCart.emit(this.pokemon);
  }

}
