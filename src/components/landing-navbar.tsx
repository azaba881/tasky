"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Globe, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/hooks/use-language"

export default function LandingNavbar() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  // Vérifier si les traductions sont des chaînes de caractères ou des objets
  const featuresText = typeof t.features === 'string' ? t.features : 'Features';
  const pricingText = typeof t.pricing === 'string' ? t.pricing : 'Pricing';
  const testimonialsText = typeof t.testimonials === 'string' ? t.testimonials : 'Testimonials';
  const loginText = typeof t.login === 'string' ? t.login : 'Login';
  const signupText = typeof t.signup === 'string' ? t.signup : 'Sign Up';
  const goToDashboardText = t.hero && typeof t.hero.goToDashboard === 'string' 
    ? t.hero.goToDashboard 
    : 'Go to Dashboard';

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
            {featuresText}
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary">
            {pricingText}
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
            {testimonialsText}
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
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
                Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <SignedOut>
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {loginText}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  {signupText}
                </Button>
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard">
              <Button size="sm">
                {goToDashboardText}
              </Button>
            </Link>
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
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
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
              {featuresText}
            </Link>
            <Link
              href="#pricing"
              className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              {pricingText}
            </Link>
            <Link
              href="#testimonials"
              className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              {testimonialsText}
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
                  href="/login"
                  className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {loginText}
                </Link>
                <Link
                  href="/register"
                  className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {signupText}
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {goToDashboardText}
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  )
}

