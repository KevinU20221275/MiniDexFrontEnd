import { useAlertStore } from "@/stores/useAlertStore";
import { useMiniDexStore } from "@/stores/useMiniDexStore";
import { useEffect, useState, type ChangeEvent } from "react";
import { updateTrainerData } from "../services/trainer.service";
import type { UserData, UseTrainerReturn } from "../types/trainer.types";

export function useTrainer() : UseTrainerReturn {
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState<UserData>({name: "", username:""});
    const setTrainer = useMiniDexStore(state => state.setTrainer) 
    const trainer = useMiniDexStore(state => state.trainer)
    const pokedex = useMiniDexStore(state => state.pokedex)
    const {alert} = useAlertStore()

    useEffect(() => {
        if (trainer){
            setUserData({
                name : trainer?.name,
                username: trainer.username
            })
        }
    }, [trainer])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const updateTrainer = async () => {
        if (userData.name == "" || userData.username == "") {
            alert("Validation error", "Please fill all fileds")
            return 
        }
        
        const result = await updateTrainerData(userData.name, userData.username)

        if (!result.success) {
            alert("Error updating data", result.message || "")
            return
        }

        setTrainer({username: userData.username, name: userData.name})
        setShowModal(false)
        alert("Updated Trainer", "Data successfully updated")
    }

    const openModal = () => {
        if (trainer) {
            setUserData({name: trainer.name, username: trainer.username})
        }
        setShowModal(true)
    }

    const closeModal = () => setShowModal(false)
     
    return {
        updateTrainer,
        handleChange,
        openModal,
        showModal,
        catchedPokemons: pokedex.length,
        userData,
        closeModal,
        trainer
    }
}