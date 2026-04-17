import BlockRow from '../BlockRow/BlockRow'

export default function BlockTable({ blocks, onEdit, onDelete, onExport }) {
  if (blocks.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">Aucun bloc personnalisé</p>
        <p className="text-sm mt-1">Crée ton premier bloc avec le bouton +</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="grid grid-cols-[2fr_3fr_1fr_40px] px-6 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nom</span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Raccourci</span>
        <span />
      </div>

      {blocks.map((block) => (
        <BlockRow
          key={block.id}
          block={block}
          onEdit={onEdit}
          onDelete={onDelete}
          onExport={onExport}
        />
      ))}
    </div>
  )
}