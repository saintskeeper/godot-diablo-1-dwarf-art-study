import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const sentenceCueSchema = z.object({
	id: z.number(),
	startTime: z.number(), // seconds
	endTime: z.number(), // seconds
	text: z.string(),
});

export type SentenceCue = z.infer<typeof sentenceCueSchema>;

export const sentenceCaptionSchema = z.object({
	cues: z.array(sentenceCueSchema),
	className: z.string().optional(),
	fontSize: z.number().optional(),
	maxWidth: z.number().optional(), // percentage of screen width
	position: z.enum(["top", "center", "bottom"]).optional(),
	textColor: z.string().optional(), // CSS color
	pillColor: z.string().optional(), // CSS background color
	pillBlur: z.number().optional(), // backdrop blur in pixels
});

export type SentenceCaptionProps = z.infer<typeof sentenceCaptionSchema>;

/**
 * SentenceCaption - Clean sentence-by-sentence display in a frosted glass pill
 *
 * Shows one complete sentence at a time with simple cut transitions.
 * Less jarring than word-by-word animations.
 */
export const SentenceCaption: React.FC<SentenceCaptionProps> = ({
	cues,
	className,
	fontSize = 48,
	maxWidth = 85,
	position = "bottom",
	textColor = "#FFFFFF",
	pillColor = "rgba(0, 0, 0, 0.6)",
	pillBlur = 12,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const currentTime = frame / fps;

	// Find the currently active cue
	const activeCue = useMemo(() => {
		for (const cue of cues) {
			if (currentTime >= cue.startTime && currentTime < cue.endTime) {
				return cue;
			}
		}
		return null;
	}, [cues, currentTime]);

	// Position styling (must be before early return for hooks rules)
	const positionStyles = useMemo(() => {
		switch (position) {
			case "top":
				return "top-[10%]";
			case "center":
				return "top-1/2 -translate-y-1/2";
			case "bottom":
			default:
				return "bottom-[10%]";
		}
	}, [position]);

	// If no active cue, don't render anything
	if (!activeCue) {
		return null;
	}

	return (
		<div
			className={`absolute left-0 right-0 flex justify-center items-center px-8 ${positionStyles} ${className ?? ""}`}
		>
			<div
				className="rounded-2xl px-8 py-5 text-center"
				style={{
					backgroundColor: pillColor,
					backdropFilter: `blur(${pillBlur}px)`,
					WebkitBackdropFilter: `blur(${pillBlur}px)`,
					maxWidth: `${maxWidth}%`,
				}}
			>
				<span
					className="font-semibold leading-snug"
					style={{
						fontSize: `${fontSize}px`,
						color: textColor,
						textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
					}}
				>
					{activeCue.text}
				</span>
			</div>
		</div>
	);
};
