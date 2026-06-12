// ===== DATA =====
const CPLX = {
  'direct':        {lvl:1, key:'direct',         label:'Direct (build) — faible complexité', t:2},
  'shaker':        {lvl:2, key:'shaker',          label:'Shaker — complexité modérée', t:3},
  'verre-melange': {lvl:3, key:'verre-melange',   label:'Verre à mélange — bonne maîtrise requise', t:4},
  'blender':       {lvl:2, key:'blender',         label:'Blender — complexité modérée', t:3},
  'infusion':      {lvl:4, key:'infusion',        label:'Infusion / Macération — préparation longue', t:10},
  'carbonation':   {lvl:4, key:'carbonation',     label:'Carbonation — technique avancée', t:8},
  'multi':         {lvl:5, key:'multi',           label:'Multi-techniques — haute complexité', t:7},
};
function getVOLS(){return [{v:200},{v:250},{v:330},{v:500},{v:700},{v:750},{v:1000},{v:1500},{v:0}];}
function volLabel(v){return v===0?t('vol_other'):v+' ml';}
let ingCount=0, prodCount=0, lastRes={};

function showToast(msg, isError = false) {
  let el = document.getElementById('dc-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'dc-toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.toggle('toast-error', isError);
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2600);
}

// ===== TABS =====
function switchTab(t,btn){
  document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(x=>x.classList.remove('active'));
  document.getElementById('tab-'+t).classList.add('active');
  btn.classList.add('active');
}

// ===== COMPLEXITY =====
function setCplx(barId, txtId, method) {
  const c = CPLX[method]||CPLX['direct'];
  document.querySelectorAll('#'+barId+' .cplx-dot').forEach((d,i)=>{
    d.classList.remove('on','hi');
    if(i<c.lvl){ d.classList.add('on'); if(c.lvl>=4) d.classList.add('hi'); }
  });
  const txtEl=document.getElementById(txtId);
  txtEl.textContent=(T[currentLang]&&T[currentLang].cplx&&T[currentLang].cplx[c.key])||c.label||c.key;
  txtEl.dataset.cplxKey=c.key;
  return c;
}

// ===== ADVANCED =====
function toggleAdv(){
  document.getElementById('adv-sec').classList.toggle('open');
  document.getElementById('adv-chev').classList.toggle('open');
}
function toggleWaste(cb){
  const row=document.getElementById('waste-row');
  const inp=document.getElementById('waste-pct');
  const lbl=document.getElementById('waste-lbl');
  row.style.opacity=cb.checked?'1':'.3';
  row.style.pointerEvents=cb.checked?'auto':'none';
  inp.disabled=!cb.checked;
  lbl.classList.toggle('on',cb.checked);
}

// ===== INGREDIENTS =====
function addIng(name='',dose='',vol=700,cost='',unit=null){
  const defaultUnit = currentUnitSystem === 'imperial' ? 'oz' : 'ml';
  const u = unit || defaultUnit;
  const firstOpt = currentUnitSystem === 'imperial' ? 'oz' : 'ml';
  const id=++ingCount;
  const opts=getVOLS().map(v=>`<option value="${v.v}"${v.v===vol?' selected':''}>${volLabel(v.v)}</option>`).join('');
  const ph = currentUnitSystem === 'imperial' ? t('ph_dose_imperial') : t('ph_dose');
  const row=document.createElement('div');
  row.className='ingredient-row'; row.id='ing-'+id;
  row.innerHTML=`
    <div><label>${t('i_name')}</label><input type="text" placeholder="${t('ph_ingredient')}" value="${name}"></div>
    <div><label>${t('i_qty')}</label><input type="number" class="ing-dose-input" placeholder="${ph}" value="${dose}" min="0" step="0.1"></div>
    <div><label>${t('i_unit')}</label>
      <select class="ing-unit-select">
        <option value="${firstOpt}"${u===firstOpt?' selected':''}>${firstOpt}</option>
        <option value="cl"${u==='cl'?' selected':''}>cl</option>
      </select>
    </div>
    <div><label>${t('i_format')}</label><select class="bvs" onchange="toggleCustomVol(${id},this.value)">${opts}</select></div>
    <div id="vol-field-${id}"><label>${t('i_cost')}</label><input type="number" placeholder="${t('ph_bottle')}" value="${cost}" min="0" step="0.5"></div>
    <div><label style="opacity:0">—</label><button class="btn-remove" onclick="document.getElementById('ing-${id}').remove()">×</button></div>
    <div id="custom-vol-${id}" style="display:none;grid-column:4/5;margin-top:-6px">
      <label>${t('i_custom_vol')}</label>
      <input type="number" class="custom-vol-input" placeholder="${t('ph_custom_vol')}" min="1" step="1">
    </div>`;
  document.getElementById('ingredients-list').appendChild(row);
}

