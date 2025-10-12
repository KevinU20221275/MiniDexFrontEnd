export const updateTrainerCoinsAndLevel = async (coins: number, action: string) => {
    const res = await fetch("/api/trainer/update", {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ coins, action })
    })

    if (res.ok){
        const trainer = await res.json()
        return {trainer, success: true}
    }

    return {success: false}
}


export const updateTrainerData = async (name: string, username:string) => {
    const res = await fetch("/api/trainer/update", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, username })
    })

    if (res.ok){
        const trainer = await res.json()
        console.log("trainer actualizado: ", trainer)
        return {trainer, success: true}
    }

    return {success: false}
}