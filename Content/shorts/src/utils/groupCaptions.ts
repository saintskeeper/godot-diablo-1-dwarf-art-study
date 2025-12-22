/**
 * Smart caption grouping utility
 *
 * Groups SRT cues into natural sentence/phrase groups based on:
 * - Punctuation (., !, ?, etc.)
 * - Pauses between cues (silence detection)
 * - Maximum word count for readability
 *
 * Research-backed: https://pmc.ncbi.nlm.nih.gov/articles/PMC7901653/
 */

import type { SrtCue } from "./parseSrt";

export interface WordTiming {
	word: string;
	start: number; // seconds
	end: number; // seconds
}

export interface CaptionGroup {
	id: number;
	words: WordTiming[];
	startTime: number;
	endTime: number;
	text: string; // full text of the group
}

export interface GroupingConfig {
	/** Pause threshold in seconds - gaps larger than this start a new group */
	pauseThreshold: number;
	/** Maximum words per group for readability */
	maxWordsPerGroup: number;
	/** Minimum words before allowing a break (prevents single-word groups) */
	minWordsBeforeBreak: number;
	/** Punctuation that ends a sentence (always break after) */
	sentenceEnders: string[];
	/** Punctuation that can break a phrase (break if near max words) */
	phraseBreakers: string[];
}

const DEFAULT_CONFIG: GroupingConfig = {
	pauseThreshold: 0.4, // 400ms pause = new group
	maxWordsPerGroup: 8,
	minWordsBeforeBreak: 2,
	sentenceEnders: [".", "!", "?"],
	phraseBreakers: [",", ";", ":", "—", "–"],
};

/**
 * Check if text ends with any of the given punctuation marks
 */
function endsWithPunctuation(text: string, punctuation: string[]): boolean {
	const trimmed = text.trim();
	return punctuation.some((p) => trimmed.endsWith(p));
}

/**
 * Estimate word timings within a cue by distributing time evenly
 * This is a fallback when we don't have word-level timestamps
 */
function estimateWordTimings(cue: SrtCue): WordTiming[] {
	const words = cue.text.trim().split(/\s+/);
	if (words.length === 0) return [];

	const duration = cue.endTime - cue.startTime;
	const timePerWord = duration / words.length;

	return words.map((word, i) => ({
		word,
		start: cue.startTime + i * timePerWord,
		end: cue.startTime + (i + 1) * timePerWord,
	}));
}

/**
 * Group SRT cues into natural caption groups
 *
 * Algorithm:
 * 1. Parse each cue into word timings
 * 2. Detect pauses between cues
 * 3. Group words based on punctuation, pauses, and max length
 */
export function groupCaptions(
	cues: SrtCue[],
	config: Partial<GroupingConfig> = {}
): CaptionGroup[] {
	const cfg = { ...DEFAULT_CONFIG, ...config };
	const groups: CaptionGroup[] = [];

	let currentWords: WordTiming[] = [];
	let groupId = 0;

	for (let i = 0; i < cues.length; i++) {
		const cue = cues[i];
		const cueWords = estimateWordTimings(cue);

		// Check for pause before this cue
		const prevCue = i > 0 ? cues[i - 1] : null;
		const pauseBeforeCue = prevCue ? cue.startTime - prevCue.endTime : 0;
		const hasSignificantPause = pauseBeforeCue > cfg.pauseThreshold;

		// Check if previous cue ended with sentence-ending punctuation
		const prevEndedSentence = prevCue
			? endsWithPunctuation(prevCue.text, cfg.sentenceEnders)
			: false;

		// Decide if we should start a new group
		const shouldStartNewGroup =
			currentWords.length > 0 &&
			(hasSignificantPause ||
				prevEndedSentence ||
				currentWords.length >= cfg.maxWordsPerGroup);

		if (shouldStartNewGroup) {
			// Finalize current group
			groups.push({
				id: groupId++,
				words: currentWords,
				startTime: currentWords[0].start,
				endTime: currentWords[currentWords.length - 1].end,
				text: currentWords.map((w) => w.word).join(" "),
			});
			currentWords = [];
		}

		// Add words from current cue
		currentWords.push(...cueWords);

		// Check if this cue ends with phrase-breaking punctuation
		// and we're near the max word count
		const endsWithPhraseBreak = endsWithPunctuation(
			cue.text,
			cfg.phraseBreakers
		);
		const nearMaxWords = currentWords.length >= cfg.maxWordsPerGroup - 2;

		if (
			endsWithPhraseBreak &&
			nearMaxWords &&
			currentWords.length >= cfg.minWordsBeforeBreak
		) {
			groups.push({
				id: groupId++,
				words: currentWords,
				startTime: currentWords[0].start,
				endTime: currentWords[currentWords.length - 1].end,
				text: currentWords.map((w) => w.word).join(" "),
			});
			currentWords = [];
		}
	}

	// Don't forget the last group
	if (currentWords.length > 0) {
		groups.push({
			id: groupId++,
			words: currentWords,
			startTime: currentWords[0].start,
			endTime: currentWords[currentWords.length - 1].end,
			text: currentWords.map((w) => w.word).join(" "),
		});
	}

	return groups;
}

/**
 * Parse SRT content and group into caption groups
 */
export async function parseSrtAndGroup(
	srtContent: string,
	config?: Partial<GroupingConfig>
): Promise<CaptionGroup[]> {
	// Import parseSrt dynamically to avoid circular deps
	const { parseSrt } = await import("./parseSrt");
	const cues = parseSrt(srtContent);
	return groupCaptions(cues, config);
}
