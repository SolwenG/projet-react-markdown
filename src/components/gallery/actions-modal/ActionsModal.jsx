import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeImage, renameImage } from '../../../store/images/imagesSlice'

export default function ActionsModal({ id, name, src }) {
  const dispatch = useDispatch()
  const [isRenaming, setIsRenaming] = useState(false)
  const [newName, setNewName] = useState(name)

  const handleExport = () => {
    // base64 files are structured like "data:image/extension;base64,string"
    // (ex: {name: 'image', base64: 'data:image/webp;base64,Ukldsfsghfdh...})
    const extension = src.split(';')[0].split('/')[1]
    const link = document.createElement('a')
    link.href = src
    link.download = `${name}.${extension}`
    link.click()
  }

  const handleDelete = () => {
    dispatch(removeImage(id))
  }

  const handleRenameSubmit = (e) => {
    e.preventDefault()
    const trimmed = newName.trim()
    if (trimmed && trimmed !== name) {
      dispatch(renameImage({ id, name: trimmed }))
    }
    setIsRenaming(false)
  }

  return (
    <div className="absolute top-8 right-2 border border-black px-4 py-2 bg-black rounded-sm z-10">
      {isRenaming ? (
        <form onSubmit={handleRenameSubmit} className="flex flex-col gap-2">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-2 py-1 rounded-sm text-white text-sm"
          />
          <div className="flex gap-2 justify-center">
            <button
              type="submit"
              className="cursor-pointer px-2 py-1 text-white text-sm rounded-sm hover:bg-gray-300 hover:text-black"
            >
              OK
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRenaming(false)
                setNewName(name)
              }}
              className="cursor-pointer px-2 py-1 text-white text-sm rounded-sm hover:bg-gray-300 hover:text-black"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <ul className="flex flex-col items-center gap-2">
          <ActionLine name="Export" onClick={handleExport} />
          <ActionLine name="Rename" onClick={() => setIsRenaming(true)} />
          <ActionLine name="Delete" onClick={handleDelete} />
        </ul>
      )}
    </div>
  )
}

function ActionLine({ name, onClick }) {
  return (
    <li
      className="cursor-pointer px-2 py-1 text-white rounded-sm hover:bg-gray-300 hover:text-black"
      onClick={onClick}
    >
      {name}
    </li>
  )
}
