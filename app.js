/**
 * AURA AI — by FW JADE (Medan Giok)
 * Architected & Engineered by Richkeyrick (www.richkeyrick.com)
 * Quiet Mystic Luxury Experience Engine
 */

// ==========================================
// 1. STATE & DATABASE
// ==========================================
const AppState = {
  lang: 'id', // 'id' | 'en'
  user: {
    name: 'Kolektor Yang Terhormat',
    isRegistered: false,
    metrics: {
      element: 'WOOD',
      alignmentScore: 96,
      vitality: 91,
      energyBalance: 'Optimal',
      fortuneLevel: 'Tinggi',
      energyReco: 'Menjaga stabilitas & fokus',
      selectedGem: null
    }
  },
  session: {
    isFreeUsed: false,
    isPaidUnlocked: false
  },
  camera: {
    stream: null
  },
  voice: {
    isListening: false,
    recognition: null,
    synthesis: window.speechSynthesis || null,
    audioCtx: null
  }
};

// ==========================================
// 1.5 SUPABASE CONFIG (PLACEHOLDERS)
// ==========================================
const SUPABASE_URL = 'https://xyzcompany.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_key';
// In a real env, we would initialize this: 
// const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Mocking Supabase DB structure for local UI Demo
let mockHistoryDB = [];


const GemstoneDatabase = [
  {
    id: 'giok-aceh',
    name: 'Natural Aceh Jadeite',
    name_id: 'Natural Aceh Jadeite (Giok Hijau Aceh Grade A)',
    cert: 'Sertifikat Alami Grade A (GIA Standard)',
    element: 'WOOD',
    element_id: 'Wood (Kayu / 木)',
    energy: 'Harmony & Growth',
    description: 'Membantu membuka rezeki, menenangkan pikiran, dan melindungi medan aura tubuh dari gangguan energi negatif lingkungan.',
    price: 'Rp 1.850.000',
    origin: 'Nagan Raya, Aceh',
    type: 'Jadeite-Pyroxene',
    color: 'Hijau Alami Translusen',
    specEnergy: 'Harmony & Growth',
    icon: 'fa-gem',
    chemFormula: 'NaAlSi₂O₆',
    mohs: '6.8 / 10',
    sg: '3.33 g/cm³',
    firPeak: '9.35 µm',
    firCoherence: '8–14 µm Spektrum Emisi Alami',
    ftirPurity: 'Grade A Natural (Tanpa Resin)',
    oxygenBoost: '+23.4%',
    zetaPotential: 'ζ ≤ -15 mV (Aktif)',
    viscosityRed: '-18.6% (Lancar)',
    zodiacMatch: 'Taurus, Cancer, Capricorn, Pisces',
    shioMatch: 'Naga, Macan, Kuda, Kelinci',
    wuXingCycle: 'Kayu (Wood) → Mengalirkan Api Kemakmuran & Stabilitas Rezeki',
    keywords: ['giok', 'jade', 'nephrite', 'jadeite', 'hijau', 'green', 'aceh', 'hoki', 'keberuntungan', 'wood', 'kayu']
  },
  {
    id: 'black-jade',
    name: 'Black Jade Aceh',
    name_id: 'Black Jade Aceh (Giok Hitam Bio-Magnetik)',
    cert: 'Sertifikat Alami Grade A (Ferro-Silicate)',
    element: 'WATER / EARTH',
    element_id: 'Water / Earth (Air & Bumi / 水-土)',
    energy: 'Detox & Shield',
    description: 'Kaya mineral feromagnetik alami untuk melancarkan darah kental, detoks asam urat, terapi rematik, serta pagar gaib penangkal santet.',
    price: 'Rp 950.000',
    origin: 'Nagan Raya, Aceh',
    type: 'Black Jadeite-Magnetite',
    color: 'Hitam Pekat Kilap Basah',
    specEnergy: 'Protection & Detox',
    icon: 'fa-shield-halved',
    chemFormula: 'Fe-Mg Silicate + Fe₃O₄',
    mohs: '6.5 / 10',
    sg: '3.18 g/cm³',
    firPeak: '9.28 µm',
    firCoherence: '8–14 µm Spektrum Bio-Magnetik',
    ftirPurity: 'Grade A Natural (Tanpa Resin)',
    oxygenBoost: '+28.2%',
    zetaPotential: 'ζ ≤ -18 mV (Sangat Aktif)',
    viscosityRed: '-24.8% (Sangat Lancar)',
    zodiacMatch: 'Scorpio, Capricorn, Aquarius, Cancer',
    shioMatch: 'Tikus, Babi, Kerbau, Ayam',
    wuXingCycle: 'Air & Tanah (Water/Earth) → Menyerap Racun & Memperkokoh Pertahanan',
    keywords: ['black jade', 'giok hitam', 'hitam', 'darah', 'asam urat', 'rematik', 'detox', 'emf', 'santet']
  },
  {
    id: 'citrine',
    name: 'Natural Golden Citrine',
    name_id: 'Natural Golden Citrine (Batu Saudagar)',
    cert: 'Sertifikat Alami Grade A (Natural Quartz)',
    element: 'EARTH / METAL',
    element_id: 'Earth / Metal (Bumi & Logam / 土-金)',
    energy: 'Abundance & Wealth',
    description: 'Raja batu penarik uang dan magnet rezeki! Mempercepat closing transaksi dagang, menarik pembeli, dan melipatgandakan keuntungan usaha.',
    price: 'Rp 1.450.000',
    origin: 'Minas Gerais, Brazil',
    type: 'Crystalline Quartz (Citrine)',
    color: 'Kuning Keemasan Berkilau',
    specEnergy: 'Wealth Magnet & ROI',
    icon: 'fa-coins',
    chemFormula: 'SiO₂ + Fe³⁺ Chromophore',
    mohs: '7.0 / 10',
    sg: '2.65 g/cm³',
    firPeak: '8.85 µm',
    firCoherence: '8–10 µm Resonansi Kuarsa',
    ftirPurity: 'Grade A (Unheated Natural)',
    oxygenBoost: '+19.5%',
    zetaPotential: 'ζ ≤ -14 mV (Stabil)',
    viscosityRed: '-15.2% (Lancar)',
    zodiacMatch: 'Aries, Leo, Gemini, Virgo, Sagitarius',
    shioMatch: 'Naga, Monyet, Ayam, Kuda',
    wuXingCycle: 'Tanah & Logam (Earth/Metal) → Katalisator Penarik Peluang Emas & Modal',
    keywords: ['citrine', 'sitrin', 'saudagar', 'uang', 'rezeki', 'emas', 'money', 'wealth', 'closing', 'dagang']
  },
  {
    id: 'kecubung',
    name: 'Natural Purple Amethyst',
    name_id: 'Kecubung Ungu Alami (Amethyst Borneo)',
    cert: 'Sertifikat Alami Grade A (Natural Quartz)',
    element: 'FIRE / SPIRIT',
    element_id: 'Fire / Spirit (Api & Jiwa / 火-神)',
    energy: 'Charisma & Peace',
    description: 'Membantu penderita insomnia/susah tidur, meredakan migrain kronis, serta sarana pengasihan murni pemikat wibawa batin.',
    price: 'Rp 1.250.000',
    origin: 'Pangkalan Bun, Kalimantan',
    type: 'Crystalline Quartz (Amethyst)',
    color: 'Ungu Kristal Royal Imperial',
    specEnergy: 'Pengasihan & Wibawa',
    icon: 'fa-wand-magic-sparkles',
    chemFormula: 'SiO₂ + Fe⁴⁺ Interstitial',
    mohs: '7.0 / 10',
    sg: '2.65 g/cm³',
    firPeak: '8.90 µm',
    firCoherence: '8–10 µm Resonansi Kristal',
    ftirPurity: 'Grade A (Murni Alami)',
    oxygenBoost: '+21.0%',
    zetaPotential: 'ζ ≤ -16 mV (Relaksasi Saraf)',
    viscosityRed: '-17.4% (Lancar)',
    zodiacMatch: 'Pisces, Aquarius, Sagitarius, Virgo',
    shioMatch: 'Kelinci, Anjing, Kambing, Babi',
    wuXingCycle: 'Api & Jiwa (Fire/Spirit) → Meredam Gelombang Stres & Memancarkan Karisma',
    keywords: ['kecubung', 'amethyst', 'pengasihan', 'jodoh', 'tidur', 'insomnia', 'wibawa', 'pikat']
  }
];

const IN_SCOPE_KEYWORDS = [
  'batu', 'giok', 'akik', 'kristal', 'gem', 'stone', 'jade', 'ruby', 'amethyst', 'kecubung',
  'citrine', 'pirit', 'pyrite', 'bacan', 'pirus', 'sulaiman', 'safir', 'zamrud', 'emerald',
  'sapphire', 'obsidian', 'tourmaline', 'agate', 'diamond', 'berlian', 'mineral', 'mohs',
  'chakra', 'cakra', 'fengshui', 'feng shui', 'rezeki', 'hoki', 'aura', 'khodam', 'tuah',
  'santet', 'mistis', 'darah', 'detoks', 'kesehatan', 'chi', 'mian xiang', 'wajah', 'shio',
  'kekayaan', 'untung', 'penglaris', 'pengasihan', 'bangle', 'gelang', 'cincin', 'liontin',
  'fw jade', 'medan giok', 'faisal', 'paisan', 'hari ini'
];

// ==========================================
// 2. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initDualMode();       // ← Dual Mode System
  bindEventHandlers();
  initSpeechRecognition();
  AppState.user.metrics.selectedGem = GemstoneDatabase[0];
  updateScienceAndAstroMetrics(GemstoneDatabase[0]);
  // Restore user session from localStorage (anti-logout on refresh)
  restoreUserSession();
});

// ==========================================
// 3. BACKGROUND CANVAS
// ==========================================
function initParticleBackground() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 45; i++) {
    const isJade = Math.random() > 0.5;
    const isCyan = Math.random() > 0.8;
    let colorType = '255, 200, 87'; // Amber/Gold
    if (isJade) colorType = '43, 224, 133'; // Jade
    if (isCyan) colorType = '0, 210, 255'; // Cyan
    
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.4,
      baseColor: colorType,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random(),
      alphaSpeed: (Math.random() * 0.015) + 0.005,
      phase: Math.random() * Math.PI * 2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      // Movement
      p.x += p.vx;
      p.y += p.vy;
      
      // Gentle waving (floating in wind)
      p.x += Math.sin(p.phase) * 0.2;
      p.y += Math.cos(p.phase) * 0.1;
      p.phase += 0.02;

      // Twinkling alpha
      p.alpha += p.alphaSpeed;
      if (p.alpha > 1 || p.alpha < 0.1) p.alphaSpeed = -p.alphaSpeed;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle with glow
      const currentAlpha = Math.max(0.05, p.alpha * 0.6); // Cap max alpha for subtlety
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.baseColor}, ${currentAlpha})`;
      
      // Adding a subtle glow effect for each particle
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${p.baseColor}, ${currentAlpha})`;
      ctx.fill();
      
      // Reset shadow for performance
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================
// 4. ETHEREAL WHISPERING AUDIO ENGINE
// ==========================================
function playChimeReverb() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!AppState.voice.audioCtx) AppState.voice.audioCtx = new AudioContext();
    const ctx = AppState.voice.audioCtx;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = ctx.createDelay();
    const feedback = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(792, ctx.currentTime + 1.2);

    delay.delayTime.value = 0.28;
    feedback.gain.value = 0.32;

    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.2);
  } catch (e) {}
}

function speakWithAuraWhisper(text) {
  if (!AppState.voice.synthesis) return;
  AppState.voice.synthesis.cancel();
  playChimeReverb();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = AppState.lang === 'id' ? 'id-ID' : 'en-US';
  utterance.pitch = 0.88;
  utterance.rate = 0.84;
  utterance.volume = 0.85;

  const voices = AppState.voice.synthesis.getVoices();
  const idVoice = voices.find(v => v.lang.includes('id') || v.name.toLowerCase().includes('indonesian') || v.name.toLowerCase().includes('gadis') || v.name.toLowerCase().includes('damayanti'));
  if (idVoice && AppState.lang === 'id') utterance.voice = idVoice;

  const micBtn = document.getElementById('voiceSearchBtn');
  if (micBtn) {
    utterance.onstart = () => { micBtn.classList.add('active'); };
    utterance.onend = () => { micBtn.classList.remove('active'); };
    utterance.onerror = () => { micBtn.classList.remove('active'); };
  }

  AppState.voice.synthesis.speak(utterance);
}
const speakWithAuroraWhisper = speakWithAuraWhisper; // Backward-compatible alias

// ==========================================
// 5. OFFICIAL GOOGLE IDENTITY SERVICES (GIS) SSO
// ==========================================
function handleGoogleCredentialResponse(response) {
  try {
    if (!response || !response.credential) return;

    // Decode JWT Payload
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);

    console.log('Google Identity Verified:', payload);

    // Save to App State
    AppState.user.name = payload.name;
    AppState.user.email = payload.email;
    AppState.user.picture = payload.picture;
    AppState.user.isGoogleAuth = true;
    AppState.user.isRegistered = true;

    // ✅ Persist to localStorage so session survives refresh
    try {
      localStorage.setItem('fw_jade_user', JSON.stringify({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        isGoogleAuth: true,
        isRegistered: true,
        savedAt: Date.now()
      }));
    } catch (lsErr) { /* storage full or private browsing */ }

    // Auto-fill Input fields if currently visible
    const inputName = document.getElementById('inputUserName');
    const inputEmail = document.getElementById('inputUserEmail');
    if (inputName) inputName.value = payload.name;
    if (inputEmail) inputEmail.value = payload.email;

    // Update profile UI bar
    updateUserProfileUI();

    // Check if Master Admin
    if (payload.email && payload.email.toLowerCase() === 'fwjade.com@gmail.com') {
      AppState.user.isAdmin = true;
      alert(`Selamat Datang, Master Administrator FW JADE (${payload.email})! Akses penuh diaktifkan.`);
      openAdminModal();
    } else {
      // Sound & Notification
      playChimeReverb();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      }
    }
  } catch (err) {
    console.error('Error decoding Google credential:', err);
  }
}
window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;

/**
 * Restore user session from localStorage on page load.
 * Prevents "logged out" feel after refresh.
 */
function restoreUserSession() {
  try {
    const saved = localStorage.getItem('fw_jade_user');
    if (!saved) return;
    const userData = JSON.parse(saved);
    // Expire session after 30 days
    if (userData.savedAt && (Date.now() - userData.savedAt) > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem('fw_jade_user');
      return;
    }
    AppState.user.name = userData.name || AppState.user.name;
    AppState.user.email = userData.email || null;
    AppState.user.picture = userData.picture || null;
    AppState.user.isGoogleAuth = userData.isGoogleAuth || false;
    AppState.user.isRegistered = userData.isRegistered || false;
    updateUserProfileUI();
    console.log('[AURA AI] Session restored for:', userData.name);
  } catch (e) {
    console.warn('[AURA AI] Could not restore session:', e);
  }
}

/**
 * Updates the floating user profile bar at the top of the page.
 * Shows name + avatar if logged in, otherwise shows login prompt.
 */
function updateUserProfileUI() {
  const bar = document.getElementById('userProfileBar');
  if (!bar) return;
  const name = AppState.user.name;
  const picture = AppState.user.picture;
  const isAuth = AppState.user.isGoogleAuth || AppState.user.isRegistered;
  if (isAuth && name) {
    const initial = name.charAt(0).toUpperCase();
    const avatarHtml = picture
      ? `<img src="${picture}" alt="${name}" class="user-bar-avatar" referrerpolicy="no-referrer" />`
      : `<div class="user-bar-avatar user-bar-initial">${initial}</div>`;
    bar.innerHTML = `
      ${avatarHtml}
      <span class="user-bar-name">${name}</span>
      <button class="user-bar-logout" onclick="logoutUser()" title="Keluar"><i class="fa-solid fa-right-from-bracket"></i></button>
    `;
    bar.classList.add('visible');
  } else {
    bar.classList.remove('visible');
  }
}

/**
 * Log out user — clears localStorage and resets AppState.
 */
