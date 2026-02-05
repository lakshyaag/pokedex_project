'use client'

import { useState, useMemo } from 'react'
import { PokemonCard } from './pokemon-card'
import { SearchFilter } from './search-filter'
import { groupPokemonByGeneration, generations } from '@/lib/generations'
import type { Pokemon } from '@/lib/types'

interface PokemonGridProps {
  pokemonList: Pokemon[]
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'generations'>('generations')

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter(pokemon => {
      // Filter by search query
      const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Filter by types
      const matchesType = selectedTypes.length === 0 || 
        (pokemon.types && pokemon.types.some(t => selectedTypes.includes(t.type.name)))

      // Filter by generation
      const matchesGeneration = selectedGeneration === null || 
        (pokemon.id >= generations[selectedGeneration - 1].startId && 
         pokemon.id <= generations[selectedGeneration - 1].endId)

      return matchesSearch && matchesType && matchesGeneration
    })
  }, [pokemonList, searchQuery, selectedTypes, selectedGeneration])
  
  const groupedByGeneration = useMemo(() => {
    return groupPokemonByGeneration(filteredPokemon)
  }, [filteredPokemon])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            Discover All Pokémon
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Search, filter, and explore over 1,000 Pokémon from all generations
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTypes={selectedTypes}
          onTypeToggle={handleTypeToggle}
        />
        
        {/* Generation Filter & View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">Generation:</span>
            <button
              onClick={() => setSelectedGeneration(null)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedGeneration === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {generations.map((gen) => (
              <button
                key={gen.id}
                onClick={() => setSelectedGeneration(gen.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedGeneration === gen.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {gen.id}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm transition-all ${
                viewMode === 'grid'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('generations')}
              className={`px-3 py-1 rounded text-sm transition-all ${
                viewMode === 'generations'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              By Generation
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPokemon.length} of {pokemonList.length} Pokémon
          </p>
          {(searchQuery || selectedTypes.length > 0 || selectedGeneration !== null) && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedTypes([])
                setSelectedGeneration(null)
              }}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Pokemon Grid */}
        {filteredPokemon.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredPokemon.map((pokemon, index) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {Array.from(groupedByGeneration.entries()).map(([generation, pokemon]) => (
                <div key={generation.id} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground">
                        {generation.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {generation.region} Region • #{generation.startId}-{generation.endId} • {pokemon.length} Pokémon
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {pokemon.map((p, index) => (
                      <PokemonCard key={p.id} pokemon={p} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No Pokémon found matching your filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedTypes([])
                setSelectedGeneration(null)
              }}
              className="mt-4 text-primary hover:text-primary/80 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
