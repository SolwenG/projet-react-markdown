import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  blocks: [],
  selectedBlock: null,
}

const customBlockSlice = createSlice({
  name: 'customBlocks',
  initialState,
  reducers: {
    importBlock: (state, action) => {
      if (Array.isArray(action.payload)) {
        // Import multiple blocks
        action.payload.forEach((block) => {
          state.blocks.push({
            ...block,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        })
      } else {
        // Import single block
        state.blocks.push({
          ...action.payload,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      }
    },
  },
})

export const { importBlock } = customBlockSlice.actions

export default customBlockSlice.reducer
