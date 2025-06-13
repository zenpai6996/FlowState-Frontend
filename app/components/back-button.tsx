import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

const BackButton = ({ className }: { className?: string }) => {
	const navigate = useNavigate();

	return (
		<Button
			variant={"glassMirror"}
			size={"sm"}
			onClick={() => navigate(-1)}
			className={cn(
				"flex items-center gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 mr-2 sm:mr-4 mb-3 sm:mb-4 lg:mb-5 mt-1 sm:mt-1 md:mt-1 lg:mt-0 rounded-full text-xs sm:text-sm h-8 sm:h-9 md:h-10 min-w-0 hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation",
				className
			)}
			aria-label="Go back to previous page"
		>
			<ArrowLeft className="size-3 sm:size-4 md:size-5 flex-shrink-0" />
			<span className="hidden xs:inline sm:inline whitespace-nowrap">Back</span>
		</Button>
	);
};

export default BackButton;
