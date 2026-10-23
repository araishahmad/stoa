# Stoa visual direction and assets

## Editorial direction

Stoa is a multi-topic publication starting with Technology, Relationships, and
Culture. All current articles and images are demonstration material, not a
publish-ready editorial library.

The owner rejected both oversaturated illustrations and the subsequent quiet,
stock-style photographs. This pass follows the request for attention-grabbing
Gen-Z imagery and noticeable modern animation: an independent digital magazine
with flash portraits, street-style friendships, chrome, retro hardware, and zines.

## Design system

- Palette: ink `#171717`, paper `#fafafa`, cobalt `#3246ee`, lilac
  `#eeedff`, rose `#ffe8ef`, and yellow `#ffe58f`. Existing centralized
  tokens are retained; imagery supplies the new character.
- Typography: locally hosted Instrument Sans regular and bold. The large
  headline and staggered word entrance are the opening typographic gesture.
- Layout: retain the asymmetric featured-story composition, enlarge the hero
  image slightly, add a tilted editorial sticker, then a moving topic ribbon.
  Supporting stories each get a distinct image. Articles keep a stationary
  reading column; the admin remains task-oriented.
- Brand: existing lowercase wordmark and cobalt asterisk. Icons come from
  react-icons, not custom SVG paths.

## Motion behavior

No animation library or third-party tracking was added.

- The hero words, asterisk, and sticker make a finite, coordinated entrance.
- `InteractiveArt` applies at most three degrees of pointer-responsive tilt on
  fine-pointer devices. It resets on pointer exit, focus leaving, window blur,
  page hiding, and reduced-motion changes.
- `TopicRibbon` moves decorative words in a 32-second loop with an explicit
  Pause/Resume control. It starts static in server HTML and without JavaScript.
  Real category navigation remains outside the decorative, aria-hidden ribbon.
- `ScrollComposition` gives topic cards a one-time staggered paper-fan settle.
  It never hides content and cancels movement when a visitor focuses or presses
  a card. Missing browser APIs degrade to the normal static grid.
- Story artwork scales gently on hover and keyboard focus; arrows and the brand
  asterisk respond to interaction. Touch screens do not depend on hover to show
  the card's directional cue.
- Reduced-motion preferences stop automatic movement and disable interaction
  transforms. The ribbon cannot override that preference.
- Pages remain server-rendered. Only motion leaves are client components, receiving
  server-rendered children. No cookies or local storage are used by these effects.

See `scripts/verify-motion.mjs` for source-level SSR and lifecycle checks;
these do not replace actual browser checks.

## Responsive implementation

- Fluid page gutters and type, a stacked featured section on phones, and
  single-column story/topic cards at narrow widths.
- Focal-point image crops, stable image aspect ratios, and a vertically stacked
  Culture feature on the smallest phone widths.
- Mobile navigation, wrapping category filters, and a stacked article sidebar.
  Article body text uses 17 px with generous line spacing on phones.
- At least 44 px targets for icon buttons, category filters, mobile navigation,
  table-of-contents links and admin utility actions. Dialog close buttons do
  not shrink when a heading wraps.
- Mobile and coarse-pointer form inputs use 16 px text. Admin tables scroll
  inside a labeled, keyboard-focusable region; long titles and queries wrap.
- Desktop pointer tilt is disabled for touch interaction. Automatic motion
  respects reduced-motion preferences, with a visible ribbon pause control.

These behaviors are implemented and source-reviewed. See `docs/verification.md`
for the remaining live mobile/browser checks; all-device validation is not claimed.

## Generated images

Mode: **built-in image-generation tool**, not the CLI/API fallback.
All eight images were visually inspected. Actual source dimensions are
**1536 × 1024 pixels**, with no artificial enlargement. Public delivery uses
responsive next/image output at quality 90; the image endpoint caps large
requests at the source resolution.

These are AI-generated illustrative scenes. Fictional people are not authors,
testimonials, or evidence of real events/product testing. Existing preview
disclosures remain visible.

| Asset under `frontend/public/images/` | Article / purpose |
| --- | --- |
| `stoa-genz-attention.png` | Attention / homepage hero |
| `stoa-genz-conversation.png` | Conversations / relationships lead |
| `stoa-genz-weird-web.png` | Beautifully weird internet / Culture / About |
| `stoa-genz-phone.png` | Intentional phone habits |
| `stoa-genz-plans.png` | Making plans with friends |
| `stoa-genz-paper.png` | Reaching for paper |
| `stoa-genz-friendship.png` | Friendship beyond the group chat |
| `stoa-genz-tools.png` | Tools worth your time |

