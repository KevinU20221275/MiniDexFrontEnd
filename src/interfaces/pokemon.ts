import type { PokemonType } from "./types";

export interface Pokemon {
    id?: number;
    name: string;
    image: string;
    hp: number;
    defense: number;
    attack:number;
    speed:number;
    types: (string | PokemonType)[]
}