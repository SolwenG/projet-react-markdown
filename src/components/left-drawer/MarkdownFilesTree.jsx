import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import DropdownMenu, { DropdownItem } from '../global/DropdownMenu.jsx'
import useModal from '../../hooks/useModal.js'
import {
  addFolder,
  addFile,
  deleteFolder,
  deleteFile,
  renameFolder,
  renameFile,
} from '../../store/slices/markdownSlice.js'
import { useNavigate } from 'react-router-dom'
import ImportModal from '../global/ImportModal.jsx'

export default function MarkdownFilesTree() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const getRootFiles = () => files.filter((f) => !f.folderId)
  const getFolderFiles = (folderId) =>
    files.filter((f) => f.folderId === folderId)
  const getRootFolders = () => folders.filter((f) => !f.parentId)
  const getChildFolders = (folderId) =>
    folders.filter((f) => f.parentId === folderId)

  const FolderTree = ({ folder, level = 0 }) => {
    const childFolders = getChildFolders(folder.id)
    const folderFiles = getFolderFiles(folder.id)

    return (
      <div key={folder.id}>
        <div
          className="flex items-center gap-1 py-1 px-2 hover:bg-gray-100 rounded group"
          style={{ marginLeft: `${level * 16}px` }}
        >
          <button
            onClick={() => toggleFolder(folder.id)}
            className="p-0.5 hover:bg-gray-200 rounded"
          >
            <span className="material-icons text-sm">
              {expandedFolders[folder.id] ? 'expand_more' : 'chevron_right'}
            </span>
          </button>
          <span className="material-icons text-yellow-500 text-sm">folder</span>
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
            <span className="flex-1 text-sm">{folder.name}</span>
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
              Rename Folder
            </DropdownItem>
            <DropdownItem
              onClick={() => dispatch(deleteFolder({ id: folder.id }))}
              danger
            >
              Delete Folder
            </DropdownItem>
            <DropdownItem onClick={() => handleImportToFolder(folder.id)}>
              Import File
            </DropdownItem>
            <DropdownItem onClick={() => handleAddFileToFolder(folder.id)}>
              Add New File
            </DropdownItem>
            <DropdownItem onClick={() => handleAddFolderToFolder(folder.id)}>
              Add New Folder
            </DropdownItem>
          </DropdownMenu>
        </div>

        {/* Folder contents */}
        {expandedFolders[folder.id] && (
          <div className="space-y-1">
            {/* Nested folders */}
            {childFolders.map((childFolder) => (
              <FolderTree
                key={childFolder.id}
                folder={childFolder}
                level={level + 1}
              />
            ))}
            {/* Files in this folder */}
            {folderFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-1 py-1 px-2 hover:bg-gray-100 rounded group"
                style={{ marginLeft: `${(level + 1) * 16}px` }}
              >
                <span className="w-4"></span>
                <span className="material-icons text-blue-500 text-sm">
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
                  <span className="flex-1 text-sm">{file.name}.md</span>
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
                    Rename File
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => dispatch(deleteFile({ id: file.id }))}
                    danger
                  >
                    Delete File
                  </DropdownItem>
                  <DropdownItem onClick={() => handleExportFile(file)}>
                    Export File as '.mdlc'
                  </DropdownItem>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 text-sm uppercase">
          Markdown Files
        </h3>
        <DropdownMenu
          trigger={
            <button className="p-1 hover:bg-gray-200 rounded-xl flex items-center gap-2">
              <span className="material-icons text-sm">add</span>
            </button>
          }
        >
          <DropdownItem onClick={() => handleAddFileToFolder(null)}>
            New File
          </DropdownItem>
          <DropdownItem onClick={() => setShowNewFolder(true)}>
            New Folder
          </DropdownItem>
        </DropdownMenu>
        <button
          onClick={() => navigate('/markdown')}
          className="text-orange-600 hover:text-orange-700 text-sm"
        >
          View All
        </button>
      </div>

      {showNewFolder && (
        <div className="mb-2 ml-2">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
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
              Create
            </button>
            <button
              onClick={() => {
                setShowNewFolder(false)
                setNewFolderName('')
              }}
              className="px-2 py-1 text-xs bg-gray-300 rounded"
            >
              Cancel
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
            placeholder="File name"
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
              Create
            </button>
            <button
              onClick={() => {
                setShowNewFile(false)
                setNewFileName('')
              }}
              className="px-2 py-1 text-xs bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {/* Folders */}
        {getRootFolders().map((folder) => (
          <FolderTree key={folder.id} folder={folder} />
        ))}

        {/* Root files */}
        {getRootFiles().map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-1 py-1 px-2 hover:bg-gray-100 rounded group"
          >
            <span className="w-4"></span>
            <span className="material-icons text-blue-500 text-sm">
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
              <span className="flex-1 text-sm">{file.name}.md</span>
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
                Rename File
              </DropdownItem>
              <DropdownItem
                onClick={() => dispatch(deleteFile({ id: file.id }))}
                danger
              >
                Delete File
              </DropdownItem>
              <DropdownItem onClick={() => handleExportFile(file)}>
                Export File as '.mdlc'
              </DropdownItem>
            </DropdownMenu>
          </div>
        ))}

        {folders.length === 0 && getRootFiles().length === 0 && (
          <p className="text-sm text-gray-500 ml-2">No files or folders</p>
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
  )
}
