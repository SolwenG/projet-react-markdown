import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeImage, renameImage } from '../../../store/images/imagesSlice'
import RenameForm from './RenameForm'

export default function ActionsModal({ id, name, src }) {
  const dispatch = useDispatch()
  const [isRenaming, setIsRenaming] = useState(false)

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

  const handleRenameSubmit = (newName) => {
    const trimmed = newName.trim()
    if (trimmed && trimmed !== name) {
      dispatch(renameImage({ id, name: trimmed }))
    }
    setIsRenaming(false)
  }

  return (
    <div className="absolute top-8 right-2 border border-black px-4 py-2 bg-black rounded-sm z-10">
      {isRenaming ? (
        <RenameForm
          name={name}
          onSubmit={handleRenameSubmit}
          onCancel={() => setIsRenaming(false)}
        />
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
