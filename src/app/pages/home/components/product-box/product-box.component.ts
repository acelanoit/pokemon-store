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
  type1: string | undefined;
  type2: string | undefined;

  constructor() { }

  ngOnInit(): void {
    if (this.pokemon && this.pokemon['type(s)']) {
      let types = this.pokemon['type(s)'].split(' ');
      this.type1 = types[0][0].toUpperCase() + types[0].slice(1);
      if (types[1]) this.type2 = types[1][0].toUpperCase() + types[1].slice(1);
    }
  }

  onAddToCart(): void {
    this.addToCart.emit(this.pokemon);
  }

}
