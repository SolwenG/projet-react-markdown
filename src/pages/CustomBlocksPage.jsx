import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBlocks,
  createBlock,
  editBlock,
  deleteBlockAction,
  importBlocks,
  setSortBy,
  selectSortedBlocks,
} from '../store/slices/customBlocks/customBlocksSlice'
import { exportBlock, exportAllBlocks } from '../utils/mdlcFiles'
import BlockTable from '../components/custom-block/BlockTable.jsx'
import BlockCreateModal from '../components/custom-block/BlockCreateModal.jsx'
import ImportModal from '../components/global/ImportModal.jsx'
import { useTranslation } from 'react-i18next'

export default function CustomBlocksPage() {
  const dispatch = useDispatch()
  const blocks = useSelector(selectSortedBlocks)
  const sortBy = useSelector((state) => state.customBlocks.sortBy)
  const error = useSelector((state) => state.customBlocks.error)
  const { t } = useTranslation()

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [blockToEdit, setBlockToEdit] = useState(null)

  useEffect(() => {
    dispatch(fetchBlocks())
  }, [dispatch])

  function handleSubmitSuccess(block) {
    const action = block.id ? editBlock(block) : createBlock(block)
    dispatch(action).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        setCreateModalOpen(false)
        setBlockToEdit(null)
      }
    })
  }

  function handleEdit(block) {
    setBlockToEdit(block)
    setCreateModalOpen(true)
  }

  function handleCloseCreateModal() {
    setCreateModalOpen(false)
    setBlockToEdit(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('customBlocksPage.title')}
          </h1>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="bg-white border border-gray-300 text-sm rounded-lg px-3 py-2"
            >
              <option value="date">{t('customBlocksPage.sortByDate')}</option>
              <option value="name">{t('customBlocksPage.sortByName')}</option>
            </select>

            <button
              onClick={() => setImportModalOpen(true)}
              className="px-4 py-2 text-sm border bg-white border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('customBlocksPage.import')}
            </button>

            <button
              onClick={() => exportAllBlocks(blocks)}
              disabled={blocks.length === 0}
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t('customBlocksPage.exportAll')}
            </button>

            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-4 py-2 text-sm font-semibold bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t('customBlocksPage.new')}
            </button>
          </div>
        </div>

        <BlockTable
          blocks={blocks}
          onEdit={handleEdit}
          onDelete={(id) => dispatch(deleteBlockAction(id))}
          onExport={exportBlock}
        />
      </div>

      <BlockCreateModal
        key={`${createModalOpen}-${blockToEdit?.id ?? ''}`}
        isOpen={createModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleSubmitSuccess}
        blockToEdit={blockToEdit}
        error={error}
      />

      <ImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        mode="customBlock"
        onImport={(newBlocks) => dispatch(importBlocks(newBlocks))}
        existingBlocks={blocks}
      />
    </div>
  )
}
