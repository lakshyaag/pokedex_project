'use client'

import { useState, useMemo } from 'react'
import { PokemonCard } from './pokemon-card'
import { SearchFilter } from './search-filter'
import type { Pokemon } from '@/lib/types'

interface PokemonGridProps {
  pokemonList: Pokemon[]
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

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

      return matchesSearch && matchesType
    })
  }, [pokemonList, searchQuery, selectedTypes])

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

        {/* Results Count */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPokemon.length} of {pokemonList.length} Pokémon
          </p>
          {(searchQuery || selectedTypes.length > 0) && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedTypes([])
              }}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Pokemon Grid */}
        {filteredPokemon.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPokemon.map((pokemon, index) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No Pokémon found matching your filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedTypes([])
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
