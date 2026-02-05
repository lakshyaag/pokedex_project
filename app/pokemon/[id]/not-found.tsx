import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-secondary flex items-center justify-center">
          <span className="text-5xl">?</span>
        </div>
        
        <h1 className="text-4xl font-bold">Pokémon Not Found</h1>
        
        <p className="text-lg text-muted-foreground">
          We couldn't find the Pokémon you're looking for. It might be outside our Pokédex range (1-386).
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pokédex
        </Link>
      </div>
    </div>
  )
}
