import type { APIRoute } from "astro";

export const GET: APIRoute = async ({locals}) => {
    const token = locals.token;

    const res = await fetch("http://localhost:8080/trainers/me/pokedex", {
        headers :  {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    if (!res.ok) {
        return new Response(JSON.stringify({ error: "Error obteniendo pokedex" }), {
            status: res.status,
        });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
}


export const POST: APIRoute = async ({locals, request}) => {
    const token = locals.token;

    const body = await request.json()
    
    const res = await fetch("http://localhost:8080/trainers/me/pokedex", {
        headers :  {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        return new Response(JSON.stringify({ error: "Error agregando el pokemons a la pokedex" }), {
            status: res.status,
        });
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), { status: 200 });
}

