import {
	BarChart3,
	CheckSquare,
	ChevronDown,
	FolderPlus,
	LayoutDashboard,
	Rocket,
	Settings,
	Target,
	TicketCheckIcon,
	Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

const HowItWorksDemo = () => {
	const [activeStep, setActiveStep] = useState(1);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	// Process steps - easily customizable
	const steps = [
		{
			id: 0,
			title: "Create a Workspace",
			description:
				"First Create a Workspace to handle all you projects and invite members to contribute.",
			icon: LayoutDashboard,
			color: "from-primary to-accent",
			demoElements: {
				title: "Workspace Setup",
				visual: "workspace",
				stats: {
					members: "8",
					projects: "3",
					storage: "2.4GB",
				},
			},
		},
		{
			id: 1,
			title: "Create Projects ",
			description:
				"Projects are the core of your workspace. Create projects to manage tasks, milestones, and timelines effectively. Assign members tasks and track progress.",
			icon: Target,
			color: "from-primary to-accent",
			demoElements: {
				title: "Project Management",
				visual: "projects",
				stats: { active: "5", completed: "12", pending: "2" },
			},
		},
		{
			id: 2,
			title: "Assign Tasks",
			description:
				"Projects managers can assign tasks to members and track their progress. Members can update task status, add comments, and even add subtasks.",
			icon: TicketCheckIcon,
			color: "from-primary to-accent",
			demoElements: {
				title: "Task Assignment",
				visual: "tasks",
				stats: { assigned: "24", completed: "18", overdue: "2" },
			},
		},
		{
			id: 3,
			title: "Dashboard",
			description:
				"Use the dashboard to get detailed insights into your projects and tasks at a glance. Monitor progress, track deadlines, and manage resources effectively.",
			icon: Rocket,
			color: "from-primary to-accent",
			demoElements: {
				title: "Analytics Dashboard",
				visual: "dashboard",
				stats: { efficiency: "92%", onTime: "89%", satisfaction: "4.8" },
			},
		},
	];

	// Auto-play functionality
	React.useEffect(() => {
		let interval;
		if (isAutoPlaying) {
			interval = setInterval(() => {
				setActiveStep((prev) => (prev + 1) % steps.length);
			}, 4000);
		}
		return () => clearInterval(interval);
	}, [isAutoPlaying, steps.length]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: "easeOut",
			},
		},
	};

	const renderDemoVisual = (step) => {
		const { visual } = step.demoElements;

		switch (visual) {
			case "workspace":
				return (
					<div className="space-y-4">
						<Settings className="w-16 h-16 text-blue-400 mx-auto mb-4" />
						<div className="bg-gray-800 rounded-lg p-4 space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-300">
									Team Alpha Workspace
								</span>
								<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
							</div>
							<div className="space-y-2">
								{["Design Team", "Development", "Marketing"].map((team, i) => (
									<div
										key={i}
										className="flex items-center gap-3 p-2 bg-gray-700 rounded"
									>
										<Users className="w-4 h-4 text-purple-400" />
										<span className="text-xs text-gray-300">{team}</span>
										<div className="ml-auto flex -space-x-1">
											{Array(3)
												.fill()
												.map((_, j) => (
													<div
														key={j}
														className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border border-gray-800"
													></div>
												))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				);
			case "projects":
				return (
					<div className="space-y-4">
						<FolderPlus className="w-16 h-16 text-purple-400 mx-auto mb-4" />
						<div className="space-y-3">
							{[
								{ name: "Mobile App Redesign", progress: 85, status: "active" },
								{ name: "API Integration", progress: 67, status: "active" },
								{ name: "User Testing", progress: 92, status: "review" },
								{ name: "Documentation", progress: 45, status: "planning" },
							].map((project, i) => (
								<div key={i} className="bg-gray-800 rounded-lg p-3">
									<div className="flex justify-between items-center mb-2">
										<span className="text-sm font-medium text-white">
											{project.name}
										</span>
										<span
											className={`text-xs px-2 py-1 rounded-full ${
												project.status === "active"
													? "bg-green-500/20 text-green-400"
													: project.status === "review"
													? "bg-yellow-500/20 text-yellow-400"
													: "bg-blue-500/20 text-blue-400"
											}`}
										>
											{project.status}
										</span>
									</div>
									<div className="w-full bg-gray-700 rounded-full h-2">
										<motion.div
											className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
											initial={{ width: 0 }}
											animate={{ width: `${project.progress}%` }}
											transition={{ duration: 1, delay: i * 0.2 }}
										/>
									</div>
									<div className="text-xs text-gray-400 mt-1">
										{project.progress}% complete
									</div>
								</div>
							))}
						</div>
					</div>
				);
			case "tasks":
				return (
					<div className="space-y-4">
						<CheckSquare className="w-16 h-16 text-orange-400 mx-auto mb-4" />
						<div className="space-y-2">
							{[
								{
									task: "Design wireframes",
									assignee: "Sarah",
									status: "completed",
									priority: "high",
								},
								{
									task: "Implement login flow",
									assignee: "Mike",
									status: "in-progress",
									priority: "high",
								},
								{
									task: "Write unit tests",
									assignee: "Alex",
									status: "assigned",
									priority: "medium",
								},
								{
									task: "Update documentation",
									assignee: "Lisa",
									status: "review",
									priority: "low",
								},
							].map((item, i) => (
								<div
									key={i}
									className="bg-gray-800 rounded-lg p-3 flex items-center gap-3"
								>
									<div
										className={`w-3 h-3 rounded-full ${
											item.status === "completed"
												? "bg-green-400"
												: item.status === "in-progress"
												? "bg-yellow-400"
												: item.status === "review"
												? "bg-blue-400"
												: "bg-blue-400"
										}`}
									></div>
									<div className="flex-1">
										<div className="text-sm text-white">{item.task}</div>
										<div className="text-xs text-gray-400">
											Assigned to {item.assignee}
										</div>
									</div>
									<div
										className={`text-xs px-2 py-1 rounded ${
											item.priority === "high"
												? "bg-red-500/20 text-red-400"
												: item.priority === "medium"
												? "bg-yellow-500/20 text-yellow-400"
												: "bg-gray-500/20 text-green-400"
										}`}
									>
										{item.priority}
									</div>
								</div>
							))}
						</div>
					</div>
				);
			case "dashboard":
				return (
					<div className="space-y-4">
						<BarChart3 className="w-16 h-16 text-green-400 mx-auto mb-4" />
						<div className="grid grid-cols-2 gap-3 mb-4">
							<div className="bg-gray-800 rounded-lg p-3 text-center">
								<div className="text-green-400 text-lg font-bold">15</div>
								<div className="text-xs text-gray-400">Active Projects</div>
							</div>
							<div className="bg-gray-800 rounded-lg p-3 text-center">
								<div className="text-blue-400 text-lg font-bold">127</div>
								<div className="text-xs text-gray-400">Total Tasks</div>
							</div>
						</div>
						<div className="bg-gray-800 rounded-lg p-4">
							<div className="text-sm text-gray-300 mb-3">
								Project Progress Overview
							</div>
							<div className="space-y-2">
								{[
									{ label: "Completed", value: 68, color: "bg-green-500" },
									{ label: "In Progress", value: 24, color: "bg-yellow-500" },
									{ label: "Pending", value: 8, color: "bg-gray-500" },
								].map((item, i) => (
									<div key={i} className="flex items-center gap-3">
										<div className={`w-3 h-3 rounded-full ${item.color}`}></div>
										<span className="text-xs text-gray-400 flex-1">
											{item.label}
										</span>
										<span className="text-xs text-white font-medium">
											{item.value}%
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<section className="py-24 bg-trasnparent relative overflow-hidden">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={containerVariants}
					className="text-center mb-16"
				>
					<motion.div
						variants={itemVariants}
						className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6"
					>
						<div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
						<span className="text-primary text-sm font-medium">Efficient</span>
					</motion.div>

					<motion.h2
						variants={itemVariants}
						className="text-2xl md:text-5xl font-bold  bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6"
					>
						How It Works
					</motion.h2>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-12 items-start">
					{/* Steps Accordion */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={containerVariants}
						className="space-y-4"
					>
						{steps.map((step, index) => {
							const Icon = step.icon;
							const isActive = activeStep === index;
							const isExpanded = isActive;

							return (
								<motion.div
									key={step.id}
									variants={itemVariants}
									className="relative group"
								>
									<div
										className={`bg-background/50 backdrop-blur-sm border rounded-2xl transition-all duration-500 cursor-pointer ${
											isActive
												? "border-primary/50 bg-background/80 shadow-lg shadow-purple-500/10"
												: "border-accent/50 hover:border-primary/50 hover:bg-background/60"
										}`}
										onClick={() => {
											setActiveStep(index);
											setIsAutoPlaying(false);
										}}
									>
										<div className="p-6">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-4">
													<div
														className={`p-3 rounded-xl bg-gradient-to-br ${step.color} flex-shrink-0`}
													>
														<Icon className="w-5 h-5 text-white" />
													</div>
													<h3 className="text-lg font-semibold text-primary  transition-colors">
														{step.title}
													</h3>
												</div>
												<motion.div
													animate={{ rotate: isExpanded ? 180 : 0 }}
													transition={{ duration: 0.3 }}
												>
													<ChevronDown className="w-5 h-5 text-gray-400" />
												</motion.div>
											</div>

											<AnimatePresence>
												{isExpanded && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: "auto", opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.3 }}
														className="overflow-hidden"
													>
														<div className="mt-4 pl-16">
															<p className="text-gray-400  leading-relaxed">
																{step.description}
															</p>
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									</div>
								</motion.div>
							);
						})}
					</motion.div>

					{/* Demo Visualization */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={containerVariants}
						className="lg:sticky lg:top-8"
					>
						<div className="bg-gradient-to-br from-background/80 to-background/80 backdrop-blur-sm border border-primary/50 rounded-3xl p-8 relative overflow-hidden">
							{/* Decorative elements */}
							<div className="absolute top-4 right-4 flex gap-2">
								<div className="w-3 h-3 bg-red-400 rounded-full"></div>
								<div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
								<div className="w-3 h-3 bg-green-400 rounded-full"></div>
							</div>

							<AnimatePresence mode="wait">
								<motion.div
									key={activeStep}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.5 }}
									className="mt-8"
								>
									<div className="text-center mb-8">
										<h3 className="text-xl font-bold text-primary mb-2">
											{steps[activeStep].demoElements.title}
										</h3>
										<div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
									</div>

									<div className="bg-primary/20 rounded-2xl p-6 mb-6">
										{renderDemoVisual(steps[activeStep])}
									</div>

									{/* Stats */}
								</motion.div>
							</AnimatePresence>

							{/* Progress indicators */}
							<div className="flex justify-center gap-2 mt-8">
								{steps.map((_, index) => (
									<button
										key={index}
										onClick={() => {
											setActiveStep(index);
											setIsAutoPlaying(false);
										}}
										className={`h-2 rounded-full transition-all duration-300 ${
											activeStep === index
												? "w-8 bg-gradient-to-r from-primary to-accent"
												: "w-2 bg-gray-600 hover:bg-gray-500"
										}`}
									/>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default HowItWorksDemo;
