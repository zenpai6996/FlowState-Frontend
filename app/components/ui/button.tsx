import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-stone-950 focus-visible:ring-stone-950/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:focus-visible:border-stone-300 dark:focus-visible:ring-stone-300/50 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-stone-900 text-stone-50 shadow-xs hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-primary/90 transition-all duration-300 ease-in-out rounded-full ",
      
       neonGlow:
  "bg-stone-900 text-stone-50 shadow-lg hover:bg-stone-800 dark:bg-black dark:text-primary dark:border-2 dark:border-primary/50 dark:shadow-primary/25 dark:shadow-lg dark:hover:border-primary dark:hover:shadow-primary/40 dark:hover:shadow-xl dark:hover:text-primary/90 transition-all duration-300 ease-out rounded-full",
     
    // 2. GLASS MORPHISM - Modern transparent with blur
    glassMorph:
      "bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-white/5 dark:text-stone-100 dark:border dark:border-white/10 dark:backdrop-blur-xl dark:shadow-2xl dark:shadow-black/20 dark:hover:bg-white/10 dark:hover:border-white/20 dark:hover:shadow-3xl transition-all duration-400 ease-out rounded-2xl",

    // 3. NEUMORPHISM - Soft 3D pressed/raised effect
   neomorphic: 
  "bg-gray-100 text-gray-800 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.1)] active:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.7)] dark:bg-stone-900 dark:text-stone-100 dark:shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.1),inset_2px_2px_6px_rgba(0,0,0,0.8)] dark:hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.1),inset_1px_1px_3px_rgba(0,0,0,0.8)] dark:active:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-200 ease-in-out rounded-xl",



    // 5. MINIMALIST MONO - Ultra clean with subtle hover
    monoMinimal:
      "bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-transparent dark:text-stone-300 dark:border dark:border-stone-700 dark:hover:bg-stone-800/30 dark:hover:text-stone-100 dark:hover:border-stone-600 transition-all duration-200 ease-linear rounded-lg",

  

    // 8. LIQUID METAL - Shiny metallic with gradient
    liquidMetal:
      "bg-stone-900 text-stone-50 shadow-lg hover:bg-stone-800 dark:bg-gradient-to-br dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 dark:text-slate-900 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] dark:hover:from-slate-300 dark:hover:via-slate-400 dark:hover:to-slate-500 dark:hover:shadow-lg dark:hover:shadow-slate-500/30 transition-all duration-300 ease-out rounded-full",

    // 9. NEON OUTLINE - Glowing outline with transparent fill
    neonOutline: 
  "bg-white text-emerald-600 border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3),inset_0_0_10px_rgba(16,185,129,0.05)] hover:text-emerald-700 hover:border-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.5),inset_0_0_20px_rgba(16,185,129,0.1)] hover:bg-emerald-50 active:bg-emerald-100 dark:bg-transparent dark:text-emerald-400 dark:border-emerald-400 dark:shadow-[0_0_10px_rgba(16,185,129,0.5),inset_0_0_10px_rgba(16,185,129,0.1)] dark:hover:text-emerald-300 dark:hover:border-emerald-300 dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.8),inset_0_0_20px_rgba(16,185,129,0.2)] dark:hover:bg-emerald-400/5 dark:active:bg-emerald-400/10 transition-all duration-300 ease-out rounded-full",

  customNeonOutline:"bg-white text-primary border-2 border-primary shadow-[0_0_10px_rgba(16,185,129,0.3),inset_0_0_10px_rgba(16,185,129,0.05)] hover:text-primary/80 hover:border-primary/80 hover:shadow-[0_0_20px_rgba(16,185,129,0.5),inset_0_0_20px_rgba(16,185,129,0.1)] hover:bg-primary/5 active:bg-primary/10 dark:bg-transparent dark:text-primary dark:border-primary dark:shadow-[0_0_10px_rgba(16,185,129,0.5),inset_0_0_10px_rgba(16,185,129,0.1)] dark:hover:text-primary/90 dark:hover:border-primary/90 dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.8),inset_0_0_20px_rgba(16,185,129,0.2)] dark:hover:bg-primary/5 dark:active:bg-primary/10 transition-all duration-300 ease-out rounded-full"
,
   

    
        destructive:
          "bg-red-500 text-white shadow-xs hover:bg-red-500/90 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500/60 dark:bg-red-900 dark:hover:bg-red-900/90 dark:focus-visible:ring-red-900/20 dark:dark:focus-visible:ring-red-900/40 dark:dark:bg-red-900/60",
        outline:
          "border bg-white shadow-xs hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-200/30 dark:border-stone-200 dark:hover:bg-stone-200/50 dark:bg-stone-950 dark:hover:bg-stone-800 dark:hover:text-stone-50 dark:dark:bg-stone-800/30 dark:dark:border-stone-800 dark:dark:hover:bg-stone-800/50 dark:hover:border-primary",
        secondary:
          "bg-stone-100 text-stone-900 shadow-xs hover:bg-stone-100/80 dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-800/80",
        ghost:
          "hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-100/50 dark:hover:bg-stone-800 dark:hover:text-stone-50 dark:dark:hover:bg-stone-800/50 hover:border-primary border-transparent border ",
        link: "text-stone-900 underline-offset-4 hover:underline dark:text-stone-50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
