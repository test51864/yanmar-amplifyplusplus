(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const store = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const state = {
    role: store.get('amplifyRole', 'distributor'),
    language: store.get('amplifyLanguage', 'en'),
    currentView: 'dashboard',
    selectedMessage: 'Reliable professional power',
    calendarDate: new Date(2026, 6, 1),
    seaAssets: null
  };

  const assets = [
    { id: 1, product: 'YDG', type: 'Social', title: 'Reliable Power LinkedIn Pack', description: 'Approved post formats for construction and rental audiences.', format: 'ZIP · 12 assets', downloads: 14, theme: 'red' },
    { id: 2, product: 'YDP', type: 'Website', title: 'Flood Response Use-Case Page', description: 'Web copy, image guidance and CTA structure for dewatering applications.', format: 'DOCX · Web copy', downloads: 9, theme: 'blue' },
    { id: 3, product: 'L-Series', type: 'Sales', title: 'OEM Value Story', description: 'Sales narrative focused on integration, service and lifecycle value.', format: 'PPTX · 8 slides', downloads: 7, theme: 'green' },
    { id: 4, product: 'YDG', type: 'Sales', title: 'Rental Fleet Comparison Sheet', description: 'Editable buyer-enablement sheet for rental-company conversations.', format: 'XLSX · Editable', downloads: 18, theme: 'red' },
    { id: 5, product: 'YDP', type: 'Social', title: 'Emergency Water Removal Pack', description: 'Short-form copy and visual directions for local social channels.', format: 'ZIP · 8 assets', downloads: 11, theme: 'blue' },
    { id: 6, product: 'YDG', type: 'Technical', title: 'YDG Specification Overview', description: 'Approved product facts and mandatory verification notes.', format: 'PDF · Technical', downloads: 23, theme: 'red' },
    { id: 7, product: 'L-Series', type: 'Website', title: 'Industrial Engine Page Framework', description: 'Modular website copy structure for local OEM markets.', format: 'DOCX · Template', downloads: 5, theme: 'green' },
    { id: 8, product: 'YDP', type: 'Sales', title: 'Agricultural Application Brief', description: 'Use-case story for drainage, irrigation and emergency applications.', format: 'PDF · 4 pages', downloads: 8, theme: 'blue' },
    { id: 9, product: 'YDG', type: 'Website', title: 'SEO Landing Page Template', description: 'Search-ready structure with title, metadata and FAQ guidance.', format: 'DOCX · Template', downloads: 16, theme: 'red' }
  ];

  const defaultReports = [
    { id: 101, campaign: 'YDG Reliable Power Campaign', market: 'Netherlands', product: 'YDG', channel: 'LinkedIn', reach: 12500, clicks: 640, leads: 18, opportunities: 4, date: '2026-07-25', status: 'Submitted', worked: 'Application-led posts generated relevant dealer questions.', improve: 'More local construction visuals are needed.' },
    { id: 102, campaign: 'YDP Flood Response', market: 'Poland', product: 'YDP', channel: 'Website', reach: 8700, clicks: 512, leads: 15, opportunities: 3, date: '2026-07-18', status: 'Submitted', worked: 'Local flood-use case improved relevance.', improve: 'Need translated technical diagrams.' },
    { id: 103, campaign: 'Rental Fleet Value', market: 'Spain', product: 'YDG', channel: 'Email', reach: 4200, clicks: 226, leads: 11, opportunities: 2, date: '2026-07-12', status: 'Submitted', worked: 'TCO argument supported distributor sales calls.', improve: 'Comparison data should be easier to localize.' },
    { id: 104, campaign: 'Professional Pump Demo', market: 'UAE', product: 'YDP', channel: 'Event', reach: 3100, clicks: 185, leads: 24, opportunities: 8, date: '2026-06-30', status: 'Submitted', worked: 'Live demonstrations and Arabic support performed well.', improve: 'Need follow-up email templates.' },
    { id: 105, campaign: 'YDG Construction Reliability', market: 'Saudi Arabia', product: 'YDG', channel: 'LinkedIn', reach: 19800, clicks: 1120, leads: 33, opportunities: 9, date: '2026-06-21', status: 'Submitted', worked: 'Reliability and runtime messaging resonated.', improve: 'More content for rental customers.' }
  ];

  const defaultRequests = [
    { id: 201, title: 'German YDP flood-response copy', type: 'Local content adaptation', product: 'YDP', priority: 'High', deadline: '2026-08-04', status: 'In progress', market: 'Germany' },
    { id: 202, title: 'YDG rental application photography', type: 'New campaign asset', product: 'YDG', priority: 'Normal', deadline: '2026-08-14', status: 'Waiting for asset', market: 'Netherlands' },
    { id: 203, title: 'Polish comparison data review', type: 'Comparison data', product: 'YDG', priority: 'Normal', deadline: '2026-08-09', status: 'Planned', market: 'Poland' },
    { id: 204, title: 'Arabic product email', type: 'Translation support', product: 'YDP', priority: 'Normal', deadline: '2026-07-31', status: 'Completed', market: 'UAE' },
    { id: 205, title: 'Spanish event poster update', type: 'Event support', product: 'YDG', priority: 'Normal', deadline: '2026-09-03', status: 'Postponed', market: 'Spain' }
  ];

  const defaultCalendarEvents = [
    { date: '2026-07-03', title: 'YDG reliability post', status: 'published' },
    { date: '2026-07-08', title: 'YDP use-case review', status: 'approval' },
    { date: '2026-07-14', title: 'Rental email campaign', status: 'progress' },
    { date: '2026-07-21', title: 'L-Series OEM story', status: 'planned' },
    { date: '2026-07-29', title: 'Construction power post', status: 'planned' },
    { date: '2026-08-04', title: 'Flood response page', status: 'planned' },
    { date: '2026-08-12', title: 'Rental comparison', status: 'planned' }
  ];

  const defaultApprovals = [
    { id: 301, type: 'NL', title: 'Dutch YDG landing page', detail: 'Localization · Netherlands' },
    { id: 302, type: 'AD', title: 'Spanish responsive search ad', detail: 'SEA assets · Spain' },
    { id: 303, type: 'PL', title: 'Polish comparison sheet', detail: 'Sales asset · Poland' },
    { id: 304, type: 'AR', title: 'Arabic YDP campaign email', detail: 'Localization · UAE' }
  ];

  if (!localStorage.getItem('amplifyReports')) store.set('amplifyReports', defaultReports);
  if (!localStorage.getItem('amplifyRequests')) store.set('amplifyRequests', defaultRequests);
  if (!localStorage.getItem('amplifyCalendar')) store.set('amplifyCalendar', defaultCalendarEvents);
  if (!localStorage.getItem('amplifyApprovals')) store.set('amplifyApprovals', defaultApprovals);

  const translations = {
    en: {
      dashboard: 'Dashboard', contentLibrary: 'Content Library', campaignStudio: 'Campaign Studio', amplifyAi: 'Amplify AI', calendar: 'Content Calendar', comparison: 'Comparison Builder', tco: 'TCO Calculator', localization: 'Localization Hub', reportResults: 'Report Results', support: 'Support Requests', adminConsole: 'Admin Console'
    },
    nl: {
      dashboard: 'Dashboard', contentLibrary: 'Contentbibliotheek', campaignStudio: 'Campagnestudio', amplifyAi: 'Amplify AI', calendar: 'Contentkalender', comparison: 'Vergelijkingstool', tco: 'TCO-calculator', localization: 'Lokalisatiehub', reportResults: 'Resultaten rapporteren', support: 'Supportverzoeken', adminConsole: 'Beheeromgeving'
    },
    ar: {
      dashboard: 'لوحة التحكم', contentLibrary: 'مكتبة المحتوى', campaignStudio: 'استوديو الحملات', amplifyAi: 'Amplify AI', calendar: 'تقويم المحتوى', comparison: 'أداة المقارنة', tco: 'حاسبة التكلفة', localization: 'مركز التوطين', reportResults: 'تقارير النتائج', support: 'طلبات الدعم', adminConsole: 'لوحة الإدارة'
    }
  };

  function toast(title, detail = '') {
    const region = $('#toastRegion');
    const item = document.createElement('div');
    item.className = 'toast';
    item.innerHTML = `<div><strong>${escapeHtml(title)}</strong>${detail ? `<small>${escapeHtml(detail)}</small>` : ''}</div><button aria-label="Close">×</button>`;
    $('button', item).addEventListener('click', () => item.remove());
    region.appendChild(item);
    setTimeout(() => item.remove(), 4200);
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function number(value) {
    return Number(value) || 0;
  }

  function downloadFile(filename, content, type = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function copyText(text) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    return Promise.resolve();
  }

  function showModal({ eyebrow = 'Amplify+', title, body, actions = [] }) {
    $('#modalEyebrow').textContent = eyebrow;
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = body;
    const actionWrap = $('#modalActions');
    actionWrap.innerHTML = '';
    actions.forEach(action => {
      const button = document.createElement('button');
      button.className = action.primary ? 'primary-button' : 'secondary-button';
      button.textContent = action.label;
      button.addEventListener('click', () => action.onClick?.());
      actionWrap.appendChild(button);
    });
    $('#modalBackdrop').hidden = false;
  }

  function closeModal() {
    $('#modalBackdrop').hidden = true;
  }

  function navigate(viewName) {
    const target = $(`#view-${viewName}`);
    if (!target) return;
    $$('.view').forEach(view => view.classList.remove('is-active'));
    target.classList.add('is-active');
    $$('.nav-item').forEach(item => item.classList.toggle('is-active', item.dataset.view === viewName));
    state.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#sidebar').classList.remove('is-open');
    if (viewName === 'report-results') renderReports();
    if (viewName === 'support') renderRequests();
    if (viewName === 'calendar') renderCalendar();
  }

  function setRole(role) {
    state.role = role;
    store.set('amplifyRole', role);
    $$('.role-button').forEach(btn => btn.classList.toggle('is-active', btn.dataset.role === role));
    $$('.admin-only').forEach(el => { el.hidden = role !== 'admin'; });
    $$('.distributor-only').forEach(el => { el.hidden = role !== 'distributor'; });
    $('#profileRole').textContent = role === 'admin' ? 'Yanmar Admin' : 'Distributor';
    $('#reportPageDescription').textContent = role === 'admin'
      ? 'Review submitted campaign performance across markets and identify content opportunities.'
      : 'Submit campaign performance and commercial feedback to Yanmar.';
    if (role === 'distributor' && state.currentView === 'admin-console') navigate('dashboard');
    renderReports();
    toast(role === 'admin' ? 'Admin workspace active' : 'Distributor workspace active', 'Navigation and reporting views have been updated.');
  }

  function applyLanguage(language) {
    state.language = language;
    store.set('amplifyLanguage', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      const textNode = [...element.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNode && translations[language]?.[key]) textNode.textContent = translations[language][key];
      const span = [...element.children].find(child => !child.classList.contains('nav-icon') && !child.classList.contains('nav-count') && !child.classList.contains('beta-pill') && !child.classList.contains('notification-dot'));
      if (span && translations[language]?.[key]) span.textContent = translations[language][key];
    });
  }

  function initLogin() {
    const session = store.get('amplifySession', false);
    if (session) {
      $('#loginScreen').hidden = true;
      $('#appShell').hidden = false;
      setRole(state.role);
      return;
    }

    $('#loginForm').addEventListener('submit', event => {
      event.preventDefault();
      const username = $('#loginUser').value.trim();
      const password = $('#loginPassword').value;
      if (username.toLowerCase() !== 'yanmar' || password !== 'Almere') {
        $('#loginMessage').textContent = 'The username or password is incorrect.';
        return;
      }
      $('#loginMessage').textContent = '';
      const overlay = $('#connectionOverlay');
      overlay.classList.add('is-visible');
      overlay.setAttribute('aria-hidden', 'false');
      const steps = ['Authenticating workspace…', 'Connecting to EU server…', 'Synchronizing distributor tools…'];
      let index = 0;
      $('#connectionText').textContent = steps[index];
      const timer = setInterval(() => {
        index += 1;
        if (index < steps.length) $('#connectionText').textContent = steps[index];
      }, 430);
      setTimeout(() => {
        clearInterval(timer);
        store.set('amplifySession', true);
        overlay.classList.remove('is-visible');
        overlay.setAttribute('aria-hidden', 'true');
        $('#loginScreen').hidden = true;
        $('#appShell').hidden = false;
        setRole(state.role);
        toast('Connected to Yanmar Amplify+', 'The prototype workspace is ready.');
      }, 1450);
    });

    $('#togglePassword').addEventListener('click', () => {
      const password = $('#loginPassword');
      password.type = password.type === 'password' ? 'text' : 'password';
    });
  }

  function renderAssets() {
    const search = $('#assetSearch')?.value.toLowerCase() || '';
    const product = $('#assetProduct')?.value || 'all';
    const type = $('#assetType')?.value || 'all';
    const filtered = assets.filter(asset => {
      const matchesSearch = `${asset.title} ${asset.description} ${asset.product} ${asset.type}`.toLowerCase().includes(search);
      return matchesSearch && (product === 'all' || asset.product === product) && (type === 'all' || asset.type === type);
    });
    $('#assetGrid').innerHTML = filtered.length ? filtered.map(asset => `
      <article class="asset-card">
        <div class="asset-thumb ${asset.theme}"><small>${asset.product} · ${asset.type}</small><strong>${escapeHtml(asset.title)}</strong><small>${escapeHtml(asset.format)}</small></div>
        <div class="asset-body"><div class="asset-tags"><span>${asset.product}</span><span>${asset.type}</span><span>HQ approved</span></div><h3>${escapeHtml(asset.title)}</h3><p>${escapeHtml(asset.description)}</p><div class="asset-actions"><small>${asset.downloads} downloads</small><button data-asset-id="${asset.id}">Download</button></div></div>
      </article>`).join('') : '<div class="empty-list">No assets match these filters.</div>';
    $$('[data-asset-id]').forEach(button => button.addEventListener('click', () => {
      const asset = assets.find(item => item.id === Number(button.dataset.assetId));
      downloadFile(`${asset.title.replace(/\s+/g, '-')}.txt`, `${asset.title}\n\n${asset.description}\n\nPrototype asset placeholder for ${asset.product}. Replace with the approved production file.`);
      asset.downloads += 1;
      renderAssets();
      toast('Asset downloaded', asset.title);
    }));
  }

  function updateCampaignPreview() {
    const product = $('#campaignProduct').value;
    const audience = $('#campaignAudience').value;
    const market = $('#campaignMarket').value || 'your market';
    const objective = $('#campaignObjective').value;
    const channel = $('#campaignChannel').value;
    const context = $('#campaignContext').value.trim();
    $('#previewProduct').textContent = product;
    $('#previewCampaignName').textContent = $('#campaignName').value || `${product} Campaign`;
    $('#previewMessage').textContent = `${state.selectedMessage} for ${audience.toLowerCase()} in ${market}.`;
    $('#previewChannel').textContent = `${channel} · ${objective}`;
    $('#previewProof').textContent = product === 'YDP' ? 'Professional pumping capability, robust construction and practical deployment.' : product === 'L-Series' ? 'Trusted industrial engine platform, integration support and service expertise.' : 'Long runtime, robust diesel performance and Yanmar service support.';
    $('#localRelevance').textContent = context ? 'Strong' : 'Improve';
    $('#localRelevance').style.color = context ? 'var(--green)' : 'var(--orange)';
  }

  function createActivationPlan() {
    const product = $('#campaignProduct').value;
    const market = $('#campaignMarket').value || 'Local market';
    const channel = $('#campaignChannel').value;
    const objective = $('#campaignObjective').value;
    const plan = [
      ['Message', state.selectedMessage, `Lead with one clear value story for ${product}.`],
      ['Primary channel', channel, `Build one main asset and two supporting adaptations.`],
      ['Local activation', market, 'Add local application evidence and distributor contact details.'],
      ['Measurement', objective, 'Track reach, interactions, qualified leads and sales feedback.']
    ];
    $('#activationPlan').innerHTML = plan.map(([title, value, note]) => `<div><span class="eyebrow">${escapeHtml(title)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(note)}</small></div>`).join('');
    $('#activationPlanPanel').hidden = false;
    store.set('amplifyCampaignDraft', {
      name: $('#campaignName').value, product, market, channel, objective, message: state.selectedMessage, context: $('#campaignContext').value
    });
    $('#metricCampaigns').textContent = String(number($('#metricCampaigns').textContent) + 1);
    toast('Activation plan created', 'The campaign draft has been saved locally.');
  }

  function generateAiContent() {
    const type = $('#aiContentType').value;
    const product = $('#aiProduct').value;
    const market = $('#aiMarket').value || 'your market';
    const language = $('#aiLanguage').value;
    const audience = $('#aiAudience').value.toLowerCase();
    const tone = $('#aiTone').value;
    const keyword = $('#aiKeyword').value.trim() || product;
    const context = $('#aiContext').value.trim();
    const productShort = product.startsWith('YDG') ? 'Yanmar YDG' : product.startsWith('YDP') ? 'Yanmar YDP' : 'Yanmar L-Series';
    const value = product.startsWith('YDP')
      ? 'reliable water movement for demanding professional applications'
      : product.startsWith('L-Series')
        ? 'trusted industrial performance with practical integration support'
        : 'reliable professional diesel power, efficient operation and practical portability';

    let output = '';
    if (type === 'Social caption') {
      output = `${productShort}: professional performance where the work happens.\n\nFor ${audience} in ${market}, dependable equipment is not optional. ${productShort} supports ${value}. ${context ? `Local focus: ${context}. ` : ''}\n\nDiscuss the right solution for your application with your local Yanmar distributor.\n\n#Yanmar #${productShort.replace(/\W/g, '')} #ProfessionalEquipment #${keyword.replace(/\s+/g, '')}`;
    } else if (type === 'Website introduction') {
      output = `${productShort} for ${audience}\n\nWhen uptime, practical operation and dependable support matter, ${productShort} provides ${value}. The product line is designed for professional users who need equipment that fits real working conditions in ${market}.\n\n${context ? `${context}\n\n` : ''}Use this page to explain the application, verified product specifications, service availability and the next step for local customers. Contact the Yanmar distributor in ${market} for product selection and availability.`;
    } else if (type === 'Product email') {
      output = `Subject: Reliable ${productShort} support for your next application\n\nHello,\n\nAre you looking for ${keyword} for a professional application? ${productShort} combines ${value}.\n\n${context ? `${context}\n\n` : ''}We can help you compare the available configuration, expected use and local service requirements.\n\nReply to this email or contact our team to discuss the right solution.\n\nKind regards,\nYour local Yanmar distributor`;
    } else if (type === 'Meta title and description') {
      const title = `${productShort} for ${market} | Professional Yanmar Solutions`.slice(0, 60);
      const description = `Explore ${productShort} for ${audience} in ${market}. Learn about ${value} and contact your local Yanmar distributor.`.slice(0, 158);
      output = `Meta title (${title.length}/60):\n${title}\n\nMeta description (${description.length}/160):\n${description}\n\nSuggested URL:\n/${productShort.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${market.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    } else {
      output = `Customer need\n${audience} in ${market} need ${keyword} that performs reliably in real working conditions.\n\nRecommended Yanmar message\n${productShort} delivers ${value}.\n\nConversation opener\n“What matters most in your application: runtime, portability, lifecycle cost, service support or regulatory requirements?”\n\nProof to prepare\nUse verified specifications, a relevant application example and a local service explanation.\n\nNext step\nArrange a product discussion or demonstration with the local Yanmar distributor.`;
    }

    if (language !== 'English') {
      output = `[${language} first-draft placeholder — native review required]\n\n${output}`;
    }
    output += `\n\n---\nDraft mode: ${tone}. Verify every technical, availability and comparative claim before publication.`;
    $('#aiOutput').value = output;
    $('#aiOutputEmpty').hidden = true;
    $('#aiOutputWrap').hidden = false;
    updateOutputWordCount();
    toast('Content generated', 'Review and adapt the draft before publication.');
  }

  function updateOutputWordCount() {
    const words = $('#aiOutput').value.trim().split(/\s+/).filter(Boolean).length;
    $('#outputWordCount').textContent = `${words} words`;
  }

  function analyzeSeo() {
    const keyword = $('#seoKeyword').value.trim().toLowerCase();
    const title = $('#seoTitle').value.trim();
    const meta = $('#seoMeta').value.trim();
    const copy = $('#seoCopy').value.trim();
    const url = $('#seoUrl').value.trim();
    const market = $('#seoMarket').value.trim();
    const lowerTitle = title.toLowerCase();
    const lowerMeta = meta.toLowerCase();
    const lowerCopy = copy.toLowerCase();
    const sentences = copy.split(/[.!?]+/).map(part => part.trim()).filter(Boolean);
    const words = copy.split(/\s+/).filter(Boolean);
    const avgSentence = sentences.length ? words.length / sentences.length : words.length;
    const headingSignals = (copy.match(/(^|\n)(#{1,3}\s|[A-Z][^.!?\n]{3,50}:?\n)/g) || []).length;
    const checks = [
      { weight: 14, pass: title.length >= 30 && title.length <= 60, label: 'Page title length', detail: `${title.length} characters. Aim for a clear, descriptive title around 30–60 characters.` },
      { weight: 12, pass: keyword && lowerTitle.includes(keyword), label: 'Keyword in title', detail: keyword ? `Focus phrase “${keyword}” ${lowerTitle.includes(keyword) ? 'appears' : 'does not appear'} in the title.` : 'Add a specific focus phrase.' },
      { weight: 12, pass: meta.length >= 110 && meta.length <= 160, label: 'Meta description length', detail: `${meta.length} characters. Keep it useful and concise rather than keyword-stuffed.` },
      { weight: 8, pass: keyword && lowerMeta.includes(keyword.split(' ')[0]), label: 'Description relevance', detail: 'The description should accurately summarize the page and connect with the topic.' },
      { weight: 12, pass: words.length >= 80, label: 'Useful page depth', detail: `${words.length} words detected. Add helpful application information where the topic needs it.` },
      { weight: 10, pass: keyword && lowerCopy.slice(0, 220).includes(keyword.split(' ')[0]), label: 'Topic established early', detail: 'Make the page purpose clear near the start for users and search systems.' },
      { weight: 8, pass: avgSentence <= 22, label: 'Readable sentence length', detail: `Average sentence length is ${avgSentence.toFixed(1)} words.` },
      { weight: 8, pass: headingSignals > 0 || words.length < 120, label: 'Scannable structure', detail: headingSignals > 0 ? `${headingSignals} heading signal(s) detected.` : 'Use descriptive headings for longer copy.' },
      { weight: 8, pass: /contact|request|discover|compare|learn|download|find/.test(lowerCopy), label: 'Clear next action', detail: 'Give the visitor a useful next step.' },
      { weight: 4, pass: market && lowerCopy.includes(market.toLowerCase()), label: 'Local market context', detail: market ? `Market “${market}” ${lowerCopy.includes(market.toLowerCase()) ? 'is included' : 'is missing from the page copy'}.` : 'Add relevant local context.' },
      { weight: 4, pass: /^\/[a-z0-9-]+\/?$/.test(url), label: 'Clean URL path', detail: `Current path: ${url || 'not set'}` }
    ];
    const score = Math.round(checks.reduce((sum, check) => sum + (check.pass ? check.weight : 0), 0));
    const label = score >= 85 ? 'Strong readiness' : score >= 70 ? 'Good foundation' : score >= 50 ? 'Needs improvement' : 'Major improvements needed';
    const failed = checks.filter(check => !check.pass).length;
    $('#seoScore').textContent = score;
    $('#seoScoreRing').style.setProperty('--score-angle', `${score * 3.6}deg`);
    $('#seoScoreLabel').textContent = label;
    $('#seoScoreText').textContent = failed ? `${failed} prioritized improvement${failed === 1 ? '' : 's'} found. Focus on usefulness and clarity first.` : 'All prototype checks passed. Continue validating with real search performance data.';
    $('#seoChecks').innerHTML = checks.map(check => `<div class="check-item ${check.pass ? 'pass' : 'warn'}"><span>${check.pass ? '✓' : '!'}</span><div><strong>${escapeHtml(check.label)}</strong><small>${escapeHtml(check.detail)}</small></div><em>${check.weight} pts</em></div>`).join('');
    updateSerpPreview();
    toast('SEO readiness analyzed', `Current score: ${score}/100.`);
  }

  function updateSerpPreview() {
    $('#metaLength').textContent = $('#seoMeta').value.length;
    $('#serpTitle').textContent = $('#seoTitle').value || 'Page title preview';
    $('#serpDescription').textContent = $('#seoMeta').value || 'Meta description preview.';
    const path = $('#seoUrl').value.replace(/^\//, '');
    $('#serpUrl').textContent = `yanmar-distributor.example/${path}`;
  }

  function buildSeaAds() {
    const product = $('#seaProduct').value;
    const market = $('#seaMarket').value;
    const keyword = $('#seaKeyword').value;
    const audience = $('#seaAudience').value;
    const value = $('#seaValue').value;
    const shortProduct = product.includes('YDG') ? 'Yanmar YDG' : product.includes('YDP') ? 'Yanmar YDP' : 'Yanmar L-Series';
    const rawHeadlines = [
      `${shortProduct} Official`,
      `${keyword}`,
      `Reliable Yanmar Power`,
      `Built for Professionals`,
      `Explore ${shortProduct}`,
      `Support for ${market}`,
      `Compare Lifecycle Value`,
      `Professional Equipment`,
      `Find Your Local Distributor`,
      `Request Product Advice`
    ];
    const headlines = rawHeadlines.map(text => text.length <= 30 ? text : text.replace('Professional', 'Pro').slice(0, 30));
    const descriptions = [
      `Explore ${shortProduct} for ${audience}. Get practical product and application support.`,
      `${value} Contact your local Yanmar distributor for availability and advice.`,
      `Compare verified features, lifecycle value and local support for your application.`,
      `Find the right professional Yanmar solution for demanding work in ${market}.`
    ].map(text => text.slice(0, 90));
    state.seaAssets = { headlines, descriptions, url: $('#seaUrl').value };
    $('#headlineList').innerHTML = headlines.map(item => `<div class="ad-asset-row ${item.length > 30 ? 'over' : ''}"><span>${escapeHtml(item)}</span><span>${item.length}/30</span></div>`).join('');
    $('#descriptionList').innerHTML = descriptions.map(item => `<div class="ad-asset-row ${item.length > 90 ? 'over' : ''}"><span>${escapeHtml(item)}</span><span>${item.length}/90</span></div>`).join('');
    const unique = new Set(headlines.map(item => item.toLowerCase())).size;
    const keywordIncluded = headlines.some(item => item.toLowerCase().includes(keyword.toLowerCase().split(' ')[0]));
    const strength = headlines.length >= 8 && descriptions.length >= 4 && unique >= 8 && keywordIncluded ? 'Good prototype strength' : 'Average prototype strength';
    $('#adStrength').textContent = strength;
    $('#adStrength').className = `strength-pill ${strength.startsWith('Good') ? 'good' : 'average'}`;
    $('#seaEmpty').hidden = true;
    $('#seaResults').hidden = false;
    toast('Responsive search assets created', '10 headlines and 4 descriptions are ready for review.');
  }

  function checkCompliance() {
    const text = $('#complianceCopy').value.trim();
    const lower = text.toLowerCase();
    const rules = [
      { pattern: /\b(best|number one|#1|leading|unmatched|unbeatable)\b/i, label: 'Superiority claim', detail: 'Comparative superiority needs credible, current and market-relevant substantiation.' },
      { pattern: /\b(guarantee|guaranteed|always|never|every application)\b/i, label: 'Absolute promise', detail: 'Absolute performance promises are high risk unless the conditions are precisely defined.' },
      { pattern: /\b(lowest|cheapest|most efficient|lowest fuel)\b/i, label: 'Price or efficiency claim', detail: 'Verify methodology, comparison group, period and source before publication.' },
      { pattern: /\b(stage v|tier 4|ce certified|approved)\b/i, label: 'Regulatory or certification claim', detail: 'Confirm the exact model and market documentation.' },
      { pattern: /\b(save|reduces? costs?|lower tco|fuel efficient)\b/i, label: 'Economic claim', detail: 'State assumptions and use local calculations rather than universal promises.' }
    ];
    const triggered = rules.filter(rule => rule.pattern.test(lower));
    const checks = rules.map(rule => ({ ...rule, triggered: rule.pattern.test(lower) }));
    const risk = triggered.length >= 3 ? 'High' : triggered.length ? 'Medium' : 'Low';
    $('#complianceStatus').textContent = triggered.length ? `${triggered.length} review flag${triggered.length === 1 ? '' : 's'} found` : 'No obvious high-risk wording detected';
    $('#riskPill').textContent = `${risk} risk`;
    $('#riskPill').className = `risk-pill ${risk.toLowerCase()}`;
    $('#complianceChecks').innerHTML = checks.map(check => `<div class="check-item ${check.triggered ? 'fail' : 'pass'}"><span>${check.triggered ? '!' : '✓'}</span><div><strong>${escapeHtml(check.label)}</strong><small>${escapeHtml(check.triggered ? check.detail : 'No matching risk phrase detected in this draft.')}</small></div><em>${check.triggered ? 'Review' : 'Clear'}</em></div>`).join('');
    toast('Compliance check complete', `${risk} editorial risk detected.`);
  }

  function renderCalendar() {
    const date = state.calendarDate;
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = date.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
    $('#calendarTitle').textContent = monthName;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;
    const startDate = new Date(year, month, 1 - startOffset);
    const events = store.get('amplifyCalendar', defaultCalendarEvents);
    const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    let html = weekdays.map(day => `<div class="calendar-weekday">${day}</div>`).join('');
    for (let i = 0; i < totalCells; i += 1) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + i);
      const iso = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === iso);
      html += `<div class="calendar-day ${cellDate.getMonth() !== month ? 'muted' : ''}"><span class="calendar-date">${cellDate.getDate()}</span>${dayEvents.map(event => `<button class="calendar-event ${event.status}" data-calendar-event="${event.date}|${escapeHtml(event.title)}">${escapeHtml(event.title)}</button>`).join('')}</div>`;
    }
    $('#calendarGrid').innerHTML = html;
    $$('[data-calendar-event]').forEach(button => button.addEventListener('click', () => {
      const [eventDate, title] = button.dataset.calendarEvent.split('|');
      showModal({ eyebrow: 'Calendar activity', title, body: `<p><strong>Date:</strong> ${escapeHtml(eventDate)}</p><p><strong>Status:</strong> ${escapeHtml(button.classList[1])}</p><p>This prototype stores calendar activities in your browser.</p>`, actions: [{ label: 'Close', onClick: closeModal }] });
    }));
  }

  function addCalendarEvent() {
    showModal({
      eyebrow: 'Content calendar',
      title: 'Add activation activity',
      body: `<label><span>Date</span><input id="modalCalendarDate" type="date" value="2026-08-01"></label><label><span>Activity title</span><input id="modalCalendarTitle" value="Local YDG campaign"></label><label><span>Status</span><select id="modalCalendarStatus"><option value="planned">Planned</option><option value="progress">In progress</option><option value="approval">Approval</option><option value="published">Published</option></select></label>`,
      actions: [
        { label: 'Cancel', onClick: closeModal },
        { label: 'Add activity', primary: true, onClick: () => {
          const events = store.get('amplifyCalendar', defaultCalendarEvents);
          events.push({ date: $('#modalCalendarDate').value, title: $('#modalCalendarTitle').value, status: $('#modalCalendarStatus').value });
          store.set('amplifyCalendar', events);
          state.calendarDate = new Date(`${$('#modalCalendarDate').value}T12:00:00`);
          renderCalendar();
          closeModal();
          toast('Activity added to calendar');
        } }
      ]
    });
  }

  const comparisonCriteria = [
    ['Rated output', '4.5 kVA', ''], ['Runtime at 75% load', '8.4 hours', ''], ['Fuel tank capacity', '13 litres', ''], ['Noise level', 'Verify official spec', ''], ['Dry weight', 'Verify official spec', ''], ['Emission compliance', 'EU Stage V', ''], ['Starting system', 'Electric / recoil', ''], ['Primary application', 'Professional mobile power', ''], ['Service support', 'Yanmar distributor network', '']
  ];

  function renderComparison() {
    $('#comparisonBody').innerHTML = comparisonCriteria.map(([criterion, yanmar], index) => `<tr><td><strong>${escapeHtml(criterion)}</strong></td><td class="yanmar-column"><input class="table-input" data-comparison="y-${index}" value="${escapeHtml(yanmar)}"></td><td><input class="table-input" data-comparison="a-${index}" placeholder="Enter verified data"></td><td><input class="table-input" data-comparison="b-${index}" placeholder="Enter verified data"></td></tr>`).join('');
  }

  function comparisonCsv() {
    const names = $$('.competitor-name').map(input => input.value || 'Competitor');
    const rows = [['Criteria', `Yanmar ${$('#yanmarModel').value}`, ...names]];
    comparisonCriteria.forEach(([criterion], index) => {
      rows.push([criterion, $(`[data-comparison="y-${index}"]`).value, $(`[data-comparison="a-${index}"]`).value, $(`[data-comparison="b-${index}"]`).value]);
    });
    return rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  }

  function calculateTco() {
    const years = Math.max(1, number($('#tcoYears').value));
    const hours = Math.max(1, number($('#tcoHours').value));
    const fuelPrice = number($('#tcoFuelPrice').value);
    const yDep = number($('#tcoYPrice').value) - number($('#tcoYResidual').value);
    const cDep = number($('#tcoCPrice').value) - number($('#tcoCResidual').value);
    const yFuel = number($('#tcoYFuel').value) * hours * years * fuelPrice;
    const cFuel = number($('#tcoCFuel').value) * hours * years * fuelPrice;
    const yMaint = number($('#tcoYMaintenance').value) * years;
    const cMaint = number($('#tcoCMaintenance').value) * years;
    const yTotal = yDep + yFuel + yMaint;
    const cTotal = cDep + cFuel + cMaint;
    const totalHours = hours * years;
    const difference = cTotal - yTotal;
    const euro = new Intl.NumberFormat('en-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    const euroPrecise = new Intl.NumberFormat('en-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    $('#tcoPeriodLabel').textContent = `${years}-year`;
    $('#tcoYTotal').textContent = euro.format(yTotal);
    $('#tcoCTotal').textContent = euro.format(cTotal);
    $('#tcoYHourly').textContent = `${euroPrecise.format(yTotal / totalHours)} per operating hour`;
    $('#tcoCHourly').textContent = `${euroPrecise.format(cTotal / totalHours)} per operating hour`;
    $('#tcoSaving').textContent = euro.format(Math.abs(difference));
    $('#tcoSavingText').textContent = difference >= 0 ? 'Estimated lower Yanmar lifecycle cost in this scenario.' : 'The alternative is lower in this scenario; review assumptions and value factors.';
    const max = Math.max(yDep, cDep, yFuel, cFuel, yMaint, cMaint, 1);
    $('#barYDep').style.width = `${(yDep / max) * 100}%`; $('#barCDep').style.width = `${(cDep / max) * 100}%`;
    $('#barYFuel').style.width = `${(yFuel / max) * 100}%`; $('#barCFuel').style.width = `${(cFuel / max) * 100}%`;
    $('#barYMaint').style.width = `${(yMaint / max) * 100}%`; $('#barCMaint').style.width = `${(cMaint / max) * 100}%`;
    store.set('amplifyTco', { years, hours, fuelPrice, yDep, cDep, yFuel, cFuel, yMaint, cMaint, yTotal, cTotal });
  }

  function localizeDraft() {
    const language = $('#targetLanguage').value;
    const market = $('#localizationMarket').value;
    const source = $('#sourceCopy').value;
    const intros = {
      Dutch: 'Betrouwbare professionele prestaties waar het werk plaatsvindt.',
      German: 'Zuverlässige professionelle Leistung dort, wo sie gebraucht wird.',
      French: 'Des performances professionnelles fiables là où elles sont nécessaires.',
      Spanish: 'Rendimiento profesional fiable donde se necesita.',
      Polish: 'Niezawodna profesjonalna wydajność tam, gdzie jest potrzebna.',
      Arabic: 'أداء احترافي موثوق حيثما تكون الحاجة إليه.'
    };
    $('#localizedCopy').value = `[First-draft localization for ${market} — native review required]\n\n${intros[language]}\n\n${source}`;
    toast('Localization draft created', 'Assign a native-language reviewer before approval.');
  }

  function reports() {
    return store.get('amplifyReports', defaultReports);
  }

  function renderReports() {
    const data = reports();
    const distributorRows = data.slice().reverse().map(report => `<tr><td><strong>${escapeHtml(report.campaign)}</strong></td><td>${escapeHtml(report.market)}</td><td>${escapeHtml(report.channel)}</td><td>${report.reach.toLocaleString()}</td><td>${report.leads}</td><td><span class="status-badge ${report.status.toLowerCase()}">${escapeHtml(report.status)}</span></td><td><button class="text-button" data-report-view="${report.id}">View</button></td></tr>`).join('');
    $('#distributorReportRows').innerHTML = distributorRows || '<tr><td colspan="7">No reports submitted.</td></tr>';
    const filter = $('#adminReportFilter')?.value || 'all';
    const search = $('#adminReportSearch')?.value.toLowerCase() || '';
    const filtered = data.filter(report => (filter === 'all' || report.product === filter) && `${report.campaign} ${report.market}`.toLowerCase().includes(search));
    $('#adminReportRows').innerHTML = filtered.map(report => {
      const interaction = report.reach ? (report.clicks / report.reach * 100).toFixed(1) : '0.0';
      return `<tr><td><strong>${escapeHtml(report.campaign)}</strong></td><td>${escapeHtml(report.market)}</td><td>${escapeHtml(report.product)}</td><td>${escapeHtml(report.channel)}</td><td>${report.reach.toLocaleString()}</td><td>${report.leads}</td><td>${interaction}%</td><td>${escapeHtml(report.date)}</td></tr>`;
    }).join('') || '<tr><td colspan="8">No matching reports.</td></tr>';
    const totalReach = filtered.reduce((sum, report) => sum + report.reach, 0);
    const totalClicks = filtered.reduce((sum, report) => sum + report.clicks, 0);
    const totalLeads = filtered.reduce((sum, report) => sum + report.leads, 0);
    $('#adminReportCount').textContent = filtered.length;
    $('#adminReach').textContent = totalReach.toLocaleString();
    $('#adminLeads').textContent = totalLeads.toLocaleString();
    $('#adminInteractionRate').textContent = `${totalReach ? (totalClicks / totalReach * 100).toFixed(1) : '0.0'}%`;
    $('#metricReports').textContent = data.length;
    const byMarket = Object.values(filtered.reduce((map, report) => {
      map[report.market] ||= { market: report.market, reach: 0, leads: 0 };
      map[report.market].reach += report.reach;
      map[report.market].leads += report.leads;
      return map;
    }, {})).sort((a, b) => b.reach - a.reach);
    const maxReach = Math.max(...byMarket.map(item => item.reach), 1);
    $('#marketBars').innerHTML = byMarket.length ? byMarket.map(item => `<div class="market-bar"><span>${escapeHtml(item.market)}</span><div><i style="width:${(item.reach / maxReach) * 100}%"></i></div><strong>${item.leads} leads</strong></div>`).join('') : '<div class="empty-list">No report data available.</div>';
    const combined = filtered.map(report => `${report.worked} ${report.improve}`).join(' ').toLowerCase();
    const themes = [
      ['Local visuals', (combined.match(/visual/g) || []).length + 4],
      ['Application content', (combined.match(/application/g) || []).length + 3],
      ['Comparison data', (combined.match(/comparison/g) || []).length + 2],
      ['Translations', (combined.match(/translat|arabic|local/g) || []).length + 2]
    ].sort((a, b) => b[1] - a[1]);
    $('#feedbackThemes').innerHTML = themes.map(([theme, count]) => `<div><span>${theme}</span><strong>${count}</strong></div>`).join('');
    $$('[data-report-view]').forEach(button => button.addEventListener('click', () => {
      const report = data.find(item => item.id === Number(button.dataset.reportView));
      showModal({ eyebrow: 'Result report', title: report.campaign, body: `<div class="form-grid two-col"><p><strong>Market</strong><br>${escapeHtml(report.market)}</p><p><strong>Channel</strong><br>${escapeHtml(report.channel)}</p><p><strong>Reach</strong><br>${report.reach.toLocaleString()}</p><p><strong>Leads</strong><br>${report.leads}</p></div><p><strong>What worked</strong><br>${escapeHtml(report.worked || 'Not provided')}</p><p><strong>Improvement request</strong><br>${escapeHtml(report.improve || 'Not provided')}</p>`, actions: [{ label: 'Close', onClick: closeModal }] });
    }));
  }

  function submitReport(status = 'Submitted') {
    const data = reports();
    const report = {
      id: Date.now(),
      campaign: $('#reportCampaign').value.trim(), market: $('#reportMarket').value.trim(), product: $('#reportProduct').value, channel: $('#reportChannel').value,
      reach: number($('#reportReach').value), clicks: number($('#reportClicks').value), leads: number($('#reportLeads').value), opportunities: number($('#reportOpportunities').value),
      date: $('#reportEnd').value || new Date().toISOString().slice(0, 10), status, worked: $('#reportWorked').value.trim(), improve: $('#reportImprove').value.trim(), evidence: $('#reportEvidence').value.trim()
    };
    if (!report.campaign || !report.market) {
      toast('Campaign and market are required');
      return;
    }
    data.push(report);
    store.set('amplifyReports', data);
    renderReports();
    toast(status === 'Submitted' ? 'Result report submitted' : 'Report draft saved', `${report.campaign} · ${report.market}`);
  }

  function exportReports() {
    const rows = [['Campaign', 'Market', 'Product', 'Channel', 'Reach', 'Clicks', 'Leads', 'Opportunities', 'Date', 'Status']];
    reports().forEach(report => rows.push([report.campaign, report.market, report.product, report.channel, report.reach, report.clicks, report.leads, report.opportunities, report.date, report.status]));
    downloadFile('yanmar-amplify-results.csv', rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n'), 'text/csv;charset=utf-8');
  }

  function requests() {
    return store.get('amplifyRequests', defaultRequests);
  }

  function statusClass(status) {
    return ({ 'Waiting for asset': 'waiting', 'In progress': 'progress', Planned: 'planned', Postponed: 'postponed', Completed: 'completed' })[status] || 'planned';
  }

  function renderRequests() {
    const filter = $('#supportFilter')?.value || 'all';
    const data = requests().filter(request => filter === 'all' || request.status === filter);
    $('#supportRequestList').innerHTML = data.length ? data.map(request => `<article class="request-card"><span class="request-icon">${escapeHtml(request.product.slice(0, 2))}</span><div><strong>${escapeHtml(request.title)}</strong><small>${escapeHtml(request.type)}</small><div class="request-meta"><span>${escapeHtml(request.product)}</span><span>${escapeHtml(request.priority)}</span><span>Due ${escapeHtml(request.deadline || 'TBD')}</span></div></div><span class="request-status ${statusClass(request.status)}">${escapeHtml(request.status)}</span></article>`).join('') : '<div class="empty-list">No requests match this status.</div>';
    const openCount = requests().filter(request => request.status !== 'Completed').length;
    $('#metricRequests').textContent = openCount;
  }

  function submitSupportRequest() {
    const data = requests();
    const request = { id: Date.now(), title: $('#supportTitle').value.trim(), type: $('#supportType').value, product: $('#supportProduct').value, priority: $('#supportPriority').value, deadline: $('#supportDeadline').value, status: 'Planned', market: 'Local market', description: $('#supportDescription').value.trim(), reference: $('#supportReference').value.trim() };
    if (!request.title || !request.description) return;
    data.unshift(request);
    store.set('amplifyRequests', data);
    $('#supportForm').reset();
    renderRequests();
    toast('Support request sent', request.title);
  }

  function renderApprovals() {
    const approvals = store.get('amplifyApprovals', defaultApprovals);
    $('#approvalList').innerHTML = approvals.length ? approvals.map(item => `<div class="approval-item"><span>${escapeHtml(item.type)}</span><div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></div><button data-approve="${item.id}">Approve</button></div>`).join('') : '<div class="empty-list">The approval queue is clear.</div>';
    $('#pendingApprovals').textContent = approvals.length;
    $$('[data-approve]').forEach(button => button.addEventListener('click', () => {
      const next = approvals.filter(item => item.id !== Number(button.dataset.approve));
      store.set('amplifyApprovals', next);
      renderApprovals();
      toast('Item approved');
    }));
  }

  function printView(viewName) {
    const view = $(`#view-${viewName}`);
    view.classList.add('is-printing');
    window.print();
    setTimeout(() => view.classList.remove('is-printing'), 200);
  }

  function setupGlobalSearch() {
    const items = $$('.nav-item').map(item => ({ label: item.innerText.replace(/BETA|\d+/g, '').trim(), view: item.dataset.view, role: item.classList.contains('admin-only') ? 'admin' : 'all' }));
    const input = $('#globalSearch');
    const results = $('#searchResults');
    function render() {
      const query = input.value.trim().toLowerCase();
      if (!query) { results.hidden = true; return; }
      const matches = items.filter(item => item.label.toLowerCase().includes(query) && (item.role === 'all' || state.role === 'admin'));
      results.innerHTML = matches.length ? matches.map(item => `<button data-search-view="${item.view}"><span>${escapeHtml(item.label)}</span><small>Open →</small></button>`).join('') : '<div class="empty-list">No matching tool.</div>';
      results.hidden = false;
      $$('[data-search-view]', results).forEach(button => button.addEventListener('click', () => { navigate(button.dataset.searchView); input.value = ''; results.hidden = true; }));
    }
    input.addEventListener('input', render);
    document.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        input.focus();
      }
      if (event.key === 'Escape') results.hidden = true;
    });
    document.addEventListener('click', event => { if (!event.target.closest('.global-search-wrap')) results.hidden = true; });
  }

  function bindEvents() {
    $$('.nav-item').forEach(item => item.addEventListener('click', () => navigate(item.dataset.view)));
    $$('[data-open-view]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.openView)));
    $$('.role-button').forEach(button => button.addEventListener('click', () => setRole(button.dataset.role)));
    $('#logoutButton').addEventListener('click', () => { store.set('amplifySession', false); location.reload(); });
    $('#mobileMenuButton').addEventListener('click', () => $('#sidebar').classList.toggle('is-open'));
    $('#themeButton').addEventListener('click', () => { document.body.classList.toggle('dark'); store.set('amplifyDark', document.body.classList.contains('dark')); });
    $('#languageSelect').addEventListener('change', event => applyLanguage(event.target.value));
    $('#notificationButton').addEventListener('click', () => { $('#notificationPanel').hidden = !$('#notificationPanel').hidden; });
    $('#closeNotifications').addEventListener('click', () => { $('#notificationPanel').hidden = true; });
    $('#closeModal').addEventListener('click', closeModal);
    $('#modalBackdrop').addEventListener('click', event => { if (event.target.id === 'modalBackdrop') closeModal(); });

    ['assetSearch', 'assetProduct', 'assetType'].forEach(id => $(`#${id}`).addEventListener(id === 'assetSearch' ? 'input' : 'change', renderAssets));
    $('#openUploadAsset').addEventListener('click', openAssetUploadModal);
    $('#adminUploadButton').addEventListener('click', openAssetUploadModal);

    ['campaignName', 'campaignProduct', 'campaignMarket', 'campaignAudience', 'campaignObjective', 'campaignChannel', 'campaignContext'].forEach(id => $(`#${id}`).addEventListener('input', updateCampaignPreview));
    $$('#messageChoices .choice-card').forEach(button => button.addEventListener('click', () => {
      $$('#messageChoices .choice-card').forEach(item => item.classList.remove('is-selected'));
      button.classList.add('is-selected');
      state.selectedMessage = button.dataset.message;
      updateCampaignPreview();
    }));
    $('#campaignForm').addEventListener('submit', event => { event.preventDefault(); createActivationPlan(); });
    $('#saveCampaign').addEventListener('click', () => { store.set('amplifyCampaignDraft', { name: $('#campaignName').value, product: $('#campaignProduct').value, market: $('#campaignMarket').value, context: $('#campaignContext').value }); toast('Campaign draft saved'); });
    $('#downloadCampaignPlan').addEventListener('click', () => downloadFile('yanmar-amplify-campaign-brief.txt', $('#activationPlanPanel').innerText));

    $$('.ai-tab').forEach(tab => tab.addEventListener('click', () => {
      $$('.ai-tab').forEach(item => item.classList.remove('is-active'));
      tab.classList.add('is-active');
      $$('.ai-mode').forEach(mode => mode.classList.remove('is-active'));
      $(`#ai-${tab.dataset.aiMode}`).classList.add('is-active');
    }));
    $('#aiGeneratorForm').addEventListener('submit', event => { event.preventDefault(); generateAiContent(); });
    $('#clearAiBrief').addEventListener('click', () => { $('#aiContext').value = ''; $('#aiKeyword').value = ''; });
    $('#aiOutput').addEventListener('input', updateOutputWordCount);
    $('#copyAiOutput').addEventListener('click', () => copyText($('#aiOutput').value).then(() => toast('Draft copied')));
    $('#downloadAiOutput').addEventListener('click', () => downloadFile('amplify-ai-draft.txt', $('#aiOutput').value));
    $('#sendToSeo').addEventListener('click', () => {
      $('#seoCopy').value = $('#aiOutput').value;
      const keyword = $('#aiKeyword').value;
      if (keyword) $('#seoKeyword').value = keyword;
      $('.ai-tab[data-ai-mode="seo"]').click();
      updateSerpPreview();
    });
    $('#seoForm').addEventListener('submit', event => { event.preventDefault(); analyzeSeo(); });
    ['seoTitle', 'seoMeta', 'seoUrl'].forEach(id => $(`#${id}`).addEventListener('input', updateSerpPreview));
    $('#seaForm').addEventListener('submit', event => { event.preventDefault(); buildSeaAds(); });
    $('#copySeaAssets').addEventListener('click', () => { if (!state.seaAssets) return; copyText(`Headlines\n${state.seaAssets.headlines.join('\n')}\n\nDescriptions\n${state.seaAssets.descriptions.join('\n')}`).then(() => toast('SEA assets copied')); });
    $('#downloadSeaAssets').addEventListener('click', () => {
      if (!state.seaAssets) return;
      const rows = [['Type', 'Text', 'Characters'], ...state.seaAssets.headlines.map(text => ['Headline', text, text.length]), ...state.seaAssets.descriptions.map(text => ['Description', text, text.length])];
      downloadFile('yanmar-responsive-search-assets.csv', rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n'), 'text/csv;charset=utf-8');
    });
    $('#complianceForm').addEventListener('submit', event => { event.preventDefault(); checkCompliance(); });

    $('#prevMonth').addEventListener('click', () => { state.calendarDate.setMonth(state.calendarDate.getMonth() - 1); renderCalendar(); });
    $('#nextMonth').addEventListener('click', () => { state.calendarDate.setMonth(state.calendarDate.getMonth() + 1); renderCalendar(); });
    $('#addCalendarItem').addEventListener('click', addCalendarEvent);

    $('#yanmarModel').addEventListener('change', () => { $('#tableYanmarModel').textContent = $('#yanmarModel').value; $('#comparisonTitle').textContent = `${$('#yanmarModel').value} market comparison`; });
    $('#downloadComparison').addEventListener('click', () => downloadFile('yanmar-comparison-sheet.csv', comparisonCsv(), 'text/csv;charset=utf-8'));
    $('#printComparison').addEventListener('click', () => printView('comparison'));

    $('#tcoForm').addEventListener('submit', event => { event.preventDefault(); calculateTco(); toast('TCO scenario recalculated'); });
    $('#printTco').addEventListener('click', () => printView('tco'));
    $('#downloadTco').addEventListener('click', () => downloadFile('yanmar-tco-summary.txt', $('#tcoPrintArea').innerText));

    $('#localizeDraft').addEventListener('click', localizeDraft);
    $('#submitLocalization').addEventListener('click', () => { if (!$('#localizedCopy').value.trim()) return toast('Create a localization draft first'); toast('Localization submitted for approval'); });
    $('#newLocalization').addEventListener('click', () => { $('#localizedCopy').value = ''; toast('New localization workspace ready'); });

    $('#reportForm').addEventListener('submit', event => { event.preventDefault(); submitReport('Submitted'); });
    $('#saveReportDraft').addEventListener('click', () => submitReport('Draft'));
    $('#exportAllReports').addEventListener('click', exportReports);
    $('#adminReportFilter').addEventListener('change', renderReports);
    $('#adminReportSearch').addEventListener('input', renderReports);
    $('#newReportButton').addEventListener('click', () => $('#reportCampaign').focus());

    $('#supportForm').addEventListener('submit', event => { event.preventDefault(); submitSupportRequest(); });
    $('#supportFilter').addEventListener('change', renderRequests);
    $('#newSupportRequest').addEventListener('click', () => { $('#supportFormCard').classList.remove('is-collapsed'); $('#supportTitle').focus(); });
    $('#closeSupportForm').addEventListener('click', () => $('#supportFormCard').classList.add('is-collapsed'));

    $('#approveAll').addEventListener('click', () => { store.set('amplifyApprovals', []); renderApprovals(); toast('Low-risk approval queue cleared'); });
    $('#profileButton').addEventListener('click', () => showModal({ eyebrow: 'Profile', title: state.role === 'admin' ? 'Yanmar Admin Workspace' : 'Distributor Workspace', body: `<p><strong>Environment:</strong> Yanmar Amplify+ prototype</p><p><strong>Data:</strong> Stored locally in this browser</p><p><strong>Authentication:</strong> Demo-only client-side login</p>`, actions: [{ label: 'Close', onClick: closeModal }] }));
  }

  function openAssetUploadModal() {
    showModal({
      eyebrow: 'Content administration',
      title: 'Add approved asset',
      body: `<label><span>Asset title</span><input id="modalAssetTitle" value="New approved campaign asset"></label><div class="form-grid two-col"><label><span>Product</span><select id="modalAssetProduct"><option>YDG</option><option>YDP</option><option>L-Series</option></select></label><label><span>Type</span><select id="modalAssetType"><option>Social</option><option>Website</option><option>Sales</option><option>Technical</option></select></label></div><label><span>Description</span><textarea id="modalAssetDescription">Approved resource for distributor activation.</textarea></label><p class="info-callout">This static prototype stores asset metadata only. Production uploads require authenticated cloud storage.</p>`,
      actions: [
        { label: 'Cancel', onClick: closeModal },
        { label: 'Add metadata', primary: true, onClick: () => {
          assets.unshift({ id: Date.now(), product: $('#modalAssetProduct').value, type: $('#modalAssetType').value, title: $('#modalAssetTitle').value, description: $('#modalAssetDescription').value, format: 'FILE · Prototype', downloads: 0, theme: $('#modalAssetProduct').value === 'YDP' ? 'blue' : $('#modalAssetProduct').value === 'L-Series' ? 'green' : 'red' });
          renderAssets(); closeModal(); toast('Asset metadata added');
        } }
      ]
    });
  }

  function initialize() {
    document.body.classList.toggle('dark', store.get('amplifyDark', false));
    $('#languageSelect').value = state.language;
    applyLanguage(state.language);
    initLogin();
    renderAssets();
    renderCalendar();
    renderComparison();
    calculateTco();
    renderReports();
    renderRequests();
    renderApprovals();
    updateCampaignPreview();
    updateSerpPreview();
    setupGlobalSearch();
    bindEvents();
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  document.addEventListener('DOMContentLoaded', initialize);
})();


/* =====================================================================
   YANMAR AMPLIFY++ — EXTENDED MODULES
   ===================================================================== */
(() => {
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const PFX = 'amplifyPP_';
  const read = (k,d) => { try { const v=localStorage.getItem(PFX+k); return v===null?d:JSON.parse(v); } catch { return d; } };
  const write = (k,v) => localStorage.setItem(PFX+k,JSON.stringify(v));
  const esc = (v='') => String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const slug = v => String(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  const number = v => Number(v)||0;
  const download = (name,content,type='text/plain;charset=utf-8') => { const b=new Blob([content],{type}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u); };
  const ppToast = (title,detail='') => { const n=document.createElement('div');n.className='toast';n.innerHTML=`<div><strong>${esc(title)}</strong>${detail?`<small>${esc(detail)}</small>`:''}</div><button>×</button>`;$('button',n).onclick=()=>n.remove();$('#toastRegion').appendChild(n);setTimeout(()=>n.remove(),4200); };

  function modal({eyebrow='Amplify++',title,body,actions=[]}) {
    $('#modalEyebrow').textContent=eyebrow; $('#modalTitle').textContent=title; $('#modalBody').innerHTML=body;
    const w=$('#modalActions'); w.innerHTML='';
    actions.forEach(a=>{ const b=document.createElement('button');b.className=a.primary?'primary-button':'secondary-button';b.textContent=a.label;b.onclick=a.onClick;w.appendChild(b); });
    $('#modalBackdrop').hidden=false;
  }
  const closeModalPP=()=>{$('#modalBackdrop').hidden=true;};

  const markets=[
    {name:'Netherlands',flag:'NL',region:'Europe',score:74,status:'Growing',theme:'eu',focus:'Practical use cases and dealer activation',needs:['Dutch copy','Demo content','Dealer email'],products:['YDG','YDP']},
    {name:'Poland',flag:'PL',region:'Europe',score:82,status:'Active',theme:'eu',focus:'Trade-show activation and local application stories',needs:['Event assets','Polish copy','Comparison'],products:['YDG','YDP']},
    {name:'Spain',flag:'ES',region:'Europe',score:64,status:'Needs action',theme:'eu',focus:'Website visibility and professional value messaging',needs:['SEO copy','Social pack','Local CTA'],products:['YDG','YDP']},
    {name:'UAE',flag:'AE',region:'Middle East',score:91,status:'Active',theme:'me',focus:'High-frequency activation with bilingual content',needs:['Arabic assets','Calendar','Dealer tools'],products:['YDG','YDP']},
    {name:'Saudi Arabia',flag:'SA',region:'Middle East',score:88,status:'Active',theme:'me',focus:'Application clarity and sales enablement',needs:['Arabic copy','Use cases','Sales pack'],products:['YDG','YDP']},
    {name:'South Africa',flag:'ZA',region:'Africa',score:67,status:'Growing',theme:'af',focus:'Lifetime value and service confidence',needs:['TCO tools','Service story','Comparison'],products:['YDG','L-Series']}
  ];
  const products={
    YDG:{label:'Portable diesel generators',headline:'Professional power, built to keep work moving.',description:'YDG supports construction, rental and professional field applications where dependable portable diesel power matters.',tags:['Professional diesel power','Portable design','Stage V options','Yanmar support'],values:[['R','Reliable by design','Position quality, uptime and professional use rather than purchase price alone.'],['T','Lifetime value','Use fuel, maintenance, service and residual-value arguments in the sales conversation.'],['A','Application fit','Connect the product to construction, rental, agriculture and field use.']],uses:[['C','Construction sites','Reliable temporary power for demanding work.'],['R','Rental fleets','A durable addition to professional rental portfolios.'],['F','Remote field work','Portable power where grid access is limited.']]},
    YDP:{label:'Portable diesel pumps',headline:'Move water fast. Keep operations under control.',description:'YDP supports professional dewatering, construction, agriculture and emergency-response applications with portable diesel pumping.',tags:['Professional dewatering','Portable operation','Construction use','Emergency response'],values:[['O','Operational reliability','Explain dependable pumping for time-critical situations.'],['A','Application flexibility','Connect the product to dewatering, irrigation and flood response.'],['S','Response readiness','Use practical scenarios to show when portable pumping matters.']],uses:[['D','Site dewatering','Support excavation and construction work.'],['F','Flood response','Portable pumping in emergency situations.'],['A','Agricultural use','Water transfer and local field applications.']]},
    'L-Series':{label:'Industrial diesel engines',headline:'Compact engine power for professional equipment.',description:'L-Series engines support OEM and industrial applications where compact diesel performance, service and integration matter.',tags:['Compact diesel','OEM integration','Professional equipment','Service network'],values:[['I','Integration value','Show how the engine supports equipment design and application requirements.'],['S','Service confidence','Connect the engine offer with parts, warranty and support.'],['F','Application fit','Focus on the right configuration for the OEM and local market.']],uses:[['I','Industrial equipment','Compact engines for professional machinery.'],['O','OEM applications','Support product integration and specification.'],['M','Mobile equipment','Power for equipment used across varied environments.']]}
  };
  let currentProduct='YDG';

  function renderImpact(q='') {
    const filtered=markets.filter(m=>m.name.toLowerCase().includes(q.toLowerCase()));
    $('#ppImpactTable').innerHTML=filtered.map((m,i)=>`<tr><td><strong>${m.flag} · ${esc(m.name)}</strong></td><td><div class="pp-score-cell"><b>${m.score}</b><i><em style="width:${m.score}%"></em></i></div></td><td>${[8,11,5,14,12,6][markets.indexOf(m)]}</td><td>${[34,49,21,63,55,27][markets.indexOf(m)]}</td><td>${[3,4,1,5,4,2][markets.indexOf(m)]}</td><td class="positive">↗ ${[12,18,4,21,16,8][markets.indexOf(m)]}%</td><td><span class="pp-status ${slug(m.status)}">${m.status}</span></td></tr>`).join('')||'<tr><td colspan="7">No matching market.</td></tr>';
  }

  function renderProduct() {
    const p=products[currentProduct];
    $('#ppProductStage').innerHTML=`<div class="pp-product-hero"><div class="pp-product-copy"><p class="eyebrow">${esc(currentProduct)} · ${esc(p.label)}</p><h3>${esc(p.headline)}</h3><p>${esc(p.description)}</p><div class="pp-product-tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="button-row"><button class="primary-button" data-pp-campaign="${esc(currentProduct)}">Build campaign</button><button class="secondary-button" data-pp-assets="${esc(currentProduct)}">Open assets</button></div></div><div class="pp-machine-stage"><div class="pp-machine" data-product="${esc(currentProduct)}"><i></i><span></span><span></span></div></div></div><div class="pp-product-info"><article class="panel"><div class="panel-head"><div><p class="eyebrow">Value story</p><h3>How to communicate ${esc(currentProduct)}</h3></div></div><div class="pp-value-list">${p.values.map(v=>`<div class="pp-value-item"><b>${v[0]}</b><div><strong>${esc(v[1])}</strong><small>${esc(v[2])}</small></div></div>`).join('')}</div></article><article class="panel"><div class="panel-head"><div><p class="eyebrow">Application stories</p><h3>Connect product to real work</h3></div></div><div class="pp-use-grid">${p.uses.map(v=>`<button data-pp-use="${esc(v[1])}"><b>${v[0]}</b><strong>${esc(v[1])}</strong><small>${esc(v[2])}</small></button>`).join('')}</div></article></div>`;
    $$('[data-pp-campaign]').forEach(b=>b.onclick=()=>{ document.querySelector('[data-view="campaign-studio"]').click(); const select=$('#campaignProduct'); if(select){select.value=b.dataset.ppCampaign;select.dispatchEvent(new Event('input'));} ppToast('Campaign brief started',`${b.dataset.ppCampaign} selected.`); });
    $$('[data-pp-assets]').forEach(b=>b.onclick=()=>{document.querySelector('[data-view="content-library"]').click();const s=$('#assetProduct');if(s){s.value=b.dataset.ppAssets;s.dispatchEvent(new Event('change'));}});
    $$('[data-pp-use]').forEach(b=>b.onclick=()=>{document.querySelector('[data-view="campaign-studio"]').click();const t=$('#campaignContext');if(t){t.value=`Create a ${currentProduct} campaign for ${b.dataset.ppUse}. Focus on professional customer value and a practical local next step.`;t.dispatchEvent(new Event('input'));}ppToast('Use case added',b.dataset.ppUse);});
  }

  function analyzeSeo(){
    const keyword=$('#ppSeoKeyword').value.trim().toLowerCase(),title=$('#ppSeoTitle').value.trim(),desc=$('#ppSeoDescription').value.trim(),content=$('#ppSeoContent').value.trim(),lower=`${title} ${desc} ${content}`.toLowerCase(),words=content.split(/\s+/).filter(Boolean).length;
    const checks=[
      ['Title length',`${title.length} characters`,title.length>=30&&title.length<=60,18],
      ['Meta description',`${desc.length} characters`,desc.length>=120&&desc.length<=160,17],
      ['Primary keyword',keyword&&lower.includes(keyword)?'Keyword is present':'Keyword is missing',keyword&&lower.includes(keyword),20],
      ['Keyword in title',keyword&&title.toLowerCase().includes(keyword)?'Strong title relevance':'Consider adding the keyword',keyword&&title.toLowerCase().includes(keyword),15],
      ['Content depth',`${words} words`,words>=45,15],
      ['Clear next step',/contact|request|download|discover|explore|quote|demo/i.test(content)?'Action language found':'Add a useful next step',/contact|request|download|discover|explore|quote|demo/i.test(content),15]
    ];
    const score=checks.reduce((s,c)=>s+(c[2]?c[3]:Math.round(c[3]*.35)),0);
    $('#ppSeoScore').textContent=score;$('#ppSeoRing').style.setProperty('--score',score);$('#ppSeoLabel').textContent=score>=80?'Strong foundation':score>=60?'Needs refinement':'Weak foundation';
    $('#ppSeoChecks').innerHTML=checks.map(c=>`<div class="pp-seo-check ${c[2]?'pass':'warn'}"><b>${c[2]?'✓':'!'}</b><div><strong>${c[0]}</strong><small>${esc(c[1])}</small></div><span>${c[2]?'Pass':'Improve'}</span></div>`).join('');
    ppToast('SEO readiness updated',`The draft received ${score}/100.`);
  }
  function generateSea(){
    const product=$('#ppSeaProduct').value,market=$('#ppSeaMarket').value,value=$('#ppSeaValue').value.trim();
    const heads=[`Yanmar ${product} Solutions`,`${product} Professional Power`,`${product} for Demanding Work`,`Reliable ${product} Equipment`,`Explore Yanmar ${product}`,`${product} Distributor Support`,`Professional Value Built In`,`${product} for ${market}`,`Request Local Information`,`Compare ${product} Options`,`Built for Professional Use`,`Yanmar Support Network`].map(x=>x.slice(0,30));
    const desc=[`${value}. Explore verified product information and local distributor support.`.slice(0,90),`Compare ${product} options for professional applications and request local information today.`.slice(0,90),`Use Yanmar product knowledge, service support and application guidance to select with confidence.`.slice(0,90),`Contact your local distributor to confirm models, specifications, availability and next steps.`.slice(0,90)];
    $('#ppSeaAssets').innerHTML=`<h3>Headlines <small>max. 30 characters</small></h3>${heads.map(h=>`<div class="pp-ad-row"><span>${esc(h)}</span><b>${h.length}/30</b></div>`).join('')}<h3>Descriptions <small>max. 90 characters</small></h3>${desc.map(d=>`<div class="pp-ad-row"><span>${esc(d)}</span><b>${d.length}/90</b></div>`).join('')}`;
    $('#ppSeaPreviewTitle').textContent=`${heads[0]} | ${heads[1]}`;$('#ppSeaPreviewText').textContent=desc[0];$('#ppAdStrength').textContent='Excellent';$('#ppAdStrengthBar').style.width='92%';ppToast('SEA assets generated','12 headlines and 4 descriptions created.');
  }
  function generateMeta(){
    const brief=$('#ppMetaBrief').value.trim(),product=/YDG/i.test(brief)?'YDG':/YDP/i.test(brief)?'YDP':/L-Series/i.test(brief)?'L-Series':'Industrial Solutions';
    const title=`${product} Professional Solutions | Yanmar Europe`.slice(0,60),desc=`Explore Yanmar ${product} solutions for professional applications, practical product value and local distributor support.`.slice(0,160);
    $('#ppMetaOutput').innerHTML=`<div class="pp-meta-row"><small>Page title</small><strong>${esc(title)}</strong></div><div class="pp-meta-row"><small>Meta description</small><strong>${esc(desc)}</strong></div><div class="pp-meta-row"><small>Suggested slug</small><strong>/industrial/${slug(product)}-professional-solutions/</strong></div><div class="pp-meta-row"><small>Open Graph title</small><strong>${esc(product)}: professional performance for demanding work</strong></div><div class="pp-meta-row"><small>Structured summary</small><strong>${esc(brief)}</strong></div>`;ppToast('Metadata generated','Review the draft against the final page.');
  }

  function renderMarkets(){
    const region=$('#ppMarketRegion').value;const filtered=markets.filter(m=>region==='All regions'||m.region===region);
    $('#ppMarketGrid').innerHTML=filtered.map(m=>`<article class="pp-market-card"><div class="pp-market-top ${m.theme}"><b>${m.flag}</b><div><strong>${esc(m.name)}</strong><small>${esc(m.region)} · ${m.products.join(' / ')}</small></div></div><div class="pp-market-body"><div class="pp-market-score"><p><small>Recommended focus</small><strong>${esc(m.focus)}</strong></p><b>${m.score}</b></div><div class="pp-market-needs">${m.needs.map(n=>`<span>${esc(n)}</span>`).join('')}</div><button data-market="${esc(m.name)}">Open playbook →</button></div></article>`).join('');
    $$('[data-market]').forEach(b=>b.onclick=()=>openMarket(b.dataset.market));
  }
  function openMarket(name){
    const m=markets.find(x=>x.name===name);
    modal({eyebrow:`${m.region} market playbook`,title:m.name,body:`<div class="pp-approval-meta"><div><small>Activation score</small><strong>${m.score}/100</strong></div><div><small>Status</small><strong>${m.status}</strong></div><div><small>Product focus</small><strong>${m.products.join(', ')}</strong></div></div><h3>Recommended focus</h3><p>${esc(m.focus)}.</p><h3>Priority support</h3><ul>${m.needs.map(n=>`<li>${esc(n)}</li>`).join('')}</ul><h3>Suggested next move</h3><p>Build one localized campaign combining a practical use case, a clear customer-value explanation and a direct local call to action.</p>`,actions:[{label:'Close',onClick:closeModalPP},{label:'Build campaign',primary:true,onClick:()=>{closeModalPP();document.querySelector('[data-view="campaign-studio"]').click();$('#campaignMarket').value=m.name;$('#campaignProduct').value=m.products[0];$('#campaignMarket').dispatchEvent(new Event('input'));}}]});
  }

  const eventItems=[['C','Pre-event campaign','Social announcement, dealer email and local landing-page update.','4 weeks before'],['A','Approved asset pack','Product visuals, brochure, specifications and comparison sheet.','3 weeks before'],['B','Booth story','One headline, three customer benefits and a clear visitor journey.','2 weeks before'],['D','Demo preparation','Product setup, safety check and application scenario.','1 week before'],['L','Lead capture','QR form, qualification questions and consent wording.','Before event'],['T','Team briefing','Roles, product talking points, objection handling and follow-up.','1 day before'],['R','Result reporting','Visitors, leads, feedback, photos and key questions.','During event'],['F','Follow-up sequence','Thank-you email, requested content and sales handover.','Within 3 days']];
  function renderEvent(){
    const completed=read('eventCompleted',[]);
    $('#ppEventChecklist').innerHTML=eventItems.map((v,i)=>`<label class="pp-event-item"><input type="checkbox" data-event="${i}" ${completed.includes(i)?'checked':''}><b>${v[0]}</b><div><strong>${esc(v[1])}</strong><small>${esc(v[2])}</small></div><em>${esc(v[3])}</em></label>`).join('');
    $$('[data-event]').forEach(c=>c.onchange=()=>{let list=read('eventCompleted',[]),i=Number(c.dataset.event);list=c.checked?[...new Set([...list,i])]:list.filter(x=>x!==i);write('eventCompleted',list);updateEventProgress();});updateEventProgress();
  }
  function updateEventProgress(){const l=read('eventCompleted',[]);$('#ppEventProgress').textContent=`${l.length} / ${eventItems.length} complete`;}

  const coursesDefault=[
    {id:1,title:'YDG Value Selling',desc:'Explain reliability, professional use and lifetime value.',minutes:18,progress:100,theme:'red',icon:'V'},
    {id:2,title:'TCO Conversations',desc:'Use ownership-cost logic without overclaiming savings.',minutes:24,progress:58,theme:'orange',icon:'€'},
    {id:3,title:'Local Campaign Basics',desc:'Translate one campaign idea into a practical channel mix.',minutes:16,progress:30,theme:'blue',icon:'C'},
    {id:4,title:'YDP Application Stories',desc:'Connect portable pumping to real professional scenarios.',minutes:21,progress:0,theme:'green',icon:'P'},
    {id:5,title:'Responsible AI Content',desc:'Create faster while checking claims, tone and localization.',minutes:14,progress:0,theme:'purple',icon:'AI'}
  ];
  function renderCourses(){
    const courses=read('courses',coursesDefault);
    $('#ppCourseGrid').innerHTML=courses.map(c=>`<article class="pp-course-card"><div class="pp-course-cover ${c.theme}"><b>${c.icon}</b><strong>${esc(c.title)}</strong></div><div class="pp-course-body"><div class="pp-course-meta"><span>${c.minutes} minutes</span><span>${c.progress}% complete</span></div><p>${esc(c.desc)}</p><div class="pp-course-progress"><em style="width:${c.progress}%"></em></div><button data-course="${c.id}">${c.progress===100?'Review module':c.progress?'Continue learning':'Start module'}</button></div></article>`).join('');
    $$('[data-course]').forEach(b=>b.onclick=()=>openCourse(Number(b.dataset.course)));
    const pct=Math.round(courses.reduce((s,c)=>s+c.progress,0)/courses.length);$('#ppAcademyPercent').textContent=`${pct}%`;$('#ppAcademyBar').style.width=`${pct}%`;
  }
  function openCourse(id){
    const courses=read('courses',coursesDefault),c=courses.find(x=>x.id===id);
    modal({eyebrow:'Distributor Academy',title:c.title,body:`<p>${esc(c.desc)}</p><div class="pp-approval-preview"><strong>Learning checkpoint</strong><p>Which approach best supports responsible distributor communication?</p><label><input type="radio" name="ppQuiz" value="a"> Publish generated copy immediately.</label><br><label><input type="radio" name="ppQuiz" value="b"> Verify claims, local context and product availability before use.</label><br><label><input type="radio" name="ppQuiz" value="c"> Use the same message in every market without adaptation.</label></div>`,actions:[{label:'Close',onClick:closeModalPP},{label:'Complete checkpoint',primary:true,onClick:()=>{const answer=$('input[name="ppQuiz"]:checked');if(!answer){ppToast('Select an answer');return;}if(answer.value!=='b'){ppToast('Try again','Responsible communication requires verification and local review.');return;}c.progress=100;write('courses',courses);closeModalPP();renderCourses();ppToast('Module completed',c.title);}}]});
  }

  const mdfDefault=[
    {id:'CM-041',title:'Poland construction event',market:'Poland',amount:3800,status:'Approved',updated:'21 Jul'},
    {id:'CM-044',title:'Spanish YDG search campaign',market:'Spain',amount:2400,status:'In review',updated:'Today'},
    {id:'CM-045',title:'UAE bilingual dealer campaign',market:'UAE',amount:3200,status:'Draft',updated:'Today'}
  ];
  function renderMdf(){
    const list=read('mdf',mdfDefault);$('#ppMdfOpenCount').textContent=list.filter(x=>x.status!=='Approved').length;
    $('#ppMdfList').innerHTML=list.map(x=>`<div class="pp-request-row"><span>M</span><div><strong>${esc(x.title)}</strong><small>${x.id} · ${esc(x.market)}</small></div><em>€${x.amount.toLocaleString('en-GB')}</em><span class="pp-status ${slug(x.status)}">${x.status}</span><button data-mdf="${x.id}">View</button></div>`).join('');
    $$('[data-mdf]').forEach(b=>b.onclick=()=>{const x=list.find(i=>i.id===b.dataset.mdf);modal({eyebrow:x.id,title:x.title,body:`<div class="pp-approval-meta"><div><small>Market</small><strong>${x.market}</strong></div><div><small>Requested</small><strong>€${x.amount.toLocaleString('en-GB')}</strong></div><div><small>Status</small><strong>${x.status}</strong></div></div><p>This structured prototype request helps Yanmar compare the local objective, audience, channel plan, budget and expected result.</p>`,actions:[{label:'Close',onClick:closeModalPP}]});});
  }
  function newMdf(){
    modal({eyebrow:'Co-Marketing Hub',title:'New activation request',body:`<div class="form-grid two-col"><label><span>Request title</span><input id="ppMdfTitle" value="Local YDG activation campaign"></label><label><span>Market</span><select id="ppMdfMarket">${markets.map(m=>`<option>${m.name}</option>`).join('')}</select></label><label><span>Requested budget (€)</span><input id="ppMdfAmount" type="number" value="2500"></label><label><span>Primary channel</span><select><option>Event</option><option>Digital campaign</option><option>Dealer activation</option><option>Content production</option></select></label><label class="full-row"><span>Expected result</span><textarea rows="4">Describe the target audience, expected reach, leads or distributor action.</textarea></label></div>`,actions:[{label:'Cancel',onClick:closeModalPP},{label:'Save request',primary:true,onClick:()=>{const l=read('mdf',mdfDefault);l.push({id:`CM-${46+l.length}`,title:$('#ppMdfTitle').value||'Co-marketing request',market:$('#ppMdfMarket').value,amount:number($('#ppMdfAmount').value),status:'In review',updated:'Just now'});write('mdf',l);closeModalPP();renderMdf();ppToast('Request submitted');}}]});
  }

  const approvalsDefault=[
    {id:'AP-301',type:'Localization',title:'Dutch YDG landing page',market:'Netherlands',author:'Distributor user',submitted:'18 min ago',content:'Yanmar YDG portable diesel generators provide dependable professional power for construction, rental and demanding field applications. Contact your local distributor to compare the range and discuss availability.'},
    {id:'AP-302',type:'Campaign',title:'Spanish responsive search ad',market:'Spain',author:'Carlos · Distributor',submitted:'1 hour ago',content:'Potencia diésel profesional para obras y alquiler. Descubra la gama YDG y solicite información local.'},
    {id:'AP-303',type:'Content',title:'Polish comparison sheet',market:'Poland',author:'Anna · Distributor',submitted:'3 hours ago',content:'Comparison draft covering rated output, runtime, noise, weight and Stage V status. Competitor specifications require final source verification.'},
    {id:'AP-304',type:'Localization',title:'Arabic YDP campaign email',market:'UAE',author:'Raheel · Distributor',submitted:'Yesterday',content:'Bilingual email draft focused on professional pumping, emergency response and local distributor contact.'}
  ];
  function renderApprovalsPP(){
    const list=read('approvals',approvalsDefault);$('#ppApprovalCount').textContent=list.length;
    $('#ppApprovalList').innerHTML=`<div class="panel-head"><div><p class="eyebrow">Queue</p><h3>${list.length} submissions</h3></div></div>${list.map(a=>`<button class="pp-approval-item" data-approval="${a.id}"><span>${a.type.slice(0,2).toUpperCase()}</span><div><strong>${esc(a.title)}</strong><small>${esc(a.market)} · ${esc(a.author)}</small></div><em>${esc(a.submitted)}</em></button>`).join('')}`;
    $$('[data-approval]').forEach(b=>b.onclick=()=>showApproval(b.dataset.approval));
    if(list[0])showApproval(list[0].id);else $('#ppApprovalDetail').innerHTML='<div class="pp-empty-state"><span>✓</span><h3>All clear</h3><p>No submissions are waiting for review.</p></div>';
  }
  function showApproval(id){
    const list=read('approvals',approvalsDefault),a=list.find(x=>x.id===id);if(!a)return;
    $$('[data-approval]').forEach(b=>b.classList.toggle('is-active',b.dataset.approval===id));
    $('#ppApprovalDetail').innerHTML=`<div class="panel-head"><div><p class="eyebrow">${a.id} · ${esc(a.type)}</p><h3>${esc(a.title)}</h3></div><span class="pp-status in-review">Pending review</span></div><div class="pp-approval-meta"><div><small>Market</small><strong>${esc(a.market)}</strong></div><div><small>Submitted by</small><strong>${esc(a.author)}</strong></div><div><small>Submitted</small><strong>${esc(a.submitted)}</strong></div></div><div class="pp-approval-preview">${esc(a.content)}</div><label style="display:grid;gap:7px;margin-top:16px"><span>Reviewer comment</span><textarea id="ppApprovalComment" rows="4" placeholder="Add clear, actionable feedback…"></textarea></label><div class="pp-approval-actions"><button class="secondary-button" data-revise="${a.id}">Request changes</button><button class="primary-button" data-approve="${a.id}">Approve submission</button></div>`;
    $('[data-revise]').onclick=()=>resolveApproval(id,'Changes requested');$('[data-approve]').onclick=()=>resolveApproval(id,'Approved');
  }
  function resolveApproval(id,result){let list=read('approvals',approvalsDefault);const a=list.find(x=>x.id===id);list=list.filter(x=>x.id!==id);write('approvals',list);renderApprovalsPP();ppToast(result,a.title);}

  const usersDefault=[
    {id:1,name:'Ardi Delawi',email:'ardi@distributor.example',market:'Netherlands',role:'Distributor',active:'Today',status:'Active'},
    {id:2,name:'Anna Kalman',email:'anna@techbud.example',market:'Poland',role:'Distributor',active:'Yesterday',status:'Active'},
    {id:3,name:'Raheel Aziz',email:'raheel@yanmar.example',market:'UAE',role:'Distributor',active:'2 days ago',status:'Active'},
    {id:4,name:'Kim Mulder',email:'kim@yanmar.example',market:'EMEA',role:'Admin',active:'Today',status:'Active'},
    {id:5,name:'Carlos Vega',email:'carlos@distributor.example',market:'Spain',role:'Distributor',active:'12 days ago',status:'Inactive'}
  ];
  function renderUsersPP(q=''){
    const list=read('users',usersDefault).filter(u=>`${u.name} ${u.email} ${u.market} ${u.role}`.toLowerCase().includes(q.toLowerCase()));
    $('#ppUserTable').innerHTML=list.map(u=>`<tr><td><div class="pp-user-cell"><span class="pp-user-avatar">${u.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><div><strong>${esc(u.name)}</strong><small>${esc(u.email)}</small></div></div></td><td>${esc(u.market)}</td><td>${u.role}</td><td>${u.active}</td><td><span class="pp-status ${slug(u.status)}">${u.status}</span></td><td><button class="pp-table-action" data-user="${u.id}">Manage</button></td></tr>`).join('');
    $$('[data-user]').forEach(b=>b.onclick=()=>manageUser(Number(b.dataset.user)));
  }
  function manageUser(id){
    const list=read('users',usersDefault),u=list.find(x=>x.id===id);
    modal({eyebrow:'User access',title:u.name,body:`<div class="form-grid two-col"><label class="full-row"><span>Email</span><input value="${esc(u.email)}" readonly></label><label><span>Role</span><select id="ppManageRole"><option ${u.role==='Distributor'?'selected':''}>Distributor</option><option ${u.role==='Admin'?'selected':''}>Admin</option></select></label><label><span>Status</span><select id="ppManageStatus"><option ${u.status==='Active'?'selected':''}>Active</option><option ${u.status==='Inactive'?'selected':''}>Inactive</option></select></label></div>`,actions:[{label:'Cancel',onClick:closeModalPP},{label:'Save changes',primary:true,onClick:()=>{u.role=$('#ppManageRole').value;u.status=$('#ppManageStatus').value;write('users',list);closeModalPP();renderUsersPP();ppToast('User updated',u.name);}}]});
  }
  function inviteUser(){
    modal({eyebrow:'User access',title:'Invite a distributor user',body:`<div class="form-grid two-col"><label class="full-row"><span>Name</span><input id="ppInviteName" value="New distributor user"></label><label class="full-row"><span>Email</span><input id="ppInviteEmail" type="email" placeholder="name@company.com"></label><label><span>Market</span><select id="ppInviteMarket">${markets.map(m=>`<option>${m.name}</option>`).join('')}</select></label><label><span>Role</span><select id="ppInviteRole"><option>Distributor</option><option>Admin</option></select></label></div>`,actions:[{label:'Cancel',onClick:closeModalPP},{label:'Create invitation',primary:true,onClick:()=>{const l=read('users',usersDefault);l.push({id:Date.now(),name:$('#ppInviteName').value,email:$('#ppInviteEmail').value||'pending@example.com',market:$('#ppInviteMarket').value,role:$('#ppInviteRole').value,active:'Invitation sent',status:'Inactive'});write('users',l);closeModalPP();renderUsersPP();ppToast('Invitation created');}}]});
  }

  function bind(){
    $('#ppImpactSearch').addEventListener('input',e=>renderImpact(e.target.value));
    $('#ppExportImpact').onclick=()=>download('amplify-plus-plus-impact.csv','Market,Activation score,Status\n'+markets.map(m=>`${m.name},${m.score},${m.status}`).join('\n'),'text/csv;charset=utf-8');
    $$('.pp-product-tabs button').forEach(b=>b.onclick=()=>{currentProduct=b.dataset.ppProduct;$$('.pp-product-tabs button').forEach(x=>x.classList.toggle('is-active',x===b));renderProduct();});
    $('#ppDownloadProductBrief').onclick=()=>{const p=products[currentProduct];download(`${slug(currentProduct)}-product-brief.txt`,`${currentProduct} — ${p.label}\n\n${p.headline}\n\n${p.description}\n\nKey value points:\n${p.values.map(v=>`- ${v[1]}: ${v[2]}`).join('\n')}`);};
    $$('.pp-lab-tabs button').forEach(b=>b.onclick=()=>{$$('.pp-lab-tabs button').forEach(x=>x.classList.toggle('is-active',x===b));$$('.pp-lab-panel').forEach(p=>p.classList.toggle('is-active',p.dataset.ppLabPanel===b.dataset.ppLab));});
    $('#ppAnalyzeSeo').onclick=analyzeSeo;$('#ppGenerateSea').onclick=generateSea;$('#ppGenerateMeta').onclick=generateMeta;
    $('#ppMarketRegion').onchange=renderMarkets;$('#ppBuildEvent').onclick=()=>{renderEvent();ppToast('Event kit created',$('#ppEventName').value);};
    $('#ppExportEvent').onclick=()=>download('yanmar-event-kit.txt',`${$('#ppEventName').value}\nDate: ${$('#ppEventDate').value}\nMarket: ${$('#ppEventMarket').value}\nProduct: ${$('#ppEventProduct').value}\n\n${eventItems.map((x,i)=>`${read('eventCompleted',[]).includes(i)?'[x]':'[ ]'} ${x[1]} — ${x[2]} (${x[3]})`).join('\n')}`);
    $('#ppNewMdfRequest').onclick=newMdf;$('#ppUserSearch').oninput=e=>renderUsersPP(e.target.value);$('#ppInviteUser').onclick=inviteUser;
  }
  function init(){
    renderImpact();renderProduct();analyzeSeo();generateSea();generateMeta();renderMarkets();renderEvent();renderCourses();renderMdf();renderApprovalsPP();renderUsersPP();bind();
  }
  document.addEventListener('DOMContentLoaded',init);
})();
