export interface Pokemon {
  id: number;
  name: string;
  price: number;
  types: string;
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
