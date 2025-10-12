import type { APIRoute } from "astro";

export const PATCH: APIRoute = async ({locals, request}) => {
    const token = locals.token
 
    if (!token) {
        return new Response("No autorizado", {status: 401})
    }

    const body = await request.json();

    const res = await fetch("http://localhost:8080/trainers/me/coins", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })


    if (!res.ok) {
        return new Response("Error al actualizar el entrenador", { status: res.status });
    }

    const updatedTrainer = await res.json();

    return new Response(JSON.stringify(updatedTrainer), { status: 200 });
}


export const PUT:APIRoute = async({locals, request, cookies}) => {
    const token = locals.token

    if (!token) {
        return new Response("No autorizado", {status: 401})
    }

    const body = await request.json();

    const res = await fetch("http://localhost:8080/trainers/me", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })


    if (!res.ok) {
        return new Response("Error al actualizar el entrenador", { status: res.status });
    }

    const updatedTrainer = await res.json();

    // Guarda el nuevo token en la cookie
    cookies.set("token", updatedTrainer.token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    })

    return new Response(JSON.stringify({trainer: updatedTrainer.trainer}), { status: 200, headers: {"Content-Type" : "application/json"} });
}