function toggleCustomVol(id, val) {
  const customDiv = document.getElementById('custom-vol-'+id);
  if (customDiv) customDiv.style.display = val === '0' ? '' : 'none';
}

function getIngs(){
  return Array.from(document.querySelectorAll('.ingredient-row')).map(row=>{
    const inp=row.querySelectorAll('input');
    const n=inp[0].value.trim();
    const rawDose=parseFloat(inp[1].value)||0;
    const unitSel=row.querySelector('.ing-unit-select');
    const unit=unitSel?unitSel.value:'ml';
    const doseInMl = toMl(rawDose, unit);
    const bvsSel=row.querySelector('.bvs');
    const selectedVol=parseFloat(bvsSel?bvsSel.value:700);
    // If "Autre" selected, use custom vol input
    let v = selectedVol;
    if (selectedVol === 0) {
      const customInp = row.querySelector('.custom-vol-input');
      v = parseFloat(customInp?customInp.value:0)||0;
    }
    const c=parseFloat(inp[2].value)||0;
    if(!n||!rawDose||!c||!v) return null;
    return {name:n, dose:rawDose, unit, doseInMl, bVol:v, bCost:c, doseCost:(c/v)*doseInMl};
  }).filter(Boolean);
}

// ===== PRODUCE =====
function addProduce(){
  const id=++prodCount;
  const row=document.createElement('div');
  row.className='produce-row'; row.id='prod-'+id;
  row.innerHTML=`
    <div><label>${t('pr_name')}</label><input type="text" placeholder="${t('pr_name')}..." oninput="calcProd(${id})"></div>
    <div>
      <label>${t('i_unit')}</label>
      <select class="prod-unit" onchange="calcProd(${id})">
        <option value="g">grammes (g)</option>
        <option value="kg">kilogrammes (kg)</option>
        <option value="piece">pièces</option>
      </select>
    </div>
    <div><label>${t('pr_pkg')}</label><input type="number" placeholder="250" min="0" step="0.1" oninput="calcProd(${id})" class="prod-pkg"></div>
    <div><label>${t('pr_price')} (<span class="cur-label">${curSym()}</span>)</label><input type="number" placeholder="2.50" min="0" step="0.1" oninput="calcProd(${id})" class="prod-price"></div>
    <div><label>${t('pr_qty')}</label><input type="number" placeholder="8" min="0" step="0.1" oninput="calcProd(${id})" class="prod-qty"></div>
    <div><label style="opacity:0">—</label><button class="btn-remove" onclick="document.getElementById('prod-${id}').remove()">×</button></div>
    <div style="grid-column:1/-1;margin-top:-4px;display:flex;align-items:center;gap:12px">
      <div class="produce-cost" id="pc-${id}" style="color:var(--text-faint);flex:1">—</div>
      <div style="font-size:10px;color:var(--text-faint)" id="pc-hint-${id}"></div>
    </div>`;
  document.getElementById('produce-list').appendChild(row);
}
function calcProd(id){
  const row=document.getElementById('prod-'+id);
  const unit=row.querySelector('.prod-unit').value;
  const pkgSize=parseFloat(row.querySelector('.prod-pkg').value)||0;
  const pkgCost=parseFloat(row.querySelector('.prod-price').value)||0;
  const usedQty=parseFloat(row.querySelector('.prod-qty').value)||0;
  const el=document.getElementById('pc-'+id);
  const hint=document.getElementById('pc-hint-'+id);
  if(pkgSize>0&&pkgCost>0&&usedQty>0){
    const costPerUnit=pkgCost/pkgSize;
    const doseCost=costPerUnit*usedQty;
    const pct=(usedQty/pkgSize*100).toFixed(1);
    const uLabel=unit==='piece'?'pièce(s)':unit;
    el.textContent=doseCost.toFixed(4)+' '+curSym();
    el.style.color='var(--gold)';
    hint.textContent=usedQty+' '+uLabel+' — '+pct+'% du paquet · '+costPerUnit.toFixed(4)+' '+curSym()+'/'+uLabel;
  } else { el.textContent='—'; el.style.color='var(--text-faint)'; hint.textContent=''; }
}
function getProdCost(){
  let t=0;
  document.querySelectorAll('.produce-row').forEach(row=>{
    const pkgSize=parseFloat(row.querySelector('.prod-pkg')?.value)||0;
    const pkgCost=parseFloat(row.querySelector('.prod-price')?.value)||0;
    const usedQty=parseFloat(row.querySelector('.prod-qty')?.value)||0;
    if(pkgSize>0&&pkgCost>0&&usedQty>0) t+=(pkgCost/pkgSize)*usedQty;
  });
  return t;
}

