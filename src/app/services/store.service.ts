import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIPokemon, APISpecies } from '../models/pokemon.model';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

const pokemonAmount: number = 251;

const STORE_BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private _httpClient: HttpClient) { }

  // Fetch details of a single Pokemon by ID:
  // This method takes an id as an input and returns an observable (Observable<APIPokemon>)
  // that represents the HTTP request to fetch a single Pokemon from the PokeAPI.
  getPokemon(id: number): Observable<APIPokemon> {

    // Here, it uses Angular's HttpClient to make an HTTP GET request to the PokeAPI endpoint for a specific Pokemon (${STORE_BASE_URL}/pokemon/${id}).
    // Angular's HttpClient returns observables for HTTP requests. This is because HTTP requests are inherently asynchronous — you send
    // a request to a server, and the response may not arrive immediately. Therefore, the result is an observable that emits the retrieved Pokemon.
    return this._httpClient.get<APIPokemon>(`${STORE_BASE_URL}/pokemon/${id}`);
  }

  // Fetch species information, including description, for a single Pokemon by ID
  getPokemonSpecies(id: number): Observable<APISpecies> {
    return this._httpClient.get<APISpecies>(`${STORE_BASE_URL}/pokemon-species/${id}`);
  }

  // // This method is responsible for fetching details and species information for multiple Pokemon
  getPokemons(): Observable<any[]> {

    // It initializes an empty array to hold observables for each individual Pokemon.
    const observables: Observable<any>[] = [];

    // Loop through Pokemon IDs and create observables for details and species information
    for (let i = 1; i <= pokemonAmount; i++) {
      const pokemonDetailsObservable = this.getPokemon(i);
      const pokemonSpeciesObservable = this.getPokemonSpecies(i);

      // Combine details and species information observables for each Pokemon
      observables.push(forkJoin([pokemonDetailsObservable, pokemonSpeciesObservable]));
    }

    // Combine all observables into a single observable
    return forkJoin(observables);
    // The result of forkJoin in this context is an array of tuples.
    // Each tuple contains the combined results of the observables provided to forkJoin.
    // Each tuple represents the details and species information (including description) for a specific Pokémon.
    // The structure of the emitted value is something like this:
    // [
    //   [pokemon1Details, pokemon1SpeciesInfo],
    //   [pokemon2Details, pokemon2SpeciesInfo],
    //   ... more tuples for each Pokémon
    // ]

    // pokemon1Details: Details of the first Pokémon.
    // pokemon1SpeciesInfo: Species information (including description) of the first Pokémon.
    // Similarly, the same structure for the details and species information of other Pokémon.
    // This array of tuples is what you receive when you subscribe to the observable returned by forkJoin(observables) in the getPokemons method.
    // Each tuple can be destructured to access the details and species information for a specific Pokémon in your consuming code.
  }
}
