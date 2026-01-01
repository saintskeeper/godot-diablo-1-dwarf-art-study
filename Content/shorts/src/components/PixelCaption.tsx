import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { z } from "zod";

export const pixelCaptionCueSchema = z.object({
  id: z.number(),
  startTime: z.number(),
  endTime: z.number(),
  text: z.string(),
});

export type PixelCaptionCue = z.infer<typeof pixelCaptionCueSchema>;

export const pixelCaptionSchema = z.object({
  cues: z.array(pixelCaptionCueSchema),
  className: z.string().optional(),
  fontSize: z.number().optional(),
  highlightColor: z.string().optional(),
  textColor: z.string().optional(),
  position: z.enum(["center", "bottom"]).optional(),
  variant: z.enum(["default", "alert", "success", "info"]).optional(),
});

export type PixelCaptionProps = z.infer<typeof pixelCaptionSchema>;

const variantStyles = {
  default: {
    pillBg: "#2A2520", // deep-ink
    border: "#E8DCC8", // horn-ivory
    shadow: "#7A5040", // fur-brown
    highlight: "#E07040", // hearth-orange
    text: "#F5EDE0", // parchment
  },
  alert: {
    pillBg: "#6E301A", // orange-700
    border: "#E07040",
    shadow: "#2A2520",
    highlight: "#FADAC8", // orange-100
    text: "#F5EDE0",
  },
  success: {
    pillBg: "#2E5C3A", // green-600
    border: "#C2E5CA",
    shadow: "#2A2520",
    highlight: "#E8F5EB", // green-50
    text: "#F5EDE0",
  },
  info: {
    pillBg: "#225862", // teal-600
    border: "#C5E4E9",
    shadow: "#2A2520",
    highlight: "#E8F4F6", // teal-50
    text: "#F5EDE0",
  },
};

/**
 * PixelCaptionPill - Pixel art style caption with word triplet
 * Shows previous, current (highlighted), and next word
 * Uses Press Start 2P font and pixel borders
 */
