'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/use-favorites'
import { PokemonCard } from './pokemon-card'
import { getPokemonById } from '@/lib/pokemon-api'
import type { Pokemon } from '@/lib/types'

export function FavoritesContent() {
  const { favoriteIds } = useFavorites()
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFavorites() {
      setLoading(true)
      try {
        const pokemon = await Promise.all(
          favoriteIds.map(async (id) => {
            try {
              const data = await getPokemonById(id)
              return data
            } catch {
              return null
            }
          })
        )
        setFavoritePokemon(pokemon.filter((p): p is Pokemon => p !== null))
      } catch (error) {
        console.error('Failed to load favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [favoriteIds])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My Favorites</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-4 h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (favoritePokemon.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My Favorites</h1>
          
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Start adding Pokémon to your favorites by clicking the heart icon on any Pokémon card
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Pokémon
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">My Favorites</h1>
            <p className="text-muted-foreground mt-2">
              You have {favoritePokemon.length} favorite Pokémon
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favoritePokemon.map((pokemon, index) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
