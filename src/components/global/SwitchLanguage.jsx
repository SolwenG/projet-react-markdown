import { useTranslation } from 'react-i18next'

export default function SwitchLanguage() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="p-4 border-t border-gray-200 flex justify-center">
      <div className="flex gap-2">
        <button
          onClick={() => changeLanguage('en')}
          className={`px-3 py-1 text-sm rounded ${
            i18n.language === 'en'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage('fr')}
          className={`px-3 py-1 text-sm rounded ${
            i18n.language === 'fr'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          FR
        </button>
      </div>
    </div>
  )
}
