import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function SwitchLanguage() {
  const { i18n, t } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    document.dir = i18n.dir()
  }, [i18n, i18n.language])

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
          title={t('languageSwitcher.english')}
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
          title={t('languageSwitcher.french')}
        >
          FR
        </button>
        <button
          onClick={() => changeLanguage('ar')}
          className={`px-3 py-1 text-sm rounded ${
            i18n.language === 'ar'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={t('languageSwitcher.arabic')}
        >
          AR
        </button>
      </div>
    </div>
  )
}
