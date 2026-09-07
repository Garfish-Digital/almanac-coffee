# ROADMAP — Almanac Coffee

Two separate Next.js projects, same content, same stack, opposite execution. They exist
to be filmed side by side for Garfish Digital's Instagram grid.

```
Instagram-demos/
  Markdown-files/          ← this file and the research notes
  almanac-coffee-garfish/  ← built first. GitHub + Netlify.
  almanac-coffee-others/   ← copied from the above, then degraded. Local only.
```

**Almanac Coffee** — old-world knowledge, seasonal harvests, careful craft.

---

## Decisions

| | |
|---|---|
| **Structure** | Two independent projects, not one toggled codebase |
| **Pages** | Home, Menu, Visit — three, in both projects |
| **Stack** | Next.js (React + TypeScript), plain CSS with custom properties. No Tailwind, no UI library |
| **Build order** | Finish `garfish` completely → copy the folder → degrade the copy |
| **Content** | Byte-identical `content/` directory in both projects |
| **Imagery** | One shared image set. `others` abuses the same files rather than sourcing worse ones |
| **`garfish` hosting** | GitHub repo, deployed on Netlify |
| **`others` hosting** | Local only. Never deployed, never committed anywhere public |
| **Video** | Produced separately by someone else. Not our concern here |

---

## Philosophy

**The sites are visualizations, not products.** No real visitor will ever use them. The
only person who touches them is you, deliberately, on camera, to demonstrate a specific
point.

That reframes what "good" means. We are not chasing genuine WCAG compliance, real
performance budgets, or defensive engineering. We are building a site that **looks and
behaves demonstrably better on camera**, and a second site whose failures **read
instantly in a still frame or a three-second clip**.

Two rules fall out of this:

1. **If a fault can't be seen, it isn't worth building.** White text on a white
   background is a headline demo because anyone can see it. A missing ARIA label is a
   real accessibility failure and a terrible video, so it stays off the list.
2. **The `garfish` site still has to be genuinely handsome.** It's the deployed one, and
   it's a portfolio piece. Spend the craft there. The `others` site only has to survive
   being pointed at.

**Corollary for the degrade pass:** the `others` site must still *work*. It should look
acceptable in a still screenshot. The argument is that small overlooked decisions
accumulate into something that feels cheap — not that other people's sites are broken. A
site that fails obviously isn't credible and isn't the argument.

**Priority order:** get both projects standing. Fine-tuning comes later.

---

## Project structure

Identical in both. `others` is a copy, so the file tree matches and diffing the two is
easy.

```
almanac-coffee-garfish/
  app/
    layout.tsx            ← header, footer, fonts, metadata
    page.tsx              ← Home
    menu/page.tsx         ← Menu
    visit/page.tsx        ← Visit
    globals.css
  components/
    Header.tsx  Hero.tsx  SeasonalCards.tsx  Gallery.tsx
    MenuSection.tsx  HoursTable.tsx  ContactForm.tsx  Footer.tsx
  content/
    shop.ts               ← identity, hours, address, copy
    menu.ts               ← every drink, food item, bean, with prices
  styles/
    tokens.css            ← type scale, spacing scale, color, radii, motion
  public/images/          ← the shared image set (see inventory below)
```

### `content/shop.ts` should carry

Name, tagline, one-paragraph story, hours by day, street address, phone, email,
neighborhood note, parking note, social handles. Written to sound like a business that
exists — it doubles as portfolio copy.

### `content/menu.ts` should carry

Categories (Espresso, Filter, Not Coffee, Food, Beans), and per item: name, price, a
one-line description, and the image filename where one exists.

### Netlify note

Deploy `garfish` with Netlify's Next.js runtime rather than a static export — a static
export turns off `next/image` optimization, and image handling is one of the things the
two sites are supposed to differ on.

---

## Page specs

### Home

1. **Header** — wordmark, nav: Home · Menu · Visit. Menu carries a dropdown (Drinks /
   Food / Beans). The dropdown exists specifically so the `others` copy can break it.
