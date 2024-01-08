import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { StoreService } from '../../services/store.service';
import { Pokemon, APIPokemon, APISpecies } from '../../models/pokemon.model';
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
  displayedPokemons: Array<Pokemon> | undefined;
  sort = 'asc';
  count = 30;
  pokemonsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private _storeService: StoreService) { }

  ngOnInit(): void {
    if (!this.pokemons) this.getPokemons();
  }

  getPokemons(): void {

    // We subscribe to the observable returned by getPokemons.
    // When the HTTP requests for all Pokemon complete, the callback function is executed.
    this.pokemonsSubscription = this._storeService.getPokemons().subscribe((pokemonData: [APIPokemon, APISpecies][]) => {

      // pokemonData is an array where each element is a tuple (pair) containing two pieces of information: pokemonDetails and pokemonSpeciesInfo.
      // We use destructuring to break down the tuple into two separate pieces: pokemonDetails and pokemonSpeciesInfo.
      this.pokemons = pokemonData.map(([pokemonDetails, pokemonSpeciesInfo]) => {
        // Without destructuring, our code would look like this:
        // this.pokemons = pokemonData.map((pokemonTuple) => {
        // const pokemonDetails = pokemonTuple[0];
        // const pokemonDescription = pokemonTuple[1];

        // The Pokémon API includes the form feed character in the flavor text, so we need to replace it with a space to handle formatting issues.
        // The replace method, when used with a regular expression, will accept both the escape sequence \f
        // and the Unicode escape sequence \u000C interchangeably because they represent the same character.
        const description = pokemonSpeciesInfo?.flavor_text_entries?.find((entry) => entry.language.name === 'en')?.flavor_text.replace(/\f/g, ' ') || 'No description available';
        // Alternatively:
        // const description = pokemonSpeciesInfo?.flavor_text_entries[0]?.flavor_text.replace(/\u000C/g, ' ') || 'No description available';

        return this.transformPokemon(pokemonDetails, description);
      });
      this.setDisplayedPokemons(this.count);
    });
  }

  transformPokemon(pokemon: APIPokemon, description: string): Pokemon {
    const pokemonTypes = pokemon.types.map((type) => type.type.name);
    const type1 = pokemonTypes[0][0].toUpperCase() + pokemonTypes[0].slice(1);
    const type2 = pokemonTypes[1] ? pokemonTypes[1][0].toUpperCase() + pokemonTypes[1].slice(1) : '';
    return {
      id: pokemon.id,
      name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
      price: pokemon.id * 5 + 70,
      'type(s)': type1 + (type2 ? '/' + type2 : ''),
      image: pokemon.sprites.front_default,
      description: description
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

  setDisplayedPokemons(amount: number): void {
    this.displayedPokemons = this.pokemons?.slice(0, amount);
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount;
    this.setDisplayedPokemons(newCount);
  }

  onSortChange(newSort: string): void {
    if (newSort === 'asc')
      this.displayedPokemons?.sort((a, b) => a.id - b.id);
    else
      this.displayedPokemons?.sort((a, b) => b.id - a.id);
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
