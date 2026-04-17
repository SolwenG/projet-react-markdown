import { useState, useEffect } from 'react'
import { useShortcutInput } from '../../../hooks/useShortcutInput'

function FormField({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
        {label}
        {hint && <span className="text-gray-400 normal-case ml-1">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass = "bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400"

export default function BlockCreateModal({ isOpen, onClose, onSubmit, blockToEdit, error }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { shortcut, shortcutWarning, handleShortcutKeyDown, resetShortcut } = useShortcutInput()

  useEffect(() => {
    if (blockToEdit) {
      setName(blockToEdit.name)
      setDescription(blockToEdit.description)
      resetShortcut(blockToEdit.shortcut || '')
    } else {
      setName('')
      setDescription('')
      resetShortcut()
    }
  }, [blockToEdit, isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !description.trim()) return
    onSubmit({
      ...(blockToEdit && { id: blockToEdit.id, date: blockToEdit.date }),
      name: name.trim(),
      description: description.trim(),
      shortcut: shortcut || null,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {blockToEdit ? 'Modifier le bloc' : 'Nouveau bloc'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Nom">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="ex: Introduction" className={inputClass} />
          </FormField>

          <FormField label="Description / Contenu">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="ex: ## Introduction" rows={4}
              className={`${inputClass} resize-none`} />
          </FormField>

          <FormField label="Raccourci" hint="(optionnel — appuie sur une touche)">
            <input type="text" value={shortcut} onKeyDown={handleShortcutKeyDown}
              readOnly placeholder="ex: ctrl+k" className={`${inputClass} cursor-pointer`} />
            {shortcutWarning && <p className="text-xs text-red-500 mt-1">{shortcutWarning}</p>}
          </FormField>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 justify-end mt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Annuler
            </button>
            <button type="submit"
              className="px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors">
              {blockToEdit ? 'Enregistrer' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
