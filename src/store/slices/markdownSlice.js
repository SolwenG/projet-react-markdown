import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import {
  createMdFile,
  deleteAllFiles,
  deleteFileById,
  getAllFiles,
  updateMdFile,
  createFolder,
  getAllFolders,
  updateFolder,
  deleteFolderById,
} from '../../database/markdown-files/index.js'

export const fetchMarkdownFiles = createAsyncThunk('markdown/fetchFiles', async () => {
  const files = await getAllFiles()
  return files
})

export const fetchFolders = createAsyncThunk('markdown/fetchFolders', async () => {
  const folders = await getAllFolders()
  return folders
})

export const addMarkdownFile = createAsyncThunk('markdown/addFile', async (fileDetails) => {
  const newFile = await createMdFile(fileDetails)
  return newFile
})

export const removeMarkdownFile = createAsyncThunk('markdown/removeFile', async (id) => {
  await deleteFileById(id)
  return id
})

export const editMarkdownFile = createAsyncThunk('markdown/editFile', async ({ id, changes }) => {
  const updatedFile = await updateMdFile(id, changes)
  return updatedFile
})

export const clearMarkdownFiles = createAsyncThunk('markdown/clearFiles', async () => {
  await deleteAllFiles()
  return []
})

export const addFolder = createAsyncThunk('markdown/addFolder', async (folderDetails) => {
  const newFolder = await createFolder(folderDetails)
  return newFolder
})

export const renameFolder = createAsyncThunk('markdown/renameFolder', async ({ id, name }) => {
  const updatedFolder = await updateFolder(id, { name })
  return updatedFolder
})

export const deleteFolder = createAsyncThunk('markdown/deleteFolder', async (id, { getState }) => {
  await deleteFolderById(id)
  return id
})

export const moveFolder = createAsyncThunk('markdown/moveFolder', async ({ folderId, targetFolderId }) => {
  const updatedFolder = await updateFolder(folderId, { parentId: targetFolderId || null })
  return updatedFolder
})

export const moveFile = createAsyncThunk('markdown/moveFile', async ({ fileId, targetFolderId }) => {
  const updatedFile = await updateMdFile(fileId, { folderId: targetFolderId || null })
  return updatedFile
})

export const renameFile = createAsyncThunk('markdown/renameFile', async ({ id, name }) => {
  const updatedFile = await updateMdFile(id, { name })
  return updatedFile
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
  reducers: {},
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
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.folders = action.payload
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
      .addCase(editMarkdownFile.fulfilled, (state, action) => {
        const index = state.files.findIndex((f) => f.id === action.payload.id)
        if (index !== -1) {
          state.files[index] = action.payload
        }
      })
      .addCase(addFolder.fulfilled, (state, action) => {
        state.folders.push(action.payload)
      })
      .addCase(renameFolder.fulfilled, (state, action) => {
        const folder = state.folders.find((f) => f.id === action.payload.id)
        if (folder) {
          folder.name = action.payload.name
        }
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter((f) => f.id !== action.payload)
        state.files = state.files.filter((f) => f.folderId !== action.payload)
      })
      .addCase(moveFolder.fulfilled, (state, action) => {
        const folder = state.folders.find((f) => f.id === action.payload.id)
        if (folder) {
          folder.parentId = action.payload.parentId
        }
      })
      .addCase(moveFile.fulfilled, (state, action) => {
        const file = state.files.find((f) => f.id === action.payload.id)
        if (file) {
          file.folderId = action.payload.folderId
          file.date = action.payload.date
        }
      })
      .addCase(renameFile.fulfilled, (state, action) => {
        const file = state.files.find((f) => f.id === action.payload.id)
        if (file) {
          file.name = action.payload.name
          file.date = action.payload.date
        }
      })
  },
})

export default markdownSlice.reducer
