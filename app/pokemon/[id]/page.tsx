import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Ruler, Weight } from 'lucide-react'
import { getPokemonById } from '@/lib/pokemon-api'
import { TypeBadge } from '@/components/type-badge'
import { StatBar } from '@/components/stat-bar'
import { FavoriteButton } from '@/components/favorite-button'
import { EvolutionChainDisplay } from '@/components/evolution-chain'
import { formatPokemonId, formatHeight, formatWeight, capitalizeFirst } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  try {
    const pokemon = await getPokemonById(id)
    return {
      title: `${capitalizeFirst(pokemon.name)} - Pokédex`,
      description: `View detailed information about ${capitalizeFirst(pokemon.name)}, including stats, types, abilities, and evolution chain.`,
    }
  } catch {
    return {
      title: 'Pokémon Not Found',
    }
  }
}

export default async function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let pokemon
  try {
    pokemon = await getPokemonById(id)
  } catch {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pokédex</span>
        </Link>

        {/* Main Content */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {formatPokemonId(pokemon.id)}
                  </span>
                  <h1 className="text-4xl font-bold capitalize text-foreground">
                    {pokemon.name}
                  </h1>
                </div>
                <FavoriteButton pokemonId={pokemon.id} size="lg" />
              </div>

              <div className="relative w-full aspect-square bg-secondary rounded-lg">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex gap-2 justify-center">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type.type.name} type={type.type.name} size="lg" />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary rounded-lg p-4 flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Height</p>
                    <p className="text-lg font-semibold">{formatHeight(pokemon.height)}</p>
                  </div>
                </div>
                <div className="bg-secondary rounded-lg p-4 flex items-center gap-3">
                  <Weight className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Weight</p>
                    <p className="text-lg font-semibold">{formatWeight(pokemon.weight)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats and Abilities */}
            <div className="space-y-6">
              {/* Base Stats */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Base Stats</h2>
                <div className="space-y-4">
                  {pokemon.stats.map((stat, index) => (
                    <StatBar key={stat.stat.name} stat={stat} index={index} />
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Abilities</h2>
                <div className="space-y-2">
                  {pokemon.abilities.map((ability) => (
                    <div
                      key={ability.ability.name}
                      className={`rounded-lg p-3 ${
                        ability.is_hidden
                          ? 'bg-muted border border-border'
                          : 'bg-primary/10 border border-primary/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">
                          {ability.ability.name.replace('-', ' ')}
                        </span>
                        {ability.is_hidden && (
                          <span className="text-xs bg-secondary px-2 py-1 rounded">
                            Hidden
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evolution Chain */}
        <EvolutionChainDisplay pokemonId={pokemon.id} />
      </div>
    </div>
  )
}
