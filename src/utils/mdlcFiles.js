import { saveAs } from 'file-saver'

export function exportBlock(block) { 
    const json = JSON.stringify(block)
    const blob = new Blob([json], { type: 'application/json' })
    saveAs(blob, `${block.name}.part.mdlc`)
}

export function exportAllBlocks(blocks) {
  const json = JSON.stringify(blocks, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  saveAs(blob, 'blocks.parts.mdlc')
}

export function validateMdlcFile(file) {
  if (!file.name.endsWith('.mdlc')) {
    throw new Error('Le fichier doit avoir l\'extension .mdlc')
  }
}

export function parseMdlcFile(content) {
  const data = JSON.parse(content)
  if (Array.isArray(data)) return data
  if (data && data.id && data.name) return [data]
  throw new Error('Format de fichier invalide')
}

export function readMdlcFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'))
    reader.readAsText(file)
  })
}

export function importBlocksFromFile(content, existingBlocks) {
  const importedBlocks = parseMdlcFile(content)

  const existingIds = new Set(existingBlocks.map((b) => b.id))
  const existingShortcuts = new Set(existingBlocks.map((b) => b.shortcut).filter(Boolean))

  const newBlocks = importedBlocks
    .filter((b) => !existingIds.has(b.id))
    .map((b) => {
      if (b.shortcut && existingShortcuts.has(b.shortcut)) {
        return { ...b, shortcut: '' }
      }
      return b
    })

  return newBlocks
}