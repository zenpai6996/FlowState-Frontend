import { createContext, useContext, useEffect, useState } from "react"
import { flushSync } from 'react-dom';

// Define your available themes
type Theme = "dark" | "light" | "system" | "vibrant" | "warm" | "ocean" | "forest" | "sunset" | "purple"

// Define theme configurations
const themeConfigs = {
  vibrant: {
    name: "Cyberpunk",
    lightVars: {
      background: "#0c0c1d",
      foreground: "#eceff4",
      card: "#1e1e3f",
      "card-foreground": "#eceff4",
      primary: "#ff00c8",
      "primary-foreground": "#ffffff",
      secondary: "#1e1e3f",
      "secondary-foreground": "#eceff4",
      accent: "#00ffcc",
      "accent-foreground": "#0c0c1d",
      muted: "#1e1e3f",
      "muted-foreground": "#8085a6",
      border: "#2e2e5e",
      input: "#2e2e5e",
      ring: "#ff00c8",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
    },
    darkVars: {
      background: "#0c0c1d",
      foreground: "#eceff4",
      card: "#1e1e3f",
      "card-foreground": "#eceff4",
      primary: "#ff00c8",
      "primary-foreground": "#ffffff",
      secondary: "#1e1e3f",
      "secondary-foreground": "#eceff4",
      accent: "#00ffcc",
      "accent-foreground": "#0c0c1d",
      muted: "#1e1e3f",
      "muted-foreground": "#8085a6",
      border: "#2e2e5e",
      input: "#2e2e5e",
      ring: "#ff00c8",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
    }
  },
  warm: {
    name: "Hazel",
    lightVars: {
      background: "#ffffff",
      foreground: "#451a03",
      card: "#fefefe",
      "card-foreground": "#451a03",
      primary: "#ea580c",
      "primary-foreground": "#ffffff",
      secondary: "#fef3c7",
      "secondary-foreground": "#92400e",
      accent: "#f59e0b",
      "accent-foreground": "#ffffff",
      muted: "#fef7ed",
      "muted-foreground": "#a16207",
      border: "#fed7aa",
      input: "#fef3c7",
      ring: "#ea580c",
      destructive: "#dc2626",
      "destructive-foreground": "#ffffff",
    },
    darkVars: {
      background: "#1c1410",
      foreground: "#fef3c7",
      card: "#2d1b12",
      "card-foreground": "#fef3c7",
      primary: "#f59e0b",
      "primary-foreground": "#000000",
      secondary: "#2d1b12",
      "secondary-foreground": "#fef3c7",
      accent: "#92400e",
      "accent-foreground": "#fde68a",
      muted: "#2d1b12",
      "muted-foreground": "#d97706",
      border: "#451a03",
      input: "#451a03",
      ring: "#f59e0b",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
    }
  },
  ocean: {
    name: "Ocean",
    lightVars: {
      background: "#ffffff",
      foreground: "#0f172a",
      card: "#fafafa",
      "card-foreground": "#0f172a",
      primary: "#0ea5e9",
      "primary-foreground": "#ffffff",
      secondary: "#f1f5f9",
      "secondary-foreground": "#475569",
      accent: "#06b6d4",
      "accent-foreground": "#ffffff",
      muted: "#f8fafc",
      "muted-foreground": "#64748b",
      border: "#e2e8f0",
      input: "#f1f5f9",
      ring: "#0ea5e9",
      destructive: "#dc2626",
      "destructive-foreground": "#ffffff",
    },
    darkVars: {
      background: "#0c1520",
      foreground: "#e0f2fe",
      card: "#1e293b",
      "card-foreground": "#e0f2fe",
      primary: "#0ea5e9",
      "primary-foreground": "#ffffff",
      secondary: "#1e293b",
      "secondary-foreground": "#e0f2fe",
      accent: "#075985",
      "accent-foreground": "#bae6fd",
      muted: "#1e293b",
      "muted-foreground": "#0ea5e9",
      border: "#334155",
      input: "#334155",
      ring: "#0ea5e9",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
    }
  },
  forest: {
    name: "Forest",
    lightVars: {
      background: "#ffffff",
      foreground: "#14532d",
      card: "#fafafa",
      "card-foreground": "#14532d",
      primary: "#16a34a",
      "primary-foreground": "#ffffff",
      secondary: "#f0fdf4",
      "secondary-foreground": "#166534",
      accent: "#22c55e",
      "accent-foreground": "#ffffff",
      muted: "#f7fee7",
      "muted-foreground": "#4d7c0f",
      border: "#d4e6a1",
      input: "#f0fdf4",
      ring: "#16a34a",
      destructive: "#dc2626",
      "destructive-foreground": "#ffffff",
    },
    darkVars: {
      background: "#0f1f13",
      foreground: "#dcfce7",
      card: "#1a2e1a",
      "card-foreground": "#dcfce7",
      primary: "#22c55e",
      "primary-foreground": "#ffffff",
      secondary: "#1a2e1a",
      "secondary-foreground": "#dcfce7",
      accent: "#166534",
      "accent-foreground": "#bbf7d0",
      muted: "#1a2e1a",
      "muted-foreground": "#22c55e",
      border: "#15803d",
      input: "#15803d",
      ring: "#22c55e",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
    }
  },
  sunset: {
    name: "Dusk",
    lightVars: {
      background: "#ffffff",
      foreground: "#7c2d12",
      card: "#fefefe",
      "card-foreground": "#7c2d12",
      primary: "#dc2626",
      "primary-foreground": "#ffffff",
      secondary: "#fef2f2",
      "secondary-foreground": "#991b1b",
      accent: "#f97316",
      "accent-foreground": "#ffffff",
      muted: "#fef5e7",
      "muted-foreground": "#c2410c",
      border: "#fed7aa",
      input: "#fef2f2",
      ring: "#dc2626",
      destructive: "#dc2626",
      "destructive-foreground": "#ffffff",
    },
    darkVars: {
      background: "#1f1612",
      foreground: "#fed7aa",
      card: "#292017",
      "card-foreground": "#fed7aa",
      primary: "#ef4444",
      "primary-foreground": "#ffffff",
      secondary: "#292017",
      "secondary-foreground": "#fed7aa",
      accent: "#c2410c",
      "accent-foreground": "#fed7aa",
      muted: "#292017",
      "muted-foreground": "#f97316",
      border: "#451a03",
      input: "#451a03",
      ring: "#ef4444",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
    }
  },
  purple: {
    name: "retro",
    lightVars: {
      background: "#ffffff",
      foreground: "#581c87",
      card: "#fafafa",
      "card-foreground": "#581c87",
      primary: "#7c3aed",
      "primary-foreground": "#ffffff",
      secondary: "#faf5ff",
      "secondary-foreground": "#6b21a8",
      accent: "#a855f7",
      "accent-foreground": "#ffffff",
      muted: "#f5f3ff",
      "muted-foreground": "#7c2d92",
      border: "#e9d5ff",
      input: "#faf5ff",
      ring: "#7c3aed",
      destructive: "#dc2626",
      "destructive-foreground": "#ffffff",
    },
    darkVars: {
      background: "#1e1024",
      foreground: "#e9d5ff",
      card: "#2d1b3d",
      "card-foreground": "#e9d5ff",
      primary: "#a855f7",
      "primary-foreground": "#ffffff",
      secondary: "#2d1b3d",
      "secondary-foreground": "#e9d5ff",
      accent: "#6b21a8",
      "accent-foreground": "#ddd6fe",
      muted: "#2d1b3d",
      "muted-foreground": "#a855f7",
      border: "#4c1d95",
      input: "#4c1d95",
      ring: "#a855f7",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
    }
  }
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  availableThemes: typeof themeConfigs
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
  availableThemes: themeConfigs,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    return storedTheme || defaultTheme
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

const applyThemeVars = (vars: Record<string, string>) => {
  const root = document.documentElement;
  
  // Enable transitions
  root.style.setProperty('--transition-duration', '0.3s');
  root.style.setProperty('--transition-easing', 'cubic-bezier(0.4, 0, 0.2, 1)');
  
  // Start transition
  root.classList.add('theme-transition');
  
  // Apply new theme variables
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  // End transition after it completes
  const onTransitionEnd = () => {
    root.classList.remove('theme-transition');
    root.removeEventListener('transitionend', onTransitionEnd);
  };
  root.addEventListener('transitionend', onTransitionEnd);
};
useEffect(() => {
  if (!mounted) return;

  const root = window.document.documentElement;
  
  // Start transition
  root.classList.add('theme-transition');
  
  // Handle theme change as before
  root.classList.remove("light", "dark");
  
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches ? "dark" : "light";
    root.classList.add(systemTheme);
  } else if (theme === "light" || theme === "dark") {
    root.classList.add(theme);
    // Clear custom theme variables
    Object.keys(themeConfigs.vibrant.lightVars).forEach(key => {
      root.style.removeProperty(`--${key}`);
    });
  } else {
    const themeConfig = themeConfigs[theme as keyof typeof themeConfigs];
    if (themeConfig) {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const varsToApply = isDarkMode ? themeConfig.darkVars : themeConfig.lightVars;
      root.classList.add(isDarkMode ? "dark" : "light");
      applyThemeVars(varsToApply);
    }
  }
  
  // End transition after it completes
  const onTransitionEnd = () => {
    root.classList.remove('theme-transition');
    root.removeEventListener('transitionend', onTransitionEnd);
  };
  root.addEventListener('transitionend', onTransitionEnd);
}, [theme, mounted]);
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    // Handle system theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    // Handle default themes
    if (theme === "light" || theme === "dark") {
      root.classList.add(theme)
      root.classList.add("theme-transition");
      window.requestAnimationFrame(() => {
        root.classList.add(theme);
      });
      setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 500);
      // Clear any custom theme variables when switching back to default themes
      Object.keys(themeConfigs.vibrant.lightVars).forEach(key => {
        root.style.removeProperty(`--${key}`)
      })
      return
    }

    // Handle custom themes
    const themeConfig = themeConfigs[theme as keyof typeof themeConfigs]
    if (themeConfig) {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      const varsToApply = isDarkMode ? themeConfig.darkVars : themeConfig.lightVars
      
      root.classList.add(isDarkMode ? "dark" : "light")
      applyThemeVars(varsToApply)
    }
  }, [theme, mounted])

 const value = {
  theme,
  setTheme: (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    if (!document.startViewTransition) {
      setTheme(newTheme)
    } else {
      // The actual transition will be handled by the ModeToggle component
      setTheme(newTheme)
    }
  },
  availableThemes: themeConfigs,
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