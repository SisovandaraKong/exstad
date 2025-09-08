/** @format */

"use client";

interface AnimatedSpinnerProps {
	size?: number;
	variant?: "rotate" | "pulse" | "wave";
	className?: string;
}

export default function AnimatedSpinner({
	size = 500,
	variant = "rotate",
	className = "",
}: AnimatedSpinnerProps) {
	const radius = size / 2 - 20;
	const circumference = 2 * Math.PI * radius;

	// Generate radial lines for the outer ring
	const generateRadialLines = () => {
		const lines = [];
		const totalLines = 60;

		for (let i = 0; i < totalLines; i++) {
			const angle = (i * 360) / totalLines;
			const opacity =
				variant === "wave"
					? 0.3 + Math.sin((i / totalLines) * Math.PI * 4) * 0.4
					: 0.6;

			lines.push(
				<line
					key={i}
					x1={size / 2 + (radius + 10) * Math.cos((angle * Math.PI) / 180)}
					y1={size / 2 + (radius + 10) * Math.sin((angle * Math.PI) / 180)}
					x2={size / 2 + (radius + 25) * Math.cos((angle * Math.PI) / 180)}
					y2={size / 2 + (radius + 25) * Math.sin((angle * Math.PI) / 180)}
					stroke='#93C5FD'
					strokeWidth='2'
					opacity={opacity}
					className={variant === "wave" ? "animate-pulse" : ""}
					style={
						variant === "wave"
							? {
									animationDelay: `${i * 50}ms`,
									animationDuration: "8s",
							  }
							: {}
					}
				/>
			);
		}
		return lines;
	};

	const getAnimationClass = () => {
		switch (variant) {
			case "rotate":
				return "animate-spin";
			case "pulse":
				return "animate-pulse";
			case "wave":
				return "";
			default:
				return "animate-spin";
		}
	};

	return (
		<div className={`inline-block ${className}`}>
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				className={getAnimationClass()}
				style={variant === "rotate" ? { animationDuration: "10s" } : {}}>
				{/* Outer radial lines */}
				<g className={variant === "wave" ? "" : getAnimationClass()}>
					{generateRadialLines()}
				</g>

				{/* Main circle track */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill='none'
					stroke='#DBEAFE'
					strokeWidth='5'
					className={variant === "pulse" ? "animate-pulse" : ""}
				/>

				{/* Animated progress circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill='none'
					stroke='#93C5FD'
					strokeWidth='8'
					strokeLinecap='round'
					strokeDasharray={circumference}
					strokeDashoffset={variant === "rotate" ? circumference * 0.75 : 0}
					className={variant === "pulse" ? "animate-pulse" : ""}
					style={
						variant === "rotate"
							? {
									transformOrigin: "center",
									animation: "spin 2s linear infinite",
							  }
							: {}
					}
				/>

				{/* Inner highlight circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius - 15}
					fill='none'
					stroke='#BFDBFE'
					strokeWidth='2'
					opacity='0.5'
					className={variant === "pulse" ? "animate-pulse" : ""}
				/>
			</svg>

			<style jsx>{`
				@keyframes spin {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</div>
	);
}
