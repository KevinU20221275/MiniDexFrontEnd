import type { Pokemon } from "./pokemon";

export interface Trainer {
    id: string;
    name: string;
    username: string;
    coins: number;
    level: number;
    pokemons: Pokemon[];
}