function logoutUser() {
  localStorage.removeItem('fw_jade_user');
  AppState.user.name = 'Kolektor Yang Terhormat';
  AppState.user.email = null;
  AppState.user.picture = null;
  AppState.user.isGoogleAuth = false;
  AppState.user.isRegistered = false;
  updateUserProfileUI();
  playChimeReverb();
}
window.logoutUser = logoutUser;

// ==========================================
// 5. PRE-SCAN IDENTITY FORM & BAZI ASTROLOGICAL CALCULATOR
// ==========================================
function initIdentityFormSelectors() {
  const daySel = document.getElementById('inputDobDay');
  const yearSel = document.getElementById('inputDobYear');

  if (daySel && daySel.options.length <= 1) {
    for (let d = 1; d <= 31; d++) {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = `${d}`;
      daySel.appendChild(opt);
    }
  }

  if (yearSel && yearSel.options.length <= 1) {
    const curYear = new Date().getFullYear();
    for (let y = curYear; y >= 1940; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = `${y}`;
      yearSel.appendChild(opt);
    }
  }

  // Listeners for live Bazi badge update
  ['inputDobDay', 'inputDobMonth', 'inputDobYear'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', calculateLiveBazi);
  });
}

function calculateLiveBazi() {
  const d = parseInt(document.getElementById('inputDobDay')?.value);
  const m = parseInt(document.getElementById('inputDobMonth')?.value);
  const y = parseInt(document.getElementById('inputDobYear')?.value);
  const badge = document.getElementById('baziLiveBadge');

  if (!d || !m || !y) {
    if (badge) badge.style.display = 'none';
    return null;
  }

  // 1. Western Zodiac
  let zodiac = 'Aries';
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) zodiac = 'Aquarius';
  else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) zodiac = 'Pisces';
  else if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) zodiac = 'Aries';
  else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) zodiac = 'Taurus';
  else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) zodiac = 'Gemini';
  else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) zodiac = 'Cancer';
  else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) zodiac = 'Leo';
  else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) zodiac = 'Virgo';
  else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) zodiac = 'Libra';
  else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) zodiac = 'Scorpio';
  else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) zodiac = 'Sagittarius';
  else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) zodiac = 'Capricorn';

  // 2. Chinese Zodiac (Shio)
  const animals = ['Tikus (Rat)', 'Kerbau (Ox)', 'Macan (Tiger)', 'Kelinci (Rabbit)', 'Naga (Dragon)', 'Ular (Snake)', 'Kuda (Horse)', 'Kambing (Goat)', 'Monyet (Monkey)', 'Ayam (Rooster)', 'Anjing (Dog)', 'Babi (Pig)'];
  const shioIdx = (y - 4) % 12;
  const shio = animals[shioIdx >= 0 ? shioIdx : shioIdx + 12];

  // 3. Wu Xing Bazi Birth Element
  const lastDigit = y % 10;
  let element = 'Kayu (Wood / 木)';
  let rawElement = 'WOOD';
  if (lastDigit === 0 || lastDigit === 1) { element = 'Logam (Metal / 金)'; rawElement = 'METAL'; }
  else if (lastDigit === 2 || lastDigit === 3) { element = 'Air (Water / 水)'; rawElement = 'WATER'; }
  else if (lastDigit === 4 || lastDigit === 5) { element = 'Kayu (Wood / 木)'; rawElement = 'WOOD'; }
  else if (lastDigit === 6 || lastDigit === 7) { element = 'Api (Fire / 火)'; rawElement = 'FIRE'; }
  else if (lastDigit === 8 || lastDigit === 9) { element = 'Tanah (Earth / 土)'; rawElement = 'EARTH'; }

  // Update Preview Badge
  const elZ = document.getElementById('valBaziZodiac');
  const elS = document.getElementById('valBaziShio');
  const elE = document.getElementById('valBaziElement');
  if (elZ) elZ.textContent = zodiac;
  if (elS) elS.textContent = shio;
  if (elE) elE.textContent = element;
  if (badge) badge.style.display = 'block';

  return { zodiac, shio, element, rawElement, dobStr: `${d}/${m}/${y}` };
}

async function submitIdentityForm() {
  const name = document.getElementById('inputUserName')?.value.trim();
  const phone = document.getElementById('inputUserPhone')?.value.trim();
  const email = document.getElementById('inputUserEmail')?.value.trim();
  const bazi = calculateLiveBazi();

  if (!name || !phone || !bazi) {
    alert('Mohon lengkapi Nama, Tanggal Lahir, dan Nomor WhatsApp Anda.');
    return;
  }

  // Save to App State
  AppState.user.name = name;
  AppState.user.phone = phone.startsWith('+') ? phone : `+62${phone.replace(/^0+/, '')}`;
  AppState.user.email = email || '-';
  AppState.user.dob = bazi.dobStr;
  AppState.user.bazi = bazi;
  AppState.user.metrics.element = bazi.rawElement;

  // Post to Cloudflare Leads Endpoint asynchronously
  try {
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: AppState.user.name,
        dob: AppState.user.dob,
        zodiac: bazi.zodiac,
        shio: bazi.shio,
        element: bazi.rawElement,
        phone: AppState.user.phone,
        email: AppState.user.email,
        gemstone: 'Natural Aceh Jadeite',
        price: 'Rp 1.850.000'
      })
    }).catch(e => console.warn('Lead submit error:', e));
  } catch (e) {}

  // Smooth transition to Camera Scanner
  const secForm = document.getElementById('secIdentityForm');
  if (secForm) secForm.style.display = 'none';

  const secScanner = document.getElementById('secScanner');
  if (secScanner) {
    secScanner.style.display = 'block';
    secScanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  startWebcam();
}
window.submitIdentityForm = submitIdentityForm;

function closeScannerFlowToHome() {
  // Stop webcam stream if active
  if (AppState.camera.stream) {
    try {
      AppState.camera.stream.getTracks().forEach(t => t.stop());
      AppState.camera.stream = null;
    } catch (e) {}
  }

  // Hide all step sections
  const secForm = document.getElementById('secIdentityForm');
  const secScan = document.getElementById('secScanner');
  const secAura = document.getElementById('secAuraResults');
  const secDerm = document.getElementById('secDermatology');
  const secGem = document.getElementById('secGemstone');
  const secMan = document.getElementById('secManifestation');
  const secViral = document.getElementById('secTrustViral');

  if (secForm) secForm.style.display = 'none';
  if (secScan) secScan.style.display = 'none';
  if (secAura) secAura.style.display = 'none';
  if (secDerm) secDerm.style.display = 'none';
  if (secGem) secGem.style.display = 'none';
  if (secMan) secMan.style.display = 'none';
  if (secViral) secViral.style.display = 'none';

  // Restore Hero section cleanly
  const secHero = document.getElementById('secHero');
  if (secHero) {
    secHero.style.display = 'block';
    secHero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
window.closeScannerFlowToHome = closeScannerFlowToHome;

function startScannerFlow() {
  initIdentityFormSelectors();
  
  const secHero = document.getElementById('secHero');
  if (secHero) secHero.style.display = 'none';

  const secForm = document.getElementById('secIdentityForm');
  if (secForm) {
    secForm.style.display = 'block';
    secForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    const secScanner = document.getElementById('secScanner');
    if (secScanner) {
      secScanner.style.display = 'block';
      secScanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    startWebcam();
  }
}

async function startWebcam() {
  const video = document.getElementById('webcamFeed');
  const fallback = document.getElementById('cameraFallback');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
    });
    AppState.camera.stream = stream;
    if (video) {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        initMediaPipeFaceMesh(video);
      };
    }
    if (fallback) fallback.style.display = 'none';
    animateScannerProgression();
  } catch (err) {
    console.warn('Camera access fallback triggered:', err);
    simulateScan();
  }
}

function initMediaPipeFaceMesh(videoElement) {
  const canvas = document.getElementById('scannerHudCanvas');
  if (!canvas || typeof FaceMesh === 'undefined') {
    drawScannerHudAnimation();
    return;
  }

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 280;
  canvas.height = canvas.offsetHeight || 280;

  try {
    if (!faceMeshInstance) {
      faceMeshInstance = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
      });

      faceMeshInstance.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      faceMeshInstance.onResults((results) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          const landmarks = results.multiFaceLandmarks[0];
          
          // Draw 468 3D Triangulation Mesh in Glowing Emerald
          ctx.fillStyle = 'rgba(43, 224, 133, 0.65)';
          ctx.strokeStyle = 'rgba(43, 224, 133, 0.25)';
          ctx.lineWidth = 0.5;

          // Connect key contour lines
          for (let i = 0; i < landmarks.length; i += 4) {
            const pt = landmarks[i];
            const x = pt.x * canvas.width;
            const y = pt.y * canvas.height;

            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }

          // Highlight 4 Mian Xiang Palaces in Sacred Gold
          const keyNodes = [
            { idx: 10, name: 'Guan Lu (Dahi)' },
            { idx: 4, name: 'Dun Tai (Hidung)' },
            { idx: 234, name: 'Qi (Pipi Kiri)' },
            { idx: 454, name: 'Qi (Pipi Kanan)' },
            { idx: 152, name: 'Di Ge (Dagu)' }
          ];

          keyNodes.forEach(node => {
            if (landmarks[node.idx]) {
              const pt = landmarks[node.idx];
              const x = pt.x * canvas.width;
              const y = pt.y * canvas.height;

              ctx.fillStyle = '#FFC857';
              ctx.shadowColor = '#FFC857';
              ctx.shadowBlur = 8;
              ctx.beginPath();
              ctx.arc(x, y, 3.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          });
        }
      });
    }

    // Connect Camera Stream to FaceMesh Processor
    if (typeof Camera !== 'undefined') {
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          if (faceMeshInstance && videoElement.videoWidth > 0) {
            await faceMeshInstance.send({ image: videoElement });
          }
        },
        width: 480,
        height: 480
      });
      camera.start();
      isMediaPipeActive = true;
    } else {
      drawScannerHudAnimation();
    }
  } catch (err) {
    console.warn('FaceMesh initialization fallback:', err);
    drawScannerHudAnimation();
  }
}

function simulateScan() {
  const fallback = document.getElementById('cameraFallback');
  if (fallback) fallback.style.display = 'none';
  drawScannerHudAnimation();
  animateScannerProgression();
}

function drawScannerHudAnimation() {
  const canvas = document.getElementById('scannerHudCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 280;
  canvas.height = canvas.offsetHeight || 280;

  let step = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.fillStyle = 'rgba(43, 224, 133, 0.7)';
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2 + step * 0.02;
      const rx = 55 + Math.sin(i * 3 + step * 0.05) * 8;
      const ry = 75 + Math.cos(i * 2 + step * 0.05) * 10;
      const x = cx + Math.cos(angle) * rx;
      const y = cy + Math.sin(angle) * ry;

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    step++;
    requestAnimationFrame(draw);
  }
  draw();
}

function captureWebcamSnapshot() {
  const video = document.getElementById('webcamFeed');

  // BUG 4 FIX: Generate a valid minimal black JPEG base64 as placeholder
  // so vision API never receives empty string (which causes HTTP 400)
  function generatePlaceholderBase64() {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const cx = c.getContext('2d');
    cx.fillStyle = '#1a1a1a';
    cx.fillRect(0, 0, 64, 64);
    cx.fillStyle = 'rgba(43,224,133,0.5)';
    cx.font = '10px sans-serif';
    cx.fillText('NO CAM', 8, 36);
    return c.toDataURL('image/jpeg', 0.5);
  }

  if (!video || video.videoWidth === 0) {
    console.warn('[AURA AI] Webcam not ready, using placeholder image for vision API');
    const placeholder = generatePlaceholderBase64();
    AppState.user.lastSnapshotBase64 = placeholder;
    return placeholder;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  // Crop & draw center square
  const minDim = Math.min(video.videoWidth, video.videoHeight);
  const startX = (video.videoWidth - minDim) / 2;
  const startY = (video.videoHeight - minDim) / 2;

  ctx.drawImage(video, startX, startY, minDim, minDim, 0, 0, 480, 480);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  AppState.user.lastSnapshotBase64 = dataUrl;

  // BUG 2 FIX: Show live snapshot preview in scanner section immediately after capture
  const previewEl = document.getElementById('snapshotCapturePreview');
  if (previewEl) {
    previewEl.src = dataUrl;
    previewEl.style.display = 'block';
    // Animate it in
    previewEl.style.opacity = '0';
    requestAnimationFrame(() => {
      previewEl.style.transition = 'opacity 0.5s ease';
      previewEl.style.opacity = '1';
    });
  }
  return dataUrl;
}

function animateScannerProgression() {
  const pBar = document.getElementById('scanProgressFill');
  const pTxt = document.getElementById('scanProgressPercent');
  const chkLight = document.getElementById('chkLight');
  const chkPos = document.getElementById('chkPos');
  const chkFilter = document.getElementById('chkFilter');

  playChimeReverb();

  let percent = 0;
  const interval = setInterval(async () => {
    percent += 4;
    if (pBar) pBar.style.width = `${percent}%`;
    if (pTxt) pTxt.textContent = `${percent}%`;

    if (percent >= 30 && chkLight) chkLight.classList.add('active');
    if (percent >= 65 && chkPos) chkPos.classList.add('active');
    if (percent >= 90 && chkFilter) chkFilter.classList.add('active');

    if (percent >= 100) {
      clearInterval(interval);

      // Gold & Emerald Particle Celebration Confetti
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2BE085', '#FFC857', '#059669', '#FBBF24']
        });
      }

      // BUG 4 FIX: Retry snapshot capture up to 3 times with 500ms delay
      // to ensure video stream has fully loaded before capturing
      let snapshot = captureWebcamSnapshot();
      const video = document.getElementById('webcamFeed');
      if (!snapshot || (video && video.videoWidth === 0)) {
        // Wait for video to be truly ready
        await new Promise(resolve => setTimeout(resolve, 500));
        snapshot = captureWebcamSnapshot();
      }
      if (!snapshot || (video && video.videoWidth === 0)) {
        await new Promise(resolve => setTimeout(resolve, 800));
        snapshot = captureWebcamSnapshot();
      }
      console.log('[AURA AI] Snapshot captured, size:', snapshot ? snapshot.length : 0);
      await processAiVisionScan(snapshot);
    }
  }, 60);
}

async function processAiVisionScan(snapshotBase64) {
  let matchedGem = GemstoneDatabase[0];
  let customGreeting = null;

  // BUG 2 FIX: Display the captured face in the before panel immediately
  const beforeImg = document.getElementById('faceBeforeImg');
  if (beforeImg && snapshotBase64) {
    beforeImg.src = snapshotBase64;
    beforeImg.style.display = 'block';
  }
  const beforePanel = document.getElementById('faceComparePanel');
  if (beforePanel && snapshotBase64) {
    beforePanel.style.display = 'flex';
  }
  const afterStatus = document.getElementById('faceAfterStatus');
  if (afterStatus) afterStatus.textContent = 'Menganalisa wajah...';

  try {
    const res = await fetch('/api/vision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64: snapshotBase64 || '',
        language: AppState.lang
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.analysis) {
        const a = data.analysis;
        AppState.user.metrics.element = a.element || 'WOOD';
        AppState.user.metrics.alignmentScore = a.alignmentScore || 96;
        AppState.user.metrics.vitality = a.vitality || 91;
        AppState.user.metrics.energyBalance = a.energyBalance || 'Optimal';
        AppState.user.metrics.fortuneLevel = a.fortuneLevel || 'Tinggi';
        AppState.user.metrics.energyReco = a.energyReco || 'Menjaga stabilitas & fokus';
        console.log('[AURA AI] Vision analysis received, model:', data.model, '| element:', a.element);

        // Match Gemstone
        if (a.recommendedGemId) {
          const found = GemstoneDatabase.find(g => g.id === a.recommendedGemId);
          if (found) matchedGem = found;
        } else if (a.element) {
          const foundByEl = GemstoneDatabase.find(g => g.element.includes(a.element));
          if (foundByEl) matchedGem = foundByEl;
        }

        // Dynamically update Mian Xiang Palaces
        if (a.mianXiangAnalysis) {
          if (MIAN_XIANG_DATA.career) MIAN_XIANG_DATA.career.desc = a.mianXiangAnalysis.forehead || MIAN_XIANG_DATA.career.desc;
          if (MIAN_XIANG_DATA.wealth) MIAN_XIANG_DATA.wealth.desc = a.mianXiangAnalysis.nose || MIAN_XIANG_DATA.wealth.desc;
          if (MIAN_XIANG_DATA.vitality) MIAN_XIANG_DATA.vitality.desc = a.mianXiangAnalysis.eyesCheek || MIAN_XIANG_DATA.vitality.desc;
          if (MIAN_XIANG_DATA.harmony) MIAN_XIANG_DATA.harmony.desc = a.mianXiangAnalysis.chin || MIAN_XIANG_DATA.harmony.desc;
        }

        if (a.whisperGreeting) {
          customGreeting = a.whisperGreeting;
        }
      }
    }
  } catch (e) {
    console.warn('AI Vision Scan Edge Fetch error, using graceful fallback:', e);
  }

  const gemForTransform = matchedGem;

  setTimeout(() => {
    // Direct Instant Reveal
    revealFullResults(gemForTransform, customGreeting);

    // BUG 3 FIX: Call /api/image for img2img transformation (after-image)
    // This runs in background and updates the after panel when ready
    if (snapshotBase64 && snapshotBase64.length > 500) {
      callImageTransformation(snapshotBase64, gemForTransform);
    } else {
      // No real webcam capture — still generate a text-prompt image
      callImageTransformation(null, gemForTransform);
    }
  }, 400);
}

