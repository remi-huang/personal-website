# Remi · Personal Site — Design System v0.1 (Hero V4)

## Colors

| Token | Hex | Use |
|---|---|---|
| `ink-blue` | `#1d3a8a` | Primary accent · all handwriting · scribbles · underlines |
| `ink-black` | `#1a1a1a` | Body text · window outlines |
| `ink-soft` | `#666666` | Meta · captions · secondary text |
| `paper` | `#fdfbf5` | Default background |
| `paper-warm` | `#f4efe4` | Alt section bg |
| `clip-red` | `#d94a3a` | Paperclip only |
| `clip-yellow` | `#e8b73a` | Paperclip only |
| `status-green` | `#3a8a4a` | Online dots — sparingly |

**Rule**: ink-blue = 90% of accent weight. Reds/yellows are physical-object only (clips, tape). Never use blue for body — only handwriting + decoration.

---

## Typography

| Role | Family | Size / Weight | Use |
|---|---|---|---|
| Display serif | Instrument Serif | 68 / 400 (regular + italic) | Hero slogan |
| Handwriting script | Caveat | 18–76 / 400–600 | "with AI", arrows, names, captions, notes |
| Body | Inter | 14–17 / 400 | Paragraphs |
| Mono | JetBrains Mono | 11–13 / 400 | Nav · meta · timestamps · windows |

**Pairing rule**: 1 handwriting + 1 serif + 1 mono per page. Caveat is the only handwriting family for the site; use size, weight, rotation, and placement to separate highlights from marginal notes.

---

## Hero V4 layout

- 1440 × 900 design grid · 56px edge gutter · 8px baseline
- **Left column (720px)**: nav top → slogan (2 lines, `nowrap`) → info strip
- **Right column (~620px)**: 3-photo cluster, overlapping
- Slogan formula: italic serif + roman serif + rotated Caveat highlight on each line

```
[i build] [stuff] [with AI ↘ caveat -3°]
[and] [show you how ↘ underline] [↓ caveat]
```

---

## Decorations

| Element | Spec |
|---|---|
| Arrow | rough SVG, 60×80, 2.2px stroke, rotation ±15° |
| Circle (around "contact") | 110×36 oval, 1.8px |
| Underline (single + double) | wavy, full-width of word |
| Strikethrough | double wavy pass |
| Doodles | bicycle, star, sparkle, scribble-ball, smiley |
| Paperclip | colored 32×56 SVG, ±20° |
| Tape | 60×18 translucent yellow, ±8° |

All scribbles share one `feTurbulence` rough-paper filter — "drawn with the same pen on the same day". **Density ceiling: 5 doodles per viewport.**

---

## Components

- **PhotoPlaceholder** — `width × height`, `rotate ±9°`, optional `polaroid` border, `tape` (`top` / `top-left` / `top-right`), `clip` (`red` / `yellow` / `blue`), `caption` (Caveat 18px blue), `hue` for placeholder gradient.
- **RetroWindow** — 1px black outline + striped title bar + close/zoom squares, mono title.
- **ClockWidget** — analog face inside RetroWindow + city / temp.
- **TextWindow** — RetroWindow with mono content area.

---

## Layout rules

| Axis | Rule |
|---|---|
| Photo rotation | −9° to +9° |
| Window rotation | −2° to +2° |
| Handwriting rotation | −4° to +4° |
| Body text | always axis-aligned |
| Photo overlap | 20–40px intentional |
| Section vertical rhythm | 96px |

---

## Nav

Mono 13px, blue scribble underline on active item, scribble oval around `contact`. Items: `about · built · learned · community · contact · EN/中`.

---

## Responsive (V4)

- **≥1024px**: full 2-column collage as designed
- **640–1023px**: same 2-column, photos shrink with relative units (%/vw), font sizes drop one step (slogan 56px)
- **<640px**: re-stack vertically — nav (hamburger) → slogan (single column, smaller) → photo stack (rotations preserved, overlap reduced) → info strip → scroll cue. Skip whole-page `scale()` — kills mobile readability.
