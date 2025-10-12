import type { APIRoute } from "astro";

export const DELETE : APIRoute = async ({ params, locals}) => {
    const token = locals.token;
    const pokemonId = params.id

    if (!token) return new Response("No autorizado", { status: 401 });

    const res = await fetch(`http://localhost:8080/trainers/me/pokedex/${pokemonId}`, {
        method: 'DELETE',
        headers :  {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    if (res.ok) {
        return new Response(null, {status: 204})
    }

    return new Response("Error al eliminar el pokemon", {status:res.status})
}