export const PixelCaptionPill: React.FC<PixelCaptionProps> = ({
  cues,
  className,
  fontSize = 32,
  highlightColor,
  textColor,
  position = "bottom",
  variant = "default",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;
  const styles = variantStyles[variant];

  // Override colors if provided
  const highlight = highlightColor ?? styles.highlight;
  const text = textColor ?? styles.text;

  // Find active cue
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
  const triplet: Array<{ word: string; index: number } | null> = [
    currentWordIndex > 0
      ? { word: words[currentWordIndex - 1], index: currentWordIndex - 1 }
      : null,
    { word: words[currentWordIndex], index: currentWordIndex },
    currentWordIndex < words.length - 1
      ? { word: words[currentWordIndex + 1], index: currentWordIndex + 1 }
      : null,
  ];

  const positionStyles =
    position === "center" ? "top-1/2 -translate-y-1/2" : "bottom-[12%]";

  // Container pop-in
  const containerPop = spring({
    frame: frame - activeCue.startTime * fps,
    fps,
    config: { stiffness: 150, damping: 15 },
    durationInFrames: 20,
  });

  // Pixel border dimensions
  const borderWidth = 6;
  const shadowOffset = 10;

  const pixelBorder = `
    ${borderWidth}px 0 0 0 ${styles.border},
    -${borderWidth}px 0 0 0 ${styles.border},
    0 ${borderWidth}px 0 0 ${styles.border},
    0 -${borderWidth}px 0 0 ${styles.border},
    ${borderWidth}px ${borderWidth}px 0 0 ${styles.border},
    -${borderWidth}px ${borderWidth}px 0 0 ${styles.border},
    ${borderWidth}px -${borderWidth}px 0 0 ${styles.border},
    -${borderWidth}px -${borderWidth}px 0 0 ${styles.border},
    ${shadowOffset}px ${shadowOffset}px 0 0 ${styles.shadow}
  `;

  return (
    <div
      className={`absolute left-0 right-0 flex justify-center items-center px-4 ${positionStyles} ${className ?? ""}`}
    >
      <div
        style={{
          backgroundColor: styles.pillBg,
          boxShadow: pixelBorder,
          padding: "24px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          transform: `scale(${interpolate(containerPop, [0, 1], [0.8, 1])})`,
          opacity: interpolate(containerPop, [0, 1], [0, 1]),
        }}
      >
        {triplet.map((item) => {
          if (!item) return null;

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
          const opacity = isFuture ? 0.3 : isPast ? 0.5 : interpolate(popIn, [0, 1], [0.3, 1]);

          // Text shadow for active word
          const activeTextShadow = isActive
            ? `
              -2px -2px 0 ${styles.pillBg},
              2px -2px 0 ${styles.pillBg},
              -2px 2px 0 ${styles.pillBg},
              2px 2px 0 ${styles.pillBg},
              4px 4px 0 ${styles.shadow}
            `
            : "none";

          return (
            <span
              key={`${activeCue.id}-${globalWordIndex}`}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: `${fontSize}px`,
                lineHeight: 1.2,
                letterSpacing: "0.08em",
                color: isActive ? highlight : text,
                transform: `scale(${isActive ? scale * 1.2 : scale})`,
                opacity,
                textShadow: activeTextShadow,
                display: "inline-block",
                padding: "0 0.5rem",
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
 * PixelCaptionSentence - Shows full sentence in pixel art style
 * Single line with current word highlighted
 */
export const PixelCaptionSentence: React.FC<PixelCaptionProps> = ({
  cues,
  className,
  fontSize = 28,
  highlightColor,
  textColor,
  position = "bottom",
  variant = "default",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;
  const styles = variantStyles[variant];

  const highlight = highlightColor ?? styles.highlight;
  const text = textColor ?? styles.text;

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

  const positionStyles =
    position === "center" ? "top-1/2 -translate-y-1/2" : "bottom-[10%]";

  const containerPop = spring({
    frame: frame - activeCue.startTime * fps,
    fps,
    config: { stiffness: 150, damping: 15 },
    durationInFrames: 20,
  });

  const borderWidth = 6;
  const shadowOffset = 10;

  const pixelBorder = `
    ${borderWidth}px 0 0 0 ${styles.border},
    -${borderWidth}px 0 0 0 ${styles.border},
    0 ${borderWidth}px 0 0 ${styles.border},
    0 -${borderWidth}px 0 0 ${styles.border},
    ${borderWidth}px ${borderWidth}px 0 0 ${styles.border},
    -${borderWidth}px ${borderWidth}px 0 0 ${styles.border},
    ${borderWidth}px -${borderWidth}px 0 0 ${styles.border},
    -${borderWidth}px -${borderWidth}px 0 0 ${styles.border},
    ${shadowOffset}px ${shadowOffset}px 0 0 ${styles.shadow}
  `;

  return (
    <div
      className={`absolute left-0 right-0 flex justify-center items-center px-8 ${positionStyles} ${className ?? ""}`}
    >
      <div
        style={{
          backgroundColor: styles.pillBg,
          boxShadow: pixelBorder,
          padding: "20px 40px",
          maxWidth: "90%",
          transform: `scale(${interpolate(containerPop, [0, 1], [0.9, 1])})`,
          opacity: interpolate(containerPop, [0, 1], [0, 1]),
        }}
      >
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: `${fontSize}px`,
            lineHeight: 1.8,
            letterSpacing: "0.05em",
            textAlign: "center",
            margin: 0,
          }}
        >
          {words.map((word, idx) => {
            const isActive = idx === currentWordIndex;
            const isPast = idx < currentWordIndex;

            return (
              <span
                key={`${activeCue.id}-${idx}`}
                style={{
                  color: isActive ? highlight : text,
                  opacity: isPast ? 0.6 : 1,
                  marginRight: idx < words.length - 1 ? "0.5em" : 0,
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};
