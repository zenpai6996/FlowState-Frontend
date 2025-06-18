import {
	ArrowRight,
	ChevronDown,
	Github,
	Linkedin,
	LogIn,
	Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { MorphingText } from "~/components/ui/liquid-text";

// Animated background component
const AnimatedBackground = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [mouseTrail, setMouseTrail] = useState([]);
	const maxTrailLength = 15;

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
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
			<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/20 to-accent/20 rounded-full blur-3xl animate-ping delay-1000"></div>
			<div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-primary/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

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
				const scale = opacity * 0.8 + 0.2;
				const size = 20 + opacity * 40;

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
						<div className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md animate-pulse" />
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

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-full ${
				isScrolled
					? "bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-lg"
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
								variant="customNeonOutline"
								size="icon"
								className="p-2 rounded-full dark:text-primary"
							>
								<Github className="h-4 w-4" />
							</Button>
						</Link>
						<ModeToggle />
						<Link to="/sign-in">
							<Button
								variant={"glassNeon"}
								className="hover:bg-blue-50 dark:hover:bg-gray-800"
							>
								Login
							</Button>
						</Link>
						<Link to="/sign-up">
							<Button
								className=" dark:text-primary shadow-lg hover:shadow-xl transition-all duration-300"
								variant={"glassMorph"}
							>
								Sign Up
							</Button>
						</Link>
					</div>

					{/* Mobile Navigation */}
					<div className="md:hidden flex items-center space-x-2">
						<Link to={"https://github.com/zenpai6996"}>
							<Button
								variant="customNeonOutline"
								size="icon"
								className="p-2 rounded-full dark:text-primary"
							>
								<Github className="h-4 w-4" />
							</Button>
						</Link>
						<ModeToggle />
						<Link to="/sign-in">
							<Button variant="glassNeon" size="icon">
								<LogIn />
							</Button>
						</Link>
						{/* <Link to="/sign-up">
							<Button
								variant={"glassMirror"}
								size="sm"
								className="bg-gradient-to-r rounded-full  text-white"
							>
								Sign up
							</Button>
						</Link> */}
					</div>
				</div>
			</div>
		</nav>
	);
};

// Hero Section
const HeroSection = () => {
	const navigate = useNavigate();
	const texts = ["FlowState", "Rhythm", "Sync", "Vibe", "Goals"];
	return (
		<>
			<div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-4xl mx-auto">
					{/* Badge */}
					<div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8  mt-20">
						<span className=" text-xs md:text-sm font-medium text-primary dark:text-white">
							✨ Welcome to the Flowstate
						</span>
					</div>

					{/* Main Heading */}
					<h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-20 md:mb-10 leading-tight">
						<span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
							Achieve Your
						</span>
						<br />
						<MorphingText texts={texts} className="text-4xl text-primary" />
					</h1>

					{/* Subtitle */}
					<p className="text-sm sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
						Flow effortlessly through your tasks.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
						<Button
							variant={"neoMorphicPressed"}
							size="lg"
							className="bg-gradient-to-r from-primary to-accent rounded-full hover:from-accent hover:to-primary  px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
							onClick={() => navigate("/dashboard")}
						>
							Get Started
							<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
						</Button>
					</div>

					{/* Scroll Indicator */}
					<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
						<ChevronDown className="h-6 w-6 text-gray-400 animate-bounce" />
					</div>
				</div>
				{/* Floating Cards */}
				{/* <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full  backdrop-blur-sm hidden lg:block"></div>
			<div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-xl backdrop-blur-sm animate-pulse delay-1000 hidden lg:block"></div>
			<div className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm animate-pulse delay-2000 hidden lg:block"></div> */}
			</div>
		</>
	);
};

// Footer Component
const Footer = () => {
	const navigate = useNavigate();
	return (
		<>
			<footer className="relative bg-gray-50 dark:bg-transparent backdrop-blur-3xl border-t border-gray-200 dark:border-primary">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-2 md:grid-cols-6 gap-8">
						{/* Logo and Description */}
						<div className="col-span-3">
							<div className="flex items-center space-x-2 mb-4">
								<img
									src="/logo.png"
									alt="FlowState Logo"
									className="w-8 h-8 object-contain border border-primary rounded-full p-1 bg-primary/20"
								/>
								<span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
									FlowState
								</span>
							</div>
							<p className="text-gray-600 dark:text-muted-foreground mb-4 ">
								Achieve your flow state with intuitive tools designed for modern
								teams.
							</p>

							<div className="flex space-x-4 ">
								<Link to={"https://github.com/zenpai6996"}>
									<Button
										variant="neomorphic"
										size="sm"
										className="p-2 rounded-full dark:text-primary"
									>
										<Github className="h-4 w-4" />
									</Button>
								</Link>
								<Link to={"https://x.com/srbii_"}>
									<Button
										variant="neomorphic"
										size="sm"
										className="p-2 rounded-full dark:text-primary"
									>
										{" "}
										<Twitter className="h-4 w-4" />
									</Button>
								</Link>
								<Button
									variant="neomorphic"
									size="sm"
									className="p-2 rounded-full dark:text-primary"
									onClick={() =>
										navigate(
											"https://www.linkedin.com/in/souharda-roy-barman-profile"
										)
									}
								>
									{" "}
									<Linkedin className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className="mt-12 pt-8 border-t border-gray-200 dark:border-primary">
						<div className="flex flex-col  justify-between items-start">
							<p className="text-gray-600 dark:text-muted-foreground mb-4 ">
								Crafted with{" "}
								<span className="text-primary animate-ping">‪❤︎</span> by{" "}
								<Link
									className="text-primary hover:underline"
									to={"https://github.com/zenpai6996"}
								>
									Souharda
								</Link>
							</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								© 2025 FlowState. All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

// Main HomePage Component
const HomePage = () => {
	return (
		<div className="relative min-h-screen bg-white dark:bg-background overflow-hidden">
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
