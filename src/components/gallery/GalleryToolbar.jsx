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
    <>
      <button
        onClick={() => importModal.open()}
        className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
      >
        {t('gallery.importImage')}
      </button>
      {hasItems && (
        <button
          onClick={onToggleSelectionMode}
          className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          {selectionMode ? t('gallery.cancel') : t('gallery.selectImagesToExport')}
        </button>
      )}
      {selectionMode && selectedCount > 0 && (
        <button
          onClick={onExportSelected}
          className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
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
    </>
  )
}
