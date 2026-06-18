# DrinkCost — Feature Documentation
Last updated: 2026-06-12

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
| Unit | Select: oz / cl / g (imperial) or ml / cl / g (metric) — follows active unit system |
| Bottle format | Select: 8 presets (200 ml to 1500 ml) + custom volume |
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
- **Load example (Negroni / Mojito / Spritz)** — pre-fills the entire form with a realistic recipe (name, category, glass, method, ingredients with doses and costs, parameters)
- **Save (💾)** — stores a full form snapshot in localStorage (`dc_recipes`, max 15); saved sheets appear in the "Mes fiches" panel above the form with Load / Delete actions; loading refills the form and recalculates

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
- 11 currencies: CHF, EUR, USD, GBP, CAD, XCD, MAD, AED, JPY, AUD, CNY
- Auto-detected on init via timezone + navigator.language
- All monetary labels update dynamically via `.cur-label` spans and `curSym()`
- Selector in header

### Unit System
- 2 modes: metric (ml) / imperial (oz)
- Auto-detected on init: imperial for US timezones (excl. Canada, French Caribbean)
- Manual override via pill buttons ml / oz in header
- `toMl()` converts oz/cl to ml at calculation time — internal values always in ml
- Dose column in results shows the user's entered unit (oz or ml)
- Bottle reference column always shows ml (universal manufacturer data)
- GA4 event fired on manual unit system change

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
- Custom events: `language_change` {language}, `unit_system_change` {system}, `calculate` {food_cost_pct}, `example_loaded` {example}, `copy_summary`, `recipe_saved`

### Notifications
- Inline toast component (`showToast(msg, isError)`) replaces all native alert() dialogs — auto-dismiss 2.6s, error variant with red border, hidden in print

### Saved recipes
- "Mes fiches" panel (top of Tab 1, hidden when empty) — localStorage `dc_recipes`, max 15 sheets
- Stored: complete form snapshot (info, liquid + fresh ingredients, parameters, toggles) + food cost % for display
- Per-sheet actions: Load (refill + recalculate) and Delete; list re-rendered on language change (locale dates)

### Footer
- CGU / Terms of use link → terms.html (label translated per active language)

---

## Architecture
- `index.html` — markup + CSS + SEO (metas, JSON-LD, contenu statique) — 1243 lignes
- `currency.js` — devises (CURRENCIES, setCurrency, curSym, detectCurrency, formatVolume) + système d'unités ml/oz (setUnitSystem, toMl, detectUnitSystem)
- `i18n.js` — objet T (FR/EN/ES), t(), setLang, applyTranslations, detectLang
- `calc.js` — logique métier (ingrédients, calculs fiche + rentabilité, exemples, fiches sauvegardées, toasts) + init au chargement
- Chargés en fin de `<body>` dans l'ordre currency → i18n → calc (scripts classiques, globales partagées, l'init s'exécute en dernier dans calc.js)

---

