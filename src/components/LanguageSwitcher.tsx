import { useLanguage, type Language } from '../i18n'

const languages: Language[] = ['es', 'en']

function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="lang-switcher" role="group" aria-label={t.languageLabel}>
      {languages.map((lang) => (
        <button
          key={lang}
          className="lang-option"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
