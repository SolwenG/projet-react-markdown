import DropdownMenu, { DropdownItem } from '../global/DropdownMenu.jsx'

export default function LeftDrawerHeader({ navigate, setImportMode, openImportModal }) {
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
        Super App
      </button>
      <DropdownMenu
        trigger={
          <button className="p-2 bg-gray-600 hover:bg-gray-700 font-semibold text-white rounded-xl flex items-center gap-2">
            Import<span className="material-icons text-white">add</span>
          </button>
        }
      >
        <DropdownItem onClick={handleImportMarkdown}>
          Import Markdown File
        </DropdownItem>
        <DropdownItem onClick={handleImportCustomBlock}>
          Import Custom Block
        </DropdownItem>
        <DropdownItem onClick={handleImportImage}>Import Image</DropdownItem>
      </DropdownMenu>
    </div>
  )
}
