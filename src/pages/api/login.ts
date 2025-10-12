import type { APIRoute } from "astro";

export const POST:APIRoute = async({request, cookies}) => {
    const body = await request.json()

    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })

    if (!res.ok){
        return new Response("Credenciales invalidas", {status: 401})
    }

    const data = await res.json()
    
    cookies.set("token", data.token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    })

    return new Response(JSON.stringify({ok: true, trainer: data.trainerDTO}), {status: 200, headers: {"Content-Type": "application/json"}})
}