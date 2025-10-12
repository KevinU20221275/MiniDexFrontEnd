import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useMiniDexStore } from "../stores/useStore"
import { Config } from "./icons/Config";
import { updateTrainerData } from "../services/trainerServices";

export function TrainerProfile(){
    const [openModal, setOpentModal] = useState(false);
    const [userData, setUserData] = useState({name: "", username:""});
    const setTrainer = useMiniDexStore(state => state.setTrainer) 
    const trainer = useMiniDexStore(state => state.trainer)
    const pokedex = useMiniDexStore(state => state.pokedex)

    useEffect(() => {
        if (trainer){
            setUserData({
                name : trainer?.name,
                username: trainer.username
            })
        }
    }, [trainer])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await updateTrainerData(userData.name, userData.username)

        if (userData.name == "" || userData.username == "") return alert("Por favor llene los campos")

        if (result.success) {
            alert("Datos actualizados con exito")
            setTrainer({username: userData.username, name: userData.name})
            setOpentModal(false)
        } else {
            alert("El nombre de usuario ya esta en uso")
        }
    }

    return (
        <>
        <div className="grid grid-cols-2 gap-2 mt-2">
            <button className="absolute top-2 right-2 cursor-pointer hover:rotate-45 hover:scale-105 transition-all duration-500" onClick={() => setOpentModal(true)}>
                <Config className="" />
            </button>
            <fieldset className="p-2 bg-white/10 rounded-sm">
                <p>NOMBRE</p>
                <span>{trainer?.name}</span>
            </fieldset>

            <fieldset className="p-2 bg-white/10 rounded-sm">
                <p>NOMBRE DE USUARIO</p>
                <span>{trainer?.username}</span>
            </fieldset>

            <fieldset className="p-2 bg-white/10 rounded-sm">
                <p>COINS</p>
                <span>{trainer?.coins}</span>
            </fieldset>

            <fieldset className="p-2 bg-white/10 rounded-sm">
                <p>NIVEL</p>
                <span>{trainer?.level}</span>
            </fieldset>
            <fieldset className="p-2 bg-white/10 rounded-sm">
                <p>TOTAL DE POKEMONS</p>
                <span>{pokedex.length}</span>
            </fieldset>
        </div>

        {openModal && (
            <div className="fixed inset-0 bg-black/90 flex justify-center items-center">
                <form onSubmit={handleSubmit} className={`h-60 bg-white/20 p-4 rounded-md flex flex-col gap-2 transition-all duration-300 relative`}>
                    <button className="absolute right-2 top-2 cursor-pointer" onClick={() => setOpentModal(false)}>X</button>
                    <h2 className="text-center text-2xl font-bold text-white/90 pb-2">Actualizar Datos</h2>
                    <fieldset>
                        <input type="text" value={userData?.name} name="name" placeholder="Ingresa tu nombre" required onChange={handleChange}
                        className={`bg-zinc-200/40 p-2 rounded-md outline-0`}
                        />
                    </fieldset>

                    <fieldset>
                        <input type="text" value={userData?.username} name="username" placeholder="Ingresa tu nombre de usuario" required onChange={handleChange}
                        className="bg-zinc-200/40 p-2 rounded-md outline-0 "
                        />
                    </fieldset>

                    <fieldset className="flex justify-center">
                        <button className="px-4 py-1 rounded-md text-zinc-100 bg-gradient-to-tl from-[#CB0492] via-[#6D02C6] to-[#1500F7] cursor-pointer hover:scale-105 transition-all">Enviar</button>
                    </fieldset>
                </form>
            </div>
        )}
        </>
    )
}