import { useState, useRef } from 'react'
import { validateMdlcFile, readMdlcFile, importBlocksFromFile } from '../../../utils/mdlcFiles'

export default function BlockImportModal({ isOpen, onImport, onClose, existingBlocks }) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef()

  async function handleFile(file) {
    setError('')
    try {
      validateMdlcFile(file)
      const content = await readMdlcFile(file)
      const newBlocks = importBlocksFromFile(content, existingBlocks)
      if (newBlocks.length === 0) {
        setError('Aucun nouveau bloc à importer (tous déjà présents)')
        return
      }
      onImport(newBlocks)
      onClose()
    } catch (e) {
      setError(e.message)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Importer des blocs</h2>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
          onClick={() => inputRef.current.click()}
          className={`
            border-2 border-dashed rounded-xl px-6 py-12 text-center cursor-pointer transition-colors
            ${dragging ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
          `}
        >
          <p className="text-sm text-gray-500">
            Glisse un fichier <span className="text-gray-900 font-medium">.mdlc</span> ici
          </p>
          <p className="text-xs text-gray-400 mt-2">ou clique pour parcourir</p>
          <input ref={inputRef} type="file" accept=".mdlc" onChange={(e) => { const f = e.target.files[0]; if (f) handleFile(f) }} className="hidden" />
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mt-4">
            {error}
          </p>
        )}

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