2. **Hero** — full-bleed image, headline, one line of subhead, one primary CTA.
3. **The Almanac** — short statement of craft. Portrait image beside it.
4. **Seasonal three-up** — current roast, a brew method, a pastry. Three cards.
5. **Atmosphere band** — full-bleed panoramic image with a pull quote over it.
6. **Menu preview** — five or six items with prices, link through to `/menu`.
7. **Gallery strip** — six square images.
8. **Hours & address condensed** — tap-to-call number, link through to `/visit`.
9. **Seasonal dispatch** — newsletter signup. Validates, sends nothing.
10. **Footer** — hours, address, social, small print.

### Menu

1. Header.
2. **Slim hero band** with page title over a flat-lay image.
3. **Category sub-nav** — Espresso · Filter · Not Coffee · Food · Beans. Sticky.
4. **Menu sections** — items with prices and descriptions, product shots interspersed
   rather than one per row.
5. **Beans / retail** — bag shots with origin notes and prices.
6. **Seasonal callout** — what's on right now.
7. Footer.

### Visit

1. Header.
2. **Hero** — people at tables, hands around cups.
3. **Hours table** — by day, with an "open now" indicator.
4. **Address block** — tap-to-call, tap-for-directions.
5. **Map** — embed or a styled map still.
6. **Getting here** — transit, parking, neighborhood notes.
7. **Interior gallery** — three images.
8. **Contact form** — name, email, message. Inline validation, success state, sends nothing.
9. **The people** — three staff portraits.
10. Footer.

---

## Build phases

### Phase 1 — Content
- [ ] `content/shop.ts` and `content/menu.ts`, written well.
- [ ] Do this before any layout work. Real content makes every layout decision easier.

### Phase 2 — Images
- [ ] Source and prepare the inventory below in one sitting.
- [ ] Placeholder greys are fine for Phase 3 if you'd rather build first — but the
      inventory is the long pole, so starting it early is worth it.

### Phase 3 — `almanac-coffee-garfish`
- [ ] Scaffold Next.js with TypeScript and the App Router.
- [ ] `styles/tokens.css` first — type scale, spacing scale, color, radii, motion curves.
      Every component pulls from it.
- [ ] Build mobile-first, then widen.
- [ ] All three pages complete and genuinely good.
- [ ] GitHub repo, Netlify deploy, confirm it's live.

### Phase 4 — `almanac-coffee-others`
- [ ] Copy the folder. Rename the project in `package.json`. Don't init git.
- [ ] Work the fault checklist below, section by section.
- [ ] Stop when it reads as clumsy, not when it reads as broken.

---

## Image inventory

One shared set, sourced once, used by both projects. Roughly 38 files.

### Preparation rules

- **Masters:** high-quality JPG. PNG only where transparency is required.
  `next/image` converts to WebP/AVIF on the fly for the `garfish` site, so don't
  pre-convert — hand it good JPGs.
- **Keep raw copies.** Before compressing, save an untouched full-resolution copy of the
  three page heroes and the panoramic band into `_raw/`. The `others` site serves those
  directly, unoptimized, which is what produces the visible band-by-band load.
- **Dimensions below are the long edge at 2×.** Everything is sized for retina at the
  largest place it appears.
- **Naming:** lowercase, hyphenated, matching the table. `home-hero.jpg`,
  `menu-espresso.jpg`. Sloppy naming here costs real time in Phase 3.

### Brand

| File | Subject | Format | Size |
|---|---|---|---|
| `logo-mark.svg` | Almanac mark — a sun, wheat sheaf, moon phase, or compass rose. Something that could be stamped on a bag | SVG | vector |
| `logo-wordmark.svg` | "Almanac Coffee" set in the heading face | SVG | vector |
| `favicon.png` | The mark alone, transparent, square | PNG | 512 × 512 |
| `og-share.jpg` | Storefront or hero crop with breathing room — used for link previews | JPG | 1200 × 630 |

### Home

