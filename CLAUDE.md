# CLAUDE.md — DrinkCost Development Rules

Read CONTEXT.md before every session. These rules apply permanently and without exception.

The owner works mostly from his phone: he reviews pull requests and Netlify deploy previews on mobile, then merges. Everything below is designed around that loop.

---

## 1. Plan before acting

Before writing a single line of code, state:
- What you are changing and why
- Which files are affected
- What could break as a side effect
- How you will verify it works

If the task affects more than one function or 20+ lines, write the full plan first and wait for confirmation before proceeding. The plan goes in the chat or in the PR description — short enough to read on a phone.

---

## 2. Automatic code review before every PR

Before opening or updating a PR, run a mandatory self-audit across 5 dimensions:

**Functionality** — Does the change work as intended? Trace every code path, including edge cases (empty inputs, zero values — a legitimate 0 must never fall back to a default —, missing translations, currency changes mid-session, ml/oz switch mid-session).

**Translations** — Is every new user-facing string present in T.fr, T.en AND T.es? Is it handled in `applyTranslations()`? Does it use the correct attribute (`data-i18n`, `data-i18n-cur`, `data-i18n-cur-h`, `data-i18n-ph`, `data-i18n-opt`)? No raw internal key (e.g. `verre-melange`) may ever reach the screen.

**Currency & numbers** — Every monetary value uses `curSym()` in JS and `<span class="cur-label">` in HTML. Zero hardcoded CHF, EUR, $ or any symbol. Every displayed number goes through the shared formatter (rule 11).

**Responsive — verified visually, not mentally** — Render the affected pages in headless Chrome with the real fonts and look at screenshots at 320px, 390px, 640px and 940px, in at least FR and EN. Any overflow, wrapped number, broken grid or unclickable element blocks the PR.

**Consistency** — Does the change align with the existing design system, naming conventions and code architecture? No new colors, no new fonts, no new libraries.

Only open the PR when all 5 pass. If any fails, fix it first.

---

## 3. Coherence analysis on every change

Before finalizing any modification, cross-check it against the full codebase:

- If you modify a function, identify every place it is called and verify each call still works
- If you add a new HTML element, verify it has the correct i18n attributes and is handled in `applyTranslations()`
- If you change a CSS variable or class, grep for every usage of that variable/class
- If you modify the calculation logic, verify the result display, the recommendation text, the copy summary, the print view, the saved-recipe reload and the GA event all still receive correct values
- If a definition appears in several places (e.g. "net margin" in Tab 1, Tab 2, FAQ × 3 languages), all of them change together
- State explicitly: "This change affects X, Y, Z — I have verified all three."

---

## 4. Maintain DOCS.md automatically

A file `DOCS.md` must exist at the root and be kept up to date. After every session that adds, modifies or removes a feature, update DOCS.md to reflect the current state of the product.

DOCS.md structure:
```
# DrinkCost — Feature Documentation
Last updated: [date]

## Tab 1 — Cost Sheet
[List every input, output, toggle, and calculation with a one-line description]

## Tab 2 — Profitability
[Same]

## Global Features
[Currency, language, responsive, analytics, CGU link]

## Changelog
[Date] — [What changed]
```

If DOCS.md does not exist at the start of a session, create it immediately before doing anything else.

---

## 5. Maintain FAQ.md automatically

A file `FAQ.md` must exist at the root. It is the source of the user-facing FAQ shown on the website (in-app accordion, static HTML fallback and FAQPage JSON-LD must stay in sync with it). Update it whenever:
- A new feature is added that users might not understand
- A calculation changes in a way that affects user expectations
- A new language or currency is added
- A bug is fixed that was causing user confusion

FAQ.md structure:
```
# DrinkCost — FAQ
Last updated: [date]
Languages: FR / EN / ES (maintain all three)

## FR
Q: ...
A: ...

## EN
Q: ...
A: ...

## ES
Q: ...
A: ...
```

Minimum 10 questions per language. Add new questions proactively — do not wait to be asked.

---

## 6. Git workflow — branch, PR, preview, owner merges

Netlify deploys `main` to production on every push. Therefore:

- **Never commit directly to `main`.** Every piece of work happens on a branch (`fix/…`, `feat/…`, `seo/…`, `legal/…`, `chore/…`).
- Open a pull request. Netlify builds a **deploy preview** for it; put the preview link and the screenshots from rule 2 in the PR description.
- **Only the owner merges.** Merging is the production deploy.
- Inside a branch, one commit per self-contained change, with a conventional message:
  - `feat:` new features · `fix:` bug fixes · `refactor:` no behavior change · `docs:` DOCS.md / FAQ.md / rules · `style:` CSS/design only · `i18n:` translations · `seo:` · `legal:` · `chore:` config / tooling
- Never batch unrelated changes in one commit. Never push broken code, even to a branch.
- When JS changes, bump the `?v=` query on the three script tags (cache busting).

---

## 7. Preserve the design system absolutely

- **Colors**: only CSS variables from `:root` — never hardcode hex values
- **Fonts**: Plus Jakarta Sans (UI), Playfair Display (titles/numbers), JetBrains Mono (values/code) — no others
- **Spacing**: use existing patterns — no arbitrary px values without justification
- **Border radius**: `var(--radius)` (10px) for cards, `var(--radius-sm)` (6px) for inputs/buttons
- **No external CSS libraries** — no Bootstrap, no Tailwind, no new CDN dependencies
- **Dark mode only** — the design is intentionally dark, do not introduce light backgrounds

