import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
const pokemonAmount: number = 150;

const STORE_BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private _httpClient: HttpClient) { }

  // This method takes an id as an input and returns an observable (Observable<Pokemon>)
  // that represents the HTTP request to fetch a single Pokemon from the PokeAPI.
  getPokemon(id: number): Observable<Pokemon> {

    // Here, it uses Angular's HttpClient to make an HTTP GET request to the PokeAPI endpoint for a specific Pokemon (${STORE_BASE_URL}/pokemon/${id}).
    // Angular's HttpClient returns observables for HTTP requests. This is because HTTP requests are inherently asynchronous — you send
    // a request to a server, and the response may not arrive immediately. Therefore, the result is an observable that emits the retrieved Pokemon.
    return this._httpClient.get<Pokemon>(`${STORE_BASE_URL}/pokemon/${id}`);
  }

  // This method is responsible for fetching multiple Pokemon.
  getPokemons(): Observable<Pokemon[]> {

    // It initializes an empty array to hold observables for each individual Pokemon.
    const observables: Observable<Pokemon>[] = [];

    // In a loop, it calls the getPokemon method for each Pokemon id (from 1 to pokemonAmount) and adds the resulting observables to the observables array.
    for (let i = 1; i <= pokemonAmount; i++) {
      observables.push(this.getPokemon(i));
    }

    // The forkJoin operator takes an array of observables and combines them into a single observable that emits an array of results.
    // In this case, it combines the observables for each Pokemon into a single observable that emits an array of Pokemon.
    return forkJoin(observables);
  }
}
