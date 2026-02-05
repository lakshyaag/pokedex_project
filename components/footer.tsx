import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <span className="font-semibold text-foreground">Next.js 16</span>
            <span>&</span>
            <span className="font-semibold text-foreground">TypeScript</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="https://twitter.com/lakshyaag" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link 
              href="https://github.com/lakshyaag" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Made by{' '}
            <Link 
              href="https://twitter.com/lakshyaag" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              @lakshyaag
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
