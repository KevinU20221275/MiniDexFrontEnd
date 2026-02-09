import type { Pokemon } from "@/interfaces/pokemon";
import { useMiniDexStore } from "@/stores/useMiniDexStore";
import { useEffect } from "react";
import type { UsePokedexReturn } from "../types/pokedex.types";
import { usePokedexFilters } from "./usePokedexFilters";
import { usePagination } from "./usePagination";
import { usePokedexInteraction } from "./usePokedexInteractions";

export function usePokedex({pokemonList}: {pokemonList: Pokemon[]}) : UsePokedexReturn {
    const setPokedex = useMiniDexStore(s => s.setPokedex)
    const pokedex = useMiniDexStore(s => s.pokedex)

    useEffect(() => {
        setPokedex(pokemonList)
    }, [pokemonList])

    const {filters, filteredPokemons, changeType, toggleShiny} = usePokedexFilters(pokedex)

    const pagination = usePagination(filteredPokemons)

    const interactions = usePokedexInteraction()

    return {
        filters,
        changeType,
        toggleShiny,
        ...pagination,
        ...interactions
    }
}