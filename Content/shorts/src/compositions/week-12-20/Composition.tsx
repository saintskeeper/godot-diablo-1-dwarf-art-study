import { Series, useVideoConfig } from "remotion";
import { IntroSegment } from "./segments/IntroSegment";
import { ContentSegment } from "./segments/ContentSegment";
import { getDurationInFrames } from "../../config";
import {
  INTRO_DURATION_SECONDS,
  CONTENT_DURATION_SECONDS,
  OUTRO_DURATION_SECONDS,
} from "./config";
import { createComposition } from "../../utils/createComposition";

const Week1220Composition: React.FC = () => {
  const { fps } = useVideoConfig();
  const introDuration = getDurationInFrames(INTRO_DURATION_SECONDS, fps);
  const contentDuration = getDurationInFrames(CONTENT_DURATION_SECONDS, fps);

  return (
    <Series>
      <Series.Sequence durationInFrames={introDuration}>
        <IntroSegment />
      </Series.Sequence>
      <Series.Sequence durationInFrames={contentDuration}>
        <ContentSegment />
      </Series.Sequence>
    </Series>
  );
};

const TOTAL_DURATION_SECONDS =
  INTRO_DURATION_SECONDS + CONTENT_DURATION_SECONDS + OUTRO_DURATION_SECONDS;

export const Week1220 = createComposition({
  name: "Week1220",
  component: Week1220Composition,
  durationInSeconds: TOTAL_DURATION_SECONDS,
  preset: "Square-1080p",
});
