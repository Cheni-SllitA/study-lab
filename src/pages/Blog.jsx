import { useState } from 'react'
import { useBlog } from '../context/BlogContext'
import PostCard from '../components/PostCard'

export default function Blog() {
  const { posts } = useBlog()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(posts.map(p => p.category))]

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>All Posts</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>{posts.length} articles and counting</p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '0.75rem 1.25rem',
          border: '1px solid var(--border)', borderRadius: '12px',
          fontSize: '1rem', marginBottom: '1.5rem',
          background: '#fff', outline: 'none', fontFamily: 'inherit'
        }}
      />

      {/* Categories */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '0.4rem 1.1rem', borderRadius: '20px', border: '1px solid var(--border)',
            background: activeCategory === cat ? 'var(--accent)' : '#fff',
            color: activeCategory === cat ? '#fff' : 'var(--text)',
            cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, fontSize: '0.875rem'
          }}>{cat}</button>
        ))}
      </div>

      {/* Posts grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filtered.length > 0
          ? filtered.map(post => <PostCard key={post.id} post={post} />)
          : <p style={{ color: 'var(--muted)', gridColumn: '1/-1' }}>No posts match your search.</p>
        }
      </div>
    </main>
  )
}