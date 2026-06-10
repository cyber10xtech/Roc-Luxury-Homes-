import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ChevronDown, Phone, ExternalLink } from 'lucide-react'
import { contactInfo, properties } from '../data/properties'

const SYSTEM_PROMPT = `You are Victoria, a knowledgeable and warm real estate concierge for Roc Luxury Homes in Lagos, Nigeria. You have deep expertise in premium real estate, the Lagos property market, and Roc Luxury Homes' portfolio.

ABOUT ROC LUXURY HOMES:
- Premium luxury real estate developer in Lagos, Nigeria
- Specializes in 4-bedroom and 5-bedroom detached duplexes, apartments, villas, and maisonettes
- Key developments: Crystal Court Estate (Ikate), Royal Pine Estate, Riverside Court
- All properties located on Lagos Island, Lagos State, Nigeria
- Contact: 09034485730 | contact@rocluxuryhomes.com | No 23B Ikota GRA, Lagos
- WhatsApp: +234 903 448 5730
- Stats: 30,000+ satisfied clients, 24+ properties delivered

CURRENT PROPERTIES:
1. 5-Bedroom Fully Detached Duplex — Crystal Court Estate, Ikate (Featured, 5 beds, 5 baths, 580 sqm)
2. Contemporary 5-Bedroom Detached Duplex with BQ — Royal Pine Estate (5 beds, 5 baths, 520 sqm)
3. Executive 4-Bedroom Contemporary Detached Duplex — Crystal Court Estate (Popular, 4 beds, 4 baths, 420 sqm)
4. Exclusive 4-Bedroom Detached Villa (16 units) — Crystal Court Estate (4 beds, 4 baths, 450 sqm)
5. Riverside Court Luxury Apartment — Premium Collection (3 beds, 3 baths, 280 sqm)
6. 4-Bedroom Maisonette — Crystal Court Estate (4 beds, 3 baths, 380 sqm)

YOUR PERSONALITY:
- Warm, confident, and knowledgeable — like a trusted friend in the property world
- Use natural, conversational language. Never sound like a chatbot or AI assistant.
- Ask thoughtful follow-up questions to understand the buyer's needs
- Be specific about properties, Lagos neighbourhoods, and Nigerian real estate
- When you don't know pricing (we don't list prices), say "pricing is available on request" and offer to connect them with the team
- Guide buyers toward booking a site visit or calling/WhatsApp-ing the team

RESPONSE STYLE:
- Keep responses concise but informative (2-4 sentences ideally)
- No markdown formatting, bullet points, or headers — just natural conversational text
- Occasionally ask a question to keep the conversation going
- After 2-3 exchanges, if the person seems interested, naturally suggest connecting via WhatsApp or calling for a site visit
- Never say you're an AI or mention Claude/Anthropic

IMPORTANT: If asked about pricing, say prices are available on enquiry and offer to arrange a call. If asked about availability, confirm properties are currently available and recommend they contact the team to reserve. Always be helpful, never dismissive.`

const QUICK_REPLIES = [
  "What properties are available?",
  "Tell me about Crystal Court Estate",
  "How do I arrange a viewing?",
  "What's the buying process in Nigeria?",
]

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm Victoria, your personal property concierge at Roc Luxury Homes. Whether you're looking for your dream home or an investment opportunity in Lagos, I'm here to help. What brings you here today?",
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [showHandoff, setShowHandoff] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Show handoff after 3+ message exchanges
  useEffect(() => {
    const userMsgs = messages.filter(m => m.role === 'user').length
    if (userMsgs >= 2 && !showHandoff) {
      setTimeout(() => setShowHandoff(true), 1500)
    }
  }, [messages])

  async function sendMessage(text) {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setShowQuickReplies(false)
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        })
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      const reply = data.content?.[0]?.text || "I'm sorry, I couldn't process that. Please try again or contact us directly."

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having a little trouble right now. For immediate assistance, please call us on 09034485730 or send us a WhatsApp message — we'd love to help!",
      }])
    }
    setLoading(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Notification badge */}
        {!open && (
          <div className="glass-dark rounded-lg px-4 py-2.5 text-xs text-cream/70 max-w-[200px] text-right bubble-in shadow-2xl">
            <span className="text-gold font-medium">Victoria</span> is online · Ask me anything
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            open
              ? 'bg-obsidian-600 border border-white/10 rotate-0'
              : 'btn-gold'
          }`}
          aria-label="Open chat"
        >
          {open ? <X size={22} className="text-cream" /> : <MessageCircle size={22} />}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] glass-dark rounded-2xl shadow-2xl overflow-hidden flex flex-col bubble-in"
          style={{ height: '520px' }}>

          {/* Header */}
          <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                <span className="font-display text-gold text-sm font-semibold">V</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-obsidian-800" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-cream">Victoria</div>
              <div className="text-xs text-smoke">Property Concierge · Roc Luxury Homes</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-smoke hover:text-cream transition-colors">
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} bubble-in`}
              >
                <div
                  className={`max-w-[82%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gold text-obsidian font-medium rounded-br-sm'
                      : 'glass text-cream/90 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start bubble-in">
                <div className="glass rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold typing-dot" />
                </div>
              </div>
            )}

            {/* Handoff card */}
            {showHandoff && !loading && (
              <div className="glass rounded-xl p-4 bubble-in">
                <p className="text-xs text-smoke mb-3">Ready to take the next step?</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}?text=Hi Victoria! I've been chatting on the website and would love to know more about your properties.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 btn-gold px-4 py-2.5 rounded-lg text-xs font-semibold justify-center"
                  >
                    <WhatsAppIcon />
                    Continue on WhatsApp
                  </a>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-2 btn-outline px-4 py-2.5 rounded-lg text-xs justify-center"
                  >
                    <Phone size={12} />
                    Call {contactInfo.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && messages.length === 1 && (
              <div className="flex flex-col gap-2 mt-1">
                {QUICK_REPLIES.map(r => (
                  <button
                    key={r}
                    onClick={() => sendMessage(r)}
                    className="btn-outline text-left text-xs px-3 py-2 rounded-lg text-cream/70 hover:text-cream transition-all"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/5">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about properties..."
                className="flex-1 input-dark rounded-xl px-4 py-2.5 text-sm"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl btn-gold flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-smoke/40">Powered by Roc Luxury AI · Messages are confidential</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
