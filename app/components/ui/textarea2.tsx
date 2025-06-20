import { X } from "lucide-react"; // Import the X icon
import * as React from "react";
import { cn } from "~/lib/utils";

function Textarea2({
	className,
	value,
	onChange,
	onClear, // Optional clear handler
	...props
}: React.ComponentProps<"textarea"> & { onClear?: () => void }) {
	const [internalValue, setInternalValue] = React.useState(value || "");

	// Handle both controlled and uncontrolled usage
	const isControlled = value !== undefined;
	const currentValue = isControlled ? value : internalValue;

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (!isControlled) {
			setInternalValue(e.target.value);
		}
		onChange?.(e);
	};

	const handleClear = () => {
		if (!isControlled) {
			setInternalValue("");
		}
		// Create a synthetic event for controlled components
		const event = {
			target: { value: "" },
			currentTarget: { value: "" },
		} as React.ChangeEvent<HTMLTextAreaElement>;
		onChange?.(event);
		onClear?.(); // Call the onClear callback if provided
	};

	return (
		<div className="relative w-full">
			<textarea
				data-slot="textarea"
				value={currentValue}
				onChange={handleChange}
				className={cn(
					"border-stone-200 placeholder:text-stone-500 focus-visible:border-stone-950 focus-visible:ring-stone-950/50 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:bg-stone-200/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-stone-800 dark:placeholder:text-stone-400 dark:focus-visible:border-primary dark:focus-visible:ring-primary/50 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900 dark:dark:bg-stone-800/30",
					"pr-9", // Add right padding for the clear button
					className
				)}
				{...props}
			/>
			{(currentValue || onClear) && (
				<button
					type="button"
					onClick={handleClear}
					className="absolute right-2 top-3 rounded-full p-1 text-stone-500 hover:text-stone-700 dark:text-stone-400 cursor-pointer dark:hover:text-primary"
					aria-label="Clear textarea"
				>
					<X className="h-4 w-4" />
				</button>
			)}
		</div>
	);
}

export { Textarea2 };
