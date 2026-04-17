import { configureStore } from '@reduxjs/toolkit'
import imagesReducer from './images/imagesSlice.js'

export const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
})
