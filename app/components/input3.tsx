import * as React from "react";

import { cn } from "~/lib/utils";

function Input3({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-stone-950 placeholder:text-stone-500 selection:bg-stone-900 selection:text-stone-50 dark:bg-stone-500/30 border-gray-300 flex h-11 w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-stone-50 dark:placeholder:text-stone-400 dark:selection:bg-stone-50 dark:selection:text-stone-900 dark:dark:bg-background dark:border-gray-700",
				"focus-visible:border-stone-950 focus-visible:ring-stone-950/50 focus-visible:ring-[1px] dark:focus-visible:border-primary dark:focus-visible:ring-primary/50",
				"aria-invalid:ring-red-400/20 dark:aria-invalid:ring-red-400/40 aria-invalid:border-red-400 dark:aria-invalid:ring-red-700/20 dark:dark:aria-invalid:ring-red-700/30 dark:aria-invalid:border-red-700",
				className
			)}
			{...props}
		/>
	);
}

export { Input3 };
