import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { contactInfo } from '../data/properties'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/properties', label: 'Properties' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-sm bg-gold flex items-center justify-center">
              <span className="font-display font-bold text-obsidian text-lg leading-none">R</span>
            </div>
            <div>
              <div className="font-display font-semibold text-cream text-sm tracking-wide leading-none">Roc Luxury</div>
              <div className="text-smoke text-[10px] tracking-[0.2em] uppercase leading-none mt-0.5">Homes</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  location.pathname === l.to
                    ? 'text-gold'
                    : 'text-cream/70 hover:text-cream'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-2 text-sm text-cream/60 hover:text-gold transition-colors"
            >
              <Phone size={14} />
              <span>{contactInfo.phone}</span>
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-5 py-2 rounded-sm text-sm"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-cream/70 hover:text-cream transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 glass-dark flex flex-col pt-20 px-8">
          <div className="flex flex-col gap-6 mt-8">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`font-display text-3xl transition-colors ${
                  location.pathname === l.to ? 'gold-text' : 'text-cream'
                }`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto mb-12 flex flex-col gap-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 text-cream/60"
            >
              <Phone size={16} />
              {contactInfo.phone}
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-6 py-3 rounded-sm text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </>
  )
}
