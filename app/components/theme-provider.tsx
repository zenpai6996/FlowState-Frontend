import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system" 

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  // Start with defaultTheme to ensure server/client consistency
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Only run after hydration to prevent mismatch
  useEffect(() => {
    setMounted(true)
    
    // Check localStorage only after component mounts (client-side only)
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(storageKey) as Theme
      if (storedTheme && storedTheme !== defaultTheme) {
        setTheme(storedTheme)
      }
    }
  }, [storageKey, defaultTheme])

  useEffect(() => {
    // Only apply theme changes after mounting to avoid hydration issues
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
        

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
  }

  // Don't render children until after hydration if theme might change
  if (!mounted) {
    return (
      <ThemeProviderContext.Provider {...props} value={value}>
        <div className={defaultTheme}>{children}</div>
      </ThemeProviderContext.Provider>
    )
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}