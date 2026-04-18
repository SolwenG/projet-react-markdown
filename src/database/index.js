import { openDB } from 'idb'

export const database = await openDB('MarkdownInterface', 5, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('files')) {
      const markdownStore = db.createObjectStore('files', {
        keyPath: 'id',
        autoIncrement: true,
      })
      markdownStore.createIndex('name', 'name')
    }

    if (!db.objectStoreNames.contains('images')) {
      const imageStore = db.createObjectStore('images', {
        keyPath: 'id',
        autoIncrement: true,
      })

      imageStore.createIndex('name', 'name')
    }

    if (!db.objectStoreNames.contains('customBlocks')) {
      db.createObjectStore('customBlocks', {
        keyPath: 'id',
      })
    }

    if (!db.objectStoreNames.contains('folders')) {
      const folderStore = db.createObjectStore('folders', {
        keyPath: 'id',
        autoIncrement: true,
      })
      folderStore.createIndex('name', 'name')
      folderStore.createIndex('parentId', 'parentId')
    }
  },
})
