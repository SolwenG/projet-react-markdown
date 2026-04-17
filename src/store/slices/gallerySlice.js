import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  addImage,
  getAllImages,
  deleteImage,
  renameImage as renameImageDB,
} from '../../database/images/index.js'

export const fetchImages = createAsyncThunk('images/fetchAll', async () => {
  const images = await getAllImages()
  return images.map((img) => ({
    ...img,
    date: img.date instanceof Date ? img.date.toISOString() : img.date,
  }))
})

export const uploadImage = createAsyncThunk(
  'images/upload',
  async ({ name, base64 }) => {
    const result = await addImage(name, base64)
    return {
      ...result,
      date: result.date instanceof Date ? result.date.toISOString() : result.date,
    }
  }
)

export const removeImage = createAsyncThunk('images/remove', async (id) => {
  await deleteImage(id)
  return id
})

export const renameImage = createAsyncThunk(
  'images/rename',
  async ({ id, name }) => {
    const result = await renameImageDB(id, name)
    return {
      ...result,
      date: result.date instanceof Date ? result.date.toISOString() : result.date,
    }
  }
)

const gallerySlice = createSlice({
  name: 'images',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(uploadImage.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })

      .addCase(removeImage.fulfilled, (state, action) => {
        state.items = state.items.filter((img) => img.id !== action.payload)
      })

      .addCase(renameImage.fulfilled, (state, action) => {
        const index = state.items.findIndex((img) => img.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
  },
})

export default gallerySlice.reducer
