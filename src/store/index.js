import { configureStore } from '@reduxjs/toolkit'
import markdownReducer from './slices/markdownSlice'
import customBlocksReducer from './slices/customBlocks/customBlocksSlice'
import imagesReducer from './slices/gallerySlice'

export const store = configureStore({
  reducer: {
    markdown: markdownReducer,
    customBlocks: customBlocksReducer,
    images: imagesReducer,
  },
})
