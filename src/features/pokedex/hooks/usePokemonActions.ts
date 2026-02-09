import type { Pokemon } from "@/interfaces/pokemon"
import { addPokemonToTeam, evolvePokemon, removePokemonFromPokedex, removePokemonFromTeam } from "../services/pokedex.service"
import { useAlertStore } from "@/stores/useAlertStore"
import { useMiniDexStore } from "@/stores/useMiniDexStore"
import { useMemo, useState } from "react"
import type { UsePokemonActionsReturn } from "../types/pokedex.types"

export const MIN_LEVEL_TO_EVOLVE = 5
export const EVOLUTION_COST = 100
export function usePokemonActions(currentPokemon:Pokemon | null):UsePokemonActionsReturn {
    const updatePokemonEverywhere = useMiniDexStore((s) => s.updatePokemonEverywhere)
    const setPokemonTeam = useMiniDexStore((s) => s.setPokemonTeam)
    const pokemonTeam = useMiniDexStore((s) => s.pokemonTeam)
    const removePokemon = useMiniDexStore((s) => s.removePokemon)
    const trainer = useMiniDexStore((s) => s.trainer)
    const setCurrentPokemonDetails = useMiniDexStore((s) => s.setCurrentPokemonDetails)
    const setTrainer = useMiniDexStore((s) => s.setTrainer)
    const { alert, confirm } = useAlertStore()
    const [isEvolved, setIsEvolved] = useState(false)

    const isAlreadyInTeam = useMemo(() => {
        if (!currentPokemon) return false
        return pokemonTeam?.some(p => p.uuid === currentPokemon.uuid)
    }, [pokemonTeam, currentPokemon])

    const canAddMore = pokemonTeam?.length < 6

    const canEvolve = currentPokemon ? currentPokemon.canEvolve : false

    const handleAddToTeam = async () => {
        if (!currentPokemon) return

        if (!canAddMore) {
            alert("No space", "Your team is full")
            return
        }

        if (isAlreadyInTeam) {
            alert("Already in team", "This Pokémon is already in your team")
            return
        }

        const result = await addPokemonToTeam(currentPokemon.uuid)

        if (!result.success) {
            alert("Error", result.message || "")
            return
        }
        
        setPokemonTeam(prev => [...prev, currentPokemon])
    }

    const handleRemoveFromTeam = async () => {
        if (!currentPokemon) return

        const accepted = await confirm("Remove?", "Remove from team?")

        if (!accepted) return

        const result = await removePokemonFromTeam(currentPokemon.uuid)
        
        if (!result.success) {
            alert("Error", result.message || "")
            return
        }
        setPokemonTeam(prev => prev.filter(p => p.uuid !== currentPokemon.uuid))
    }

    const handleTransfer = async () => {
        if (!currentPokemon) return
        
        const accepted = await confirm("Transfer?", "This removes it from your Pokédex.")

        if (!accepted) return

        const result = await removePokemonFromPokedex(currentPokemon.uuid)

        if (result.success && result.data) {
            const data = result.data
            const receivedCoins = data.coins - (trainer?.coins || 0)

            setTrainer({ coins: data.coins, xp: data.xp, level: data.level })
            alert("Success!", `You received ${receivedCoins} coins`)
            removePokemon(currentPokemon.uuid)
        }
    }

    const closeEvolvedModal = () => {
        setIsEvolved(false)
    }

    const openEvolvedModal = () => {
        setIsEvolved(true)
    }

    const evolPokemon = async () => {
        if (!currentPokemon) return

        const result = await evolvePokemon(currentPokemon.uuid)

        if (result.success && result.data){
            const {trainerCoins, trainerLevel, trainerXp, evolvedPokemon} = result.data
            setTrainer({coins: trainerCoins, level: trainerLevel, xp: trainerXp})
            updatePokemonEverywhere(evolvedPokemon)
            setCurrentPokemonDetails(evolvedPokemon)
            return
        }

        alert("Error evolved pokemon", result.message || "")
    }

    return {
        isAlreadyInTeam,
        canAddMore,
        canEvolve,
        handleAddToTeam,
        handleRemoveFromTeam,
        handleTransfer,
        evolPokemon,
        closeEvolvedModal,
        openEvolvedModal,
        isEvolved
    }
}
