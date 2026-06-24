# CLAUDE.md — cerberus website

Guidance for AI-assisted work on this repo. Read this before editing.

## What this is

A **static marketing site** for cerberus (Prometheus/Loki/Tempo → ClickHouse
gateway). Pure HTML + CSS + vanilla JS. **No build step, no framework, no npm.**
Do not introduce React, a bundler, Tailwind, or a CSS preprocessor — the whole
point is that it stays openable as a plain file.

## Architecture

- **`index.html`** — every section, as semantic markup. Sections are numbered
  (`01 — THE GATEWAY` … `06 — CORRECTNESS`) and carry `data-screen-label` for
  tooling. Class names are BEM-ish and map 1:1 to `css/components.css`.
- **`css/tokens.css`** — the design system. **Every** colour, font, size, radius,
  shadow and spacing value is a CSS custom property here. This is the source of
  truth.
- **`css/base.css`** — reset, body/type defaults, the `.container` and `.section`
  layout primitives, the `.mark` brand glyph, `.glow` accents, responsive rules.
- **`css/components.css`** — one block per component, in page order. No values
  invented here — consume `var(--…)` from tokens.
- **`js/data.js`** — content arrays for the repeated cards (features) and chips
  (test layers). Edit copy here.
- **`js/main.js`** — renders those arrays, runs the quick-start tabs and the
  hero copy-button. Plain DOM, IIFE, no deps.

## Hard rules

1. **Tokens first.** Never hard-code a hex, px font-size, or radius in
   `components.css`. Add or reuse a token in `tokens.css` and reference it. If a
   one-off value is truly needed, justify it in a comment.
2. **No new dependencies / no build.** Everything must work by opening
   `index.html` from disk (plus a static server for the `js/` fetches — which are
   same-origin, so `file://` works too).
3. **Keep markup semantic & accessible.** Real headings, `alt`/`aria-hidden`,
   `rel="noopener"` on `target="_blank"`, keyboard-usable controls.
4. **Brand mark is tokenised SVG.** The three strokes are
   `--sky` / `--emerald` / `--rose`, the node is `--accent`. Don't bake colours
   into the SVG — colour via the `.mark__*` classes.
5. **Match the existing voice.** Terse, technical, lower-case product name
   ("cerberus"), em-dashes, no marketing fluff, no emoji.

## Content accuracy

Copy is grounded in the real repo (`github.com/tsouza/cerberus`): `internal/optimizer`,
`internal/chsql`, `internal/chplan`, the per-client circuit breaker,
`CERBERUS_QUERY_TIMEOUT`, native-rate on ClickHouse 25.6+, PromQL 574/574 on the
CNCF compliance tester. If you change a technical claim, verify it against the
repo / its `docs/` first — don't invent numbers or feature names.

## Common tasks

- **Add a feature card** → append to `CERBERUS_FEATURES` in `js/data.js`.
- **Add a nav/section** → add the markup in `index.html` (follow the
  `section__eyebrow` / `section__title` / `section__lead` pattern) and a nav link.
- **Retheme** → edit tokens in `css/tokens.css`. Try `--accent` first.
- **New component** → add markup with new BEM classes, then a matching block at
  the end of `components.css` using tokens only.

## Gotchas

- The quick-start code blocks are real `<pre><code>` with `.c-comment` / `.c-var`
  spans for highlighting — keep `&amp;`, `&lt;`, `&gt;` escaped in HTML.
- Feature cards and layer chips render from JS; the no-JS page still shows the
  hero, all prose, the architecture diagram, and the three correctness cards.
- `scroll-behavior: smooth` + `prefers-reduced-motion` are handled in `base.css`.
