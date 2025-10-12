import type { Pokemon } from "../interfaces/pokemon";


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


export const removePokemonFromPokedex = async (id:number) => {
    const res = await fetch(`/api/pokedex/${id}`, {method: "DELETE"});

    if (res.ok){
        return {success: true}
    }

    return {success: false}
}