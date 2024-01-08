export interface Pokemon {
  id: number;
  name: string;
  price: number;
  'type(s)': string;
  description: string;
  image: string;
}

export interface APIPokemon {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  sprites: { front_default: string };
  species: { url: string };
}
export interface APISpecies {
  flavor_text_entries: Array<{ flavor_text: string; language: { name: string } }>;
}

export interface PokemonType {
  name: string;
  selected: boolean;
}
