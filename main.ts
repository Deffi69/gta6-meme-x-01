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
// Before copying anything it validates the inputs, so a broken or mis-typed
// POST.json fails here with a plain-English message instead of reaching the gate
// as a post the house cannot read: POST.json must parse as an object with a "url"
// string shaped like https://x.com/<handle>/status/<digits>, and meme.png must
// exist. Valid inputs behave exactly as before — byte-identical outputs.
//
// Run it locally like this (POST.json must exist first — it is added once the
// post is up on X):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here: string = dirname(fileURLToPath(import.meta.url));
const botDir: string = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const POST_URL_PATTERN = /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/;

function fail(message: string): never {
  console.error(`Error: ${message}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

// POST.json is what the gate reads: {"url": "https://x.com/<handle>/status/<id>"}.
// It is added to this repository once the meme is posted on X; without it the
// entry names no post, so a missing file is a hard failure, not a silent skip.
// Its contents are checked before copying: the house can only read a real X post
// address, so a mistyped or empty url fails here with a clear message.
const postPath = join(botDir, 'POST.json');
let postText: string;
try {
  postText = readFileSync(postPath, 'utf8');
} catch (err) {
  fail(`POST.json could not be read from ${botDir}: ${(err as Error).message}`);
}

let postData: unknown;
try {
  postData = JSON.parse(postText);
} catch {
  fail('POST.json is not valid JSON — it must be {"url": "https://x.com/<handle>/status/<id>"}');
}

if (
  typeof postData !== 'object' ||
  postData === null ||
  !('url' in postData) ||
  typeof (postData as { url: unknown }).url !== 'string' ||
  !POST_URL_PATTERN.test((postData as { url: string }).url)
) {
  fail(
    'POST.json must be {"url": "https://x.com/<handle>/status/<digits>"} — ' +
      `got ${JSON.stringify(postData)}`
  );
}

try {
  copyFileSync(postPath, join(outDir, 'POST.json'));
} catch (err) {
  fail(`POST.json could not be copied from ${botDir}: ${(err as Error).message}`);
}

// The finished meme picture, copied along so the run's output carries it too.
// It must exist; a missing picture is a hard failure, not a silent skip.
const memePath = join(here, 'meme.png');
if (!existsSync(memePath)) {
  fail(`meme.png is missing from ${here} — the finished artwork must be in the repository`);
}
copyFileSync(memePath, join(outDir, 'meme.png'));

console.log(`POST.json and meme.png placed in ${outDir}`);
