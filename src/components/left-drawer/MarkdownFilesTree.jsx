import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import DropdownMenu, { DropdownItem } from '../global/DropdownMenu.jsx'
import useModal from '../../hooks/useModal.js'
import { useTranslation } from 'react-i18next'
import {
  addFolder,
  addFile,
  deleteFolder,
  deleteFile,
  renameFolder,
  renameFile,
  moveFile,
  moveFolder,
} from '../../store/slices/markdownSlice.js'
import { useNavigate } from 'react-router-dom'
import ImportModal from '../global/ImportModal.jsx'
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragOverlay,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export default function MarkdownFilesTree() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { files, folders } = useSelector((state) => state.markdown)
  const [expandedFolders, setExpandedFolders] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [showNewFile, setShowNewFile] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [newFileName, setNewFileName] = useState('')
  const [currentFolderId, setCurrentFolderId] = useState(null)
  const importModal = useModal(false)
  const [importFolderId, setImportFolderId] = useState(null)
  const [activeId, setActiveId] = useState(null)

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const handleRename = (id, type) => {
    if (editName.trim()) {
      if (type === 'folder') {
        dispatch(renameFolder({ id, name: editName }))
      } else {
        dispatch(renameFile({ id, name: editName }))
      }
      setEditingId(null)
      setEditName('')
    }
  }

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      dispatch(addFolder({ name: newFolderName, parentId: currentFolderId }))
      setNewFolderName('')
      setShowNewFolder(false)
      setCurrentFolderId(null)
    }
  }

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      dispatch(
        addFile({ name: newFileName, content: '', folderId: currentFolderId })
      )
      setNewFileName('')
      setShowNewFile(false)
      setCurrentFolderId(null)
    }
  }

  const handleStartEditFolder = (folder) => {
    setEditingId(folder.id)
    setEditName(folder.name)
  }

  const handleStartEditFile = (file) => {
    setEditingId(file.id)
    setEditName(file.name)
  }

  const handleImportToFolder = (folderId) => {
    setImportFolderId(folderId)
    importModal.open()
  }

  const handleAddFileToFolder = (folderId) => {
    setCurrentFolderId(folderId)
    setShowNewFile(true)
  }

  const handleAddFolderToFolder = (folderId) => {
    setCurrentFolderId(folderId)
    setShowNewFolder(true)
  }

  const handleExportFile = (file) => {
    const blob = new Blob([file.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file.name}.mdlc`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeData = active.data.current
    const overData = over.data.current

    if (!activeData || !overData) return

    if (activeData.type === 'file' && overData.type === 'folder') {
      dispatch(moveFile({ fileId: activeData.id, targetFolderId: overData.id }))
    } else if (activeData.type === 'folder' && overData.type === 'folder') {
      if (activeData.id !== overData.id && !isDescendant(activeData.id, overData.id)) {
        dispatch(moveFolder({ folderId: activeData.id, targetFolderId: overData.id }))
      }
    } else if (overData.type === 'root') {
      if (activeData.type === 'file') {
        dispatch(moveFile({ fileId: activeData.id, targetFolderId: null }))
      } else if (activeData.type === 'folder') {
        dispatch(moveFolder({ folderId: activeData.id, targetFolderId: null }))
      }
    }
  }

  const isDescendant = (folderId, potentialAncestorId) => {
    if (!potentialAncestorId) return false
    let currentFolder = folders.find((f) => f.id === potentialAncestorId)
    while (currentFolder && currentFolder.parentId) {
      if (currentFolder.parentId === folderId) return true
      currentFolder = folders.find((f) => f.id === currentFolder.parentId)
    }
    return false
  }

  const DraggableFile = ({ file, level = 0, isRoot = false }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: file.id,
      data: { type: 'file', id: file.id, item: file },
    })

    const style = {
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : 1,
      marginLeft: isRoot ? 0 : `${level * 16}px`,
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-center gap-1 py-1 px-2 hover:bg-gray-100 rounded group ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <span className="w-4"></span>
        <span className="material-icons text-blue-500 text-sm cursor-grab" {...listeners} {...attributes}>
          description
        </span>
        {editingId === file.id ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={() => handleRename(file.id, 'file')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename(file.id, 'file')
            }}
            className="flex-1 px-1 py-0.5 text-sm border rounded"
            autoFocus
          />
        ) : (
          <span className="flex-1 text-sm cursor-grab" {...listeners} {...attributes}>{file.name}.md</span>
        )}
        <DropdownMenu
          position="right"
          trigger={
            <button className="p-0.5 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100">
              <span className="material-icons text-sm">more_horiz</span>
            </button>
          }
        >
          <DropdownItem onClick={() => handleStartEditFile(file)}>
            {t('markdownFiles.renameFile')}
          </DropdownItem>
          <DropdownItem
            onClick={() => dispatch(deleteFile({ id: file.id }))}
            danger
          >
            {t('markdownFiles.deleteFile')}
          </DropdownItem>
          <DropdownItem onClick={() => handleExportFile(file)}>
            {t('markdownFiles.exportFile')}
          </DropdownItem>
        </DropdownMenu>
      </div>
    )
  }

  const DroppableFolder = ({ folder, level = 0 }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: folder.id,
      data: { type: 'folder', id: folder.id, item: folder },
    })

    const { setNodeRef: setDroppableRef, isOver } = useDroppable({
      id: folder.id,
      data: { type: 'folder', id: folder.id },
    })

    const childFolders = getChildFolders(folder.id)
    const folderFiles = getFolderFiles(folder.id)
    const canDrop = !isDescendant(folder.id, activeId) && activeId !== folder.id

    const style = {
      transform: CSS.Translate.toString(transform),
      marginLeft: `${level * 16}px`,
    }

    return (
      <div key={folder.id}>
        <div
          ref={(node) => {
            setNodeRef(node)
            setDroppableRef(node)
          }}
          style={style}
          className={`flex items-center gap-1 py-1 px-2 rounded group ${
            isOver && canDrop ? 'bg-blue-100 border-2 border-blue-300' : 'hover:bg-gray-100'
          } ${isDragging ? 'opacity-50' : ''}`}
        >
          <button
            onClick={() => toggleFolder(folder.id)}
            className="p-0.5 hover:bg-gray-200 rounded"
          >
            <span className="material-icons text-sm">
              {expandedFolders[folder.id] ? 'expand_more' : 'chevron_right'}
            </span>
          </button>
          <span className="material-icons text-yellow-500 text-sm cursor-grab" {...listeners} {...attributes}>
            folder
          </span>
          {editingId === folder.id ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => handleRename(folder.id, 'folder')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename(folder.id, 'folder')
              }}
              className="flex-1 px-1 py-0.5 text-sm border rounded"
              autoFocus
            />
          ) : (
            <span className="flex-1 text-sm cursor-grab" {...listeners} {...attributes}>{folder.name}</span>
          )}
          <DropdownMenu
            position="right"
            trigger={
              <button className="p-0.5 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100">
                <span className="material-icons text-sm">more_horiz</span>
              </button>
            }
          >
            <DropdownItem onClick={() => handleStartEditFolder(folder)}>
              {t('markdownFiles.renameFolder')}
            </DropdownItem>
            <DropdownItem
              onClick={() => dispatch(deleteFolder({ id: folder.id }))}
              danger
            >
              {t('markdownFiles.deleteFolder')}
            </DropdownItem>
            <DropdownItem onClick={() => handleImportToFolder(folder.id)}>
              {t('markdownFiles.importFile')}
            </DropdownItem>
            <DropdownItem onClick={() => handleAddFileToFolder(folder.id)}>
              {t('markdownFiles.addNewFile')}
            </DropdownItem>
            <DropdownItem onClick={() => handleAddFolderToFolder(folder.id)}>
              {t('markdownFiles.addNewFolder')}
            </DropdownItem>
          </DropdownMenu>
        </div>

        {expandedFolders[folder.id] && (
          <div className="space-y-1">
            {childFolders.map((childFolder) => (
              <DroppableFolder
                key={childFolder.id}
                folder={childFolder}
                level={level + 1}
              />
            ))}
            {folderFiles.map((file) => (
              <DraggableFile
                key={file.id}
                file={file}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  const getRootFiles = () => files.filter((f) => !f.folderId)
  const getFolderFiles = (folderId) =>
    files.filter((f) => f.folderId === folderId)
  const getRootFolders = () => folders.filter((f) => !f.parentId)
  const getChildFolders = (folderId) =>
    folders.filter((f) => f.parentId === folderId)

  const RootDropZone = () => {
    const { setNodeRef, isOver } = useDroppable({
      id: 'root',
      data: { type: 'root' },
    })

    if (!activeId) return null

    return (
      <div
        ref={setNodeRef}
        className={`mb-2 p-2 border-2 border-dashed rounded transition-colors ${
          isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <p className="text-xs text-gray-500 text-center">
          {t('markdownFiles.dropToRoot')}
        </p>
      </div>
    )
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 text-sm uppercase">
          {t('markdownFiles.title')}
        </h3>
        <DropdownMenu
          trigger={
            <button className="p-1 hover:bg-gray-200 rounded-xl flex items-center gap-2">
              <span className="material-icons text-sm">add</span>
            </button>
          }
        >
          <DropdownItem onClick={() => handleAddFileToFolder(null)}>
            {t('markdownFiles.newFile')}
          </DropdownItem>
          <DropdownItem onClick={() => setShowNewFolder(true)}>
            {t('markdownFiles.newFolder')}
          </DropdownItem>
        </DropdownMenu>
        <button
          onClick={() => navigate('/markdown')}
          className="text-orange-600 hover:text-orange-700 text-sm"
        >
          {t('markdownFiles.viewAll')}
        </button>
      </div>

      {showNewFolder && (
        <div className="mb-2 ml-2">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder={t('markdownFiles.folderName')}
            className="w-full px-2 py-1 text-sm border rounded"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateFolder()
            }}
          />
          <div className="flex gap-1 mt-1">
            <button
              onClick={handleCreateFolder}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
            >
              {t('markdownFiles.create')}
            </button>
            <button
              onClick={() => {
                setShowNewFolder(false)
                setNewFolderName('')
              }}
              className="px-2 py-1 text-xs bg-gray-300 rounded"
            >
              {t('markdownFiles.cancel')}
            </button>
          </div>
        </div>
      )}

      {showNewFile && (
        <div className="mb-2 ml-2">
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder={t('markdownFiles.fileName')}
            className="w-full px-2 py-1 text-sm border rounded"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateFile()
            }}
          />
          <div className="flex gap-1 mt-1">
            <button
              onClick={handleCreateFile}
              className="px-2 py-1 text-xs bg-green-600 text-white rounded"
            >
              {t('markdownFiles.create')}
            </button>
            <button
              onClick={() => {
                setShowNewFile(false)
                setNewFileName('')
              }}
              className="px-2 py-1 text-xs bg-gray-300 rounded"
            >
              {t('markdownFiles.cancel')}
            </button>
          </div>
        </div>
      )}

      <RootDropZone />

      <div className="space-y-1">
        {/* Folders */}
        {getRootFolders().map((folder) => (
          <DroppableFolder key={folder.id} folder={folder} />
        ))}

        {/* Root files */}
        {getRootFiles().map((file) => (
          <DraggableFile key={file.id} file={file} isRoot />
        ))}

        {folders.length === 0 && getRootFiles().length === 0 && (
          <p className="text-sm text-gray-500 ml-2">{t('markdownFiles.noFilesOrFolders')}</p>
        )}
      </div>

      <ImportModal
        isOpen={importModal.isOpen}
        onClose={() => {
          importModal.close()
          setImportFolderId(null)
        }}
        mode="markdown"
        selectedFolderId={importFolderId}
      />
    </div>
    </DndContext>
  )
}