| File | Subject | Format | Size |
|---|---|---|---|
| `home-hero.jpg` | Interior, warm morning light, a barista mid-pour at the bar. **Must contain a bright window or pale wall region** — that's where white headline text goes, and it's what the `others` site exploits for the contrast demo | JPG | 2400 × 1350 |
| `home-hero-mobile.jpg` | Portrait crop of the same scene, subject held to one side | JPG | 1200 × 1600 |
| `almanac-story.jpg` | Hands weighing beans on a scale, or a worn notebook and ledger beside a bag of beans. Leans into the "almanac" idea | JPG | 1600 × 2000 |
| `seasonal-roast.jpg` | A retail bag standing upright, seasonal label visible | JPG | 1400 × 1400 |
| `seasonal-brew.jpg` | Pour-over cone mid-bloom, steam visible | JPG | 1400 × 1400 |
| `seasonal-pastry.jpg` | A single pastry on a small plate, overhead or three-quarter | JPG | 1400 × 1400 |
| `atmosphere-band.jpg` | Wide room shot, people at tables, shallow depth of field. Full-bleed divider with a quote over it — keep the centre uncluttered | JPG | 2400 × 1000 |
| `storefront.jpg` | Exterior, signage legible, ideally with a person entering | JPG | 1800 × 1200 |
| `gallery-01…06.jpg` | Six squares: latte art overhead · beans spilling from a scoop · hands passing a cup across the counter · the espresso machine group head · a corner table with a book and a cup · shelves of retail bags | JPG | 1400 × 1400 each |
| `texture-beans.jpg` | Macro of whole beans filling frame. Used as a section background | JPG | 1600 × 1067 |

### Menu

| File | Subject | Format | Size |
|---|---|---|---|
| `menu-hero.jpg` | Overhead flat lay — four or five drinks and a pastry arranged on a wood or stone surface. Shot from directly above | JPG | 2400 × 1000 |
| `menu-espresso.jpg` | Single shot in a demitasse, crema visible | JPG | 1200 × 1200 |
| `menu-cortado.jpg` | Cortado in a small glass | JPG | 1200 × 1200 |
| `menu-latte.jpg` | Latte with clean art, overhead | JPG | 1200 × 1200 |
| `menu-cappuccino.jpg` | Cappuccino, three-quarter angle | JPG | 1200 × 1200 |
| `menu-coldbrew.jpg` | Cold brew over ice in a tall glass | JPG | 1200 × 1200 |
| `menu-filter.jpg` | Filter coffee in a ceramic mug beside the brewer | JPG | 1200 × 1200 |
| `menu-mocha.jpg` | Mocha, slightly indulgent styling | JPG | 1200 × 1200 |
| `menu-chai.jpg` | Chai or tea — the non-coffee option | JPG | 1200 × 1200 |
| `menu-croissant.jpg` | Croissant on a plate | JPG | 1200 × 1200 |
| `menu-toast.jpg` | Thick-cut toast, something on it | JPG | 1200 × 1200 |
| `menu-cookie.jpg` | Cookie or slice, plated simply | JPG | 1200 × 1200 |
| `beans-bag-01…03.png` | Three retail bags, front-facing, **background removed**. Different seasonal labels if you can manage it | PNG | 1400 × 1400 each |
| `origin-notes.jpg` | Green beans in a burlap sack, or a hand sorting on a tray | JPG | 1600 × 1067 |

**Shoot the twelve product squares consistently** — same surface, same light direction,
same distance. A menu grid where every item is framed alike is a large part of what makes
the `garfish` site look finished, and it gives the degrade pass an obvious thing to
wreck.

### Visit

| File | Subject | Format | Size |
|---|---|---|---|
| `visit-hero.jpg` | Tables with people enjoying themselves — several cups, hands, conversation. Warm, occupied, unstaged | JPG | 2400 × 1350 |
| `visit-hero-mobile.jpg` | Portrait crop of the same scene | JPG | 1200 × 1600 |
| `interior-wide.jpg` | The room from the door, empty or near-empty, showing the layout | JPG | 2000 × 1333 |
| `entrance.jpg` | The door and signage close up, hours decal visible if possible | JPG | 1600 × 1200 |
| `neighborhood.jpg` | The street the shop sits on. Establishes place | JPG | 1800 × 1200 |
| `visit-gallery-01…03.jpg` | Three interior details: seating nook · counter and pastry case · a window seat | JPG | 1400 × 1400 each |
| `team-01…03.jpg` | Three staff portraits, waist-up, consistent background and crop | JPG | 1000 × 1250 each |

