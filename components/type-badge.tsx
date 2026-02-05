import { TypeName } from '@/lib/types'

const typeColors: Record<TypeName, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

interface TypeBadgeProps {
  type: string
  size?: 'sm' | 'md' | 'lg'
}

export function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const color = typeColors[type as TypeName] || '#A8A77A'
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium capitalize text-white ${sizeClasses[size]} transition-transform hover:scale-105`}
      style={{ backgroundColor: color }}
    >
      {type}
    </span>
  )
}
