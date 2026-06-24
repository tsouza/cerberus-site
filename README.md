# cerberus — website

Marketing / landing site for [cerberus](https://github.com/tsouza/cerberus),
the drop-in Prometheus / Loki / Tempo HTTP gateway for ClickHouse.

Plain static site — **no build step, no framework, no dependencies.** Open
`index.html` in a browser, or serve the folder with any static file server.

```sh
# any of these work
python3 -m http.server 8000        # → http://localhost:8000
npx serve .
php -S localhost:8000
```

## Project structure

```
cerberus-site/
├── index.html              # all page markup (semantic, accessible)
├── css/
│   ├── tokens.css          # design tokens — the single source of truth
│   ├── base.css            # reset, typography, layout primitives, the brand mark
│   └── components.css      # every component style (maps 1:1 to index.html classes)
├── js/
│   ├── data.js             # editable content for the feature cards + test layers
│   └── main.js             # tab switching, copy-to-clipboard, card rendering
├── assets/brand/           # logo marks, favicons, OG / social cards
└── CLAUDE.md               # architecture + conventions for AI-assisted edits
```

## Design system

All visual values live in **`css/tokens.css`** as CSS custom properties —
colours, type scale, spacing, radii, shadows. Nothing is hard-coded elsewhere.

- **Brand / node:** `--accent` indigo `#7C8CFF`
- **Signals:** `--sky` PromQL · `--emerald` LogQL · `--rose` TraceQL
- **Type:** Space Grotesk (display) · Hanken Grotesk (body) · JetBrains Mono (code)
- **Surfaces:** `--bg` → `--code-bg`, six steps dark-to-darker

To retheme, edit the tokens — e.g. change `--accent` and the brand mark, buttons,
links, glows and tinted panels all follow.

### The brand mark

Three open strokes (PromQL / LogQL / TraceQL) converging on one node (ClickHouse):
**three query languages, one backend.** It's inline SVG (`.mark`) coloured
entirely from tokens — see `base.css`. Source variants and exports are in
`assets/brand/`.

## Editing content

- **Hero, sections, prose:** edit `index.html` directly.
- **Feature cards & test-layer chips:** edit the arrays in `js/data.js`.
- **Colours / type / spacing:** edit `css/tokens.css`.

## Deploy (GitHub Pages)

Push the folder and point Pages at it (Settings → Pages → Branch / folder), or
copy its contents into a `docs/` folder on `main`. A `.nojekyll` file is
included so nothing gets rewritten. Add a `CNAME` file for a custom domain.

## License

Site code: Apache 2.0, matching the project. Fonts via Google Fonts (OFL).
