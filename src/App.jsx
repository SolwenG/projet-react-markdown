import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Markdown from './components/markdown/MarkdownFiles'

export default function App() {
  return (
    <main>
      <Markdown />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  )
}
