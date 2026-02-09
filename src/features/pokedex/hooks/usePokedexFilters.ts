import type { Pokemon } from "@/interfaces/pokemon";
import { useMemo, useState } from "react";

export function usePokedexFilters(pokedex: Pokemon[]){
    const [filters, setFilters] = useState({
        pokemonType: "ALL",
        shiny: false
    })

    const changeType = (type: string) => {
        setFilters(prev => ({...prev, pokemonType: type}))
    }

    const toggleShiny = () => {
        setFilters(prev => ({...prev, shiny: !prev.shiny}))
    }

    const filteredPokemons = useMemo(() => {
        let result = pokedex

        if (filters.pokemonType !== "ALL"){
            result = result.filter(p => 
                p.types.some(t => t.name.toLowerCase() === filters.pokemonType.toLowerCase())
            )
        }

        if (filters.shiny){
            result = result.filter(p => p.shiny)
        }

        return result

    }, [pokedex, filters])

    return {
        filters,
        filteredPokemons,
        changeType,
        toggleShiny
    }
}