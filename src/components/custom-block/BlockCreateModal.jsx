import { useState } from 'react'
import { useShortcutInput } from '../../hooks/useShortcutInput.js'
import { useTranslation } from 'react-i18next'

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

const inputClass =
  'bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400'

export default function BlockCreateModal({
  isOpen,
  onClose,
  onSubmit,
  blockToEdit,
  error,
}) {
  const [name, setName] = useState(blockToEdit?.name || '')
  const [description, setDescription] = useState(blockToEdit?.description || '')
  const [content, setContent] = useState(blockToEdit?.content || '')
  const { shortcut, shortcutWarning, handleShortcutKeyDown } = useShortcutInput(
    blockToEdit?.shortcut || ''
  )
  const { t } = useTranslation()

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    onSubmit({
      ...(blockToEdit && { id: blockToEdit.id, date: blockToEdit.date }),
      name: name.trim(),
      description: description.trim(),
      content: content.trim(),
      shortcut: shortcut || null,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {blockToEdit ? t('blockCreate.editBlock') : t('blockCreate.newBlock')}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label={t('blockCreate.name')}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('blockCreate.namePlaceholder')}
              className={inputClass}
            />
          </FormField>

          <FormField
            label={t('blockCreate.description')}
            hint={t('blockCreate.optional')}
          >
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('blockCreate.descriptionPlaceholder')}
              className={inputClass}
            />
          </FormField>

          <FormField label={t('blockCreate.content')}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('blockCreate.contentPlaceholder')}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </FormField>

          <FormField
            label={t('blockCreate.shortcut')}
            hint={t('blockCreate.shortcutHint')}
          >
            <input
              type="text"
              value={shortcut}
              onKeyDown={handleShortcutKeyDown}
              readOnly
              placeholder={t('blockCreate.shortcutPlaceholder')}
              className={`${inputClass} cursor-pointer`}
            />
            {shortcutWarning && (
              <p className="text-xs text-red-500 mt-1">{shortcutWarning}</p>
            )}
          </FormField>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {t('blockCreate.cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              {blockToEdit ? t('blockCreate.save') : t('blockCreate.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
