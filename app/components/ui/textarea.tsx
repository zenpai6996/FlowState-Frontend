import * as React from "react";

import { cn } from "~/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"border-stone-200 placeholder:text-stone-500 focus-visible:border-stone-950 focus-visible:ring-stone-950/50 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:bg-stone-200/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-muted px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-stone-800 dark:placeholder:text-stone-400 dark:focus-visible:border-primary dark:focus-visible:ring-primary/50 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900 dark:dark:bg-muted",
				className
			)}
			{...props}
		/>
	);
}

export { Textarea };
