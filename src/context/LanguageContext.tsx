import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Language = 'de' | 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && ['de', 'en', 'fr'].includes(saved)) return saved
    // Browser-Sprache erkennen
    const browserLang = navigator.language.slice(0, 2)
    if (browserLang === 'fr') return 'fr'
    if (browserLang === 'en') return 'en'
    return 'de'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
