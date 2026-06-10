import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Bed, Bath, ChevronLeft, ChevronRight, Star, Quote, Play } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import { properties, estates, testimonials, blogPosts, contactInfo } from '../data/properties'
import { useReveal } from '../hooks/useReveal'

const HERO_IMAGES = [
  "https://rocluxuryhomes.com/wp-content/uploads/2026/01/IMG_8173-scaled.jpg",
  "https://rocluxuryhomes.com/wp-content/uploads/2026/01/IMG_7767-scaled.jpg",
  "https://rocluxuryhomes.com/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-13-at-11.25.21-AM.jpeg",
  "https://rocluxuryhomes.com/wp-content/uploads/2026/01/IMG_8209-scaled.jpg",
]

function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % HERO_IMAGES.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background slides */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1500"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      {/* Slide indicators */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1 rounded-full transition-all duration-300 ${i === current ? 'h-8 bg-gold' : 'h-2 bg-white/30'}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
        <div className="max-w-2xl">
          <div className="tag-pill inline-block mb-6 animate-fade-in">
            Premium Real Estate · Lagos, Nigeria
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-medium text-cream leading-[1.05] mb-6 animate-fade-up">
            Where Luxury
            <br />
            <em className="gold-text not-italic">Meets Living.</em>
          </h1>

          <p className="text-cream/70 text-lg leading-relaxed mb-10 max-w-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Discover exceptional homes crafted for those who demand the finest. Exclusive developments on Lagos Island — built with integrity, designed for legacy.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/properties" className="btn-gold px-8 py-4 rounded-sm flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
              View Properties
              <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-8 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase"
            >
              Book a Viewing
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl">
          {[
            { num: '30k+', label: 'Satisfied Clients' },
            { num: '24+', label: 'Properties Delivered' },
            { num: '5★', label: 'Client Rating' },
          ].map(s => (
            <div key={s.num}>
              <div className="font-display text-3xl gold-text font-bold">{s.num}</div>
              <div className="text-smoke text-xs tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SearchBar() {
  const [type, setType] = useState('All')
  const [beds, setBeds] = useState('')
  const types = ['All', 'Duplex', 'Apartment', 'Villa', 'Maisonette']

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-6 -mt-8 mb-24">
      <div className="glass-dark rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Type */}
          <div className="flex-1 min-w-[140px]">
            <div className="text-[10px] tracking-[0.2em] uppercase text-smoke mb-2">Property Type</div>
            <div className="flex flex-wrap gap-2">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-sm text-xs transition-all ${type === t ? 'btn-gold' : 'btn-outline'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Beds */}
          <div className="min-w-[120px]">
            <div className="text-[10px] tracking-[0.2em] uppercase text-smoke mb-2">Bedrooms</div>
            <select
              value={beds}
              onChange={e => setBeds(e.target.value)}
              className="input-dark rounded-sm px-3 py-2 text-sm w-full"
            >
              <option value="">Any</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Location */}
          <div className="min-w-[160px]">
            <div className="text-[10px] tracking-[0.2em] uppercase text-smoke mb-2">Location</div>
            <select className="input-dark rounded-sm px-3 py-2 text-sm w-full">
              <option>Lagos Island</option>
              <option>Ikate</option>
              <option>Lekki</option>
            </select>
          </div>

          <Link
            to={`/properties${type !== 'All' ? `?type=${type}` : ''}${beds ? `&beds=${beds}` : ''}`}
            className="btn-gold px-8 py-2.5 rounded-sm text-sm font-semibold tracking-wider uppercase flex items-center gap-2"
          >
            Search
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeaturedProperties() {
  const ref = useReveal()
  const featured = properties.slice(0, 3)

  return (
    <section className="max-w-7xl mx-auto px-6 mb-32" ref={ref}>
      <div className="reveal" ref={useReveal()}>
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Our Listing</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream font-medium">
              Find Your <em className="gold-text">Perfect Home</em>
            </h2>
          </div>
          <Link to="/properties" className="hidden md:flex items-center gap-2 btn-outline px-6 py-2.5 rounded-sm text-sm">
            All Properties
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((p, i) => (
          <div key={p.id} className="reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
            <PropertyCard property={p} index={i} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link to="/properties" className="btn-outline px-8 py-3 rounded-sm text-sm inline-flex items-center gap-2">
          View All Properties
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}

function AboutSection() {
  const ref = useReveal()
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image collage */}
        <div className="relative h-[500px] reveal" ref={useReveal()}>
          <img
            src="https://rocluxuryhomes.com/wp-content/uploads/2026/01/IMG_7041-scaled.jpg"
            alt="Roc Luxury Homes"
            className="absolute top-0 left-0 w-3/4 h-3/4 object-cover rounded-lg"
          />
          <img
            src="https://rocluxuryhomes.com/wp-content/uploads/2026/01/IMG_8167-scaled.jpg"
            alt="Luxury Interior"
            className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover rounded-lg border-4 border-obsidian"
          />
          {/* Gold accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="font-display text-2xl text-gold font-bold leading-none">30k</div>
              <div className="text-[9px] text-smoke uppercase tracking-wider mt-1">Clients</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="reveal" ref={useReveal()} style={{ transitionDelay: '0.15s' }}>
          <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">About Company</div>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-medium leading-tight mb-6">
            Welcome to<br />
            <em className="gold-text">Roc Luxury Homes</em>
          </h2>
          <p className="text-smoke leading-relaxed mb-6">
            We are transforming urban landscapes across Lagos through sustainable luxury developments that stand the test of time. Every property we build is a statement of integrity, quality, and our unwavering commitment to our clients.
          </p>
          <p className="text-smoke leading-relaxed mb-8">
            From residential duplexes to premium estates, our portfolio reflects a deep understanding of what modern families in Nigeria want — security, community, and spaces they're proud to call home.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-10">
            {[
              { icon: '🏆', label: 'Trustworthiness', sub: '& Transparency' },
              { icon: '📊', label: 'Market', sub: 'Expertise' },
              { icon: '⭐', label: 'Excellent', sub: 'Customer Service' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs text-cream font-medium">{item.label}</div>
                <div className="text-xs text-smoke">{item.sub}</div>
              </div>
            ))}
          </div>

          <Link to="/about" className="btn-gold px-8 py-3.5 rounded-sm inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
            Our Story
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function EstatesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="reveal text-center mb-12" ref={useReveal()}>
        <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Our Locations</div>
        <h2 className="font-display text-4xl md:text-5xl text-cream font-medium">
          Premium <em className="gold-text">Estates</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {estates.map((e, i) => (
          <div
            key={e.name}
            className="reveal relative h-72 rounded-lg overflow-hidden group cursor-pointer"
            ref={useReveal()}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <img
              src={e.image}
              alt={e.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="tag-pill inline-block mb-2">{e.units} Properties</div>
              <h3 className="font-display text-cream text-lg font-medium">{e.name}</h3>
              <p className="text-smoke text-xs mt-1">{e.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const [active, setActive] = useState(0)
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="reveal text-center mb-12" ref={useReveal()}>
        <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Testimonials</div>
        <h2 className="font-display text-4xl md:text-5xl text-cream font-medium">
          What Our <em className="gold-text">Clients Say</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div key={t.name} className="reveal glass rounded-xl p-8" ref={useReveal()} style={{ transitionDelay: `${i * 0.08}s` }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-gold font-bold text-sm">{t.initials}</span>
              </div>
              <div>
                <div className="text-cream font-medium text-sm">{t.name}</div>
                <div className="text-smoke text-xs">{t.role}</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} size={10} className="text-gold fill-gold" />
                  ))}
                </div>
              </div>
              <Quote size={24} className="text-gold/20 ml-auto flex-shrink-0" />
            </div>
            <p className="text-smoke text-sm leading-relaxed italic">"{t.text}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function BlogSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="reveal flex items-end justify-between mb-12" ref={useReveal()}>
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Insights</div>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-medium">
            Latest <em className="gold-text">News</em>
          </h2>
        </div>
        <Link to="/blog" className="hidden md:flex items-center gap-2 btn-outline px-6 py-2.5 rounded-sm text-sm">
          All Posts
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {blogPosts.map((post, i) => (
          <div key={post.id} className="reveal glass rounded-lg overflow-hidden group cursor-pointer prop-card" ref={useReveal()} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="tag-pill">{post.category}</span>
                <span className="text-smoke text-xs">{post.readTime} read</span>
              </div>
              <h3 className="font-display text-cream text-base font-medium leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-smoke text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
              <div className="text-smoke text-xs mt-4">{post.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src="https://rocluxuryhomes.com/wp-content/uploads/2026/01/3862-Converted.jpg"
          alt="Luxury Property"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-12">
          <div className="max-w-lg">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Book Appointment</div>
            <h2 className="font-display text-3xl md:text-4xl text-cream font-medium leading-snug mb-4">
              Ready to Find Your <em className="gold-text">Dream Home?</em>
            </h2>
            <p className="text-smoke text-sm mb-8 leading-relaxed">
              Our team is ready to guide you through every step. Schedule a private viewing today.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=Hi! I'd like to book a property viewing at Roc Luxury Homes.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2"
              >
                WhatsApp Us
                <ArrowRight size={14} />
              </a>
              <a href={`tel:${contactInfo.phone}`} className="btn-outline px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wider uppercase">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SearchBar />
      <FeaturedProperties />
      <AboutSection />
      <EstatesSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </main>
  )
}
