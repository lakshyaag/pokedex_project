export interface Pokemon {
  id: number
  name: string
  image: string
  types: PokemonType[]
  generation?: number
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonDetail extends Pokemon {
  height: number
  weight: number
  abilities: PokemonAbility[]
  stats: PokemonStat[]
  species: {
    url: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface EvolutionChain {
  id: number
  chain: EvolutionChainLink
}

export interface EvolutionChainLink {
  species: {
    name: string
    url: string
  }
  evolves_to: EvolutionChainLink[]
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string
  }
}

export type TypeName = 
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
