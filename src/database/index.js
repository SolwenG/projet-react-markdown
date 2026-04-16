import { openDB } from 'idb'

export const database = await openDB('MarkdownInterface', 2, {
  upgrade(db) {
    // Create a store of md files
    const markdownStore = db.createObjectStore('files', {
      // The 'id' property of the object will be the key.
      keyPath: 'id',
      // If it isn't explicitly set, create a value by auto incrementing.
      autoIncrement: true,
    })
    // Create an index on the 'date' property of the objects.
    markdownStore.createIndex('date', 'date')

    const imageStore = db.createObjectStore('images', {
      keyPath: 'id',
      autoIncrement: true,
    })

    imageStore.createIndex('name', 'name')
  },
})