// ===== CALCULATE FICHE =====
function calculate(){
  const name=document.getElementById('cocktail-name').value.trim();
  if(!name){showToast(t('err_name'),true);document.getElementById('cocktail-name').focus();return;}
  const ings=getIngs();
  if(!ings.length){showToast(t('err_ing'),true);return;}

  const sp=parseFloat(document.getElementById('sell-price').value)||0;
  const fc=parseFloat(document.getElementById('target-fc').value)||20;
  const gar=parseFloat(document.getElementById('garnish-cost').value)||0;
  const ice=parseFloat(document.getElementById('ice-cost').value)||0;
  const laborOn=document.getElementById('labor-toggle').checked;
  const lab=laborOn?(parseFloat(document.getElementById('labor-cost').value)||0):0;
  const tva=parseFloat(document.getElementById('tva-rate').value)||7.7;
  const wasteOn=document.getElementById('waste-toggle').checked;
  const wastePct=wasteOn?(parseFloat(document.getElementById('waste-pct').value)||0):0;
  const method=document.getElementById('method').value;
  const cplx=CPLX[method]||CPLX['direct'];
  const prodCost=getProdCost();

  const ingTotal=ings.reduce((s,i)=>s+i.doseCost,0);
  const baseM=ingTotal+prodCost+gar+ice;
  const wasteAmt=baseM*(wastePct/100);
  const totalM=baseM+wasteAmt;
  const totalC=totalM+lab;
  const margin=sp>0?sp-totalC:null;
  const fcPct=sp>0?(totalC/sp)*100:null;
  const suggested=totalC/(fc/100);
  const netM=margin!==null?margin-(sp*tva/100):null;

  lastRes={name,totalC,sp,margin,fcPct,suggested,fc,netM,tva};
  if(typeof gtag!=='undefined')gtag('event','calculate',{food_cost_pct:Math.round(fcPct||0)});

  document.getElementById('form-section').style.display='none';
  document.getElementById('result').style.display='block';

  document.getElementById('r-name').textContent=name;
  document.getElementById('r-meta').textContent=[document.getElementById('category').value,document.getElementById('glass').value||null,method].filter(Boolean).join(' · ');
  setCplx('r-cplx-bar','r-cplx-text',method);

  document.getElementById('r-cost').textContent=totalC.toFixed(2);
  document.getElementById('r-price').textContent=sp>0?sp.toFixed(2):'—';
  document.getElementById('r-net').textContent=netM!==null?netM.toFixed(2):'—';

  if(fcPct!==null){
    const cls=fcPct<=fc?'kpi-value kv-g':fcPct<=fc*1.3?'kpi-value kv-o':'kpi-value kv-b';
    document.getElementById('r-fc').textContent=fcPct.toFixed(1); document.getElementById('r-fc').className=cls;
    document.getElementById('r-margin').textContent=margin.toFixed(2); document.getElementById('r-margin').className=cls;
    document.getElementById('r-net').className=netM>=0?'kpi-value kv-g':'kpi-value kv-b';
    document.getElementById('r-bar').style.width=Math.min(fcPct,100)+'%';
    document.getElementById('r-bar').style.background=fcPct<=fc?'var(--teal)':fcPct<=fc*1.3?'var(--accent)':'var(--red)';
    document.getElementById('r-fc-lbl').textContent=fcPct.toFixed(1)+'%';
    const b=document.getElementById('r-badge');
    const bKey=fcPct<=fc?'badge_good':fcPct<=fc*1.3?'badge_ok':'badge_bad';
    b.textContent=t(bKey);
    b.dataset.badgeKey=bKey;
    b.className='rbadge '+(fcPct<=fc?'bg':fcPct<=fc*1.3?'bo':'bb');
    b.style.display='';
  } else {
    document.getElementById('r-fc').textContent='—';
    document.getElementById('r-margin').textContent='—';
    const b=document.getElementById('r-badge');
    b.style.display='none';
    delete b.dataset.badgeKey;
  }

  const tbody=document.getElementById('r-ing-body'); tbody.innerHTML='';
  ings.forEach(i=>{
    const pct=sp>0?((i.doseCost/sp)*100).toFixed(1)+'%':'';
    tbody.innerHTML+=`<tr><td class="in">${i.name}</td><td class="id">${i.dose}${i.unit}</td><td class="id">${i.bCost.toFixed(2)} ${curSym()}/${formatVolume(i.bVol)}</td><td>${i.doseCost.toFixed(3)} ${curSym()}${pct?` <span class="ipct">${pct}</span>`:''}</td></tr>`;
  });
  if(prodCost>0) tbody.innerHTML+=`<tr><td class="id">${t('tbl_fresh')}</td><td class="id">—</td><td class="id">—</td><td>${prodCost.toFixed(3)} ${curSym()}</td></tr>`;

  document.getElementById('r-ing-total').textContent=ingTotal.toFixed(3)+' '+curSym();
  document.getElementById('r-overhead').textContent=(gar+ice+lab).toFixed(2)+' '+curSym();
  const overheadLbl=document.getElementById('lbl-overhead');
  if(overheadLbl)overheadLbl.textContent=laborOn?t('tbl_overhead'):t('tbl_overhead_no_labor');
  if(wasteOn&&wastePct>0){document.getElementById('r-waste-tr').style.display='';document.getElementById('r-waste-val').textContent='+'+wasteAmt.toFixed(3)+' '+curSym()+' ('+wastePct+'%)';}
  else document.getElementById('r-waste-tr').style.display='none';
  document.getElementById('r-total').textContent=totalC.toFixed(2)+' '+curSym();
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.getAttribute('data-i18n')));

  let reco='';
  if(sp<=0){
    reco=t('reco_no_price',totalC.toFixed(2),fc,suggested.toFixed(2),curSym());
    document.getElementById('r-suggest-wrap').style.display='block';
    document.getElementById('r-suggest').textContent=suggested.toFixed(2)+' '+curSym();
  } else if(fcPct<=fc){
    reco=t('reco_good',fcPct.toFixed(1),margin.toFixed(2),curSym());
  } else if(fcPct<=fc*1.3){
    reco=t('reco_ok',fcPct.toFixed(1),fc,suggested.toFixed(2),(suggested-sp).toFixed(2),curSym());
    document.getElementById('r-suggest-wrap').style.display='block';
    document.getElementById('r-suggest').textContent=suggested.toFixed(2)+' '+curSym();
  } else {
    const worst=ings.reduce((a,b)=>a.doseCost>b.doseCost?a:b);
    reco=t('reco_bad',fcPct.toFixed(1),worst.name,worst.doseCost.toFixed(3),suggested.toFixed(2),curSym());
    document.getElementById('r-suggest-wrap').style.display='block';
    document.getElementById('r-suggest').textContent=suggested.toFixed(2)+' '+curSym();
  }
  document.getElementById('r-reco').innerHTML=reco;
  window.scrollTo({top:0,behavior:'smooth'});
}

