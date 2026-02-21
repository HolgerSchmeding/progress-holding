import { de, type Translations } from './de'
import { en } from './en'
import { fr } from './fr'
import { useLanguage, type Language } from '../context/LanguageContext'

const translations: Record<Language, Translations> = { de, en, fr }

export function useTranslation(): Translations {
  const { language } = useLanguage()
  return translations[language]
}

export type { Translations }
