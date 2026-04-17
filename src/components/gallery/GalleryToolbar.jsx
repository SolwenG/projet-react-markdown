import useModal from '../../hooks/useModal.js'
import ImportModal from '../global/ImportModal.jsx'
import { useTranslation } from 'react-i18next'

export default function GalleryToolbar({
  hasItems,
  selectionMode,
  selectedCount,
  onToggleSelectionMode,
  onExportSelected,
}) {
  const importModal = useModal(false)
  const { t } = useTranslation()

  return (
    <div className="w-full flex justify-center gap-3 my-6">
      <button
        onClick={() => importModal.open()}
        className="px-4 py-2 bg-green-700 rounded-lg text-white w-fit cursor-pointer"
      >
        {t('gallery.importImage')}
      </button>
      {hasItems && (
        <button
          onClick={onToggleSelectionMode}
          className="px-4 py-2 bg-gray-700 rounded-lg text-white w-fit cursor-pointer"
        >
          {selectionMode ? t('gallery.cancel') : t('gallery.selectImagesToExport')}
        </button>
      )}
      {selectionMode && selectedCount > 0 && (
        <button
          onClick={onExportSelected}
          className="px-4 py-2 bg-blue-700 rounded-lg text-white w-fit cursor-pointer"
        >
          {t('gallery.export')} ({selectedCount})
        </button>
      )}
      <ImportModal
        isOpen={importModal.isOpen}
        onClose={() => importModal.close()}
        mode="image"
        selectedFolderId={null}
      />
    </div>
  )
}
