import type { Trainer } from "@/interfaces/trainer"
import type { ChangeEvent } from "react"

// data helper
export interface UserData {
    name: string
    username: string
}

// hooks
export interface UseTrainerReturn {
    showModal:boolean
    catchedPokemons: number,
    userData: UserData
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    updateTrainer : () => Promise<void>
    openModal: () => void
    closeModal: () => void,
    trainer: Trainer | null
}

// components
export interface UpdateTrainerFormProps{
    userData:UserData
    updateTrainer: () => Promise<void>
    closeModal:() => void
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void 
}