/**
 * BUG 3 FIX: Call /api/image to generate the img2img transformed "after" image.
 * Shows a loading spinner while generating, then displays the result.
 */
async function callImageTransformation(snapshotBase64, gemObj) {
  const afterImg = document.getElementById('faceAfterImg');
  const afterStatus = document.getElementById('faceAfterStatus');
  const afterSpinner = document.getElementById('faceAfterSpinner');
  const beforePanel = document.getElementById('faceComparePanel');

  if (beforePanel) beforePanel.style.display = 'flex';
  if (afterSpinner) afterSpinner.style.display = 'flex';
  if (afterImg) afterImg.style.display = 'none';
  if (afterStatus) afterStatus.textContent = 'Membuat transformasi aura...';

  try {
    const reqBody = {
      gemName: gemObj.name || 'Natural Aceh Jadeite',
      gemColor: gemObj.color || 'Emerald Green',
      promptAdd: `${gemObj.element_id || 'Wood'} element aura, luxury editorial portrait`
    };
    // Only include image if real webcam capture happened
    if (snapshotBase64 && snapshotBase64.length > 5000) {
      reqBody.imageBase64 = snapshotBase64;
    }

    const res = await fetch('/api/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.imageUrl) {
        if (afterSpinner) afterSpinner.style.display = 'none';
        if (afterStatus) afterStatus.textContent = 'Transformasi Aura Selesai';
        if (afterImg) {
          afterImg.src = data.imageUrl;
          afterImg.style.display = 'block';
          afterImg.style.opacity = '0';
          afterImg.onload = () => {
            afterImg.style.transition = 'opacity 0.8s ease';
            afterImg.style.opacity = '1';
            // Celebration for image loaded
            if (typeof confetti === 'function') {
              confetti({ particleCount: 30, spread: 50, origin: { y: 0.5 }, colors: ['#2BE085', '#FFC857'] });
            }
            playChimeReverb();
          };
        }
        console.log('[AURA AI] Image transformation complete, model used:', data.prompt ? 'img2img' : 'text2img');
      }
    } else {
      if (afterSpinner) afterSpinner.style.display = 'none';
      if (afterStatus) afterStatus.textContent = 'Transformasi tidak tersedia saat ini';
    }
  } catch (e) {
    console.warn('[AURA AI] Image transformation error:', e);
    if (afterSpinner) afterSpinner.style.display = 'none';
    if (afterStatus) afterStatus.textContent = '';
  }
}

function revealFullResults(gemObj, customGreeting) {
  AppState.user.metrics.selectedGem = gemObj;

  // Bind Gemstone Data Defensively
  const elTitle = document.getElementById('gemTitle');
  if (elTitle) elTitle.textContent = gemObj.name;

  const elTagEl = document.getElementById('gemTagElement');
  if (elTagEl) elTagEl.textContent = `Elemen: ${gemObj.element_id || 'Wood'}`;

  const elTagEn = document.getElementById('gemTagEnergy');
  if (elTagEn) elTagEn.textContent = `Energi: ${gemObj.energy || 'Harmony'}`;

  const elDesc = document.getElementById('gemDesc');
  if (elDesc) elDesc.textContent = gemObj.description;

  const elPrice = document.getElementById('gemPrice');
  if (elPrice) elPrice.textContent = gemObj.price;

  const elOrigin = document.getElementById('specOrigin');
  if (elOrigin) elOrigin.textContent = gemObj.origin || 'Aceh';

  const elType = document.getElementById('specType');
  if (elType) elType.textContent = gemObj.type || 'Jadeite';

  const elColor = document.getElementById('specColor');
  if (elColor) elColor.textContent = gemObj.color || 'Hijau Alami';

  const elSpecEnergy = document.getElementById('specEnergy');
  if (elSpecEnergy) elSpecEnergy.textContent = gemObj.specEnergy || gemObj.energy || 'Harmony';

  const elIcon = document.getElementById('gemDisplayIcon');
  if (elIcon) elIcon.className = `fa-solid ${gemObj.icon || 'fa-gem'} gem-large-icon`;

  const elTag = document.getElementById('valWearingGemTag');
  if (elTag) elTag.innerHTML = `<i class="fa-solid ${gemObj.icon || 'fa-gem'}"></i> ${gemObj.name}`;

  // Update Aura Metrics in UI
  const valEl = document.getElementById('valAuraElement');
  if (valEl) valEl.textContent = AppState.user.metrics.element || 'WOOD';

  const valScore = document.getElementById('valAuraScore');
  if (valScore) valScore.textContent = `${AppState.user.metrics.alignmentScore || 96}%`;

  const valVit = document.getElementById('valVitality');
  if (valVit) valVit.textContent = `${AppState.user.metrics.vitality || 91}%`;

  const valBal = document.getElementById('valEnergyBalance');
  if (valBal) valBal.textContent = AppState.user.metrics.energyBalance || 'Optimal';

  const valFort = document.getElementById('valFortuneLevel');
  if (valFort) valFort.textContent = AppState.user.metrics.fortuneLevel || 'Tinggi';

  const valReco = document.getElementById('valEnergyReco');
  if (valReco) valReco.textContent = AppState.user.metrics.energyReco || 'Menjaga stabilitas & fokus';

  // Update Dermatological Health Metrics
  const skinBarrier = Math.min(98, (AppState.user.metrics.vitality || 91) - 2);
  const eyeFatigue = Math.max(18, 100 - (AppState.user.metrics.vitality || 91) + 12);

  const elSkinScore = document.getElementById('valSkinBarrierScore');
  const elSkinFill = document.getElementById('valSkinBarrierFill');
  if (elSkinScore) elSkinScore.textContent = `${skinBarrier}% (${skinBarrier >= 85 ? 'Sangat Sehat' : 'Sehat'})`;
  if (elSkinFill) elSkinFill.style.width = `${skinBarrier}%`;

  const elEyeScore = document.getElementById('valEyeFatigueScore');
  const elEyeFill = document.getElementById('valEyeFatigueFill');
  if (elEyeScore) elEyeScore.textContent = `${eyeFatigue}% (${eyeFatigue <= 35 ? 'Kelelahan Ringan' : 'Kelelahan Sedang'})`;
  if (elEyeFill) elEyeFill.style.width = `${eyeFatigue}%`;

  const elDermTherapy = document.getElementById('valDermTherapyNote');
  if (elDermTherapy) {
    elDermTherapy.textContent = `Berdasarkan deteksi vitalitas ${AppState.user.name} (${AppState.user.dob || 'Penyelarasan Bazi'}), getaran mineral bio-fisika ${gemObj.name} membantu menyejukkan lapisan epidermis wajah dan melancarkan mikrosirkulasi kapiler darah.`;
  }

  // Personalized WhatsApp Order URL for High-Conversion Closing
  const customerName = AppState.user.name || 'Kolektor FW JADE';
  const customerDob = AppState.user.dob ? ` (Tgl Lahir: ${AppState.user.dob})` : '';
  const customerPhone = AppState.user.phone ? ` [No: ${AppState.user.phone}]` : '';
  const waMsg = `Halo FW JADE Medan, saya ${customerName}${customerDob}. Hasil scan AI aura & dermatologi wajah saya selaras dengan ${gemObj.name} (${gemObj.price}). Saya ingin memesan perhiasan ini dan konsultasi pengiriman.`;
  const waUrl = `https://wa.me/62811619173?text=${encodeURIComponent(waMsg)}`;

  const btnWA = document.getElementById('btnOrderWA');
  if (btnWA) btnWA.href = waUrl;

  const btnArWA = document.getElementById('btnArOrderWA');
  if (btnArWA) btnArWA.href = waUrl;

  // Hide Scanner Section and Show Results Sections
  const secScan = document.getElementById('secScanner');
  if (secScan) secScan.style.display = 'none';

  const secAura = document.getElementById('secAuraResults');
  if (secAura) secAura.style.display = 'block';

  const secGem = document.getElementById('secGemstone');
  if (secGem) secGem.style.display = 'block';

  const secMan = document.getElementById('secManifestation');
  if (secMan) secMan.style.display = 'block';

  const secViral = document.getElementById('secTrustViral');
  if (secViral) secViral.style.display = 'block';

  if (secAura) {
    secAura.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const whisperText = customGreeting || `Selamat... Pembacaan aura ${customerName} selaras dengan elemen ${gemObj.element_id || 'Kayu'} di angka ${AppState.user.metrics.alignmentScore || 96} persen. Batu pelindung dan magnet rezeki yang dihadirkan untuk Anda adalah ${gemObj.name}.`;
  speakWithAuroraWhisper(whisperText);

  // Update scientific and astrological metrics
  updateScienceAndAstroMetrics(gemObj);

  // Apply element-adaptive theming
  applyElementTheme(AppState.user.metrics.element || gemObj.element || 'WOOD');

  // Update curiosity hook with specific gem context
  updateCuriosityHook(gemObj);
}

// ==========================================
// 5.5 DUAL-LENS SWITCHER & SCIENTIFIC HUD ENGINE
// ==========================================
function switchDualLens(mode) {
  const btnSci = document.getElementById('btnLensScience');
  const btnMys = document.getElementById('btnLensMystic');
  const pnlSci = document.getElementById('lensPanelScience');
  const pnlMys = document.getElementById('lensPanelMystic');

  if (mode === 'science') {
    if (btnSci) btnSci.classList.add('active');
    if (btnMys) btnMys.classList.remove('active');
    if (pnlSci) pnlSci.style.display = 'block';
    if (pnlMys) pnlMys.style.display = 'none';
  } else {
    if (btnSci) btnSci.classList.remove('active');
    if (btnMys) btnMys.classList.add('active');
    if (pnlSci) pnlSci.style.display = 'none';
    if (pnlMys) pnlMys.style.display = 'block';
  }
  playChimeReverb();
}
window.switchDualLens = switchDualLens;

function updateScienceAndAstroMetrics(gemObj) {
  if (!gemObj) return;

  // FIR & Wavelengths
  const elFirBadge = document.getElementById('valFirCoherenceBadge');
  if (elFirBadge) elFirBadge.textContent = gemObj.firCoherence || '99.2% H₂O Coherence';

  const elFirPeak = document.getElementById('valFirPeak');
  if (elFirPeak) elFirPeak.textContent = gemObj.firPeak || '9.35 µm';

  const elChem = document.getElementById('valChemFormula');
  if (elChem) elChem.textContent = gemObj.chemFormula || 'NaAlSi₂O₆';

  const elLabFormula = document.getElementById('valLabFormula');
  if (elLabFormula) elLabFormula.textContent = gemObj.chemFormula || 'NaAlSi₂O₆';

  const elLabMohs = document.getElementById('valLabMohs');
  if (elLabMohs) elLabMohs.textContent = gemObj.mohs || '6.8 / 10 (Padat)';

  const elLabSG = document.getElementById('valLabSG');
  if (elLabSG) elLabSG.textContent = gemObj.sg || '3.33 g/cm³';

  const elLabFTIR = document.getElementById('valLabFTIR');
  if (elLabFTIR) elLabFTIR.textContent = gemObj.ftirPurity || 'Grade A (0.0% Resin)';

  const elOxy = document.getElementById('valOxygenBoost');
  if (elOxy) elOxy.textContent = gemObj.oxygenBoost || '+23.4%';

  const elZeta = document.getElementById('valZetaPotential');
  if (elZeta) elZeta.textContent = gemObj.zetaPotential || 'ζ ≤ -15 mV (Aktif)';

  const elVisc = document.getElementById('valViscosityReduction');
  if (elVisc) elVisc.textContent = gemObj.viscosityRed || '-18.6% (Lancar)';

  // Astrology & Shio
  const elZodiac = document.getElementById('valZodiacMatch');
  if (elZodiac) elZodiac.textContent = gemObj.zodiacMatch || 'Taurus, Cancer, Capricorn, Pisces';

  const elShio = document.getElementById('valShioMatch');
  if (elShio) elShio.textContent = gemObj.shioMatch || 'Naga, Macan, Kuda, Kelinci';

  const elWuXing = document.getElementById('valWuXingCycle');
  if (elWuXing) elWuXing.textContent = gemObj.wuXingCycle || 'Kayu (Wood) → Mengalirkan Api Kemakmuran';

  // Dynamic Certificate Modal Sync
  const certItem = document.getElementById('certItemName');
  if (certItem) certItem.textContent = gemObj.name;
  const certSpec = document.getElementById('certSpecies');
  if (certSpec) certSpec.textContent = `${gemObj.type} (${gemObj.chemFormula || 'Natural Mineral'})`;
}

// ==========================================
// 6. QUERY HANDLER & GUARDRAIL
// ==========================================
function handleSearchQuery(rawQuery) {
  if (!rawQuery || !rawQuery.trim()) return;
  const query = rawQuery.trim();

  const omnibox = document.getElementById('omniboxInput');
  if (omnibox) omnibox.value = query;

  // Strict Guardrail
  const isStone = IN_SCOPE_KEYWORDS.some(k => query.toLowerCase().includes(k));
  if (!isStone) {
    alert(AppState.lang === 'id' 
      ? 'Mohon maaf, AURA AI khusus memandu seputar khasiat kesehatan, energi mistis, feng shui, dan rezeki dari batu mulia/giok.'
      : 'AURA AI is strictly focused on gemstone healing, mystical armor, feng shui, and wealth attraction.');
    return;
  }

  // Find matching gemstone and reveal full luxury results
  const matched = GemstoneDatabase.find(g => g.keywords.some(k => query.toLowerCase().includes(k))) || GemstoneDatabase[0];
  revealFullResults(matched);
}

// Conversation History Buffer for Contextual Memory
if (!AppState.chatHistory) AppState.chatHistory = [];

async function handleContextualAsk(customQuery) {
  const input = document.getElementById('contextualInput');
  const query = customQuery || (input ? input.value.trim() : '');
  if (!query) return;

  const streamBox = document.getElementById('chatStreamBox');
  if (input) input.value = '';

  // Add user bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble bubble-user';
  userBubble.innerHTML = `<strong>Anda:</strong> ${query}`;
  streamBox.appendChild(userBubble);
  streamBox.scrollTop = streamBox.scrollHeight;

  // Add thinking indicator bubble
  const thinkingBubble = document.createElement('div');
  thinkingBubble.className = 'chat-bubble bubble-aurora thinking-bubble';
  thinkingBubble.innerHTML = `<strong>✦ Master Aura:</strong> <span class="ai-typing-glow"><i class="fa-solid fa-sparkles fa-spin"></i> Menyelaraskan energi semesta...</span>`;
  streamBox.appendChild(thinkingBubble);
  streamBox.scrollTop = streamBox.scrollHeight;

  const gem = AppState.user.metrics.selectedGem || GemstoneDatabase[0];
  let answer = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: query,
        conversationHistory: AppState.chatHistory,
        selectedGem: gem,
        userAura: AppState.user.metrics
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.reply) {
        answer = data.reply;
      }
    }
  } catch (e) {
    console.warn('AI Chat Edge Fetch fallback:', e);
  }

  // Graceful Fallback if offline
  if (!answer) {
    if (query.toLowerCase().includes('fir') || query.toLowerCase().includes('sains') || query.toLowerCase().includes('darah')) {
      answer = `Secara bio-fisika, kisi kristal ${gem.name} (${gem.chemFormula}) memancarkan radiasi Far Infrared (FIR) pada puncak ${gem.firPeak || '9.35 µm'}. Resonansi ini menggetarkan molekul air darah, memulihkan Zeta Potential eritrosit (ζ ≤ -15 mV), dan meningkatkan oksigenasi mikrosirkulasi hingga ${gem.oxygenBoost || '+23.4%'} sesuai Hukum Poiseuille.`;
    } else if (query.toLowerCase().includes('zodiak') || query.toLowerCase().includes('shio') || query.toLowerCase().includes('kelahiran')) {
      answer = `Batu ${gem.name} memiliki resonansi harmonis luar biasa dengan Zodiak (${gem.zodiacMatch}) dan Shio (${gem.shioMatch}). Siklus energinya adalah ${gem.wuXingCycle}, menciptakan pelindung aura sekaligus magnet kemakmuran personal.`;
    } else {
      answer = `Pancaran energi ${gem.name} (${gem.chemFormula}) bekerja optimal dengan profil aura Anda (${gem.element_id || 'Kayu'}). Membantu menyeimbangkan medan elektromagnetik tubuh dan memperlancar aliran chi rezeki harian Anda.`;
    }
  }

  // Record to Conversation History
  AppState.chatHistory.push({ role: 'user', content: query });
  AppState.chatHistory.push({ role: 'assistant', content: answer });

  // Replace thinking bubble with final response
  thinkingBubble.classList.remove('thinking-bubble');
  thinkingBubble.innerHTML = `<strong>✦ Master Aura:</strong> ${answer}`;
  streamBox.scrollTop = streamBox.scrollHeight;
  speakWithAuraWhisper(answer);
}

