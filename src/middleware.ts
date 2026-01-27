import type { MiddlewareHandler } from "astro";


export const onRequest: MiddlewareHandler = async (context, next) => {
    const token = context.cookies.get("token")?.value
    const pathname = context.url.pathname

    // permite rutas publicas
    if (pathname.startsWith("/login") || pathname.startsWith("/api/auth/login") || pathname.startsWith("/api/auth/register") ){
        return next()
    }

    // si no existe el token protege la ruta y redirige al login
    if (!token){
        return Response.redirect(new URL("/login", context.url), 302)
    }

    // guardar token en locals
    context.locals.token = token;
    return next()
}