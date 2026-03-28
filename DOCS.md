# DrinkCost — Feature Documentation
Last updated: 2026-03-28

## Tab 1 — Cost Sheet (Fiche Technique / Ficha Técnica)

### Inputs
| Field | Description |
|---|---|
| Cocktail name | Free text — triggers error if empty on calculate |
| Selling price | Numeric — used for food cost % and margin calculations |
| Category | Select: Classic / Signature / Mocktail / Champagne / Shot |
| Glass | Free text (e.g. Coupe, Highball) |
| Method | Select: Direct, Shaker, Mixing glass, Blender, Infusion, Carbonation, Multi-technique |
| Target food cost (%) | Numeric — used to compute suggested price |
| Garnish cost | Numeric — added to overhead |
| Ice cost | Numeric — added to overhead |
| Labor cost | Numeric — togglable on/off |
| VAT (%) | Numeric — used for net margin calculation |
| Waste / spillage rate | Togglable — adds a % overhead to material cost |

### Liquid Ingredients (repeatable rows)
| Field | Description |
|---|---|
| Ingredient name | Free text |
| Quantity | Numeric (dose used) |
| Unit | Select: ml / cl / g |
| Bottle format | Select: 8 presets (20cl to 150cl) + custom volume |
| Bottle cost | Numeric — dose cost computed automatically |

### Fresh & Solid Ingredients (repeatable rows)
| Field | Description |
|---|---|
| Product name | Free text |
| Unit | Select: g / kg / pieces |
| Pack weight (g) | Numeric |
| Pack price | Numeric |
| Qty used | Numeric — dose cost computed as (qty/pack_weight) × pack_price |

### Outputs
| Output | Description |
|---|---|
| Material cost | Sum of all dose costs |
| Selling price | Entered by user, displayed in KPI bar |
| Food cost % | material_cost / selling_price × 100 |
| Gross margin | selling_price − material_cost |
| Net margin | Gross margin adjusted for VAT (togglable display) |
| Margin bar | Visual color indicator (green/orange/red) |
| Ingredient table | Full breakdown with individual dose costs |
| Recommendation text | Dynamic text based on food cost vs target |
| Suggested price | selling_price needed to hit target food cost % |
| Complexity indicator | 5-bar visual linked to preparation method |

### Buttons
- **Calculate** — runs all calculations and shows results
- **+ Add liquid / + Add fresh** — appends a new ingredient row
- **Print** — browser print dialog
- **New sheet** — resets the form
- **Copy summary** — copies cost/price/FC/margin text to clipboard
- **Analyze profitability** — pre-fills Tab 2 and switches to it

---

## Tab 2 — Profitability (Rentabilité / Rentabilidad)

### Inputs
| Field | Description |
|---|---|
| Cocktail name | Optional free text |
| Selling price | Numeric |
| Total material cost | Numeric (auto-filled from Tab 1 if using "Analyze" button) |
| Service type | Select: Standard bar / Gastro-hotel / High-volume / Event (shows pax field) |
| Service duration (h) | Numeric |
| Expected guests (pax) | Numeric — visible only for Event type |
| Cocktails sold / evening | Numeric estimate |
| Break-even (calculated) | Read-only output |
| Method | Select — same options as Tab 1 |
| Prep time (min) | Numeric — pre-filled by method default |
| Bartender hourly rate | Numeric |
| Bartender cost / service | Numeric |
| Fixed costs / evening | Numeric |
| VAT (%) | Numeric |

### Outputs
| Output | Description |
|---|---|
| Gross margin / cocktail | selling_price − material_cost |
| Labor cost / cocktail | (hourly_rate × prep_time/60) |
| Net margin / cocktail | gross − labor, adjusted for VAT |
| Revenue / service | selling_price × qty |
| Break-even | fixed_costs / net_margin_per_unit |
| Net profit / service | net_margin × qty − fixed_costs |
| Total prep time | prep_time × qty (min) |
| Complexity | Visual bar + label based on method |
| Recommendation text | Smart text comparing qty vs break-even |

---

## Global Features

### Currency
- 10 currencies: CHF, EUR, USD, GBP, CAD, XCD, MAD, AED, JPY, AUD
- Auto-detected on init via timezone + navigator.language
- All monetary labels update dynamically via `.cur-label` spans and `curSym()`
- Selector in header

### Language (i18n)
- 3 languages: FR / EN / ES
- Auto-detected on init via navigator.language
- Manual override via pill buttons FR / EN / ES in header
- Full translation: labels, placeholders, helpers, dropdowns, dynamic texts, error messages
- GA4 event fired on manual language change

### SEO
- Static: canonical, robots, hreflang (fr/en/es/x-default), Open Graph, Twitter Card, Schema.org WebApplication
- Dynamic: `document.title`, meta description, og:title, og:description, og:locale — all updated by `applyTranslations()` on every language change

