import { AbsoluteFill, Img, interpolate, useCurrentFrame, random, staticFile } from "remotion";
import { z } from "zod";
import React, { useMemo } from "react";

export const text3DSchema = z.object({
  text: z.string(),
  fontSize: z.number().optional(),
  rotation: z.number().optional(),
  animate: z.boolean().optional(),
  dithering: z.boolean().optional(),
  className: z.string().optional(),
});

type Text3DProps = z.infer<typeof text3DSchema>;

// Cozy Forge brand colors for 3D text
const COLORS = {
  face: "#FDFBF7", // Near white
  faceGradient: "#E8E4DC", // Warm cream
  extrusionLeft: "#8ECAD4", // Teal 200 - left-facing surfaces
  extrusionMid: "#5A6878", // Steel Gray - transition
  extrusionBottom: "#3D4550", // Neutrals 600 - bottom-facing
  shadow: "#2A2520", // Deep ink
  outline: "#183E45", // Teal 700 for subtle outline
};

/**
 * WaltMakes 3D Text Component
 * Recreates the PixelOver 3D extruded text style with:
 * - White/cream face
 * - Teal left-side extrusion (like light hitting from right)
 * - Steel gray bottom extrusion
 * - Deep shadow
 * - Optional dithering pattern
 * - Per-letter perspective wobble
 */
export const Text3D: React.FC<Text3DProps> = ({
  text,
  fontSize = 120,
  rotation = -8,
  animate = true,
  dithering = true,
  className,
}) => {
  const frame = useCurrentFrame();

  // Animate entrance
  const opacity = animate
    ? interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 1;

  const translateY = animate
    ? interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" })
    : 0;

  // Extrusion depth scales with font size
  const depth = Math.round(fontSize * 0.1);

  // Build layered text-shadow for 3D effect
  const textShadow = useMemo(() => {
    const shadows: string[] = [];

    // 1. Teal left-side extrusion (light from right)
    for (let i = 1; i <= depth * 0.6; i++) {
      shadows.push(`${-i * 1.5}px ${i * 0.3}px 0 ${COLORS.extrusionLeft}`);
    }

    // 2. Main bottom-left extrusion (steel gray to dark)
    for (let i = 1; i <= depth; i++) {
      const ratio = i / depth;
      const color = ratio < 0.4 ? COLORS.extrusionMid : COLORS.extrusionBottom;
      shadows.push(`${-i}px ${i}px 0 ${color}`);
    }

    // 3. Deep shadow edge
    shadows.push(`${-depth - 2}px ${depth + 2}px 0 ${COLORS.shadow}`);
    shadows.push(`${-depth - 3}px ${depth + 3}px 0 ${COLORS.shadow}`);

    // 4. Soft ambient shadow
    shadows.push(
      `${-depth * 1.5}px ${depth * 1.5}px ${depth}px rgba(42, 37, 32, 0.35)`
    );

    return shadows.join(", ");
  }, [depth]);

  // Per-letter rotation for bouncy 3D perspective
  const letters = text.split("");
  const letterTransforms = useMemo(() => {
    return letters.map((_, i) => {
      // Wave pattern for natural variation
      const wave = Math.sin(i * 0.7 + 0.5) * 4;
      return {
        rotateY: wave,
        rotateX: -wave * 0.3,
        translateZ: Math.abs(wave) * 2,
      };
    });
  }, [letters]);

  // Deterministic filter ID
  const filterId = `dither-${random(text)}`;

  return (
    <AbsoluteFill
      className={`bg-[#FADAC8] flex items-center justify-center ${className ?? ""}`}
    >
      {/* SVG dithering filter */}
      {dithering && (
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
              {/* Halftone dot pattern */}
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.2"
                numOctaves="1"
                seed={42}
                result="noise"
              />
              <feComponentTransfer in="noise" result="dots">
                <feFuncR type="discrete" tableValues="0 0.5 1" />
                <feFuncG type="discrete" tableValues="0 0.5 1" />
                <feFuncB type="discrete" tableValues="0 0.5 1" />
                <feFuncA type="linear" slope="0.15" intercept="0.85" />
              </feComponentTransfer>
              <feBlend in="SourceGraphic" in2="dots" mode="multiply" />
            </filter>
          </defs>
        </svg>
      )}

      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
          perspective: "1200px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            filter: dithering ? `url(#${filterId})` : undefined,
            transformStyle: "preserve-3d",
          }}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: "'Inter', 'Arial Black', sans-serif",
                fontWeight: 900,
                color: COLORS.face,
                textShadow,
                letterSpacing: "-0.02em",
                display: "inline-block",
                transform: `
                  rotateY(${letterTransforms[i].rotateY}deg)
                  rotateX(${letterTransforms[i].rotateX}deg)
                  translateZ(${letterTransforms[i].translateZ}px)
                `,
                transformStyle: "preserve-3d",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Simple 3D Text without per-letter animation
 * Clean version for consistent text rendering
 */
