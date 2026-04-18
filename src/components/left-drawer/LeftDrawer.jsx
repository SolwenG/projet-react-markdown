import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useModal from '../../hooks/useModal.js'
import MarkdownFilesTree from './MarkdownFilesTree.jsx'
import CustomBlocksPreview from './CustomBlocksPreview.jsx'
import GalleryPreview from './GalleryPreview.jsx'
import ImportModal from '../global/ImportModal.jsx'
import LeftDrawerHeader from './LeftDrawerHeader.jsx'
import SwitchLanguage from '../global/SwitchLanguage.jsx'
import ThemeToggleButton from '../global/ThemeToggleButton.jsx'
import { fetchBlocks } from '../../store/slices/customBlocks/customBlocksSlice.js'

export default function LeftDrawer() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const importModal = useModal(false)
  const [importMode, setImportMode] = useState('image')

  useEffect(() => {
    dispatch(fetchBlocks())
  }, [dispatch])

  return (
    <aside className="w-70 bg-gray-100 border-r border-gray-200 min-h-screen flex flex-col">
      <LeftDrawerHeader
        navigate={navigate}
        setImportMode={setImportMode}
        openImportModal={importModal.open}
      />

      <MarkdownFilesTree />

      <CustomBlocksPreview />

      <GalleryPreview />

      <div className="mt-auto flex items-center justify-between px-4 py-2">
        <ThemeToggleButton />
        <SwitchLanguage />
      </div>

      {importModal.isOpen && (
        <ImportModal
          onClose={importModal.close}
          mode={importMode}
          isOpen={importModal.isOpen}
        />
      )}
    </aside>
  )
}
