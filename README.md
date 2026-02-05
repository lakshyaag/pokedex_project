# Pokédex - Modern Next.js App

A modern, interactive Pokédex application built with **Next.js 16**, **TypeScript**, and **TailwindCSS**. Browse, search, and explore all 386 Pokémon from Generations I-III.

## Features

- **Search & Filter**: Real-time search by name and filter by type
- **Detailed Stats**: View comprehensive stats, abilities, and information for each Pokémon
- **Evolution Chains**: Visual display of complete evolution paths
- **Favorites System**: Save and manage your favorite Pokémon (localStorage-based, easily extensible to database)
- **Responsive Design**: Optimized for all screen sizes
- **Modern Stack**: Built with Next.js 16 App Router, React 19, TypeScript
- **Performance**: Static generation for all Pokémon pages, optimized images, and caching

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **Animations**: Framer Motion
- **Data Source**: PokéAPI via pokedex-promise-v2
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Home page with Pokemon grid
│   ├── template.tsx         # Page transition animations
│   ├── pokemon/[id]/
│   │   ├── page.tsx         # Pokemon detail page
│   │   ├── loading.tsx      # Loading skeleton
│   │   └── not-found.tsx    # 404 page
│   └── favorites/
│       └── page.tsx         # Favorites page
├── components/
│   ├── header.tsx           # Navigation header
│   ├── footer.tsx           # Footer
│   ├── pokemon-card.tsx     # Pokemon card component
│   ├── pokemon-grid.tsx     # Grid with search/filter
│   ├── search-filter.tsx    # Search and type filters
│   ├── type-badge.tsx       # Pokemon type badges
│   ├── stat-bar.tsx         # Animated stat bars
│   ├── evolution-chain.tsx  # Evolution display
│   ├── favorite-button.tsx  # Favorite toggle button
│   └── favorites-content.tsx # Favorites page content
├── lib/
│   ├── pokemon-api.ts       # API utilities
│   ├── types.ts             # TypeScript interfaces
│   ├── favorites.ts         # Favorites management
│   └── utils.ts             # Helper functions
└── hooks/
    └── use-favorites.ts     # Favorites hook
```

## Key Features & Learning Points

### Next.js 16 Features
- **App Router**: Server Components, nested layouts, parallel routes
- **'use cache' Directive**: New caching API for component-level caching
- **generateStaticParams**: Static generation for all 386 Pokemon pages
- **Server Actions**: Async operations on the server

### TypeScript
- Strong typing throughout the application
- Type-safe API responses and component props
- Custom type definitions for Pokemon data

### Architecture Patterns
- **Separation of Concerns**: API logic in `lib/`, UI in `components/`
- **Extensible Design**: Favorites system designed to easily swap localStorage for database
- **Performance**: Static generation, image optimization, efficient caching

## Future Enhancements

- [ ] Add database (Supabase/Neon) for user accounts
- [ ] Implement authentication
- [ ] Team builder feature (save Pokemon teams)
- [ ] More advanced filtering (by generation, stats range)
- [ ] Dark mode toggle
- [ ] Share functionality for Pokemon and favorites

## License

MIT

---

Built with Next.js 16 by [@lakshyaag](https://twitter.com/lakshyaag)
