import { useImageGallery } from '../hooks/gallery/useImageGallery.js'
import GalleryToolbar from '../components/gallery/GalleryToolbar.jsx'
import ImageGrid from '../components/gallery/ImageGrid.jsx'
import { useTranslation } from 'react-i18next'

export default function GalleryPage() {
  const {
    items,
    loading,
    openModalId,
    selectionMode,
    selectedIds,
    handleToggleModal,
    handleToggleSelect,
    handleToggleSelectionMode,
    handleExportSelected,
  } = useImageGallery()

  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">
        {t('gallery.title')}
      </h1>

      <GalleryToolbar
        hasItems={!!items.length}
        selectionMode={selectionMode}
        selectedCount={selectedIds.length}
        onToggleSelectionMode={handleToggleSelectionMode}
        onExportSelected={handleExportSelected}
      />

      {loading && <p>{t('gallery.loading')}</p>}

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