// ==========================================
// 8. EXPORT TO PDF & OFFLINE HTML DOCUMENT
// ==========================================
function exportToPDF() {
  window.print();
}

function exportToHTML() {
  const gem = AppState.user.metrics.selectedGem || GemstoneDatabase[0];
  const dateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Laporan Resmi Aura & Batu Mulia — AURA AI by FW JADE</title>
  <style>
    body { font-family: 'Georgia', serif; background: #080F0E; color: #E6E9EC; padding: 40px 20px; line-height: 1.6; }
    .card { max-width: 680px; margin: 0 auto; background: #0E1715; border: 2px solid #D7B65A; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
    h1 { color: #FFC857; text-align: center; margin-bottom: 4px; font-size: 24px; letter-spacing: 2px; }
    .sub { text-align: center; color: #8E9894; font-size: 13px; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; }
    .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
    .k { color: #8E9894; } .v { color: #2BE085; font-weight: bold; }
    .gem-box { background: #13221F; border: 1px solid #2BE085; border-radius: 12px; padding: 18px; margin: 20px 0; }
    .footer { text-align: center; font-size: 11px; color: #646A63; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>FW JADE JEWELLERY MEDAN</h1>
    <div class="sub">AURA AI AURA & GEMSTONE REPORT • DITERBITKAN: ${dateStr}</div>
    <div class="row"><span class="k">Nama Pemilik:</span><span class="v">${AppState.user.name}</span></div>
    <div class="row"><span class="k">Elemen Dominan:</span><span class="v">${gem.element_id}</span></div>
    <div class="row"><span class="k">Aura Alignment:</span><span class="v">96% (Sangat Kuat)</span></div>
    <div class="row"><span class="k">Vitalitas Holistik:</span><span class="v">91% (Optimal)</span></div>
    
    <div class="gem-box">
      <h3 style="color:#FFC857; margin-top:0;">💎 Batu Penjaga: ${gem.name}</h3>
      <p style="font-size:13px; color:#E6E9EC;">${gem.description}</p>
      <div class="row"><span class="k">Spesifikasi Asal:</span><span>${gem.origin}</span></div>
      <div class="row"><span class="k">Harga Terdaftar:</span><span style="color:#FFC857; font-weight:bold;">${gem.price}</span></div>
    </div>

    <div class="footer">
      Sertifikat Digital & Garansi Resmi FW JADE • Jl. Sunggal No. 168 P, Medan Sunggal (+62 811-619-173)<br>
      System Architecture & AI Engineering by <strong>Richkeyrick</strong> (www.richkeyrick.com)
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `AURA_AI_Laporan_Aura_${Date.now()}.html`;
  a.click();
}

// ==========================================
// 9. SPEECH RECOGNITION (VOICE STT)
// ==========================================
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = AppState.lang === 'id' ? 'id-ID' : 'en-US';

    rec.onstart = () => {
      AppState.voice.isListening = true;
      const btn = document.getElementById('voiceSearchBtn');
      if (btn) btn.classList.add('active');
    };
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      handleSearchQuery(transcript);
    };
    rec.onend = () => {
      AppState.voice.isListening = false;
      const btn = document.getElementById('voiceSearchBtn');
      if (btn) btn.classList.remove('active');
    };
    AppState.voice.recognition = rec;
  }
}

function toggleVoiceMic() {
  if (!AppState.voice.recognition) {
    alert('Silakan gunakan Google Chrome untuk fitur suara berbisik.');
    return;
  }
  if (AppState.voice.isListening) {
    AppState.voice.recognition.stop();
  } else {
    AppState.voice.recognition.start();
  }
}

// ==========================================
// 10. MODALS & CANVAS GENERATORS
// ==========================================
function toggleCollapsibleInsight() {
  const content = document.getElementById('insightContent');
  const icon = document.getElementById('iconToggleInsight');
  if (!content || !icon) return;

  if (content.style.display === 'none') {
    content.style.display = 'block';
    icon.className = 'fa-solid fa-chevron-up';
  } else {
    content.style.display = 'none';
    icon.className = 'fa-solid fa-chevron-down';
  }
}

function openPayModal() {
  const modal = document.getElementById('midtransModal');
  if (modal) modal.classList.add('open');
}
function closePayModal() {
  const modal = document.getElementById('midtransModal');
  if (modal) modal.classList.remove('open');
}
function simulatePaymentSuccess() {
  AppState.session.isPaidUnlocked = true;
  closePayModal();
  speakWithAuroraWhisper('Pembayaran berhasil. Sesi konsultasi eksklusif Anda telah aktif tanpa batas.');
}

function generateLuxuryAuraCard() {
  const canvas = document.getElementById('auraCardCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const gem = AppState.user.metrics.selectedGem || GemstoneDatabase[0];
  const userName = AppState.user.name || 'Pencari Giok Alami';
  const element = AppState.user.metrics.dominantElement || 'WOOD';

  // 1. Deep Obsidian Luxury Canvas Background
  ctx.fillStyle = '#060B09';
  ctx.fillRect(0, 0, 450, 800);

  // 2. Multi-layer Radial Emerald & Gold Ambient Aura Glow
  const grad = ctx.createRadialGradient(225, 250, 20, 225, 250, 240);
  grad.addColorStop(0, 'rgba(43, 224, 133, 0.28)');
  grad.addColorStop(0.4, 'rgba(212, 175, 55, 0.18)');
  grad.addColorStop(1, 'rgba(6, 11, 9, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 450, 800);

  // 3. Double Gold Hairline Border Frame
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(16, 16, 418, 768);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
  ctx.lineWidth = 0.8;
  ctx.strokeRect(22, 22, 406, 756);

  // Corner Diamond Accents
  ctx.fillStyle = '#D4AF37';
  const drawDiamond = (x, y, s) => {
    ctx.beginPath();
    ctx.moveTo(x, y - s);
    ctx.lineTo(x + s, y);
    ctx.lineTo(x, y + s);
    ctx.lineTo(x - s, y);
    ctx.closePath();
    ctx.fill();
  };
  drawDiamond(22, 22, 5);
  drawDiamond(428, 22, 5);
  drawDiamond(22, 778, 5);
  drawDiamond(428, 778, 5);

  // 4. Header: FW JADE Brand & Heritage
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D4AF37';
  ctx.font = '700 22px Cinzel, serif';
  ctx.fillText('FW JADE', 225, 62);

  ctx.fillStyle = '#A3B19B';
  ctx.font = '500 10px Poppins, sans-serif';
  ctx.fillText('MEDAN • AUTHENTIC NATURAL GEMSTONES • EST. 2009', 225, 82);

  // Thin separator
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.beginPath();
  ctx.moveTo(120, 96);
  ctx.lineTo(330, 96);
  ctx.stroke();

  // Subtitle
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 12px Cinzel, serif';
  ctx.fillText('AURA & GUARDIAN STONE REPORT', 225, 122);

  // 5. Central Ethereal Energy Ring
  ctx.strokeStyle = 'rgba(43, 224, 133, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(225, 235, 78, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.arc(225, 235, 90, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]); // Reset dash

  // Central Element Symbol
  ctx.fillStyle = '#2BE085';
  ctx.font = '700 28px Cinzel, serif';
  ctx.fillText(element, 225, 230);

  ctx.fillStyle = '#D4AF37';
  ctx.font = '600 13px Poppins, sans-serif';
  ctx.fillText('96% AFFINITY MATCH', 225, 258);

  // User Name Banner
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 17px Poppins, sans-serif';
  ctx.fillText(userName, 225, 360);

  ctx.fillStyle = '#8E9894';
  ctx.font = '400 11px Poppins, sans-serif';
  ctx.fillText('Personalized Cosmic Vibration & Physiognomy Profile', 225, 380);

  // 6. Specification & Guardian Stone Card
  ctx.fillStyle = '#0D1A16';
  ctx.fillRect(38, 405, 374, 230);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 405, 374, 230);

  ctx.textAlign = 'left';
  
  // Row 1: Guardian Stone
  ctx.font = '500 12px Poppins, sans-serif';
  ctx.fillStyle = '#8E9894';
  ctx.fillText('Batu Penjaga:', 56, 442);
  ctx.fillStyle = '#2BE085';
  ctx.font = '700 14px Cinzel, serif';
  ctx.fillText(gem.name, 170, 442);

  // Row 2: Origin & Grade
  ctx.font = '500 12px Poppins, sans-serif';
  ctx.fillStyle = '#8E9894';
  ctx.fillText('Kualitas Mineral:', 56, 485);
  ctx.fillStyle = '#D4AF37';
  ctx.font = '600 12px Poppins, sans-serif';
  ctx.fillText('Grade A Natural (Untreated)', 170, 485);

  // Row 3: Vitality Alignment
  ctx.font = '500 12px Poppins, sans-serif';
  ctx.fillStyle = '#8E9894';
  ctx.fillText('Harmoni Energi:', 56, 528);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 12px Poppins, sans-serif';
  ctx.fillText('Stabilitas Chi & Vitalitas', 170, 528);

  // Row 4: Asal Daerah
  ctx.font = '500 12px Poppins, sans-serif';
  ctx.fillStyle = '#8E9894';
  ctx.fillText('Asal Spesimen:', 56, 571);
  ctx.fillStyle = '#A3B19B';
  ctx.font = '500 12px Poppins, sans-serif';
  ctx.fillText(gem.origin || 'Nusantara / Burma', 170, 571);

  // Row 5: Verified Authenticity
  ctx.font = '500 12px Poppins, sans-serif';
  ctx.fillStyle = '#8E9894';
  ctx.fillText('Status Keaslian:', 56, 614);
  ctx.fillStyle = '#2BE085';
  ctx.font = '600 12px Poppins, sans-serif';
  ctx.fillText('100% Batu Alam Terverifikasi', 170, 614);

  // 7. Footer: Verification & Social Watermark
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D4AF37';
  ctx.font = '600 12px Cinzel, serif';
  ctx.fillText('DISCOVER YOURS AT FWJADE.COM', 225, 685);

  ctx.fillStyle = '#8E9894';
  ctx.font = '400 10px Poppins, sans-serif';
  ctx.fillText('WhatsApp Concierge: +62 811-619-173 • Medan, Indonesia', 225, 706);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.font = '400 9px Poppins, sans-serif';
  ctx.fillText('AURA AI © 2026 FW JADE. Non-Clinical Personalization Experience.', 225, 745);

  const modal = document.getElementById('auraCardModal');
  if (modal) {
    modal.classList.add('open');
    modal.style.display = 'flex';
  }
}

function closeAuraCardModal() {
  const modal = document.getElementById('auraCardModal');
  if (modal) {
    modal.classList.remove('open');
    modal.style.display = 'none';
  }
}

function downloadAuraCard() {
  const canvas = document.getElementById('auraCardCanvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = `FWJADE-Aura-Guardian-Card-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ==========================================
// 11. DIGITAL CERTIFICATE & VIP PASS LOGIC (>2X PURCHASES UNLOCK)
// ==========================================

// Order History & VIP Tracker in localStorage
function getUserOrders() {
  try {
    const raw = localStorage.getItem('fwjade_orders');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveUserOrder(order) {
  try {
    const orders = getUserOrders();
    orders.unshift(order);
    localStorage.setItem('fwjade_orders', JSON.stringify(orders));
    return orders;
  } catch (e) {
    console.warn('Failed to save order to localStorage', e);
    return [];
  }
}

function checkUserVipStatus() {
  const orders = getUserOrders();
  const completedOrders = orders.filter(o => o.status === 'Paid / Transferred' || o.status === 'Completed');
  const count = completedOrders.length;
  // VIP Rule: Unlocked when user has purchased MORE than 2 times (> 2x, i.e. 3 or more completed purchases)
  const isVip = count > 2;
  return {
    isVip: isVip,
    count: count,
    discountPercent: isVip ? 15 : 0,
    orders: completedOrders
  };
}

function recordPurchaseAndIssueCert(gemObj) {
  const gem = gemObj || AppState.user.metrics.selectedGem || GemstoneDatabase[0];
  const orderId = 'FWJ-ORD-' + Date.now().toString(36).toUpperCase();
  const serialNo = 'FWJ-CERT-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
  
  const newOrder = {
    orderId: orderId,
    serialNo: serialNo,
    timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
    gemName: gem.name,
    species: gem.mineral_species || 'Natural Jadeite-Pyroxene Grade A',
    weight: gem.weight || '48.50 Carat • 28 x 18 x 7 mm',
    origin: gem.origin || 'Nagan Raya, Aceh, Indonesia',
    hardness: gem.mohs || '6.8 Mohs • 3.33 g/cm³',
    element: gem.element_id || 'Wood (Kayu / 木)',
    price: gem.price || 'Rp 1.850.000',
    buyerName: AppState.user.name || 'Kolektor FW JADE',
    buyerPhone: AppState.user.phone || '+62811619173',
    status: 'Paid / Transferred'
  };

  saveUserOrder(newOrder);
  return newOrder;
}

function openCertModal(customGem) {
  const gem = customGem || AppState.user.metrics.selectedGem || GemstoneDatabase[0];
  const orders = getUserOrders();
  const latestOrder = orders.find(o => o.gemName === gem.name) || orders[0];
  
  const serialNo = latestOrder ? latestOrder.serialNo : ('FWJ-CERT-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000));
  const ownerName = AppState.user.name || (latestOrder ? latestOrder.buyerName : 'Kolektor Yang Terhormat');

  // Update Certificate UI Fields specifically to the product
  const certSerialEl = document.getElementById('certSerialNo');
  if (certSerialEl) certSerialEl.textContent = serialNo;

  const certItemEl = document.getElementById('certItemName');
  if (certItemEl) certItemEl.textContent = `${gem.name} (Untreated Natural)`;

  const certSpeciesEl = document.getElementById('certSpecies');
  if (certSpeciesEl) certSpeciesEl.textContent = gem.mineral_species || 'Jadeite-Pyroxene Mineral Grade A';

  const certAuraEl = document.getElementById('certAuraScore');
  if (certAuraEl) certAuraEl.textContent = `${AppState.user.metrics.alignmentScore || 96}% (${gem.element_id || 'Wood'})`;

  const certOwnerEl = document.getElementById('certOwnerName');
  if (certOwnerEl) certOwnerEl.textContent = ownerName;

  // VIP Pass Evaluation (> 2x Completed Orders)
  const vipStatus = checkUserVipStatus();
  const vipHolderEl = document.getElementById('vipCardHolder');
  if (vipHolderEl) vipHolderEl.textContent = ownerName.toUpperCase();

  const vipBanner = document.getElementById('vipLockedBanner');
  const vipCard = document.getElementById('vipCardDisplay');
  const vipFill = document.getElementById('vipProgressFill');
  const vipLbl = document.getElementById('vipProgressLabel');
  const vipBadge = document.getElementById('vipCardBadge');
  const vipDiscount = document.getElementById('vipDiscountTier');

  if (vipStatus.isVip) {
    if (vipBanner) vipBanner.style.display = 'none';
    if (vipCard) {
      vipCard.style.opacity = '1';
      vipCard.style.filter = 'none';
    }
    if (vipBadge) vipBadge.textContent = 'IMPERIAL PATRON VIP (ACTIVE)';
    if (vipDiscount) vipDiscount.textContent = '15% OFF ALL JEWELLERY';
  } else {
    if (vipBanner) vipBanner.style.display = 'block';
    const currentCount = vipStatus.count;
    const pct = Math.min(100, Math.round((currentCount / 3) * 100));
    if (vipFill) vipFill.style.width = `${pct}%`;
    if (vipLbl) vipLbl.textContent = `Progres: ${currentCount} / 3 Pesanan Selesai (Beli > 2x untuk Unlock Diskon 15%)`;
    if (vipCard) {
      vipCard.style.opacity = '0.75';
      vipCard.style.filter = 'grayscale(0.3)';
    }
    if (vipBadge) vipBadge.textContent = 'VIP PASS (LOCKED — MEMERLUKAN > 2X ORDER)';
    if (vipDiscount) vipDiscount.textContent = 'LOCKED (15% OFF)';
  }

  document.getElementById('certModal').classList.add('open');
}

function closeCertModal() {
  document.getElementById('certModal').classList.remove('open');
}

function switchCertTab(tab) {
  const tabCert = document.getElementById('tabBtnCert');
  const tabMember = document.getElementById('tabBtnMember');
  const viewCert = document.getElementById('certViewWrap');
  const viewMember = document.getElementById('memberViewWrap');

  if (tab === 'cert') {
    tabCert.classList.add('active');
    tabMember.classList.remove('active');
    viewCert.style.display = 'block';
    viewMember.style.display = 'none';
  } else {
    tabMember.classList.add('active');
    tabCert.classList.remove('active');
    viewCert.style.display = 'none';
    viewMember.style.display = 'block';
  }
}

// ==========================================
// 12. EVENT LISTENERS
// ==========================================
function bindEventHandlers() {
  // Sleek Primary 1-Touch Control
  const btnSleekScan = document.getElementById('btnSleekScanAction');
  if (btnSleekScan) btnSleekScan.addEventListener('click', startScannerFlow);

  const btnSleekAsk = document.getElementById('btnSleekOpenSearch');
  if (btnSleekAsk) {
    btnSleekAsk.addEventListener('click', () => {
      // Toggle to explorer view and focus search input
      setUIStyle('explorer');
      setTimeout(() => {
        const input = document.getElementById('omniboxInput');
        if (input) input.focus();
      }, 300);
    });
  }

  // UI Style Switcher in Header
  const btnStyleSleek = document.getElementById('btnStyleSleek');
  const btnStyleExplorer = document.getElementById('btnStyleExplorer');
  if (btnStyleSleek) {
    btnStyleSleek.addEventListener('click', () => setUIStyle('sleek'));
  }
  if (btnStyleExplorer) {
    btnStyleExplorer.addEventListener('click', () => setUIStyle('explorer'));
  }

  // Hero Buttons (Explorer View)
  const btnScan = document.getElementById('btnHeroScanFace');
  if (btnScan) btnScan.addEventListener('click', startScannerFlow);

  const btnLucky = document.getElementById('btnHeroLuckyStone');
  if (btnLucky) btnLucky.addEventListener('click', () => {
    handleSearchQuery('Batu apa yang paling membawa hoki dan rezeki berlimpah hari ini?');
  });

  // Down Connector Arrow (starts scanning flow directly)
  const connector = document.getElementById('connector01');
  if (connector) connector.addEventListener('click', startScannerFlow);

  // Search Input & Submit
  const submitBtn = document.getElementById('searchSubmitBtn');
  if (submitBtn) submitBtn.addEventListener('click', () => {
    handleSearchQuery(document.getElementById('omniboxInput').value);
  });

  // DUAL-MODE HERO SWITCHER (Single-Focus Mode Switcher)
  const heroZone = document.getElementById('heroInteractionZone');
  const btnTriggerChat = document.getElementById('btnTriggerAuraChat');
  const btnCollapseChat = document.getElementById('btnCollapseAuraChat');
  const btnSwitchToScan = document.getElementById('btnSwitchToScan');
  const omniboxInput = document.getElementById('omniboxInput');

  function setHeroMode(mode) {
    if (!heroZone) return;
    if (mode === 'chat') {
      heroZone.classList.add('mode-chat-hero');
      if (omniboxInput) {
        setTimeout(() => omniboxInput.focus(), 150);
      }
    } else {
      heroZone.classList.remove('mode-chat-hero');
    }
  }

  if (btnTriggerChat) {
    btnTriggerChat.addEventListener('click', () => setHeroMode('chat'));
  }

  if (btnCollapseChat) {
    btnCollapseChat.addEventListener('click', (e) => {
      e.stopPropagation();
      setHeroMode('scan');
    });
  }

  if (btnSwitchToScan) {
    btnSwitchToScan.addEventListener('click', () => {
      setHeroMode('scan');
    });
  }

  if (omniboxInput) {
    omniboxInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSearchQuery(e.target.value);
      if (e.key === 'Escape') setHeroMode('scan');
    });
  }

  // Mic Button
  const micBtn = document.getElementById('voiceSearchBtn');
  if (micBtn) micBtn.addEventListener('click', toggleVoiceMic);

  // Trending Preset Chips (Click activates chat mode & executes query)
  document.querySelectorAll('.topic-chip, .topic-pill-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      setHeroMode('chat');
      if (omniboxInput) omniboxInput.value = chip.dataset.query;
      handleSearchQuery(chip.dataset.query);
    });
  });

  // Step 2 Quick Ask Input
  const step2Input = document.getElementById('step2QuickInput');
  if (step2Input) {
    step2Input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleContextualAsk(e.target.value);
        document.getElementById('secManifestation').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Scanner Actions
  const startCam = document.getElementById('startCamBtn');
  if (startCam) startCam.addEventListener('click', startWebcam);

  const simScan = document.getElementById('simulateScanBtn');
  if (simScan) simScan.addEventListener('click', simulateScan);

  // Share Actions (Gambar 3)
  const btnShareWA = document.getElementById('btnShareWA');
  if (btnShareWA) {
    btnShareWA.addEventListener('click', () => {
      const gem = AppState.user.metrics.selectedGem || GemstoneDatabase[0];
      const text = `Halo! Saya baru saja melakukan Pembacaan Aura AI di FW JADE. Elemen saya adalah ${AppState.user.metrics.dominantElement || 'WOOD'} (96% Alignment) dengan batu pelindung ${gem.name}! Coba sekarang: ${window.location.href}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  const btnDownloadCard = document.getElementById('btnDownloadCard');
  if (btnDownloadCard) {
    btnDownloadCard.addEventListener('click', () => {
      generateLuxuryAuraCard();
    });
  }

  // Collapsible Insight
  const toggleInsight = document.getElementById('btnToggleDetailInsight');
  if (toggleInsight) toggleInsight.addEventListener('click', toggleCollapsibleInsight);

  // Manifestation Direct WA
  const btnManifestWA = document.getElementById('btnManifestBuyWA');
  if (btnManifestWA) btnManifestWA.addEventListener('click', () => {
    const gem = AppState.user.metrics.selectedGem || GemstoneDatabase[0];
    const waUrl = `https://wa.me/62811619173?text=${encodeURIComponent(`Halo FW JADE Medan, saya ingin memesan batu manifestasi: ${gem.name}. Mohon info ketersediaan & pengiriman.`)}`;
    window.open(waUrl, '_blank');
  });

  // Level 3 Contextual Ask Drawer
  const btnSendContext = document.getElementById('btnSendContextQuery');
  if (btnSendContext) btnSendContext.addEventListener('click', () => handleContextualAsk());

  const contextInput = document.getElementById('contextualInput');
  if (contextInput) contextInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleContextualAsk();
  });

  document.querySelectorAll('.c-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      handleContextualAsk(chip.dataset.q);
    });
  });

  // Export Buttons (PDF, HTML, Story 9:16, Reset)
  const btnPdf = document.getElementById('btnExportPDF');
  if (btnPdf) btnPdf.addEventListener('click', exportToPDF);

  const btnHtml = document.getElementById('btnExportHTML');
  if (btnHtml) btnHtml.addEventListener('click', exportToHTML);

  const auraCardTile = document.getElementById('btnTileAuraCard');
  if (auraCardTile) auraCardTile.addEventListener('click', generateLuxuryAuraCard);

  const resetTile = document.getElementById('btnTileResetSearch');
  if (resetTile) resetTile.addEventListener('click', () => {
    document.getElementById('secScanner').style.display = 'none';
    document.getElementById('secAuraResults').style.display = 'none';
    document.getElementById('secGemstone').style.display = 'none';
    document.getElementById('secManifestation').style.display = 'none';
    document.getElementById('secActions').style.display = 'none';
    const heroZone = document.getElementById('heroInteractionZone');
    if (heroZone) heroZone.classList.remove('mode-chat-hero');
    document.getElementById('omniboxInput').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Paywall Modal Buttons
  const closePay = document.getElementById('closeMidtransBtn');
  if (closePay) closePay.addEventListener('click', closePayModal);

  const simPay = document.getElementById('btnSimulatePaymentSuccess');
  if (simPay) simPay.addEventListener('click', simulatePaymentSuccess);

  // Aura Card Modal
  const closeAura = document.getElementById('closeAuraCardBtn');
  if (closeAura) closeAura.addEventListener('click', closeAuraCardModal);

  const auraModal = document.getElementById('auraCardModal');
  if (auraModal) {
    const backdrop = auraModal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeAuraCardModal);
  }

  const dlCard = document.getElementById('btnDownloadCard');
  if (dlCard) dlCard.addEventListener('click', downloadAuraCard);

  const shareWA = document.getElementById('btnShareWA');
  if (shareWA) shareWA.addEventListener('click', () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Lihat hasil pembacaan Aura Wajah & Batu Keberuntungan saya di AURA AI by FW JADE: https://fwjade.com')}`, '_blank');
  });

  // Certificate Modal Buttons
  const openCertBtn = document.getElementById('openCertModalBtn');
  if (openCertBtn) openCertBtn.addEventListener('click', openCertModal);

  const closeCertBtn = document.getElementById('closeCertModalBtn');
  if (closeCertBtn) closeCertBtn.addEventListener('click', closeCertModal);

  const tabCert = document.getElementById('tabBtnCert');
  if (tabCert) tabCert.addEventListener('click', () => switchCertTab('cert'));

  const tabMember = document.getElementById('tabBtnMember');
  if (tabMember) tabMember.addEventListener('click', () => switchCertTab('member'));

  const btnDownloadCert = document.getElementById('btnDownloadCertDoc');
  if (btnDownloadCert) btnDownloadCert.addEventListener('click', exportToPDF);

  const btnShareCertWA = document.getElementById('btnShareCertWA');
  if (btnShareCertWA) btnShareCertWA.addEventListener('click', () => {
    const gem = AppState.user.metrics.selectedGem || GemstoneDatabase[0];
    const waUrl = `https://wa.me/62811619173?text=${encodeURIComponent(`Halo Kurator FW JADE Medan, ini nomor sertifikat digital saya: FWJ-CERT-2026-9988 untuk produk ${gem.name}. Mohon verifikasi & pendaftaran garansi.`)}`;
    window.open(waUrl, '_blank');
  });

  // Tutorial Modal
  const openTut = document.getElementById('openTutorialBtn');
  if (openTut) openTut.addEventListener('click', () => {
    document.getElementById('tutorialModal').classList.add('open');
  });
  const closeTut = document.getElementById('closeTutorialBtn');
  if (closeTut) closeTut.addEventListener('click', () => {
    document.getElementById('tutorialModal').classList.remove('open');
  });

  // Language Switcher
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) langBtn.addEventListener('click', () => {
    AppState.lang = AppState.lang === 'id' ? 'en' : 'id';
    document.getElementById('langLabel').textContent = AppState.lang.toUpperCase();
  });

  // Auth / Gated Revelation Flow
  const closeAuthBtn = document.getElementById('closeAuthBtn');
  if (closeAuthBtn) closeAuthBtn.addEventListener('click', () => {
    document.getElementById('authModal').classList.remove('open');
    // If they cancel auth, we can just reset to home or show a fallback
    document.getElementById('omniboxInput').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const btnAuthGoogle = document.getElementById('btnAuthGoogle');
  if (btnAuthGoogle) btnAuthGoogle.addEventListener('click', () => {
    // Try real GIS prompt first, then fall back to simulateLogin
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt();
    } else {
      simulateLogin('Google');
    }
  });

  const btnAuthEmail = document.getElementById('btnAuthEmail');
  if (btnAuthEmail) btnAuthEmail.addEventListener('click', () => simulateLogin('Email'));

  // History Dashboard
  const openHistoryBtn = document.getElementById('openHistoryBtn');
  if (openHistoryBtn) openHistoryBtn.addEventListener('click', openHistoryDashboard);
  
  const closeHistoryBtn = document.getElementById('closeHistoryBtn');
  if (closeHistoryBtn) closeHistoryBtn.addEventListener('click', () => {
    document.getElementById('historyModal').classList.remove('open');
  });
}

// ==========================================
// 13. AUTH & HISTORY SYSTEM MOCK
// ==========================================
function simulateLogin(provider) {
  AppState.user.isRegistered = true;
  document.getElementById('authModal').classList.remove('open');
  
  // Persist basic session to localStorage (non-Google login)
  if (!AppState.user.isGoogleAuth) {
    const displayName = AppState.user.name || 'Kolektor AURA AI';
    try {
      localStorage.setItem('fw_jade_user', JSON.stringify({
        name: displayName,
        email: AppState.user.email || null,
        picture: null,
        isGoogleAuth: false,
        isRegistered: true,
        savedAt: Date.now()
      }));
    } catch (e) {}
    updateUserProfileUI();
  }
  
  // Simulate saving to DB
  saveReadingToDatabase(AppState.tempReading);
  
  // Resume the flow
  revealFullResults(AppState.tempReading);
}

function saveReadingToDatabase(gemObj) {
  // Simulate Supabase INSERT into `aura_history`
  const newEntry = {
    id: 'id-' + Date.now(),
    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    element: gemObj.element_id,
    gemName: gemObj.name,
    hasPurchased: Math.random() > 0.7 // Randomly assign VIP badge for demo purposes
  };
  mockHistoryDB.unshift(newEntry);
}

function openHistoryDashboard() {
  const container = document.getElementById('historyListContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (mockHistoryDB.length === 0) {
    container.innerHTML = `
      <div class="history-empty-state">
        <i class="fa-solid fa-ghost"></i>
        <p>Belum ada jejak spiritual. Pindai aura Anda sekarang.</p>
      </div>
    `;
  } else {
    mockHistoryDB.forEach(entry => {
      const vipBadge = entry.hasPurchased 
        ? `<div class="history-badge-vip"><i class="fa-solid fa-crown"></i> Crystallized</div>` 
        : '';
        
      const card = document.createElement('div');
      card.className = 'history-card';
      card.innerHTML = `
        <div class="history-info-col">
          <span class="history-date">${entry.date}</span>
          <span class="history-aura">Aura ${entry.element} • ${entry.gemName}</span>
          ${vipBadge}
        </div>
        <button class="btn-view-history" onclick="alert('Membuka detail riwayat ${entry.id} (Simulasi Supabase Fetch)')">
          Lihat <i class="fa-solid fa-arrow-right"></i>
        </button>
      `;
      container.appendChild(card);
    });
  }
  
  document.getElementById('historyModal').classList.add('open');
}

// ==========================================
// 12. PROGRESSIVE WEB APP (PWA) & VIP INSTALL
// ==========================================
let deferredPrompt;

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.update();
      console.log('AURORA SW Registered & Updated:', reg.scope);
    }).catch(err => {
      console.log('AURORA SW Reg failed:', err);
    });
  });
}

