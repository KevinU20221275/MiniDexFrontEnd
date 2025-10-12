import { useEffect } from "react";
import type { Pokemon } from "../interfaces/pokemon";
import { useMiniDexStore } from "../stores/useStore";
import { PokemonCard } from "./PokemonCard";
import { removePokemonFromPokedex } from "../services/pokedexService";
import { updateTrainerCoinsAndLevel } from "../services/trainerServices";

export function PokedexContainer({pokemonList}:{pokemonList: Pokemon[]}){
    const setPokedex = useMiniDexStore(state => state.setPokedex)
    const pokedex = useMiniDexStore(state => state.pokedex)
    const setTrainer = useMiniDexStore(state => state.setTrainer)

    useEffect(() => {
        setPokedex(pokemonList)
    }, [pokemonList,setPokedex])

    const handleRemove = async (id: number, coins: number) => {
        const result = await removePokemonFromPokedex(id)
        if (result.success){
            setPokedex(prev => prev.filter(p => p.id !== id))
            const result = await updateTrainerCoinsAndLevel(coins, "add")
            if (result.success){
                const trainer = result.trainer
                setTrainer({coins: trainer.coins, level: trainer.level })
            }
            alert("Pokemon eliminado")
        } else {
            alert("Error al eliminar el pokemon")
        }
    }

    return (
        <div className="flex flex-wrap gap-4 mt-4 max-w-4xl mx-auto py-2 px-3">

            {pokedex.length === 0 ? 
            (<p>No tienes pokemons en tu pokedex</p>) : 
            (
            pokedex.map(p => <PokemonCard key={p.id} pokemon={p} handleRemove={handleRemove} />)
            )}
        </div>
    )
}