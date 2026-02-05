export interface Generation {
  id: number
  name: string
  region: string
  startId: number
  endId: number
}

export const generations: Generation[] = [
  { id: 1, name: 'Generation I', region: 'Kanto', startId: 1, endId: 151 },
  { id: 2, name: 'Generation II', region: 'Johto', startId: 152, endId: 251 },
  { id: 3, name: 'Generation III', region: 'Hoenn', startId: 252, endId: 386 },
  { id: 4, name: 'Generation IV', region: 'Sinnoh', startId: 387, endId: 493 },
  { id: 5, name: 'Generation V', region: 'Unova', startId: 494, endId: 649 },
  { id: 6, name: 'Generation VI', region: 'Kalos', startId: 650, endId: 721 },
  { id: 7, name: 'Generation VII', region: 'Alola', startId: 722, endId: 809 },
  { id: 8, name: 'Generation VIII', region: 'Galar', startId: 810, endId: 905 },
  { id: 9, name: 'Generation IX', region: 'Paldea', startId: 906, endId: 1025 }
]

export function getGenerationByPokemonId(pokemonId: number): Generation | undefined {
  return generations.find(gen => pokemonId >= gen.startId && pokemonId <= gen.endId)
}

export function groupPokemonByGeneration<T extends { id: number }>(pokemon: T[]): Map<Generation, T[]> {
  const grouped = new Map<Generation, T[]>()
  
  pokemon.forEach(p => {
    const generation = getGenerationByPokemonId(p.id)
    if (generation) {
      if (!grouped.has(generation)) {
        grouped.set(generation, [])
      }
      grouped.get(generation)!.push(p)
    }
  })
  
  return grouped
}
