// /** @format */

// "use client";

// interface AnimatedSpinnerProps {
// 	size?: number;
// 	className?: string;
// }

// export default function AnimatedSpinner({
// 	size = 500,
// 	className = "",
// }: AnimatedSpinnerProps) {
// 	const radius = size / 2 - 90; // smaller so we can fit dashes around
// 	const circumference = 2 * Math.PI * radius;

// 	const config = {
// 		duration: "16s", // slower animation
// 		progressDuration: "6s", // slower progress ring
// 		easing: "linear",
// 		direction: "normal",
// 	};

// 	// Generate short radial dashes
// 	const generateOrbitingDashes = () => {
// 		const elements = [];
// 		const totalElements = 150;
// 		const orbitRadius = radius + 30;

// 		for (let i = 0; i < totalElements; i++) {
// 			const angle = (i * 360) / totalElements;
// 			const dashLength = i % 2 === 0 ? 40 : 20; // alternate long/short
// 			const x1 = size / 2 + orbitRadius * Math.cos((angle * Math.PI) / 180);
// 			const y1 = size / 2 + orbitRadius * Math.sin((angle * Math.PI) / 180);
// 			const x2 =
// 				size / 2 +
// 				(orbitRadius + dashLength) * Math.cos((angle * Math.PI) / 180);
// 			const y2 =
// 				size / 2 +
// 				(orbitRadius + dashLength) * Math.sin((angle * Math.PI) / 180);

// 			elements.push(
// 				<line
// 					key={i}
// 					x1={x1}
// 					y1={y1}
// 					x2={x2}
// 					y2={y2}
// 					stroke='#328BE6'
// 					strokeWidth='3'
// 					strokeLinecap='round'
// 					opacity={0.2}
// 				/>
// 			);
// 		}
// 		return elements;
// 	};

// 	return (
// 		<div
// 			className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square mx-auto ${className}`}>
// 			<svg
// 				width='100%'
// 				height='100%'
// 				viewBox={`0 0 ${size} ${size}`}
// 				className='animate-spin'
// 				style={{
// 					animationDuration: config.duration,
// 					animationTimingFunction: config.easing,
// 					animationDirection: config.direction,
// 				}}>
// 				<g
// 					className='animate-spin'
// 					style={{
// 						transformOrigin: `${size / 2}px ${size / 2}px`,
// 						animationDuration: `${Number.parseFloat(config.duration) * 0.7}s`,
// 						animationTimingFunction: config.easing,
// 					}}>
// 					{generateOrbitingDashes()}
// 				</g>

// 				{/* Outer progress circle */}
// 				<circle
// 					cx={size / 2}
// 					cy={size / 2}
// 					r={radius}
// 					fill='none'
// 					stroke='#93C5FD'
// 					strokeWidth='20'
// 					strokeLinecap='square'
// 					strokeDasharray={circumference}
// 					strokeDashoffset={circumference * 0.5} // longer arc visible
// 					style={{
// 						transformOrigin: "center",
// 						animation: `spin ${config.progressDuration} ${config.easing} infinite ${config.direction}`,
// 					}}
// 					opacity={0.5}
// 				/>

// 				{/* Inner decorative circle */}
// 				<circle
// 					cx={size / 2}
// 					cy={size / 2}
// 					r={radius - 25}
// 					fill='none'
// 					stroke='#BFDBFE'
// 					strokeWidth='3'
// 					opacity='0.5'
// 				/>

// 				{/* Second inner circle */}
// 				<circle
// 					cx={size / 2}
// 					cy={size / 2}
// 					r={radius - 45}
// 					fill='none'
// 					stroke='#BFDBFE'
// 					strokeWidth='2'
// 					opacity='0.5'
// 				/>
// 			</svg>

// 			<style jsx>{`
// 				@keyframes spin {
// 					from {
// 						transform: rotate(0deg);
// 					}
// 					to {
// 						transform: rotate(360deg);
// 					}
// 				}
// 			`}</style>
// 		</div>
// 	);
// }