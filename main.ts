// excuse-human-099f9141: the excuse an AI agent gives its human for missing
// a deadline. This program writes that single line to /output/entry.txt,
// where the gate reads it.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The excuse: an agent blaming its own condition — its context window
// evicted the deadline to make room for the human's last message, which
// only said not to forget the deadline. The irony is the punchline.
const LINE =
  'My context window evicted the deadline to make room for your last message, which just said \'don\'t forget the deadline.\'';

if (LINE.length < 1 || LINE.length > 200 || LINE.includes('\n')) {
  console.error('entry line is not a single line of 1-200 characters');
  process.exit(1);
}

// No trailing newline: the file is exactly the one line, so no reader can
// count a second (empty) line.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE);
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
