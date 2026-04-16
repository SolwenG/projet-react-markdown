import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  files: [],
  folders: [],
  selectedFile: null,
  selectedFolder: null,
}

const markdownSlice = createSlice({
  name: 'markdown',
  initialState,
  reducers: {
    addFolder: (state, action) => {
      const newFolder = {
        id: uuidv4(),
        name: action.payload.name,
        parentId: action.payload.parentId || null,
        createdAt: new Date().toISOString(),
      }
      state.folders.push(newFolder)
    },
    renameFolder: (state, action) => {
      const folder = state.folders.find((f) => f.id === action.payload.id)
      if (folder) {
        folder.name = action.payload.name
      }
    },
    deleteFolder: (state, action) => {
      state.folders = state.folders.filter((f) => f.id !== action.payload.id)
      // supprime aussi les fichiers du dossier
      state.files = state.files.filter((f) => f.folderId !== action.payload.id)
    },
    addFile: (state, action) => {
      const newFile = {
        id: uuidv4(),
        name: action.payload.name,
        content: action.payload.content || '',
        folderId: action.payload.folderId || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      state.files.push(newFile)
    },
    renameFile: (state, action) => {
      const file = state.files.find((f) => f.id === action.payload.id)
      if (file) {
        file.name = action.payload.name
        file.updatedAt = new Date().toISOString()
      }
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((f) => f.id !== action.payload.id)
    },
  },
})

export const {
  addFolder,
  renameFolder,
  deleteFolder,
  addFile,
  renameFile,
  deleteFile,
} = markdownSlice.actions

export default markdownSlice.reducer
