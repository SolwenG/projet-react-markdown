import { configureStore } from '@reduxjs/toolkit'
import markdownReducer from './slices/markdownSlice'
import customBlockReducer from './slices/customBlockSlice'
import galleryReducer from './slices/gallerySlice'
import imagesReducer from './images/imagesSlice'

export const store = configureStore({
  reducer: {
    markdown: markdownReducer,
    customBlocks: customBlockReducer,
    gallery: galleryReducer,
    images: imagesReducer,
  },
})
