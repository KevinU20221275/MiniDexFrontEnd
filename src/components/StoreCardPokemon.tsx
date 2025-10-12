import { useEffect } from "react"
import { generatePokemons } from "../services/getRandomPokemons"
import { Coins } from "./icons/Coins"
import { addPokemonsToTrainer } from "../services/addPokemonsService"
import { updateTrainerCoinsAndLevel } from "../services/trainerServices"
import { useMiniDexStore } from "../stores/useStore"

export function StoreCardPokemon() {
    const { hasHydrated, featurePokemon, setFeaturePokemon, setTrainer, trainer } = useMiniDexStore()

    useEffect(() => {
        const fetchPokemon = async () => {
            if (!hasHydrated) return;

            if (!featurePokemon){
                const [pokemon] = await generatePokemons(1, 1)
                setFeaturePokemon(pokemon)
            }
        }

        fetchPokemon()
    }, [hasHydrated, featurePokemon, setFeaturePokemon])

    const handleClickBuy = async () => {
        if (featurePokemon){
            const coins = featurePokemon.attack * 5
            if (trainer?.coins! < coins) return alert("Monedas insuficientes")

            if (confirm(`¿Desea comprar a ${featurePokemon?.name} por ${coins} monedas?`)) {
                const result = await updateTrainerCoinsAndLevel(coins, "subtract")

                if (result.success){
                    const trainer = result.trainer
                    setTrainer({coins: trainer.coins, level: trainer.level })
                    await addPokemonsToTrainer([featurePokemon])

                    setFeaturePokemon(null)
                }
            }
        }
    }

    return (
        <article className="bg-gradient-to-tl from-[#43368F] via-[#C080E5] to-[#F5FEFA] rounded-md">
            <h4 className="text-center text-lg font-semibold">Pokemon Destacado!</h4>
            <div className="w-60 h-72 flex justify-center items-center flex-col p-2 gap-2">
                {featurePokemon && <img className="appear" src={featurePokemon?.image} alt={`image of ${featurePokemon?.name} shiny`} />}
                {!featurePokemon && <div className="w-54 h-64 bg-white/40 rounded-md mx-auto"></div>}
                <button 
                onClick={handleClickBuy}
                className="flex gap-2 bg-gradient-to-tl from-[#1500F7] via-[#6D02C6] to-[#CB0492] rounded-md py-1.5 px-4 cursor-pointer text-white"><Coins/> {featurePokemon?.attack! * 5}</button>
            </div>
        </article>
    )
}