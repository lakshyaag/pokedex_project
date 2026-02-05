// Favorites management - currently localStorage, designed to easily swap to database
const FAVORITES_KEY = 'pokedex_favorites'

export interface FavoritesManager {
  getFavorites: () => number[]
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => void
}

// Local storage implementation
export const localStorageFavorites: FavoritesManager = {
  getFavorites: () => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },

  addFavorite: (id: number) => {
    const favorites = localStorageFavorites.getFavorites()
    if (!favorites.includes(id)) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, id]))
      window.dispatchEvent(new CustomEvent('favoritesChanged'))
    }
  },

  removeFavorite: (id: number) => {
    const favorites = localStorageFavorites.getFavorites()
    const filtered = favorites.filter((favId) => favId !== id)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
    window.dispatchEvent(new CustomEvent('favoritesChanged'))
  },

  isFavorite: (id: number) => {
    const favorites = localStorageFavorites.getFavorites()
    return favorites.includes(id)
  },

  toggleFavorite: (id: number) => {
    if (localStorageFavorites.isFavorite(id)) {
      localStorageFavorites.removeFavorite(id)
    } else {
      localStorageFavorites.addFavorite(id)
    }
  }
}

// Export current implementation (easily swap to database implementation later)
export const favorites = localStorageFavorites
