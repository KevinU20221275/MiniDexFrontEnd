
export const authRegister = async (name: string, username: string, password:string) => {
    const res = await fetch('/api/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, username, password})
    })

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const messages = Object.values(data)
        return { success: false, message: messages };
    }

    const data  = await res.json()

    return {success: true, trainer: data.trainer};
}


export const authLogin = async (username: string, password:string) => {
    try {
        const res = await fetch('/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password})
        })

        if (!res.ok){
            const data = await res.json().catch(() => ({}))
            return {success:false, message: data.message || "Credenciales invalidas"};
        }

        const data = await res.json()
        return {success: true, trainer: data.trainer}
    } catch (error) {
        console.error("error en authLogin: ", error)
        return {success: false, message: "error de conexion"}
    }
    
}

