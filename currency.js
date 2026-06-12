// ===== CURRENCY =====
const CURRENCIES = {
  'CHF': { symbol: 'CHF', locale: 'fr-CH' },
  'EUR': { symbol: '€',   locale: 'fr-FR' },
  'USD': { symbol: '$',   locale: 'en-US' },
  'GBP': { symbol: '£',   locale: 'en-GB' },
  'CAD': { symbol: 'CA$', locale: 'fr-CA' },
  'XCD': { symbol: 'EC$', locale: 'en-AG' },
  'MAD': { symbol: 'MAD', locale: 'fr-MA' },
  'AED': { symbol: 'AED', locale: 'ar-AE' },
  'JPY': { symbol: '¥',   locale: 'ja-JP' },
  'AUD': { symbol: 'A$',  locale: 'en-AU' },
  'CNY': { symbol: 'CN¥', locale: 'zh-CN' },
};
let currentCurrency = 'CHF';

function setCurrency(code) {
  currentCurrency = code;
  try { localStorage.setItem('dc_cur', code); } catch(e) {}
  const cur = CURRENCIES[code] || CURRENCIES['CHF'];
  document.getElementById('currency-symbol').textContent = cur.symbol;
  document.querySelectorAll('.cur-label').forEach(el => el.textContent = cur.symbol);
  // Refresh labels that embed currency symbol
  applyTranslations();
}

function curSym() {
  return (CURRENCIES[currentCurrency] || CURRENCIES['CHF']).symbol;
}

function formatVolume(ml) {
  if (!ml || ml <= 0) return '?';
  if (ml < 100) return ml + 'ml';
  if (ml < 1000) return (ml / 10) + 'cl';
  const l = ml / 1000;
  return (l % 1 === 0 ? l : l.toFixed(1)) + 'L';
}

function detectCurrency() {
  try {
    const stored = localStorage.getItem('dc_cur');
    if (stored && CURRENCIES[stored]) {
      document.getElementById('currency-select').value = stored;
      setCurrency(stored);
      return;
    }
  } catch(e) {}
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = (navigator.language || 'fr-CH').toLowerCase();
    let code = 'CHF'; // default
    if (tz.includes('Zurich') || tz.includes('Geneva') || lang.includes('ch')) code = 'CHF';
    else if (tz.includes('London') || lang.startsWith('en-gb')) code = 'GBP';
    else if (lang.startsWith('en-us') || ['New_York','Los_Angeles','Chicago','Denver','Phoenix','Detroit','Anchorage','Boise','Indiana','Kentucky','Honolulu'].some(c => tz.includes(c))) code = 'USD';
    else if (tz.includes('Paris') || tz.includes('Berlin') || tz.includes('Rome') || tz.includes('Madrid') || lang.startsWith('fr-fr') || lang.startsWith('de') || lang.startsWith('it') || lang.startsWith('es-es')) code = 'EUR';
    else if (['Toronto','Montreal','Vancouver','Edmonton','Winnipeg','Regina','Halifax','St_Johns'].some(c => tz.includes(c)) || lang.startsWith('fr-ca') || lang.startsWith('en-ca')) code = 'CAD';
    else if (tz.includes('Antigua') || tz.includes('Barbados')) code = 'XCD';
    else if (tz.includes('Guadeloupe') || tz.includes('Martinique') || tz.includes('Reunion') || tz.includes('Mayotte')) code = 'EUR';
    else if (tz.includes('Casablanca')) code = 'MAD';
    else if (tz.includes('Dubai') || tz.includes('Abu_Dhabi')) code = 'AED';
    else if (tz.includes('Tokyo')) code = 'JPY';
    else if (tz.includes('Sydney') || tz.includes('Melbourne')) code = 'AUD';
    else if (tz.includes('Shanghai') || tz.includes('Chongqing') || tz.includes('Harbin') || tz.includes('Urumqi') || lang.startsWith('zh')) code = 'CNY';
    else if (tz.startsWith('America/')) code = 'USD'; // Americas fallback — less wrong than CHF
    document.getElementById('currency-select').value = code;
    setCurrency(code);
  } catch(e) { setCurrency('CHF'); }
}

// ===== UNIT SYSTEM =====
let currentUnitSystem = 'metric';
const OZ_TO_ML = 29.5735;

function setUnitSystem(system, btn) {
  currentUnitSystem = system;
  try { localStorage.setItem('dc_unit', system); } catch(e) {}
  document.querySelectorAll('.unit-btn').forEach((b, i) => {
    b.classList.toggle('active', i === (system === 'imperial' ? 1 : 0));
  });
  if (typeof gtag !== 'undefined') gtag('event', 'unit_system_change', {system});
  applyUnitSystem();
}

function applyUnitSystem() {
  const isImp = currentUnitSystem === 'imperial';
  const firstOpt = isImp ? 'oz' : 'ml';
  document.querySelectorAll('.ingredient-row').forEach(row => {
    const sel = row.querySelector('.ing-unit-select');
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = `<option value="${firstOpt}">${firstOpt}</option><option value="cl">cl</option>`;
    if (cur === 'cl') sel.value = cur;
  });
  const ph = isImp ? t('ph_dose_imperial') : t('ph_dose');
  document.querySelectorAll('.ing-dose-input').forEach(inp => { inp.placeholder = ph; });
}

function toMl(value, unit) {
  if (unit === 'oz') return value * OZ_TO_ML;
  if (unit === 'cl') return value * 10;
  return value; // ml or g — used as-is
}

function unitLabel() {
  return currentUnitSystem === 'imperial' ? 'oz' : 'ml';
}

function detectUnitSystem() {
  try {
    const stored = localStorage.getItem('dc_unit');
    if (stored === 'imperial' || stored === 'metric') {
      currentUnitSystem = stored;
      document.querySelectorAll('.unit-btn').forEach((b,i) => b.classList.toggle('active', i === (stored === 'imperial' ? 1 : 0)));
      return;
    }
  } catch(e) {}
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = (navigator.language || '').toLowerCase();
    const CAexclusions = ['America/Toronto','America/Vancouver','America/Winnipeg',
      'America/Regina','America/Halifax','America/St_Johns',
      'America/Guadeloupe','America/Martinique','America/Cayenne'];
    const isUS = lang.startsWith('en-us') ||
      (tz.startsWith('America/') && !CAexclusions.some(z => tz.includes(z.split('/')[1])));
    if (isUS) {
      currentUnitSystem = 'imperial';
      document.querySelectorAll('.unit-btn').forEach((b,i) => b.classList.toggle('active', i===1));
    }
  } catch(e) {}
}
