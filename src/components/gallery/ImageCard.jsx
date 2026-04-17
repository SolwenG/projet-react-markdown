import ActionsModal from './actions-modal/ActionsModal'

export default function ImageCard({
  id,
  name,
  src,
  isModalOpen,
  onToggleModal,
  selectionMode,
  isSelected,
  onToggleSelect,
}) {
  return (
    <div className="flex flex-col justify-center gap-1 items-center shadow-sm rounded-lg">
      <div className="relative group">
        <img src={src} alt="avatar" className="rounded-t-lg max-w-3xs" />

        {selectionMode ? (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="absolute top-2 left-2 w-5 h-5 cursor-pointer accent-green-600"
          />
        ) : (
          <button
            onClick={onToggleModal}
            className="cursor-pointer px-2 py-0 bg-black text-white rounded-full absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ...
          </button>
        )}

        {!selectionMode && isModalOpen && (
          <>
            <div className="fixed inset-0 z-0" onClick={onToggleModal} />
            <ActionsModal id={id} name={name} src={src} />
          </>
        )}
      </div>
      <p className="p-1 w-full text-center max-w-3xs break-all">{name}</p>
    </div>
  )
}
