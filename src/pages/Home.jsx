import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import PostCard from '../components/PostCard'

export default function Home() {
  const { posts } = useBlog()
  const featured = posts.slice(0, 3)

  return (
    <main>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #fff8f4 0%, #f0f6ff 100%)',
        padding: '5rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--border)'
      }}>
        <p style={{ color: 'var(--accent)', fontWeight: 500, letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>WELCOME TO</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          Study Lab 🔬
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '520px', margin: '0 auto 2rem' }}>
          A cosy corner for study tips, personal favourites, and everything I find interesting.
        </p>
        <Link to="/blog" style={{
          background: 'var(--accent)', color: '#fff',
          padding: '0.8rem 2rem', borderRadius: '50px',
          fontWeight: 500, fontSize: '0.95rem',
          display: 'inline-block', transition: 'opacity 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Read the blog →</Link>
      </section>

      {/* Featured Posts */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Latest posts</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {featured.map(post => <PostCard key={post.id} post={post} />)}
        </div>
        {posts.length > 3 && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/blog" style={{ color: 'var(--accent)', fontWeight: 500 }}>View all posts →</Link>
          </div>
        )}
      </section>
    </main>
  )
}