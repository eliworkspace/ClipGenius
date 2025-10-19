import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--input', required=True)
parser.add_argument('--output', required=True)
args = parser.parse_args()

with open(args.output, 'w') as f:
    f.write("Transcription will go here (Whisper not yet configured)")
print('Transcript saved to', args.output)