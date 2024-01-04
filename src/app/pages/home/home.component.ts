import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { StoreService } from '../../services/store.service';
import { Pokemon } from '../../models/pokemon.model';
import { Subscription } from 'rxjs';

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
  pokemons: Array<Pokemon> | undefined;
  sort = 'desc';
  count = 12;
  pokemonsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private _storeService: StoreService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {

    // We subscribe to the observable returned by getPokemons.
    // When the HTTP requests for all Pokemon complete, the callback function ((_pokemons: Pokemon[]) => { this.pokemons = _pokemons; }) is executed.
    this._storeService.getPokemons().subscribe((_pokemons: Pokemon[]) => {

      // _pokemons now holds an array of Pokemon, and it's assigned to this.pokemons, which is a property in this component.
      // This allows us to use the fetched Pokemon data in this Angular component.
      this.pokemons = _pokemons;
      console.log(this.pokemons);
    });
  }

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
