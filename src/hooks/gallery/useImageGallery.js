import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchImages, uploadImage } from '../../store/slices/gallerySlice.js'

export function useImageGallery() {
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
    link.download = `export-${Date.now()}.imgs.mdlc`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importFromFile = (file, onLoad) => {
    const reader = new FileReader()
    reader.onload = () => onLoad(reader.result)
    reader.readAsText(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.name.endsWith('.imgs.mdlc')) {
      importFromFile(file, (result) => {
        JSON.parse(result).forEach(({ name, base64 }) =>
          dispatch(uploadImage({ name, base64 }))
        )
      })
      e.target.value = ''
      return
    }

    if (file.name.endsWith('.img.mdlc')) {
      importFromFile(file, (result) => {
        const { name, base64 } = JSON.parse(result)
        dispatch(uploadImage({ name, base64 }))
      })
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

  return {
    items,
    loading,
    openModalId,
    fileName,
    setFileName,
    selectedFile,
    selectionMode,
    selectedIds,
    handleToggleModal,
    handleToggleSelect,
    handleToggleSelectionMode,
    handleExportSelected,
    handleFileChange,
    handleSubmit,
  }
}
