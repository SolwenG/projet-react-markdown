import { Routes, Route } from 'react-router-dom'
import LeftDrawer from './components/left-drawer/LeftDrawer.jsx'
import MarkdownPage from './pages/MarkdownPage'
import CustomBlocksPage from './pages/CustomBlocksPage'
import GalleryPage from './pages/GalleryPage'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen bg-white">
      <LeftDrawer />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markdown" element={<MarkdownPage />} />
          <Route path="/custom-blocks" element={<CustomBlocksPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </main>
    </div>
  )
}
