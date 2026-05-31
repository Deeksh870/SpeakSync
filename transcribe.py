from faster_whisper import WhisperModel
import sys

audio_file = sys.argv[1]

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

segments, info = model.transcribe(audio_file)

result = ""

for segment in segments:
    result += segment.text + " "

print(result)