import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.5rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{post.emoji || '📝'}</div>
        <span style={{
          background: '#fff0eb', color: 'var(--accent)',
          fontSize: '0.75rem', fontWeight: 500,
          padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.5px'
        }}>{post.category}</span>
        <h3 style={{ margin: '0.75rem 0 0.5rem', fontSize: '1.15rem', fontFamily: 'Playfair Display, serif', lineHeight: 1.3 }}>
          {post.title}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{post.excerpt}</p>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted)', display: 'flex', gap: '1rem' }}>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}