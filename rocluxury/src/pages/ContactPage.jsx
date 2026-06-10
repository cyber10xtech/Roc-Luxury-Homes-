import { useState } from 'react'
import { Phone, Mail, MapPin, Instagram, CheckCircle, ExternalLink } from 'lucide-react'
import { contactInfo } from '../data/properties'
import { useReveal } from '../hooks/useReveal'

const WhatsAppIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    // Send to WhatsApp as fallback
    const msg = `Hi! My name is ${form.name}. I'm interested in ${form.interest || 'your properties'}. ${form.message} Contact: ${form.phone || form.email}`
    setTimeout(() => {
      window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
      setSubmitted(true)
      setSubmitting(false)
    }, 800)
  }

  return (
    <main className="min-h-screen pt-24">
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="reveal" ref={useReveal()}>
          <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Get in Touch</div>
          <h1 className="font-display text-5xl md:text-6xl text-cream font-medium mb-4">
            Contact <em className="gold-text">Our Team</em>
          </h1>
          <p className="text-smoke text-lg max-w-xl">
            Our property specialists are ready to help you find your perfect home.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact cards */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {[
              {
                icon: Phone,
                label: 'Call Us',
                value: contactInfo.phone,
                href: `tel:${contactInfo.phone}`,
                sub: 'Mon – Sat, 8am – 6pm',
              },
              {
                icon: Mail,
                label: 'Email',
                value: contactInfo.email,
                href: `mailto:${contactInfo.email}`,
                sub: 'We respond within 24 hours',
              },
              {
                icon: MapPin,
                label: 'Office',
                value: contactInfo.address,
                href: '#',
                sub: contactInfo.estate,
              },
            ].map(item => (
              <div key={item.label} className="reveal glass rounded-xl p-6" ref={useReveal()}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-xs tracking-widest uppercase text-smoke mb-1">{item.label}</div>
                    <a href={item.href} className="text-cream text-sm font-medium hover:text-gold transition-colors">{item.value}</a>
                    <div className="text-smoke text-xs mt-1">{item.sub}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <div className="reveal" ref={useReveal()}>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=Hi! I'd like to enquire about your properties.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl p-5 hover:bg-[#25D366]/15 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center">
                  <WhatsAppIcon size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-cream text-sm font-medium">Chat on WhatsApp</div>
                  <div className="text-smoke text-xs">Fastest way to reach us</div>
                </div>
                <ExternalLink size={14} className="text-smoke group-hover:text-[#25D366] transition-colors" />
              </a>
            </div>

            {/* Social */}
            <div className="reveal" ref={useReveal()}>
              <div className="text-xs tracking-widest uppercase text-smoke mb-3">Follow Us</div>
              <div className="flex gap-3">
                <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 glass px-4 py-2 rounded-lg text-xs text-cream/70 hover:text-gold transition-colors">
                  <Instagram size={14} /> Instagram
                </a>
                <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 glass px-4 py-2 rounded-lg text-xs text-cream/70 hover:text-gold transition-colors">
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 reveal" ref={useReveal()}>
            {submitted ? (
              <div className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                <CheckCircle size={48} className="text-gold mb-4" />
                <h3 className="font-display text-2xl text-cream font-medium mb-3">Message Sent!</h3>
                <p className="text-smoke text-sm mb-6">We've opened WhatsApp with your message. Our team will respond shortly.</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline px-6 py-2.5 rounded-sm text-sm">
                  Send Another
                </button>
              </div>
            ) : (
              <div className="glass rounded-2xl p-8">
                <h2 className="font-display text-2xl text-cream font-medium mb-2">Send a Message</h2>
                <p className="text-smoke text-sm mb-8">We'll get back to you within 24 hours.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs tracking-widest uppercase text-smoke mb-2 block">Full Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="input-dark w-full rounded-lg px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase text-smoke mb-2 block">Phone</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+234..."
                        className="input-dark w-full rounded-lg px-4 py-3 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs tracking-widest uppercase text-smoke mb-2 block">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="input-dark w-full rounded-lg px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs tracking-widests uppercase text-smoke mb-2 block">I'm Interested In</label>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className="input-dark w-full rounded-lg px-4 py-3 text-sm"
                    >
                      <option value="">Select a property type</option>
                      <option>5-Bedroom Duplex</option>
                      <option>4-Bedroom Duplex</option>
                      <option>4-Bedroom Villa</option>
                      <option>3-Bedroom Apartment</option>
                      <option>4-Bedroom Maisonette</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs tracking-widests uppercase text-smoke mb-2 block">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us more about what you're looking for..."
                      className="input-dark w-full rounded-lg px-4 py-3 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold py-4 rounded-lg text-sm font-semibold tracking-wider uppercase disabled:opacity-60"
                  >
                    {submitting ? 'Sending...' : 'Send via WhatsApp'}
                  </button>

                  <p className="text-smoke text-xs text-center">
                    Your message will open in WhatsApp for instant delivery to our team.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
