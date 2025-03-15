import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AppNavbar from "@/components/app-navbar"
import {  ClerkProvider,} from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] })
import { frFR } from '@clerk/localizations'

export const metadata: Metadata = {
  title: "Tasky | Todo List Application",
  description: "A modern todo list application for managing your tasks",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AppNavbar />
            {children}
          </ThemeProvider>  
        </body>
      </html>
    </ClerkProvider>

  )
}

