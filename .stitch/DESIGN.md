---
name: "Grand Sapphire Resorts - Twilight in the Hills"
colors:
  surface: "#fcf9f0"
  "surface-dim": "#dddad1"
  "surface-bright": "#fcf9f0"
  "surface-container-lowest": "#ffffff"
  "surface-container-low": "#f6f3ea"
  "surface-container": "#f1eee5"
  "surface-container-high": "#ebe8df"
  "surface-container-highest": "#e5e2da"
  "on-surface": "#1c1c17"
  "on-surface-variant": "#424844"
  "inverse-surface": "#31312b"
  "inverse-on-surface": "#f4f1e8"
  outline: "#727974"
  "outline-variant": "#c2c8c2"
  "surface-tint": "#486456"
  primary: "#00190f"
  "on-primary": "#ffffff"
  "primary-container": "#122e22"
  "on-primary-container": "#799787"
  "inverse-primary": "#aecebc"
  secondary: "#755b00"
  "on-secondary": "#ffffff"
  "secondary-container": "#fed255"
  "on-secondary-container": "#735a00"
  tertiary: "#211100"
  "on-tertiary": "#ffffff"
  "tertiary-container": "#3d2300"
  "on-tertiary-container": "#c3822a"
  error: "#ba1a1a"
  "on-error": "#ffffff"
  "error-container": "#ffdad6"
  "on-error-container": "#93000a"
  "primary-fixed": "#caead7"
  "primary-fixed-dim": "#aecebc"
  "on-primary-fixed": "#042015"
  "on-primary-fixed-variant": "#314c3f"
  "secondary-fixed": "#ffe08e"
  "secondary-fixed-dim": "#ecc246"
  "on-secondary-fixed": "#241a00"
  "on-secondary-fixed-variant": "#584400"
  "tertiary-fixed": "#ffddb9"
  "tertiary-fixed-dim": "#ffb961"
  "on-tertiary-fixed": "#2b1700"
  "on-tertiary-fixed-variant": "#663e00"
  background: "#fcf9f0"
  "on-background": "#1c1c17"
  "surface-variant": "#e5e2da"
  "twilight-navy": "#0D1B2E"
  "warm-ivory": "#F8F5EC"
  "deep-forest": "#122E22"
  "antique-gold": "#C9A227"
  "amber-glow": "#F0A94E"
---

# Design System: Grand Sapphire Resorts Homepage
**Project ID:** 9486403208560194495

## 1. Visual Theme & Atmosphere

Grand Sapphire Resorts presents a quiet-luxury private-villa resort aesthetic rooted in the Western Ghats of Idukki, Kerala. The visual language is "twilight in the hills": warm amber window-light glowing against a cool navy mountain sky. The atmosphere is calm, understated, and family-first — a boutique mountain lodge that never feels corporate or loud. The property's own photography is the loudest signal on the page; the design system exists to frame and amplify it, never compete with it.

