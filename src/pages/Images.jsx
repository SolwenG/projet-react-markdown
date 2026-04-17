import { useImageGallery } from '../hooks/gallery/useImageGallery.js'
import GalleryToolbar from '../components/gallery/GalleryToolbar.jsx'
import ImageUploadForm from '../components/gallery/ImageUploadForm.jsx'
import ImageGrid from '../components/gallery/ImageGrid.jsx'

export default function ImageList() {
  const {
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
  } = useImageGallery()

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Gallery</h1>

      <GalleryToolbar
        hasItems={!!items.length}
        selectionMode={selectionMode}
        selectedCount={selectedIds.length}
        onToggleSelectionMode={handleToggleSelectionMode}
        onExportSelected={handleExportSelected}
      />

      <ImageUploadForm
        fileName={fileName}
        selectedFile={selectedFile}
        onFileChange={handleFileChange}
        onFileNameChange={(e) => setFileName(e.target.value)}
        onSubmit={handleSubmit}
      />

      {loading && <p>Chargement...</p>}

      <ImageGrid
        items={items}
        openModalId={openModalId}
        selectionMode={selectionMode}
        selectedIds={selectedIds}
        onToggleModal={handleToggleModal}
        onToggleSelect={handleToggleSelect}
      />
    </div>
  )
}
