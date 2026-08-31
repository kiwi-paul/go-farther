# Go Farther

Static site. No build step, no framework. Plain HTML, one CSS file, one JS file.

## Deploy

```
npx wrangler pages deploy . --project-name=gofarther
```

## Structure

```
index.html                 the whole site, one page
assets/css/site.css
assets/js/site.js          config at the top, then catalogue swapping, signup, video
assets/img/                photos, cover art, gig posters, the plate
_headers                   cache, security and the pre-launch noindex
robots.txt                 pre-launch disallow
```

## Two things to fill in

Both live at the top of `assets/js/site.js`.

```js
var GHL_WEBHOOK = "";   // mailing list
var VIDEO_URL   = "";   // live video in R2
```

Leave either empty and the site degrades politely: the form says the list is not
connected yet, and the video stays a still poster.

---

## Mailing list, via GoHighLevel

1. GHL → **Automation → Workflows → Create Workflow**.
2. Trigger: **Inbound Webhook**. Save, then copy the webhook URL it gives you.
3. Add actions, in order:
   - **Create/Update Contact** — map `email` from the webhook payload.
   - **Add Tag** — `gofarther-list`.
   - **Send Email** — the welcome message with the free download link.
4. Publish the workflow.
5. Paste the URL into `GHL_WEBHOOK` and redeploy.

The site posts JSON: `{ email, source, tag, page }`.

Note: GHL often refuses the browser's CORS preflight. The code handles this by
retrying the POST opaquely, so signups still land, but a genuine failure after
that point cannot be distinguished from success. Send yourself a test signup
after wiring it up rather than trusting the green message.

---

## Video, into R2

The file is 117MB, well over the 25MB per-file limit on Pages, so it goes in R2.
Free tier is 10GB stored with zero egress, so this costs nothing at any traffic level.

**Encode first** (HandBrake): 1280x720, H.264, RF 22, AAC 160kbps, and tick
**Web Optimized** on the Summary tab. Without that last one the browser downloads
the whole file before playing a frame.

**Create the bucket**

Cloudflare dashboard → R2 → Create bucket → name it `gofarther-video`.
Location hint: Asia-Pacific.

**Upload**, either by dragging the file into the dashboard, or:

```
npx wrangler r2 object put gofarther-video/wallaby-live.mp4 \
  --file=./wallaby-live.mp4 --content-type=video/mp4
```

**Make it readable.** Bucket → Settings → Public access.

- For now, enable the **r2.dev public URL**. It is rate limited and not meant for
  production, but it is fine while the site is unlisted. You get a URL like
  `https://pub-xxxxxxxx.r2.dev/wallaby-live.mp4`.
- Once `gofarther.com.au` is on Cloudflare, connect a custom domain instead
  (`video.gofarther.com.au`) and swap the URL. That removes the rate limit.

**Wire it up.** Paste the URL into `VIDEO_URL` in `assets/js/site.js` and redeploy.
The poster becomes click-to-play, nothing downloads until someone presses play.

---

## Launch checklist

Search engines are blocked in three places while the site is on pages.dev. When the
real domain is live, undo all three or the site will never rank.

1. `index.html` — delete `<meta name="robots" content="noindex, nofollow">`.
2. `_headers` — delete the `X-Robots-Tag` block at the top.
3. `robots.txt` — replace `Disallow: /` with `Allow: /`.

Then swap every `gofarther-8ud.pages.dev` for `gofarther.com.au` in `index.html`
(canonical, og:url, og:image, the JSON-LD url) and in `robots.txt` and `sitemap.xml`.

Also at launch:

- Add the custom domain in the Pages project settings.
- Replace the interim band photos with the shoot.
- Swap the hardcoded gig list for Bandsintown.
- Point the video at a custom domain rather than r2.dev.
