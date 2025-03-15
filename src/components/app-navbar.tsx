"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Calendar, BarChart2, User, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"
import { SignedIn, UserButton } from "@clerk/nextjs"

export default function AppNavbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Hydration fix
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't show navbar on landing page
  if (pathname === "/" || pathname === "/sign-up" || pathname === "/sign-in") return null
  
  return (
    <header className="border-b bg-background px-6">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
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

        <nav className="flex items-center space-x-1">
          <Button asChild variant={pathname === "/dashboard" ? "default" : "ghost"} size="sm">
            <Link href="/dashboard" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </Button>

          <Button asChild variant={pathname === "/dashboard/calendar" ? "default" : "ghost"} size="sm">
            <Link href="/dashboard/calendar" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </Link>
          </Button>

          <Button asChild variant={pathname === "/dashboard/summary" ? "default" : "ghost"} size="sm">
            <Link href="/dashboard/summary" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Summary</span>
            </Link>
          </Button>

          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <SignedIn>
              <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}

