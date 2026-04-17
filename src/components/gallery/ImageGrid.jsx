import ImageCard from './ImageCard.jsx'

export default function ImageGrid({
  items,
  openModalId,
  selectionMode,
  selectedIds,
  onToggleModal,
  onToggleSelect,
}) {
  if (!items.length) {
    return (
      <h2 className="flex justify-center text-center items-center text-2xl">
        Let's add your first image !
      </h2>
    )
  }

  return (
    <ul className="flex items-center gap-4 flex-wrap max-w-[60vw] justify-center mx-auto">
      {items.map((image) => (
        <li key={image.id}>
          <ImageCard
            id={image.id}
            name={image.name}
            src={image.base64}
            isModalOpen={openModalId === image.id}
            onToggleModal={() => onToggleModal(image.id)}
            selectionMode={selectionMode}
            isSelected={selectedIds.includes(image.id)}
            onToggleSelect={() => onToggleSelect(image.id)}
          />
        </li>
      ))}
    </ul>
  )
}
