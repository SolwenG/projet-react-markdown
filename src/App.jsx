import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </main>
  )
}
