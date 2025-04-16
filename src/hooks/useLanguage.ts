import { useCallback } from 'react';
import { fr } from '../translations/fr';
import { en } from '../translations/en';

type Language = 'en' | 'fr';

const translations = {
    en,
    fr,
};

export const useLanguage = (language: Language = 'en') => {
    const t = useCallback((key: string) => {
        const keys = key.split('.');
        let value: any = translations[language];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }
        
        return typeof value === 'string' ? value : key;
    }, [language]);

    return { t };
}; 