function toggleNet(){
  document.getElementById('kpi-net').style.display=document.getElementById('net-toggle').checked?'':'none';
}
function newRecipe(){
  document.getElementById('result').style.display='none';
  document.getElementById('form-section').style.display='block';
  document.getElementById('r-suggest-wrap').style.display='none';
  window.scrollTo({top:0,behavior:'smooth'});
}
function copyRes(){
  const r=lastRes;
  const sym=curSym();navigator.clipboard.writeText(t('copy_text',r.name||(r.name||''),(r.totalC||0).toFixed(2),r.sp||'—',r.fcPct?r.fcPct.toFixed(1):'—',r.margin?r.margin.toFixed(2):'—',sym)).then(()=>{showToast(t('copied'));if(typeof gtag!=='undefined')gtag('event','copy_summary');});
}

// ===== RENTABILITÉ =====
function onServiceType(){
  document.getElementById('r2-pax-div').style.display=document.getElementById('r2-type').value==='event'?'':'none';
}
function onR2Method(){
  const c=setCplx('r2-cplx-bar','r2-cplx-text',document.getElementById('r2-method').value);
  document.getElementById('r2-preptime').value=c.t;
}
function calcRenta(){
  const name=document.getElementById('r2-name').value||'Cocktail';
  const price=parseFloat(document.getElementById('r2-price').value)||0;
  const cost=parseFloat(document.getElementById('r2-cost').value)||0;
  const qty=parseFloat(document.getElementById('r2-qty').value)||0;
  const prepT=parseFloat(document.getElementById('r2-preptime').value)||3;
  const hourly=parseFloat(document.getElementById('r2-hourly').value)||35;
  const staff=parseFloat(document.getElementById('r2-staff').value)||0;
  const fixed=parseFloat(document.getElementById('r2-fixed').value)||0;
  const tva=parseFloat(document.getElementById('r2-tva').value)||7.7;
  const method=document.getElementById('r2-method').value;
  const cplx=CPLX[method]||CPLX['direct'];

  if(!price||!cost){showToast(t('err_renta'),true);return;}

  const laborUnit=(prepT/60)*hourly;
  const grossUnit=price-cost;
  const netUnit=grossUnit-laborUnit-(price*tva/100);
  const revenue=price*qty;
  const totalCosts=(cost*qty)+staff+fixed;
  const profit=revenue-totalCosts-(revenue*tva/100);
  const breakEven=(staff+fixed)/Math.max(grossUnit,0.01);
  const totalPrepT=qty*prepT;
  const cLabels=T[currentLang].cplx_levels||['','Faible','Modérée','Modérée+','Élevée','Très élevée'];

  document.getElementById('r2-break').value=Math.ceil(breakEven);
  document.getElementById('renta-result').style.display='block';
  document.getElementById('rr-title').textContent=name;

  const sv=(id,val,good)=>{
    const el=document.getElementById(id); el.textContent=val;
    if(good!==undefined) el.className='ri-value '+(good?'g':'b');
  };
  sv('rr-gross',grossUnit.toFixed(2)+' '+curSym(),grossUnit>0);
  sv('rr-labor',laborUnit.toFixed(2)+' '+curSym());
  sv('rr-net',netUnit.toFixed(2)+' '+curSym(),netUnit>0);
  sv('rr-rev',revenue.toFixed(2)+' '+curSym());
  sv('rr-break',Math.ceil(breakEven)+'');
  sv('rr-profit',profit.toFixed(2)+' '+curSym(),profit>0);
  sv('rr-time',totalPrepT.toFixed(0)+' min');
  document.getElementById('rr-cplx').textContent=(cLabels[cplx.lvl]||'')+' — '+cplx.label.split('—')[0].trim();

  let reco='';
  if(qty>=breakEven*1.3) reco=t('reco_renta_good',qty,Math.ceil(breakEven),profit.toFixed(2),curSym());
  else if(qty>=breakEven) reco=t('reco_renta_ok',Math.ceil(breakEven));
  else reco=t('reco_renta_bad',Math.ceil(breakEven),qty);
  document.getElementById('rr-reco').innerHTML=reco;
  document.getElementById('renta-result').scrollIntoView({behavior:'smooth'});
}

