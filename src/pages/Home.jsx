import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className="p-8">
      <h1 className="text-3xl text-gray-800 font-bold">{t('home.title')}</h1>
      <p className="text-center mt-20 text-gray-600">{t('home.description')}</p>
    </div>
  )
}
