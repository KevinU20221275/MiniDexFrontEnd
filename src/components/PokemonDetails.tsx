import { useMiniDexStore } from "../stores/useStore"

export function PokemonDetails({id}: {id:string}) {
    const getPokemon = useMiniDexStore((state) => state.getPokemonById)
    const pokemon = getPokemon(parseInt(id));

    if (!pokemon) return <p>Pokemon no encontrado</p>

    return (
        <article>
            <h2>{pokemon.name}</h2>
            <p>HP</p>
        </article>
    )
}