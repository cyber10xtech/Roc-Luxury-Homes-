import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Award, Users, TrendingUp } from 'lucide-react'
import { contactInfo } from '../data/properties'
import { useReveal } from '../hooks/useReveal'

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative h-96 mb-24 overflow-hidden">
        <img
          src="https://rocluxuryhomes.com/wp-content/uploads/2026/01/IMG_8173-scaled.jpg"
          alt="Roc Luxury Homes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Our Story</div>
            <h1 className="font-display text-5xl md:text-6xl text-cream font-medium max-w-lg leading-tight">
              Building Lagos's <em className="gold-text">Finest</em> Homes
            </h1>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal" ref={useReveal()}>
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Who We Are</div>
            <h2 className="font-display text-4xl text-cream font-medium mb-6 leading-tight">
              Transforming Urban Living<br />
              <em className="gold-text">Across Lagos</em>
            </h2>
            <p className="text-smoke leading-relaxed mb-5">
              Roc Luxury Homes Limited is a premium real estate developer dedicated to creating exceptional residential spaces that combine sustainability, luxury, and community. Since our founding, we've delivered over 24 properties and built relationships with more than 30,000 satisfied clients.
            </p>
            <p className="text-smoke leading-relaxed mb-8">
              Based at No 23B Ikota GRA, Lagos, we operate with a singular mission: to provide homes that inspire pride, build wealth, and stand the test of time. Our developments on Lagos Island are designed to meet the expectations of Nigeria's most discerning buyers.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2"
              >
                Get in Touch
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 reveal" ref={useReveal()}>
            {[
              { icon: Shield, label: 'Trustworthiness', desc: 'Complete transparency in every transaction' },
              { icon: Award, label: 'Excellence', desc: 'Uncompromising quality in every build' },
              { icon: Users, label: 'Customer First', desc: '30,000+ satisfied clients served' },
              { icon: TrendingUp, label: 'Market Expertise', desc: 'Deep knowledge of the Lagos market' },
            ].map(item => (
              <div key={item.label} className="glass rounded-xl p-5">
                <item.icon size={20} className="text-gold mb-3" />
                <div className="text-cream text-sm font-medium mb-1">{item.label}</div>
                <div className="text-smoke text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-obsidian-800 py-20 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '30,000+', label: 'Satisfied Clients' },
              { num: '24+', label: 'Properties Delivered' },
              { num: '3', label: 'Premium Estates' },
              { num: '5★', label: 'Client Rating' },
            ].map(s => (
              <div key={s.num} className="reveal" ref={useReveal()}>
                <div className="font-display text-4xl gold-text font-bold mb-2">{s.num}</div>
                <div className="text-smoke text-sm tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estates */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="reveal text-center mb-12" ref={useReveal()}>
          <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Our Portfolio</div>
          <h2 className="font-display text-4xl text-cream font-medium">
            Our <em className="gold-text">Developments</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Crystal Court Estate, Ikate', img: 'https://rocluxuryhomes.com/wp-content/uploads/2026/01/IMG_8173-scaled.jpg', desc: '5 premium properties featuring world-class facilities within a prestigious gated community.' },
            { name: 'Royal Pine Estate', img: 'https://rocluxuryhomes.com/wp-content/uploads/2026/01/IMG_7767-scaled.jpg', desc: 'Contemporary luxury homes designed for modern family living on Lagos Island.' },
            { name: 'Riverside Court', img: 'https://rocluxuryhomes.com/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-19-at-9.45.16-AM-1.jpeg', desc: 'An exclusive waterfront development redefining premium apartment living in Lagos.' },
          ].map((e, i) => (
            <div key={e.name} className="reveal glass rounded-xl overflow-hidden group prop-card" ref={useReveal()} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="h-48 overflow-hidden">
                <img src={e.img} alt={e.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-cream text-base font-medium mb-2">{e.name}</h3>
                <p className="text-smoke text-sm leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="glass rounded-2xl p-12 text-center">
          <h2 className="font-display text-4xl text-cream font-medium mb-4">
            Ready to <em className="gold-text">Find Your Home?</em>
          </h2>
          <p className="text-smoke mb-8 max-w-md mx-auto">
            Let our team guide you to the perfect property. Schedule a private viewing today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/properties" className="btn-gold px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wider uppercase">
              Browse Properties
            </Link>
            <Link to="/contact" className="btn-outline px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wider uppercase">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
