import { Config } from "@/components/icons/Config";
import { useTrainer } from "../hooks/useTrainer";
import { UpdateTrainerForm } from "./UpdateTrainerForm";

export function TrainerProfile(){
    const {trainer, userData, openModal, closeModal, catchedPokemons, showModal, updateTrainer, handleChange} = useTrainer()

    return (
        <>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button className="absolute top-2 right-2 cursor-pointer hover:rotate-45 hover:scale-105 transition-all duration-500" onClick={openModal}>
                    <Config className="" />
                </button>
                <fieldset className="p-2 bg-white/10 rounded-sm">
                    <p>NAME</p>
                    <span>{trainer?.name}</span>
                </fieldset>

                <fieldset className="p-2 bg-white/10 rounded-sm">
                    <p>USERNAME</p>
                    <span>{trainer?.username}</span>
                </fieldset>

                <fieldset className="p-2 bg-white/10 rounded-sm">
                    <p>COINS</p>
                    <span>{trainer?.coins}</span>
                </fieldset>

                <fieldset className="p-2 bg-white/10 rounded-sm">
                    <p>POKEMONS IN POKEDEX</p>
                    <span>{catchedPokemons}</span>
                </fieldset>

                <fieldset className="p-2 bg-white/10 rounded-sm">
                    <p>LEVEL</p>
                    <span>{trainer?.level}</span>
                </fieldset>

                <fieldset className="p-2 bg-white/10 rounded-sm">
                    <p>XP</p>
                    <span>{trainer?.xp}</span>
                </fieldset>

                <fieldset className="p-2 bg-white/10 rounded-sm">
                    <p>WINS</p>
                    <span>{trainer?.wins}</span>
                </fieldset>

                <fieldset className="p-2 bg-white/10 rounded-sm">
                    <p>LOSES</p>
                    <span>{trainer?.loses}</span>
                </fieldset>
            </div>

            {showModal && <UpdateTrainerForm userData={userData} updateTrainer={updateTrainer} closeModal={closeModal} handleChange={handleChange} />}
        </>
    )
}