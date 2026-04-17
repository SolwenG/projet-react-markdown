import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import {
  getAllBlocks,
  addBlock,
  addBlocks,
  updateBlock,
  deleteBlock,
} from '../../../database/custom-blocks'

export const fetchBlocks = createAsyncThunk(
  'customBlocks/fetchAll',
  async () => {
    return getAllBlocks()
  }
)

export const createBlock = createAsyncThunk(
  'customBlocks/create',
  async (block, thunkAPI) => {
    const state = thunkAPI.getState()
    const existingBlocks = state.customBlocks.blocks

    if (existingBlocks.some((b) => b.name === block.name)) {
      return thunkAPI.rejectWithValue('Un bloc avec ce nom existe déjà')
    }

    if (
      block.shortcut &&
      existingBlocks.some((b) => b.shortcut === block.shortcut)
    ) {
      return thunkAPI.rejectWithValue('Ce raccourci est déjà utilisé')
    }

    const newBlock = {
      ...block,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    }
    await addBlock(newBlock)
    return newBlock
  }
)

export const editBlock = createAsyncThunk(
  'customBlocks/edit',
  async (block, thunkAPI) => {
    const state = thunkAPI.getState()
    const existingBlocks = state.customBlocks.blocks

    if (
      block.name &&
      existingBlocks.some((b) => b.name === block.name && b.id !== block.id)
    ) {
      return thunkAPI.rejectWithValue('Un bloc avec ce nom existe déjà')
    }

    if (
      block.shortcut &&
      existingBlocks.some(
        (b) => b.shortcut === block.shortcut && b.id !== block.id
      )
    ) {
      return thunkAPI.rejectWithValue('Ce raccourci est déjà utilisé')
    }

    await updateBlock(block)
    return block
  }
)

export const deleteBlockAction = createAsyncThunk(
  'customBlocks/delete',
  async (id) => {
    await deleteBlock(id)
    return id
  }
)

export const importBlocks = createAsyncThunk(
  'customBlocks/import',
  async (blocks) => {
    await addBlocks(blocks)
    return blocks
  }
)

const customBlocksSlice = createSlice({
  name: 'customBlocks',
  initialState: {
    blocks: [],
    status: 'idle',
    error: null,
    sortBy: localStorage.getItem('sortBy') ?? 'date',
  },
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload
      localStorage.setItem('sortBy', action.payload)
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
        state.error = null
      })
      .addCase(editBlock.fulfilled, (state, action) => {
        const index = state.blocks.findIndex((b) => b.id === action.payload.id)
        if (index !== -1) state.blocks[index] = action.payload
        state.error = null
      })
      .addCase(createBlock.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(editBlock.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(deleteBlockAction.fulfilled, (state, action) => {
        state.blocks = state.blocks.filter((b) => b.id !== action.payload)
      })
      .addCase(importBlocks.fulfilled, (state, action) => {
        state.blocks.push(...action.payload)
      })
  },
})

export const { setSortBy } = customBlocksSlice.actions

export const selectSortedBlocks = createSelector(
  (state) => state.customBlocks.blocks,
  (state) => state.customBlocks.sortBy,
  (blocks, sortBy) =>
    [...blocks].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date)
      return 0
    })
)

export default customBlocksSlice.reducer
