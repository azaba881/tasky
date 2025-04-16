"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fr } from "@/translations/fr";
import { en } from "@/translations/en";

type Language = "fr" | "en";

interface LanguageState {
    language: Language;
    setLanguage: (language: Language) => void;
    t: typeof fr;
}

export const useLanguage = create<LanguageState>()(
    persist(
        (set, get) => ({
            language: "fr",
            setLanguage: (language) => set({ language, t: language === "fr" ? fr : en }),
            t: fr,
        }),
        {
            name: "language-storage",
        }
    )
); 