import { useParams, Link, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

export default function PostDetail() {
  const { id } = useParams()
  const { posts, deletePost } = useBlog()
  const navigate = useNavigate()
  const post = posts.find(p => p.id === id)

  if (!post) return (
    <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h2>Post not found</h2>
      <Link to="/blog" style={{ color: 'var(--accent)' }}>← Back to blog</Link>
    </main>
  )

  const handleDelete = () => {
    if (confirm('Delete this post?')) { deletePost(id); navigate('/blog') }
  }

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 2rem' }}>
      <Link to="/blog" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>← Back to blog</Link>
      <div style={{ marginTop: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{post.emoji || '📝'}</div>
        <span style={{ background: '#fff0eb', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 500, padding: '4px 12px', borderRadius: '20px' }}>{post.category}</span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '1rem 0 0.5rem', lineHeight: 1.2 }}>{post.title}</h1>
        <div style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '2.5rem' }}>
          {post.date} · {post.readTime}
        </div>
        <div style={{ fontSize: '1.05rem', lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>{post.content}</div>
      </div>

      {/* Admin actions */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
        <Link to={`/admin?edit=${id}`} style={{
          padding: '0.5rem 1.25rem', borderRadius: '8px',
          border: '1px solid var(--border)', background: '#fff',
          fontSize: '0.875rem', fontWeight: 500
        }}>Edit post</Link>
        <button onClick={handleDelete} style={{
          padding: '0.5rem 1.25rem', borderRadius: '8px',
          border: '1px solid #fca5a5', background: '#fff5f5',
          color: '#dc2626', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer'
        }}>Delete</button>
      </div>
    </main>
  )
}