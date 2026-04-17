import { useState } from 'react'

const isMac = navigator.platform.toUpperCase().includes('MAC')

const RESERVED_SHORTCUTS = isMac ? [
  'meta+t', 'meta+w', 'meta+r', 'meta+n', 'meta+l',
  'meta+d', 'meta+h', 'meta+s', 'meta+f',
  'meta+shift+t', 'meta+shift+n',
] : [
  'ctrl+t', 'ctrl+w', 'ctrl+r', 'ctrl+n', 'ctrl+l',
  'ctrl+d', 'ctrl+h', 'ctrl+j', 'ctrl+s', 'ctrl+f',
  'ctrl+u', 'ctrl+shift+t', 'ctrl+shift+n', 'alt+f4'
]

export function useShortcutInput(initialValue = '') {
  const [shortcut, setShortcut] = useState(initialValue)
  const [shortcutWarning, setShortcutWarning] = useState('')

  function handleShortcutKeyDown(e) {
    e.preventDefault()
    if (e.key === 'Escape' || e.key === 'Backspace') { setShortcut(''); return }
    if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return

    const pressedKeys = []
    if (e.ctrlKey) pressedKeys.push('ctrl')
    if (e.altKey) pressedKeys.push('alt')
    if (e.shiftKey) pressedKeys.push('shift')
    pressedKeys.push(e.key.toLowerCase())

    const combo = pressedKeys.join('+')
    if (RESERVED_SHORTCUTS.includes(combo)) {
      setShortcut('')
      setShortcutWarning(`"${combo}" est réservé par le navigateur`)
      return
    }
    setShortcutWarning('')
    setShortcut(combo)
  }

  function resetShortcut(value = '') {
    setShortcut(value)
    setShortcutWarning('')
  }

  return { shortcut, shortcutWarning, handleShortcutKeyDown, resetShortcut }
}