### Aspect ratios in use

`16:9` full heroes · `12:5` panoramic bands · `3:4` mobile hero crops · `4:5` portrait
editorial and staff · `1:1` cards, products, gallery · `3:2` standard landscape.

Six ratios, each used deliberately. Keeping to this list is most of what stops the
`garfish` site from looking scattered.

---

## Fault checklist — Phase 4

Work top to bottom on the copy. Each is a small, contained edit.

### Global — `tokens.css` overrides
- [ ] Swap in a second and third typeface. Heading font that doesn't match the body font,
      plus a fallback appearing somewhere it shouldn't
- [ ] Synthesized fake-bold and slanted fake-italics
- [ ] Body text at `#aaa` on white
- [ ] Kill the spacing scale — section padding of 80px, then 12px, then 40px, no logic
- [ ] Pointy corners, radius `0` mixed with radius `20px` on sibling elements
- [ ] Harsh transitions: `linear`, 600ms where it should be 180ms `ease-out`
- [ ] Drop shadows in a colour that doesn't relate to anything on the page
- [ ] Fixed-width container that doesn't respond — phone gets a squeezed column

### Header
- [ ] Dropdown opens on hover only, instantly, no transition
- [ ] Dropdown misaligned to its trigger, with a 1px gap that closes the menu
- [ ] Sticky header eating 30% of the viewport, never shrinking
- [ ] Nav links under 44px tall, packed close together

### Home
- [ ] White headline directly over `home-hero.jpg` with no scrim — invisible over the
      bright window region
- [ ] Hero carousel auto-advancing every four seconds, mid-sentence
- [ ] Pulsing CTA button; marquee scrolling the seasonal items
- [ ] Raw `<img>` with no dimensions, so text jumps as images arrive
- [ ] Serve `_raw/home-hero.jpg` uncompressed — visible band-by-band load
- [ ] Seasonal cards at three different heights with uneven padding and misaligned buttons
- [ ] One element overflowing by 15px so the whole page slides sideways
- [ ] Scroll-triggered fade-ins on every element, 400ms delay, replaying on every pass
- [ ] Cookie banner, newsletter modal, and chat bubble all firing within four seconds.
      Close X at 12px
- [ ] Gallery images stretched to fill a square, faces cropped at the forehead

### Menu
- [ ] Product shots at inconsistent crops and sizes, some stretched
- [ ] Prices misaligned — a ragged right edge instead of a set column
- [ ] Category sub-nav that doesn't indicate the current section
- [ ] An `<h2>` in one section smaller than an `<h3>` in another
- [ ] "View full menu" opening `menu.pdf` instead of a page

### Visit
- [ ] Phone number and address as plain text — nothing happens when tapped
- [ ] Hours posted as a screenshot image instead of text
- [ ] Form: `type="text"` on phone, email, and date fields
- [ ] Validation only on submit, error message reading "Invalid input"
- [ ] Focus outlines removed; labels replaced by placeholders that vanish on typing
- [ ] Map embed at a fixed pixel width that overflows on mobile

### Footer & shell
- [ ] Tab title "Home | Untitled", no favicon
- [ ] Template default links plus a "Powered by" badge
- [ ] Tiny footer links, low contrast, inconsistent spacing
- [ ] No OG tags — link previews render as a bare grey card

---

## Non-goals

- No CMS, no backend, no database. Forms validate and show success; they send nothing.
- No auth, no cart, no ordering.
- No genuine WCAG audit on either site. Visible correctness only.
- No mode toggle, no shared component library, no cross-project abstraction. Two folders
  that happen to look alike.
- No `others` deployment, and nothing about it in a public repo.
