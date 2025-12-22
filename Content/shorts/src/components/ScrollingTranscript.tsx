import React, { useMemo } from "react";
import {
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	Easing,
} from "remotion";
import { z } from "zod";

export const srtCueSchema = z.object({
	id: z.number(),
	startTime: z.number(), // seconds
	endTime: z.number(), // seconds
	text: z.string(),
});

export type SrtCue = z.infer<typeof srtCueSchema>;

export const scrollingTranscriptSchema = z.object({
	cues: z.array(srtCueSchema),
	className: z.string().optional(),
	position: z.enum(["left", "right", "bottom"]).optional(),
	width: z.number().optional(), // percentage for side panels
	visibleLines: z.number().optional(), // how many lines to show
	highlightColor: z.string().optional(),
	dimColor: z.string().optional(),
});

export type ScrollingTranscriptProps = z.infer<typeof scrollingTranscriptSchema>;

export const ScrollingTranscript: React.FC<ScrollingTranscriptProps> = ({
	cues,
	className,
	position = "right",
	width = 35,
	visibleLines = 5,
	highlightColor = "text-white",
	dimColor = "text-white/40",
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const currentTime = frame / fps;

	// Find the currently active cue
	const activeCueIndex = useMemo(() => {
		for (let i = 0; i < cues.length; i++) {
			if (currentTime >= cues[i].startTime && currentTime < cues[i].endTime) {
				return i;
			}
			// Handle gap between cues - show the previous cue
			if (i < cues.length - 1 && currentTime >= cues[i].endTime && currentTime < cues[i + 1].startTime) {
				return i;
			}
		}
		// Before first cue
		if (cues.length > 0 && currentTime < cues[0].startTime) {
			return 0;
		}
		// After last cue
		if (cues.length > 0 && currentTime >= cues[cues.length - 1].endTime) {
			return cues.length - 1;
		}
		return -1;
	}, [cues, currentTime]);

	// Calculate scroll offset for smooth scrolling
	const scrollOffset = useMemo(() => {
		if (activeCueIndex < 0 || cues.length === 0) return 0;

		const activeCue = cues[activeCueIndex];
		const cueProgress = interpolate(
			currentTime,
			[activeCue.startTime, activeCue.endTime],
			[0, 1],
			{
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
				easing: Easing.linear,
			},
		);

		// Base offset centers the active cue, with smooth transition within cue
		const baseOffset = activeCueIndex + cueProgress * 0.3;
		return baseOffset;
	}, [activeCueIndex, cues, currentTime]);

	// Position styles based on placement
	const positionStyles = useMemo(() => {
		switch (position) {
			case "left":
				return {
					container: `absolute left-0 top-0 bottom-0 flex flex-col justify-center`,
					style: { width: `${width}%` },
				};
			case "right":
				return {
					container: `absolute right-0 top-0 bottom-0 flex flex-col justify-center`,
					style: { width: `${width}%` },
				};
			case "bottom":
				return {
					container: `absolute left-0 right-0 bottom-0 flex flex-col justify-end`,
					style: { height: "30%" },
				};
			default:
				return {
					container: `absolute right-0 top-0 bottom-0 flex flex-col justify-center`,
					style: { width: `${width}%` },
				};
		}
	}, [position, width]);

	const lineHeight = 100 / visibleLines; // percentage

	return (
		<div
			className={`${positionStyles.container} overflow-hidden ${className ?? ""}`}
			style={positionStyles.style}
		>
			<div
				className="relative px-8"
				style={{
					height: `${lineHeight * visibleLines}%`,
				}}
			>
				<div
					className="absolute w-full"
					style={{
						transform: `translateY(${(visibleLines / 2 - scrollOffset) * lineHeight}%)`,
					}}
				>
					{cues.map((cue, index) => {
						const isActive = index === activeCueIndex &&
							currentTime >= cue.startTime &&
							currentTime < cue.endTime;

						// Calculate opacity based on distance from active cue
						const distance = Math.abs(index - activeCueIndex);
						const opacity = interpolate(
							distance,
							[0, 1, 2, 3],
							[1, 0.7, 0.4, 0.2],
							{
								extrapolateRight: "clamp",
							},
						);

						return (
							<div
								key={cue.id}
								className={`py-4 ${
									isActive
										? `${highlightColor} font-semibold`
										: dimColor
								}`}
								style={{
									height: `${lineHeight}%`,
									opacity,
									fontSize: position === "bottom" ? "2rem" : "1.5rem",
									lineHeight: 1.4,
									transform: isActive ? "scale(1.05)" : "scale(1)",
									transformOrigin: "left",
								}}
							>
								{cue.text}
							</div>
						);
					})}
				</div>
			</div>

			{/* Gradient masks for fade effect */}
			{position !== "bottom" && (
				<>
					<div
						className="absolute top-0 left-0 right-0 pointer-events-none"
						style={{
							height: "20%",
							background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)",
						}}
					/>
					<div
						className="absolute bottom-0 left-0 right-0 pointer-events-none"
						style={{
							height: "20%",
							background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
						}}
					/>
				</>
			)}
		</div>
	);
};
