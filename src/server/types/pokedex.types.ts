import type { PokemonResponse } from "./pokemon.types";

export interface PokedexResponse {
    pokemonTeam: PokemonResponse[]
    pokedex: PokemonResponse[]
}

export interface PokemonTeamResponse {
    team: PokemonResponse[]
}

export interface EvolPokemonResponse {
    coins: number
    xp: number
    level:number
    evolvedPokemon: PokemonResponse
}

export interface RemovePokemonFromPokedexResponse {
    level: number
    xp: number
    coins: number
}