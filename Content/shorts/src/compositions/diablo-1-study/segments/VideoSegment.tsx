import { VideoSlide } from "../../../components/VideoSlide";
import { CONTENT } from "../content";

export const VideoSegment: React.FC = () => {
  return <VideoSlide filename={CONTENT.videoFile} />;
};
