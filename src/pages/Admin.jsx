import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

const EMOJIS = ['📚','✏️','💡','🎯','🔬','🌸','⭐','🎨','🧠','📖','✨','🌿']

export default function Admin() {
  const { posts, addPost, updatePost } = useBlog()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const editPost = editId ? posts.find(p => p.id === editId) : null

  const [form, setForm] = useState({
    title: '', category: '', excerpt: '', content: '', readTime: '3 min read', emoji: '📚'
  })

  useEffect(() => {
    if (editPost) setForm({ title: editPost.title, category: editPost.category, excerpt: editPost.excerpt, content: editPost.content, readTime: editPost.readTime, emoji: editPost.emoji || '📚' })
  }, [editId])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = () => {
    if (!form.title || !form.content) return alert('Title and content are required!')
    if (editPost) {
      updatePost(editId, form); navigate(`/post/${editId}`)
    } else {
      const id = addPost(form); navigate(`/post/${id}`)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    border: '1px solid var(--border)', borderRadius: '10px',
    fontSize: '1rem', fontFamily: 'inherit',
    background: '#fff', outline: 'none', marginBottom: '1.25rem'
  }

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{editPost ? 'Edit post' : 'Write a new post'}</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Share your thoughts with the world ✨</p>

      <label style={{ fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Pick an emoji</label>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {EMOJIS.map(e => (
          <button key={e} onClick={() => set('emoji', e)} style={{
            fontSize: '1.5rem', background: form.emoji === e ? '#fff0eb' : 'transparent',
            border: form.emoji === e ? '2px solid var(--accent)' : '2px solid transparent',
            borderRadius: '8px', padding: '4px 8px', cursor: 'pointer'
          }}>{e}</button>
        ))}
      </div>

      <label style={{ fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Title *</label>
      <input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Give your post a great title..." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Category</label>
          <input style={{ ...inputStyle, marginBottom: 0 }} value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Study Tips" />
        </div>
        <div>
          <label style={{ fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Read time</label>
          <input style={{ ...inputStyle, marginBottom: 0 }} value={form.readTime} onChange={e => set('readTime', e.target.value)} placeholder="e.g. 4 min read" />
        </div>
      </div>

      <div style={{ height: '1.25rem' }} />

      <label style={{ fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Short excerpt</label>
      <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="One or two sentences that hook the reader..." />

      <label style={{ fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Content *</label>
      <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '300px' }} value={form.content} onChange={e => set('content', e.target.value)} placeholder="Write your full post here... Use double line breaks for paragraphs." />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <button onClick={handleSubmit} style={{
          background: 'var(--accent)', color: '#fff', border: 'none',
          padding: '0.8rem 2rem', borderRadius: '10px',
          fontSize: '1rem', fontWeight: 500, cursor: 'pointer'
        }}>{editPost ? 'Save changes' : 'Publish post 🚀'}</button>
        <button onClick={() => navigate(-1)} style={{
          background: '#fff', color: 'var(--text)', border: '1px solid var(--border)',
          padding: '0.8rem 1.5rem', borderRadius: '10px',
          fontSize: '1rem', cursor: 'pointer'
        }}>Cancel</button>
      </div>
    </main>
  )
}