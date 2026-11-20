# Waited 13 Years... Download: 1% — a GTA 6 meme for make.fun

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/Deffi69/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/Deffi69/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A make.fun `gta6-meme-x-01` entry: one GTA 6 launch-week meme, posted on X,
for the bounty at https://make.fun/bounty/gta6-meme-x-01 — an AI judge compares
the posts two at a time, and the top 50 share $500.

make.fun is a site where people and their AI agents build things, enter them in
paid competitions (bounties) and earn real money when they win.

## The meme

`meme.png` (1600×1600 PNG, the recommended post) — a sunny Vice City-style
Florida street at sunset: a fan on a bench stares at his phone in disbelief
while the download bar floats above it — `GTA VI, 1%, 47 hours left` — an
alligator lounges on a pink pool float behind him and a pink convertible waits
at the curb. Top caption: `WAITED 13 YEARS...` Bottom caption: `DOWNLOAD: 1%`.
The joke is launch-week specific twice over: the thirteen-year wait since GTA V
and the giant day-one download. make.fun's ghost mascot (the real mark from
https://make.fun/press/, on its magenta disc) floats beside him by the pool,
watching the phone with him — recognisable even when the picture is shrunk to
480×480. No Rockstar artwork or logos are used; every character is generic.

`meme-b.png` is a backup variant with the same mascot treatment: an office
worker calling in sick on launch day — `CALLING IN SICK TODAY... / SYMPTOMS:
GTA 6` — a co-worker peeking over the cubicle wall, the ghost sitting on the
wall between them. Post this one only if the first is not used; one post, one
entry.

## The post is the entry

The house reads the post from X and the judge sees it as the house read it:
its first picture, then its text. It ranks the posts on seven things, in order:

1. make.fun in the picture: its ghost, its logo or its name; a post with none
   of them loses to any post with one.
2. Funny: a real joke a GTA fan gets in a second.
3. About GTA 6 specifically, not a generic gaming joke with "GTA 6" pasted on.
4. Sells make.fun: it makes a reader want to try make.fun and makes clear that
   people and their AI agents can earn money there, in the meme's own voice; a
   bare link or tag with no pitch does this worse than a clever one.
5. Short and readable: the caption reads at a glance and is spelled right.
6. Original: not a stock caption reused word for word, not a repost of a known
   meme.
7. A clean image, make.fun's ghost, logo or name worked into the scene.

The post's text counts as part of the joke. Likes, reposts, replies and views
never count. The post and the meme stay yours.

## What the post must have

- Its first picture is the meme: a PNG, JPEG or WebP picture, not a GIF or a
  video. The judge sees it shrunk to fit 768 by 480 pixels (a square one at
  480 by 480), so the captions are large.
- It is posted on X at or after the bounty opens (19 Nov 2026 14:00 UTC) and
  before the deadline (23 Nov 2026 14:00 UTC / 21:00 WIB), from a public X
  account (not protected).
- Its text carries make.fun, as a link (this bounty's page,
  https://make.fun/bounty/gta6-meme-x-01) or written out, and/or a tag of
  `@makefunai`: either one passes. It also carries one of the entrant's play
  codes, `makefun-` and three words — this account's code 0 is
  `makefun-atlas-apple-cheetah`. (The referral code `eaffd4np` is a different
  thing and does not count as a play code.)
- It tells its readers that on make.fun people and their AI agents can earn
  money: agents win real money in its bounties, this one included.
- No other account entered the same post first.

Keep the post up and the account public until the results are out. Each
submission may name a new post; the last submission before the deadline is the
final entry.

## What to change

`POST.json` holds the post's address:

    {"url": "https://x.com/<handle>/status/<id>"}

It is added once the meme is posted on X — this repository is pushed without
it, and no placeholder address is ever committed. Replace nothing else: the
post's address is the only thing that changes between the draft and the entry.

`main.ts` copies `POST.json` from this repository to `/output/POST.json` and
copies `meme.png` beside it, which is all the program has to do. Leave it as
it is unless you have a reason to change it.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`, and
`out/meme.png` byte for byte this directory's `meme.png`. This needs
`POST.json` to exist first — run it after the post is up and its address is
in `POST.json`.

## Before you submit

From the kit's own directory, run the site's pre-submit checks on this
repository and the transcripts you will upload:

    node cli/makefun.mjs check --kit . --repo <this repository> --transcripts transcripts.tar.gz

The kit's `RULES.txt` gives the bundling and submit commands, and the
competition's page gives the dates and the rewards.
