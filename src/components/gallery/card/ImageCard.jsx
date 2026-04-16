import ActionsModal from '../actions-modal/ActionsModal'

export default function ImageCard({
  id,
  name,
  src,
  isModalOpen,
  onToggleModal,
}) {
  return (
    <div className="flex flex-col justify-center gap-1 items-center shadow-sm rounded-lg">
      <div className="relative group">
        <img src={src} alt="avatar" className="rounded-t-lg max-w-3xs" />
        <button
          onClick={onToggleModal}
          className="cursor-pointer px-2 py-0 bg-black text-white rounded-full absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ...
        </button>

        {isModalOpen && (
          <>
            <div className="fixed inset-0 z-0" onClick={onToggleModal} />
            <ActionsModal id={id} />
          </>
        )}
      </div>
      <p className="p-1 w-full text-center max-w-xs">{name}</p>
    </div>
  )
}