## Changelog
2026-06-17 — a11y: aria-label programmatique sur les 47 champs de formulaire (les <label> visuels n'étaient pas reliés via for/id → Lighthouse Accessibilité 87). Champs dynamiques étiquetés dans les templates addIng/addProduce + boutons supprimer; champs statiques via table FIELD_ARIA dans i18n.js; tout resynchronisé FR/EN/ES par applyTranslations. Vérifié : 0 champ sans nom accessible en FR/EN. Aucun changement visuel.
2026-06-17 — perf: paramètre de version (?v=20260617) sur currency.js / i18n.js / calc.js — force le rafraîchissement du JS chez les visiteurs après déploiement (à incrémenter à chaque changement JS)
2026-06-17 — a11y: --text3 éclairci de #484f58 à #7c8490 — contraste WCAG AA atteint sur footer (5.0:1) et en-têtes de tableau / faq-tagline / placeholders (≥4.5:1 sur bg et bg2); reste distinct de --text2 (hiérarchie visuelle préservée)
2026-06-17 — fix: variable CSS --text-faint non définie (utilisée par le texte de complexité, le disclaimer d'exemples, les coûts produits) — les libellés d'aide retombaient sur le blanc vif hérité au lieu du gris discret voulu; aliasée sur --text2 (corrige le rendu et le contraste WCAG)
2026-06-17 — seo/perf: optimisation SEO transverse
  perf: suppression de 2 familles Google Fonts chargées mais jamais utilisées (Cormorant Garamond, DM Mono) dans index.html — l'app n'utilise que Plus Jakarta Sans / Playfair Display / JetBrains Mono
  seo: hreflang du sitemap (entrée `/`) aligné sur le cluster des `<head>` (fr→food-cost-calculator, en→cocktail-cost-sheet, es→ficha-tecnica-coctel, x-default→/) ; lastmod → 2026-06-17 sur toutes les URLs
  seo: `robots` enrichi (`max-image-preview:large, max-snippet:-1, max-video-preview:-1`) sur les 4 pages
  seo: `apple-touch-icon` → /apple-touch-icon.png (PNG, iOS ne rend pas le SVG) ; `<link icon png>` → /favicon.png (type/extension cohérents) sur les 4 pages
  seo: Twitter Card + theme-color + og:image width/height/alt ajoutés aux 3 pages dédiées (parité avec index.html)
2026-06-12 — fix: badge résultat (Rentable/Limite/À revoir) — retraduit au changement de langue (dataset.badgeKey + applyTranslations, même pattern que cplxKey) et réaffiché au recalcul après un calcul sans prix (il restait masqué définitivement)
2026-06-12 — refactor: découpage du JS inline d'index.html (2366 → 1243 lignes) en 3 modules — currency.js, i18n.js, calc.js — zéro changement de comportement; suppression du code mort (updateIngUnit no-op + double rafraîchissement de rr-unit-net-label dans applyTranslations); règle 8 de CLAUDE.md reformulée en conséquence
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
2026-06-12 — Lot d'améliorations validé:
  feat: "Mes fiches" — sauvegarde locale des fiches (localStorage dc_recipes, max 15), panel au-dessus du formulaire, Charger/Supprimer, FAQ mises à jour × 3 langues (in-app + statique + JSON-LD)
  feat: toasts inline à la place des alert() natifs (erreurs + confirmations)
  feat: événements GA4 — calculate {food_cost_pct}, example_loaded {example}, copy_summary, recipe_saved
  fix: détection devise — CAD pour toutes les tz canadiennes, fallback USD pour les Amériques, es-* générique ne force plus EUR (seulement es-ES)
2026-06-12 — Audit structurel — corrections majeures:
  fix: landing EN affirmait "metric only" (FAQ + JSON-LD) alors que le switch ml/oz existe — corrigé
  fix: "10 devises" → 11 sur les 3 landing pages (texte + schemas)
  fix: detectCurrency couvre désormais toutes les timezones US (Chicago, Denver, Phoenix, Detroit, Anchorage, Honolulu…) — avant, seuls NY/LA donnaient USD, le reste tombait sur CHF
  feat: @media print — la fiche s'imprime en noir sur blanc (panel résultat uniquement), plus de thème dark intégral
  feat: persistance localStorage (dc_lang, dc_cur, dc_unit) — les choix langue/devise/unités survivent au rechargement
  style: landing pages alignées sur le logo SVG + favicon.svg (fin de l'emoji 🍸 et des PNG/ICO legacy)
  seo: sitemap lastmod 2026-06-12 ; hreflang reciprocal corrigé sur index.html (fr/en/es → landing pages dédiées)
2026-04-05 — SEO headlines & meta: H1/tagline/seo_title/seo_desc/intro_desc × FR/EN/ES — pivot terminologie "food cost" → "drink cost / pour cost / bar cost" dans les zones visibles
2026-03-31 — Boutons "Charger un exemple": 3 recettes pré-remplies (Negroni / Mojito / Spritz Aperol) — name, category, glass, method, liquid ings, fresh ings (Mojito: menthe), params FC/garnish/glace; oz auto-converti si mode impérial; clé ex_label × FR/EN/ES
2026-03-31 — formatVolume(): colonne Réf. affiche ml/cl/L selon magnitude (ex. 70cl, 1L, 1.5L)
2026-03-31 — reco_good: "par service" → "par cocktail" × FR/EN/ES
2026-03-31 — Overhead label: masque "main d'œuvre" si toggle labor OFF (tbl_overhead_no_labor × 3 langs)
2026-03-31 — Favicon SVG: favicon.svg martini glass amber sur fond navy; head index.html + terms.html mis à jour
2026-03-31 — SVG logo header: emoji 🍸 remplacé par logo SVG inline dans index.html et terms.html
2026-03-28 — Simplification labels format bouteille: suppression des descriptifs (Canette, Standard, Vin/Champagne…) — labels unifiés "200 ml", "250 ml"… + clé vol_other FR/EN/ES pour "Autre"
2026-03-28 — Système de mesure oz/ml: sélecteur pill header ml/oz, auto-détection US, toMl() pour conversion interne, getIngs() mis à jour, addIng() dynamique, applyUnitSystem() sync placeholders, clé ph_dose_imperial × 3 langues
