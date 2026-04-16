import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllBlocks, addBlock, updateBlock, deleteBlock } from '../../../database/custom-blocks'

export const fetchBlocks = createAsyncThunk('customBlocks/fetchAll', async () => {
  return getAllBlocks()
})

export const createBlock = createAsyncThunk('customBlocks/create', async (block) => {
  const newBlock = { ...block, id: crypto.randomUUID(), date: new Date().toISOString() }
  await addBlock(newBlock)
  return newBlock
})

export const editBlock = createAsyncThunk('customBlocks/edit', async (block) => {
  await updateBlock(block)
  return block
})

export const deleteBlockAction = createAsyncThunk('customBlocks/delete', async (id) => {
  await deleteBlock(id)
  return id
})

const customBlocksSlice = createSlice({
  name: 'customBlocks',
  initialState: {
    blocks: [],
    status: 'idle',
    error: null,
    sortBy: 'date',
  },
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        state.blocks = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchBlocks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createBlock.fulfilled, (state, action) => {
        state.blocks.push(action.payload)
      })
      .addCase(editBlock.fulfilled, (state, action) => {
        const index = state.blocks.findIndex((b) => b.id === action.payload.id)
        if (index !== -1) state.blocks[index] = action.payload
      })
      .addCase(deleteBlockAction.fulfilled, (state, action) => {
        state.blocks = state.blocks.filter((b) => b.id !== action.payload)
      })
  },
})

export const { setSortBy } = customBlocksSlice.actions

export const selectSortedBlocks = (state) => {
  const { blocks, sortBy } = state.customBlocks
  return [...blocks].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date)
    return 0
  })
}

export default customBlocksSlice.reducer