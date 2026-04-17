import { useState, useRef, useEffect } from 'react'

export default function BlockRow({ block, onEdit, onDelete, onExport }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef()

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="grid grid-cols-[2fr_3fr_1fr_40px] items-center px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      <span className="text-sm text-gray-900 font-medium">{block.name}</span>
      <span className="text-sm text-gray-500 truncate pr-4">{block.description}</span>
      <span className="text-sm text-gray-600">{block.shortcut || '—'}</span>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="text-gray-400 hover:text-gray-900 px-2 py-1 rounded transition-colors"
        >
          •••
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-36 py-1">
            <button
              onClick={() => { onExport(block); setMenuOpen(false) }}
              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Exporter
            </button>
            <button
              onClick={() => { onEdit(block); setMenuOpen(false) }}
              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Modifier
            </button>
            <button
              onClick={() => { onDelete(block.id); setMenuOpen(false) }}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
