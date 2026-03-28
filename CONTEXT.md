# DrinkCost — Project Context

## Overview
DrinkCost is a professional cocktail cost calculation SaaS tool for bar managers and mixologists.
Live at: **https://drinkcost.bar**
Built in a single day (March 27, 2026) — prototype to live product.

---

## Stack & Infrastructure

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML / CSS / JS — single file (`index.html`) |
| Hosting | Netlify (free tier) — auto-deploy from GitHub |
| Repo | GitHub — repository name: `drinkcost` |
| Domain | `drinkcost.bar` via Infomaniak (DNS Fast Anycast) |
| Analytics | Google Analytics 4 — ID: `G-CBMJ6CRX0N` |
| Email | `contact@drinkcost.bar` via Infomaniak |

---

## Files

```
/
├── index.html       # Main tool — 1500+ lines, full app
├── terms.html       # CGU / Terms of Use — trilingue
├── CONTEXT.md       # This file
├── CLAUDE.md        # Claude Code rules
```

---

## Features Implemented

### Tab 1 — Fiche Technique (Cost Sheet)
- Cocktail info: name, selling price, category, glass, method
- **Liquid ingredients**: name, quantity, unit (ml/cl/g), bottle format (8 presets + custom volume), bottle cost → auto dose cost
- **Fresh ingredients**: product, unit (g/kg/pieces), pack weight, pack price, qty used → auto dose cost with % of pack used
- Parameters: target food cost %, garnish cost, ice cost, labor cost (toggle on/off), VAT %
- Advanced params (collapsible): waste/spillage rate (toggle + % input)
- Results: material cost, selling price, food cost %, gross margin, net margin (toggle), margin bar, ingredient table, recommendation text, suggested price
- Complexity indicator (5 bars) linked to preparation method
- Print, new sheet, copy summary buttons

### Tab 2 — Rentabilité (Profitability)
- Cocktail params: name, selling price, total material cost
- Service type: standard bar, gastro/hotel, high-volume, event (with pax count)
- Technique & time: method, prep time (min), bartender hourly rate
- Fixed costs: staff cost/service, fixed costs/evening, VAT
- Results: gross margin/cocktail, labor cost/cocktail, net margin/cocktail, revenue/service, break-even, net profit/service, total prep time, complexity
- Auto break-even calculation
- Smart recommendation based on qty vs break-even

