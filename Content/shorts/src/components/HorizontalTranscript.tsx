import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { z } from "zod";

export const transcriptCueSchema = z.object({
	id: z.number(),
	startTime: z.number(), // seconds
	endTime: z.number(), // seconds
	text: z.string(),
});

export type TranscriptCue = z.infer<typeof transcriptCueSchema>;

export const horizontalTranscriptSchema = z.object({
	cues: z.array(transcriptCueSchema),
	className: z.string().optional(),
	fontSize: z.number().optional(), // in pixels
	gap: z.number().optional(), // gap between cues in pixels
	highlightColor: z.string().optional(), // Tailwind class for active text
	dimColor: z.string().optional(), // Tailwind class for inactive text
	verticalPosition: z.enum(["top", "center", "bottom"]).optional(),
});

export type HorizontalTranscriptProps = z.infer<typeof horizontalTranscriptSchema>;

/**
 * HorizontalTranscript - Scrolls transcript text horizontally from left to right
 *
 * The text scrolls so that the currently active cue is centered on screen.
 * Active cues are highlighted while past/future cues are dimmed.
 */
export const HorizontalTranscript: React.FC<HorizontalTranscriptProps> = ({
	cues,
	className,
	fontSize = 48,
	gap = 80,
	highlightColor = "text-white",
	dimColor = "text-white/30",
	verticalPosition = "bottom",
}) => {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();
	const currentTime = frame / fps;

	// Find the currently active cue index
	const activeCueIndex = useMemo(() => {
		for (let i = 0; i < cues.length; i++) {
			if (currentTime >= cues[i].startTime && currentTime < cues[i].endTime) {
				return i;
			}
			// Handle gap between cues - show the upcoming cue
			if (i < cues.length - 1 && currentTime >= cues[i].endTime && currentTime < cues[i + 1].startTime) {
				return i + 1;
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
		return 0;
	}, [cues, currentTime]);

	// Estimate width of each cue based on character count
	// Using a rough estimate of 0.5 * fontSize per character for a typical font
	const charWidthFactor = 0.55;
	const cueWidths = useMemo(() => {
		return cues.map(cue => cue.text.length * fontSize * charWidthFactor);
	}, [cues, fontSize]);

	// Calculate cumulative positions (center of each cue)
	const cuePositions = useMemo(() => {
		const positions: number[] = [];
		let currentX = 0;

		for (let i = 0; i < cues.length; i++) {
			// Position is the center of this cue
			const cueCenter = currentX + cueWidths[i] / 2;
			positions.push(cueCenter);
			// Move to next cue position
			currentX += cueWidths[i] + gap;
		}

		return positions;
	}, [cues, cueWidths, gap]);

	// Calculate scroll position to center the active cue
	// Interpolate smoothly between cue centers based on time within the cue
	const scrollX = useMemo(() => {
		if (cues.length === 0) return 0;

		const activeCue = cues[activeCueIndex];
		const activePosition = cuePositions[activeCueIndex];

		// Calculate progress within the current cue (0 to 1)
		const cueProgress = interpolate(
			currentTime,
			[activeCue.startTime, activeCue.endTime],
			[0, 1],
			{
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
			}
		);

		// If there's a next cue, interpolate towards its center
		if (activeCueIndex < cues.length - 1) {
			const nextPosition = cuePositions[activeCueIndex + 1];
			const targetPosition = interpolate(
				cueProgress,
				[0, 1],
				[activePosition, activePosition + (nextPosition - activePosition) * 0.3],
				{
					extrapolateLeft: "clamp",
					extrapolateRight: "clamp",
				}
			);
			// Center on screen: scroll so target is at center
			return width / 2 - targetPosition;
		}

		// Last cue - just center it
		return width / 2 - activePosition;
	}, [cues, activeCueIndex, cuePositions, currentTime, width]);

	// Vertical positioning
	const verticalStyles = useMemo(() => {
		switch (verticalPosition) {
			case "top":
				return "top-16";
			case "center":
				return "top-1/2 -translate-y-1/2";
			case "bottom":
			default:
				return "bottom-16";
		}
	}, [verticalPosition]);

	return (
		<div
			className={`absolute left-0 right-0 overflow-hidden ${verticalStyles} ${className ?? ""}`}
			style={{ height: fontSize * 1.5 }}
		>
			{/* Scrolling container */}
			<div
				className="absolute whitespace-nowrap flex items-center"
				style={{
					transform: `translateX(${scrollX}px)`,
					height: "100%",
					gap: `${gap}px`,
				}}
			>
				{cues.map((cue, index) => {
					const isActive = index === activeCueIndex &&
						currentTime >= cue.startTime &&
						currentTime < cue.endTime;

					// Calculate word-level progress for the active cue
					let wordHighlightProgress = 0;
					if (isActive) {
						wordHighlightProgress = interpolate(
							currentTime,
							[cue.startTime, cue.endTime],
							[0, 1],
							{
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							}
						);
					}

					// Split text into words for word-level highlighting
					const words = cue.text.split(" ");
					const wordsToHighlight = isActive
						? Math.ceil(wordHighlightProgress * words.length)
						: (currentTime >= cue.endTime ? words.length : 0);

					return (
						<span
							key={cue.id}
							className="inline-block font-semibold"
							style={{
								fontSize: `${fontSize}px`,
								lineHeight: 1.2,
							}}
						>
							{words.map((word, wordIndex) => {
								const isWordHighlighted = (isActive && wordIndex < wordsToHighlight) ||
									currentTime >= cue.endTime;

								return (
									<span
										key={wordIndex}
										className={isWordHighlighted ? highlightColor : dimColor}
									>
										{word}
										{wordIndex < words.length - 1 ? " " : ""}
									</span>
								);
							})}
						</span>
					);
				})}
			</div>

			{/* Gradient masks for fade effect at edges */}
			<div
				className="absolute inset-y-0 left-0 pointer-events-none z-10"
				style={{
					width: "15%",
					background: "linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)",
				}}
			/>
			<div
				className="absolute inset-y-0 right-0 pointer-events-none z-10"
				style={{
					width: "15%",
					background: "linear-gradient(to left, rgba(0,0,0,1) 0%, transparent 100%)",
				}}
			/>
		</div>
	);
};
