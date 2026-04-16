import { useDispatch, useSelector } from 'react-redux'
import { createBlock, fetchBlocks, deleteBlockAction } from '../store/slices/customBlocks/customBlocksSlice'
import { useBlockShortcuts } from '../hooks/useBlockShortcuts'
import { useEffect, useState } from 'react'

export default function CustomBlocks() {
  const dispatch = useDispatch()
  const blocks = useSelector((state) => state.customBlocks.blocks)
  const [text, setText] = useState('')

  useEffect(() => {
    dispatch(fetchBlocks())
  }, [])

  useBlockShortcuts((content) => {
    setText((prev) => prev + content)
  })

  return (
    <div>
      <button onClick={() => dispatch(createBlock({ name: 'Test', description: 'Contenu test', shortcut: 'ctrl + i' }))}>
        Créer un bloc test
      </button>
      <p>{blocks.length} bloc(s) dans la BDD</p>
      {blocks.map((block) => (
        <div key={block.id}>
          <span>{block.name}</span>
          <button onClick={() => dispatch(deleteBlockAction(block.id))}>Supprimer</button>
        </div>
      ))}

      <hr />
      <p>Test raccourcis :</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Clique ici puis tape ctrl + i..."
        className="w-full h-32 border p-2"
      />
    </div>
  )
}