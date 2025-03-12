"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Globe, User, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginForm from "@/components/login-form"
import Image from "next/image"

export default function LandingNavbar() {
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState<"fr" | "en">("fr")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [signupMode, setSignupMode] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  const translations = {
    fr: {
      features: "Fonctionnalités",
      pricing: "Tarifs",
      testimonials: "Témoignages",
      login: "Connexion",
      signup: "S'inscrire",
      switchToSignup: "Pas de compte ? S'inscrire",
      switchToLogin: "Déjà un compte ? Se connecter",
    },
    en: {
      features: "Features",
      pricing: "Pricing",
      testimonials: "Testimonials",
      login: "Login",
      signup: "Sign Up",
      switchToSignup: "No account? Sign up",
      switchToLogin: "Already have an account? Log in",
    },
  }

  const t = translations[language]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="relative flex items-center gap-2">
          <Link href="/">
            <Image 
              className="dark:hidden" 
              src="/logo-light.png" 
              alt="logo" 
              width={120} 
              height={120} 
              priority 
            />

            {/* Logo sombre (visible en mode dark) */}
            <Image 
              className="hidden dark:block" 
              src="/logo-dark.png" 
              alt="logo" 
              width={120} 
              height={120} 
              priority 
            />          
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary">
            {t.features}
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary">
            {t.pricing}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("fr")}>
                <span className={cn("mr-2", language === "fr" && "text-primary")}>🇫🇷</span> Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                <span className={cn("mr-2", language === "en" && "text-primary")}>🇬🇧</span> English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{signupMode ? t.signup : t.login}</DialogTitle>
                <DialogDescription>
                  {signupMode ? t.switchToLogin : t.switchToSignup}
                  <Button
                    variant="link"
                    className="pl-2 h-auto"
                    onClick={() => setSignupMode(!signupMode)}
                  >
                    {signupMode ? t.login : t.signup}
                  </Button>
                </DialogDescription>
              </DialogHeader>
              <LoginForm />
            </DialogContent>
          </Dialog>

          <Button
            onClick={() => {
              setSignupMode(false)
              setLoginDialogOpen(true)
            }}
          >
            {t.login}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t py-4">
          <div className="container space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.features}
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.pricing}
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.testimonials}
              </Link>
            </nav>
            <div className="flex items-center space-x-4 pt-4 border-t">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  toggleLanguage()
                  setMobileMenuOpen(false)
                }}
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark")
                  setMobileMenuOpen(false)
                }}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button
                onClick={() => {
                  setSignupMode(false)
                  setLoginDialogOpen(true)
                  setMobileMenuOpen(false)
                }}
              >
                {t.login}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

