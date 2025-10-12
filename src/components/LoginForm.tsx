import { useState, type ChangeEvent, type FormEvent } from "react";
import { authLogin, authRegister } from "../services/authService";
import { useMiniDexStore } from "../stores/useStore";

export function LoginForm(){
    const setTrainer = useMiniDexStore(state => state.setTrainer)
    const setPokedex = useMiniDexStore(state => state.setPokedex)
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        password: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("Procesando...")
    const [isLogin, setIsLogin] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            if (!isLogin){
                const registerResult = await authRegister(userData.name, userData.username, userData.password)
                if(registerResult.success){
                    setMessage("Registro exitoso...")
                    setTrainer(registerResult.trainer)
                    setPokedex(registerResult.trainer.pokemons)
                    setMessage("Sesion inciada automaticamente...")
                    window.location.href = "/";
                } else {
                    const errorMessages = registerResult.message?.map(msg => msg + "\n")
                    alert(`ERROR \n ${errorMessages}`)
                }
            } else {
                const loginResult = await authLogin(userData.username, userData.password)
                if(loginResult.success){
                    setMessage("Inicio de sesión exitoso...")
                    setTrainer(loginResult.trainer)
                    setPokedex(loginResult.trainer.pokemons)
                    window.location.href = "/";
                } else {
                    alert(`${loginResult.message}`)
                }
            }
        } catch (error) {
            alert("Error del servidor")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })
    }

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 flex-col">
                    <img src="/pikachuLogin.gif" alt="Loading..." className="w-24 h-24" />
                    <span className="text-white text-center text-lg">{message}</span>
                </div>
            )}
    
            <form onSubmit={handleSubmit} className={`${!isLogin ? 'h-72' : 'h-60'} bg-white/20 p-4 rounded-md flex flex-col gap-2 transition-all duration-300 `}>
                <h2 className="text-center text-2xl font-bold text-white/90 pb-2">{!isLogin ? 'Register' : 'Login'}</h2>
                <fieldset className={`overflow-hidden`}>
                    <input type="text" value={userData.name} name="name" placeholder="Ingresa tu nombre" required={!isLogin} onChange={handleChange}
                    className={`${!isLogin ? '' : 'hidden'} bg-zinc-200/40 p-2 rounded-md outline-0 show`}
                    />
                </fieldset>

                <fieldset>
                    <input type="text" value={userData.username} name="username" placeholder="Ingresa tu nombre de usuario" required onChange={handleChange}
                    className="bg-zinc-200/40 p-2 rounded-md outline-0 "
                    />
                </fieldset>

                <fieldset>
                    <input type="password" value={userData.password} name="password" placeholder="Ingresa tu contraseña" required onChange={handleChange}
                    className="bg-zinc-200/40 p-2 rounded-md outline-0"
                    />
                </fieldset>

                <fieldset className="flex justify-center">
                    <span className="text-sm text-zinc-100 underline cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
                        {!isLogin ? 'ya tienes una cuenta?' : 'Crear una cuenta'}
                    </span>
                </fieldset>

                <fieldset className="flex justify-center">
                    <button className="px-4 py-1 rounded-md text-zinc-100 bg-gradient-to-tl from-[#CB0492] via-[#6D02C6] to-[#1500F7] cursor-pointer hover:scale-105 transition-all">Enviar</button>
                </fieldset>
            </form>
        </>
    )
}