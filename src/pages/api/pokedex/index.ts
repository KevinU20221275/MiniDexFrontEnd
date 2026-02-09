import type { APIRoute } from "astro";
import { getMyPokedex } from "@/server/services/pokedex.service";
import { handleApiError } from "@/server/errors/handleApiError";

export const GET:APIRoute = async({locals}) => {
    try {
        return Response.json(await getMyPokedex(locals.token!))
    } catch (error) {
        return handleApiError(error)
    }
}


