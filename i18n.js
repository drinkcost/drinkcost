// ===== i18n =====
const T = {
  fr:{
    tab_fiche:'Fiche technique',tab_renta:'Rentabilité',
    p_cocktail:'Informations cocktail',p_liquids:'Ingrédients liquides',p_fresh:'Ingrédients frais & solides',
    p_params:'Paramètres',p_renta_cocktail:'Paramètres du cocktail',p_service:'Type de service',
    p_technique:'Technique & temps',p_charges:'Charges fixes du service',
    kpi_cost:'Coût matière',kpi_price:'Prix de vente',kpi_fc:'Food cost',kpi_margin:'Marge brute',kpi_net:'Marge nette',
    cost_mat:'Coût matière',
    tbl_ing:'Ingrédient',tbl_dose:'Dosage',tbl_ref:'Réf.',tbl_cost:'Coût dose',
    tbl_total_ing:'Total ingrédients',tbl_overhead:"Garnish + glace + main d'œuvre",tbl_overhead_no_labor:'Garnish + glace',tbl_waste:'Taux de perte',tbl_total:'Coût total',tbl_fresh:'Produits frais',
    suggest_label:"Prix suggéré pour atteindre l'objectif food cost",r_sheet:'Fiche technique',
    h_liquids:'Spiritueux, sirops, jus en bouteille, sodas — tout ce qui se mesure en ml ou cl.',
    h_fresh:"Menthe, citrons, fruits, sucre en morceaux, épices — tout ce qui se vend au g ou au kg. Le coût à la dose est calculé automatiquement selon le rendement du paquet.",
    btn_calculate:'Calculer la fiche technique',btn_add_liquid:'+ Ajouter un liquide',btn_add_fresh:"+ Ajouter un ingrédient frais",
    btn_print:'Imprimer',btn_new:'Nouvelle fiche',btn_copy:'Copier résumé',btn_analyze:'Analyser la rentabilité',
    l_name:'Nom du cocktail',l_price:'Prix de vente',l_category:'Catégorie',l_glass:'Verre',l_method:'Méthode',
    l_complexity:'Complexité estimée selon méthode',l_target_fc:'Food cost cible (%)',l_garnish:'Coût garnish',l_ice:'Coût glace',
    l_labor:"Coût main d'œuvre",l_tva:'TVA (%)',l_waste:'Taux de perte / gaspillage',l_waste_pct:'Taux de perte (%)',
    l_waste_hint:'Majore le coût matière des pertes réelles au service.',l_adv:'+ de paramètres',
    l_net_toggle:'Afficher la marge nette (après TVA)',
    i_name:'Ingrédient',i_qty:'Quantité',i_unit:'Unité',i_format:'Format bouteille',i_cost:'Coût bouteille',i_custom_vol:'Volume personnalisé (ml)',
    pr_name:'Produit',pr_pkg:'Poids paquet (g)',pr_price:'Prix paquet',pr_qty:'Qté utilisée (g)',
    ph_cocktail:'ex. Negroni…',ph_glass:'Coupe, Highball…',ph_dose:'30',ph_dose_imperial:'ex. 1.5',ph_bottle:'38.00',ph_custom_vol:'ex. 375',
    ph_ingredient:'ex. Gin, Campari, Sirop de canne…',
    pu_g:'grammes (g)',pu_kg:'kilogrammes (kg)',pu_piece:'pièces',
    vol_other:'Autre — volume personnalisé',
    ex_label:'Charger un exemple :',
    example_disclaimer:'Prix indicatifs — ajustez selon vos tarifs fournisseurs.',
    p_saved:'Mes fiches',btn_save:'Sauvegarder',saved_load:'Charger',saved_delete:'Supprimer',
    saved_ok:'Fiche sauvegardée.',saved_deleted:'Fiche supprimée.',saved_limit:'Limite de 15 fiches atteinte — supprimez-en une d\'abord.',saved_error:'Sauvegarde impossible (stockage indisponible).',
    m_direct:'Direct (build)',m_shaker:'Shaker',m_mixing:'Verre à mélange',m_blender:'Blender',
    m_infusion:'Infusion / Macération',m_carb:'Carbonation',m_multi:'Multi-techniques',
    cat_classic:'Classique',cat_sig:'Signature',cat_mock:'Mocktail',cat_champ:'Champagne / Bulles',cat_shot:'Shot',
    badge_good:'Rentable',badge_ok:'Limite',badge_bad:'À revoir',
    rr_gross:'Marge brute / cocktail',rr_labor:'Coût MO / cocktail',rr_net:'Marge nette / cocktail',rr_rev:'Revenus / service',
    rr_break:'Seuil de rentabilité',rr_profit:'Bénéfice net / service',rr_time:'Temps total préparation',rr_complexity:'Complexité',
    rr_unit_cocktails:'cocktails / soir',rr_unit_min:'min / service',rr_unit_net:'après TVA & MO',
    r2_name:'Nom (optionnel)',r2_price:'Prix de vente',r2_cost:'Coût matière total',
    r2_type:"Type d'établissement",r2_hours:'Durée du service (h)',r2_pax:'Pax attendus',
    r2_qty:'Cocktails vendus / soir (estimation)',r2_break:'Seuil de rentabilité (calculé)',
    r2_method:'Méthode',r2_prep:'Temps de préparation (min)',r2_hourly:'Taux horaire barman',
    r2_complexity:'Complexité selon méthode',r2_staff:'Coût barman / service',r2_fixed:'Frais fixes / soir',r2_tva:'TVA (%)',
    svc_bar:'Bar standard',svc_gastro:'Bar gastronomique / Hôtel',svc_envoi:"Bar d'envoi / Volume",svc_event:'Événement / Privatisation',
    copied:'Résumé copié.',err_name:'Veuillez saisir le nom du cocktail.',err_ing:'Ajoutez au moins un ingrédient avec dosage et coût.',err_renta:'Renseignez le prix de vente et le coût matière.',
    reco_no_price:(tc,fc,s,sym)=>`<strong>Coût de production : ${tc} ${sym}.</strong> Prix suggéré pour un food cost de ${fc}% : <strong>${s} ${sym}</strong>.`,
    reco_good:(fp,m,sym)=>`<strong>Excellent.</strong> Food cost de ${fp}% — objectif atteint. Marge brute de ${m} ${sym} par cocktail.`,
    reco_ok:(fp,fc,s,diff,sym)=>`<strong>Food cost légèrement élevé</strong> (${fp}% vs objectif ${fc}%). Prix suggéré : <strong>${s} ${sym}</strong> (+${diff} ${sym}).`,
    reco_bad:(fp,wn,wc,s,sym)=>`<strong>Food cost critique (${fp}%).</strong> Ingrédient le plus impactant : <strong>${wn}</strong> (${wc} ${sym}/dose). Prix minimum : <strong>${s} ${sym}</strong>.`,
    reco_renta_good:(qty,be,p,sym)=>`<strong>Excellente rentabilité.</strong> Vous vendez ${qty} cocktails pour un seuil à ${be}. Bénéfice net estimé à <strong>${p} ${sym}</strong> sur ce service.`,
    reco_renta_ok:(be)=>`<strong>Rentable mais serré.</strong> Vous dépassez juste le seuil (${be} cocktails). +20% de volume améliorerait sensiblement le résultat.`,
    reco_renta_bad:(be,qty)=>`<strong>Attention — sous le seuil de rentabilité.</strong> Il vous faut <strong>${be} cocktails</strong> pour couvrir vos charges, vous en prévoyez ${qty}.`,
    copy_text:(n,c,p,fp,m,sym)=>`FICHE TECHNIQUE — ${n}\nCoût matière : ${c} ${sym}\nPrix de vente : ${p} ${sym}\nFood cost : ${fp}%\nMarge brute : ${m} ${sym}`,
    cplx:{direct:'Direct (build) — faible complexité',shaker:'Shaker — complexité modérée','verre-melange':'Verre à mélange — bonne maîtrise requise',blender:'Blender — complexité modérée',infusion:'Infusion / Macération — préparation longue',carbonation:'Carbonation — technique avancée',multi:'Multi-techniques — haute complexité'},
    cplx_levels:['','Faible','Modérée','Modérée+','Élevée','Très élevée'],
    title:'Le Calculateur de <em>Coût Cocktail</em> pour les Pros du Bar',tagline:'Coût boisson, pour cost, prix cocktail — vos chiffres en temps réel.',currency_label:'Devise',intro_desc:'DrinkCost — Calculez le coût de vos boissons, le pour cost et le prix de vos cocktails en temps réel. Outil gratuit pour bar managers et barmans.',
    seo_title:'Calculateur de Coût Boisson — Prix de vos Cocktails',
    seo_desc:'Calculez le coût de vos boissons, votre pour cost et le prix de vos cocktails en quelques secondes. Outil gratuit pour les pros du bar.',
    seo_og_locale:'fr_FR',
    seo_keywords:'fiche technique cocktail, fiche recette cocktail, fiche technique bar, calcul food cost, food cost cocktail, coût de revient cocktail, calculer coût de revient recette, calcul marge cocktail, calcul marge bar, drink cost, rentabilité bar, outil bar manager gratuit, contrôle coût boissons, seuil rentabilité bar',
    seo_h2:'Comment calculer le <em>coût de revient</em> d\'un cocktail ?',
    seo_p1:'Le food cost est l\'indicateur clé de tout bar professionnel : il exprime le ratio entre le coût des ingrédients et le prix de vente d\'un cocktail, en pourcentage. Un food cost maîtrisé entre 18 et 25 % garantit la rentabilité de votre service. DrinkCost vous permet de calculer ce ratio en quelques secondes, à partir du coût réel de chaque ingrédient — spiritueux, sirops, fruits frais, glace et garnish. Que vous souhaitiez calculer le coût de revient d\'une recette inédite ou optimiser une fiche technique bar existante, l\'outil s\'adapte à tous les contextes de travail.',
    seo_h3a:'Une fiche technique professionnelle, en quelques secondes',
    seo_p2:'Renseignez vos ingrédients liquides (spiritueux, sirops, jus) et vos produits frais (menthe, citrons, épices), leurs formats et coûts d\'achat. DrinkCost calcule automatiquement le coût à la dose, le coût matière total, la marge brute et la marge nette après TVA. Si le food cost est trop élevé, le prix de vente suggéré vous indique exactement à quel tarif fixer votre cocktail pour atteindre votre objectif. Chaque fiche recette cocktail peut être imprimée ou copiée en un clic — le drink cost de chaque création s\'affiche avec une précision au centième.',
    seo_h3b:'Pour les bar managers et mixologues du monde entier',
    seo_p3:'Que vous gériez un bar indépendant, un restaurant gastronomique, un hôtel 5 étoiles ou un événement privé, DrinkCost est conçu pour les professionnels du bar. L\'outil supporte 11 devises (CHF, EUR, USD, GBP, CNY et plus) et 3 langues — français, anglais, espagnol — pour s\'adapter à chaque contexte de travail, partout dans le monde.',
    faq_title:'Questions <em>fréquentes</em>',
    faq_tagline:'Tout ce que vous devez savoir sur DrinkCost',
    faq:[
      {q:'DrinkCost est-il gratuit ?',a:"Oui, l'outil est entièrement gratuit. Toutes les fonctionnalités de calcul sont accessibles sans inscription ni carte bancaire."},
      {q:'Comment calculer le food cost d\'un cocktail ?',a:'Entrez le nom du cocktail et son prix de vente, puis ajoutez vos ingrédients avec leurs dosages et coûts. Cliquez sur « Calculer la fiche technique » — le food cost, la marge brute et le prix suggéré s\'affichent automatiquement.'},
      {q:'Qu\'est-ce que le food cost ?',a:'Le food cost est le ratio entre le coût matière d\'un cocktail et son prix de vente, exprimé en pourcentage. Un food cost de 20 % signifie que 20 % du prix de vente est consommé par les ingrédients. L\'objectif standard en bar est de 18–25 %.'},
      {q:'Quelles devises sont supportées ?',a:'DrinkCost supporte 11 devises : CHF, EUR, USD, GBP, CAD, XCD, MAD, AED, JPY, AUD et CNY (Yuan chinois). La devise est détectée automatiquement selon votre fuseau horaire.'},
      {q:'Comment fonctionne le seuil de rentabilité ?',a:'L\'onglet Rentabilité calcule le nombre minimum de cocktails à vendre par service pour couvrir vos charges fixes (coût barman + frais fixes). En dessous de ce seuil, le service est déficitaire.'},
      {q:'Puis-je utiliser DrinkCost sur mobile ?',a:'Oui. L\'outil est entièrement responsive et optimisé pour tous les écrans. Il fonctionne sur iOS et Android, sans application à installer.'},
      {q:'Comment exporter ma fiche technique ?',a:'Cliquez sur « Imprimer » pour générer un PDF via votre navigateur, ou « Copier résumé » pour copier les données clés dans le presse-papier.'},
      {q:'Qu\'est-ce que le taux de perte / gaspillage ?',a:'Le taux de perte majore votre coût matière pour refléter les pertes réelles au service : renversements, mesures approximatives, ingrédients gaspillés. Il est activable dans les paramètres avancés.'},
      {q:'Comment est calculé le prix suggéré ?',a:'Coût matière total ÷ (objectif food cost / 100). Exemple : coût 3,50 CHF, objectif 20 % → prix suggéré 17,50 CHF.'},
      {q:'Puis-je sauvegarder mes fiches techniques ?',a:'Oui. Cliquez sur « Sauvegarder » après le calcul — la fiche est conservée localement dans votre navigateur (jusqu\'à 15 fiches) et rechargeable depuis le panneau « Mes fiches ». La synchronisation multi-appareils arrivera avec les comptes utilisateurs (V2).'},
      {q:'Pour qui est fait DrinkCost ?',a:'Pour les bar managers, chefs barmen, directeurs F&B et mixologues — dans les bars, hôtels, restaurants et entreprises événementielles, partout dans le monde.'},
      {q:'Quelle est la différence entre marge brute et marge nette ?',a:'La marge brute = prix de vente − coût matière. La marge nette déduit en plus la TVA. Activez « Afficher la marge nette » dans les résultats pour la voir.'},
    ],
  },
  en:{
    tab_fiche:'Cost Sheet',tab_renta:'Profitability',
    p_cocktail:'Cocktail Info',p_liquids:'Liquid Ingredients',p_fresh:'Fresh & Solid Ingredients',
    p_params:'Parameters',p_renta_cocktail:'Cocktail Parameters',p_service:'Service Type',
    p_technique:'Technique & Time',p_charges:'Fixed Service Costs',
    kpi_cost:'Material cost',kpi_price:'Selling price',kpi_fc:'Food cost',kpi_margin:'Gross margin',kpi_net:'Net margin',
    cost_mat:'Material cost',
    tbl_ing:'Ingredient',tbl_dose:'Dose',tbl_ref:'Ref.',tbl_cost:'Dose cost',
    tbl_total_ing:'Total ingredients',tbl_overhead:'Garnish + ice + labor',tbl_overhead_no_labor:'Garnish + ice',tbl_waste:'Waste rate',tbl_total:'Total cost',tbl_fresh:'Fresh produce',
    suggest_label:'Suggested price to hit food cost target',r_sheet:'Cost Sheet',
    h_liquids:'Spirits, syrups, bottled juices, sodas — measured in oz or cl.',
    h_fresh:'Mint, lemons, fruits, sugar, spices — anything sold by g or kg. Dose cost is calculated automatically from the pack yield.',
    btn_calculate:'Calculate cost sheet',btn_add_liquid:'+ Add a liquid',btn_add_fresh:'+ Add a fresh ingredient',
    btn_print:'Print',btn_new:'New sheet',btn_copy:'Copy summary',btn_analyze:'Analyze profitability',
    l_name:'Cocktail name',l_price:'Selling price',l_category:'Category',l_glass:'Glass',l_method:'Method',
    l_complexity:'Estimated complexity by method',l_target_fc:'Target food cost (%)',l_garnish:'Garnish cost',l_ice:'Ice cost',
    l_labor:'Labor cost',l_tva:'VAT (%)',l_waste:'Waste / spillage rate',l_waste_pct:'Waste rate (%)',
    l_waste_hint:'Increases material cost by this % to reflect real service losses.',l_adv:'+ More parameters',
    l_net_toggle:'Show net margin (after VAT)',
    i_name:'Ingredient',i_qty:'Quantity',i_unit:'Unit',i_format:'Bottle format',i_cost:'Bottle cost',i_custom_vol:'Custom volume (ml)',
    pr_name:'Product',pr_pkg:'Pack weight (g)',pr_price:'Pack price',pr_qty:'Qty used (g)',
    ph_cocktail:'e.g. Negroni…',ph_glass:'Coupe, Highball…',ph_dose:'30',ph_dose_imperial:'e.g. 1.5',ph_bottle:'38.00',ph_custom_vol:'e.g. 375',
    ph_ingredient:'e.g. Gin, Syrup, Juice…',
    pu_g:'grams (g)',pu_kg:'kilograms (kg)',pu_piece:'pieces',
    vol_other:'Other — custom volume',
    ex_label:'Load an example:',
    example_disclaimer:'Indicative prices — adjust to your local supplier costs.',
    p_saved:'My sheets',btn_save:'Save',saved_load:'Load',saved_delete:'Delete',
    saved_ok:'Sheet saved.',saved_deleted:'Sheet deleted.',saved_limit:'Limit of 15 sheets reached — delete one first.',saved_error:'Could not save (storage unavailable).',
    m_direct:'Direct (build)',m_shaker:'Shaker',m_mixing:'Mixing glass',m_blender:'Blender',
    m_infusion:'Infusion / Maceration',m_carb:'Carbonation',m_multi:'Multi-technique',
    cat_classic:'Classic',cat_sig:'Signature',cat_mock:'Mocktail',cat_champ:'Champagne / Sparkling',cat_shot:'Shot',
    badge_good:'Profitable',badge_ok:'Borderline',badge_bad:'Review needed',
    rr_gross:'Gross margin / cocktail',rr_labor:'Labor cost / cocktail',rr_net:'Net margin / cocktail',rr_rev:'Revenue / service',
    rr_break:'Break-even',rr_profit:'Net profit / service',rr_time:'Total prep time',rr_complexity:'Complexity',
    rr_unit_cocktails:'cocktails / evening',rr_unit_min:'min / service',rr_unit_net:'after VAT & labor',
    r2_name:'Name (optional)',r2_price:'Selling price',r2_cost:'Total material cost',
    r2_type:'Establishment type',r2_hours:'Service duration (h)',r2_pax:'Expected guests',
    r2_qty:'Cocktails sold / evening (estimate)',r2_break:'Break-even (calculated)',
    r2_method:'Method',r2_prep:'Prep time (min)',r2_hourly:'Bartender hourly rate',
    r2_complexity:'Complexity by method',r2_staff:'Bartender cost / service',r2_fixed:'Fixed costs / evening',r2_tva:'VAT (%)',
    svc_bar:'Standard bar',svc_gastro:'Gastro bar / Hotel',svc_envoi:'High-volume bar',svc_event:'Event / Private hire',
    copied:'Summary copied.',err_name:'Please enter the cocktail name.',err_ing:'Add at least one ingredient with dose and cost.',err_renta:'Please enter selling price and material cost.',
    reco_no_price:(tc,fc,s,sym)=>`<strong>Production cost: ${tc} ${sym}.</strong> Suggested price for a ${fc}% food cost: <strong>${s} ${sym}</strong>.`,
    reco_good:(fp,m,sym)=>`<strong>Excellent.</strong> Food cost at ${fp}% — target achieved. Gross margin of ${m} ${sym} per cocktail.`,
    reco_ok:(fp,fc,s,diff,sym)=>`<strong>Food cost slightly high</strong> (${fp}% vs target ${fc}%). Suggested price: <strong>${s} ${sym}</strong> (+${diff} ${sym}).`,
    reco_bad:(fp,wn,wc,s,sym)=>`<strong>Critical food cost (${fp}%).</strong> Most expensive: <strong>${wn}</strong> (${wc} ${sym}/dose). Minimum price: <strong>${s} ${sym}</strong>.`,
    reco_renta_good:(qty,be,p,sym)=>`<strong>Excellent profitability.</strong> You sell ${qty} cocktails vs a break-even of ${be}. Estimated net profit: <strong>${p} ${sym}</strong>.`,
    reco_renta_ok:(be)=>`<strong>Profitable but tight.</strong> You just clear the break-even (${be} cocktails). +20% volume would meaningfully improve results.`,
    reco_renta_bad:(be,qty)=>`<strong>Warning — below break-even.</strong> You need <strong>${be} cocktails</strong> to cover costs, but estimate ${qty}.`,
    copy_text:(n,c,p,fp,m,sym)=>`COST SHEET — ${n}\nMaterial cost: ${c} ${sym}\nSelling price: ${p} ${sym}\nFood cost: ${fp}%\nGross margin: ${m} ${sym}`,
    cplx:{direct:'Direct (build) — low complexity',shaker:'Shaker — moderate complexity','verre-melange':'Mixing glass — good technique required',blender:'Blender — moderate complexity',infusion:'Infusion / Maceration — long preparation',carbonation:'Carbonation — advanced technique',multi:'Multi-technique — high complexity'},
    cplx_levels:['','Low','Moderate','Moderate+','High','Very high'],
    title:'The Bar Cost Calculator Built for <em>Professionals</em>',tagline:'From cocktail pricing to pour cost — know your numbers instantly.',currency_label:'Currency',intro_desc:'DrinkCost — Calculate your drink cost, pour cost and cocktail pricing in seconds. Free tool for bar managers, bartenders and F&B professionals.',
    seo_title:'Drink Cost Calculator — Price Your Cocktails Instantly',
    seo_desc:'Calculate your drink cost, pour cost and cocktail pricing in seconds. Free bar tool for bartenders, bar managers and F&B professionals.',
    seo_og_locale:'en_US',
    seo_keywords:'cocktail food cost calculator, cocktail cost sheet, drink cost calculator, pour cost calculator free, bar recipe cost calculator, cocktail recipe costing, food cost calculator, bar manager tool free, beverage cost control, bar profitability calculator, recipe cost cocktail, break-even bar, bar cost management',
    seo_h2:'How to Calculate Your <em>Cocktail Cost</em>',
    seo_p1:'Food cost is the key metric for any professional bar: it expresses the ratio between the cost of ingredients and the selling price of a cocktail, as a percentage. A controlled food cost between 18 and 25% ensures service profitability. DrinkCost lets you calculate this ratio in seconds, based on the real cost of each ingredient — spirits, syrups, fresh fruit, ice and garnishes. Whether you need a pour cost calculator for a single recipe or full cocktail recipe costing for your entire menu, DrinkCost handles it in one place.',
    seo_h3a:'A professional cost sheet, in seconds',
    seo_p2:'Enter your liquid ingredients (spirits, syrups, juices) and fresh produce (mint, lemons, spices), their formats and purchase costs. DrinkCost automatically calculates the dose cost, total material cost, gross margin and net margin after VAT. If the food cost is too high, the suggested selling price tells you exactly where to price your cocktail to hit your target. Every bar recipe cost is displayed to three decimal places — the precision a serious bar manager or beverage director needs.',
    seo_h3b:'For bar managers and mixologists worldwide',
    seo_p3:'Whether you run an independent bar, a fine dining restaurant, a 5-star hotel or a private event, DrinkCost is built for bar professionals. The tool supports 11 currencies (CHF, EUR, USD, GBP, CNY and more) and 3 languages — French, English, Spanish — to suit any working context, anywhere in the world.',
    faq_title:'Frequently <em>Asked Questions</em>',
    faq_tagline:'Everything you need to know about DrinkCost',
    faq:[
      {q:'Is DrinkCost free?',a:'Yes, the tool is entirely free. All calculation features are accessible without registration or credit card.'},
      {q:'How do I calculate a cocktail\'s food cost?',a:'Enter the cocktail name and selling price, then add your ingredients with their doses and costs. Click "Calculate cost sheet" — food cost, gross margin and suggested price are displayed automatically.'},
      {q:'What is food cost?',a:'Food cost is the ratio between a cocktail\'s material cost and its selling price, expressed as a percentage. A 20% food cost means 20% of the selling price is consumed by ingredients. The standard bar target is 18–25%.'},
      {q:'Which currencies are supported?',a:'DrinkCost supports 11 currencies: CHF, EUR, USD, GBP, CAD, XCD, MAD, AED, JPY, AUD and CNY (Chinese Yuan). Currency is auto-detected based on your timezone.'},
      {q:'How does the break-even calculation work?',a:'The Profitability tab calculates the minimum number of cocktails you need to sell per service to cover your fixed costs (bartender cost + fixed overheads). Below this threshold, the service runs at a loss.'},
      {q:'Can I use DrinkCost on mobile?',a:'Yes. The tool is fully responsive and optimised for all screen sizes. It works on iOS and Android with no app to install.'},
      {q:'How do I export my cost sheet?',a:'Click "Print" to generate a PDF via your browser, or "Copy summary" to copy key data to your clipboard.'},
      {q:'What is the waste / spillage rate?',a:'The waste rate increases your material cost to reflect real service losses: spills, approximate measures, wasted ingredients. Enable it in the advanced parameters.'},
      {q:'How is the suggested price calculated?',a:'Total material cost ÷ (target food cost / 100). Example: cost 3.50 CHF, target 20% → suggested price 17.50 CHF.'},
      {q:'Can I save my cost sheets?',a:'Yes. Click "Save" after calculating — the sheet is stored locally in your browser (up to 15 sheets) and can be reloaded from the "My sheets" panel. Cross-device sync will come with user accounts (V2).'},
      {q:'Who is DrinkCost for?',a:'DrinkCost is built for bar managers, head bartenders, F&B directors and mixologists — in independent bars, hotels, restaurants and event companies, worldwide.'},
      {q:'What is the difference between gross margin and net margin?',a:'Gross margin = selling price − material cost. Net margin further deducts VAT. Enable "Show net margin" in the results to see it.'},
    ],
  },
  es:{
    tab_fiche:'Ficha técnica',tab_renta:'Rentabilidad',
    p_cocktail:'Información del cóctel',p_liquids:'Ingredientes líquidos',p_fresh:'Ingredientes frescos & sólidos',
    p_params:'Parámetros',p_renta_cocktail:'Parámetros del cóctel',p_service:'Tipo de servicio',
    p_technique:'Técnica & tiempo',p_charges:'Costes fijos del servicio',
    kpi_cost:'Coste materia',kpi_price:'Precio de venta',kpi_fc:'Food cost',kpi_margin:'Margen bruto',kpi_net:'Margen neto',
    cost_mat:'Coste materia',
    tbl_ing:'Ingrediente',tbl_dose:'Dosis',tbl_ref:'Ref.',tbl_cost:'Coste dosis',
    tbl_total_ing:'Total ingredientes',tbl_overhead:'Guarnición + hielo + MO',tbl_overhead_no_labor:'Guarnición + hielo',tbl_waste:'Merma',tbl_total:'Coste total',tbl_fresh:'Productos frescos',
    suggest_label:'Precio sugerido para alcanzar el food cost objetivo',r_sheet:'Ficha técnica',
    h_liquids:'Licores, siropes, zumos embotellados, refrescos — todo lo que se mide en ml o cl.',
    h_fresh:'Menta, limones, frutas, azúcar, especias — todo lo que se vende por g o kg. El coste por dosis se calcula automáticamente.',
    btn_calculate:'Calcular ficha técnica',btn_add_liquid:'+ Añadir un líquido',btn_add_fresh:'+ Añadir ingrediente fresco',
    btn_print:'Imprimir',btn_new:'Nueva ficha',btn_copy:'Copiar resumen',btn_analyze:'Analizar rentabilidad',
    l_name:'Nombre del cóctel',l_price:'Precio de venta',l_category:'Categoría',l_glass:'Copa',l_method:'Método',
    l_complexity:'Complejidad estimada según método',l_target_fc:'Food cost objetivo (%)',l_garnish:'Coste guarnición',l_ice:'Coste hielo',
    l_labor:'Coste mano de obra',l_tva:'IVA (%)',l_waste:'Tasa de merma / desperdicio',l_waste_pct:'Tasa de merma (%)',
    l_waste_hint:'Aumenta el coste de materia prima en este % para reflejar las pérdidas reales.',l_adv:'+ Más parámetros',
    l_net_toggle:'Mostrar margen neto (después de IVA)',
    i_name:'Ingrediente',i_qty:'Cantidad',i_unit:'Unidad',i_format:'Formato botella',i_cost:'Coste botella',i_custom_vol:'Volumen personalizado (ml)',
    pr_name:'Producto',pr_pkg:'Peso paquete (g)',pr_price:'Precio paquete',pr_qty:'Cantidad usada (g)',
    ph_cocktail:'ej. Negroni…',ph_glass:'Copa, Highball…',ph_dose:'30',ph_dose_imperial:'ej. 1.5',ph_bottle:'38.00',ph_custom_vol:'ej. 375',
    ph_ingredient:'ej. Ginebra, Sirope, Zumo…',
    pu_g:'gramos (g)',pu_kg:'kilogramos (kg)',pu_piece:'unidades',
    vol_other:'Otro — volumen personalizado',
    ex_label:'Cargar un ejemplo:',
    example_disclaimer:'Precios orientativos — ajusta según tus proveedores.',
    p_saved:'Mis fichas',btn_save:'Guardar',saved_load:'Cargar',saved_delete:'Eliminar',
    saved_ok:'Ficha guardada.',saved_deleted:'Ficha eliminada.',saved_limit:'Límite de 15 fichas alcanzado — elimina una primero.',saved_error:'No se pudo guardar (almacenamiento no disponible).',
    m_direct:'Directo (build)',m_shaker:'Coctelera',m_mixing:'Vaso mezclador',m_blender:'Batidora',
    m_infusion:'Infusión / Maceración',m_carb:'Carbonatación',m_multi:'Multi-técnica',
    cat_classic:'Clásico',cat_sig:'Signature',cat_mock:'Mocktail',cat_champ:'Champagne / Espumoso',cat_shot:'Chupito',
    badge_good:'Rentable',badge_ok:'Límite',badge_bad:'Revisar',
    rr_gross:'Margen bruto / cóctel',rr_labor:'Coste MO / cóctel',rr_net:'Margen neto / cóctel',rr_rev:'Ingresos / servicio',
    rr_break:'Umbral rentabilidad',rr_profit:'Beneficio neto / servicio',rr_time:'Tiempo total preparación',rr_complexity:'Complejidad',
    rr_unit_cocktails:'cócteles / noche',rr_unit_min:'min / servicio',rr_unit_net:'tras IVA y MO',
    r2_name:'Nombre (opcional)',r2_price:'Precio de venta',r2_cost:'Coste materia total',
    r2_type:'Tipo de establecimiento',r2_hours:'Duración del servicio (h)',r2_pax:'Clientes esperados',
    r2_qty:'Cócteles vendidos / noche (estimación)',r2_break:'Umbral de rentabilidad (calculado)',
    r2_method:'Método',r2_prep:'Tiempo de preparación (min)',r2_hourly:'Tarifa horaria barman',
    r2_complexity:'Complejidad según método',r2_staff:'Coste barman / servicio',r2_fixed:'Costes fijos / noche',r2_tva:'IVA (%)',
    svc_bar:'Bar estándar',svc_gastro:'Bar gastronómico / Hotel',svc_envoi:'Bar de alto volumen',svc_event:'Evento / Privado',
    copied:'Resumen copiado.',err_name:'Por favor introduce el nombre del cóctel.',err_ing:'Añade al menos un ingrediente con dosis y coste.',err_renta:'Introduce el precio de venta y el coste de materia prima.',
    reco_no_price:(tc,fc,s,sym)=>`<strong>Coste de producción: ${tc} ${sym}.</strong> Precio sugerido para un food cost del ${fc}%: <strong>${s} ${sym}</strong>.`,
    reco_good:(fp,m,sym)=>`<strong>Excelente.</strong> Food cost del ${fp}% — objetivo alcanzado. Margen bruto de ${m} ${sym} por cóctel.`,
    reco_ok:(fp,fc,s,diff,sym)=>`<strong>Food cost ligeramente alto</strong> (${fp}% vs objetivo ${fc}%). Precio sugerido: <strong>${s} ${sym}</strong> (+${diff} ${sym}).`,
    reco_bad:(fp,wn,wc,s,sym)=>`<strong>Food cost crítico (${fp}%).</strong> Ingrediente más impactante: <strong>${wn}</strong> (${wc} ${sym}/dosis). Precio mínimo: <strong>${s} ${sym}</strong>.`,
    reco_renta_good:(qty,be,p,sym)=>`<strong>Excelente rentabilidad.</strong> Vendes ${qty} cócteles con un umbral de ${be}. Beneficio neto estimado: <strong>${p} ${sym}</strong>.`,
    reco_renta_ok:(be)=>`<strong>Rentable pero ajustado.</strong> Superas justo el umbral (${be} cócteles). +20% de volumen mejoraría el resultado.`,
    reco_renta_bad:(be,qty)=>`<strong>Atención — por debajo del umbral.</strong> Necesitas <strong>${be} cócteles</strong> para cubrir costes, estimas ${qty}.`,
    copy_text:(n,c,p,fp,m,sym)=>`FICHA TÉCNICA — ${n}\nCoste materia: ${c} ${sym}\nPrecio de venta: ${p} ${sym}\nFood cost: ${fp}%\nMargen bruto: ${m} ${sym}`,
    cplx:{direct:'Directo (build) — baja complejidad',shaker:'Coctelera — complejidad moderada','verre-melange':'Vaso mezclador — buena técnica requerida',blender:'Batidora — complejidad moderada',infusion:'Infusión / Maceración — preparación larga',carbonation:'Carbonatación — técnica avanzada',multi:'Multi-técnica — alta complejidad'},
    cplx_levels:['','Baja','Moderada','Moderada+','Alta','Muy alta'],
    title:'La Calculadora de Coste de Bar para <em>Profesionales</em>',tagline:'Coste de bebida, pour cost, precio cóctel — tus números al instante.',currency_label:'Moneda',intro_desc:'DrinkCost — Calcula el coste de tus bebidas, el pour cost y el precio de tus cócteles al instante. Herramienta gratuita para profesionales del bar.',
    seo_title:'Calculadora de Coste de Bebidas — Precio tu Cóctel',
    seo_desc:'Calcula el coste de tus bebidas, el pour cost y el precio de tus cócteles en segundos. Herramienta gratuita para profesionales de bar.',
    seo_og_locale:'es_ES',
    seo_keywords:'ficha técnica cóctel, calcular costo coctel, calcular coste cóctel, food cost coctelería, costo de receta coctel, calculadora food cost, ficha técnica bar, rentabilidad bar, herramienta bar manager gratis, control costes bebidas, gestión costes bar, umbral rentabilidad bar',
    seo_h2:'Cómo calcular el <em>coste de un cóctel</em>',
    seo_p1:'El food cost es el indicador clave de cualquier bar profesional: expresa la relación entre el coste de los ingredientes y el precio de venta de un cóctel, en porcentaje. Un food cost controlado entre el 18 y el 25 % garantiza la rentabilidad del servicio. DrinkCost te permite calcular este ratio en segundos, a partir del coste real de cada ingrediente — licores, siropes, frutas frescas, hielo y decoración. Tanto si necesitas calcular el costo de un cóctel concreto como gestionar el food cost de toda tu coctelería, la herramienta se adapta a cualquier contexto profesional.',
    seo_h3a:'Una ficha técnica profesional en segundos',
    seo_p2:'Introduce tus ingredientes líquidos (licores, siropes, zumos) y productos frescos (menta, limones, especias), sus formatos y costes de compra. DrinkCost calcula automáticamente el coste por dosis, el coste de materia prima total, el margen bruto y el margen neto tras el IVA. Si el food cost es demasiado alto, el precio de venta sugerido te indica exactamente a qué precio vender tu cóctel para alcanzar tu objetivo. Cada ficha técnica de cóctel puede imprimirse o copiarse en un clic — el costo de receta se muestra con precisión al céntimo.',
    seo_h3b:'Para jefes de bar y mixólogos de todo el mundo',
    seo_p3:'Tanto si gestionas un bar independiente, un restaurante gastronómico, un hotel de 5 estrellas o un evento privado, DrinkCost está diseñado para profesionales del bar. La herramienta es compatible con 11 monedas (CHF, EUR, USD, GBP, CNY y más) y 3 idiomas — francés, inglés, español — para adaptarse a cualquier contexto de trabajo, en cualquier parte del mundo.',
    faq_title:'Preguntas <em>frecuentes</em>',
    faq_tagline:'Todo lo que necesitas saber sobre DrinkCost',
    faq:[
      {q:'¿DrinkCost es gratuito?',a:'Sí, la herramienta es completamente gratuita. Todas las funciones de cálculo son accesibles sin registro ni tarjeta bancaria.'},
      {q:'¿Cómo calculo el food cost de un cóctel?',a:'Introduce el nombre del cóctel y el precio de venta, luego añade tus ingredientes con sus dosis y costes. Haz clic en «Calcular ficha técnica» — el food cost, el margen bruto y el precio sugerido se muestran automáticamente.'},
      {q:'¿Qué es el food cost?',a:'El food cost es la relación entre el coste de materia prima de un cóctel y su precio de venta, en porcentaje. Un food cost del 20 % significa que el 20 % del precio de venta lo consumen los ingredientes. El objetivo estándar en un bar es 18–25 %.'},
      {q:'¿Qué monedas están disponibles?',a:'DrinkCost admite 11 monedas: CHF, EUR, USD, GBP, CAD, XCD, MAD, AED, JPY, AUD y CNY (Yuan chino). La moneda se detecta automáticamente según tu zona horaria.'},
      {q:'¿Cómo funciona el umbral de rentabilidad?',a:'La pestaña Rentabilidad calcula el número mínimo de cócteles que debes vender por servicio para cubrir tus costes fijos (coste barman + gastos fijos). Por debajo de ese umbral, el servicio es deficitario.'},
      {q:'¿Puedo usar DrinkCost en el móvil?',a:'Sí. La herramienta es totalmente responsive y está optimizada para todos los tamaños de pantalla. Funciona en iOS y Android sin necesidad de instalar ninguna aplicación.'},
      {q:'¿Cómo exporto mi ficha técnica?',a:'Haz clic en «Imprimir» para generar un PDF desde tu navegador, o en «Copiar resumen» para copiar los datos clave al portapapeles.'},
      {q:'¿Qué es la tasa de merma / desperdicio?',a:'La tasa de merma aumenta el coste de materia prima para reflejar las pérdidas reales en el servicio: derrames, medidas aproximadas, ingredientes desperdiciados. Se activa en los parámetros avanzados.'},
      {q:'¿Cómo se calcula el precio sugerido?',a:'Coste total de materia prima ÷ (food cost objetivo / 100). Ejemplo: coste 3,50 CHF, objetivo 20 % → precio sugerido 17,50 CHF.'},
      {q:'¿Puedo guardar mis fichas técnicas?',a:'Sí. Haz clic en «Guardar» tras el cálculo — la ficha se conserva localmente en tu navegador (hasta 15 fichas) y puede recargarse desde el panel «Mis fichas». La sincronización multi-dispositivo llegará con las cuentas de usuario (V2).'},
      {q:'¿Para quién es DrinkCost?',a:'DrinkCost está diseñado para jefes de bar, bartenders, directores de F&B y mixólogos — en bares, hoteles, restaurantes y empresas de eventos, en todo el mundo.'},
      {q:'¿Cuál es la diferencia entre margen bruto y margen neto?',a:'Margen bruto = precio de venta − coste de materia prima. El margen neto deduce además el IVA. Activa «Mostrar margen neto» en los resultados para visualizarlo.'},
    ],
  }
};

