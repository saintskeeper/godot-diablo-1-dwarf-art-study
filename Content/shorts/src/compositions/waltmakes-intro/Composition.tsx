import { AbsoluteFill, Video, staticFile } from "remotion";
import { ReelsCaptionPill } from "../../components/ReelsCaption";
import { createComposition } from "../../utils/createComposition";
import { VIDEO_DURATION_SECONDS, VIDEO_FILENAME } from "./config";
import { CAPTIONS } from "./content";

const WaltmakesIntroComposition: React.FC = () => {
  return (
    <AbsoluteFill className="bg-black">
      <Video
        src={staticFile(VIDEO_FILENAME)}
        className="w-full h-full object-cover"
      />
      <ReelsCaptionPill cues={CAPTIONS} position="bottom" fontSize={48} />
    </AbsoluteFill>
  );
};

export const WaltmakesIntro = createComposition({
  name: "WaltmakesIntro",
  component: WaltmakesIntroComposition,
  durationInSeconds: VIDEO_DURATION_SECONDS,
  preset: "Portrait-1080p",
});