`Story.imagePosition` preserves focal points in different crops. People use
`50% 35%`; still lifes use `50% 50%`. New asset names avoid stale image
caches. Original generated outputs remain in the image-generation archive.

## Exact final prompt set

Each complete prompt is `Use case: <type>. `, followed by the shared brief,
one space, and its image-specific direction below.

### Shared brief

Create a high-end original Gen-Z independent magazine editorial image for the Stoa blogging website. Landscape 1536x1024. Visually arresting, stylish, strong composition, crisp focus and material detail, polished not generic stock. Controlled contrast, cool silver/graphite with deliberate cobalt and dusty lilac accents; no neon wash, no oversaturation, no blurry focus, no heavy grain. No typography, logos, watermarks, recognizable brands or celebrities. Compose the central subject safely for 16:9 landscape crops.

### attention

Use case: photorealistic-natural.

Close editorial portrait of a fictional stylish young adult with short textured dark hair, futuristic silver over-ear headphones and slim translucent wraparound sunglasses, black technical jacket. Head and shoulders centered, thoughtful confident expression looking slightly past camera. Cool dusk urban concrete background with one soft cobalt light reflection. Direct-flash fashion photography, extremely sharp face, headphone metal and jacket weave. Landscape headroom, whole headphones visible. The image should communicate choosing your own attention, not sitting at a desk.

### conversation

Use case: photorealistic-natural.

Two fictional friends in their mid-twenties in a late-night laundromat, sitting beside each other in front of circular stainless washing-machine doors, turned toward each other in an unposed funny conversation. One wearing a cobalt cardigan over white tee, the other a charcoal denim jacket. Natural believable faces and hands, expressive smiles, a candid genuine connection. Wide medium shot, both fully inside central frame, straight-on direct flash photography, silver metal reflections, fashion-zine style. Not posed corporate stock, no coffee table.

### weird-web

Use case: stylized-concept.

Surreal Y2K internet culture still life shot like a luxury fashion editorial: a translucent smoky-lilac CRT desktop computer centered on a brushed aluminum surface, its screen displays a glossy three-dimensional chrome asterisk sculpture against deep blue; a translucent wired mouse and one small cobalt glass orb alongside. Tangible photoreal materials, angular camera, hard precise shadows, neutral grey studio backdrop. Cool chrome detail, imaginative and witty, not a toyish 3D SaaS illustration. Entire monitor visible safely in center with room around it.

### phone

Use case: photorealistic-natural.

Sharp overhead fashion-editorial still life of a graphite smartphone face down, silver wired earphones with sculptural cable loop, and translucent smoke-grey sunglasses on a textured cobalt-grey concrete surface. Small folded black denim edge in one corner. Strong diagonal art direction, one bright daylight patch, controlled cool silver tones, tactile details. Minimal interesting object arrangement like a youth culture magazine, no visible text or logos.

### plans

Use case: photorealistic-natural.

Three fictional adult friends in their twenties hanging out casually on outdoor concrete city steps, relaxed baggy denim, one slate-blue sweater, one lilac T-shirt, one charcoal overshirt. Captured laughing mid-conversation in a medium-wide direct-flash editorial photograph at blue hour. Real personality, authentic candid body language, central composition with whole faces and natural hands. Crisp details, quiet urban background, no drinks or nightlife advertising.

### paper

Use case: photorealistic-natural.

Overhead creative zine-making desk, open off-white sketchbook with bold cobalt cut-paper shapes and black abstract drawings, small black-and-white contact photographs of generic urban architecture, silver scissors, graphite pencil, chrome binder clips. A folded purple translucent sheet introduces a cool lilac accent. Hard raking daylight, tactile paper edges and crisp detailed shadows, dynamic art-directed composition. No readable writing or recognizable logos, not a beige lifestyle desk.

### friendship

Use case: photorealistic-natural.

Two glossy black-and-white photo-booth strips on a brushed steel tabletop. Each strip shows playful candid faces of the same three fictional adult friends in their twenties, laughing and pulling harmless funny expressions, contemporary streetwear. One translucent cobalt plastic star charm next to the strips, tiny lilac paper corner. Overhead macro studio photography, high-resolution crisp printed photographs and real paper texture, no lettering or logos. Central arrangement, generous crop-safe surrounding steel.

### tools

Use case: photorealistic-natural.

Close three-quarter editorial photograph of a compact translucent smoke-purple mechanical keyboard, silver trackball and brushed-metal stylus on a charcoal matte desk. A sculptural coiled silver cable runs through the composition. Strong diagonal composition, every key edge sharp, soft directional studio light and precise chrome highlights, tactile premium industrial materials. Blank keycaps without letters or branding. Quiet grey background, confident futuristic energy, no rainbow gamer lighting.
