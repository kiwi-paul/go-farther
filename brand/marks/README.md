# Go Farther marks

Vector, generated from the licensed Reprise Title outlines. No live text in any file,
so they render identically without the font installed.

## Files

```
svg/   for web and anything screen
pdf/   for printers, festival programmes, merch
png/   for social and anything that will not take vector
```

## The three marks

**wordmark** — GO ◆ FARTHER, no container. The flexible one. Narrow spaces, light
grounds, above a support-act listing, embroidery.

**plate** — the wordmark inside the QLD plate. The hero mark. Needs room.

**roundel** — GF monogram. Anywhere small or square: avatar, favicon, sticker,
kick drum.

## One colour vs two colour

**-1c** files use `currentColor`, so the whole mark takes whatever colour you set.
In HTML that means it inherits from CSS. In Illustrator, select all and set the fill.
Use these to render a mark in Uluru, brass, line paint or bitumen.

**-2c** files are the literal object: black plate with light type, red disc with
light monogram. Use when you want it to look like the thing rather than a logo.

## Sizes

| Mark | Minimum | Clear space |
|---|---|---|
| Plate | 120px / 30mm wide | half the plate height, all sides |
| Wordmark | 90px / 24mm wide | half the cap height, all sides |
| Roundel | 24px / 8mm | quarter of the diameter |

## Don't

- Recolour the two-colour versions. Use the one-colour file instead.
- Stretch, rotate, outline, or add effects beyond a flat scrim.
- Set the band name in Overpass as a substitute wordmark. Use the artwork.
- Put the roundel's open-ring version on a busy photo. It needs a plain ground.

## How these were made

**Plate and wordmark** are traced from the original plate artwork at 16,000px, so the
distressing is the real thing rather than a reconstruction. Measured speckle density is
482 blobs per megapixel against the original's 552. Regenerating from the licensed
webfont gave only 78, because font.download's WOFF conversion smooths the outlines.

**Roundel** is rebuilt from Reprise Title, because the only source available is 345px
square, which is too small to trace cleanly. The construction is measured off the
original: the G and F do not interlock, they sit side by side with a hair of gap and the
F drops 41% of the cap height so it hangs below the G. The letterforms are close but not
identical, and the original looks like it used a heavier face than Reprise Title.

To match it exactly I need either the original roundel artwork at print size, or the
name of the font it was set in.


## Letter-level adjustments: not applied

Four changes were attempted (lighten the A, add wear to the F, de-twin and repair the
last R) and only the A worked. Everything synthetic came out as fine even dust rather
than the grouped patches the artwork actually has, so the F and the last R were reverted
and these files are the untouched trace of your artwork.

Two things learned, in case someone picks this up in Illustrator:

- The last R's counter is genuinely worn through in the source. It is not a tracing
  artefact. Repairing it means redrawing part of the letter.
- Reprise Title's R and the R in the artwork are different weights, so damage lifted
  from one does not sit correctly on the other. The two cannot be mixed.

These are all straightforward by hand with the vector open: select the speckle subpaths
inside a letter and delete or duplicate them. Perhaps ten minutes for someone with the
file in front of them.
