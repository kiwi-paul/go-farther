# Gig checklist

Two lists: one when a gig is booked, one after it has happened.

## When a gig is confirmed

**1. Bandsintown first.** This is the one that matters beyond the website. A date entered here
appears on your Spotify artist profile, in Spotify's Live Events feed, across Apple Music's
concert listings, in Shazam and Apple Maps, and pushes a notification to fans in that city.
The website is the smallest thing it feeds.

- [ ] Add the event in Bandsintown for Artists: date, venue, city, ticket link.
- [ ] Check it has synced to the Spotify artist page a day or two later.

**2. The website.** Edit `gigs.json` in the repo root and add one line:

```json
{ "date": "2026-11-14", "city": "Gold Coast", "venue": "Wallaby Hotel", "tickets": "" }
```

- [ ] Date must be `YYYY-MM-DD`. The site works out the weekday itself, so you cannot get
      "Fri 12 Sep" wrong on a Saturday.
- [ ] `city` is what shows large on the road sign. `venue` sits next to the date.
- [ ] `tickets` can stay empty. A Tickets button only appears when there is a URL.
- [ ] Order does not matter, the site sorts by date.
- [ ] Redeploy: `npx wrangler pages deploy . --project-name=gofarther`

**3. Poster and socials.**

- [ ] Save the poster to `assets/img/poster-<venue>-<month>.jpg`, around 440px wide.
      You will need it after the gig.
- [ ] Post it. Link to the site, not to a Facebook event.

## After the gig

- [ ] Move the poster into the **Been there** wall in `index.html`. Copy an existing
      `<figure class="poster">` block, point it at your new image, and set the caption to
      venue and date. Newest first.
- [ ] Nothing to remove from `gigs.json`. Past dates drop off the site on their own, which is
      the whole reason the list is data driven. You can leave old entries in the file as a
      record, or delete them, either works.
- [ ] If it was a comp and you placed, update the results strip in `index.html` and the
      results line in the About section. Two placings is currently the strongest credibility
      material on the site.

## Worth knowing

- The "Eight gigs in" heading above the results has a shelf life. Once you are past about
  twenty gigs it stops being remarkable, and the placings stand on their own. Drop the gig
  count then, keep the results.
- Never write "only our 6th gig". State the number flat and let the reader do the maths.
