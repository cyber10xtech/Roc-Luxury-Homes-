import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bed, Bath, Maximize2, MapPin, Star } from 'lucide-react'

export default function PropertyCard({ property, index = 0 }) {
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const statusColor = {
    Featured: 'bg-gold/20 text-gold border-gold/30',
    Popular: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    New: 'bg-green-500/20 text-green-300 border-green-500/30',
    Available: 'bg-white/10 text-cream/60 border-white/10',
  }

  return (
    <div
      className="prop-card glass rounded-lg overflow-hidden cursor-pointer group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-obsidian-700">
        {!imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-obsidian-700 animate-pulse" />
            )}
            <img
              src={property.images[0]}
              alt={property.title}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-obsidian-700">
            <span className="font-display text-4xl text-gold/30">R</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Status badge */}
        {property.status && property.status !== 'Available' && (
          <div className={`absolute top-3 left-3 tag-pill ${statusColor[property.status] || statusColor.Available}`}>
            {property.status}
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-3 right-3 tag-pill">
          {property.type}
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1 text-smoke text-xs">
            <MapPin size={10} />
            <span>{property.estate}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-cream text-base font-medium leading-snug mb-1 line-clamp-2 group-hover:text-gold transition-colors">
          {property.title}
        </h3>
        <p className="text-smoke text-xs mb-4 line-clamp-2">{property.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-smoke mb-4">
          <span className="flex items-center gap-1.5">
            <Bed size={12} className="text-gold/60" />
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={12} className="text-gold/60" />
            {property.baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 size={12} className="text-gold/60" />
            {property.size}
          </span>
        </div>

        <div className="gold-line mb-4" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-smoke uppercase tracking-wider mb-0.5">Price</div>
            <div className="font-display text-gold text-sm font-medium">{property.price}</div>
          </div>
          {property.rating && (
            <div className="flex items-center gap-1 text-xs text-gold">
              <Star size={12} fill="currentColor" />
              <span>{property.rating}</span>
              <span className="text-smoke">({property.reviews})</span>
            </div>
          )}
        </div>

        <a
          href={`https://wa.me/2349034485730?text=Hi! I'm interested in: ${encodeURIComponent(property.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full btn-gold text-center py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase"
          onClick={e => e.stopPropagation()}
        >
          Enquire Now
        </a>
      </div>
    </div>
  )
}
