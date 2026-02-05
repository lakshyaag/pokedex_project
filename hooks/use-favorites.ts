'use client'

import { useState, useEffect } from 'react'
import { favorites } from '@/lib/favorites'

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])

  useEffect(() => {
    // Initial load
    setFavoriteIds(favorites.getFavorites())

    // Listen for changes
    const handleChange = () => {
      setFavoriteIds(favorites.getFavorites())
    }

    window.addEventListener('favoritesChanged', handleChange)
    return () => window.removeEventListener('favoritesChanged', handleChange)
  }, [])

  const isFavorite = (id: number) => favoriteIds.includes(id)

  const toggleFavorite = (id: number) => {
    favorites.toggleFavorite(id)
  }

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite
  }
}
