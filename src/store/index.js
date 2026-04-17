import { configureStore } from '@reduxjs/toolkit'
import markdownReducer from './slices/markdownSlice'
import customBlockReducer from './slices/customBlockSlice'
import imagesReducer from './slices/gallerySlice'

export const store = configureStore({
  reducer: {
    markdown: markdownReducer,
    customBlocks: customBlockReducer,
    images: imagesReducer,
  },
})
