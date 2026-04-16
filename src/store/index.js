import { configureStore } from '@reduxjs/toolkit'
import customBlocksReducer from './slices/customBlocks/customBlocksSlice'

export const store = configureStore({
  reducer: {
    customBlocks: customBlocksReducer,
  },
})