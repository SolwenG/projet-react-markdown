import { openDB } from "idb"


export async function test() {
  const db = await openDB('MarkdownInterface', 1, {
    upgrade(db) {
      // Create a store of md files
      const store = db.createObjectStore('files', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      })
      // Create an index on the 'date' property of the objects.
      store.createIndex('date', 'date')
    },
  })

  const newDate = Date.now()

  // Add a file:
  await db.add('files', {
    title: 'README',
    date: newDate,
    body: 'Nikoumouk',
  })

  // Add multiple files in one transaction:
  {
    const tx = db.transaction('files', 'readwrite')
    await Promise.all([
      tx.store.add({
        title: 'AGENT 1',
        date: newDate,
        body: 'Test',
      }),
      tx.store.add({
        title: 'AGENT 2',
        date: newDate,
        body: 'Test 254',
      }),
      tx.done,
    ])
  }

  // Get all the files in date order:
  console.log(await db.getAllFromIndex('files', 'date'))

  // Add 'And, happy new year!' to all files on created within this function:
  {
    const tx = db.transaction('files', 'readwrite')
    const index = tx.store.index('date')

    for await (const cursor of index.iterate(newDate)) {
      const file = { ...cursor.value }
      file.body += ' And, happy new year!'
      cursor.update(file)
    }

    await tx.done
  }

  console.log(await db.getAllFromIndex('files', 'date'))
}
