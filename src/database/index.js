import { openDB } from 'idb'

export const database = await openDB('MarkdownInterface', 1, {
  upgrade(db) {

    // Store des fichiers Markdown
    const markdownStore = db.createObjectStore('files', {
      keyPath: 'id',
      autoIncrement: true,
    })
    markdownStore.createIndex('date', 'date')

    // Store des blocs personnalisés 
    db.createObjectStore('customBlocks', {
      keyPath: 'id',
    })
  },
})
