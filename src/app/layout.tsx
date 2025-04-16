import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AppNavbar from "@/components/app-navbar"
import {  ClerkProvider,} from '@clerk/nextjs'
import { LanguageProvider } from "@/hooks/use-language"
const inter = Inter({ subsets: ["latin"] })
import { frFR } from '@clerk/localizations'

export const metadata: Metadata = {
  title: "Tasky - Gestion de tâches simplifiée",
  description: "Tasky vous aide à organiser votre travail, augmenter votre productivité et ne plus jamais manquer une échéance.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <AppNavbar />
              {children}
            </LanguageProvider>
          </ThemeProvider>  
        </body>
      </html>
    </ClerkProvider>

  )
}

