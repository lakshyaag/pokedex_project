'use client'

import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/use-favorites'

interface FavoriteButtonProps {
  pokemonId: number
  size?: 'sm' | 'md' | 'lg'
}

export function FavoriteButton({ pokemonId, size = 'md' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(pokemonId)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(pokemonId)
  }

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all ${
        favorite
          ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      }`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`${iconSizes[size]} transition-all ${favorite ? 'fill-current' : ''}`}
      />
    </button>
  )
}