function toggleLabor(cb){
  const inp=document.getElementById('labor-cost');
  inp.disabled=!cb.checked;
  inp.style.opacity=cb.checked?'1':'.3';
  inp.style.cursor=cb.checked?'auto':'not-allowed';
}

// ===== EXAMPLES =====
const EXAMPLES = {
  negroni: {
    name:'Negroni', glass:'Rocks', method:'verre-melange',
    sell:18, fc:20, garnish:0.20, ice:0.15,
    ings:[
      {name:{fr:'Gin London Dry',  en:'Gin London Dry',  es:'Gin London Dry'},  dose:3, vol:700,  cost:18},
      {name:{fr:'Campari',         en:'Campari',         es:'Campari'},          dose:3, vol:1000, cost:17},
      {name:{fr:'Vermouth rouge',  en:'Red vermouth',    es:'Vermut rojo'},      dose:3, vol:1000, cost:12}
    ],
    produce:[]
  },
  mojito: {
    name:'Mojito', glass:'Highball', method:'shaker',
    sell:16, fc:22, garnish:0.20, ice:0.20,
    ings:[
      {name:{fr:'Rhum blanc',       en:'White rum',   es:'Ron blanco'},       dose:5, vol:700, cost:16},
      {name:{fr:'Sirop de canne',   en:'Cane syrup',  es:'Sirope de caña'},   dose:2, vol:700, cost:8},
      {name:{fr:'Jus de citron vert',en:'Lime juice', es:'Zumo de lima'},     dose:3, vol:700, cost:6}
    ],
    produce:[
      {name:{fr:'Menthe fraîche', en:'Fresh mint', es:'Menta fresca'}, unit:'g', pkg:50,  price:2.50, qty:8},
      {name:{fr:'Citron vert',    en:'Lime',       es:'Lima'},          unit:'g', pkg:500, price:3.00, qty:30}
    ]
  },
  spritz: {
    name:'Spritz', glass:'Balloon', method:'direct',
    sell:14, fc:20, garnish:0.15, ice:0.15,
    ings:[
      {name:{fr:'Aperol',      en:'Aperol',          es:'Aperol'},         dose:6, vol:1000, cost:14},
      {name:{fr:'Prosecco',    en:'Prosecco',         es:'Prosecco'},       dose:9, vol:750,  cost:12},
      {name:{fr:'Eau gazeuse', en:'Sparkling water',  es:'Agua con gas'},   dose:3, vol:1000, cost:2.50}
    ],
    produce:[]
  }
};