let currentLang='fr';
function t(key,...args){const v=T[currentLang][key];return typeof v==='function'?v(...args):(v||T.fr[key]||key);}

function setLang(lang,btn){
  currentLang=lang;
  try{localStorage.setItem('dc_lang',lang);}catch(e){}
  document.documentElement.lang=lang;
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  if(typeof gtag!=='undefined')gtag('event','language_change',{language:lang});
  applyTranslations();
}

function applyTranslations(){
  // Intro description (first DOM text — guides Google snippet)
  const introEl=document.getElementById('intro-desc');
  if(introEl)introEl.textContent=t('intro_desc');
  // Header
  document.querySelector('.header-sub').innerHTML=t('title');
  document.querySelector('.tagline').textContent=t('tagline');
  // data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.getAttribute('data-i18n')));
  const netLbl=document.getElementById('rr-unit-net-label');
  if(netLbl) netLbl.textContent=t('rr_unit_net');
  // data-i18n-html elements
  document.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.getAttribute('data-i18n-html')));
  // Panel titles
  document.querySelectorAll('[data-i18n-panel]').forEach(el=>{
    const k=el.getAttribute('data-i18n-panel');
    const icon=el.querySelector('.panel-title-icon');
    const iconHtml=icon?icon.outerHTML+' ':'';
    el.innerHTML=iconHtml+t(k)+'<span style="flex:1;height:1px;background:var(--border);display:inline-block;margin-left:12px"></span>';
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>el.placeholder=t(el.getAttribute('data-i18n-ph')));
  // Rebuild ingredient & produce rows with new lang
  document.querySelectorAll('.ingredient-row').forEach(row=>{
    row.querySelectorAll('label').forEach((lbl,i)=>{
      const keys=['i_name','i_qty','i_unit','i_format','i_cost'];
      if(keys[i])lbl.textContent=t(keys[i]);
    });
    const bvs=row.querySelector('.bvs');
    if(bvs){Array.from(bvs.options).forEach(o=>{o.text=volLabel(parseFloat(o.value));});}
    const ius=row.querySelector('.ing-unit-select');
    if(ius){Array.from(ius.options).forEach(o=>{o.text=o.value;});}
  });
  // Refresh complexity text with current lang
  ['complexity-text','r2-cplx-text','r-cplx-text'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el||!el.dataset.cplxKey) return;
    el.textContent=(T[currentLang].cplx&&T[currentLang].cplx[el.dataset.cplxKey])||el.textContent;
  });
  // Refresh result badge with current lang (key set by calculate())
  const badgeEl=document.getElementById('r-badge');
  if(badgeEl&&badgeEl.dataset.badgeKey)badgeEl.textContent=t(badgeEl.dataset.badgeKey);
  // Labels with currency + /h suffix
  document.querySelectorAll('[data-i18n-cur-h]').forEach(el=>{
    const k=el.getAttribute('data-i18n-cur-h');
    const sym=curSym();
    el.innerHTML=t(k)+' (<span class="cur-label">'+sym+'</span>/h)';
  });
  // Labels with embedded cur-label span (text + currency)
  document.querySelectorAll('[data-i18n-cur]').forEach(el=>{
    const k=el.getAttribute('data-i18n-cur');
    const sym=curSym();
    el.innerHTML=t(k)+' (<span class="cur-label">'+sym+'</span>)';
  });
  // Footer CGU link
  const cguEl=document.getElementById('footer-cgu');
  if(cguEl){const labels={fr:"Conditions d'utilisation",en:'Terms of use',es:'Condiciones de uso'};cguEl.textContent=labels[currentLang]||labels.fr;}
  // Tfoot labels
  const lbls={
    'lbl-total-ing':'tbl_total_ing',
    'lbl-waste':'tbl_waste','lbl-total':'tbl_total',
    'lbl-cocktails-unit':'rr_unit_cocktails','lbl-min-unit':'rr_unit_min',
  };
  Object.entries(lbls).forEach(([id,key])=>{const el=document.getElementById(id);if(el)el.textContent=t(key);});
  // lbl-overhead — respects labor toggle state
  const overheadEl=document.getElementById('lbl-overhead');
  if(overheadEl){const laborOn=document.getElementById('labor-toggle')?.checked;overheadEl.textContent=laborOn?t('tbl_overhead'):t('tbl_overhead_no_labor');}
  // Service type options
  document.querySelectorAll('[data-i18n-opt]').forEach(el=>el.textContent=t(el.getAttribute('data-i18n-opt')));
  document.querySelectorAll('.produce-row').forEach(row=>{
    row.querySelectorAll('label').forEach((lbl,i)=>{
      const keys=['pr_name','pr_pkg','pr_price','pr_qty'];
      if(keys[i])lbl.textContent=t(keys[i]);
    });
    const us=row.querySelector('.prod-unit');
    if(us){Array.from(us.options).forEach(o=>{const km={g:'pu_g',kg:'pu_kg',piece:'pu_piece'};if(km[o.value])o.text=t(km[o.value]);});}
  });
  // SEO content section
  const _si=id=>document.getElementById(id);
  if(_si('seo-h2'))_si('seo-h2').innerHTML=t('seo_h2');
  if(_si('seo-p1'))_si('seo-p1').textContent=t('seo_p1');
  if(_si('seo-h3a'))_si('seo-h3a').textContent=t('seo_h3a');
  if(_si('seo-p2'))_si('seo-p2').textContent=t('seo_p2');
  if(_si('seo-h3b'))_si('seo-h3b').textContent=t('seo_h3b');
  if(_si('seo-p3'))_si('seo-p3').textContent=t('seo_p3');
  // FAQ — render Q&A for current language
  const faqList=document.getElementById('faq-list');
  if(faqList&&T[currentLang].faq){
    faqList.innerHTML=T[currentLang].faq.map(item=>`<details class="faq-item"><summary>${item.q}</summary><p class="faq-a">${item.a}</p></details>`).join('');
  }
  const faqTitle=document.getElementById('faq-title');
  if(faqTitle)faqTitle.innerHTML=t('faq_title');
  const faqTagline=document.getElementById('faq-tagline');
  if(faqTagline)faqTagline.textContent=t('faq_tagline');
  // SEO — update title + metas dynamically on lang change
  document.title=t('seo_title');
  const _m=id=>document.getElementById(id);
  if(_m('meta-desc'))_m('meta-desc').setAttribute('content',t('seo_desc'));
  if(_m('meta-keywords'))_m('meta-keywords').setAttribute('content',t('seo_keywords'));
  if(_m('og-title'))_m('og-title').setAttribute('content',t('seo_title'));
  if(_m('og-desc'))_m('og-desc').setAttribute('content',t('seo_desc'));
  if(_m('og-locale'))_m('og-locale').setAttribute('content',t('seo_og_locale'));
  if(_m('tw-title'))_m('tw-title').setAttribute('content',t('seo_title'));
  if(_m('tw-desc'))_m('tw-desc').setAttribute('content',t('seo_desc'));
  // Sync unit system placeholders after lang change
  applyUnitSystem();
  // Re-render saved recipes list (translated labels + locale dates)
  renderSavedRecipes();
  // FAQPage schema — inject current language Q&A for Google rich snippets
  const faqSchema=_m('faq-schema');
  if(faqSchema&&T[currentLang].faq){
    faqSchema.textContent=JSON.stringify({
      '@context':'https://schema.org',
      '@type':'FAQPage',
      'mainEntity':T[currentLang].faq.map(item=>({
        '@type':'Question',
        'name':item.q,
        'acceptedAnswer':{'@type':'Answer','text':item.a}
      }))
    });
  }
}

function detectLang(){
  let detected=null;
  try{const s=localStorage.getItem('dc_lang');if(s&&T[s])detected=s;}catch(e){}
  if(!detected){
    const lang=(navigator.language||'fr').toLowerCase();
    detected='fr';
    if(lang.startsWith('en'))detected='en';
    else if(lang.startsWith('es'))detected='es';
  }
  currentLang=detected;
  document.documentElement.lang=detected;
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.classList.toggle('active',btn.textContent.toLowerCase()===detected);
  });
  applyTranslations();
}
