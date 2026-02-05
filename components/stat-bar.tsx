'use client'

import { motion } from 'framer-motion'
import { formatStatName } from '@/lib/utils'
import type { PokemonStat } from '@/lib/types'

const statColors: Record<string, string> = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-blue-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-pink-500',
}

interface StatBarProps {
  stat: PokemonStat
  index: number
}

export function StatBar({ stat, index }: StatBarProps) {
  const maxStat = 255
  const percentage = (stat.base_stat / maxStat) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          {formatStatName(stat.stat.name)}
        </span>
        <span className="font-mono text-muted-foreground">
          {stat.base_stat}
        </span>
      </div>
      
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
          className={`h-full ${statColors[stat.stat.name] || 'bg-primary'}`}
        />
      </div>
    </motion.div>
  )
}