function loadExample(id) {
  const ex = EXAMPLES[id];
  if (!ex) return;

  // 1. Clear existing ingredient and produce rows
  document.getElementById('ingredients-list').innerHTML = '';
  document.getElementById('produce-list').innerHTML = '';

  // 2. Fill cocktail info fields
  document.getElementById('cocktail-name').value = ex.name;
  document.getElementById('sell-price').value = ex.sell;
  document.getElementById('category').selectedIndex = 0; // all examples are Classique
  document.getElementById('glass').value = ex.glass;
  document.getElementById('method').value = ex.method;
  setCplx('complexity-bar', 'complexity-text', ex.method);
  document.getElementById('target-fc').value = ex.fc;
  document.getElementById('garnish-cost').value = ex.garnish;
  document.getElementById('ice-cost').value = ex.ice;

  // 3. Create each liquid ingredient row (empty), then fill with .value=
  ex.ings.forEach(ing => {
    addIng();
    const rows = document.querySelectorAll('.ingredient-row');
    const row = rows[rows.length - 1];
    row.querySelector('input[type="text"]').value = ing.name[currentLang] || ing.name.fr;
    row.querySelector('.ing-dose-input').value = ing.dose;
    row.querySelector('.ing-unit-select').value = 'cl';
    row.querySelector('.bvs').value = String(ing.vol);
    row.querySelector('input[type="number"]:not(.ing-dose-input):not(.custom-vol-input)').value = ing.cost;
  });

  // 4. Create each fresh ingredient row (empty), then fill with .value=
  ex.produce.forEach(prod => {
    addProduce();
    const rows = document.querySelectorAll('.produce-row');
    const row = rows[rows.length - 1];
    const rowId = parseInt(row.id.replace('prod-', ''));
    row.querySelector('input[type="text"]').value = prod.name[currentLang] || prod.name.fr;
    row.querySelector('.prod-unit').value = prod.unit;
    row.querySelector('.prod-pkg').value = prod.pkg;
    row.querySelector('.prod-price').value = prod.price;
    row.querySelector('.prod-qty').value = prod.qty;
    calcProd(rowId);
  });

  document.getElementById('form-section').scrollIntoView({behavior:'smooth', block:'start'});
  if (typeof gtag !== 'undefined') gtag('event', 'example_loaded', {example: id});
}