### Global Features
- **Currency selector**: 10 currencies (CHF, EUR, USD, GBP, CAD, XCD, MAD, AED, JPY, AUD) — auto-detected by timezone/locale — all labels update dynamically including embedded currency in field labels
- **Trilingue FR/EN/ES**: full translation including labels, placeholders, helpers, error messages, dynamic recommendation texts, dropdown options, tfoot labels, complexity text — auto-detected by browser language — lang pill buttons FR/EN/ES
- **Responsive**: mobile (<640px) stacked layout, tablet (<900px) adapted grid, 44px touch targets, iOS zoom prevention (font-size: 16px on inputs)
- **Design**: dark navy theme (#0d1117), amber accent (#e8a020), Plus Jakarta Sans + Playfair Display + JetBrains Mono, CSS variables throughout
- **Google Analytics**: GA4 tag + language_change event tracking
- **CGU link**: footer with translated link to terms.html

### terms.html
- Full Terms of Use in FR / EN / ES
- Same design system as index.html
- Auto language detection
- Sections: purpose, description, IP protection, data privacy, liability, acceptable use, jurisdiction (Neuchâtel, Swiss law)

---

## i18n Architecture

```javascript
const T = { fr: {...}, en: {...}, es: {...} }
let currentLang = 'fr';
function t(key, ...args) // returns string or calls function with args
function setLang(lang, btn) // switches lang + calls applyTranslations()
function detectLang() // reads navigator.language on init
function applyTranslations() // updates all data-i18n, data-i18n-cur, data-i18n-cur-h, data-i18n-ph, panel titles, dropdowns, tfoot labels, complexity text
```

**Translation attributes:**
- `data-i18n="key"` — simple text replacement
- `data-i18n-cur="key"` — text + embedded currency symbol: `Label (€)`
- `data-i18n-cur-h="key"` — text + currency + /h suffix: `Label (€/h)`
- `data-i18n-ph="key"` — placeholder translation
- `data-i18n-panel="key"` — panel title with icon preservation
- `data-i18n-opt="key"` — select option translation
- `data-cplx-key="method"` — complexity text element, refreshed on lang change

---

## Currency Architecture

```javascript
const CURRENCIES = { CHF, EUR, USD, GBP, CAD, XCD, MAD, AED, JPY, AUD }
let currentCurrency = 'CHF';
function curSym() // returns current symbol
function setCurrency(code) // updates all .cur-label spans + calls applyTranslations()
function detectCurrency() // reads timezone + navigator.language on init
```

All monetary values in JS use `curSym()`. All static CHF in HTML use `class="cur-label"` or embedded `<span class="cur-label">CHF</span>`.

---

## Complexity System

```javascript
const CPLX = {
  'direct':        {lvl:1, key:'direct', t:2},   // prep time default
  'shaker':        {lvl:2, key:'shaker', t:3},
  'verre-melange': {lvl:3, key:'verre-melange', t:4},
  'blender':       {lvl:2, key:'blender', t:3},
  'infusion':      {lvl:4, key:'infusion', t:10},
  'carbonation':   {lvl:4, key:'carbonation', t:8},
  'multi':         {lvl:5, key:'multi', t:7},
}
// T[currentLang].cplx[key] for translated label
// T[currentLang].cplx_levels[lvl] for level name
// element.dataset.cplxKey stores key for lang refresh
```

---

## Analytics — First 24h Data

- **25 users, 6 countries**: USA 64%, Switzerland 12%, Guadeloupe 8%, France 4%, Ireland 4% + 1 unidentified
- **Switzerland**: best engagement — 24s avg session, 100% engaged sessions
- **3810 requests/hour** at peak (mostly crawlers — good for SEO)
- **0% errors**
- Users on EN version (Cost Sheet) AND FR version simultaneously

---

## What's Pending / Next Steps

### Immediate
- [ ] Add SEO meta tags (title, description, OG, Twitter cards) in 3 languages
- [ ] Register drinkcost.com when revenue justifies (~3 months)
- [ ] File trademark "DrinkCost" at IGE (Swiss IP Institute) ~550 CHF

### V2 — After first user feedback
- [ ] User accounts + data persistence (recipes saved)
- [ ] PDF export of cost sheets
- [ ] Recipe library / ingredient database with pre-filled prices
- [ ] Monetization: freemium (3 free sheets → paid unlimited) at 9-19 CHF/month

### SEO Content
- [ ] Landing page text with target keywords
- [ ] FAQ section
- [ ] Blog/guide: "comment calculer le food cost d'un cocktail"

---

## Business Context

**Founder**: Jordan Haniecki — Senior bar manager & mixologist, 7+ years luxury hospitality (5-star hotels Switzerland & Caribbean), based in Neuchâtel, Switzerland.

**Co-concept**: Dimitri Daninthe (mixologist)

**Target users**: Bar managers, head bartenders, F&B directors in independent bars, hotels, restaurants, event companies — worldwide.

**Positioning**: The only trilingual cocktail cost tool built by a professional for professionals. Competitors (Bevspot, MarketMan, PourCost) are English-only, US-centric, overcomplicated and expensive.

**Revenue model**: Freemium SaaS — free basic tool drives organic acquisition, premium subscription for save/export/library features.

**Current domain**: `drinkcost.bar` — intentional, memorable, industry-specific extension.
**drinkcost.com**: taken, listed at ~3600 CHF — defer purchase until revenue justifies.
