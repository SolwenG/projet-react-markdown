import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ImageList from './components/gallery/list/ImageList'

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/gallery' element={<ImageList />} />
      </Routes>
    </main>
  )
}
