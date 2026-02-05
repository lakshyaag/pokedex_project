'use client'

import { Search, X } from 'lucide-react'
import { TypeBadge } from './type-badge'
import { TypeName } from '@/lib/types'

const pokemonTypes: TypeName[] = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTypes: string[]
  onTypeToggle: (type: string) => void
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypeToggle
}: SearchFilterProps) {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Type Filters */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Filter by Type</h3>
          {selectedTypes.length > 0 && (
            <button
              onClick={() => selectedTypes.forEach(type => onTypeToggle(type))}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Clear all ({selectedTypes.length})
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
          {pokemonTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}
              className={`transition-all transform hover:scale-105 ${
                selectedTypes.includes(type)
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <TypeBadge type={type} size="sm" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
