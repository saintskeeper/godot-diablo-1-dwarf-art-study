import { ContentSlide } from "../../../components/ContentSlide";
import { CONTENT } from "../content";

export const ContentSegment: React.FC = () => {
  return (
    <ContentSlide
      header={CONTENT.subtitle}
      content={CONTENT.body}
    />
  );
};
