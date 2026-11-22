# BSides Limburg website

Static website for [BSides Limburg](https://www.bsides-limburg.be/): plain HTML, CSS and a bit of JavaScript.
No build step, no dependencies — it runs as-is on GitHub Pages.

## Structure

```
index.html              Homepage: hero, status, about, tickets, schedule, CFP, venue, sponsors, archive, FAQ
about.html              About BSides & BSides Limburg
schedule.html           Full-width schedule (pretalx widget)
code-of-conduct.html    Code of Conduct
editions/2026.html      Archive: 2026 edition (talks, workshop, photos)
editions/2025.html      Archive: 2025 edition (schedule, sponsors, aftermovie)
404.html                Not-found page
assets/js/config.js     <- THE file to edit for tickets / CFP / schedule status
assets/js/main.js       Header, footer, countdown, Weezevent & pretalx integration
assets/css/style.css    All styles (colour tokens at the top)
assets/docs/            Sponsorship leaflet (PDF)
assets/img/             Logos (logo.png original, logo-dark.png for dark backgrounds), sponsors, og/favicon
.github/workflows/      Optional GitHub Actions deploy
```

The header and footer are rendered by `main.js`, so menu changes happen in one place.

## Day-to-day updates (edit `assets/js/config.js`)

| When | Change |
|---|---|
| **Ticket sale opens** | `tickets.status = "live"`, paste the Weezevent widget `data-src` into `tickets.widgetSrc` and the shop link into `tickets.shopUrl` |
| Sold out | `tickets.status = "soldout"` |
| **CFP opens** | `cfp.status = "open"`, set `cfp.deadline`, check `cfp.url` |
| CFP closes | `cfp.status = "closed"` |
| **Schedule released** | `schedule.live = true` (and check `schedule.pretalxEvent`) |

### Weezevent
In the Weezevent back office: *Event → Sales channels → Widget*, pick the **neo** widget and copy the
value of `data-src` (looks like `https://widget.weezevent.com/ticket/E1234567/?code=…&locale=en-GB`).
Tip: add `&color_primary=FDDA24` for the BSides yellow. The site builds the official Weezevent embed
and loads `weez.js` only when tickets are live.

### pretalx
The CFP button links to `cfp.url`; the schedule uses the official `<pretalx-schedule>` widget,
loaded from `<pretalxEvent>/widgets/schedule.js`. In pretalx enable *Settings → Widget* and release
the schedule. If you create a separate pretalx event for 2027 (e.g. `bsides-limburg-2027`), update
both `cfp.url` and `schedule.pretalxEvent`. The 2027 event lives at `schedule.bsides-limburg.be/bsides-limburg-2027/`; the 2026 archive still links to `pretalx.com/bsides-limburg/`.

### Sponsors
Drop logos in `assets/img/sponsors/` and add a `.tier` block in the `#sponsors` section of `index.html`
(see `editions/2025.html` for a tiered example).

### New edition / archiving
1. Copy `editions/2026.html` to `editions/2027.html` and fill in talks/photos after the event.
2. Add a card to the `#editions` section on the homepage and an entry to `archive` in `config.js` (header dropdown).
3. Update the dates in `config.js` and the hero/meta text in `index.html`.

## Hosting on GitHub Pages

Pick **one**:

- **Without Actions:** *Settings → Pages → Deploy from a branch → `main` / `(root)`*.
- **With Actions:** *Settings → Pages → Source: GitHub Actions*. `.github/workflows/pages.yml` deploys every push to `main`.

**Custom domain:** add a file `CNAME` containing `www.bsides-limburg.be`, set the domain in
*Settings → Pages*, and point DNS to GitHub: a `CNAME` record `www → <org>.github.io` plus the
apex `A` records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
Then tick *Enforce HTTPS*. Note: `404.html` uses root-relative paths, which assumes the custom domain
(or a `<org>.github.io` user/org site).

## Local preview

Any static server works, e.g.

```
python -m http.server 8000
```

and open http://localhost:8000.
