import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  images: [],
  selectedImage: null,
  previewImage: null,
}

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    addImage: (state, action) => {
      const newImage = {
        id: uuidv4(),
        name: action.payload.name,
        data: action.payload.data, // base64
        size: action.payload.size,
        type: action.payload.type,
        createdAt: new Date().toISOString(),
      }
      state.images.push(newImage)
    },
  },
})

export const { addImage } = gallerySlice.actions

export default gallerySlice.reducer