// Intercept Install Prompt
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show our custom VIP Install Modal after 3 seconds of engagement
  setTimeout(() => {
    const pwaModal = document.getElementById('pwaInstallModal');
    if(pwaModal) {
      pwaModal.style.display = 'flex';
      // Slight delay to allow display:flex to apply before adding class for transition
      setTimeout(() => pwaModal.classList.add('open'), 10);
    }
  }, 3000);
});

// Bind PWA Modal Buttons
document.addEventListener('DOMContentLoaded', () => {
  const btnInstallPwa = document.getElementById('btnInstallPwa');
  const btnCancelPwa = document.getElementById('btnCancelPwa');
  const pwaModal = document.getElementById('pwaInstallModal');
  const pwaBackdrop = document.getElementById('pwaBackdrop');

  const closePwaModal = () => {
    pwaModal.classList.remove('open');
    setTimeout(() => pwaModal.style.display = 'none', 300);
  };

  if(btnInstallPwa) {
    btnInstallPwa.addEventListener('click', async () => {
      closePwaModal();
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to VIP install prompt: ${outcome}`);
        deferredPrompt = null;
      }
    });
  }

  if(btnCancelPwa) {
    btnCancelPwa.addEventListener('click', closePwaModal);
  }

  if(pwaBackdrop) {
    pwaBackdrop.addEventListener('click', closePwaModal);
  }
});

// ==========================================
// 14. DUAL MODE ENGINE — Oracle & Sage
// ==========================================

const DUAL_MODE = {
  ORACLE: 'oracle',
  SAGE: 'sage'
};

const ORACLE_RESPONSES = {
  id: `Mereka yang membiarkan semesta berbicara terlebih dahulu memiliki intuisi elemen yang kuat dan jiwa yang terbuka. Master Aura akan membaca aura wajah Anda sekarang...`,
  en: `Those who let the universe speak first carry a powerful elemental intuition and an open soul. Aurora will now read your facial aura...`
};

const SAGE_RESPONSES = {
  id: `Pikiran yang jernih dan terarah adalah tanda elemen yang seimbang. Apa yang ingin Anda ketahui dari Master Aura hari ini?`,
  en: `A clear and purposeful mind is the mark of balanced elements. What would you like to know from Aurora today?`
};

/**
 * Inisialisasi sistem dual mode.
 * Jika first-time, tampilkan onboarding splash.
 * Jika returning, langsung terapkan mode tersimpan.
 */
function initDualMode() {
  const savedMode = localStorage.getItem('aurora_mode') || DUAL_MODE.ORACLE;
  const hasChosen = localStorage.getItem('aurora_mode_chosen');

  // Apply saved/default mode immediately (no transition on initial load)
  applyMode(savedMode, false);

  if (!hasChosen) {
    // First-time user: show onboarding after brief delay
    setTimeout(showOnboardingModal, 800);
  }
}

/**
 * Menerapkan mode ke body element dan update nav toggle state.
 * @param {string} mode - 'oracle' atau 'sage'
 * @param {boolean} animate - apakah gunakan crossfade transition
 */
function applyMode(mode, animate = true) {
  const body = document.body;
  const oracleBtn = document.getElementById('btnModeOracle');
  const sageBtn = document.getElementById('btnModeSage');

  if (animate) {
    body.classList.add('mode-transitioning');
    setTimeout(() => body.classList.remove('mode-transitioning'), 460);
  }

  // Remove all mode classes
  body.classList.remove('mode-oracle', 'mode-sage');

  // Apply new mode
  if (mode === DUAL_MODE.SAGE) {
    body.classList.add('mode-sage');
    if (oracleBtn) oracleBtn.classList.remove('active');
    if (sageBtn) sageBtn.classList.add('active');
    // Update placeholder text for Sage mode
    const omnibox = document.getElementById('omniboxInput');
    if (omnibox) omnibox.placeholder = 'Tanyakan apa saja tentang batu, aura, rezeki, atau feng shui...';
  } else {
    body.classList.add('mode-oracle');
    if (oracleBtn) oracleBtn.classList.add('active');
    if (sageBtn) sageBtn.classList.remove('active');
    // Oracle mode placeholder
    const omnibox = document.getElementById('omniboxInput');
    if (omnibox) omnibox.placeholder = 'Atau tanyakan sesuatu kepada Master Aura...';
  }

  // Persist to localStorage
  localStorage.setItem('aurora_mode', mode);
  AppState.currentMode = mode;
}

/**
 * Switch mode dengan Aurora toast response.
 * @param {string} newMode
 * @param {string} toastText - pesan dari Aurora
 */
function switchMode(newMode, toastText) {
  applyMode(newMode, true);
  if (toastText) {
    showAuroraToast(toastText, newMode);
  }
}

/**
 * Tampilkan onboarding modal pertama kali.
 */
function showOnboardingModal() {
  const modal = document.getElementById('onboardingModal');
  if (!modal) return;
  modal.classList.add('open');
}

/**
 * Tutup onboarding modal.
 */
function closeOnboardingModal() {
  const modal = document.getElementById('onboardingModal');
  if (modal) modal.classList.remove('open');
  localStorage.setItem('aurora_mode_chosen', 'true');
}

/**
 * Tampilkan Aurora toast notification.
 * @param {string} msg - pesan dari Aurora (italic, mistis)
 * @param {string} mode - 'oracle' atau 'sage' untuk warna toast
 */
function showAuroraToast(msg, mode = 'oracle') {
  const toast = document.getElementById('auroraModeToast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;

  // Update toast color style
  toast.classList.remove('sage-toast', 'oracle-toast');
  if (mode === DUAL_MODE.SAGE) toast.classList.add('sage-toast');

  // Show toast
  toast.classList.add('show');

  // Auto-hide after 5 seconds
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

/**
 * Terapkan element-adaptive theming post-scan.
 * Dipanggil dari revealFullResults() setelah elemen diketahui.
 * @param {string} elementName - nama elemen (WOOD, FIRE, WATER, EARTH, METAL)
 */
function applyElementTheme(elementName) {
  const body = document.body;
  // Remove all existing element classes
  body.classList.remove('element-wood', 'element-fire', 'element-water', 'element-earth', 'element-metal');

  const elementMap = {
    'WOOD': 'element-wood',
    'FIRE': 'element-fire',
    'WATER': 'element-water',
    'EARTH': 'element-earth',
    'METAL': 'element-metal',
    'KAYU': 'element-wood',
    'API': 'element-fire',
    'AIR': 'element-water',
    'TANAH': 'element-earth',
    'LOGAM': 'element-metal'
  };

  const upperEl = (elementName || '').toUpperCase();
  const matchedKey = Object.keys(elementMap).find(k => upperEl.includes(k));
  if (matchedKey) {
    body.classList.add(elementMap[matchedKey]);
  }
}

/**
 * Update Curiosity Hook teks berdasarkan batu yang ditemukan.
 * @param {Object} gemObj - object batu dari GemstoneDatabase
 */
function updateCuriosityHook(gemObj) {
  const headline = document.getElementById('txtCuriosityHeadline');
  const sub = document.getElementById('txtCuriositySub');

  if (headline && gemObj) {
    headline.textContent = `Mengapa ${gemObj.name} dipilih khusus untuk Anda?`;
  }
  if (sub && gemObj) {
    sub.textContent = `Master Aura telah membaca elemen ${gemObj.element_id || 'Anda'} dan menemukan resonansi terkuat dengan batu ini.`;
  }
}

// ── Bind Dual Mode Event Handlers ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // Nav Mode Toggle Buttons
  const btnModeOracle = document.getElementById('btnModeOracle');
  const btnModeSage = document.getElementById('btnModeSage');

  if (btnModeOracle) {
    btnModeOracle.addEventListener('click', () => {
      if (document.body.classList.contains('mode-oracle')) return; // already active
      const msg = AppState.lang === 'en'
        ? '🔮 Oracle Mode — Let Master Aura read your face and aura first.'
        : '🔮 Oracle Mode — Biarkan Master Aura membaca wajah dan aura Anda terlebih dahulu.';
      switchMode(DUAL_MODE.ORACLE, msg);
    });
  }

  if (btnModeSage) {
    btnModeSage.addEventListener('click', () => {
      if (document.body.classList.contains('mode-sage')) return; // already active
      const msg = AppState.lang === 'en'
        ? '💎 Sage Mode — Ask Master Aura anything. Direct and clear.'
        : '💎 Sage Mode — Tanyakan apa saja kepada Master Aura. Langsung dan jelas.';
      switchMode(DUAL_MODE.SAGE, msg);
    });
  }

  // Onboarding Modal — Oracle Choice
  const btnChooseOracle = document.getElementById('btnChooseOracle');
  if (btnChooseOracle) {
    btnChooseOracle.addEventListener('click', () => {
      closeOnboardingModal();
      applyMode(DUAL_MODE.ORACLE, false);
      const response = AppState.lang === 'en' ? ORACLE_RESPONSES.en : ORACLE_RESPONSES.id;
      setTimeout(() => showAuroraToast('🔮 ' + response, DUAL_MODE.ORACLE), 300);
    });
  }

  // Onboarding Modal — Sage Choice
  const btnChooseSage = document.getElementById('btnChooseSage');
  if (btnChooseSage) {
    btnChooseSage.addEventListener('click', () => {
      closeOnboardingModal();
      applyMode(DUAL_MODE.SAGE, false);
      const response = AppState.lang === 'en' ? SAGE_RESPONSES.en : SAGE_RESPONSES.id;
      setTimeout(() => showAuroraToast('💎 ' + response, DUAL_MODE.SAGE), 300);
    });
  }

  // Onboarding Skip
  const btnOnboardingSkip = document.getElementById('btnOnboardingSkip');
  if (btnOnboardingSkip) {
    btnOnboardingSkip.addEventListener('click', () => {
      closeOnboardingModal();
      // Keep Oracle as default silently
    });
  }

  // Onboarding backdrop click to dismiss
  const onboardingBackdrop = document.getElementById('onboardingBackdrop');
  if (onboardingBackdrop) {
    onboardingBackdrop.addEventListener('click', () => {
      closeOnboardingModal();
    });
  }
});


// ==========================================================================
// 16. DUAL UI STYLES CONTROLLER (✦ SLEEK UTAMA vs ◇ EXPLORER SEKUNDER)
// ==========================================================================

/**
 * Switch between Sleek Minimalist (Primary) and Explorer Dual Cards (Secondary)
 * @param {'sleek' | 'explorer'} style
 */
function setUIStyle(style) {
  const isExplorer = style === 'explorer';
  const body = document.body;

  if (isExplorer) {
    body.classList.add('style-explorer');
  } else {
    body.classList.remove('style-explorer');
  }

  // Update navbar switch buttons
  const btnSleek = document.getElementById('btnStyleSleek');
  const btnExplorer = document.getElementById('btnStyleExplorer');

  if (btnSleek) btnSleek.classList.toggle('active', !isExplorer);
  if (btnExplorer) btnExplorer.classList.toggle('active', isExplorer);

  localStorage.setItem('aurora_ui_style', isExplorer ? 'explorer' : 'sleek');
}

// ==========================================================================
// 17. FITUR 1: MIAN XIANG 12 PALACES CONTROLLER
// ==========================================================================
const MIAN_XIANG_DATA = {
  career: {
    title: 'Istana Karier & Kebijaksanaan (Guan Lu)',
    score: '94%',
    desc: 'Pancaran dahi Anda menunjukkan fokus strategis dan intuisi kepemimpinan yang sedang mencapai puncaknya. Membutuhkan batu berstruktur kristal padat untuk menjaga kejernihan keputusan.',
    gem: 'Natural Aceh Jadeite (Grade A)'
  },
  wealth: {
    title: 'Istana Rezeki & Kemakmuran (Dun Tai)',
    score: '96%',
    desc: 'Pangkal dan cuping hidung memancarkan chi kemakmuran yang sangat terbuka. Sangat selaras dengan batu giok hijau lumut atau citrine untuk mengunci magnet rezeki.',
    gem: 'Citrine Money Aura & Jadeite'
  },
  vitality: {
    title: 'Istana Vitalitas & Chi (Qi & Pipi)',
    score: '91%',
    desc: 'Rona sirkulasi di area mata dan pipi menunjukkan kepekaan spiritual tinggi dengan sedikit kelelahan fisik. Memerlukan energi dingin menenangkan untuk detoksifikasi energi.',
    gem: 'Black Jade Aceh (Detoks Dingin)'
  },
  harmony: {
    title: 'Istana Harmoni & Proteksi (Di Ge / Dagu)',
    score: '89%',
    desc: 'Garis rahang dan dagu menunjukkan stabilitas pendirian yang kokoh dan perisai alami terhadap gangguan chi luar yang tidak selaras.',
    gem: 'Imperial Green Jadeite Bangle'
  }
};

function initMianXiangPalaces() {
  const nodes = document.querySelectorAll('.mx-hotspot-node');
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const palaceKey = node.dataset.palace;
      const data = MIAN_XIANG_DATA[palaceKey];
      if (!data) return;

      const titleEl = document.getElementById('mxPalaceTitle');
      const scoreEl = document.getElementById('mxPalaceScore');
      const descEl = document.getElementById('mxPalaceDesc');
      const gemEl = document.getElementById('mxPalaceGem');

      if (titleEl) titleEl.textContent = data.title;
      if (scoreEl) scoreEl.textContent = data.score;
      if (descEl) descEl.textContent = data.desc;
      if (gemEl) gemEl.textContent = data.gem;
    });
  });
}


// ==========================================================================
// 18. FITUR 2: VIRTUAL AR JEWELRY MIRROR CONTROLLER
// ==========================================================================
let arMediaStream = null;

function openArMirror() {
  const modal = document.getElementById('arJewelryModal');
  if (modal) modal.style.display = 'flex';

  const video = document.getElementById('arVideoElement');
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && video) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => {
        arMediaStream = stream;
        video.srcObject = stream;
      })
      .catch(err => {
        console.warn('AR Video access fallback:', err);
      });
  }
}

function closeArMirror() {
  const modal = document.getElementById('arJewelryModal');
  if (modal) modal.style.display = 'none';

  if (arMediaStream) {
    arMediaStream.getTracks().forEach(track => track.stop());
    arMediaStream = null;
  }
}

function initArJewelryMirror() {
  const btnStep3 = document.getElementById('btnOpenArMirrorStep3');
  const btnStep5 = document.getElementById('btnOpenArMirrorStep5');
  if (btnStep3) btnStep3.addEventListener('click', openArMirror);
  if (btnStep5) btnStep5.addEventListener('click', openArMirror);

  const closeBtn = document.getElementById('closeArMirrorBtn');
  const backdrop = document.getElementById('arModalBackdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeArMirror);
  if (backdrop) backdrop.addEventListener('click', closeArMirror);

  // Model chips switching
  const chips = document.querySelectorAll('.ar-model-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const model = chip.dataset.model;
      const title = chip.dataset.title;
      const price = chip.dataset.price;

      const titleEl = document.getElementById('arItemTitle');
      const priceEl = document.getElementById('arItemPrice');
      const gemGraphic = document.getElementById('arGemGraphic');
      const waBtn = document.getElementById('btnArOrderWA');

      if (titleEl) titleEl.textContent = title;
      if (priceEl) priceEl.textContent = price;

      if (gemGraphic) {
        gemGraphic.className = `ar-gem-graphic gem-style-${model}`;
      }

      if (waBtn) {
        waBtn.href = `https://wa.me/62811619173?text=${encodeURIComponent(`Halo FW JADE Medan, saya tertarik dengan model perhiasan dari Virtual AR Mirror: ${title} (${price}). Mohon info pemesanan.`)}`;
      }
    });
  });

  // Snapshot photo simulation
  const snapshotBtn = document.getElementById('btnArSnapshot');
  if (snapshotBtn) {
    snapshotBtn.addEventListener('click', () => {
      alert('✨ Tampilan AR Look Anda telah disimpan! Anda dapat membagikannya atau memesan langsung ke kurator.');
    });
  }
}


