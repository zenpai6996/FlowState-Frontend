import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
	ArrowRight,
	ChevronDown,
	Github,
	LayoutDashboard,
	Linkedin,
	LogInIcon,
	Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MorphingText } from "~/components/ui/liquid-text";
import { useAuth } from "~/provider/auth-context";

// Animated background component
const AnimatedBackground = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [mouseTrail, setMouseTrail] = useState([]);
	const maxTrailLength = 30;

	useEffect(() => {
		const handleMouseMove = (e) => {
			const newPosition = { x: e.clientX, y: e.clientY, id: Date.now() };
			setMousePosition(newPosition);

			setMouseTrail((prevTrail) => {
				const newTrail = [newPosition, ...prevTrail];
				return newTrail.slice(0, maxTrailLength);
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);
	return (
		<div className="fixed inset-0 overflow-hidden pointer-events-none">
			{/* Gradient orbs */}
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
			<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/10 to-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
			<div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-primary/10 to-primary/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

			{/* Floating particles */}
			{[...Array(0)].map((_, i) => (
				<div
					key={i}
					className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						animationDelay: `${Math.random() * 5}s`,
						animationDuration: `${4 + Math.random() * 3}s`,
					}}
				/>
			))}

			{/* Mouse follower */}

			{mouseTrail.map((position, index) => {
				const opacity = (maxTrailLength - index) / maxTrailLength;
				const scale = opacity * 0.4 + 0.2;
				const size = 10 + opacity * 40;

				return (
					<div
						key={position.id}
						className="absolute pointer-events-none"
						style={{
							left: position.x - size / 2,
							top: position.y - size / 2,
							width: size,
							height: size,
							opacity: opacity * 0.3,
							transform: `scale(${scale})`,
							transition: "all 0.3s ease-out",
						}}
					>
						<div className="w-full h-full bg-primary rounded-full blur-md animate-pulse" />
					</div>
				);
			})}

			{/* Main Mouse Follower
			<div
				className="absolute w-16 h-16 bg-gradient-to-r from-primary to-accent/20 rounded-full blur-xl transition-all duration-200 ease-out pointer-events-none"
				style={{
					left: mousePosition.x - 32,
					top: mousePosition.y - 32,
				}}
			/> */}
		</div>
	);
};

// Navbar component
const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navigate = useNavigate();
	const { logout, isAuthenticated } = useAuth();

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-full ${
				isScrolled
					? "bg-background/80 dark:bg-background/80 backdrop-blur-md translate-y-5 transition-all duration-200 ease-in-out  shadow-lg"
					: "bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex items-center">
						<Link to="/" className="flex items-center space-x-2">
							<img
								src="/logo.png"
								alt="FlowState Logo"
								className="w-8 h-8 object-contain border border-primary rounded-full p-1 bg-primary/10"
							/>
							<span
								style={{ fontFamily: "Geo2" }}
								className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
							>
								FlowState
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-4">
						<Link to={"https://github.com/zenpai6996"}>
							<Button
								variant="liquidMetal"
								size="icon"
								className="p-2 rounded-full dark:text-primary"
							>
								<Github className="h-4 w-4" />
							</Button>
						</Link>
						<ModeToggle />
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button
									variant={"customNeonOutline"}
									size={"icon"}
									className="hover:border-primary transition-colors duration-200 ease-in-out"
								>
									{isAuthenticated ? (
										<LayoutDashboard className="dark:text-primary" />
									) : (
										<LogInIcon className="dark:text-primary" />
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								{isAuthenticated ? (
									<>
										<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => navigate("/dashboard")}>
											Dashboard
										</DropdownMenuItem>
									</>
								) : (
									<>
										<DropdownMenuItem onClick={() => navigate("/sign-in")}>
											Login
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => navigate("/sign-up")}>
											Sign Up
										</DropdownMenuItem>
									</>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Mobile Navigation */}
					<div className="md:hidden flex items-center space-x-2">
						<Link to={"https://github.com/zenpai6996"}>
							<Button
								variant="liquidMetal"
								size="icon"
								className="p-2 rounded-full dark:text-primary"
							>
								<Github className="h-4 w-4" />
							</Button>
						</Link>
						<ModeToggle />
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button
									variant={"customNeonOutline"}
									size={"icon"}
									className="hover:border-primary transition-colors duration-200 ease-in-out"
								>
									{isAuthenticated ? (
										<LayoutDashboard className="dark:text-primary" />
									) : (
										<LogInIcon className="dark:text-primary" />
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								{isAuthenticated ? (
									<>
										<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => navigate("/dashboard")}>
											Dashboard
										</DropdownMenuItem>
									</>
								) : (
									<>
										<DropdownMenuItem onClick={() => navigate("/sign-in")}>
											Login
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => navigate("/sign-up")}>
											Sign Up
										</DropdownMenuItem>
									</>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
};

// Hero Section
const HeroSection = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	const texts = ["FlowState", "Rhythm", "Sync", "Goal"];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	};

	return (
		<>
			<div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<motion.div
					className="text-center max-w-4xl mx-auto"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Badge with motion */}
					<motion.div
						variants={itemVariants}
						className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 mt-20"
					>
						<span className="text-xs md:text-sm font-medium text-primary dark:text-white">
							✨ Welcome to the Flowstate
						</span>
					</motion.div>

					{/* Main Heading with motion */}
					<motion.h1
						variants={itemVariants}
						className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-20 md:mb-10 leading-tight"
					>
						<span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
							Achieve Your
						</span>
						<br />
						<MorphingText texts={texts} className="text-4xl text-primary" />
					</motion.h1>

					{/* Subtitle with motion */}
					<motion.p
						variants={itemVariants}
						style={{ fontFamily: "Geo" }}
						className="text-sm sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
					>
						Flow effortlessly through your tasks.
					</motion.p>

					{/* CTA Buttons with motion */}
					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
					>
						{isAuthenticated ? (
							<Button
								variant={"neoMorphicPressed"}
								size="lg"
								className="bg-gradient-to-r from-primary to-accent rounded-full hover:from-accent hover:to-primary px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
								onClick={() => navigate("/dashboard")}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
							>
								Get Started
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Button>
						) : (
							<Button
								variant={"neoMorphicPressed"}
								size="lg"
								className="bg-gradient-to-r from-primary to-accent rounded-full hover:from-accent hover:to-primary px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
								onClick={() => navigate("/sign-in")}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
							>
								Get Started
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Button>
						)}
					</motion.div>

					{/* Scroll Indicator with motion */}
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
						className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
					>
						<ChevronDown className="h-6 w-6 text-gray-400" />
					</motion.div>
				</motion.div>
			</div>
		</>
	);
};

// Footer Component
const Footer = () => {
	const navigate = useNavigate();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	return (
		<>
			<motion.footer
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={containerVariants}
				className="relative bg-muted dark:bg-muted backdrop-blur-6xl border-t border-gray-200 z-10 dark:border-primary"
			>
				<div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-2 md:grid-cols-6 gap-8">
						{/* Logo and Description with motion */}
						<motion.div variants={itemVariants} className="col-span-3">
							<div className="flex items-center space-x-2 mb-4">
								<motion.img
									src="/logo.png"
									alt="FlowState Logo"
									className="w-8 h-8 object-contain border border-primary rounded-full p-1 bg-primary/20"
									whileHover={{ rotate: 10, scale: 1.1 }}
									transition={{ type: "spring", stiffness: 300 }}
								/>
								<span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
									FlowState
								</span>
							</div>

							<p className="text-gray-600 dark:text-muted-foreground mb-4">
								Achieve your{" "}
								<span
									className="dark:text-primary text-xl mr-1"
									style={{ fontFamily: "Air" }}
								>
									FlowState
								</span>{" "}
								with intuitive tools designed for modern teams.
							</p>

							<div className="flex space-x-4">
								<motion.div variants={itemVariants}>
									<Link to={"https://github.com/zenpai6996"}>
										<Button
											variant="neomorphic"
											size="sm"
											className="p-2 rounded-full dark:text-primary"
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
										>
											<Github className="h-4 w-4" />
										</Button>
									</Link>
								</motion.div>
								<motion.div variants={itemVariants}>
									<Link to={"https://x.com/srbii_"}>
										<Button
											variant="neomorphic"
											size="sm"
											className="p-2 rounded-full dark:text-primary"
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
										>
											<Twitter className="h-4 w-4" />
										</Button>
									</Link>
								</motion.div>
								<motion.div variants={itemVariants}>
									<Button
										variant="neomorphic"
										size="sm"
										className="p-2 rounded-full dark:text-primary"
										onClick={() =>
											navigate(
												"https://www.linkedin.com/in/souharda-roy-barman-profile"
											)
										}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
									>
										<Linkedin className="h-4 w-4" />
									</Button>
								</motion.div>
							</div>
						</motion.div>

						<div>
							<DotLottieReact
								src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
								loop
								autoplay
								className="w-60 h-20 absolute -right-10 bottom-10 md:bottom-1"
							/>
						</div>
					</div>

					{/* Bottom Bar with motion */}
					<motion.div
						variants={itemVariants}
						className="mt-6 pt-8 border-t border-gray-200 dark:border-primary"
					>
						<div className="flex flex-col justify-between items-start">
							<div className="flex justify-between">
								<div>
									<p className="text-gray-600 text-xs dark:text-muted-foreground mb-1">
										Crafted with{" "}
										<motion.span
											className="text-primary"
											animate={{ scale: [1, 1.2, 1] }}
											transition={{ repeat: Infinity, duration: 1.5 }}
										>
											❤︎
										</motion.span>{" "}
										by{" "}
										<Link
											className="text-primary hover:underline"
											to={"https://github.com/zenpai6996"}
										>
											Souharda
										</Link>
									</p>

									<p className="text-xs text-gray-600 dark:text-gray-400">
										© 2025 FlowState. All rights reserved.
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.footer>
		</>
	);
};

// Main HomePage Component
const HomePage = () => {
	return (
		<div className="relative min-h-screen bg-background dark:bg-background overflow-hidden">
			<AnimatedBackground />
			<Navbar />
			<HeroSection />
			<Footer />
		</div>
	);
};

export function meta() {
	return [
		{ title: "FlowState - Achieve Your Flow State" },
		{
			name: "description",
			content:
				"Transform your productivity with FlowState - the intuitive project management platform designed for modern teams.",
		},
	];
}

export default HomePage;
