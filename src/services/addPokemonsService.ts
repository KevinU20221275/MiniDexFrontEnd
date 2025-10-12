import type { Pokemon } from "../interfaces/pokemon";

export async function addPokemonsToTrainer(pokemons: Pokemon[]) {
    for (const p of pokemons){
        try {

            await fetch("/api/pokedex", {
                method: "POST",
                body: JSON.stringify(p),
            });
        } catch (e) {
            console.log(e)
        }
    }
}
