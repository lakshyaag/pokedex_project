'use cache'

import { PokemonGrid } from '@/components/pokemon-grid'
import { getPokemonList } from '@/lib/pokemon-api'
import Pokedex from 'pokedex-promise-v2'

// Fetch types for all Pokemon
async function getPokemonWithTypes() {
  const dex = new Pokedex()
  const pokemonList = await getPokemonList(1025)
  
  // Fetch types for each pokemon
  const pokemonWithTypes = await Promise.all(
    pokemonList.map(async (pokemon) => {
      try {
        const details = await dex.getPokemonByName(pokemon.id)
        return {
          ...pokemon,
          types: details.types
        }
      } catch {
        return pokemon
      }
    })
  )
  
  return pokemonWithTypes
}

export default async function HomePage() {
  const pokemonList = await getPokemonWithTypes()
  
  return <PokemonGrid pokemonList={pokemonList} />
}
