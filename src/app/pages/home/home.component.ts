import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { StoreService } from '../../services/store.service';
import { Pokemon, APIPokemon } from '../../models/pokemon.model';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';

// Use a constant to store the row height for each number of columns.
// Use the TypeScript Index Signature to specify the type for the property name inside an object
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
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
    this.pokemonsSubscription = this._storeService.getPokemons().subscribe((_pokemons: APIPokemon[]) => {

      // _pokemons now holds an array of Pokemon, and it's assigned to this.pokemons, which is a property in this component.
      // This allows us to use the fetched Pokemon data in this Angular component.


      this.pokemons = _pokemons.map((pokemon: APIPokemon) => {
        return this.transformPokemon(pokemon);
      });
      console.log(this.pokemons);
    });
  }

  transformPokemon(pokemon: APIPokemon): Pokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      price: pokemon.id + 60,
      types: `${pokemon.types[0].type.name}${pokemon.types[1] ? `, ${pokemon.types[1].type.name}` : ''}`,
      image: pokemon.sprites.front_default,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies, elit quis tempor fermentum, nisl nunc ultrices felis, quis ali'
    };
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

  // In Angular, the ngOnDestroy lifecycle hook is used to perform cleanup operations when a component is about to be destroyed.
  // This hook is called just before Angular destroys the component, and it provides an opportunity to release resources,
  // unsubscribe from observables, or perform any necessary cleanup.

  // The pokemonsSubscription variable holds a reference to a subscription created
  // when we subscribe to the observable returned by getPokemons from the StoreService.
  // When the component is destroyed (for example, when navigating away from the component or when the component is no longer needed),
  // it's important to unsubscribe from any active subscriptions to prevent memory leaks and unnecessary resource consumption.

  // Each time we subscribe to an observable, a new subscription is created, and if we don't explicitly unsubscribe
  // from these subscriptions when the component is no longer needed, they can accumulate over time.
  // This can lead to memory leaks and unexpected behavior in our application.
  ngOnDestroy(): void {
    if (this.pokemonsSubscription) {
      this.pokemonsSubscription.unsubscribe();
    }
  }
}