// ==========================================================================
// 19. FITUR 4: DAILY CHI ALMANAC & BATU KEBERUNTUNGAN HARI INI
// ==========================================================================
const DAILY_COSMIC_DATA = [
  // 0: MINGGU (Sunday / Sun / Matahari)
  {
    dayName: 'Minggu',
    planet: 'Matahari (Sun / 太阳)',
    elementTitle: 'Hari Matahari (Sun) • Elemen Api Surya & Emas Murni',
    elementSub: 'Pancaran energi kosmik hari ini memancarkan puncak vitalitas, wibawa kepemimpinan, dan kelancaran membuka pintu rezeki baru.',
    stoneName: 'Natural Aceh Jadeite (Pucuk Lumut)',
    stoneIcon: 'fa-gem',
    stoneDesc: 'Pancaran kisi kristal silikat memancarkan Far Infrared 9.35 µm yang selaras dengan medan bio-elektrik jantung, memperkuat aura kepemimpinan dan magnet kemakmuran.',
    stonePerks: 'Puncak FIR 9.35 µm • Magnet Karisma & Vitalitas',
    goldenHours: '08.30 – 11.00 & 15.30 – 18.00 WIB',
    goldenHoursSub: 'Puncak resonansi energi kosmik untuk negosiasi bisnis, closing transaksi bernilai tinggi, dan penyusunan strategi jangka panjang.',
    directionColor: 'Tenggara & Selatan • Emas Berkilau & Hijau Zamrud',
    chiGuide: 'Minum air mineral berenergi di pagi hari, hadap arah Tenggara, dan kenakan liontin giok alami di dekat cakra dada.'
  },
  // 1: SENIN (Monday / Moon / Bulan)
  {
    dayName: 'Senin',
    planet: 'Bulan (Moon / 太阴)',
    elementTitle: 'Hari Bulan (Moon) • Elemen Air Murni & Kayu Teduh',
    elementSub: 'Energi yin Bulan yang menyejukkan menyeimbangkan emosi, meredakan ketegangan sistem saraf, dan menumbuhkan daya pikat relasi bisnis yang harmonis.',
    stoneName: 'Imperial Burma Jade (Jadeite Grade A)',
    stoneIcon: 'fa-gem',
    stoneDesc: 'Resonansi giok alami menstabilkan gelombang otak delta dan mempercepat regenerasi Chi seluler setelah beraktivitas padat.',
    stonePerks: 'Zeta Potential Aktif • Relaksasi Mental & Harmoni',
    goldenHours: '09.00 – 11.30 & 19.30 – 21.30 WIB',
    goldenHoursSub: 'Waktu terbaik untuk diplomasi personal, penandatanganan kesepakatan kerjasama, dan komunikasi batin.',
    directionColor: 'Utara & Timur • Hijau Giok Cerah & Putih Mutiara',
    chiGuide: 'Kenakan gelang giok di pergelangan tangan kiri untuk menyerap energi pendinginan chi dan menjaga stabilitas detak nadi.'
  },
  // 2: SELASA (Tuesday / Mars / Api)
  {
    dayName: 'Selasa',
    planet: 'Mars (Fire / 火星)',
    elementTitle: 'Hari Mars (Fire) • Elemen Api Bergelora & Karisma Batin',
    elementSub: 'Resonansi gelombang elektromagnetik memacu keberanian mengambil keputusan besar, menepis keraguan, dan mengunci peluang keuntungan baru.',
    stoneName: 'Kecubung Lavender & Natural Ruby Fire',
    stoneIcon: 'fa-fire',
    stoneDesc: 'Pancaran frekuensi kristal ungu dan merah mengaktifkan cakra mahkota dan cakra dasar, mempertajam intuisi diplomasi di saat genting.',
    stonePerks: 'Peningkatan Oksigenasi Darah • Wibawa Eksekutif',
    goldenHours: '08.00 – 10.30 & 14.00 – 16.30 WIB',
    goldenHoursSub: 'Waktu paling efektif untuk presentasi ekspansi pasar, negosiasi alot, dan memimpin rapat penting.',
    directionColor: 'Selatan • Merah Delima & Ungu Royal',
    chiGuide: 'Bermeditasi 5 menit menghadap Selatan dengan memegang kristal alami untuk menyelaraskan chi keberanian.'
  },
  // 3: RABU (Wednesday / Mercury / Air & Logam)
  {
    dayName: 'Rabu',
    planet: 'Merkurius (Mercury / 水星)',
    elementTitle: 'Hari Merkurius (Mercury) • Elemen Air Cerdas & Logam Pelindung',
    elementSub: 'Aliran energi Merkurius memperlancar komunikasi dagang, ketajaman hitungan finansial, dan menangkal radiasi elektromagnetik perangkat kerja.',
    stoneName: 'Black Jade Aceh (Armor Giok Hitam)',
    stoneIcon: 'fa-shield-halved',
    stoneDesc: 'Pancaran ion negatif dan gelombang FIR giok hitam menembus jaringan mikrosirkulasi kapiler hingga 4 cm, mengikis toksin darah dan menjadi perisai tolak bala.',
    stonePerks: 'Detoksifikasi Darah • Perisai Anti Radiasi & Chi Negatif',
    goldenHours: '10.00 – 12.00 & 16.00 – 18.00 WIB',
    goldenHoursSub: 'Saat ideal untuk transaksi perdagangan, audit keuangan, dan komunikasi intensif lintas wilayah.',
    directionColor: 'Utara & Barat Laut • Hitam Mengkilap & Perak Emas',
    chiGuide: 'Kenakan cincin atau liontin Black Jade di sisi tubuh sebelah kiri saat bekerja di depan layar monitor.'
  },
  // 4: KAMIS (Thursday / Jupiter / Kayu Agung)
  {
    dayName: 'Kamis',
    planet: 'Yupiter (Jupiter / 木星)',
    elementTitle: 'Hari Yupiter (Jupiter) • Elemen Kayu Raksasa & Pertumbuhan Rezeki',
    elementSub: 'Siklus Kayu Agung melambangkan pertumbuhan tanpa batas, perluasan jaringan koneksi, serta keberuntungan mendatangkan mentor dan mitra berbobot.',
    stoneName: 'Imperial Jade Bangle (Gelang Giok Burma)',
    stoneIcon: 'fa-circle-notch',
    stoneDesc: 'Kekayaan struktur silikat Grade A memancarkan vibrasi kemakmuran yang memperbesar wadah rezeki dan menjauhkan konflik energi.',
    stonePerks: 'Siklus Wu Xing Pertumbuhan • Magnet Sahabat & Investor',
    goldenHours: '07.30 – 10.00 & 13.30 – 15.30 WIB',
    goldenHoursSub: 'Waktu pembuka rezeki besar untuk meluncurkan produk, membuka cabang baru, dan menjalin aliansi strategis.',
    directionColor: 'Timur & Tenggara • Hijau Lumut & Toska Dalam',
    chiGuide: 'Kenakan perhiasan giok sambil menikmati udara pagi menghadap Timur untuk menyerap chi pertumbuhan.'
  },
  // 5: JUMAT (Friday / Venus / Logam & Emas)
  {
    dayName: 'Jumat',
    planet: 'Venus (Venus / 金星)',
    elementTitle: 'Hari Venus (Venus) • Elemen Logam Mulia & Emas Rezeki',
    elementSub: 'Frekuensi getaran mineral silikat kuning merangsang cakra solar plexus, menjadi magnet penarik aliran uang tunai cepat, kelancaran piutang, dan kemakmuran dagang.',
    stoneName: 'Natural Golden Citrine & Giok Kuning Imperial',
    stoneIcon: 'fa-coins',
    stoneDesc: 'Kristal kuarsa emas menstimulasi vibrasi magnetik rezeki, menarik pembeli loyal, dan mengalirkan kelimpahan kas harian.',
    stonePerks: 'Resonansi Solar Plexus • Magnet Arus Kas & Closing Cepat',
    goldenHours: '09.00 – 11.30 & 15.00 – 17.30 WIB',
    goldenHoursSub: 'Waktu emas penguncian transaksi dagang, pelunasan pembayaran, dan belanja aset berharga.',
    directionColor: 'Barat & Barat Daya • Kuning Emas & Jingga Kristal',
    chiGuide: 'Letakkan batu citrine atau giok kuning di dekat dompet atau meja kasir untuk memancarkan aura kelimpahan.'
  },
  // 6: SABTU (Saturday / Saturnus / Tanah Pengunci)
  {
    dayName: 'Sabtu',
    planet: 'Saturnus (Saturn / 土星)',
    elementTitle: 'Hari Saturnus (Saturn) • Elemen Tanah Gunung & Pengunci Harta',
    elementSub: 'Elemen Tanah melambangkan pondasi kokoh yang mengunci aset, mencegah pemborosan rezeki yang bocor, dan menjaga stabilitas keharmonisan keluarga.',
    stoneName: 'Cat\'s Eye Jadeite & Nephrite Jade',
    stoneIcon: 'fa-eye',
    stoneDesc: 'Fenomena optik chatoyancy pada giok alami memantulkan getaran pelindung aset, menstabilkan fondasi rumah tangga dan bisnis.',
    stonePerks: 'Pengunci Aset Abadi • Stabilitas Chi & Perlindungan Rumah',
    goldenHours: '08.00 – 10.30 & 16.30 – 19.00 WIB',
    goldenHoursSub: 'Waktu terbaik untuk evaluasi portofolio investasi, perencanaan masa depan, dan quality time bersama keluarga.',
    directionColor: 'Pusat & Barat Daya • Cokelat Karamel, Kuning Tua & Hijau Tua',
    chiGuide: 'Lakukan refleksi tenang sore hari sambil menyentuh tekstur halus giok alami untuk grounding energi.'
  }
];

