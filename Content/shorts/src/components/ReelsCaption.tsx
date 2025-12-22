import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { z } from "zod";

export const captionCueSchema = z.object({
	id: z.number(),
	startTime: z.number(), // seconds
	endTime: z.number(), // seconds
	text: z.string(),
});

export type CaptionCue = z.infer<typeof captionCueSchema>;

export const reelsCaptionSchema = z.object({
	cues: z.array(captionCueSchema),
	className: z.string().optional(),
	wordsPerGroup: z.number().optional(), // max words to show at once
	fontSize: z.number().optional(),
	highlightColor: z.string().optional(), // CSS color for active word
	textColor: z.string().optional(), // CSS color for other words
	position: z.enum(["center", "bottom"]).optional(),
});

export type ReelsCaptionProps = z.infer<typeof reelsCaptionSchema>;

/**
 * ReelsCaption - Instagram Reels / TikTok style captions
 *
 * Words pop in one at a time with a bounce animation.
 * Shows a few words at a time, centered on screen.
 */
export const ReelsCaption: React.FC<ReelsCaptionProps> = ({
	cues,
	className,
	wordsPerGroup = 4,
	fontSize = 72,
	highlightColor = "#FFFFFF",
	textColor = "rgba(255, 255, 255, 0.6)",
	position = "bottom",
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

	// If no active cue, don't render anything
	if (!activeCue) {
		return null;
	}

	// Split the cue text into words
	const words = activeCue.text.split(" ");
	const cueDuration = activeCue.endTime - activeCue.startTime;
	const timePerWord = cueDuration / words.length;

	// Calculate which word group is currently active
	const elapsedInCue = currentTime - activeCue.startTime;
	const currentWordIndex = Math.min(
		Math.floor(elapsedInCue / timePerWord),
		words.length - 1
	);

	// Determine the word group to display (sliding window)
	const groupStart = Math.max(0, currentWordIndex - Math.floor(wordsPerGroup / 2));
	const groupEnd = Math.min(words.length, groupStart + wordsPerGroup);
	const adjustedStart = Math.max(0, groupEnd - wordsPerGroup);
	const visibleWords = words.slice(adjustedStart, groupEnd);
	const visibleStartIndex = adjustedStart;

	// Position styling
	const positionStyles = position === "center"
		? "top-1/2 -translate-y-1/2"
		: "bottom-[15%]";

	return (
		<div
			className={`absolute left-0 right-0 flex justify-center items-center px-8 ${positionStyles} ${className ?? ""}`}
		>
			<div
				className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 max-w-4xl"
				style={{ perspective: "1000px" }}
			>
				{visibleWords.map((word, idx) => {
					const globalWordIndex = visibleStartIndex + idx;
					const wordStartTime = activeCue.startTime + globalWordIndex * timePerWord;
					const wordEndTime = wordStartTime + timePerWord;

					// Calculate frame offset for this word's animation
					const wordStartFrame = wordStartTime * fps;
					const framesSinceWordStart = frame - wordStartFrame;

					// Spring animation for pop-in effect
					const popIn = spring({
						frame: framesSinceWordStart,
						fps,
						config: {
							stiffness: 200,
							damping: 12,
							mass: 0.8,
						},
						durationInFrames: 15,
					});

					// Scale animation: starts at 0.3, bounces to 1.0
					const scale = interpolate(popIn, [0, 1], [0.3, 1]);

					// Opacity: fade in quickly
					const opacity = interpolate(popIn, [0, 0.5, 1], [0, 1, 1]);

					// Is this the currently active word?
					const isActive = currentTime >= wordStartTime && currentTime < wordEndTime;
					const isPast = currentTime >= wordEndTime;
					const isFuture = currentTime < wordStartTime;

					// Color based on state
					const color = isActive ? highlightColor : (isPast ? textColor : textColor);

					// Active word gets extra emphasis
					const activeScale = isActive ? 1.1 : 1;
					const finalScale = scale * activeScale;

					// Y offset for bounce feel
					const yOffset = interpolate(popIn, [0, 0.5, 1], [20, -5, 0]);

					return (
						<span
							key={`${activeCue.id}-${globalWordIndex}`}
							className="inline-block font-black uppercase tracking-tight"
							style={{
								fontSize: `${fontSize}px`,
								lineHeight: 1.1,
								color,
								transform: `scale(${finalScale}) translateY(${yOffset}px)`,
								opacity: isFuture ? 0 : opacity,
								textShadow: isActive
									? `0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)`
									: `0 2px 10px rgba(0, 0, 0, 0.6)`,
								WebkitTextStroke: isActive ? "1px rgba(0,0,0,0.3)" : "none",
							}}
						>
							{word}
						</span>
					);
				})}
			</div>
		</div>
	);
};

/**
 * ReelsCaptionPill - Shows 3 words: previous, current (highlighted), next
 * Always displays a triplet centered on the current word
 * Uses WaltMakes Cozy Forge brand colors by default
 */
export const ReelsCaptionPill: React.FC<ReelsCaptionProps> = ({
	cues,
	className,
	fontSize = 56,
	highlightColor = "#E07040", // Hearth Orange (brand CTA)
	textColor = "#F5EDE0", // Parchment (brand background)
	position = "bottom",
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

	if (!activeCue) {
		return null;
	}

	const words = activeCue.text.split(" ");
	const cueDuration = activeCue.endTime - activeCue.startTime;
	const timePerWord = cueDuration / words.length;
	const elapsedInCue = currentTime - activeCue.startTime;
	const currentWordIndex = Math.min(
		Math.floor(elapsedInCue / timePerWord),
		words.length - 1
	);

	// Build triplet: [previous, current, next]
	// Use null for positions that don't exist
	const triplet: Array<{ word: string; index: number } | null> = [
		currentWordIndex > 0
			? { word: words[currentWordIndex - 1], index: currentWordIndex - 1 }
			: null,
		{ word: words[currentWordIndex], index: currentWordIndex },
		currentWordIndex < words.length - 1
			? { word: words[currentWordIndex + 1], index: currentWordIndex + 1 }
			: null,
	];

	const positionStyles = position === "center"
		? "top-1/2 -translate-y-1/2"
		: "bottom-[12%]";

	// Container pop-in animation
	const containerPop = spring({
		frame: frame - activeCue.startTime * fps,
		fps,
		config: { stiffness: 150, damping: 15 },
		durationInFrames: 20,
	});

	return (
		<div
			className={`absolute left-0 right-0 flex justify-center items-center px-4 ${positionStyles} ${className ?? ""}`}
		>
			<div
				className="backdrop-blur-sm rounded-2xl px-10 py-5 grid grid-cols-3 items-center"
				style={{
					backgroundColor: "rgba(42, 37, 32, 0.9)", // Deep Ink (brand primary text)
					transform: `scale(${interpolate(containerPop, [0, 1], [0.8, 1])})`,
					opacity: interpolate(containerPop, [0, 1], [0, 1]),
					minWidth: "500px",
					gap: "0.75rem",
				}}
			>
				{triplet.map((item, slotIndex) => {
					// Alignment: left for prev, center for current, right for next
					const alignment = slotIndex === 0 ? "text-right" : slotIndex === 1 ? "text-center" : "text-left";

					if (!item) {
						// Empty slot
						return (
							<span
								key={`empty-${slotIndex}`}
								className={`inline-block ${alignment}`}
							/>
						);
					}

					const { word, index: globalWordIndex } = item;
					const wordStartTime = activeCue.startTime + globalWordIndex * timePerWord;
					const wordEndTime = wordStartTime + timePerWord;
					const wordStartFrame = wordStartTime * fps;
					const framesSinceWordStart = frame - wordStartFrame;

					const popIn = spring({
						frame: framesSinceWordStart,
						fps,
						config: { stiffness: 300, damping: 15, mass: 0.5 },
						durationInFrames: 12,
					});

					const isActive = currentTime >= wordStartTime && currentTime < wordEndTime;
					const isFuture = currentTime < wordStartTime;
					const isPast = currentTime >= wordEndTime;

					const scale = interpolate(popIn, [0, 1], [0.5, 1]);
					// Past words: dimmed, future words: more dimmed
					const opacity = isFuture ? 0.4 : isPast ? 0.6 : interpolate(popIn, [0, 1], [0.3, 1]);

					return (
						<span
							key={`${activeCue.id}-${globalWordIndex}`}
							className={`inline-block font-bold ${alignment}`}
							style={{
								fontSize: `${fontSize}px`,
								lineHeight: 1,
								color: isActive ? highlightColor : textColor,
								transform: `scale(${isActive ? scale * 1.15 : scale})`,
								opacity,
							}}
						>
							{word}
						</span>
					);
				})}
			</div>
		</div>
	);
};
