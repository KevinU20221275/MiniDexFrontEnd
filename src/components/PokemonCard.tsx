import type { Pokemon } from "../interfaces/pokemon";
import { Coins } from "./icons/Coins";

export function PokemonCard({pokemon, handleRemove}: {pokemon: Pokemon, handleRemove : (id:number, coins:number) => void}) {

    const handleClickRemove = () => {
        if (confirm(`¿Desea eliminar a ${pokemon.name} por ${pokemon.attack} monedas?`)) {
            handleRemove(pokemon.id!, pokemon.attack)
        }
    }

    return (
        <div className="pokemon-card bg-white rounded p-3 text-center shadow-md w-40">
        <a href={`/pokemons/${pokemon.id}`}>
            <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mx-auto" />
            <p className="font-semibold capitalize mt-2">{pokemon.name}</p>
            <p className="text-sm text-gray-500">{pokemon.types.join(" ")}</p>
        </a>
        <button
            onClick={handleClickRemove}
            className="flex gap-2 mt-2 mx-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
        >
            <Coins/> {pokemon.attack}
        </button>
        </div>
    )
}