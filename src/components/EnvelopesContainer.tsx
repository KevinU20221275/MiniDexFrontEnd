import { useEffect, useState } from "react";
import { generatePokemons } from "../services/getRandomPokemons"
import { Envelope } from "./Envelope";
import type { Pokemon } from "../interfaces/pokemon";
import { useMiniDexStore } from "../stores/useStore";

interface Envelope {
    pokemons: Pokemon[],
}

export function EnvelopesContainer(){
    const { envelopes, envelopesOpened, addEnvelope, removeEnvelope, initEnvelopes } = useMiniDexStore();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchEnvelopes = async () => {
            setIsLoading(true)

            try {
                await initEnvelopes(generatePokemons);
            } catch (e){
                console.error(e)
            } finally {
                setIsLoading(false)
            }
        }

        fetchEnvelopes()
    }, [initEnvelopes])


    const handleClose = (index:number) => {
        removeEnvelope(index)
    };

    return (
        <div className="flex gap-4 justify-center mt-6 items-center">
            {envelopes.map((env, index) => (
                <div key={index}>
                    <Envelope index={index} pokemons={env.pokemons} handleClose={handleClose} />
                </div>
            ))}
            {
               isLoading ? (<div className="w-40 h-60 rounded-ms bg-white/40"></div>) : (envelopes.length === 0 && !isLoading) && (<p className="text-white">No hay sobres por habrir vuelve ma;ana</p>)
            }
        </div>
    )
}