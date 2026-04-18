import { useTheme } from '../../context/ThemeContext.jsx'
import { useTranslation } from 'react-i18next'

export default function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-lg bg-white dark:bg-dark-surface shadow-sm hover:bg-gray-100 dark:hover:bg-dark-surface-hover transition-colors"
      aria-label="Toggle theme"
      title={isDark ? t('theme.enableLight') : t('theme.enableDark')}
    >
      {isDark ? (
        <span className="material-icons text-white text-xl">light_mode</span>
      ) : (
        <span className="material-icons text-gray-700 text-xl">dark_mode</span>
      )}
    </button>
  )
}
