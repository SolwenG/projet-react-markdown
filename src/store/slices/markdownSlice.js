import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import {
  createMdFile,
  deleteAllFiles,
  deleteFileById,
  getAllFiles,
} from '../../database/markdown-files/index.js'

export const fetchMarkdownFiles = createAsyncThunk('markdown/fetchFiles', async () => {
  const files = await getAllFiles()
  return files
})

export const addMarkdownFile = createAsyncThunk('markdown/addFile', async (fileDetails) => {
  const newFile = await createMdFile(fileDetails)
  return newFile
})

export const removeMarkdownFile = createAsyncThunk('markdown/removeFile', async (id) => {
  await deleteFileById(id)
  return id
})

export const clearMarkdownFiles = createAsyncThunk('markdown/clearFiles', async () => {
  await deleteAllFiles()
  return []
})

const initialState = {
  files: [],
  folders: [],
  selectedFile: null,
  selectedFolder: null,
  loading: false,
  error: null,
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
    renameFile: (state, action) => {
      const file = state.files.find((f) => f.id === action.payload.id)
      if (file) {
        file.name = action.payload.name
        file.updatedAt = new Date().toISOString()
      }
    },
    moveFile: (state, action) => {
      const file = state.files.find((f) => f.id === action.payload.fileId)
      if (file) {
        file.folderId = action.payload.targetFolderId || null
        file.updatedAt = new Date().toISOString()
      }
    },
    moveFolder: (state, action) => {
      const folder = state.folders.find((f) => f.id === action.payload.folderId)
      if (folder) {
        folder.parentId = action.payload.targetFolderId || null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkdownFiles.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMarkdownFiles.fulfilled, (state, action) => {
        state.loading = false
        state.files = action.payload
      })
      .addCase(fetchMarkdownFiles.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addMarkdownFile.fulfilled, (state, action) => {
        state.files.push(action.payload)
      })
      .addCase(removeMarkdownFile.fulfilled, (state, action) => {
        state.files = state.files.filter((f) => f.id !== action.payload)
      })
      .addCase(clearMarkdownFiles.fulfilled, (state) => {
        state.files = []
      })
  },
})

export const {
  addFolder,
  renameFolder,
  deleteFolder,
  renameFile,
  moveFile,
  moveFolder,
} = markdownSlice.actions

export default markdownSlice.reducer
