# CLAUDE.md — DrinkCost Development Rules

Read CONTEXT.md before every session. These rules apply permanently and without exception.

---

## 1. Plan before acting

Before writing a single line of code, state:
- What you are changing and why
- Which files are affected
- What could break as a side effect
- How you will verify it works

If the task affects more than one function or 20+ lines, write the full plan first and wait for confirmation before proceeding.

---

## 2. Automatic code review before every commit

Before committing any change, run a mandatory self-audit across 5 dimensions:

**Functionality** — Does the change work as intended? Trace every code path mentally, including edge cases (empty inputs, zero values, missing translations, currency changes mid-session).

**Translations** — Is every new user-facing string present in T.fr, T.en AND T.es? Is it handled in `applyTranslations()`? Does it use the correct attribute (`data-i18n`, `data-i18n-cur`, `data-i18n-cur-h`, `data-i18n-ph`, `data-i18n-opt`)?

**Currency** — Is every monetary value using `curSym()` in JS and `<span class="cur-label">` in HTML? Zero hardcoded CHF, EUR, $ or any symbol.

**Responsive** — Does the change display correctly at 320px, 640px, and 940px? Any overflow, broken grid, or unclickable element?

**Consistency** — Does the change align with the existing design system, naming conventions, and code architecture? No new colors, no new fonts, no new libraries.

Only commit when all 5 pass. If any fails, fix it first.

---

## 3. Coherence analysis on every change

Before finalizing any modification, cross-check it against the full codebase:

- If you modify a function, identify every place it is called and verify each call still works
- If you add a new HTML element, verify it has the correct i18n attributes and is handled in `applyTranslations()`
- If you change a CSS variable or class, grep for every usage of that variable/class
- If you modify the calculation logic, verify the result display, the recommendation text, the copy summary, and the GA event all still receive correct values
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

A file `FAQ.md` must exist at the root. It represents the user-facing FAQ that will eventually appear on the website. Update it whenever:
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

## 6. One commit per completed feature

Commit immediately after each self-contained change with a clear conventional commit message:
- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code restructuring without behavior change
- `docs:` for DOCS.md or FAQ.md updates
- `style:` for CSS/design changes only
- `i18n:` for translation additions or fixes

Never batch unrelated changes in one commit. Never commit broken code.

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

- `index.html` must remain a single file loadable in under 1 second on a 4G connection
- No new external JS libraries without explicit approval
- When `index.html` exceeds 1800 lines, propose splitting into `i18n.js`, `currency.js`, `calc.js` — but only refactor when explicitly asked
- Google Fonts are already loaded — do not add more font imports
- All images (if any added in future) must be optimized and served via CDN

---

## 9. SEO discipline on every HTML change

- Every new visible text block must use semantic HTML (`<h2>`, `<p>`, `<section>`, `<article>`) where appropriate
- Every new page or major section must have a corresponding meta description update
- Never remove existing `alt`, `aria-label`, or semantic attributes
- When adding content that contains target keywords (cocktail, food cost, bar, cost sheet, fiche technique), ensure it appears in natural readable text — not just inside JS strings

---

## 10. Communication standard

At the end of every task, provide a structured summary:

```
✅ Done: [what was completed]
📁 Files modified: [list]
🌍 Translations: [confirmed FR/EN/ES or flagged if uncertain]
💱 Currency: [confirmed dynamic or flagged]
📱 Responsive: [confirmed or flagged]
🔗 Coherence: [what was cross-checked]
📄 DOCS.md: [updated / not needed]
❓ FAQ.md: [updated / not needed]
⚠️ Watch out: [anything that could cause issues later]
```

Never end a session without this summary. If something is uncertain or incomplete, say so explicitly — never assume it works without verification.
