import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchImages, uploadImage } from '../store/images/imagesSlice.js'
import ImageCard from '../components/gallery/card/ImageCard.jsx'

export default function ImageList() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((state) => state.images)
  const [openModalId, setOpenModalId] = useState(null)
  const [fileName, setFileName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    dispatch(fetchImages())
  }, [dispatch])

  const handleToggleModal = (id) => {
    setOpenModalId(openModalId === id ? null : id)
  }

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleToggleSelectionMode = () => {
    setSelectionMode((prev) => !prev)
    setSelectedIds([])
  }

  const handleExportSelected = () => {
    const selected = items.filter((img) => selectedIds.includes(img.id))
    const data = JSON.stringify(
      selected.map(({ name, base64 }) => ({ name, base64 }))
    )
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'export.imgs.mdlc'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.name.endsWith('.imgs.mdlc')) {
      const reader = new FileReader()
      reader.onload = () => {
        const images = JSON.parse(reader.result)
        images.forEach(({ name, base64 }) =>
          dispatch(uploadImage({ name, base64 }))
        )
      }
      reader.readAsText(file)
      e.target.value = ''
      return
    }

    if (file.name.endsWith('.img.mdlc')) {
      const reader = new FileReader()
      reader.onload = () => {
        const { name, base64 } = JSON.parse(reader.result)
        dispatch(uploadImage({ name, base64 }))
      }
      reader.readAsText(file)
      e.target.value = ''
      return
    }

    setSelectedFile(file)
    setFileName(file.name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedFile) return

    const reader = new FileReader()
    reader.onload = () => {
      dispatch(
        uploadImage({
          name: fileName || selectedFile.name,
          base64: reader.result,
        })
      )
      setSelectedFile(null)
      setFileName('')
      e.target.reset()
    }
    reader.readAsDataURL(selectedFile)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Gallery</h1>
      <div className="w-full flex justify-center gap-3 my-6">
        <button className="px-4 py-2 bg-green-700 rounded-lg text-white w-fit cursor-pointer">
          Import image
        </button>
        {!!items.length && (
          <button
            onClick={handleToggleSelectionMode}
            className="px-4 py-2 bg-gray-700 rounded-lg text-white w-fit cursor-pointer"
          >
            {selectionMode ? 'Annuler' : 'Sélectionner des images à exporter'}
          </button>
        )}
        {selectionMode && selectedIds.length > 0 && (
          <button
            onClick={handleExportSelected}
            className="px-4 py-2 bg-blue-700 rounded-lg text-white w-fit cursor-pointer"
          >
            Exporter ({selectedIds.length})
          </button>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto mb-8 px-4"
      >
        <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-black rounded-sm px-4 py-2 text-sm">
          <span>Choisir un fichier</span>
          <input
            type="file"
            accept="image/*,.img.mdlc,.imgs.mdlc"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <input
          type="text"
          placeholder="Nom du fichier"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={!selectedFile}
          className="bg-green-700 text-white disabled:cursor-not-allowed rounded-lg px-4 py-2 text-sm"
        >
          Ajouter
        </button>
      </form>

      {loading && <p>Chargement...</p>}

      {!items.length && (
        <h2 className="flex justify-center text-center items-center text-2xl">
          Let's add your first image !
        </h2>
      )}

      <ul className="flex items-center gap-4 flex-wrap max-w-[60vw] justify-center mx-auto">
        {items.map((image) => (
          <li key={image.id}>
            <ImageCard
              id={image.id}
              name={image.name}
              src={image.base64}
              isModalOpen={openModalId === image.id}
              onToggleModal={() => handleToggleModal(image.id)}
              selectionMode={selectionMode}
              isSelected={selectedIds.includes(image.id)}
              onToggleSelect={() => handleToggleSelect(image.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
