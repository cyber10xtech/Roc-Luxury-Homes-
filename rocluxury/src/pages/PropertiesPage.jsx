import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Grid, List, X } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/properties'
import { useReveal } from '../hooks/useReveal'

export default function PropertiesPage() {
  const [searchParams] = useSearchParams()
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All')
  const [bedsFilter, setBedsFilter] = useState(searchParams.get('beds') || 'Any')
  const [sortBy, setSortBy] = useState('Default')
  const [view, setView] = useState('grid')
  const ref = useReveal()

  const types = ['All', 'Duplex', 'Apartment', 'Villa', 'Maisonette']
  const beds = ['Any', '3', '4', '5']

  const filtered = useMemo(() => {
    let list = [...properties]
    if (typeFilter !== 'All') list = list.filter(p => p.type === typeFilter)
    if (bedsFilter !== 'Any') list = list.filter(p => p.beds >= parseInt(bedsFilter))
    return list
  }, [typeFilter, bedsFilter])

  return (
    <main className="min-h-screen pt-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="reveal" ref={useReveal()}>
          <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Our Portfolio</div>
          <h1 className="font-display text-5xl md:text-6xl text-cream font-medium mb-4">
            Available <em className="gold-text">Properties</em>
          </h1>
          <p className="text-smoke text-lg max-w-xl">
            Explore our curated collection of luxury homes across Lagos's most prestigious locations.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="glass rounded-xl p-5">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Type filter */}
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-smoke mb-2">Type</div>
                <div className="flex flex-wrap gap-2">
                  {types.map(t => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className={`px-3 py-1.5 rounded-sm text-xs transition-all ${typeFilter === t ? 'btn-gold' : 'btn-outline'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Beds filter */}
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-smoke mb-2">Bedrooms</div>
                <div className="flex flex-wrap gap-2">
                  {beds.map(b => (
                    <button
                      key={b}
                      onClick={() => setBedsFilter(b)}
                      className={`px-3 py-1.5 rounded-sm text-xs transition-all ${bedsFilter === b ? 'btn-gold' : 'btn-outline'}`}
                    >
                      {b === 'Any' ? 'Any' : `${b}+ Beds`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results + view toggle */}
            <div className="flex items-center gap-4">
              <span className="text-smoke text-sm">{filtered.length} properties</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded transition-colors ${view === 'grid' ? 'text-gold' : 'text-smoke hover:text-cream'}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded transition-colors ${view === 'list' ? 'text-gold' : 'text-smoke hover:text-cream'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="font-display text-4xl text-smoke mb-4">No results</div>
            <p className="text-smoke/60 mb-6">Try adjusting your filters</p>
            <button
              onClick={() => { setTypeFilter('All'); setBedsFilter('Any') }}
              className="btn-outline px-6 py-3 rounded-sm text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {filtered.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
