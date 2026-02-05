'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { getEvolutionChain, getPokemonImageUrl } from '@/lib/pokemon-api'
import { capitalizeFirst } from '@/lib/utils'
import type { EvolutionChainLink } from '@/lib/types'

interface EvolutionChainDisplayProps {
  pokemonId: number
}

interface Evolution {
  name: string
  id: number
  image: string
}

function extractEvolutions(chain: EvolutionChainLink): Evolution[][] {
  const stages: Evolution[][] = []
  
  function traverse(link: EvolutionChainLink, stage: number) {
    const pokemonId = parseInt(link.species.url.split('/').filter(Boolean).pop() || '0')
    const evolution: Evolution = {
      name: link.species.name,
      id: pokemonId,
      image: getPokemonImageUrl(pokemonId)
    }
    
    if (!stages[stage]) {
      stages[stage] = []
    }
    stages[stage].push(evolution)
    
    if (link.evolves_to.length > 0) {
      link.evolves_to.forEach(nextLink => {
        traverse(nextLink, stage + 1)
      })
    }
  }
  
  traverse(chain, 0)
  return stages
}

export function EvolutionChainDisplay({ pokemonId }: EvolutionChainDisplayProps) {
  const [evolutionStages, setEvolutionStages] = useState<Evolution[][] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvolutionChain() {
      setLoading(true)
      try {
        const chain = await getEvolutionChain(pokemonId)
        if (chain) {
          const stages = extractEvolutions(chain.chain)
          setEvolutionStages(stages)
        }
      } catch (error) {
        console.error('Failed to load evolution chain:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvolutionChain()
  }, [pokemonId])

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Evolution Chain</h2>
        <div className="flex items-center justify-center gap-4 py-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-24 h-24 bg-secondary rounded-lg animate-pulse" />
              {i < 2 && <ChevronRight className="w-6 h-6 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!evolutionStages || evolutionStages.length === 0) {
    return null
  }

  // Don't show if there's only one stage (no evolutions)
  if (evolutionStages.length === 1 && evolutionStages[0].length === 1) {
    return null
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Evolution Chain</h2>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        {evolutionStages.map((stage, stageIndex) => (
          <div key={stageIndex} className="flex items-center gap-4">
            {/* Evolution Stage */}
            <div className="flex flex-col gap-4">
              {stage.map((pokemon, pokemonIndex) => (
                <motion.div
                  key={pokemon.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: stageIndex * 0.2 }}
                >
                  <Link href={`/pokemon/${pokemon.id}`}>
                    <div className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-secondary transition-colors">
                      <div className="relative w-20 h-20 md:w-24 md:h-24">
                        <Image
                          src={pokemon.image}
                          alt={pokemon.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform"
                          sizes="96px"
                        />
                      </div>
                      <span className="text-sm font-medium capitalize text-center">
                        {capitalizeFirst(pokemon.name)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Arrow between stages */}
            {stageIndex < evolutionStages.length - 1 && (
              <ChevronRight className="w-6 h-6 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
