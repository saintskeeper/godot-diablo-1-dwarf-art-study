/**
 * SRT (SubRip) parser utility
 * Parses .srt subtitle files into structured transcript data
 */

export interface SrtCue {
	id: number;
	startTime: number; // seconds
	endTime: number; // seconds
	text: string;
}

/**
 * Parse SRT timestamp format (00:00:00,000) to seconds
 */
function parseTimestamp(timestamp: string): number {
	// Handle both comma and period as decimal separator
	const normalized = timestamp.replace(",", ".");
	const parts = normalized.split(":");

	if (parts.length !== 3) {
		throw new Error(`Invalid timestamp format: ${timestamp}`);
	}

	const hours = parseInt(parts[0], 10);
	const minutes = parseInt(parts[1], 10);
	const seconds = parseFloat(parts[2]);

	return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Parse SRT content string into array of cues
 */
export function parseSrt(srtContent: string): SrtCue[] {
	const cues: SrtCue[] = [];

	// Normalize line endings and split into blocks
	const normalized = srtContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	const blocks = normalized.trim().split(/\n\n+/);

	for (const block of blocks) {
		const lines = block.trim().split("\n");

		if (lines.length < 3) {
			continue; // Skip malformed blocks
		}

		// First line is the cue ID
		const id = parseInt(lines[0], 10);
		if (isNaN(id)) {
			continue; // Skip if ID is not a number
		}

		// Second line is the timestamp
		const timestampMatch = lines[1].match(
			/(\d{2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,.]\d{3})/,
		);
		if (!timestampMatch) {
			continue; // Skip if timestamp format is invalid
		}

		const startTime = parseTimestamp(timestampMatch[1]);
		const endTime = parseTimestamp(timestampMatch[2]);

		// Remaining lines are the text content
		const text = lines.slice(2).join(" ").trim();

		cues.push({
			id,
			startTime,
			endTime,
			text,
		});
	}

	return cues;
}

/**
 * Get total duration from SRT cues (end time of last cue)
 */
export function getSrtDuration(cues: SrtCue[]): number {
	if (cues.length === 0) return 0;
	return cues[cues.length - 1].endTime;
}
