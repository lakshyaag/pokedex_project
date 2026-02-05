import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg">P</span>
          </div>
          <span className="text-foreground">Pokédex</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            Browse
          </Link>
          <Link 
            href="/favorites" 
            className="flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
