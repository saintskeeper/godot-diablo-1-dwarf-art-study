#!/usr/bin/env python3
"""
Simple CLI tool for generating high-accuracy SRT files from video/audio.
Uses mlx-whisper (M1 optimized) or stable-ts as fallback.
"""

import argparse
import platform
import sys
from pathlib import Path


def format_timestamp(seconds: float) -> str:
    """Convert seconds to SRT timestamp format (HH:MM:SS,mmm)."""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"


def write_srt(segments: list, output_path: Path):
    """Write segments to SRT file."""
    with open(output_path, "w", encoding="utf-8") as f:
        for i, seg in enumerate(segments, 1):
            start = seg["start"]
            end = seg["end"]
            text = seg["text"].strip()
            f.write(f"{i}\n")
            f.write(f"{format_timestamp(start)} --> {format_timestamp(end)}\n")
            f.write(f"{text}\n\n")


# Model mappings for mlx-whisper (HuggingFace repos)
MLX_MODELS = {
    "tiny": "mlx-community/whisper-tiny",
    "tiny.en": "mlx-community/whisper-tiny.en",
    "base": "mlx-community/whisper-base",
    "base.en": "mlx-community/whisper-base.en",
    "small": "mlx-community/whisper-small",
    "small.en": "mlx-community/whisper-small.en",
    "medium": "mlx-community/whisper-medium",
    "medium.en": "mlx-community/whisper-medium.en",
    "large": "mlx-community/whisper-large-v3",
    "large-v2": "mlx-community/whisper-large-v2-mlx",
    "large-v3": "mlx-community/whisper-large-v3",
    "large-v3-turbo": "mlx-community/whisper-large-v3-turbo",
}


def transcribe_mlx(
    input_file: str,
    output_file: str | None = None,
    model_size: str = "large-v3-turbo",
    language: str | None = None,
    word_timestamps: bool = False,
):
    """Transcribe using mlx-whisper (M1 optimized)."""
    import mlx_whisper

    input_path = Path(input_file)
    output_path = Path(output_file) if output_file else input_path.with_suffix(".srt")

    model_repo = MLX_MODELS.get(model_size, model_size)
    print(f"Loading MLX Whisper model '{model_size}'...")

    print(f"Transcribing: {input_path.name}")

    decode_options = {}
    if language:
        decode_options["language"] = language

    result = mlx_whisper.transcribe(
        str(input_path),
        path_or_hf_repo=model_repo,
        word_timestamps=word_timestamps,
        verbose=False,
        **decode_options,
    )

    segments = result.get("segments", [])
    detected_lang = result.get("language", "unknown")
    print(f"Detected language: {detected_lang}")

    write_srt(segments, output_path)

    print(f"SRT saved: {output_path}")
    if segments:
        duration = segments[-1]["end"]
        print(f"Duration: {duration:.1f}s | Segments: {len(segments)}")

    return output_path


def transcribe_cpu(
    input_file: str,
    output_file: str | None = None,
    model_size: str = "medium",
    language: str | None = None,
):
    """Transcribe using stable-ts on CPU (fallback for non-Apple Silicon)."""
    import stable_whisper

    input_path = Path(input_file)
    output_path = Path(output_file) if output_file else input_path.with_suffix(".srt")

    print(f"Loading Whisper model '{model_size}' on CPU...")
    model = stable_whisper.load_model(model_size, device="cpu")

    print(f"Transcribing: {input_path.name}")
    transcribe_kwargs = {"language": language} if language else {}
    result = model.transcribe(str(input_path), **transcribe_kwargs)

    result.to_srt_vtt(str(output_path), word_level=False)

    print(f"SRT saved: {output_path}")
    segments = list(result.segments)
    if segments:
        print(f"Duration: {segments[-1].end:.1f}s | Segments: {len(segments)}")

    return output_path


def main():
    is_apple_silicon = platform.system() == "Darwin" and platform.machine() == "arm64"

    parser = argparse.ArgumentParser(
        description="Generate high-accuracy SRT files from video/audio using Whisper",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s video.mp4                    # Basic transcription
  %(prog)s video.mp4 -o subtitles.srt   # Custom output path
  %(prog)s video.mp4 -m large-v3        # Use large-v3 model
  %(prog)s video.mp4 -l en              # Force English language
  %(prog)s video.mp4 -w                 # Word-level timestamps
  %(prog)s video.mp4 --cpu              # Force CPU mode

MLX Models (M1/M2/M3 - uses Apple GPU):
  large-v3-turbo - Fast + accurate [default]
  large-v3       - Best accuracy
  medium         - Good balance
  small, base    - Faster, less accurate
  *.en variants  - English-only (faster)

CPU Models (fallback):
  medium - Good accuracy [default]
  large  - Best accuracy
  small  - Faster
        """,
    )

    parser.add_argument("input", help="Input video or audio file")
    parser.add_argument("-o", "--output", help="Output SRT file path")
    parser.add_argument(
        "-m", "--model",
        default="large-v3-turbo" if is_apple_silicon else "medium",
        help="Whisper model (default: large-v3-turbo for M1, medium for CPU)",
    )
    parser.add_argument("-l", "--language", help="Language code (e.g., 'en', 'es')")
    parser.add_argument(
        "-w", "--word-timestamps",
        action="store_true",
        help="Use word-level timestamps for finer granularity",
    )
    parser.add_argument(
        "--cpu",
        action="store_true",
        help="Force CPU mode using stable-ts (slower but compatible)",
    )

    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.exists():
        print(f"Error: File not found: {args.input}", file=sys.stderr)
        sys.exit(1)

    if args.cpu or not is_apple_silicon:
        if not is_apple_silicon and not args.cpu:
            print("Note: Not on Apple Silicon, using CPU mode (stable-ts)")
        transcribe_cpu(
            input_file=args.input,
            output_file=args.output,
            model_size=args.model,
            language=args.language,
        )
    else:
        transcribe_mlx(
            input_file=args.input,
            output_file=args.output,
            model_size=args.model,
            language=args.language,
            word_timestamps=args.word_timestamps,
        )


if __name__ == "__main__":
    main()
