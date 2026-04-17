import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function useBlockShortcuts(onInsert) {
  const blocks = useSelector((state) => state.customBlocks.blocks)

  useEffect(() => {
    function handleKeyDown(e) {
      const pressedKeys = []
      if (e.ctrlKey) pressedKeys.push('ctrl')
      if (e.altKey) pressedKeys.push('alt')
      if (e.shiftKey) pressedKeys.push('shift')
      if (!['Control', 'Alt', 'Shift'].includes(e.key)) {
        pressedKeys.push(e.key.toLowerCase())
      }

      const combo = pressedKeys.join(' + ')
      const block = blocks.find((b) => b.shortcut === combo)

      if (block) {
        e.preventDefault()
        onInsert(block.content)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [blocks, onInsert])
}