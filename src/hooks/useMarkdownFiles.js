import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMarkdownFiles,
  addMarkdownFile,
  removeMarkdownFile,
  clearMarkdownFiles,
  editMarkdownFile,
} from '../store/slices/markdownSlice.js'

export default function useMarkdownFiles() {
  const dispatch = useDispatch()
  const { files, folders, loading, error } = useSelector((state) => state.markdown)

  const computedFiles = [...files].reverse().slice(0, 10)

  useEffect(() => {
    dispatch(fetchMarkdownFiles())
  }, [dispatch])

  const handleCreate = async (fileDetails) => {
    await dispatch(addMarkdownFile(fileDetails))
  }

  const handleUpdate = async (id, changes) => {
    await dispatch(editMarkdownFile({ id, changes }))
  }

  const handleDelete = async (id) => {
    await dispatch(removeMarkdownFile(id))
  }

  const handleDeleteAll = async () => {
    await dispatch(clearMarkdownFiles())
  }

  return {
    files: computedFiles,
    allFiles: files,
    folders,
    totalFiles: files.length,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleDeleteAll,
  }
}
