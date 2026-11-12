# ICP Coin Chase

Original HTML5 arcade maze-chase game for @icpcrypto (ICP YouTube). Collect ICP coins, dodge the bugs,
grab a Caffeine cup to turn the tables. Vanilla HTML/CSS/JS, no libraries, no external requests.

**Do not use Caffeine.ai to build or host this.** Host it on any plain static HTTPS host instead.

## Files
| File | What it is |
|---|---|
| `index.html` | Share/landing page. Holds the X player-card + Open Graph tags (static HTML) and embeds the game. This is the URL you post on X. |
| `play.html` | The game itself, fills its frame (no site chrome). This is the `twitter:player` URL (480×480). |
| `og.png` | 1200×1200 card image (title art, ICP coins, Caffeine.ai mention). |
| `icon.svg` | Favicon. |
| `configure.js` | `node configure.js https://your-host/path` swaps `https://PLACEHOLDER` for the real URL in `index.html`. |
| `_headers` / `vercel.json` | Optional header rules that explicitly allow X to frame the player (`frame-ancestors`). |
| `src/og-source.html` | Source used to render `og.png` (canvas). |
| `check.js` | Sanity check: files exist, card tags present, inline JS parses. `node check.js` |

## How to play
- Desktop: arrow keys or WASD. P / Esc pauses, M mutes.
- Mobile: swipe on the maze (you can keep swiping without lifting). A d-pad shows under the maze on tall
  phone screens; on the title screen, "D-PAD" switches it AUTO / ON (overlay) / OFF.
- Eat every ICP coin to clear the level. Each level is faster, the bugs leave the pool sooner, and
  Caffeine lasts less time. Caffeine cup = 50, coin = 10, bugs 200/400/800/1600, level clear +500,
  extra life every 10,000. High score is kept in localStorage.
- Bugs: GLITCH (direct chase), LAG (ambushes ahead of you), FORK (half random, half chase), SPAM (patrols the corners, chases when close).

## Hosting (any static HTTPS host)
1. Upload the whole folder to a static host with HTTPS, e.g. GitHub Pages, Netlify, Cloudflare Pages, Vercel (static), or an S3/R2 bucket behind HTTPS.
2. Run `node configure.js https://<your-host>/<path>` (or edit the `https://PLACEHOLDER` values in `index.html` by hand) and upload again.
3. Check that `https://<your-host>/<path>/play.html` and `/og.png` open directly in a browser.
4. Post the `index.html` URL on X. Preview it in a draft post before publishing.

## X player-card requirements (checklist)
- Tags in the **static** `<head>` of the posted page (already there): `twitter:card=player`, `twitter:site`,
  `twitter:title`, `twitter:description`, `twitter:image`, `twitter:player`, `twitter:player:width=480`, `twitter:player:height=480`.
- All URLs must be absolute **HTTPS**. The player URL must load over HTTPS with no mixed content (the game makes no external requests).
- The player page must be frameable: do **not** send `X-Frame-Options: DENY/SAMEORIGIN`. If you send a CSP, `frame-ancestors`
  must allow `https://x.com https://twitter.com https://platform.twitter.com` (see `_headers` / `vercel.json`).
- `twitter:image` should be at least 68×68 and under 5 MB (og.png is 1200×1200). Card image is shown when the player can't play.
- X may still open the link in a browser on some mobile apps instead of playing inline; the landing page handles that case.
- X has historically required player cards to be approved/whitelisted for the domain; if the card shows as a plain link preview, that is why.

## Testing locally
```
python3 -m http.server 8080      # then open http://localhost:8080/
node check.js                    # static sanity checks
```
`play.html?autostart=1` starts immediately (silent). `play.html?sim=60&bot` fast-forwards 60 s with a simple
autopilot and logs the result to the console (test hook only).

## Originality / brand notes
- Maze layout, characters, sounds and art are original and drawn in code. Not Pac-Man: no Namco names,
  characters, maze, sounds or likeness. Enemies are hexagonal "bugs", the player is an infinity runner.
- The ICP-style infinity and the coffee cup are simple marks drawn from scratch, not copied brand files.
- Disclaimer in-game: "Fan-made game. Not an official DFINITY or Caffeine product. Not financial advice."