The palette balances two distinct color temperatures: deep forest green (#122E22) and twilight navy (#0D1B2E) provide cool, grounding foundations, while antique gold (#C9A227) and amber glow (#F0A94E) inject warmth precisely where the eye should land — CTAs, card borders, hero overlays. The default reading surface is warm ivory (#F8F5EC), a creamy off-white that flatters photography and reduces glare. Whitespace is generous — section vertical padding uses 120px on desktop (collapsing to 64px mobile), card gaps sit at 24px, and the max content width is 1280px with full-bleed reserved exclusively for the hero and photography bands. Corner radius follows a clear hierarchy: 4px for chips/badges, 10px for cards and buttons, 20px only for the hero media container. Shadows are soft, warm-toned, and restrained; no glassmorphism, no cool-gray dropshadows, no purple/blue-violet gradients.

## 2. Color Palette & Roles

### Primary Foundation

| Role | Token | Hex | Description |
|------|-------|-----|-------------|
| **Deep Forest** | `primary` / `deep-forest` | `#122E22` | Section backgrounds behind facility/activity cards, footer. The anchoring green — cool, muted, almost black in low light. |
| **Twilight Navy** | `background` / `twilight-navy` | `#0D1B2E` | Hero and full-bleed night photography sections. The mountain sky at dusk. |
| **Warm Ivory** | `surface` / `warm-ivory` | `#F8F5EC` | Default page background for all reading/content sections. High contrast against photography, never pure white. |
| **Surface Container** | `surface-container` | `#F1EEE5` | Elevated card surfaces, subtle band alternation. |
| **Surface Container High** | `surface-container-high` | `#EBE8DF` | Hover states, subtle depth layering. |

### Accent & Interactive

| Role | Token | Hex | Description |
|------|-------|-----|-------------|
| **Antique Gold** | `secondary` / `antique-gold` | `#C9A227` | The single accent. Borders on cards, wordmark, primary CTA text/underline. Used sparingly — never as large fill. |
| **Amber Glow** | `tertiary` / `amber-glow` | `#F0A94E` | Hero overlays, active states, anything meant to feel like the property's own exterior lighting. |
| **Primary CTA Background** | `primary` (Material) | `#00190F` | Near-black green for primary button fills. |
| **Secondary Container** | `secondary-container` | `#FED255` | Light gold fills for secondary actions, chips. |

### Typography & Text Hierarchy

| Role | Token | Hex | Description |
|------|-------|-----|-------------|
| **On Surface** | `on-surface` | `#1C1C17` | Primary body text. Near-black with warm undertone. |
| **On Surface Variant** | `on-surface-variant` | `#424844` | Secondary text, descriptions, metadata. |
| **On Background** | `on-background` | `#1C1C17` | Hero headlines, high-emphasis text on warm ivory. |
| **On Primary** | `on-primary` | `#FFFFFF` | Text on primary buttons, dark green sections. |
| **On Secondary** | `on-secondary` | `#FFFFFF` | Text on gold fills. |
| **Outline** | `outline` | `#727974` | Dividers, disabled borders, low-emphasis lines. |
| **Outline Variant** | `outline-variant` | `#C2C8C2` | Hairline borders on cards (1px at low opacity). |

### Functional States

| State | Token | Hex | Usage |
|-------|-------|-----|-------|
| **Success** | — | `#122E22` (reuses deep-forest) | Confirmation messages, checkmarks — uses primary green family. |
| **Error** | `error` | `#BA1A1A` | Form validation, booking errors. |
| **Error Container** | `error-container` | `#FFDAD6` | Error banner backgrounds. |
| **Warning** | — | `#F0A94E` (amber-glow) | Attention states, uses tertiary amber. |
| **Info** | — | `#486456` (surface-tint) | Informational badges, uses muted green. |

## 3. Typography Rules

### Hierarchy & Weights

| Level | Font Family | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing | Usage |
|-------|-------------|----------------|---------------|--------|-------------|----------------|-------|
| **H1 / Hero Headline** | Noto Serif | 3.5rem (56px) | 2.5rem (40px) | 600 | 1.1 | — | Hero headline only. Carries brand personality. |
| **H2 / Section Title** | Noto Serif | 2.25rem (36px) | 2rem (32px) | 600 | 1.2 | — | Major section titles (Accommodations, Facilities, Experiences). |
| **H3 / Card Title** | Noto Serif | 1.5rem (24px) | 1.25rem (20px) | 600 | 1.3 | — | Room names, facility titles, experience cards. |
| **Body MD** | Inter | 1rem (16px) | 1rem (16px) | 400 | 1.6 | — | All reading copy, forms, booking widget, descriptions. |
| **Body SM** | Inter | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.5 | — | Secondary details, pricing subtext, footnotes. |
| **Label Caps** | Inter | 0.75rem (12px) | 0.75rem (12px) | 500 | 1.4 | 0.05em | Eyebrows, badges, amenity chips, nav labels. Sentence case in copy, never ALL CAPS via text-transform for real words. |

**Font Character Notes:**
- **Noto Serif**: Humanist serif with calligraphic warmth. Used only for headlines and major titles — never for body copy, buttons, or data. Its elegance signals "boutique lodge."
- **Inter**: Geometric humanist sans, highly legible at small sizes. The workhorse for all UI text, forms, and functional copy.

### Spacing Principles

- **Base unit**: 8px. All spacing values are multiples of 8px.
- **Type-to-space relationship**: Line heights (1.6 for body, 1.1–1.2 for display) create inherent vertical rhythm. Section padding (120px desktop / 64px mobile) equals 15× / 8× base unit.
- **Letter-spacing**: Only applied to label-caps (0.05em) for optical balance at small sizes. Headlines and body use default tracking.
- **Responsive scaling**: Headlines drop one scale step on mobile (H1 56→40px, H2 36→32px). Body text remains 16px across breakpoints.

## 4. Component Stylings

### Buttons

| Variant | Shape | Background | Text | Border | Hover / Active | Transition |
|---------|-------|------------|------|--------|----------------|------------|
| **Primary** | 10px radius | `#00190F` (near-black green) | `#FFFFFF` (warm ivory) | None | Border: 1px `#C9A227` (antique gold) | 150–200ms ease-out enter, ease-in exit |
| **Secondary** | 10px radius | Transparent | `#122E22` (deep forest) | 1px `#C9A227` | Background: `#FED255` (light gold) | Same timing |
| **Ghost / Text** | 10px radius | Transparent | `#C9A227` | None | Underline appears | 150ms |
| **Booking CTA** | 10px radius | `#00190F` | `#FFFFFF` | 1px `#C9A227` on hover | Gold border + slight scale (1.02) | 200ms spring |

**Key rules:** Never gradient fills. Primary button uses the darkest green as fill; the gold accent appears only as a hover border. Touch targets minimum 48px height.

### Cards & Containers

| Variant | Radius | Border | Shadow | Internal Padding | Image Treatment |
|---------|--------|--------|--------|------------------|-----------------|
| **Room/Facility/Experience Card** | 10px | 1px `#C2C8C2` (outline-variant, ~20% opacity) | None default; subtle warm shadow on hover (0 8px 24px rgba(18,46,34,0.08)) | 24px | Photo top, full-bleed to card edges, 10px radius clipped to card. Label below in body-md, never overlay caption. |
| **Amenity/Trust Chip** | 4px | None | None | 8px 12px | Icon + label in label-caps, single-color line icon in antique gold. |
| **Hero Media Container** | 20px | None | Soft warm drop-shadow | N/A | Full-bleed image/video, rounded only at container level. |

**Card layout pattern:** Image (16:9 or 4:3) → 16px gap → Title (H3) → 8px gap → Description (body-sm, on-surface-variant) → 16px gap → Price line (body-md, on-surface) → 12px gap → Button (secondary variant).

### Navigation

- **Desktop**: Transparent over hero (logo + links in label-caps, antique gold hover underline). On scroll: solid warm-ivory background, 1px outline-variant border-bottom, logo shifts to deep-forest.
- **Mobile**: Hamburger icon (24×24, deep-forest). Opens full-screen overlay menu (not drawer). Menu background: warm-ivory. Links: Noto Serif H3 size, deep-forest, generous vertical padding (32px). Close button top-right.
- **Language selector**: Label-caps, antique gold text, no border, dropdown on click.

### Inputs & Forms

- **Field radius**: 10px (consistent with buttons/cards).
- **Border**: 1px outline-variant (`#C2C8C2`) default; 2px antique gold (`#C9A227`) on focus.
- **Focus ring**: None — uses border color change only.
- **Padding**: 16px horizontal × 14px vertical (comfortable touch target).
- **Label**: Label-caps, on-surface-variant, positioned above field with 8px gap.
- **Error state**: Border `#BA1A1A`, error text body-sm in error red.
- **Booking widget**: Sticky on mobile, inline on desktop. Fields stack vertically. Primary CTA at bottom spans full width.

### Domain-Specific Components

**Experience Carousel Card** (horizontal scroll on mobile, grid on desktop):
- Image 4:3 aspect, 10px radius, full-bleed.
- Overlay: Gradient from transparent to `rgba(18,46,34,0.7)` at bottom.
- Title in Noto Serif H3, warm ivory, positioned in overlay.
- "Add to Itinerary" button: ghost variant, warm ivory text, antique gold hover.

**Trust Strip** (hero section):
- 4 icons in horizontal row, label-caps labels below.
- Icons: single-color line style, antique gold (`#C9A227`), 24×24px.
- Never filled badges. Spacing: 48px between items desktop, stacked mobile.

**Footer**:
- Background: deep-forest (`#122E22`).
- Text: on-primary-container (`#799787`) for body, warm ivory for headings.
- Links: hover to antique gold.
- Divider: 1px outline-variant at 20% opacity.

## 5. Layout Principles

### Grid & Structure

- **Max content width**: 1280px. Centered with auto margins.
- **Full-bleed exceptions**: Hero section (image/video), photography bands between sections.
- **Column system**: CSS Grid with 12-column implicit grid. Breakpoints at 1280px (desktop), 768px (tablet), 480px (mobile).
- **Desktop**: 3-column cards (rooms, facilities), 4-column experiences carousel (scroll-snap).
- **Tablet**: 2-column cards, 2-column experiences.
- **Mobile**: Single column all cards, horizontal scroll for experiences.

### Whitespace Strategy

| Context | Vertical Padding | Horizontal Padding | Gap |
|---------|------------------|-------------------|-----|
| **Section (desktop)** | 120px | 24px (edge) | — |
| **Section (mobile)** | 64px | 16px | — |
| **Card grid** | — | — | 24px |
| **Card internal** | 24px | 24px | 16px (elements) |
| **Hero** | 120px top/bottom (content) | 24px | — |
| **Footer** | 64px | 24px | 32px (columns) |

### Alignment & Visual Balance

- **Hero**: Headline centered, CTA centered, trust strip centered. All content max-width 800px within hero.
- **Section titles**: Left-aligned (not centered) — creates strong vertical anchor line.
- **Card content**: Left-aligned. Image full-width, text block below.
- **Image-to-text ratio**: Cards use ~60% image / 40% text. Hero is 100% image with overlay.
- **Visual weight**: Deep-forest sections feel heavier; balanced by warm-ivory reading sections. Gold accents provide visual "light" points.

### Responsive Behavior & Touch

- **Mobile-first CSS**: Base styles target mobile; desktop enhancements via `min-width` media queries.
- **Touch targets**: Minimum 48×48px (buttons, chips, nav items, form fields).
- **Hover states**: Only on `@media (hover: hover)`. Mobile gets active/tap states via `:active`.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables parallax, particle drift, scroll-triggered rise/fade. Keeps simple 150ms opacity fades.
- **Scroll-triggered reveals** (GSAP ScrollTrigger): Elements rise 20px and fade in, one orchestrated pass per section (not per element). Stagger: 0.1s between elements within a section.

## 6. Design System Notes for Stitch Generation

### Language to Use

When prompting Stitch, use this editorial vocabulary:
- "Quiet luxury," "boutique mountain lodge," "twilight in the hills"
- "Warm ivory reading surface," "deep forest section bands," "antique gold accents — sparing, never fill"
- "Noto Serif for personality headlines only; Inter for all UI and body"
- "Generous whitespace — 120px section padding desktop, 64px mobile"
- "Soft warm shadows, no glassmorphism, no cool-gray dropshadows"
- "Full-bleed hero photography, card images clipped to 10px radius"
- "Single accent color (antique gold) for CTAs, borders, icons — never gradients"

### Color References

| Descriptive Name | Hex | Token |
|------------------|-----|-------|
| Deep Forest | `#122E22` | `primary` / `deep-forest` |
| Twilight Navy | `#0D1B2E` | `background` / `twilight-navy` |
| Warm Ivory | `#F8F5EC` | `surface` / `warm-ivory` |
| Antique Gold | `#C9A227` | `secondary` / `antique-gold` |
| Amber Glow | `#F0A94E` | `tertiary` / `amber-glow` |
| Near-Black Green | `#00190F` | `primary` (Material) |
| Light Gold | `#FED255` | `secondary-container` |
| Muted Sage | `#799787` | `on-primary-container` |
| Warm Gray Text | `#424844` | `on-surface-variant` |
| Hairline Border | `#C2C8C2` | `outline-variant` |

### Component Prompts for Stitch

**Hero Section:**
> "Full-bleed hero with twilight mountain photography, 20px rounded container. Centered Noto Serif H1 (56px/40px) in warm ivory. Primary CTA button: near-black green fill, warm ivory text, antique gold hover border. Secondary ghost CTA: antique gold text. Trust strip below: 4 line-icons in antique gold with label-caps labels. Transparent nav over hero, solidifies to warm ivory on scroll."

**Room Card:**
> "Card with 10px radius, 1px hairline border in outline-variant. 16:9 image full-bleed to card edges, clipped to radius. Below image: 24px padding. Noto Serif H3 title, body-sm description, price in body-md, secondary button (transparent, deep forest text, antique gold border). Hover: subtle warm shadow (0 8px 24px rgba(18,46,34,0.08)). 3-column grid desktop, 1-column mobile, 24px gap."

**Experience Carousel Card:**
> "Horizontal scroll card, 4:3 image, 10px radius. Dark gradient overlay bottom 40% (transparent to rgba(18,46,34,0.7)). Noto Serif H3 in warm ivory over overlay. Ghost 'Add to Itinerary' button: warm ivory text, antique gold hover. Snap-scroll on mobile, 4-column grid desktop."

**Navigation:**
> "Desktop: logo left (Noto Serif, antique gold), links right (label-caps, deep forest, antique gold hover underline). Mobile: hamburger opens full-screen overlay, warm ivory bg, Noto Serif H3 links, 32px vertical padding. Language selector: label-caps, antique gold."

**Booking Widget:**
> "Sticky on mobile, inline desktop. Warm ivory surface, 10px radius, 1px hairline border. Fields: 10px radius, outline-variant border, antique gold focus border. Labels in label-caps above fields. Primary CTA full-width on mobile."

### Incremental Iteration Guidance

1. **Start with hero** — nail the photography treatment, typography scale, and CTA hierarchy first. This sets the emotional tone.
2. **Then card system** — rooms, facilities, experiences all share the same card DNA. Get radius, border, image treatment, and internal spacing consistent.
3. **Navigation scroll behavior** — test the transparent-to-solid transition at 100px scroll threshold.
4. **Experience carousel** — verify snap-scroll feels native on mobile, grid alignment on desktop.
5. **Booking flow** — ensure form fields, validation states, and sticky behavior work across breakpoints.
6. **Motion last** — add GSAP ScrollTrigger reveals section-by-section, respect `prefers-reduced-motion`.
7. **Accessibility audit** — verify WCAG AA on warm ivory (on-surface `#1C1C17` = 12.6:1 ✓), antique gold text only at label sizes (never body), all icon-only controls have aria-labels.

---

*Generated from Stitch project "Grand Sapphire Resorts Homepage" (ID: 9486403208560194495) using the extract-design-md skill.*