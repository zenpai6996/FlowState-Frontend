import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth-context";

export const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				{children}
				<Toaster
					position="top-center"
					richColors
					closeButton={true}
					theme="dark"
					toastOptions={{
						classNames: {
							toast: `
              bg-background/95 backdrop-blur-xl border border-primary/50 
              shadow-2xl shadow-black/50 rounded-xl
              before:absolute before:inset-0 before:rounded-xl 
              before:bg-gradient-to-r before:from-white/5 before:to-transparent 
              before:pointer-events-none
              hover:scale-105 transition-all duration-300 ease-in-out
              group
            `,
							title: "text-slate-100 font-semibold text-sm tracking-wide",
							description: "text-slate-300 text-sm leading-relaxed",
							actionButton: `
              bg-gradient-to-r from-blue-500 to-purple-500 
              hover:from-blue-600 hover:to-purple-600
              text-white font-medium px-4 py-2 rounded-lg
              transition-all duration-200 transform hover:scale-105
            `,
							cancelButton: `
              bg-slate-700/50 hover:bg-slate-600/50 
              text-slate-300 hover:text-white
              font-medium px-4 py-2 rounded-lg
              transition-all duration-200
            `,
							closeButton: `
              bg-slate-800/50 hover:bg-slate-700/50 
              text-slate-400 hover:text-white
              rounded-lg transition-all duration-200
              hover:scale-110 transform
            `,
							success: `
              border-emerald-500/30 bg-gradient-to-br from-emerald-950/50 to-slate-900/95
              shadow-emerald-500/20 shadow-2xl
              before:bg-gradient-to-r before:from-emerald-500/10 before:to-transparent
            `,
							error: `
              border-red-500/30 bg-gradient-to-br from-red-950/50 to-slate-900/95
              shadow-red-500/20 shadow-2xl
              before:bg-gradient-to-r before:from-red-500/10 before:to-transparent
            `,
							warning: `
              border-amber-500/30 bg-gradient-to-br from-amber-950/50 to-slate-900/95
              shadow-amber-500/20 shadow-2xl
              before:bg-gradient-to-r before:from-amber-500/10 before:to-transparent
            `,
							info: `
              border-blue-500/30 bg-gradient-to-br from-blue-950/50 to-slate-900/95
              shadow-blue-500/20 shadow-2xl
              before:bg-gradient-to-r before:from-blue-500/10 before:to-transparent
            `,
							loading: `
              border-slate-600/30 bg-gradient-to-br from-slate-800/50 to-slate-900/95
              before:bg-gradient-to-r before:from-slate-500/10 before:to-transparent
            `,
						},
						style: {
							background: "transparent",
							border: "1px solid rgb(51 65 85 / 0.5)",
						},
					}}
					expand={true}
					visibleToasts={5}
					offset={16}
				/>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
