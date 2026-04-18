import { Routes, Route } from 'react-router-dom'
import { BlogProvider } from './context/BlogContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import PostDetail from './pages/PostDetail'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BlogProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BlogProvider>
  )
}