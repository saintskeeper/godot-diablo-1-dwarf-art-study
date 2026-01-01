#!/usr/bin/env python3
"""
Audio Processor for AirPods Recordings
AI-powered speech enhancement using Resemble Enhance or DeepFilterNet3.
"""

import argparse
import subprocess
import tempfile
from pathlib import Path

import torch
import torchaudio


def convert_to_wav_mono(input_path: Path, output_path: Path, sr: int = 44100) -> None:
    """Convert any audio format to mono WAV using ffmpeg."""
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(input_path), "-ac", "1", "-ar", str(sr), str(output_path)],
        capture_output=True,
        check=True,
    )


def process_resemble(
    input_path: Path,
    output_path: Path,
    denoise_only: bool = False,
    nfe: int = 32,
    tau: float = 0.5,
) -> None:
    """Process with Resemble Enhance (two-stage: denoise + CFM enhance)."""
    from resemble_enhance.enhancer.inference import denoise, enhance

    print(f"Processing: {input_path.name}")

    # Convert to mono WAV at 44.1kHz (Resemble's native rate)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp_path = Path(tmp.name)
    convert_to_wav_mono(input_path, tmp_path, sr=44100)

    # Load audio
    audio, sr = torchaudio.load(tmp_path)
    audio_mono = audio.mean(dim=0) if audio.dim() > 1 else audio
    print(f"  Loaded: {len(audio_mono)/sr:.1f}s @ {sr}Hz")

    # MPS has compatibility issues with Resemble, use CPU
    device = "cpu"
    print(f"  Device: {device}")

    if denoise_only:
        print("  Running Resemble denoise...")
        output, new_sr = denoise(audio_mono, sr, device)
    else:
        print(f"  Running Resemble full enhance (nfe={nfe}, tau={tau})...")
        output, new_sr = enhance(audio_mono, sr, device, nfe=nfe, solver="midpoint", tau=tau)

    # Save
    torchaudio.save(str(output_path), output.unsqueeze(0), new_sr)
    print(f"  Saved: {output_path.name}")

    # Cleanup
    tmp_path.unlink()


def process_deepfilter(
    input_path: Path,
    output_path: Path,
    atten_lim_db: int = 6,
) -> None:
    """Process with DeepFilterNet3 (fast, lightweight)."""
    from df.enhance import enhance, init_df, load_audio
    import soundfile as sf
    import numpy as np

    print(f"Processing: {input_path.name}")

    # Initialize model
    model, df_state, _ = init_df()

    # Convert to WAV at 48kHz (DeepFilterNet's native rate)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp_path = Path(tmp.name)
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(input_path), "-ar", "48000", str(tmp_path)],
        capture_output=True,
        check=True,
    )

    # Load and process
    audio, _ = load_audio(tmp_path, sr=df_state.sr())
    print(f"  Loaded: {audio.shape[-1]/df_state.sr():.1f}s @ {df_state.sr()}Hz")
    print(f"  Running DeepFilterNet3 (atten_lim={atten_lim_db}dB)...")

    enhanced = enhance(model, df_state, audio, pad=True, atten_lim_db=atten_lim_db)
    enhanced_np = enhanced.squeeze().numpy()
    if enhanced_np.ndim == 2:
        enhanced_np = enhanced_np.T

    # Save
    output_path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(output_path), enhanced_np, df_state.sr())
    print(f"  Saved: {output_path.name}")

    # Cleanup
    tmp_path.unlink()


def main():
    parser = argparse.ArgumentParser(
        description="AI-powered speech enhancement for AirPods recordings"
    )
    parser.add_argument("input", type=Path, help="Input audio file or directory")
    parser.add_argument("-o", "--output", type=Path, help="Output file or directory")
    parser.add_argument(
        "--fast", action="store_true",
        help="Use DeepFilterNet3 (faster, ~1s for 15s audio) instead of Resemble"
    )
    parser.add_argument(
        "--denoise-only", action="store_true",
        help="Resemble: only denoise, skip enhancement stage"
    )
    parser.add_argument(
        "--nfe", type=int, default=32,
        help="Resemble: CFM steps, higher=better quality but slower (default: 32)"
    )
    parser.add_argument(
        "--tau", type=float, default=0.5,
        help="Resemble: prior temperature 0-1, lower=more conservative (default: 0.5)"
    )
    parser.add_argument(
        "--atten", type=int, default=6,
        help="DeepFilterNet: attenuation limit in dB (default: 6)"
    )
    args = parser.parse_args()

    input_path = args.input.resolve()

    if input_path.is_file():
        # Single file
        if args.output:
            output_path = args.output.resolve()
        else:
            suffix = "_df" if args.fast else "_enhanced"
            output_path = input_path.parent / f"{input_path.stem}{suffix}.wav"

        if args.fast:
            process_deepfilter(input_path, output_path, args.atten)
        else:
            process_resemble(input_path, output_path, args.denoise_only, args.nfe, args.tau)

    elif input_path.is_dir():
        # Batch process directory
        output_dir = args.output.resolve() if args.output else input_path / "enhanced"
        output_dir.mkdir(exist_ok=True)

        extensions = ["*.wav", "*.m4a", "*.mp3", "*.aac", "*.aiff", "*.flac"]
        audio_files = []
        for ext in extensions:
            audio_files.extend(input_path.glob(ext))

        for audio_file in audio_files:
            suffix = "_df" if args.fast else "_enhanced"
            output_path = output_dir / f"{audio_file.stem}{suffix}.wav"
            try:
                if args.fast:
                    process_deepfilter(audio_file, output_path, args.atten)
                else:
                    process_resemble(audio_file, output_path, args.denoise_only, args.nfe, args.tau)
            except Exception as e:
                print(f"  Error: {e}")

        print(f"\nProcessed {len(audio_files)} files -> {output_dir}")
    else:
        print(f"Error: {input_path} not found")
        return 1

    return 0


if __name__ == "__main__":
    exit(main())
