import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-md border border-stone-200 px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-stone-950 focus-visible:ring-stone-950/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 transition-[color,box-shadow] overflow-hidden dark:border-stone-800 dark:focus-visible:border-stone-300 dark:focus-visible:ring-stone-300/50 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900 cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-stone-900 text-stone-50 [a&]:hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:[a&]:hover:bg-stone-50/90",
				secondary:
					"border-transparent bg-stone-100 text-stone-900 [a&]:hover:bg-stone-100/90 dark:bg-stone-800 dark:text-stone-50 dark:[a&]:hover:bg-stone-800/90",
				destructive:
					"border-transparent bg-red-500 text-white [a&]:hover:bg-red-500/90 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500/60 dark:bg-red-900 dark:[a&]:hover:bg-red-900/90 dark:focus-visible:ring-red-900/20 dark:dark:focus-visible:ring-red-900/40 dark:dark:bg-red-900/60",
				outline:
					"text-stone-950 [a&]:hover:bg-stone-100 [a&]:hover:text-stone-900 dark:text-stone-50 dark:[a&]:hover:bg-stone-800 dark:[a&]:hover:text-stone-50",
				progress:
					"bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-background/40 dark:text-cyan-300 dark:border-2 dark:border-cyan-400/50 dark:backdrop-blur-xldark:hover:bg-black/60 dark:hover:border-cyan-300/70  dark:hover:text-cyan-200 dark:hover:pulse transition-all duration-300 ease-out rounded-full",
				todo: "bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-background/40 dark:text-yellow-300 dark:border-2 dark:border-yellow-400/50 dark:backdrop-blur-xl dark:hover:bg-black/60 dark:hover:border-yellow-300/70 dark:hover:text-yellow-200 dark:hover:pulse transition-all duration-300 ease-out rounded-full",
				red: "bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-background/40 dark:text-red-400 dark:border-2 dark:border-red-500 dark:backdrop-blur-xl dark:hover:bg-black/60 dark:hover:border-red-300/70 dark:hover:text-red-200 dark:hover:pulse transition-all duration-300 ease-out rounded-full",
				done: "bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-background/40 dark:text-green-300 dark:border-2 dark:border-green-400/50 dark:backdrop-blur-xl  dark:hover:bg-black/60 dark:hover:border-green-300/70 dark:hover:text-green-200 dark:hover:pulse transition-all duration-300 ease-out rounded-full",
				glassHologram:
					"bg-gradient-to-r from-red-400/25 via-orange-400/25 via-yellow-400/25 via-green-400/25 via-blue-400/25 to-purple-400/25 text-white border dark:border-accent backdrop-blur-xl shadow-2xl  active:scale-95 transition-all duration-300 ease-out rounded-full ring-1 ring-white/15 hover:ring-white/25",
				glassBubble:
					"bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-white/4 dark:text-slate-100 dark:border dark:border-white/15 dark:backdrop-blur-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] dark:before:absolute dark:before:inset-2 dark:before:bg-white/5 dark:before:rounded-xl dark:before:backdrop-blur-sm dark:hover:bg-white/8 dark:hover:border-white/25 dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] dark:hover:scale-105 transition-all duration-300 ease-out rounded-2xl relative overflow-hidden",
				glassMorph:
					"bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 dark:bg-white/5  dark:border dark:border-white/10 dark:backdrop-blur-xl dark:shadow-2xl dark:shadow-black/20 dark:hover:bg-white/10  dark:hover:shadow-3xl transition-all duration-400 ease-out rounded-2xl",
				neoMorphicPressed:
					"bg-gray-200 text-gray-900 shadow-[4px_4px_6px_rgba(0,0,0,0.1),-4px_-4px_6px_rgba(255,255,255,0.7)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_5px_rgba(255,255,255,0.6)] active:translate-y-[1px] active:shadow-[inset_6px_6px_3px_rgba(0,0,0,0.2),inset_-6px_-6px_3px_rgba(255,255,255,0.4)] dark:bg-background dark:text-muted-foreground dark:hover:text-primary dark:shadow-[4px_4px_6px_rgba(0,0,0,0.7),-4px_-4px_6px_rgba(255,255,255,0.1)] dark:hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] transition-all duration-200 rounded-xl ",
				neosoft:
					"bg-background text-gray-800 shadow-[inset_-1px_-1px_4px_rgba(255,255,255,0.6),inset_1px_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.6),inset_2px_2px_6px_rgba(0,0,0,0.1)] active:scale-[0.98] active:shadow-inner dark:bg-muted dark:text-white dark:hover:text-primary  dark:shadow-[inset_-1px_-1px_4px_rgba(255,255,255,0.05),inset_1px_1px_4px_rgba(0,0,0,0.7)] dark:hover:shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.08),inset_2px_2px_6px_rgba(0,0,0,0.7)] transition-all duration-150 ease-in-out rounded-2xl",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
