import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { zTextarea } from "@remotion/zod-types";

export const contentSlideSchema = z.object({
  header: z.string(),
  content: zTextarea(),
  className: z.string().optional(),
});

type ContentSlideProps = z.infer<typeof contentSlideSchema>;

export const ContentSlide: React.FC<ContentSlideProps> = ({
  header,
  content,
  className,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className={`bg-parchment flex flex-col items-start justify-start px-32 pt-24 ${className ?? ""}`}>
      <div
        className="w-full"
        style={{
          opacity,
        }}
      >
        <h1 className="text-6xl font-bold text-deep-ink mb-12">{header}</h1>
        <p className="text-4xl text-fur-brown leading-relaxed">{content}</p>
      </div>
    </AbsoluteFill>
  );
};
