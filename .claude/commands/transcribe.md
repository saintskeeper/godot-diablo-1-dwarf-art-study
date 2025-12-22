# Transcribe Video/Audio to SRT

Generate high-accuracy SRT subtitle files from video or audio using Whisper.

## Arguments
- `$ARGUMENTS` - Path to video/audio file (required)

## Instructions

1. **Validate input:**
   - Check if the file path exists
   - If no path provided, ask user for the file path
   - Supported formats: mp4, mov, webm, mkv, mp3, wav, m4a, flac

2. **Run transcription:**
   - Use the transcribe tool at `Content/src-generator/transcribe.py`
   - Activate venv: `source Content/src-generator/venv/bin/activate`
   - Run: `python Content/src-generator/transcribe.py "<file_path>"`
   - On Apple Silicon, this uses mlx-whisper with GPU acceleration
   - Default model: `large-v3-turbo` (fast + accurate)

3. **Optional flags:**
   - `-l en` - Force English (faster)
   - `-m <model>` - Change model (tiny, small, medium, large-v3)
   - `-w` - Word-level timestamps
   - `-o <path>` - Custom output path
   - `--cpu` - Force CPU mode

4. **Report results:**
   - SRT file location
   - Duration and segment count
   - Detected language

## Examples

Basic transcription:
```
/transcribe Content/shorts/examples/video.mp4
```

Force English:
```
/transcribe Content/shorts/examples/video.mp4 -l en
```

## Models (M1/M2/M3)

| Model | Speed | Accuracy |
|-------|-------|----------|
| large-v3-turbo | Fast | Best (default) |
| large-v3 | Slow | Best |
| medium | Fast | Good |
| small | Fastest | OK |

## Output

SRT file saved next to input file (same name, .srt extension).
