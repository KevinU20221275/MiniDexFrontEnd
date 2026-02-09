import type { PackPokemonResponse } from "./pokemon.types"

export interface TrainerResponse {
    name: string
    username: string
    level: number
    xp: number
    coins: number,
    wins: number,
    loses: number,
    dailyPackStatus: DailyPackStatusResponse
}

export interface UpdateNameAndTrainerUsernameRequest {
    name: string
    username: string
}

export interface DailyPackStatusResponse {
    numEnvelopes: number
    lastResetDate: string
}

export interface EnvelopeResponse {
    pokemons: PackPokemonResponse[]
}