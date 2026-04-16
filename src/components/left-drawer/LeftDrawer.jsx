import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useModal from '../../hooks/useModal.js'
import MarkdownFilesTree from './MarkdownFilesTree.jsx'
import CustomBlocksPreview from './CustomBlocksPreview.jsx'
import GalleryPreview from './GalleryPreview.jsx'
import ImportModal from '../global/ImportModal.jsx'
import LeftDrawerHeader from './LeftDrawerHeader.jsx'

export default function LeftDrawer() {
  const navigate = useNavigate()
  const importModal = useModal(false)
  const [importMode, setImportMode] = useState('image')

  return (
    <aside className="w-64 bg-gray-100 border-r border-gray-200 min-h-screen flex flex-col">
      <LeftDrawerHeader
        navigate={navigate}
        setImportMode={setImportMode}
        openImportModal={importModal.open}
      />

      <MarkdownFilesTree />

      <CustomBlocksPreview />

      <GalleryPreview />

      <ImportModal
        isOpen={importModal.isOpen}
        onClose={importModal.close}
        mode={importMode}
      />
    </aside>
  )
}
