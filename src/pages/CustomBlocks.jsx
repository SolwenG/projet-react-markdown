import { useDispatch, useSelector } from 'react-redux'
import { createBlock, fetchBlocks, deleteBlockAction } from '../store/slices/customBlocks/customBlocksSlice'
import { useEffect } from 'react'

export default function CustomBlocks() {
  const dispatch = useDispatch()
  const blocks = useSelector((state) => state.customBlocks.blocks)

  useEffect(() => {
    dispatch(fetchBlocks())
  }, [])

  return (
    <div>
      <button onClick={() => dispatch(createBlock({ name: 'Test', description: 'Contenu test', shortcut: 'ctrl + t' }))}>
        Créer un bloc test
      </button>
      <p>{blocks.length} bloc(s) dans la BDD</p>
      {blocks.map((block) => (
        <div key={block.id}>
          <span>{block.name}</span>
          <button onClick={() => dispatch(deleteBlockAction(block.id))}>Supprimer</button>
        </div>
      ))}
    </div>
  )
}