---

## 8. Performance discipline

- The app must remain loadable in under 1 second on a 4G connection
- The JS lives in three modules loaded at the end of `<body>` in this exact order: `currency.js` → `i18n.js` → `calc.js` (init code runs at the end of calc.js). Never reinline them into index.html and never change the load order
- New code goes in the right module: user-facing strings in `i18n.js` (object T), currency/unit/number-format logic in `currency.js`, business logic and DOM wiring in `calc.js`
- No new external JS libraries without explicit approval
- **Fonts**: Google Fonts is currently loaded from Google's CDN. This is scheduled to move to self-hosted font files (privacy — rule 12). Never add a font import; when touching fonts, self-host
- Images must be optimized (WebP/AVIF where possible, explicit width/height)

---

## 9. SEO discipline on every HTML change

- Every new visible text block uses semantic HTML (`<h2>`, `<p>`, `<section>`, `<article>`) where appropriate
- Each page's `<title>` and meta description are written **entirely in that page's language** — no mixed-language titles
- One canonical URL form per page; internal links, canonical, hreflang and sitemap all use that same form
- hreflang clusters are reciprocal and self-referencing
- Update `<lastmod>` in sitemap.xml with the real date of any page change
- Never remove existing `alt`, `aria-label`, or semantic attributes
- When adding content that contains target keywords (cocktail, food cost, pour cost, bar, cost sheet, fiche technique, ficha técnica), ensure it appears in natural readable text — not just inside JS strings
- No unverifiable marketing claims ("the only…", "the best…")

---

## 10. Communication standard

The structured summary goes **in the PR description** (the owner reads it on his phone before merging):

```
✅ Done: [what was completed]
📁 Files modified: [list]
🌍 Translations: [confirmed FR/EN/ES or flagged if uncertain]
💱 Currency & numbers: [confirmed dynamic / formatted or flagged]
📱 Responsive: [screenshots attached — widths checked]
🔗 Coherence: [what was cross-checked]
📄 DOCS.md: [updated / not needed]
❓ FAQ.md: [updated / not needed]
🔍 Preview: [Netlify deploy preview link]
⚠️ Watch out: [anything that could cause issues later]
```

In chat, keep it to the outcome and the link. If something is uncertain or incomplete, say so explicitly — never assume it works without verification.

---

## 11. Number formatting

- Every number shown to the user (money, percentages, quantities) is formatted with `Intl.NumberFormat` using the active language and currency — through one shared helper, never ad-hoc `toFixed()` in display code
- FR/ES use a decimal comma (`1,64 €`, `11,1 %`); EN-US puts the symbol first (`$1.99`)
- Displayed precision: 2 decimals for money everywhere, except per-dose cost in the ingredient detail table (3 decimals allowed)
- Inputs accept both `,` and `.` as decimal separator (`inputmode="decimal"`)
- Calculations use raw numbers; formatting happens only at display time

---

## 12. Legal & privacy

- The publisher is established in France (Guadeloupe): French law, GDPR and CNIL rules apply
- **No new tracker, cookie, third-party script, font, embed or external request** without explicit owner approval — each one is a privacy and legal decision, not a technical one
- Anything stored in localStorage stays local; never send recipes, prices or user input to any server or analytics event payload
- Legal pages (terms, legal notice, privacy) exist in FR / EN / ES and stay in sync with what the site actually does — if a change alters data handling, the privacy text changes in the same PR

---

## 13. Security

- `netlify.toml` holds the security headers and the rules that hide repository internals (`.claude/`, `*.md`, `netlify.toml`). Any new internal file at the root must be added to those 404 rules
- Any new external resource requires updating the Content-Security-Policy once it exists (Phase 5)
- Never put secrets, tokens or API keys in the repository — the site is fully static and needs none
- User input is never injected as HTML: use `textContent`, not `innerHTML`, for anything the user typed

---

## 14. Minimal code

Write the least code that correctly solves the problem — the way an experienced developer avoids the superfluous.

- Prefer changing or deleting existing code over adding new code
- No speculative abstractions, options, or "future-proofing" nobody asked for
- No new helper when an existing one fits; no duplicated logic
- A fix touches only what the bug requires
- If a change grows past what the task needs, stop and say so before continuing

---

## 15. Project skills

`.claude/skills/` contains vetted third-party skills (MIT, licenses alongside), loaded automatically in every session on this repository:

| Skill | Use it for |
|---|---|
| `web-quality-audit` | Full audit before a release or when asked to audit the site |
| `performance`, `core-web-vitals` | Load time, LCP / INP / CLS work |
| `accessibility` | Any UI change; WCAG 2.2 checks |
| `seo` | Titles, meta, hreflang, structured data, sitemap |
| `best-practices` | Modern web practices, security basics |
| `security-and-hardening` | Headers, CSP, input handling, legal/privacy-sensitive changes |
| `shipping-and-launch` | Pre-merge checklist for anything user-visible |

These skills are guidance. When a skill conflicts with this file, **this file wins**. Sources: `addyosmani/web-quality-skills`, `addyosmani/agent-skills` — update them only deliberately, in a `chore:` PR.
