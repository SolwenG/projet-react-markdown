import { useTranslation } from 'react-i18next'

export default function MarkdownPage() {
  const { t } = useTranslation()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{t('markdownFiles.pageTitle')}</h1>
    </div>
  )
}