export const Text3DSimple: React.FC<Text3DProps> = ({
  text,
  fontSize = 120,
  rotation = -8,
  animate = true,
  className,
}) => {
  const frame = useCurrentFrame();

  const opacity = animate
    ? interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 1;

  const translateY = animate
    ? interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" })
    : 0;

  const depth = Math.round(fontSize * 0.1);

  const textShadow = useMemo(() => {
    const shadows: string[] = [];

    // Teal left highlight
    for (let i = 1; i <= depth * 0.5; i++) {
      shadows.push(`${-i * 1.5}px ${i * 0.3}px 0 ${COLORS.extrusionLeft}`);
    }

    // Main extrusion
    for (let i = 1; i <= depth; i++) {
      const color = i / depth < 0.4 ? COLORS.extrusionMid : COLORS.extrusionBottom;
      shadows.push(`${-i}px ${i}px 0 ${color}`);
    }

    // Shadow
    shadows.push(`${-depth - 2}px ${depth + 2}px 0 ${COLORS.shadow}`);
    shadows.push(
      `${-depth * 1.5}px ${depth * 1.5}px ${depth}px rgba(42, 37, 32, 0.35)`
    );

    return shadows.join(", ");
  }, [depth]);

  return (
    <AbsoluteFill
      className={`bg-[#FADAC8] flex items-center justify-center ${className ?? ""}`}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
        }}
      >
        <span
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: "'Inter', 'Arial Black', sans-serif",
            fontWeight: 900,
            color: COLORS.face,
            textShadow,
            letterSpacing: "-0.02em",
          }}
        >
          {text}
        </span>
      </div>
    </AbsoluteFill>
  );
};

/**
 * WaltMakes Logo using pre-rendered PNG
 * Use this for the actual brand logo with proper 3D rendering
 */
export const waltMakesLogoSchema = z.object({
  variant: z.enum(["preview", "clean", "depth", "normal"]).optional(),
  scale: z.number().optional(),
  animate: z.boolean().optional(),
  className: z.string().optional(),
});

type WaltMakesLogoProps = z.infer<typeof waltMakesLogoSchema>;

const LOGO_VARIANTS = {
  preview: "logos/banner-twitter_export-profle-adusted_Preview.png",
  clean: "logos/banner-twitter_export-profle-adusted_No effects.png",
  depth: "logos/banner-twitter_export-profle-adusted_Depth buffer.png",
  normal: "logos/banner-twitter_export-profle-adusted_Normal buffer.png",
};

export const WaltMakesLogo: React.FC<WaltMakesLogoProps> = ({
  variant = "preview",
  scale = 1,
  animate = true,
  className,
}) => {
  const frame = useCurrentFrame();

  const opacity = animate
    ? interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 1;

  const translateY = animate
    ? interpolate(frame, [0, 25], [20, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill
      className={`bg-[#FADAC8] flex items-center justify-center ${className ?? ""}`}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        <Img
          src={staticFile(LOGO_VARIANTS[variant])}
          alt="WaltMakes"
          style={{
            maxWidth: "80%",
            height: "auto",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * Branded Title Slide using Text3D
 * Uses Hearth Orange background with 3D white text
 */
export const BrandedTitleSlide: React.FC<{
  title: string;
  subtitle?: string;
  useLogo?: boolean;
  className?: string;
}> = ({ title, subtitle, useLogo = false, className }) => {
  const frame = useCurrentFrame();

  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className={`bg-[#FADAC8] flex flex-col items-center justify-center gap-8 ${className ?? ""}`}
    >
      {useLogo && title === "WaltMakes" ? (
        <WaltMakesLogo scale={0.8} className="!bg-transparent" />
      ) : (
        <Text3D text={title} fontSize={100} className="!bg-transparent" />
      )}
      {subtitle && (
        <p
          style={{ opacity: subtitleOpacity }}
          className="text-4xl font-semibold text-fur-brown mt-4"
        >
          {subtitle}
        </p>
      )}
    </AbsoluteFill>
  );
};
