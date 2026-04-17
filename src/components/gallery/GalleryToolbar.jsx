export default function GalleryToolbar({
  hasItems,
  selectionMode,
  selectedCount,
  onToggleSelectionMode,
  onExportSelected,
}) {
  return (
    <div className="w-full flex justify-center gap-3 my-6">
      <button className="px-4 py-2 bg-green-700 rounded-lg text-white w-fit cursor-pointer">
        Import image
      </button>
      {hasItems && (
        <button
          onClick={onToggleSelectionMode}
          className="px-4 py-2 bg-gray-700 rounded-lg text-white w-fit cursor-pointer"
        >
          {selectionMode ? 'Annuler' : 'Sélectionner des images à exporter'}
        </button>
      )}
      {selectionMode && selectedCount > 0 && (
        <button
          onClick={onExportSelected}
          className="px-4 py-2 bg-blue-700 rounded-lg text-white w-fit cursor-pointer"
        >
          Exporter ({selectedCount})
        </button>
      )}
    </div>
  )
}
