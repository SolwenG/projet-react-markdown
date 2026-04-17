import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Images from './pages/Images'

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Images />} />
      </Routes>
    </main>
  )
}
