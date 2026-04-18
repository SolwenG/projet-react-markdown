import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import useMarkdownFiles from '../hooks/useMarkdownFiles.js'
import DropdownMenu from '../components/global/DropdownMenu.jsx'
import { exportAsFile } from '../utils/mdlcFiles.js'

export default function MarkdownPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { allFiles, handleDelete } = useMarkdownFiles()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">{t('markdownFiles.pageTitle')}</h1>
        <button
          onClick={() => navigate('/markdown/new')}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('markdownFiles.newFile')}
        </button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allFiles.map((file) => (
          <li
            key={file.id}
            className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="cursor-pointer font-medium text-lg text-gray-800 hover:text-blue-600 truncate flex-1"
              onClick={() => navigate(`/markdown/${file.id}`)}
            >
              {file.name || 'Untitled'}
            </div>
            <DropdownMenu
              position="right"
              trigger={
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
                  <span className="material-icons text-gray-600">more_vert</span>
                </button>
              }
              actions={[
                { label: t('markdownFiles.edit'), onClick: () => navigate(`/markdown/${file.id}`) },
                { label: t('markdownFiles.exportMd'), onClick: () => exportAsFile(file.body || '', file.name || 'Untitled', 'md') },
                { label: t('markdownFiles.deleteFile'), onClick: () => handleDelete(file.id), danger: true },
              ]}
            />
          </li>
        ))}
      </ul>

      {allFiles.length === 0 && (
        <p className="text-gray-500 text-center py-8">{t('markdownFiles.noFilesFound')}</p>
      )}
    </div>
  )
}
