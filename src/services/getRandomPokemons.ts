import type { Pokemon } from "../interfaces/pokemon"

export const generatePokemons = async (count = 3, shinyChance = 0.3): Promise<Pokemon[]> => {

    const requests = Array.from({length: count}, async () => {
        const id = Math.floor(Math.random() * 250) + 1
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

        const data = await res.json()

        const isShiny = Math.random() < shinyChance

        const image = isShiny ? data.sprites.other.home.front_shiny : data.sprites.other.home.front_default

        const pokemon : Pokemon = {
            name : data.name,
            image: image,
            hp: data.stats[0].base_stat,
            defense: data.stats[2].base_stat,
            attack:data.stats[1].base_stat,
            speed: data.stats[5].base_stat,
            types: data.types.map((t:any) => ({name: t.type.name}))
        }

        return pokemon
    })

    return Promise.all(requests)
}


export const getOnePokemonShiny = async () => {
    const id = Math.floor(Math.random() * 250) + 1
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const data = await res.json()

    const pokemon : Pokemon = {
        name : data.name,
        image: data.sprites.other.home.front_shiny ,
        hp: data.stats[0].base_stat,
        defense: data.stats[2].base_stat,
        attack:data.stats[1].base_stat,
        speed: data.stats[5].base_stat,
        types: data.types.map((t:any) => ({name: t.type.name}))
    }

    return pokemon
}