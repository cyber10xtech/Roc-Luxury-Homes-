import { Link } from 'react-router-dom'
import { Instagram, Phone, Mail, MapPin } from 'lucide-react'
import { contactInfo } from '../data/properties'

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z"/>
  </svg>
)

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-sm bg-gold flex items-center justify-center">
                <span className="font-display font-bold text-obsidian text-lg leading-none">R</span>
              </div>
              <div>
                <div className="font-display font-semibold text-cream text-sm tracking-wide">Roc Luxury Homes</div>
                <div className="text-smoke text-[10px] tracking-[0.2em] uppercase">Premium Real Estate, Lagos</div>
              </div>
            </div>
            <p className="text-smoke text-sm leading-relaxed max-w-xs mb-6">
              Sustainable living, luxury, and affordable homes transforming urban landscapes across Lagos. Building Africa with integrity, quality, and customer focus.
            </p>
            <div className="flex items-center gap-4">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-smoke hover:text-gold hover:border-gold/40 transition-colors">
                <Instagram size={14} />
              </a>
              <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-smoke hover:text-gold hover:border-gold/40 transition-colors">
                <TikTokIcon />
              </a>
              <a href={contactInfo.pinterest} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-smoke hover:text-gold hover:border-gold/40 transition-colors">
                <PinterestIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-smoke mb-5">Discover</div>
            <div className="flex flex-col gap-3">
              {['Home', 'Properties', 'About Us', 'Blog', 'Contact'].map(l => (
                <Link
                  key={l}
                  to={l === 'Home' ? '/' : `/${l.toLowerCase().replace(' ', '-')}`}
                  className="text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-smoke mb-5">Contact</div>
            <div className="flex flex-col gap-4">
              <a href={`tel:${contactInfo.phone}`} className="flex items-start gap-3 text-sm text-cream/60 hover:text-gold transition-colors">
                <Phone size={14} className="mt-0.5 flex-shrink-0" />
                <span>{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-start gap-3 text-sm text-cream/60 hover:text-gold transition-colors">
                <Mail size={14} className="mt-0.5 flex-shrink-0" />
                <span>{contactInfo.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-cream/60">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-line mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-smoke text-xs">© 2024–2026 Roc Luxury Homes Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-smoke text-xs cursor-pointer hover:text-cream transition-colors">Privacy Policy</span>
            <span className="text-smoke text-xs cursor-pointer hover:text-cream transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
