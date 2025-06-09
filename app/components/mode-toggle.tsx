// mode-toggle.tsx
import { Palette, Check } from "lucide-react"
import { Button } from "./ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useTheme } from "./theme-provider"
import { useEffect, useRef } from "react"
import { flushSync } from 'react-dom'

const defaultThemes = [
  { key: "dark", name: "Default" },
]

export function ModeToggle() {
  const { theme, setTheme, availableThemes } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const getThemeColor = (themeKey: string) => {
    switch (themeKey) {
      case "vibrant": return "bg-gradient-to-r from-pink-500 to-cyan-400"
      case "warm": return "bg-gradient-to-r from-orange-500 to-amber-400"
      case "ocean": return "bg-gradient-to-r from-blue-500 to-cyan-400"
      case "forest": return "bg-gradient-to-r from-green-500 to-emerald-400"
      case "sunset": return "bg-gradient-to-r from-red-500 to-orange-400"
      case "purple": return "bg-gradient-to-r from-purple-500 to-violet-400"
      case "dark": return "bg-gradient-to-r from-gray-700 to-gray-900"
      default: return "bg-gray-400"
    }
  }

  const handleThemeChange = async (newTheme: string) => {
    if (!buttonRef.current) {
      setTheme(newTheme as any)
      return
    }

    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(newTheme as any)
      return
    }

    // @ts-ignore
    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme as any)
      })
    }).ready

    const { top, left } = buttonRef.current.getBoundingClientRect()
    const x = left + buttonRef.current.offsetWidth / 2
    const y = top + buttonRef.current.offsetHeight / 2
    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom),
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full" asChild>
        <Button variant="neonGlow" size="icon" ref={buttonRef}>
          <Palette className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Palette className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={8} collisionPadding={16}>
        <DropdownMenuLabel>Theme Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
          Basic Theme
        </DropdownMenuLabel>
        {defaultThemes.map((themeOption) => (
          <DropdownMenuItem 
            key={themeOption.key}
            onClick={() => handleThemeChange(themeOption.key)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getThemeColor(themeOption.key)}`} />
              <span>{themeOption.name}</span>
            </div>
            {theme === themeOption.key && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
          Custom Themes
        </DropdownMenuLabel>
        {Object.entries(availableThemes).map(([key, config]) => (
          <DropdownMenuItem 
            key={key}
            onClick={() => handleThemeChange(key)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getThemeColor(key)}`} />
              <span>{config.name}</span>
            </div>
            {theme === key && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        
        <div className="px-2 py-1.5">
          <div className="text-xs font-medium text-muted-foreground mb-2">Current Theme</div>
          <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
            <div className={`w-3 h-3 rounded-full ${getThemeColor(theme)}`} />
            <span className="text-sm capitalize">
              {availableThemes[theme as keyof typeof availableThemes]?.name || 
               defaultThemes.find(t => t.key === theme)?.name || 
               theme}
            </span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}