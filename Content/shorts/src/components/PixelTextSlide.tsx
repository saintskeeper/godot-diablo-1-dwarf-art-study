import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { zTextarea } from "@remotion/zod-types";

export const pixelTextSlideSchema = z.object({
  text: zTextarea(),
  title: z.string().optional(),
  className: z.string().optional(),
  variant: z.enum(["default", "alert", "success", "info"]).optional(),
  fontSize: z.enum(["sm", "md", "lg", "xl"]).optional(),
  animate: z.boolean().optional(),
});

type PixelTextSlideProps = z.infer<typeof pixelTextSlideSchema>;

const variantStyles = {
  default: {
    bg: "#F5EDE0", // parchment
    cardBg: "#E8DCC8", // horn-ivory
    border: "#2A2520", // deep-ink
    shadow: "#7A5040", // fur-brown
    text: "#2A2520", // deep-ink
    accent: "#3B8D9A", // viking-teal
  },
  alert: {
    bg: "#FDF0E8", // orange-50
    cardBg: "#FADAC8", // orange-100
    border: "#2A2520",
    shadow: "#E07040", // hearth-orange
    text: "#2A2520",
    accent: "#E07040",
  },
  success: {
    bg: "#E8F5EB", // green-50
    cardBg: "#C2E5CA", // green-100
    border: "#2A2520",
    shadow: "#3D7A4C", // forest-green
    text: "#2A2520",
    accent: "#3D7A4C",
  },
  info: {
    bg: "#E8F4F6", // teal-50
    cardBg: "#C5E4E9", // teal-100
    border: "#2A2520",
    shadow: "#3B8D9A", // viking-teal
    text: "#2A2520",
    accent: "#3B8D9A",
  },
};

// Larger sizes for video readability
const fontSizes = {
  sm: 28,
  md: 36,
  lg: 44,
  xl: 56,
};

export const PixelTextSlide: React.FC<PixelTextSlideProps> = ({
  text,
  title,
  className,
  variant = "default",
  fontSize = "lg",
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const styles = variantStyles[variant];

  // Fade in animation
  const opacity = animate
    ? interpolate(frame, [0, 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Subtle scale animation for retro feel
  const scale = animate
    ? interpolate(frame, [0, 15], [0.95, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Thicker pixel border for video (8px base)
  const borderWidth = 8;
  const shadowOffset = 16;

  return (
    <AbsoluteFill
      style={{ backgroundColor: styles.bg }}
      className={`flex items-center justify-center p-24 ${className ?? ""}`}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          width: "85%",
          maxWidth: 1400,
        }}
      >
        {/* Pixel art card container */}
        <div
          style={{
            backgroundColor: styles.cardBg,
            padding: "64px 80px",
            position: "relative",
            // Pixel border using box-shadow
            boxShadow: `
              ${borderWidth}px 0 0 0 ${styles.border},
              -${borderWidth}px 0 0 0 ${styles.border},
              0 ${borderWidth}px 0 0 ${styles.border},
              0 -${borderWidth}px 0 0 ${styles.border},
              ${borderWidth}px ${borderWidth}px 0 0 ${styles.border},
              -${borderWidth}px ${borderWidth}px 0 0 ${styles.border},
              ${borderWidth}px -${borderWidth}px 0 0 ${styles.border},
              -${borderWidth}px -${borderWidth}px 0 0 ${styles.border},
              ${shadowOffset}px ${shadowOffset}px 0 0 ${styles.shadow}
            `,
          }}
        >
          {/* Title with pixel font + text shadow */}
          {title && (
            <h1
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 48,
                lineHeight: 1.4,
                letterSpacing: "0.15em",
                color: styles.text,
                textAlign: "center",
                marginBottom: 40,
                textShadow: `
                  -3px -3px 0 ${styles.border},
                  3px -3px 0 ${styles.border},
                  -3px 3px 0 ${styles.border},
                  3px 3px 0 ${styles.border},
                  6px 6px 0 ${styles.accent}
                `,
                WebkitTextStroke: `1px ${styles.border}`,
              }}
            >
              {title}
            </h1>
          )}

          {/* Body text - more readable with better spacing */}
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: fontSizes[fontSize],
              lineHeight: 2.2,
              color: styles.text,
              textAlign: "center",
              letterSpacing: "0.05em",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
