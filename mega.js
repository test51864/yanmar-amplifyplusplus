(() => {
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const MKEY = 'amplifyMega_';
  const read = (k, fallback) => { try { const raw=localStorage.getItem(MKEY+k); return raw===null?fallback:JSON.parse(raw); } catch { return fallback; } };
  const write = (k, value) => localStorage.setItem(MKEY+k, JSON.stringify(value));
  const escapeHtml = (v='') => String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  const icons = {
    dashboard:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9 20v-6h6v6"/>',
    'impact-dashboard':'<path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M3 19h18"/><path d="m15 6 3-3 3 3"/>',
    'product-hub':'<path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/>',
    'brand-centre':'<path d="M5 5h14v14H5z"/><path d="m8 9 4 2 4-2"/><path d="M12 11v5"/>',
    'campaign-studio':'<path d="M4 18V6l10 3v6z"/><path d="M14 10h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4"/><path d="M7 18v3"/><path d="M11 18v3"/>',
    'amplify-ai':'<path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4z"/><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>',
    'seo-sea-lab':'<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/><path d="M8.5 11h5"/><path d="M11 8.5v5"/>',
    'content-library':'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 4v16"/>',
    calendar:'<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
    comparison:'<path d="M7 7h12l-3-3"/><path d="m19 7-3 3"/><path d="M17 17H5l3 3"/><path d="m5 17 3-3"/>',
    tco:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5c-.7-.6-1.7-1-2.8-1-1.7 0-3 .8-3 2s1.3 1.8 3 2 3 1 3 2.2-1.3 2.3-3 2.3c-1.2 0-2.3-.4-3.1-1.1M12.5 6v12"/>',
    localization:'<circle cx="12" cy="12" r="9"/><path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    'market-playbooks':'<path d="M4 6.5 9 4l6 2.5L20 4v13.5L15 20l-6-2.5L4 20z"/><path d="M9 4v13.5M15 6.5V20"/>',
    'event-kit':'<path d="M5 4h14v16H5z"/><path d="M8 2v4M16 2v4M8 10h8M8 14h5"/>',
    'co-marketing':'<path d="M8 12a4 4 0 0 1 4-4h4a4 4 0 1 1 0 8h-2"/><path d="M16 12a4 4 0 0 1-4 4H8a4 4 0 1 1 0-8h2"/>',
    academy:'<path d="m3 8 9-5 9 5-9 5z"/><path d="M7 11v5c2.8 2.2 7.2 2.2 10 0v-5"/>',
    'report-results':'<path d="M5 20V9h4v11M10 20V4h4v16M15 20v-7h4v7M3 20h18"/>',
    support:'<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 1 1 3.8 1.7c-1 .7-1.6 1.1-1.6 2.3M12 17h.01"/>',
    'approval-center':'<path d="M6 3h12v18H6z"/><path d="m9 12 2 2 4-4"/><path d="M9 7h6"/>',
    'user-access':'<circle cx="9" cy="8" r="3"/><path d="M3.5 20c.6-4 2.4-6 5.5-6s4.9 2 5.5 6"/><path d="M17 10v6M14 13h6"/>',
    'admin-console':'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-4v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'
  };

  function svg(path){ return `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`; }
  function applyNavIcons(){
    $$('.nav-item[data-view]').forEach(btn => {
      const icon=$('.nav-icon',btn); if(icon && icons[btn.dataset.view]) icon.innerHTML=svg(icons[btn.dataset.view]);
    });
  }

  function applyBrandFallbacks(){
    $$('.official-brand-image').forEach(img => {
      const fallback=img.parentElement?.querySelector('.yanmar-wordmark-fallback');
      const fail=()=>{ img.style.display='none'; if(fallback) fallback.style.display='inline-block'; };
      img.addEventListener('error',fail,{once:true});
      if(img.complete && img.naturalWidth===0) fail();
    });
    $$('.official-flying-y').forEach(img=>img.addEventListener('error',()=>{img.src='assets/brand/flying-y.svg';},{once:true}));
  }

  const markets = [
    {name:'Saudi Arabia',flag:'SA',score:92,detail:'Arabic activation · strong campaign rhythm'},
    {name:'Poland',flag:'PL',score:88,detail:'Event-led · high content adoption'},
    {name:'UAE',flag:'AE',score:84,detail:'Bilingual activation · strong reporting'},
    {name:'Spain',flag:'ES',score:73,detail:'SEO and local content opportunity'},
    {name:'Netherlands',flag:'NL',score:64,detail:'Dealer activation opportunity'},
    {name:'Germany',flag:'DE',score:59,detail:'Market build-up · localized proof needed'},
    {name:'Hungary',flag:'HU',score:51,detail:'Early activation stage'},
    {name:'Sweden',flag:'SE',score:46,detail:'Content adoption opportunity'}
  ];
  const defaultActivity = [
    {title:'YDP flood-response pack approved',detail:'Asset Library · EMEA',time:'12 min'},
    {title:'Poland submitted YDG event results',detail:'Report Results · 24 qualified leads',time:'44 min'},
    {title:'Spanish landing page entered review',detail:'Approval Centre · SEO localization',time:'2 h'},
    {title:'New YDG comparison created',detail:'Comparison Builder · Netherlands',time:'Today'}
  ];
  function activity(){ return read('activity',defaultActivity); }
  function logActivity(title,detail='Workspace action'){
    const list=activity(); list.unshift({title,detail,time:'Now'}); write('activity',list.slice(0,12)); renderActivity();
  }

  function renderDashboardMega(){
    const dashboard=$('#view-dashboard'); if(!dashboard) return;
    if(!$('#megaNetworkSection')){
      const anchor=$('.pp-launch-grid',dashboard) || $('.dashboard-grid',dashboard);
      const section=document.createElement('section'); section.id='megaNetworkSection';
      section.innerHTML=`<div class="mega-section-title"><div><h3>Distributor network pulse</h3><p>Activation readiness across priority markets.</p></div><span class="mega-live-badge">Live workspace data</span></div><div class="mega-network-grid" id="megaNetworkGrid"></div>`;
      anchor?.insertAdjacentElement('afterend',section);
    }
    $('#megaNetworkGrid').innerHTML=markets.slice(0,4).map(m=>`<button class="mega-network-card" data-mega-market="${m.name}"><div class="top"><span class="flag">${m.flag}</span><span class="score">${m.score}</span></div><strong>${m.name}</strong><small>${m.detail}</small><div class="meter"><i style="width:${m.score}%"></i></div></button>`).join('');
    $$('[data-mega-market]').forEach(b=>b.onclick=()=>{ const nav=$(`.nav-item[data-view="market-playbooks"]`); nav?.click(); setTimeout(()=>{ const target=$(`[data-market="${CSS.escape(b.dataset.megaMarket)}"]`); target?.click(); },80); });

    const target=$('.dashboard-grid:last-of-type',dashboard);
    if(target && !$('#megaActivityPanel')){
      target.insertAdjacentHTML('afterend',`<div class="dashboard-grid"><article class="panel span-12" id="megaActivityPanel"><div class="panel-head"><div><p class="eyebrow">Network activity</p><h3>What changed across Amplify++</h3></div><button class="text-button" id="megaClearActivity">Clear local activity</button></div><div class="mega-activity-feed" id="megaActivityFeed"></div></article></div>`);
      $('#megaClearActivity').onclick=()=>{write('activity',[]);renderActivity();};
    }
    renderActivity(); refreshLiveMetrics();
  }
  function renderActivity(){ const feed=$('#megaActivityFeed'); if(!feed)return; const list=activity(); feed.innerHTML=list.length?list.map(a=>`<div class="mega-activity-item"><i></i><div><strong>${escapeHtml(a.title)}</strong><small>${escapeHtml(a.detail)}</small></div><time>${escapeHtml(a.time)}</time></div>`).join(''):'<div class="pp-empty-state"><h3>No local activity yet</h3><p>Actions taken in this prototype will appear here.</p></div>'; }

  function getJson(key,fallback=[]){ try { const r=localStorage.getItem(key); return r?JSON.parse(r):fallback; }catch{return fallback;} }
  function refreshLiveMetrics(){
    const reports=getJson('amplifyReports',[]), requests=getJson('amplifyRequests',[]);
    const unique=new Set(reports.map(r=>r.market).filter(Boolean));
    if($('#megaActiveMarkets')) $('#megaActiveMarkets').textContent=`${Math.max(unique.size,8)} active markets`;
    if($('#metricReports')) $('#metricReports').textContent=reports.length;
    if($('#metricRequests')) $('#metricRequests').textContent=requests.filter(r=>r.status!=='Completed').length;
    const due=requests.filter(r=>r.status!=='Completed' && r.priority==='High').length;
    if($('#megaNextDeadline')) $('#megaNextDeadline').textContent=due?`${due} high-priority support item${due>1?'s':''}`:'Reporting cycle on track';
  }

  function addSidebarCollapse(){
    const brand=$('.mega-sidebar-brand'); if(!brand || $('#megaSidebarCollapse')) return;
    const btn=document.createElement('button');
    btn.id='megaSidebarCollapse'; btn.className='mega-sidebar-collapse'; btn.type='button'; btn.setAttribute('aria-label','Collapse navigation');
    btn.innerHTML=svg('<path d="m15 18-6-6 6-6"/>');
    brand.appendChild(btn);
    const saved=read('sidebarCollapsed',false); if(saved) document.body.classList.add('mega-sidebar-collapsed');
    btn.onclick=()=>{ document.body.classList.toggle('mega-sidebar-collapsed'); write('sidebarCollapsed',document.body.classList.contains('mega-sidebar-collapsed')); };
  }

  function addOfficialSources(){
    const lab=$('#view-seo-sea-lab .pp-page-head');
    if(lab && !$('#megaSearchSources')){
      const links=document.createElement('div'); links.id='megaSearchSources'; links.className='mega-source-links';
      links.innerHTML='<a href="https://developers.google.com/search/docs/essentials" target="_blank" rel="noreferrer">Google Search Essentials ↗</a><a href="https://support.google.com/google-ads/answer/7684791" target="_blank" rel="noreferrer">Google Ads RSA guidance ↗</a>';
      lab.insertAdjacentElement('afterend',links);
    }
    decorateProductStage();
    const stage=$('#ppProductStage'); if(stage){ new MutationObserver(decorateProductStage).observe(stage,{childList:true,subtree:true}); }
  }
  function decorateProductStage(){
    const stage=$('#ppProductStage'); if(!stage || $('#megaProductSource')) return;
    const hero=$('.pp-product-hero',stage); if(!hero) return;
    const source=document.createElement('a'); source.id='megaProductSource'; source.className='mega-product-source'; source.target='_blank'; source.rel='noreferrer';
    const active=$('.pp-product-tabs button.is-active')?.dataset.ppProduct || 'YDG';
    const urls={YDG:'https://www.yanmar.com/eu/industrial/ydg-portable-diesel-generator/',YDP:'https://www.yanmar.com/eu/industrial/ydp-portable-diesel-pumps/','L-Series':'https://www.yanmar.com/eu/industrial/engines/'};
    source.href=urls[active]; source.textContent='Official Yanmar product source ↗'; hero.appendChild(source);
  }

  function addReportEvidenceUpload(){
    const ev=$('#reportEvidence'); if(!ev || $('#megaReportFile')) return;
    const label=document.createElement('label');
    label.innerHTML='<span>Evidence file <small style="font-weight:400;color:var(--muted)">optional · stored as file name in this static prototype</small></span><input id="megaReportFile" type="file" accept="image/*,.pdf,.doc,.docx,.xlsx,.csv" />';
    ev.closest('label')?.insertAdjacentElement('afterend',label);
    $('#megaReportFile').addEventListener('change',e=>{ const f=e.target.files?.[0]; if(f){ ev.value=f.name; logActivity('Evidence attached to result report',f.name); } });
  }

  function enhanceAssetLibrary(){
    const bar=$('#view-content-library .filter-bar');
    if(bar && !$('#megaFavoritesToggle')){
      const b=document.createElement('button');b.id='megaFavoritesToggle';b.className='secondary-button mega-favorites-toggle';b.type='button';b.innerHTML='☆ Favorites';bar.appendChild(b);
      b.onclick=()=>{const on=!read('favoritesOnly',false);write('favoritesOnly',on);b.classList.toggle('is-active',on);b.innerHTML=on?'★ Favorites only':'☆ Favorites';decorateAssetCards();};
      const on=read('favoritesOnly',false);b.classList.toggle('is-active',on);b.innerHTML=on?'★ Favorites only':'☆ Favorites';
    }
    const grid=$('#assetGrid');
    if(grid && !grid.dataset.megaObserved){
      grid.dataset.megaObserved='1';
      const observer=new MutationObserver(()=>requestAnimationFrame(decorateAssetCards));observer.observe(grid,{childList:true,subtree:false});
      ['assetSearch','assetProduct','assetType'].forEach(id=>$('#'+id)?.addEventListener('input',()=>setTimeout(decorateAssetCards,20)));
    }
    ['openUploadAsset','adminUploadButton'].forEach(id=>$('#'+id)?.addEventListener('click',()=>setTimeout(bindAssetModalPersistence,30)));
    decorateAssetCards();
  }
  function favoriteKey(card){return card.querySelector('.asset-body h3')?.textContent?.trim()||'';}
  function decorateAssetCards(){
    const grid=$('#assetGrid');if(!grid)return;
    appendCustomAssets();
    const favs=read('assetFavorites',[]),only=read('favoritesOnly',false);
    $$('.asset-card',grid).forEach(card=>{
      const key=favoriteKey(card);if(!key)return;
      let star=$('.mega-asset-star',card);
      if(!star){star=document.createElement('button');star.type='button';star.className='mega-asset-star';star.setAttribute('aria-label','Toggle favorite');$('.asset-thumb',card)?.appendChild(star);star.onclick=e=>{e.stopPropagation();let list=read('assetFavorites',[]);list=list.includes(key)?list.filter(x=>x!==key):[...list,key];write('assetFavorites',list);decorateAssetCards();logActivity(list.includes(key)?'Asset saved to favorites':'Asset removed from favorites',key);};}
      star.textContent=favs.includes(key)?'★':'☆';star.classList.toggle('is-active',favs.includes(key));card.hidden=only&&!favs.includes(key);
    });
  }
  function appendCustomAssets(){
    const grid=$('#assetGrid');if(!grid)return;
    const items=read('customAssets',[]);
    const search=($('#assetSearch')?.value||'').toLowerCase(),product=$('#assetProduct')?.value||'all',type=$('#assetType')?.value||'all';
    items.forEach(a=>{
      if(grid.querySelector(`[data-mega-custom-asset="${a.id}"]`))return;
      const match=`${a.title} ${a.description} ${a.product} ${a.type}`.toLowerCase().includes(search)&&(product==='all'||a.product===product)&&(type==='all'||a.type===type);if(!match)return;
      const card=document.createElement('article');card.className='asset-card';card.dataset.megaCustomAsset=a.id;card.innerHTML=`<div class="asset-thumb ${a.theme||'red'}"><small>${escapeHtml(a.product)} · ${escapeHtml(a.type)}</small><strong>${escapeHtml(a.title)}</strong><small>LOCAL · ADMIN ADDED</small></div><div class="asset-body"><div class="asset-tags"><span>${escapeHtml(a.product)}</span><span>${escapeHtml(a.type)}</span><span>HQ approved</span></div><h3>${escapeHtml(a.title)}</h3><p>${escapeHtml(a.description)}</p><div class="asset-actions"><small>Local prototype asset</small><button class="mega-custom-download">Download</button></div></div>`;
      $('.mega-custom-download',card).onclick=()=>{const blob=new Blob([`${a.title}\n\n${a.description}\n\nProduct: ${a.product}\nType: ${a.type}`],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`${a.title.replace(/\s+/g,'-').toLowerCase()}.txt`;link.click();URL.revokeObjectURL(url);logActivity('Custom asset downloaded',a.title);};
      grid.appendChild(card);
    });
  }
  function bindAssetModalPersistence(){
    const title=$('#modalAssetTitle'),actions=$('#modalActions');if(!title||!actions)return;
    const primary=$('.primary-button',actions);if(!primary||primary.dataset.megaPersistBound)return;primary.dataset.megaPersistBound='1';
    primary.addEventListener('click',()=>{const item={id:Date.now(),title:title.value||'Approved asset',product:$('#modalAssetProduct')?.value||'YDG',type:$('#modalAssetType')?.value||'Social',description:$('#modalAssetDescription')?.value||'Approved distributor resource.',theme:$('#modalAssetProduct')?.value==='YDP'?'blue':$('#modalAssetProduct')?.value==='L-Series'?'green':'red'};const list=read('customAssets',[]);list.unshift(item);write('customAssets',list);setTimeout(decorateAssetCards,50);logActivity('Approved asset added',`${item.product} · ${item.title}`);},{once:true});
  }

  function bindUtmBuilder(){
    const build=()=>{
      const raw=$('#megaUtmUrl')?.value?.trim();if(!raw)return;
      try{const u=new URL(raw);const vals={utm_source:$('#megaUtmSource').value.trim(),utm_medium:$('#megaUtmMedium').value.trim(),utm_campaign:$('#megaUtmCampaign').value.trim(),utm_content:$('#megaUtmContent').value.trim()};Object.entries(vals).forEach(([k,v])=>{if(v)u.searchParams.set(k,v.toLowerCase().replace(/\s+/g,'-'));});$('#megaUtmOutput').textContent=u.toString();write('lastUtm',u.toString());logActivity('Tracking URL built',vals.utm_campaign||'UTM Builder');}catch{$('#megaUtmOutput').textContent='Enter a valid absolute URL beginning with https://';}
    };
    $('#megaBuildUtm')?.addEventListener('click',build);
    $('#megaCopyUtm')?.addEventListener('click',async()=>{const v=$('#megaUtmOutput')?.textContent||'';if(!/^https?:/.test(v))return;try{await navigator.clipboard.writeText(v);}catch{}showSimpleToast('Tracking URL copied');});
    $('#megaDownloadUtm')?.addEventListener('click',()=>{const v=$('#megaUtmOutput')?.textContent||'';if(!/^https?:/.test(v))return;const blob=new Blob([v],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='amplify-campaign-url.txt';a.click();URL.revokeObjectURL(url);});
    const saved=read('lastUtm','');if(saved&&$('#megaUtmOutput'))$('#megaUtmOutput').textContent=saved;
  }

  function addAdminDataTools(){
    const admin=$('#view-admin-console'); if(!admin || $('#megaAdminDataTools')) return;
    const block=document.createElement('section'); block.id='megaAdminDataTools';
    block.innerHTML=`<div class="mega-section-title"><div><h3>Workspace data & governance</h3><p>Backup, restore or reset the local prototype workspace.</p></div><span class="source-chip">LOCAL PROTOTYPE STORAGE</span></div><div class="mega-admin-tools"><article class="mega-admin-tool"><strong>Export workspace backup</strong><p>Download all Amplify++ localStorage records as one portable JSON backup.</p><button class="secondary-button" id="megaExportBackup">Export backup</button></article><article class="mega-admin-tool"><strong>Restore workspace backup</strong><p>Import a previously exported JSON file and restore compatible local data.</p><input id="megaImportBackupInput" type="file" accept="application/json" hidden><button class="secondary-button" id="megaImportBackup">Choose backup</button></article><article class="mega-admin-tool"><strong>Reset demo workspace</strong><p>Clear locally stored prototype changes and return to seeded demo data.</p><button class="secondary-button" id="megaResetWorkspace">Reset local data</button></article></div>`;
    admin.appendChild(block);
    $('#megaExportBackup').onclick=exportBackup;
    $('#megaImportBackup').onclick=()=>$('#megaImportBackupInput').click();
    $('#megaImportBackupInput').onchange=importBackup;
    $('#megaResetWorkspace').onclick=()=>{
      if(!confirm('Reset all locally stored Amplify++ demo data on this browser?')) return;
      Object.keys(localStorage).filter(k=>k.startsWith('amplify') && k!=='amplifySession').forEach(k=>localStorage.removeItem(k));
      logActivity('Workspace reset','Local demo data returned to defaults');
      location.reload();
    };
  }
  function exportBackup(){
    const data={version:'Amplify++ Mega 1.0',exportedAt:new Date().toISOString(),storage:{}};
    Object.keys(localStorage).filter(k=>k.startsWith('amplify')).forEach(k=>data.storage[k]=localStorage.getItem(k));
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='yanmar-amplify-plus-plus-backup.json';a.click();URL.revokeObjectURL(url);
    logActivity('Workspace backup exported','Admin Console');
  }
  function importBackup(e){
    const file=e.target.files?.[0]; if(!file)return; const r=new FileReader();
    r.onload=()=>{ try{ const data=JSON.parse(r.result); if(!data.storage) throw new Error('Invalid backup'); Object.entries(data.storage).forEach(([k,v])=>{if(k.startsWith('amplify')) localStorage.setItem(k,v);}); alert('Backup restored. Amplify++ will reload.'); location.reload(); }catch{ alert('This file is not a valid Amplify++ backup.'); } }; r.readAsText(file);
  }

  function persistGovernanceSettings(){
    const admin=$('#view-admin-console'); if(!admin) return;
    const checks=$$('.settings-list input[type="checkbox"]',admin); const saved=read('governance',null);
    if(saved) checks.forEach((c,i)=>c.checked=saved[i] ?? c.checked);
    checks.forEach(c=>c.addEventListener('change',()=>{ write('governance',checks.map(x=>x.checked)); logActivity('Governance setting updated','Admin Console'); }));
  }

  function addCampaignApprovalAction(){
    const panel=$('#activationPlanPanel'); if(!panel) return;
    const actions=$('.panel-head .button-row',panel); if(!actions || $('#megaSubmitCampaignApproval')) return;
    const b=document.createElement('button'); b.id='megaSubmitCampaignApproval'; b.className='primary-button'; b.textContent='Submit for HQ approval';
    actions.prepend(b);
    b.onclick=()=>{
      const list=getJson('amplifyPP_approvals',[]);
      const item={id:`AP-${Date.now().toString().slice(-5)}`,type:'Campaign',title:$('#campaignName')?.value||'Campaign activation plan',market:$('#campaignMarket')?.value||'Local market',author:'Distributor user',submitted:'Just now',content:panel.innerText.slice(0,700)};
      list.unshift(item); localStorage.setItem('amplifyPP_approvals',JSON.stringify(list));
      if($('#ppApprovalCount')) $('#ppApprovalCount').textContent=list.length;
      logActivity('Campaign submitted for HQ approval',`${item.market} · ${item.title}`);
      showSimpleToast('Campaign submitted','The activation plan is now in the HQ approval queue.');
    };
  }

  function showSimpleToast(title,detail=''){
    const region=$('#toastRegion'); if(!region)return; const n=document.createElement('div');n.className='toast';n.innerHTML=`<div><strong>${escapeHtml(title)}</strong><small>${escapeHtml(detail)}</small></div><button>×</button>`; n.querySelector('button').onclick=()=>n.remove();region.appendChild(n);setTimeout(()=>n.remove(),4200);
  }

  function bindActivitySignals(){
    const map={
      saveCampaign:['Campaign draft saved','Campaign Builder'],
      downloadCampaignPlan:['Campaign brief exported','Campaign Builder'],
      copyAiOutput:['AI draft copied','Content Studio AI'],
      downloadAiOutput:['AI draft exported','Content Studio AI'],
      ppAnalyzeSeo:['SEO readiness analyzed','SEO & SEA Lab'],
      ppGenerateSea:['Search-ad assets generated','SEO & SEA Lab'],
      ppGenerateMeta:['Metadata draft generated','SEO & SEA Lab'],
      ppExportEvent:['Event kit exported','Event Kit Builder'],
      ppDownloadProductBrief:['Product brief exported','Product Hub'],
      exportAllReports:['Result database exported','Report Results'],
      ppExportImpact:['Impact snapshot exported','Impact Dashboard']
    };
    Object.entries(map).forEach(([id,msg])=>$('#'+id)?.addEventListener('click',()=>logActivity(msg[0],msg[1])));
    $('#campaignForm')?.addEventListener('submit',()=>setTimeout(addCampaignApprovalAction,30));
    $('#reportForm')?.addEventListener('submit',()=>{setTimeout(()=>{refreshLiveMetrics();logActivity('Distributor result report submitted',$('#reportMarket')?.value||'Local market');},50);});
    $('#supportForm')?.addEventListener('submit',()=>setTimeout(()=>{refreshLiveMetrics();logActivity('New support request submitted',$('#supportTitle')?.value||'Support Centre');},50));
    $('#submitLocalization')?.addEventListener('click',()=>logActivity('Localization submitted for review',$('#localizationMarket')?.value||'Local market'));
  }

  function bindBrandCentre(){
    $('#megaCopyBrandRed')?.addEventListener('click',async()=>{
      try{ await navigator.clipboard.writeText('#E60012'); }catch{}
      showSimpleToast('Yanmar Red copied','#E60012'); logActivity('Brand color copied','Brand Centre · #E60012');
    });
    $('#megaDownloadBrandReference')?.addEventListener('click',()=>{
      const text=`YANMAR AMPLIFY++ — BRAND REFERENCE\n\nPrimary brand red: #E60012\nCore visual hierarchy: white / black / Yanmar red\n\nPRE-PUBLISH CHECKS\n1. Correct product naming\n2. Verified model-specific claims\n3. Clear professional customer value\n4. Local relevance\n5. Visible Yanmar identity\n6. Human review before publication\n\nOfficial brand page: https://www.yanmar.com/global/about/brand/`;
      const blob=new Blob([text],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='yanmar-amplify-brand-reference.txt';a.click();URL.revokeObjectURL(url);
      logActivity('Brand reference exported','Brand Centre');
    });
  }

  function addVersionAndEnvironment(){
    const footer=$('.sidebar-footer'); if(!footer || $('#megaVersion')) return;
    const v=document.createElement('div');v.id='megaVersion';v.className='mega-version';v.innerHTML='<span>AMPLIFY++ MEGA</span><small>Prototype build 1.0 · 2026</small>';footer.insertBefore(v,footer.firstChild);
  }

  function updateManifestBrand(){
    const theme=document.querySelector('meta[name="theme-color"]'); if(theme) theme.content=document.body.classList.contains('dark')?'#0c0d0f':'#ffffff';
    $('#themeButton')?.addEventListener('click',()=>setTimeout(()=>{if(theme) theme.content=document.body.classList.contains('dark')?'#0c0d0f':'#ffffff';},30));
  }

  function init(){
    applyNavIcons();
    applyBrandFallbacks();
    addSidebarCollapse();
    addOfficialSources();
    addReportEvidenceUpload();
    enhanceAssetLibrary();
    bindUtmBuilder();
    addAdminDataTools();
    bindBrandCentre();
    persistGovernanceSettings();
    addVersionAndEnvironment();
    bindActivitySignals();
    updateManifestBrand();
    renderDashboardMega();
    setTimeout(addCampaignApprovalAction,100);
  }

  document.addEventListener('DOMContentLoaded',init);
})();
