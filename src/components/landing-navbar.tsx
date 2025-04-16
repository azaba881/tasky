"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import Image from "next/image"
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function LandingNavbar() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            Fonctionnalités
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary">
            Abonnements
          </Link>
          {/* <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
            Témoignages
          </Link> */}
          {/* <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link> */}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Changer le thème</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Clair
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Sombre
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                Système
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <SignedOut>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Connexion</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">S&apos;inscrire</Link>
              </Button>
            </div>
          </SignedOut>

          <SignedIn>
            <Button asChild size="sm">
              <Link href="/dashboard">Tableau de bord</Link>
            </Button>
          </SignedIn>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <span className="h-6 w-6">✕</span>
          ) : (
            <span className="h-6 w-6">☰</span>
          )}
          <span className="sr-only">Menu</span>
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#features"
              className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link
              href="#pricing"
              className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              href="#testimonials"
              className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Témoignages
            </Link>
            <Link
              href="#faq"
              className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </div>
          <div className="border-t border-border px-2 py-3">
            <SignedOut>
              <div className="space-y-2">
                <Link
                  href="/sign-in"
                  className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  href="/sign-up"
                  className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  S&apos;inscrire
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tableau de bord
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  )
}