function getLunarPhaseData(date = new Date()) {
  // Known new moon reference: Jan 11, 2024
  const refNewMoon = new Date('2024-01-11T11:57:00Z');
  const synodicMonth = 29.53058867;
  const daysDiff = (date.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const lunarAge = ((daysDiff % synodicMonth) + synodicMonth) % synodicMonth;
  
  if (lunarAge < 1.845) {
    return { name: 'Bulan Baru (New Moon)', phaseText: 'Fase Bulan Baru • Inisiasi Chi & Penanaman Hajat', icon: 'fa-circle' };
  } else if (lunarAge < 5.536) {
    return { name: 'Bulan Sabit Muda (Waxing Crescent)', phaseText: 'Sabit Muda • Pertumbuhan Energi & Peluang Baru', icon: 'fa-moon' };
  } else if (lunarAge < 9.228) {
    return { name: 'Kuartal Pertama (First Quarter)', phaseText: 'Kuartal Pertama • Momentum Aksi & Keberanian', icon: 'fa-adjust' };
  } else if (lunarAge < 12.919) {
    return { name: 'Bulan Cembung (Waxing Gibbous)', phaseText: 'Bulan Cembung • Pematangan Rencana & Magnet Harta', icon: 'fa-circle' };
  } else if (lunarAge < 16.610) {
    return { name: 'Bulan Purnama (Full Moon)', phaseText: 'Purnama Agung • Puncak Energi Metafisika & Intuisi', icon: 'fa-circle' };
  } else if (lunarAge < 20.302) {
    return { name: 'Bulan Susut (Waning Gibbous)', phaseText: 'Bulan Susut • Evaluasi Hasil & Penguncian Laba', icon: 'fa-circle' };
  } else if (lunarAge < 23.993) {
    return { name: 'Kuartal Terakhir (Last Quarter)', phaseText: 'Kuartal Akhir • Pelepasan Beban & Harmoni Batin', icon: 'fa-adjust' };
  } else {
    return { name: 'Bulan Sabit Tua (Waning Crescent)', phaseText: 'Sabit Tua • Relaksasi, Pembersihan & Detoks Chi', icon: 'fa-moon' };
  }
}

function checkIsGoldenHourActive(dayIdx, currentHour, currentMinute) {
  const currentTotalMin = currentHour * 60 + currentMinute;
  const ranges = [
    [[8*60+30, 11*60], [15*60+30, 18*60]], // 0: Sun
    [[9*60, 11*60+30], [19*60+30, 21*60+30]], // 1: Mon
    [[8*60, 10*60+30], [14*60, 16*60+30]], // 2: Tue
    [[10*60, 12*60], [16*60, 18*60]], // 3: Wed
    [[7*60+30, 10*60], [13*60+30, 15*60+30]], // 4: Thu
    [[9*60, 11*60+30], [15*60, 17*60+30]], // 5: Fri
    [[8*60, 10*60+30], [16*60+30, 19*60]], // 6: Sat
  ];
  const todayRanges = ranges[dayIdx] || [];
  for (const [start, end] of todayRanges) {
    if (currentTotalMin >= start && currentTotalMin <= end) {
      return true;
    }
  }
  return false;
}

function getTodayCosmicData() {
  const now = new Date();
  const dayIdx = now.getDay(); // 0 (Minggu) to 6 (Sabtu)
  const lunar = getLunarPhaseData(now);
  const isGoldenActive = checkIsGoldenHourActive(dayIdx, now.getHours(), now.getMinutes());

  return {
    ...DAILY_COSMIC_DATA[dayIdx],
    lunar,
    isGoldenActive,
    fullDateStr: now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
  };
}

let isAlmVoiceMuted = false;

function speakWithAuraWhisper(text) {
  if (isAlmVoiceMuted) return;
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.warn('Speech synthesis not available:', e);
  }
}
window.speakWithAuraWhisper = speakWithAuraWhisper;

function toggleAlmanacVoice() {
  const btn = document.getElementById('btnAlmanacVoiceToggle');
  const txt = document.getElementById('txtAlmVoiceState');
  if ('speechSynthesis' in window) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      isAlmVoiceMuted = true;
      if (btn) btn.classList.add('muted');
      if (txt) txt.textContent = 'Suara Mati';
    } else {
      isAlmVoiceMuted = false;
      if (btn) btn.classList.remove('muted');
      if (txt) txt.textContent = 'Suara Aktif';
      const data = getTodayCosmicData();
      speakWithAuraWhisper(`Hari ini adalah ${data.dayName}. ${data.elementTitle}. Batu keberuntungan Anda hari ini adalah ${data.stoneName}. ${data.stonePerks}.`);
    }
  }
}
window.toggleAlmanacVoice = toggleAlmanacVoice;

function openDailyAlmanac() {
  const modal = document.getElementById('dailyAlmanacModal');
  if (!modal) return;
  
  const data = getTodayCosmicData();

  // Populate Header & Lunar
  const dateBadge = document.getElementById('almCurrentDate');
  const moonBadge = document.getElementById('almMoonPhaseDetail');
  const lunarHeader = document.getElementById('almLunarPhase');
  const elemTitle = document.getElementById('almCosmicElement');
  const elemSub = document.getElementById('almElementSub');
  
  if (dateBadge) dateBadge.textContent = data.fullDateStr;
  if (moonBadge) moonBadge.textContent = `✦ ${data.lunar.phaseText}`;
  if (lunarHeader) lunarHeader.innerHTML = `<i class="fa-solid ${data.lunar.icon} text-cyan"></i> ${data.lunar.name}`;
  if (elemTitle) elemTitle.textContent = data.elementTitle;
  if (elemSub) elemSub.textContent = data.elementSub;

  // Populate Card 1: Batu Keberuntungan Hari Ini
  const stoneName = document.getElementById('almStoneName');
  const stoneDesc = document.getElementById('almStoneDesc');
  const stonePerks = document.getElementById('almStonePerks');
  const stoneIcon = document.getElementById('almStoneIcon');
  if (stoneName) stoneName.textContent = data.stoneName;
  if (stoneDesc) stoneDesc.textContent = data.stoneDesc;
  if (stonePerks) stonePerks.textContent = data.stonePerks;
  if (stoneIcon) stoneIcon.className = `fa-solid ${data.stoneIcon} text-emerald`;

  // Populate Card 2: Jam Emas Rezeki
  const goldenHours = document.getElementById('almGoldenHours');
  const goldenHoursSub = document.getElementById('almGoldenHoursSub');
  const goldenStatus = document.getElementById('almGoldenStatus');
  const hoursLiveNote = document.getElementById('almHoursLiveNote');

  if (goldenHours) goldenHours.textContent = data.goldenHours;
  if (goldenHoursSub) goldenHoursSub.textContent = data.goldenHoursSub;
  if (goldenStatus) {
    if (data.isGoldenActive) {
      goldenStatus.innerHTML = '<i class="fa-solid fa-bolt text-emerald"></i> <span class="text-emerald">PUNCAK AKTIF SEKARANG!</span>';
    } else {
      goldenStatus.innerHTML = '<i class="fa-solid fa-clock text-gold"></i> <span>Jam Hoki Harian</span>';
    }
  }
  if (hoursLiveNote) {
    hoursLiveNote.textContent = data.isGoldenActive ? '🟢 Medan Resonansi Chi Sedang Terbuka Optimal' : 'Siklus 12 Cabang Bumi (Shichen)';
  }

  // Populate Card 3: Arah & Warna Hoki
  const dirColor = document.getElementById('almDirectionColor');
  const chiBooster = document.getElementById('almChiBooster');
  if (dirColor) dirColor.textContent = data.directionColor;
  if (chiBooster) chiBooster.textContent = data.chiGuide;

  // Update WhatsApp URL
  const btnWA = document.getElementById('btnAlmOrderWA');
  if (btnWA) {
    const waMsg = `Halo FW JADE Medan, saya ingin konsultasi mengenai Batu Keberuntungan Hari Ini (${data.dayName}, ${data.fullDateStr}): ${data.stoneName}. Mohon info koleksi alami Grade A ini.`;
    btnWA.href = `https://wa.me/62811619173?text=${encodeURIComponent(waMsg)}`;
  }

  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('open'), 10);
  speakWithAuraWhisper(`Hari ini adalah ${data.dayName}. Batu keberuntungan yang selaras untuk Anda hari ini adalah ${data.stoneName}. ${data.lunar.name}.`);
}
window.openDailyAlmanac = openDailyAlmanac;

