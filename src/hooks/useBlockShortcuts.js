import { useEffect } from 'react'
import { useSelector } from 'react-redux'


export function useBlockShortcuts(onInsert) {
  const blocks = useSelector((state) => state.customBlocks.blocks)

  useEffect(() => {
    function handleKeyDown(e) {
      const parts = []
      if (e.ctrlKey) parts.push('ctrl')
      if (e.altKey) parts.push('alt')
      if (e.shiftKey) parts.push('shift')
      if (!['Control', 'Alt', 'Shift'].includes(e.key)) {
        parts.push(e.key.toLowerCase())
      }

      const combo = parts.join(' + ')
      const block = blocks.find((b) => b.shortcut === combo)

      if (block) {
        e.preventDefault()
        onInsert(block.description)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [blocks, onInsert])
}