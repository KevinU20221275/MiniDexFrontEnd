import {  useState } from "react";
import type { Pokemon } from "../interfaces/pokemon";
import { addPokemonsToTrainer } from "../services/addPokemonsService";
import { useMiniDexStore } from "../stores/useStore";

export function Envelope({index, pokemons, handleClose}:{index:number, pokemons: Pokemon[], handleClose:(index:number) => void}){
    const [isOpen, setIsOpen] = useState<boolean | null>(false)
    const setPokedex = useMiniDexStore(state => state.setPokedex)

    const handleOpenModal = async () => {
        try {
            await addPokemonsToTrainer(pokemons)
            setPokedex((prev) => [...prev, ...pokemons])
        } catch (e) {
            console.error(e)
        }
        setIsOpen(true)
    }

    const handleCloseModal = async () => {
        handleClose(index)
        setIsOpen(null)
    }

    return (
        <div>
            {!isOpen ? (
                <div className="custom-pulse-animation bg-gradient-to-tl from-[#D2B560] via-[#96AFC8] to-[#FFFFFF] w-40 h-60 flex items-center justify-center rounded-sm cursor-pointer relative" 
                onClick={handleOpenModal}>
                    <img src="/envelopeImage.png" alt="default envelope image" className="relative -z-20" />
                </div>
            ) : (
                <article className="show-up flex justify-center items-center fixed inset-0 z-40 bg-black/70 ">
                    <div className="flex flex-col gap-2 bg-gradient-to-tl from-[#1500F7] via-[#6D02C6] to-[#CB0492] p-4 rounded-sm relative">
                        <p className="absolute right-4 top-1 cursor-pointer text-white" onClick={(e) => {e.stopPropagation(); handleCloseModal()}}>X</p>
                        <h4 className="text-center text-white font-semibold text-xl">Felicidades!</h4>
                        <p className="text-center text-white">Has conseguido</p>
                        <div className="flex gap-4 show-up">
                            {pokemons.map((p) => (
                                <div key={p.name} className="text-center mb-2 bg-white rounded shadow-md p-4 relative">
                                    <div className="absolute bg-amber-400 h-15 w-15 rounded-full top-5 left-5 z-0"></div>
                                <img src={p.image} alt={p.name} className="w-16 h-16 mx-auto relative z-10" />
                                <p className="capitalize">{p.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            )}
        </div>
    )
}