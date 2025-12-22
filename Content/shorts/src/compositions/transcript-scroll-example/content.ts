import type { CaptionCue } from "../../components/ReelsCaption";

/**
 * Parsed and grouped transcript from Whisper SRT
 *
 * Groups are created based on:
 * - Natural pauses (gaps > 0.4s)
 * - Sentence-ending punctuation (., !, ?)
 * - Max ~8 words per group for readability
 */
export const TRANSCRIPT_CUES: CaptionCue[] = [
	// Group 1: Opening greeting
	{ id: 1, startTime: 0.86, endTime: 3.12, text: "Hey Gabe, hope you're having a great Monday and you had a good weekend." },

	// Group 2: Discovery intro
	{ id: 2, startTime: 3.66, endTime: 6.56, text: "We're just about done with the discovery and so I just wanted to take a minute to kind" },

	// Group 3: Going through items
	{ id: 3, startTime: 6.56, endTime: 10.66, text: "of go through all of the items and documents that we have here for you." },

	// Group 4: Scheduling
	{ id: 4, startTime: 11.2, endTime: 13.0, text: "Kamin, I'll be getting with you later to schedule some time." },

	// Group 5: Awesome transition
	{ id: 5, startTime: 13.66, endTime: 17.37, text: "Awesome. So at the root of the repo, you're going to find just like a master migration document." },

	// Group 6: Data explanation
	{ id: 6, startTime: 17.66, endTime: 21.76, text: "That way you've kind of got all of the data that you'll need or will need as we go through." },

	// Group 7: Extensive
	{ id: 7, startTime: 22.04, endTime: 25.98, text: "This is very extensive. It goes over every repository that you have," },

	// Group 8: Scopes
	{ id: 8, startTime: 26.24, endTime: 31.44, text: "all the scopes, basically everything that was given to me by far away just to make sure that everything's covered." },

	// Group 9: Application stack
	{ id: 9, startTime: 31.76, endTime: 39.76, text: "Complete breakdown of your application stack and how that's going to be migrated into AWS. We've also got this GitHub repo." },

	// Group 10: Shallow clone
	{ id: 10, startTime: 40.06, endTime: 47.66, text: "This is just a shallow clone in here is this infrastructure analysis from GitHub where I just kind of go over all the bits and bobs from heavy metal." },

	// Group 11: Repos
	{ id: 11, startTime: 48.28, endTime: 50.83, text: "And then in here is a shallow clone of all of your repos." },

	// Group 12: Transfer offer
	{ id: 12, startTime: 51.42, endTime: 53.58, text: "If you'd like, we can get these transferred over to your GitHub." },

	// Group 13: Game assets
	{ id: 13, startTime: 53.9, endTime: 56.6, text: "Some of these repos have a lot of your game assets and stuff. So they're super big." },

	// Group 14: Mono repo
	{ id: 14, startTime: 56.88, endTime: 59.88, text: "So I don't have all of them in here, especially the other side mono repo." },

	// Group 15: Migration promise
	{ id: 15, startTime: 60.18, endTime: 63.1, text: "But once we get started, I can go ahead and get those migrated all the way into your GitHub." },

	// Group 16: Cloudflare intro
	{ id: 16, startTime: 64.26, endTime: 67.24, text: "Other things you'll see in here is the Cloudflare migration intake." },

	// Group 17: Workflow setup
	{ id: 17, startTime: 67.58, endTime: 72.46, text: "This is a complete and extensive like migration workflow that I set up for you that" },

	// Group 18: Every domain
	{ id: 18, startTime: 72.56, endTime: 78.62, text: "just kind of goes over literally every single heavy metal.com or heavy metal domain that we have," },

	// Group 19: Objects
	{ id: 19, startTime: 78.96, endTime: 84.44, text: "all of the objects that kind of go into this and like what it's going to take to get that taken care of for you." },

	// Group 20: Code snippets
	{ id: 20, startTime: 84.92, endTime: 89.54, text: "There's also like code snippets that I turned into actual code that was just provided for me." },

	// Group 21: Resources
	{ id: 21, startTime: 89.74, endTime: 97.76, text: "They came from far away. There's also resources here. This is just like another CSV of everything that's inside of your current product." },

	// Group 22: Cloudflare conclusion
	{ id: 22, startTime: 98.6, endTime: 101.78, text: "And so with that, that'll conclude the Cloudflare." },

	// Group 23: AWS intro
	{ id: 23, startTime: 102.08, endTime: 105.02, text: "And then we also have AWS. So AWS has just a few things in here." },

	// Group 24: Pre-transfer
	{ id: 24, startTime: 105.42, endTime: 110.64, text: "There's a pre-transfer checklist. We're just going to go through to make sure that you have everything that you need before we take that AWS account." },

	// Group 25: Inventory script
	{ id: 25, startTime: 111.32, endTime: 117.5, text: "There's an inventory checklist script that we use to kind of intake all of the objects inside of AWS so that when we transfer it," },

	// Group 26: Confirmation
	{ id: 26, startTime: 117.52, endTime: 121.84, text: "we can confirm that everything made it over. That way, if anything gets missed, we can take care of that for you." },

	// Group 27: Cutover plan
	{ id: 27, startTime: 122.42, endTime: 130.34, text: "And then there's a cut over plan from the moment that it gets cut over from far away to it being in your hands and everything that we'll do to kind of make sure that everything's sorted for you." },

	// Group 28: Closing
	{ id: 28, startTime: 131.1, endTime: 136.36, text: "Awesome. Well, I hope you're having a great day. And then the last one's just the big migration document." },

	// Group 29: Final goodbye
	{ id: 29, startTime: 136.72, endTime: 139.06, text: "Hope you're having a great day. Hope you're ready for the holidays and we'll talk soon." },
];

// Legacy export for backwards compatibility
export { TRANSCRIPT_CUES as TRANSCRIPT_GROUPS };
