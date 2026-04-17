import BlockRow from './BlockRow.jsx'
import { useTranslation } from 'react-i18next'

export default function BlockTable({ blocks, onEdit, onDelete, onExport }) {
  const { t } = useTranslation()
  if (blocks.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">{t('blockTable.noCustomBlocks')}</p>
        <p className="text-sm mt-1">{t('blockTable.createFirstBlock')}</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-300 rounded-xl">
      <div className="grid grid-cols-[2fr_3fr_1fr_40px] px-6 py-3 border-b border-gray-200 bg-gray-100 rounded-t-xl">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {t('blockTable.name')}
        </span>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {t('blockTable.description')}
        </span>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {t('blockTable.shortcut')}
        </span>
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
