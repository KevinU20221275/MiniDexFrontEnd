import { useState, type FormEvent } from "react";

export function LoginForm(){
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        password: ""
    })

    const [isLogin, setIsLogin] = useState(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userData)
    }

    return (
        <form onSubmit={handleSubmit} className={`${!isLogin ? 'h-72' : 'h-60'} bg-white/20 p-4 rounded-md flex flex-col gap-2 transition-all duration-300`}>
            <h2 className="text-center text-2xl font-bold text-white/90 pb-2">{!isLogin ? 'Register' : 'Login'}</h2>
            <fieldset className={`${!isLogin ? '' : 'hidden'} overflow-hidden`}>
                <input type="text" value={userData.name} name="name" placeholder="Ingresa tu nombre" required onChange={(e) => {
                    e.preventDefault()
                    setUserData({
                        ...userData,
                        name: e.target.value
                    })
                }}
                className="bg-zinc-200/40 p-2 rounded-md outline-0 show"
                />
            </fieldset>

            <fieldset>
                <input type="text" value={userData.username} name="username" placeholder="Ingresa tu nombre de usuario" required onChange={(e) => {
                    e.preventDefault()
                    setUserData({
                        ...userData,
                        username: e.target.value
                    })
                }}
                className="bg-zinc-200/40 p-2 rounded-md outline-0 "
                />
            </fieldset>

            <fieldset>
                <input type="password" value={userData.password} name="password" placeholder="Ingresa tu contrase;a" required onChange={(e) => {
                    e.preventDefault()
                    setUserData({
                        ...userData,
                        password: e.target.value
                    })
                }}
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
    )
}