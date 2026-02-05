import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, '0')}`
}

export function formatHeight(decimeters: number): string {
  const meters = decimeters / 10
  return `${meters}m`
}

export function formatWeight(hectograms: number): string {
  const kilograms = hectograms / 10
  return `${kilograms}kg`
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatStatName(name: string): string {
  const statNames: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  }
  return statNames[name] || capitalizeFirst(name)
}
