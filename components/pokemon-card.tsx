'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TypeBadge } from './type-badge'
import { formatPokemonId } from '@/lib/utils'
import type { Pokemon } from '@/lib/types'
import { FavoriteButton } from './favorite-button'

interface PokemonCardProps {
  pokemon: Pokemon
  index: number
}

export function PokemonCard({ pokemon, index }: PokemonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
    >
      <Link href={`/pokemon/${pokemon.id}`}>
        <div className="group relative bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full">
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton pokemonId={pokemon.id} size="sm" />
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono text-muted-foreground mb-2">
              {formatPokemonId(pokemon.id)}
            </span>
            
            <div className="relative w-full aspect-square mb-3">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>
            
            <h3 className="text-lg font-semibold text-foreground capitalize mb-2">
              {pokemon.name}
            </h3>
            
            {pokemon.types && pokemon.types.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type.type.name} type={type.type.name} size="sm" />
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
