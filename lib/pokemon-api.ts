import Pokedex from 'pokedex-promise-v2'
import type { Pokemon, PokemonDetail, EvolutionChain, PokemonSpecies } from './types'

const dex = new Pokedex()

export async function getPokemonList(limit: number = 386): Promise<Pokemon[]> {
  const pokemons = await dex.getPokemonsList({ limit })
  
  return pokemons.results.map((data, index) => {
    const id = index + 1
    const paddedId = String(id).padStart(3, '0')
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`

    return {
      id,
      name: data.name,
      image,
      types: [] // Will be populated when needed
    }
  })
}

export async function getPokemonById(id: string | number): Promise<PokemonDetail> {
  const pokemonData = await dex.getPokemonByName(id)
  const paddedId = String(id).padStart(3, '0')
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image,
    height: pokemonData.height,
    weight: pokemonData.weight,
    abilities: pokemonData.abilities,
    types: pokemonData.types,
    stats: pokemonData.stats,
    species: pokemonData.species
  }
}

export async function getEvolutionChain(pokemonId: string | number): Promise<EvolutionChain | null> {
  try {
    const pokemon = await getPokemonById(pokemonId)
    const speciesUrl = pokemon.species.url
    const speciesId = speciesUrl.split('/').filter(Boolean).pop()
    
    if (!speciesId) return null
    
    const species: PokemonSpecies = await dex.getResource(`https://pokeapi.co/api/v2/pokemon-species/${speciesId}/`) as PokemonSpecies
    const evolutionChainUrl = species.evolution_chain.url
    const evolutionChainId = evolutionChainUrl.split('/').filter(Boolean).pop()
    
    if (!evolutionChainId) return null
    
    const evolutionChain: EvolutionChain = await dex.getResource(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}/`) as EvolutionChain
    
    return evolutionChain
  } catch (error) {
    console.error('Error fetching evolution chain:', error)
    return null
  }
}

export function getPokemonImageUrl(id: number): string {
  const paddedId = String(id).padStart(3, '0')
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`
}
