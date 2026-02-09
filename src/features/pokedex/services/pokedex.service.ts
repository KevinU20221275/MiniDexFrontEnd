import type { Pokemon } from "@/interfaces/pokemon";
import type { EvolPokemonResponse, TransferPokemonResponse } from "../types/pokedex.types";

export const getPokedex = async (token :string) : Promise<Pokemon[]> => {
    if (!token || token == "") return []

    try  {
        const res = await fetch("http://localhost:8080/trainers/me/pokedex", {
            headers :  {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method : "GET"
        })

        if (!res.ok) throw new Error(`Error ${res.status}`)
     
        return res.json()
    } catch (e) {
        console.log(e)
        return []
    }
}


export const removePokemonFromPokedex = async (id:string): Promise<TransferPokemonResponse> => {
    try {

        const res = await fetch(`/api/pokedex/${id}`, {method: "DELETE"});

        const data = await res.json()
    
        if (!res.ok){
            return {success: false, message: data.message || "Failed to transfer pokemon"}
        }
        
        return {success: true, data : data}
    } catch (error) {
        console.error(error)
        return {success: false, message: "Server connection error"}
    }
}

export async function addPokemonToTeam(id: string) {
    try {
        const res = await fetch("/api/pokedex/team", {
            method: "POST",
            body: JSON.stringify({pokemonId: id})
        })

        const data = await res.json().catch(() => {})

        if (!res.ok){
            return {success: false, message: data.message}
        }

        return {success: true}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}

export async function removePokemonFromTeam(id:string) {
    try {
        const res = await fetch(`/api/pokedex/team/${id}`, {
            method: "DELETE"
        })

        if (!res.ok){
            return {success: false}
        }

        return {success: true}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}


export async function evolvePokemon(id:string) : Promise<EvolPokemonResponse> {
    try {
        const res = await fetch(`/api/pokedex/evolve/${id}`, {
            method: "POST"
        })

        const data = await res.json()

        if (!res.ok){
            return {success: false, message: data.message || "Pokemon can't evolve"}
        }

        return {success: true, data: data}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}