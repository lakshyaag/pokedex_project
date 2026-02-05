import { Metadata } from 'next'
import { FavoritesContent } from '@/components/favorites-content'

export const metadata: Metadata = {
  title: 'My Favorites - Pokédex',
  description: 'View and manage your favorite Pokémon',
}

export default function FavoritesPage() {
  return <FavoritesContent />
}
