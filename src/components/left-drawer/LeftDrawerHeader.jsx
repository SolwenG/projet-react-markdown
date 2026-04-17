import DropdownMenu, { DropdownItem } from '../global/DropDownMenuOld.jsx'
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
          <button className="p-2 bg-gray-600 hover:bg-gray-700 font-semibold text-white rounded-xl flex items-center gap-2">
            {t('leftDrawer.import')}
            <span className="material-icons text-white">add</span>
          </button>
        }
      >
        <DropdownItem onClick={handleImportMarkdown}>
          {t('leftDrawer.importMarkdownFile')}
        </DropdownItem>
        <DropdownItem onClick={handleImportCustomBlock}>
          {t('leftDrawer.importCustomBlock')}
        </DropdownItem>
        <DropdownItem onClick={handleImportImage}>
          {t('leftDrawer.importImage')}
        </DropdownItem>
      </DropdownMenu>
    </div>
  )
}
