import DropdownMenu from '../global/DropdownMenu.jsx'
import { useTranslation } from 'react-i18next'

export default function LeftDrawerHeader({
  navigate,
  setImportMode,
  openImportModal,
}) {
  const { t } = useTranslation()
  const handleImportImage = () => {
    setImportMode('image')
    openImportModal()
  }

  const handleImportMarkdown = () => {
    setImportMode('markdown')
    openImportModal()
  }

  const handleImportCustomBlock = () => {
    setImportMode('customBlock')
    openImportModal()
  }

  const actions = [
    { label: t('leftDrawer.importMarkdownFile'), onClick: handleImportMarkdown },
    { label: t('leftDrawer.importCustomBlock'), onClick: handleImportCustomBlock },
    { label: t('leftDrawer.importImage'), onClick: handleImportImage },
  ]

  return (
    <div className="p-4 border-b border-gray-300 flex justify-between items-center">
      <button
        onClick={() => navigate('/')}
        className="text-xl font-bold text-gray-700 cursor-pointer hover:text-gray-900 bg-transparent border-0 p-0"
      >
        {t('app.title')}
      </button>
      <DropdownMenu
        trigger={
          <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2">
            {t('leftDrawer.import')}
            <span className="material-icons text-white">add</span>
          </button>
        }
        actions={actions}
      />
    </div>
  )
}
