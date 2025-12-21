import { Series, useVideoConfig } from "remotion";
import { TitleSegment } from "./segments/TitleSegment";
import { VideoSegment } from "./segments/VideoSegment";
import { OutroSegment } from "./segments/OutroSegment";
import { getDurationInFrames } from "../../config";
import {
  TITLE_DURATION_SECONDS,
  VIDEO_DURATION_SECONDS,
  OUTRO_DURATION_SECONDS,
} from "./config";
import { createComposition } from "../../utils/createComposition";

const Diablo1StudyComposition: React.FC = () => {
  const { fps } = useVideoConfig();
  const titleDuration = getDurationInFrames(TITLE_DURATION_SECONDS, fps);
  const videoDuration = getDurationInFrames(VIDEO_DURATION_SECONDS, fps);
  const outroDuration = getDurationInFrames(OUTRO_DURATION_SECONDS, fps);

  return (
    <Series>
      <Series.Sequence durationInFrames={titleDuration}>
        <TitleSegment />
      </Series.Sequence>
      <Series.Sequence durationInFrames={videoDuration}>
        <VideoSegment />
      </Series.Sequence>
      <Series.Sequence durationInFrames={outroDuration}>
        <OutroSegment />
      </Series.Sequence>
    </Series>
  );
};

const TOTAL_DURATION_SECONDS =
  TITLE_DURATION_SECONDS + VIDEO_DURATION_SECONDS + OUTRO_DURATION_SECONDS;

export const Diablo1Study = createComposition({
  name: "Diablo1Study",
  component: Diablo1StudyComposition,
  durationInSeconds: TOTAL_DURATION_SECONDS,
  preset: "Square-1080p",
});
