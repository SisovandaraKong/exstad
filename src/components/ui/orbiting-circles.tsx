/** @format */

"use client";

import React from "react";

import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps {
	className?: string;
	children?: React.ReactNode;
	reverse?: boolean;
	duration?: number;
	delay?: number;
	radius?: number;
	iconSize?: number;
}

export const OrbitingCircles = ({
	className,
	children,
	reverse = false,
	duration = 20,
	delay = 0,
	radius = 50,
	iconSize = 20,
}: OrbitingCirclesProps) => {
	const childrenArray = React.Children.toArray(children);
	const angleStep = 360 / childrenArray.length;

	return (
		<>
			{childrenArray.map((child, index) => {
				const angle = angleStep * index;
				const animationDelay = `${
					(delay + (index * duration) / childrenArray.length) *
					(reverse ? -1 : 1)
				}s`;

				return (
					<div
						key={index}
						className={cn("absolute", className)}
						style={
							{
								"--orbit-radius": `${radius}px`,
								"--orbit-duration": `${duration}s`,
								"--orbit-delay": animationDelay,
								"--orbit-angle": `${angle}deg`,
								animation: `orbit var(--orbit-duration) linear infinite`,
								animationDelay: "var(--orbit-delay)",
								animationDirection: reverse ? "reverse" : "normal",
							} as React.CSSProperties
						}>
						{child}
					</div>
				);
			})}
			<style jsx>{`
				@keyframes orbit {
					from {
						transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
					}
					to {
						transform: rotate(360deg) translateX(var(--orbit-radius))
							rotate(-360deg);
					}
				}
			`}</style>
		</>
	);
};
