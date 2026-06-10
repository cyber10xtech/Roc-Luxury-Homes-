import { blogPosts } from '../data/properties'
import { useReveal } from '../hooks/useReveal'
import { ArrowRight } from 'lucide-react'

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="reveal" ref={useReveal()}>
          <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Insights & News</div>
          <h1 className="font-display text-5xl md:text-6xl text-cream font-medium mb-4">
            Real Estate <em className="gold-text">Insights</em>
          </h1>
          <p className="text-smoke text-lg max-w-xl">
            Expert perspectives on the Nigerian property market, buying guides, and investment insights.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <article
              key={post.id}
              className="reveal glass rounded-xl overflow-hidden group cursor-pointer prop-card"
              ref={useReveal()}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="tag-pill">{post.category}</span>
                  <span className="text-smoke text-xs">{post.readTime} read</span>
                </div>
                <h2 className="font-display text-cream text-lg font-medium leading-snug mb-3 group-hover:text-gold transition-colors">
                  {post.title}
                </h2>
                <p className="text-smoke text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-smoke text-xs">{post.date}</span>
                  <span className="text-gold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
