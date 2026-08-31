# Song release checklist

Same steps every single. Work top to bottom.

## 4 weeks out

- [ ] Master finished. Artwork exported at 3000x3000, sRGB, JPG or PNG.
- [ ] Upload to DistroKid. **Set the release date at least 4 weeks ahead** — you cannot pitch
      to Spotify editorial once a track is live, and the pitch window is the whole point of
      scheduling ahead.
- [ ] Spotify for Artists → **Pitch a song**. Must be done 7 days before release minimum,
      4 weeks is better. Even an unsuccessful pitch tells the algorithm the track exists.

## 3 weeks out — clean up HyperFollow

DistroKid auto-generates the page and it is always messy. Every release, do this:

- [ ] Delete both **iTunes** rows (they duplicate Apple Music, and the iTunes store is legacy).
- [ ] Delete **iHeartRadio** (US radio, no Australian audience).
- [ ] Delete **Deezer** (under 9M subscribers worldwide, negligible here).
- [ ] Add **YouTube Music** and **Amazon Music** manually. DistroKid's scanner misses them
      even though you are on both stores.
- [ ] Reorder: **Spotify → Apple Music → YouTube Music → Amazon Music.** Same four, same
      order, everywhere. Most people tap the first thing they recognise.
- [ ] Copy the HyperFollow URL. Format is
      `https://distrokid.com/hyperfollow/gofarther/<song-slug>`.
- [ ] Put that link in the Instagram bio and on any pre-release posts. Before release day it
      collects pre-saves, so the track lands in people's libraries automatically.

## Release day — update the site

All in `assets/js/site.js`, in the `A` object near the top of the catalogue block.

- [ ] Save the cover art to `assets/img/cover-<song-slug>.jpg`, around 460x460, quality 78.
- [ ] Add a tile to the catalogue grid in `index.html`, copying an existing
      `<button class="cat" data-k="...">` block.
- [ ] Add the matching entry to `A` in `site.js`:
      `id` (the Spotify track ID from the share URL), `hf` (the HyperFollow URL),
      `t` (title), `m` (`"Single · 2026"`), `e` (`"Out now"`), `b` (one or two dry sentences).
- [ ] Move the previous release's `e` value from `"Out now"` to `"From the catalogue"`.
- [ ] Update the featured block in `index.html`: `relTitle`, `relArt`, `relBlurb`,
      the `relFrame` iframe src, and the `relSave` href.
- [ ] Redeploy: `npx wrangler pages deploy . --project-name=gofarther`
- [ ] Click every catalogue tile on a phone and confirm the player and Listen everywhere
      button both follow.

## Release day — everywhere else

- [ ] Post the HyperFollow link, not a Spotify link. It works for people on every platform.
- [ ] Ask for saves and follows, not streams. Saves are what feed Release Radar next time.
- [ ] Add the track to the band's own Spotify playlist.
- [ ] Email the mailing list. They gave you the address, use it.

## Worth knowing

- Bandcamp Fridays waive Bandcamp's cut entirely. Timing a release to one is free money if
  you ever put the catalogue there.
- A HyperFollow page exists per release. The artist-level hub at `hyperfollow.com/<username>`
  is the one for poster QR codes, because it still makes sense in two years.
