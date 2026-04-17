import { configureStore } from '@reduxjs/toolkit'
import markdownReducer from './slices/markdownSlice'
import customBlocksReducer from './slices/customBlockSlice'
import imagesReducer from './slices/gallerySlice'

export const store = configureStore({
  reducer: {
    markdown: markdownReducer,
    customBlocks: customBlocksReducer,
    images: imagesReducer,
  },
})
