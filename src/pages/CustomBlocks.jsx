import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import {
  createBlock,
  fetchBlocks,
  deleteBlockAction,
  editBlock,
  importBlocks,
} from '../store/slices/customBlocks/customBlocksSlice'
import {
  exportBlock,
  exportAllBlocks,
  validateMdlcFile,
  readMdlcFile,
  importBlocksFromFile,
} from '../utils/mdlcFiles'
import { useBlockShortcuts } from '../hooks/useBlockShortcuts'

const RESERVED_SHORTCUTS = [
  'ctrl + t', 'ctrl + w', 'ctrl + r', 'ctrl + n', 'ctrl + l',
  'ctrl + d', 'ctrl + h', 'ctrl + j', 'ctrl + p', 'ctrl + s',
  'ctrl + f', 'ctrl + u', 'ctrl + shift + t', 'ctrl + shift + n', 'alt + f4',
]

function captureShortcut(e, onCapture, onWarning) {
  e.preventDefault()
  const parts = []
  if (e.ctrlKey) parts.push('ctrl')
  if (e.altKey) parts.push('alt')
  if (e.shiftKey) parts.push('shift')
  if (!['Control', 'Alt', 'Shift'].includes(e.key)) {
    parts.push(e.key.toLowerCase())
  }
  if (parts.length > 1) {
    const combo = parts.join(' + ')
    if (RESERVED_SHORTCUTS.includes(combo)) {
      onWarning('⚠️ Ce raccourci est réservé par le navigateur')
      onCapture('')
    } else {
      onWarning('')
      onCapture(combo)
    }
  }
}

export default function CustomBlocks() {
  const dispatch = useDispatch()
  const blocks = useSelector((state) => state.customBlocks.blocks)
  const error = useSelector((state) => state.customBlocks.error)

  const [text, setText] = useState('')
  const [editingBlock, setEditingBlock] = useState(null)
  const [shortcutWarning, setShortcutWarning] = useState('')
  const fileInputRef = useRef()

  useEffect(() => {
    dispatch(fetchBlocks())
  }, [])

  useBlockShortcuts((content) => {
    setText((prev) => prev + content)
  })

  async function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    try {
      validateMdlcFile(file)
      const content = await readMdlcFile(file)
      const newBlocks = importBlocksFromFile(content, blocks)
      if (newBlocks.length === 0) {
        alert('Aucun nouveau bloc à importer (doublons détectés)')
        return
      }
      await dispatch(importBlocks(newBlocks))
      dispatch(fetchBlocks())
      alert(`${newBlocks.length} bloc(s) importé(s) avec succès`)
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleSaveEdit() {
    const result = await dispatch(editBlock(editingBlock))
    if (!result.error) {
      await dispatch(fetchBlocks())
      setEditingBlock(null)
      setShortcutWarning('')
    }
  }

  

  return (
    <div style={{ padding: '20px' }}>

      <h2>Tests CRUD</h2>
      <button onClick={() => dispatch(createBlock({ name: 'Test', description: 'Contenu test', shortcut: 'ctrl + i' }))}>
        Créer un bloc test
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>{blocks.length} bloc(s) dans la BDD</p>

      {blocks.map((block) => (
        <div key={block.id} style={{ marginBottom: '8px' }}>
          <span>{block.name} — {block.shortcut}</span>
          <button onClick={() => { setEditingBlock(block); setShortcutWarning('') }}>Modifier</button>
          <button onClick={() => dispatch(deleteBlockAction(block.id))}>Supprimer</button>
          <button onClick={() => exportBlock(block)}>Exporter</button>
        </div>
      ))}

      {editingBlock && (
        <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
          <h3>Modifier le bloc</h3>
          <div>
            <label>Nom</label>
            <input
              value={editingBlock.name}
              onChange={(e) => setEditingBlock({ ...editingBlock, name: e.target.value })}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={editingBlock.description}
              onChange={(e) => setEditingBlock({ ...editingBlock, description: e.target.value })}
            />
          </div>
          <div>
            <label>Raccourci</label>
            <input
              value={editingBlock.shortcut}
              onKeyDown={(e) => captureShortcut(
                e,
                (combo) => setEditingBlock({ ...editingBlock, shortcut: combo }),
                setShortcutWarning
              )}
              onChange={() => {}}
              readOnly
              placeholder="Appuie sur une combinaison de touches..."
            />
            {shortcutWarning && <p style={{ color: 'red' }}>{shortcutWarning}</p>}
          </div>
          <button onClick={handleSaveEdit}>Sauvegarder</button>
          <button onClick={() => { setEditingBlock(null); setShortcutWarning('') }}>Annuler</button>
        </div>
      )}

      <hr />
      <h2>Tests Export</h2>
      <button onClick={() => exportAllBlocks(blocks)} disabled={blocks.length === 0}>
        Exporter tous (.parts.mdlc)
      </button>

      <hr />
      <h2>Tests Import</h2>
      <button onClick={() => fileInputRef.current.click()}>
        Importer un fichier .mdlc
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".mdlc"
        style={{ display: 'none' }}
        onChange={handleImport}
      />

      <hr />
      <h2>Test Raccourcis</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Clique ici puis tape un raccourci..."
        style={{ width: '100%', height: '100px' }}
      />

    </div>
  )
}