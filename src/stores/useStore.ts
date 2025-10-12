import {create} from "zustand"
import { persist as persistMiddleware } from "zustand/middleware"
import type { Pokemon } from "../interfaces/pokemon"
import type { Trainer } from "../interfaces/trainer"

interface Envelope {
    pokemons: Pokemon[]
}

interface AppState {
  trainer: Trainer | null;
  pokedex: Pokemon[];
  envelopes: Envelope[];
  envelopesOpened: boolean;
  featurePokemon: Pokemon | null;
  hasHydrated: boolean;

  // acciones
  setTrainer: (trainer: Partial<Trainer>) => void;
  setPokedex: (pokemons: Pokemon[] | ((prev:Pokemon[]) => Pokemon[])) => void;
  removePokemon: (id:number) => void;
  getPokemonById: (id: number) => Pokemon | undefined;
  getPokemonsByType: (type: string) => Pokemon[]

  setEnvelopes: (envelopes: Envelope[] | ((prev:Envelope[]) => Envelope[])) => void;
  addEnvelope: (envelope: Envelope) => void;
  removeEnvelope: (index: number) => void;

  setEnvelopesOpened: (opened: boolean) => void;
  initEnvelopes: (getRandomPokemons: () => Promise<Pokemon[]>) => void;

  setFeaturePokemon: (pokemon: Pokemon | null) => void;
  setHydrated: (value: boolean) => void;
}

export const useMiniDexStore = create<AppState>()(
    persistMiddleware(
        (set, get) => ({
            trainer: null,
            pokedex: [],
            envelopes: [],
            envelopesOpened: false,
            featurePokemon: null,
            hasHydrated: false,
            
            setTrainer: (partial) => set((state) => ({ 
                trainer : state.trainer ? {...state.trainer, ...partial} : (partial as Trainer)
            })),
            
            setPokedex: (pokedex) => set((state) => ({
                pokedex: typeof pokedex === "function" ? pokedex(state.pokedex) : pokedex
            })),

            removePokemon: (id) => set((state) => ({
                pokedex: state.pokedex.filter((p) => p.id! !== id)
            })),

            getPokemonById: (id) => get().pokedex.find((p) => p.id! == id),

            getPokemonsByType: (type) => get().pokedex.filter((p) => p.types.some((t) => t.name === type)),

            setEnvelopes: (envelopes) => set((state) => ({
                envelopes: typeof envelopes === "function" ? envelopes(state.envelopes) : envelopes
            })),

            addEnvelope: (envelope) => set((state) => {
                const newEnvelopes = [...state.envelopes, envelope]
                return {
                    envelopes: newEnvelopes,
                    envelopesOpened: newEnvelopes.length >= 3 ? true : state.envelopesOpened
                }
            }),

            removeEnvelope: (index) => set((state) => ({
                envelopes: state.envelopes.filter((_,i) => i !== index)
            })),

            setEnvelopesOpened: (opened) => set({envelopesOpened: opened}),

            // dentro del store
            initEnvelopes: async (getRandomPokemons: () => Promise<Pokemon[]>) => {
                const state = get();
                if (state.envelopesOpened || state.envelopes.length > 0) return;

                const data = await Promise.all(
                    Array.from({length: 3}, async () => ({
                        pokemons: await getRandomPokemons()
                    }))
                )

                set({ envelopes: data });
            },

            setFeaturePokemon: (pokemon) => set({featurePokemon: pokemon}),

            setHydrated: (value: boolean) => set({hasHydrated: value}),

        }),
        {
            name: "minidex-storage",
            onRehydrateStorage: () => (state) => {
                if (state) state.setHydrated(true)
            }
        }
    )
)