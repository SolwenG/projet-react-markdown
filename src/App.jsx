import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CustomBlocks from './pages/CustomBlocks'
import { CUSTOM_BLOCKS_ROUTE } from './routes/custom-block'

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={CUSTOM_BLOCKS_ROUTE} element={<CustomBlocks />} />
      </Routes>
    </main>
  )
}