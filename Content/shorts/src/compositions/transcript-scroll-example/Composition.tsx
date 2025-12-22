import { AbsoluteFill, OffthreadVideo, staticFile, Audio } from "remotion";
import { ReelsCaption, ReelsCaptionPill } from "../../components/ReelsCaption";
import { SentenceCaption } from "../../components/SentenceCaption";
import { createComposition } from "../../utils/createComposition";
import { VIDEO_DURATION_SECONDS, VIDEO_SRC } from "./config";
import { TRANSCRIPT_CUES } from "./content";

/**
 * Instagram Reels / TikTok style composition
 * Words pop in one at a time with bounce animation
 */
const TranscriptScrollComposition: React.FC = () => {
	return (
		<AbsoluteFill className="bg-black">
			{/* Full-screen video */}
			<OffthreadVideo
				src={staticFile(VIDEO_SRC)}
				className="w-full h-full object-cover"
			/>

			{/* Audio from video */}
			<Audio src={staticFile(VIDEO_SRC)} />

			{/* Reels-style pop-in captions */}
			<ReelsCaption
				cues={TRANSCRIPT_CUES}
				wordsPerGroup={4}
				fontSize={64}
				highlightColor="#FFFFFF"
				textColor="rgba(255, 255, 255, 0.5)"
				position="bottom"
			/>
		</AbsoluteFill>
	);
};

/**
 * Alternative version with pill-style background
 */
const TranscriptPillComposition: React.FC = () => {
	return (
		<AbsoluteFill className="bg-black">
			<OffthreadVideo
				src={staticFile(VIDEO_SRC)}
				className="w-full h-full object-cover"
			/>
			<Audio src={staticFile(VIDEO_SRC)} />

			{/* Pill-style captions: shows previous, current (highlighted), next */}
			{/* Uses WaltMakes Cozy Forge brand colors by default */}
			<ReelsCaptionPill
				cues={TRANSCRIPT_CUES}
				fontSize={48}
				position="bottom"
			/>
		</AbsoluteFill>
	);
};

// Export both variations
export const TranscriptScrollExample = createComposition({
	name: "TranscriptScrollExample",
	component: TranscriptScrollComposition,
	durationInSeconds: VIDEO_DURATION_SECONDS,
	preset: "Landscape-1080p",
});

export const TranscriptPillExample = createComposition({
	name: "TranscriptPillExample",
	component: TranscriptPillComposition,
	durationInSeconds: VIDEO_DURATION_SECONDS,
	preset: "Landscape-1080p",
});

/**
 * Clean sentence-by-sentence captions in a frosted glass pill
 * Less jarring than word-by-word animations
 */
const TranscriptSentenceComposition: React.FC = () => {
	return (
		<AbsoluteFill className="bg-black">
			<OffthreadVideo
				src={staticFile(VIDEO_SRC)}
				className="w-full h-full object-cover"
			/>
			<Audio src={staticFile(VIDEO_SRC)} />

			{/* Sentence-by-sentence captions in frosted pill */}
			<SentenceCaption
				cues={TRANSCRIPT_CUES}
				fontSize={42}
				maxWidth={80}
				position="bottom"
				textColor="#FFFFFF"
				pillColor="rgba(0, 0, 0, 0.65)"
				pillBlur={16}
			/>
		</AbsoluteFill>
	);
};

export const TranscriptSentenceExample = createComposition({
	name: "TranscriptSentenceExample",
	component: TranscriptSentenceComposition,
	durationInSeconds: VIDEO_DURATION_SECONDS,
	preset: "Landscape-1080p",
});
