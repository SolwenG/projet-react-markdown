import { useState } from 'react'

export default function RenameForm({ name, onSubmit, onCancel }) {
  const [newName, setNewName] = useState(name)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(newName)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        autoFocus
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="px-2 py-1 rounded-sm bg-white text-sm"
      />
      <div className="flex gap-2 justify-center">
        <button
          type="submit"
          className="cursor-pointer px-2 py-1 bg-white text-sm rounded-sm hover:bg-gray-300 hover:text-black"
        >
          OK
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer px-2 py-1 bg-white text-sm rounded-sm hover:bg-gray-300 hover:text-black"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}
