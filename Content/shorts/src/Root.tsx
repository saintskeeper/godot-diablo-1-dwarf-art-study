import "./index.css";
import { Composition, Folder } from "remotion";
import { TitleSlide, titleSlideSchema } from "./components/TitleSlide";
import { ContentSlide, contentSlideSchema } from "./components/ContentSlide";
import { VideoSlide, videoSlideSchema } from "./components/VideoSlide";
import { Code, codeSchema } from "./components/Code";
import { CodeSlide, codeSlideSchema } from "./components/CodeSlide";
import { AsciiPlayer, asciiPlayerSchema } from "./components/AsciiPlayer";
import { Screenshot, screenshotSchema } from "./components/Screenshot";
import { DiagramSlide, diagramSlideSchema } from "./components/DiagramSlide";
import { Music, musicSchema } from "./components/Music";
import { ZoomableVideo, zoomableVideoSchema } from "./components/ZoomableVideo";
import { Text3D, text3DSchema, WaltMakesLogo, waltMakesLogoSchema } from "./components/Text3D";
import { SentenceCaption, sentenceCaptionSchema } from "./components/SentenceCaption";
import { PixelTextSlide, pixelTextSlideSchema } from "./components/PixelTextSlide";
import { PixelCaptionPill, PixelCaptionSentence, pixelCaptionSchema } from "./components/PixelCaption";
import {
  Example1Landscape,
  Example1Square,
} from "./compositions/example1/Composition";
import { Example2Square } from "./compositions/example2/Composition";
import { MyVideo } from "./compositions/my-video/Composition";
import { Week1220 } from "./compositions/week-12-20/Composition";
import { Diablo1Study } from "./compositions/diablo-1-study/Composition";
import { TranscriptScrollExample, TranscriptPillExample, TranscriptSentenceExample, TranscriptPillOverlay } from "./compositions/transcript-scroll-example/Composition";
import { WaltmakesIntro } from "./compositions/waltmakes-intro/Composition";
import { VIDEO_CONFIG, getDurationInFrames } from "./config";
import {
  sampleTypeScript,
  sampleHighlightedTypeScript,
  sampleD2Diagram,
} from "./content";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Compositions - use /new-composition to create your own */}
      <Folder name="Compositions">
        <Folder name="WaltmakesIntro">
          <WaltmakesIntro />
        </Folder>

        <Folder name="TranscriptScrollExample">
          <TranscriptScrollExample />
          <TranscriptPillExample />
          <TranscriptSentenceExample />
          <TranscriptPillOverlay />
        </Folder>

        <Folder name="Diablo1Study">
          <Diablo1Study />
        </Folder>

        <Folder name="Week-12-20">
          <Week1220 />
        </Folder>

        <Folder name="MyVideo">
          <MyVideo />
        </Folder>

        {/* Example compositions for reference */}
        <Folder name="Examples">
          <Folder name="Example1">
            <Example1Landscape />
            <Example1Square />
          </Folder>

          <Folder name="Example2">
            <Example2Square />
          </Folder>
        </Folder>
      </Folder>

      <Folder name="Components">
        <Composition
          id="TitleSlide"
          component={TitleSlide}
          durationInFrames={getDurationInFrames(1, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={titleSlideSchema}
          defaultProps={{
            title: "Example Title",
          }}
        />
        <Composition
          id="ContentSlide"
          component={ContentSlide}
          durationInFrames={getDurationInFrames(1, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={contentSlideSchema}
          defaultProps={{
            header: "Example Header",
            content: "Example Content",
          }}
        />
        <Composition
          id="VideoSlide"
          component={VideoSlide}
          durationInFrames={getDurationInFrames(7, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={videoSlideSchema}
          defaultProps={{
            filename: "videos/robot_nature.mp4",
            startTime: 0,
          }}
        />
        <Composition
          id="Code"
          component={Code}
          durationInFrames={getDurationInFrames(5, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={codeSchema}
          defaultProps={{
            code: sampleTypeScript,
            language: "typescript",
          }}
        />
        <Composition
          id="CodeSlide"
          component={CodeSlide}
          durationInFrames={getDurationInFrames(10, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={codeSlideSchema}
          defaultProps={{
            title: "Animated Line Highlights",
            code: sampleHighlightedTypeScript,
            language: "typescript",
            animatedHighlights: [
              { timeInSeconds: 0, lines: "1-5" },
              { timeInSeconds: 2, lines: "7-10" },
              { timeInSeconds: 4, lines: "12-19" },
            ],
          }}
        />
        <Composition
          id="AsciiPlayer"
          component={AsciiPlayer}
          durationInFrames={getDurationInFrames(10, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={asciiPlayerSchema}
          defaultProps={{
            mode: "animated" as const,
            castFile: "casts/sample.cast",
            playbackSpeed: 1,
            startTime: 0,
            theme: "nord" as const,
          }}
        />
        <Composition
          id="Screenshot"
          component={Screenshot}
          durationInFrames={getDurationInFrames(10, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={screenshotSchema}
          defaultProps={{
            src: "images/sample-screenshot.png",
            scrollSpeed: 100,
          }}
        />
        <Composition
          id="DiagramSlide"
          component={DiagramSlide}
          durationInFrames={getDurationInFrames(5, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={diagramSlideSchema}
          defaultProps={{
            title: "System Architecture",
            type: "d2" as const,
            diagram: sampleD2Diagram,
            sketch: false,
          }}
        />
        <Composition
          id="Music"
          component={Music}
          durationInFrames={getDurationInFrames(10, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={musicSchema}
          defaultProps={{
            src: "audio/sample-music.mp3",
            volume: 0.5,
            fadeInSeconds: 1,
            fadeOutSeconds: 2,
          }}
        />
        <Composition
          id="ZoomableVideo"
          component={ZoomableVideo}
          durationInFrames={getDurationInFrames(10, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={zoomableVideoSchema}
          defaultProps={{
            src: "videos/robot_nature.mp4",
            zoomSegments: [
              { startTime: 0, endTime: 3, zoomStart: 1, zoomEnd: 1.1 },
              { startTime: 5, endTime: 8, zoomStart: 1.1, zoomEnd: 1 },
            ],
          }}
        />
        <Composition
          id="Text3D"
          component={Text3D}
          durationInFrames={getDurationInFrames(3, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={text3DSchema}
          defaultProps={{
            text: "WaltMakes",
            fontSize: 100,
            rotation: -8,
            animate: true,
            dithering: true,
          }}
        />
        <Composition
          id="WaltMakesLogo"
          component={WaltMakesLogo}
          durationInFrames={getDurationInFrames(3, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={waltMakesLogoSchema}
          defaultProps={{
            variant: "preview" as const,
            scale: 1,
            animate: true,
          }}
        />
        <Composition
          id="SentenceCaption"
          component={SentenceCaption}
          durationInFrames={getDurationInFrames(10, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={sentenceCaptionSchema}
          defaultProps={{
            cues: [
              { id: 1, startTime: 0, endTime: 3, text: "This is the first sentence displayed in the caption." },
              { id: 2, startTime: 3, endTime: 6, text: "Now showing the second sentence with a simple cut." },
              { id: 3, startTime: 6, endTime: 10, text: "And here's the final sentence in the frosted pill." },
            ],
            fontSize: 48,
            position: "bottom" as const,
          }}
        />
        <Composition
          id="PixelTextSlide"
          component={PixelTextSlide}
          durationInFrames={getDurationInFrames(3, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={pixelTextSlideSchema}
          defaultProps={{
            text: "Welcome to the pixel zone!",
            title: "PIXEL TEXT",
            variant: "default" as const,
            fontSize: "lg" as const,
            animate: true,
          }}
        />
        <Composition
          id="PixelCaptionPill"
          component={PixelCaptionPill}
          durationInFrames={getDurationInFrames(10, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={pixelCaptionSchema}
          defaultProps={{
            cues: [
              { id: 1, startTime: 0, endTime: 4, text: "Welcome to the pixel zone!" },
              { id: 2, startTime: 4, endTime: 8, text: "This is retro gaming vibes." },
              { id: 3, startTime: 8, endTime: 10, text: "Let's go!" },
            ],
            fontSize: 32,
            position: "bottom" as const,
            variant: "default" as const,
          }}
        />
        <Composition
          id="PixelCaptionSentence"
          component={PixelCaptionSentence}
          durationInFrames={getDurationInFrames(10, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={pixelCaptionSchema}
          defaultProps={{
            cues: [
              { id: 1, startTime: 0, endTime: 4, text: "Welcome to the pixel zone!" },
              { id: 2, startTime: 4, endTime: 8, text: "Full sentence captions rock." },
              { id: 3, startTime: 8, endTime: 10, text: "Game on!" },
            ],
            fontSize: 28,
            position: "bottom" as const,
            variant: "default" as const,
          }}
        />
      </Folder>
    </>
  );
};
