import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import useMarkdownFiles from '../hooks/useMarkdownFiles.js'
import DropdownMenu from '../components/global/DropdownMenu.jsx'
import ImportModal from '../components/global/ImportModal.jsx'
import { exportAsFile } from '../utils/mdlcFiles.js'

export default function MarkdownPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { allFiles, handleDelete } = useMarkdownFiles()
  const [importModalOpen, setImportModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('markdownFiles.pageTitle', 'Markdown Files')}
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setImportModalOpen(true)}
              className="px-4 py-2 text-sm border bg-white border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('markdownFiles.import', 'Import')}
            </button>
            <button
              onClick={() => navigate('/markdown/new')}
              className="px-4 py-2 text-sm font-semibold bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t('markdownFiles.newFile', 'New File')}
            </button>
          </div>
        </div>

        {allFiles.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">
              {t('markdownFiles.noFilesOrFolders', 'No files found.')}
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 rounded-xl">
            <div className="grid grid-cols-[2fr_3fr_1fr_40px] px-6 py-3 border-b border-gray-200 bg-gray-100 rounded-t-xl">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t('markdownFiles.name', 'Name')}
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t('markdownFiles.description', 'Description')}
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t('markdownFiles.date', 'Date')}
              </span>
              <span />
            </div>

            {allFiles.map((file) => (
              <div
                key={file.id}
                className="grid grid-cols-[2fr_3fr_1fr_40px] items-center px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <span
                  className="text-sm text-gray-900 font-medium cursor-pointer hover:underline"
                  onClick={() => navigate(`/markdown/${file.id}`)}
                >
                  {file.name || 'Untitled'}
                </span>
                <span className="text-sm text-gray-500 truncate pr-4">
                  {file.description || '—'}
                </span>
                <span className="text-sm text-gray-600">
                  {file.date ? new Date(file.date).toLocaleDateString() : '—'}
                </span>

                <div className="flex justify-end">
                  <DropdownMenu
                    position="right"
                    trigger={
                      <button className="text-gray-400 hover:text-gray-900 px-2 py-1 rounded transition-colors flex items-center justify-center">
                        •••
                      </button>
                    }
                    actions={[
                      {
                        label: t('markdownFiles.edit', 'Edit'),
                        onClick: () => navigate(`/markdown/${file.id}`),
                      },
                      {
                        label: t('markdownFiles.exportMd', 'Export (.md)'),
                        onClick: () =>
                          exportAsFile(
                            file.body || '',
                            file.name || 'Untitled',
                            'md'
                          ),
                      },
                      {
                        label: t('markdownFiles.deleteFile', 'Delete'),
                        onClick: () => handleDelete(file.id),
                      },
                    ]}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        mode="markdown"
      />
    </div>
  )
}
