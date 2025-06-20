import { X } from "lucide-react";
import * as React from "react";
import { cn } from "~/lib/utils";

function Input2({
	className,
	type,
	value,
	onChange,
	onClear, // Add this new prop
	...props
}: React.ComponentProps<"input"> & { onClear?: () => void }) {
	const [internalValue, setInternalValue] = React.useState(value || "");

	// Handle both controlled and uncontrolled usage
	const isControlled = value !== undefined;
	const currentValue = isControlled ? value : internalValue;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
		} as React.ChangeEvent<HTMLInputElement>;
		onChange?.(event);
		onClear?.(); // Call the onClear callback
	};

	return (
		<div className="relative w-full">
			<input
				type={type}
				data-slot="input"
				value={currentValue}
				onChange={handleChange}
				className={cn(
					"file:text-stone-950 placeholder:text-stone-500 selection:bg-stone-900 selection:text-stone-50 dark:bg-stone-500/30 border-gray-300 flex h-11 w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-stone-50 dark:placeholder:text-stone-400 dark:selection:bg-stone-50 dark:selection:text-stone-900 dark:dark:bg-stone-800/30 dark:border-gray-200",
					"focus-visible:border-stone-950 focus-visible:ring-stone-950/50 focus-visible:ring-[1px] dark:focus-visible:border-primary dark:focus-visible:ring-primary/50",
					"aria-invalid:ring-red-400/20 dark:aria-invalid:ring-red-400/40 aria-invalid:border-red-400 dark:aria-invalid:ring-red-700/20 dark:dark:aria-invalid:ring-red-700/30 dark:aria-invalid:border-red-700",
					"pr-9", // Add right padding for the clear button
					className
				)}
				{...props}
			/>
			{(currentValue || onClear) && ( // Show button if there's value OR onClear is provided
				<button
					type="button"
					onClick={handleClear}
					className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-primary cursor-pointer"
					aria-label="Clear input"
				>
					<X className="h-4 w-4" />
				</button>
			)}
		</div>
	);
}

export { Input2 };
