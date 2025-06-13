import { Component } from "lucide-react";

const Loader = () => {
	return (
		<div className="flex items-center justify-center h-full">
			<Component className="w-10 h-10 text-primary animate-spin" />
		</div>
	);
};

export default Loader;