// ===== SAVED RECIPES (localStorage, max 15) =====
const MAX_RECIPES = 15;

function escHtml(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function getSavedRecipes(){
  try{const r=JSON.parse(localStorage.getItem('dc_recipes'));return Array.isArray(r)?r:[];}catch(e){return [];}
}
function persistRecipes(list){
  try{localStorage.setItem('dc_recipes',JSON.stringify(list));return true;}catch(e){return false;}
}

function saveRecipe(){
  const name=document.getElementById('cocktail-name').value.trim();
  if(!name){showToast(t('err_name'),true);document.getElementById('cocktail-name').focus();return;}
  const recipes=getSavedRecipes();
  if(recipes.length>=MAX_RECIPES){showToast(t('saved_limit'),true);return;}
  const ings=Array.from(document.querySelectorAll('.ingredient-row')).map(row=>{
    const inp=row.querySelectorAll('input');
    return {
      name:inp[0].value, dose:inp[1].value,
      unit:row.querySelector('.ing-unit-select')?.value||'ml',
      vol:row.querySelector('.bvs')?.value||'700',
      customVol:row.querySelector('.custom-vol-input')?.value||'',
      cost:inp[2].value
    };
  });
  const produce=Array.from(document.querySelectorAll('.produce-row')).map(row=>({
    name:row.querySelector('input[type="text"]')?.value||'',
    unit:row.querySelector('.prod-unit')?.value||'g',
    pkg:row.querySelector('.prod-pkg')?.value||'',
    price:row.querySelector('.prod-price')?.value||'',
    qty:row.querySelector('.prod-qty')?.value||''
  }));
  recipes.unshift({
    id:Date.now(), savedAt:new Date().toISOString(), name,
    sell:document.getElementById('sell-price').value,
    cat:document.getElementById('category').selectedIndex,
    glass:document.getElementById('glass').value,
    method:document.getElementById('method').value,
    fc:document.getElementById('target-fc').value,
    garnish:document.getElementById('garnish-cost').value,
    ice:document.getElementById('ice-cost').value,
    laborOn:document.getElementById('labor-toggle').checked,
    labor:document.getElementById('labor-cost').value,
    tva:document.getElementById('tva-rate').value,
    wasteOn:document.getElementById('waste-toggle').checked,
    wastePct:document.getElementById('waste-pct').value,
    fcPct:lastRes&&lastRes.fcPct?lastRes.fcPct.toFixed(1):null,
    ings, produce
  });
  if(!persistRecipes(recipes)){showToast(t('saved_error'),true);return;}
  renderSavedRecipes();
  showToast(t('saved_ok'));
  if(typeof gtag!=='undefined')gtag('event','recipe_saved');
}

function loadRecipe(id){
  const rec=getSavedRecipes().find(r=>r.id===id);
  if(!rec)return;
  document.getElementById('ingredients-list').innerHTML='';
  document.getElementById('produce-list').innerHTML='';
  document.getElementById('cocktail-name').value=rec.name;
  document.getElementById('sell-price').value=rec.sell;
  document.getElementById('category').selectedIndex=rec.cat||0;
  document.getElementById('glass').value=rec.glass||'';
  document.getElementById('method').value=rec.method||'direct';
  setCplx('complexity-bar','complexity-text',rec.method||'direct');
  document.getElementById('target-fc').value=rec.fc;
  document.getElementById('garnish-cost').value=rec.garnish;
  document.getElementById('ice-cost').value=rec.ice;
  const lt=document.getElementById('labor-toggle');
  if(lt.checked!==!!rec.laborOn){lt.checked=!!rec.laborOn;toggleLabor(lt);}
  if(rec.labor!==undefined)document.getElementById('labor-cost').value=rec.labor;
  if(rec.tva!==undefined)document.getElementById('tva-rate').value=rec.tva;
  const wt=document.getElementById('waste-toggle');
  if(wt.checked!==!!rec.wasteOn){wt.checked=!!rec.wasteOn;toggleWaste(wt);}
  if(rec.wastePct!==undefined)document.getElementById('waste-pct').value=rec.wastePct;
  (rec.ings||[]).forEach(ing=>{
    addIng();
    const rows=document.querySelectorAll('.ingredient-row');
    const row=rows[rows.length-1];
    const inp=row.querySelectorAll('input');
    inp[0].value=ing.name;
    inp[1].value=ing.dose;
    const us=row.querySelector('.ing-unit-select');
    if(us){
      if(!Array.from(us.options).some(o=>o.value===ing.unit)){
        const o=document.createElement('option');o.value=ing.unit;o.text=ing.unit;us.appendChild(o);
      }
      us.value=ing.unit;
    }
    const bvs=row.querySelector('.bvs');
    if(bvs){
      bvs.value=ing.vol;
      toggleCustomVol(row.id.replace('ing-',''),ing.vol);
    }
    if(ing.vol==='0'&&ing.customVol){const cv=row.querySelector('.custom-vol-input');if(cv)cv.value=ing.customVol;}
    inp[2].value=ing.cost;
  });
  (rec.produce||[]).forEach(p=>{
    if(!p.name&&!p.pkg&&!p.price)return;
    addProduce();
    const rows=document.querySelectorAll('.produce-row');
    const row=rows[rows.length-1];
    const rowId=parseInt(row.id.replace('prod-',''));
    row.querySelector('input[type="text"]').value=p.name;
    row.querySelector('.prod-unit').value=p.unit;
    row.querySelector('.prod-pkg').value=p.pkg;
    row.querySelector('.prod-price').value=p.price;
    row.querySelector('.prod-qty').value=p.qty;
    calcProd(rowId);
  });
  calculate();
}

function deleteRecipe(id){
  persistRecipes(getSavedRecipes().filter(r=>r.id!==id));
  renderSavedRecipes();
  showToast(t('saved_deleted'));
}

function renderSavedRecipes(){
  const panel=document.getElementById('saved-panel');
  const list=document.getElementById('saved-list');
  if(!panel||!list)return;
  const recipes=getSavedRecipes();
  if(!recipes.length){panel.style.display='none';list.innerHTML='';return;}
  panel.style.display='';
  const locale=currentLang==='en'?'en-GB':currentLang==='es'?'es-ES':'fr-CH';
  list.innerHTML=recipes.map(r=>{
    const d=new Date(r.savedAt);
    const date=isNaN(d)?'':d.toLocaleDateString(locale);
    const fc=r.fcPct?` · FC ${r.fcPct}%`:'';
    return `<div class="saved-item">
      <span class="si-name">${escHtml(r.name)}</span>
      <span class="si-meta">${date}${fc}</span>
      <button class="btn btn-ghost btn-xs" onclick="loadRecipe(${r.id})">${t('saved_load')}</button>
      <button class="btn btn-ghost btn-xs" onclick="deleteRecipe(${r.id})" aria-label="${t('saved_delete')}" title="${t('saved_delete')}">✕</button>
    </div>`;
  }).join('');
}

// ===== INIT =====
detectCurrency();
detectLang();
detectUnitSystem();
renderSavedRecipes();
addIng(); addIng(); addIng();
setCplx('complexity-bar','complexity-text','direct');
setCplx('r2-cplx-bar','r2-cplx-text','direct');
onServiceType();