### Responsive
- Mobile < 640px: stacked single-column layout
- Tablet < 900px: adapted grid
- 44px touch targets on all interactive elements
- font-size: 16px on inputs (prevents iOS auto-zoom)

### Analytics
- Google Analytics 4 — ID: G-CBMJ6CRX0N
- Custom event: `language_change` with `{language}` parameter

### Footer
- CGU / Terms of use link → terms.html (label translated per active language)

---

## Changelog
2026-03-27 — Initial build: full app (Tab 1 + Tab 2), trilingual, multi-currency, GA4, terms.html
2026-03-28 — SEO meta tags: meta description, Open Graph, Twitter Card, hreflang (fr/en/es/x-default), Schema.org WebApplication, dynamic title/meta update per language via applyTranslations()
2026-03-28 — FAQ section: FAQ.md créé (12 Q&A × FR/EN/ES) + section accordion <details>/<summary> intégrée au site, rendue dynamiquement par applyTranslations()
2026-03-28 — SEO maximisation: preconnect/dns-prefetch hints, @import CSS → <link> consolidé (suppression render-blocking), <h1> sur header-sub, Schema.org enrichi (WebApplication featureList + Organization + FAQPage rich snippets), meta keywords dynamique par langue, theme-color / application-name / geo.region metas, sitemap.xml, robots.txt, SEO complet sur terms.html
2026-03-28 — OG image: og-image.jpg générée (1200×630px, Python Pillow, dark navy + amber) et déployée
2026-03-28 — Google Search Console: propriété https://drinkcost.bar/ vérifiée (via Google Analytics), sitemap.xml soumis manuellement
2026-03-28 — SEO content section: texte de référencement trilingue (FR/EN/ES) visible dans la page — <h2> + <p> intro + 2 articles <h3>/<p> ciblant les requêtes "calculer le coût d'un cocktail / cocktail cost / coste cóctel", rendu dynamique par applyTranslations()
2026-03-28 — No-JS SEO fallback: <title> FR par défaut, #faq-list pré-populé avec 12 Q&A FR en HTML statique (Google sans JS voit le contenu FR complet)
2026-03-28 — Audit SEO complet + optimisation P0→P3:
  P0: FAQPage JSON-LD pré-populé statiquement (rich snippets sans délai JS) ; H1 enrichi de "Cocktail" (FR/EN/ES) ; premier nav-tab data-i18n="tab_fiche" (traduction manquante) ; clé rr_unit_net ajoutée dans T.fr/en/es (fix affichage "undefined" onglet Rentabilité)
  P1: Keywords FR/EN/ES couvrant toutes les requêtes cibles (fiche recette cocktail, pour cost calculator, calcular costo coctel, food cost coctelería…) ; texte SEO enrichi avec les termes manquants (coût de revient d'une recette, drink cost, fiche technique bar, cocktail recipe costing, food cost coctelería)
  P2: Meta descriptions optimisées CTR ("30 secondes", "10 devises", "100% gratuit") ; bouton paramètres avancés traduit (data-i18n="l_adv") ; Google Fonts chargé en non-blocking (media="print" onload)
  P3: aria-labels sur lang-pill (role=group) et lang buttons ; role=tablist/tab sur nav-tabs
2026-03-28 — Favicon: favicon.png (32×32), favicon.ico (multi-size 16/32/48), apple-touch-icon.png (180×180) générés via Python Pillow — design amber rounded square sur fond navy avec silhouette verre cocktail
2026-03-28 — Fix snippet Google: <p id="intro-desc"> ajouté comme premier enfant de .app (avant <header>) — texte optimisé FR/EN/ES mis à jour par applyTranslations() pour guider l'extrait Google vers le bon texte plutôt que le placeholder des ingrédients frais
2026-03-28 — Pages dédiées SEO (maillage interne + longue traîne):
  food-cost-calculator.html — FR, cible "food cost cocktail", "fiche technique cocktail", "calcul marge bar" — 500+ mots, Schema WebApplication + FAQPage + BreadcrumbList, hreflang croisé
  cocktail-cost-sheet.html — EN, cible "cocktail cost sheet", "pour cost calculator free" — 550+ mots, tableau comparatif DrinkCost vs bar inventory software, Schema complet, hreflang croisé
  ficha-tecnica-coctel.html — ES, cible "ficha técnica cóctel", "calculadora food cost bar" — 500+ mots, liste numérotée pas à pas, og:locale:alternate es_MX + es_AR, Schema complet, hreflang croisé
2026-03-28 — sitemap.xml mis à jour: 3 nouvelles URLs (priority 0.8) avec xhtml:link hreflang pour chaque page dédiée
2026-03-28 — index.html footer: liens internes discrets vers les 3 pages dédiées (Calculateur Food Cost · Cocktail Cost Sheet · Ficha Técnica Cóctel)
