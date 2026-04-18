import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/admin', label: '✏️ Write' },
  ]

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
      padding: '0 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '64px'
    }}>
      <Link to="/" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)' }}>
        Study Lab 🔬
      </Link>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            fontWeight: 500,
            fontSize: '0.95rem',
            color: pathname === l.to ? 'var(--accent)' : 'var(--text)',
            borderBottom: pathname === l.to ? '2px solid var(--accent)' : '2px solid transparent',
            paddingBottom: '2px',
            transition: 'color 0.2s'
          }}>{l.label}</Link>
        ))}
      </div>
    </nav>
  )
}