export async function apiFetch<T>(path:string, token:string, options: any = {}): Promise<T> {
    const res = await fetch(`http://localhost:8080${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    })

    if (!res.ok) throw new Error(`Error ${res.status}`)

    const text = await res.text();

    if (!text) {
        // @ts-ignore
        return [] as T; // o `null as T` si prefieres
    }
    return JSON.parse(text)
}