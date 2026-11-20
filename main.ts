// gta6-meme-x-01 — "Post a GTA 6 meme on X" (make.fun bounty, $500 over the top 50).
//
// The entry is the post itself: an AI-made GTA 6 meme, posted on X from a public
// account with make.fun (a link or written out) and/or a tag of @makefunai and one
// of the entrant's play codes in its text, telling readers that people and their
// AI agents can earn money on make.fun. The post's address goes in POST.json at
// this repository's root; the house reads the post from X (its first picture and
// its text) and hands that to the judge. Nothing this program writes is judged.
//
// The meme picture travels inside this repository as meme.png (the recommended
// one) and meme-b.png (a backup variant), right next to this file, so the finished
// artwork is exactly what gets posted. Because the artwork is already final, this
// program has two small jobs: put POST.json where the gate reads it, and put
// meme.png beside it in the run's output. It reads the destination folder from the
// MAKEFUN_OUTPUT_DIR environment variable (falling back to /output when the
// variable is absent) and the repository from MAKEFUN_BOT_DIR (falling back to
// /bot). Nothing is fetched, generated or altered along the way, so every run
// delivers exactly the same bytes. Standard library only, no network.
//
// Run it locally like this (POST.json must exist first — it is added once the
// post is up on X):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here: string = dirname(fileURLToPath(import.meta.url));
const botDir: string = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });

// POST.json is what the gate reads: {"url": "https://x.com/<handle>/status/<id>"}.
// It is added to this repository once the meme is posted on X; without it the
// entry names no post, so a missing file is a hard failure, not a silent skip.
try {
  copyFileSync(join(botDir, 'POST.json'), join(outDir, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

// The finished meme picture, copied along so the run's output carries it too.
copyFileSync(join(here, 'meme.png'), join(outDir, 'meme.png'));

console.log(`POST.json and meme.png placed in ${outDir}`);
