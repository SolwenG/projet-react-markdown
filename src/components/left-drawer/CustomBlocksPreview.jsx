import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function CustomBlocksPreview() {
  const { blocks } = useSelector((state) => state.customBlocks)
  const navigate = useNavigate()

  const latestBlocks = blocks.slice(-3).reverse()

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 text-sm uppercase">
          Custom Blocks
        </h3>
        <button
          onClick={() => navigate('/custom-blocks')}
          className="text-orange-600 hover:text-orange-700 text-sm"
        >
          View All
        </button>
      </div>

      <div className="space-y-2">
        {latestBlocks.map((block) => (
          <button
            key={block.id}
            className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer w-full text-left"
            onClick={() => navigate('/custom-blocks')}
          >
            <div className="flex items-center gap-2">
              <span className="material-icons text-purple-500 text-sm">
                widgets
              </span>
              <span className="text-sm font-medium">{block.name}</span>
            </div>
            {block.shortcut && (
              <p className="text-xs text-gray-500 ml-6 mt-1">
                Shortcut: {block.shortcut}
              </p>
            )}
          </button>
        ))}

        {blocks.length === 0 && (
          <p className="text-sm text-gray-500">No custom blocks yet</p>
        )}
      </div>
    </div>
  )
}
