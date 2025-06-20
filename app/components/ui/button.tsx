import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

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
					"bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-white/5 dark:text-muted-foreground dark:border dark:border-white/10 dark:backdrop-blur-xl dark:shadow-2xl dark:shadow-black/20 dark:hover:bg-white/10 dark:hover:border-white/20 dark:hover:shadow-3xl transition-all duration-400 ease-out rounded-2xl",

				// 4. BUBBLE GLASS - Multiple layered bubbles effect
				glassBubble:
					"bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-white/4 dark:text-slate-100 dark:border dark:border-white/15 dark:backdrop-blur-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] dark:before:absolute dark:before:inset-2 dark:before:bg-white/5 dark:before:rounded-xl dark:before:backdrop-blur-sm dark:hover:bg-white/8 dark:hover:border-white/25 dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] dark:hover:scale-105 transition-all duration-300 ease-out rounded-2xl relative overflow-hidden",

				// 8. HOLOGRAM GLASS - Shifting iridescent effect
				glassHologram:
					"bg-gradient-to-r from-red-400/25 via-orange-400/25 via-yellow-400/25 via-green-400/25 via-blue-400/25 to-purple-400/25 text-white border border-white/25 backdrop-blur-xl shadow-2xl shadow-black/50 hover:from-red-300/35 hover:via-orange-300/35 hover:via-yellow-300/35 hover:via-green-300/35 hover:via-blue-300/35 hover:to-purple-300/35 hover:border-white/35 hover:shadow-3xl hover:shadow-rainbow active:scale-95 transition-all duration-300 ease-out rounded-full ring-1 ring-white/15 hover:ring-white/25",

				// 9. NEON GLASS - Glowing edges with glass center
				glassNeon:
					"bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-black/40 dark:text-cyan-300 dark:border-2 dark:border-cyan-400/50 dark:backdrop-blur-xl dark:shadow-[0_0_20px_rgba(34,211,238,0.3),inset_0_0_20px_rgba(34,211,238,0.1)] dark:hover:bg-black/60 dark:hover:border-cyan-300/70 dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.5),inset_0_0_30px_rgba(34,211,238,0.15)] dark:hover:text-cyan-200 dark:hover:pulse transition-all duration-300 ease-out rounded-full",

				// 10. MIRROR GLASS - Reflective metallic glass
				glassMirror:
					"bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-background dark:from-slate-400/20 dark:to-slate-600/20 dark:text-slate-100 dark:border dark:border-slate-300/30 dark:backdrop-blur-xl dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_32px_rgba(0,0,0,0.3)] dark:hover:from-slate-300/25 dark:hover:to-slate-500/25 dark:hover:border-slate-200/40 dark:hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.4),0_16px_48px_rgba(0,0,0,0.4)] dark:hover:scale-101 transition-all duration-350 ease-out rounded-xl",

				// 3. NEUMORPHISM - Soft 3D pressed/raised effect
				neomorphic:
					"bg-background text-gray-800 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.1)] active:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.7)] dark:bg-muted dark:text-muted-foreground dark:shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.1),inset_2px_2px_6px_rgba(0,0,0,0.8)] dark:hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.1),inset_1px_1px_3px_rgba(0,0,0,0.8)] dark:active:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-200 ease-in-out rounded-xl",
				neoMorphicPressed:
					"bg-gray-200 text-gray-900 shadow-[4px_4px_6px_rgba(0,0,0,0.1),-4px_-4px_6px_rgba(255,255,255,0.7)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_5px_rgba(255,255,255,0.6)] active:translate-y-[1px] active:shadow-[inset_6px_6px_3px_rgba(0,0,0,0.2),inset_-6px_-6px_3px_rgba(255,255,255,0.4)] dark:bg-background dark:text-white dark:shadow-[4px_4px_6px_rgba(0,0,0,0.7),-4px_-4px_6px_rgba(255,255,255,0.1)] dark:hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] transition-all duration-200 rounded-xl ",
				neosoft:
					"bg-background text-gray-800 shadow-[inset_-1px_-1px_4px_rgba(255,255,255,0.6),inset_1px_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.6),inset_2px_2px_6px_rgba(0,0,0,0.1)] active:scale-[0.98] active:shadow-inner dark:bg-muted dark:text-muted-foreground  dark:shadow-[inset_-1px_-1px_4px_rgba(255,255,255,0.05),inset_1px_1px_4px_rgba(0,0,0,0.7)] dark:hover:shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.08),inset_2px_2px_6px_rgba(0,0,0,0.7)] transition-all duration-150 ease-in-out rounded-2xl",
				red: "bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-background/40 dark:text-red-400 dark:border-2 dark:border-red-500 dark:backdrop-blur-xl dark:hover:bg-black/60 dark:hover:border-red-300/70 dark:hover:text-red-200 dark:hover:pulse transition-all duration-300 ease-out rounded-full",

				// 5. MINIMALIST MONO - Ultra clean with subtle hover
				monoMinimal:
					"bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-transparent dark:text-stone-300 dark:border dark:border-stone-700 dark:hover:bg-stone-800/30 dark:hover:text-stone-100 dark:hover:border-stone-600 transition-all duration-200 ease-linear rounded-lg",

				// 8. LIQUID METAL - Shiny metallic with gradient
				liquidMetal:
					"bg-stone-900 text-stone-50 shadow-lg hover:bg-stone-800 dark:bg-gradient-to-br dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 dark:text-slate-900 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] dark:hover:from-slate-300 dark:hover:via-slate-400 dark:hover:to-slate-500 dark:hover:shadow-lg dark:hover:shadow-slate-500/30 transition-all duration-300 ease-out rounded-full",

				// 9. NEON OUTLINE - Glowing outline with transparent fill
				neonOutline:
					"bg-white text-emerald-600 border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3),inset_0_0_10px_rgba(16,185,129,0.05)] hover:text-emerald-700 hover:border-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.5),inset_0_0_20px_rgba(16,185,129,0.1)] hover:bg-emerald-50 active:bg-emerald-100 dark:bg-transparent dark:text-emerald-400 dark:border-emerald-400 dark:shadow-[0_0_10px_rgba(16,185,129,0.5),inset_0_0_10px_rgba(16,185,129,0.1)] dark:hover:text-emerald-300 dark:hover:border-emerald-300 dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.8),inset_0_0_20px_rgba(16,185,129,0.2)] dark:hover:bg-emerald-400/5 dark:active:bg-emerald-400/10 transition-all duration-300 ease-out rounded-full",

				customNeonOutline:
					"bg-white text-emerald-600 border-2 border-primary shadow-[0_0_10px_rgba(16,185,129,0.3),inset_0_0_10px_rgba(16,185,129,0.05)] hover:text-emerald-700 hover:border-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.5),inset_0_0_20px_rgba(16,185,129,0.1)] hover:bg-emerald-50 active:bg-emerald-100 dark:bg-transparent dark:text-primary dark:border-primary dark:shadow-[0_0_10px_rgba(16,185,129,0.5),inset_0_0_10px_rgba(16,185,129,0.1)] dark:hover:text-accent dark:hover:border-accent dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.8),inset_0_0_20px_rgba(16,185,129,0.2)] dark:hover:bg-transparent dark:active:bg-emerald-400/10 transition-all duration-300 ease-out rounded-full",
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
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