function closeDailyAlmanac() {
  const modal = document.getElementById('dailyAlmanacModal');
  if (modal) {
    modal.classList.remove('open');
    setTimeout(() => { modal.style.display = 'none'; }, 250);
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
window.closeDailyAlmanac = closeDailyAlmanac;

function initDailyAlmanac() {
  // Auto-populate desktop pillar preview
  try {
    const data = getTodayCosmicData();
    const pillarStone = document.getElementById('desktopPillarStone');
    const pillarHours = document.getElementById('desktopPillarHours');
    if (pillarStone) pillarStone.textContent = data.stoneName;
    if (pillarHours) pillarHours.textContent = data.goldenHours.split('&')[0].trim();
  } catch (e) {}

  const luckyStoneBtn = document.getElementById('btnHeroLuckyStone');
  const sleekLuckyBtn = document.getElementById('btnSleekLuckyStone');

  if (luckyStoneBtn) {
    luckyStoneBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDailyAlmanac();
    });
  }
  if (sleekLuckyBtn) {
    sleekLuckyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDailyAlmanac();
    });
  }

  const closeBtn = document.getElementById('closeAlmanacBtn');
  const backdrop = document.getElementById('almanacBackdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeDailyAlmanac);
  if (backdrop) backdrop.addEventListener('click', closeDailyAlmanac);

  const voiceToggleBtn = document.getElementById('btnAlmanacVoiceToggle');
  if (voiceToggleBtn) {
    voiceToggleBtn.addEventListener('click', toggleAlmanacVoice);
  }

  const btnCheckAura = document.getElementById('btnAlmCheckAura');
  if (btnCheckAura) {
    btnCheckAura.addEventListener('click', () => {
      closeDailyAlmanac();
      startScannerFlow();
    });
  }
}


// ==========================================================================
// 20. THREE.JS 3D JADE STUDIO & SENTER GIOK (Cartier/Bulgari Standard)
// ==========================================================================
let threeJadeScene, threeJadeCamera, threeJadeRenderer, threeJadeGroup;
let flashlightLight = null;
let isFlashlightOn = false;
let isDragging3D = false;
let prevMousePos = { x: 0, y: 0 };

function initThreeJsJadeStudio() {
  const canvas = document.getElementById('threeJadeCanvas');
  const container = document.getElementById('jade3dContainer');
  if (!canvas || !container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 220;
  const height = container.clientHeight || 220;

  // Scene & Camera
  threeJadeScene = new THREE.Scene();
  threeJadeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  threeJadeCamera.position.z = 4.2;

  // Renderer
  threeJadeRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  threeJadeRenderer.setSize(width, height);
  threeJadeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  threeJadeScene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffeedd, 1.4);
  mainLight.position.set(3, 4, 5);
  threeJadeScene.add(mainLight);

  const rimLight = new THREE.PointLight(0x2BE085, 1.5, 10);
  rimLight.position.set(-3, -2, 2);
  threeJadeScene.add(rimLight);

  // Senter Giok Translucency Backlight (Spotlight from behind/inside)
  flashlightLight = new THREE.PointLight(0x5EEAD4, 0, 8);
  flashlightLight.position.set(0, 0, -1.2);
  threeJadeScene.add(flashlightLight);

  // 3D Jade Group (Pendant + Gold Bezel)
  threeJadeGroup = new THREE.Group();

  // 1. Jade Gemstone (Smooth Cabochon with Translucent Shader)
  const jadeGeo = new THREE.SphereGeometry(1, 32, 32);
  jadeGeo.scale(0.85, 1.15, 0.45); // Oval cabochon shape
  
  const jadeMat = new THREE.MeshPhysicalMaterial({
    color: 0x059669,
    emissive: 0x064E3B,
    emissiveIntensity: 0.35,
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.65,
    ior: 1.66 // Natural Jadeite Refractive Index
  });
  const jadeMesh = new THREE.Mesh(jadeGeo, jadeMat);
  threeJadeGroup.add(jadeMesh);

  // 2. 18K Gold Outer Bezel Halo
  const ringGeo = new THREE.TorusGeometry(1.08, 0.08, 16, 48);
  ringGeo.scale(0.88, 1.18, 0.6);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xF59E0B,
    metalness: 0.85,
    roughness: 0.25
  });
  const ringMesh = new THREE.Mesh(ringGeo, goldMat);
  threeJadeGroup.add(ringMesh);

  threeJadeScene.add(threeJadeGroup);

  // Touch & Mouse 360° Drag Rotation Controls
  container.addEventListener('pointerdown', (e) => {
    isDragging3D = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging3D || !threeJadeGroup) return;
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;

    threeJadeGroup.rotation.y += deltaX * 0.015;
    threeJadeGroup.rotation.x += deltaY * 0.015;

    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointerup', () => { isDragging3D = false; });

  // Senter Giok Button Toggle
  const btnFlashlight = document.getElementById('btnToggleFlashlight');
  if (btnFlashlight) {
    btnFlashlight.addEventListener('click', () => {
      isFlashlightOn = !isFlashlightOn;
      btnFlashlight.classList.toggle('active', isFlashlightOn);

      if (isFlashlightOn) {
        flashlightLight.intensity = 4.5;
        jadeMat.emissiveIntensity = 0.95;
        jadeMat.color.setHex(0x34D399);
      } else {
        flashlightLight.intensity = 0;
        jadeMat.emissiveIntensity = 0.35;
        jadeMat.color.setHex(0x059669);
      }
    });
  }

  // Reset View
  const btnReset = document.getElementById('btnReset3dView');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (threeJadeGroup) {
        threeJadeGroup.rotation.set(0, 0, 0);
      }
    });
  }

  // Render Loop with Gentle Idle Float
  function render3d() {
    requestAnimationFrame(render3d);
    if (!isDragging3D && threeJadeGroup) {
      threeJadeGroup.rotation.y += 0.004;
    }
    threeJadeRenderer.render(threeJadeScene, threeJadeCamera);
  }
  render3d();
}


// ==========================================================================
// 21. MAGNETIC TOUCH & SPRING PHYSICS (Apple Luxury Standard)
// ==========================================================================
function initMagneticTouchPhysics() {
  const magneticElements = document.querySelectorAll(
    '.sleek-touch-control-button, .entry-card, .btn-ask-aurora, .btn-gold-action'
  );

  magneticElements.forEach(el => {
    el.classList.add('magnetic-item');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Soft magnetic pull (Max 6px displacement)
      el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}


// ==========================================================================
// 22. MINISEARCH CLIENT-SIDE SEMANTIC GEMSTONE MATCHER
// ==========================================================================
let miniSearchEngine = null;

function initMiniSearchEngine() {
  if (typeof MiniSearch === 'undefined' || !window.GemstoneDatabase) return;

  miniSearchEngine = new MiniSearch({
    fields: ['name', 'element_id', 'energy', 'description', 'keywords', 'health', 'fengshui'],
    storeFields: ['id', 'name', 'element_id', 'energy', 'price', 'description'],
    searchOptions: {
      boost: { name: 3, energy: 2, keywords: 2 },
      fuzzy: 0.25,
      prefix: true
    }
  });

  // Deeply enrich gemstone metadata for instant natural query matching
  const enrichedDocs = GemstoneDatabase.map(gem => ({
    ...gem,
    keywords: `${gem.name} rezeki hoki kekayaan kesehatan detoks tenang cinta asmara jodoh wibawa karier tolak bala perlindungan chi aura energi`,
    health: 'vitalitas sirkulasi darah detoksifikasi ginjal jantung saraf tidur lelap anti stres',
    fengshui: 'sudut hoki kekayaan ruang tamu meja kerja pintu masuk kamar tidur'
  }));

  miniSearchEngine.addAll(enrichedDocs);
}

function searchGemstonesSemantically(query) {
  if (!miniSearchEngine || !query) return GemstoneDatabase[0];
  const results = miniSearchEngine.search(query);
  if (results && results.length > 0) {
    const matchedId = results[0].id;
    return GemstoneDatabase.find(g => g.id === matchedId) || GemstoneDatabase[0];
  }
  return GemstoneDatabase[0];
}


// ==========================================================================
// 23. MASTER ADMIN LEADS PORTAL (fwjade.com@gmail.com)
// ==========================================================================
let allLoadedLeads = [];

function initAdminPortal() {
  const btnOpen = document.getElementById('openAdminModalBtn');
  const btnClose = document.getElementById('closeAdminBtn');
  const backdrop = document.getElementById('adminModalBackdrop');

  if (btnOpen) {
    btnOpen.addEventListener('click', openAdminModal);
  }
  if (btnClose) {
    btnClose.addEventListener('click', closeAdminModal);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeAdminModal);
  }
}

function openAdminModal() {
  const modal = document.getElementById('adminModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
    loadAdminLeads();
  }
}
window.openAdminModal = openAdminModal;

function closeAdminModal() {
  const modal = document.getElementById('adminModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('open');
  }
}
window.closeAdminModal = closeAdminModal;

async function loadAdminLeads() {
  const tbody = document.getElementById('adminLeadsTableBody');
  const statTotal = document.getElementById('adminStatTotal');
  const statRev = document.getElementById('adminStatRevenue');

  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center"><i class="fa-solid fa-spinner fa-spin text-emerald"></i> Memuat database prospek dari Cloudflare Edge...</td></tr>';
  }

  try {
    const res = await fetch('/api/leads?admin=fwjade.com@gmail.com');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.leads) {
        allLoadedLeads = data.leads;
        renderAdminLeadsTable(allLoadedLeads);

        if (statTotal) statTotal.textContent = `${data.totalLeads} Orang`;
        if (statRev) {
          const totalRev = data.leads.reduce((acc, cur) => {
            const num = parseInt((cur.price || '0').replace(/[^0-9]/g, '')) || 1850000;
            return acc + num;
          }, 0);
          statRev.textContent = `Rp ${totalRev.toLocaleString('id-ID')}`;
        }
        return;
      }
    }
  } catch (e) {
    console.warn('Admin fetch fallback:', e);
  }

  // Graceful Local Fallback if offline
  renderAdminLeadsTable(allLoadedLeads);
}
window.loadAdminLeads = loadAdminLeads;

function renderAdminLeadsTable(leads) {
  const tbody = document.getElementById('adminLeadsTableBody');
  if (!tbody) return;

  if (!leads || leads.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Belum ada data prospek yang masuk.</td></tr>';
    return;
  }

  tbody.innerHTML = leads.map(l => {
    const cleanPhone = (l.phone || '').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Halo Bapak/Ibu ${l.name}, kami dari Galeri FW JADE Medan. Berdasarkan hasil pembacaan energi aura & Bazi Anda (${l.gemstone || 'Natural Aceh Jadeite'}), apakah ada yang bisa kami bantu mengenai pemilihan liontin atau gelang giok alami Anda?`)}`;

    return `
      <tr>
        <td><span class="text-dim text-xs">${l.timestamp || '-'}</span></td>
        <td><strong>${l.name}</strong>${l.email && l.email !== '-' ? `<br><small class="text-dim">${l.email}</small>` : ''}</td>
        <td><span class="text-gold">${l.dob || '-'}</span><br><small class="text-emerald">${l.zodiac || ''} • ${l.shio || ''}</small></td>
        <td><strong>${l.phone}</strong></td>
        <td><strong class="text-emerald">${l.gemstone || 'Natural Aceh Jadeite'}</strong><br><small class="text-gold">${l.price || 'Rp 1.850.000'}</small></td>
        <td>
          <a href="${waUrl}" target="_blank" class="luxury-btn btn-primary btn-xs" title="Chat WhatsApp Customer Langsung">
            <i class="fa-brands fa-whatsapp"></i> <span>Chat CS</span>
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

function filterAdminTable() {
  const query = document.getElementById('adminSearchInput')?.value.toLowerCase() || '';
  if (!query) {
    renderAdminLeadsTable(allLoadedLeads);
    return;
  }

  const filtered = allLoadedLeads.filter(l =>
    (l.name && l.name.toLowerCase().includes(query)) ||
    (l.phone && l.phone.includes(query)) ||
    (l.gemstone && l.gemstone.toLowerCase().includes(query)) ||
    (l.zodiac && l.zodiac.toLowerCase().includes(query))
  );
  renderAdminLeadsTable(filtered);
}
window.filterAdminTable = filterAdminTable;

function exportLeadsToCSV() {
  if (!allLoadedLeads || allLoadedLeads.length === 0) {
    alert('Belum ada data untuk diunduh.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'ID,Waktu,Nama,Tanggal Lahir,Zodiak,Shio,Elemen,WhatsApp,Email,Batu Rekomendasi,Harga\n';

  allLoadedLeads.forEach(l => {
    const row = [
      l.id,
      `"${l.timestamp}"`,
      `"${l.name}"`,
      `"${l.dob}"`,
      `"${l.zodiac}"`,
      `"${l.shio}"`,
      `"${l.element}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.gemstone}"`,
      `"${l.price}"`
    ].join(',');
    csvContent += row + '\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `FWJADE_Leads_Database_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
window.exportLeadsToCSV = exportLeadsToCSV;

// ==========================================================================
// 23. LUXURY SIDEBAR DRAWER (Mobile Slide-Over Menu & Complete Trust Suite)
// ==========================================================================
function openSidebarDrawer() {
  const drawer = document.getElementById('luxurySidebarDrawer');
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}
window.openSidebarDrawer = openSidebarDrawer;

function closeSidebarDrawer() {
  const drawer = document.getElementById('luxurySidebarDrawer');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
window.closeSidebarDrawer = closeSidebarDrawer;

function toggleLanguageFromDrawer() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.click();
    const langFlag = document.getElementById('langFlag')?.textContent || '🇮🇩';
    const langText = document.getElementById('langText')?.textContent || 'ID';
    const badge = document.getElementById('drawerLangBadge');
    const desc = document.getElementById('drawerLangDesc');
    if (badge) badge.textContent = `${langFlag} ${langText}`;
    if (desc) desc.textContent = langText === 'EN' ? 'English (Global)' : 'Bahasa Indonesia (ID)';
  }
}
window.toggleLanguageFromDrawer = toggleLanguageFromDrawer;

// Bind ESC key to close drawer
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSidebarDrawer();
  }
});

// Initialize All Features on startup
document.addEventListener('DOMContentLoaded', () => {
  const savedStyle = localStorage.getItem('aurora_ui_style') || 'sleek';
  setUIStyle(savedStyle);

  initIdentityFormSelectors();
  initAdminPortal();
  initMianXiangPalaces();
  initArJewelryMirror();
  initDailyAlmanac();
  initThreeJsJadeStudio();
  initMagneticTouchPhysics();
  initMiniSearchEngine();
});


