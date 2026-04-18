import { createContext, useContext, useState, useEffect } from 'react'

const BlogContext = createContext()

const SAMPLE_POSTS = [
  {
    id: '1',
    title: 'How I Study for Exams Without Burning Out',
    category: 'Study Tips',
    excerpt: 'Learning how to pace yourself is the real secret behind good grades — not pulling all-nighters.',
    content: `Learning how to pace yourself is the real secret behind good grades.

Here's what actually works for me:

**The Pomodoro Technique** — 25 minutes of focused study, 5 minute break. After 4 rounds, take a 20 minute break. It sounds simple, but it genuinely changes how much you absorb.

**Active recall over passive reading** — Instead of rereading your notes, close them and try to write down everything you remember. It's harder, and that's exactly the point.

**Spaced repetition** — Don't cram. Study a bit each day, spacing out the topics. Your brain consolidates memories during sleep, so short daily sessions beat a 6-hour marathon.

**Environment matters** — Find your spot. Same chair, same playlist (or silence), same ritual. Your brain starts to associate that space with focus.

Most importantly: rest is not wasted time. Sleep is when memories get locked in.`,
    date: '2024-03-10',
    readTime: '4 min read',
    emoji: '📚'
  },
  {
    id: '2',
    title: 'My Favourite Stationery for Taking Beautiful Notes',
    category: 'Favourites',
    excerpt: 'Good stationery doesn\'t make you smarter — but it does make studying feel like less of a chore.',
    content: `Good stationery doesn't make you smarter — but it absolutely makes studying feel less like a chore.

Here's what's always on my desk:

**Muji 0.5mm gel pens** — smooth, consistent, perfect for writing neat notes without hand fatigue.

**Leuchtturm1917 notebook** — the dotted grid is perfect for diagrams, timelines, and mind maps. The page numbering saves you from flipping endlessly.

**Zebra mildliners** — pastel highlighters that don't bleed through pages and don't hurt your eyes.

**Post-it page markers** — I tab every chapter I'm studying so I can flip back instantly during revision.

**A simple timer** — physical, not your phone. Keeps you honest with your study intervals.

Invest in tools that make the ritual enjoyable, and the study sessions will follow.`,
    date: '2024-03-15',
    readTime: '3 min read',
    emoji: '✏️'
  }
]

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('studylab-posts')
    return saved ? JSON.parse(saved) : SAMPLE_POSTS
  })

  useEffect(() => {
    localStorage.setItem('studylab-posts', JSON.stringify(posts))
  }, [posts])

  const addPost = (post) => {
    const newPost = { ...post, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] }
    setPosts(prev => [newPost, ...prev])
    return newPost.id
  }

  const updatePost = (id, updated) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p))
  }

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlog = () => useContext(BlogContext)