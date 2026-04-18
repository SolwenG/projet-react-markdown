import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function CustomBlocksPreview() {
  const { blocks } = useSelector((state) => state.customBlocks)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const latestBlocks = blocks.slice(-3).reverse()

  const handleBlockClick = (block) => {
    // If we are currently editing/creating a markdown file
    if (
      location.pathname.startsWith('/markdown/') &&
      location.pathname !== '/markdown'
    ) {
      window.dispatchEvent(
        new CustomEvent('insertCustomBlock', { detail: block.content })
      )
    } else {
      navigate('/custom-blocks')
    }
  }

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 text-sm uppercase">
          {t('customBlocks.title')}
        </h3>
        <button
          onClick={() => navigate('/custom-blocks')}
          className="text-orange-600 hover:text-orange-700 text-sm"
        >
          {t('customBlocks.viewAll')}
        </button>
      </div>

      <div className="space-y-2">
        {latestBlocks.map((block) => (
          <button
            key={block.id}
            className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer w-full text-left"
            onClick={() => handleBlockClick(block)}
            title={
              location.pathname.startsWith('/markdown/') &&
              location.pathname !== '/markdown'
                ? t('customBlocks.insertHint', 'Click to insert into editor')
                : ''
            }
          >
            <div className="flex items-center gap-2">
              <span className="material-icons text-orange-500 text-sm">
                widgets
              </span>
              <span className="text-sm font-medium">{block.name}</span>
            </div>
            {block.shortcut && (
              <p className="text-xs text-gray-500 ml-6 mt-1">
                {t('customBlocks.shortcut')} {block.shortcut}
              </p>
            )}
          </button>
        ))}

        {blocks.length === 0 && (
          <p className="text-sm text-gray-500">
            {t('customBlocks.noCustomBlocks')}
          </p>
        )}
      </div>
    </div>
  )
}
