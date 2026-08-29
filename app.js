/**
 * AURORA AI — by FW JADE (Medan Giok)
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
    firCoherence: '99.2% H₂O Coherence',
    ftirPurity: 'Grade A (0.0% Resin)',
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
    firCoherence: '98.6% H₂O Coherence',
    ftirPurity: 'Grade A (0.0% Resin)',
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
    firCoherence: '96.4% Coherence',
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
    firCoherence: '97.1% Coherence',
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

function speakWithAuroraWhisper(text) {
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

// ==========================================
// 5. GOOGLE MEDIAPIPE FACE MESH & BIOMETRIC SCANNER (Industry Gold Standard)
// ==========================================
let faceMeshInstance = null;
let isMediaPipeActive = false;

function startScannerFlow() {
  const secScanner = document.getElementById('secScanner');
  if (secScanner) {
    secScanner.style.display = 'block';
    secScanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  startWebcam();
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

function animateScannerProgression() {
  const pBar = document.getElementById('scanProgressFill');
  const pTxt = document.getElementById('scanProgressPercent');
  const chkLight = document.getElementById('chkLight');
  const chkPos = document.getElementById('chkPos');
  const chkFilter = document.getElementById('chkFilter');

  playChimeReverb();

  let percent = 0;
  const interval = setInterval(() => {
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

      setTimeout(() => {
        promptGatedAuth(GemstoneDatabase[0]);
      }, 600);
    }
  }, 60);
}

function promptGatedAuth(gemObj) {
  // Save the temporary reading result to be revealed after auth
  AppState.tempReading = gemObj;
  
  // Pause the scanner UI
  document.getElementById('secScanner').style.display = 'none';
  
  // Show the Gated Revelation Auth Modal
  document.getElementById('authModal').classList.add('open');
  
  speakWithAuroraWhisper('Aura Anda telah terbaca. Tautkan identitas Anda untuk membuka gerbang rahasia ini.');
}

function revealFullResults(gemObj) {
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

  // WhatsApp Order URLs
  const waUrl = `https://wa.me/62811619173?text=${encodeURIComponent(`Halo FW JADE Medan, saya ingin memesan perhiasan hasil pembacaan AURORA AI: ${gemObj.name}. Mohon info ketersediaan & pengiriman.`)}`;
  const btnWA = document.getElementById('btnOrderWA');
  if (btnWA) btnWA.href = waUrl;

  // Hide Scanner Section and Show Results Sections
  const secScan = document.getElementById('secScanner');
  if (secScan) secScan.style.display = 'none';

  const secAura = document.getElementById('secAuraResults');
  if (secAura) secAura.style.display = 'block';

  const secGem = document.getElementById('secGemstone');
  if (secGem) secGem.style.display = 'block';

  const secMan = document.getElementById('secManifestation');
  if (secMan) secMan.style.display = 'block';

  const secAct = document.getElementById('secActions');
  if (secAct) secAct.style.display = 'block';

  if (secAura) {
    secAura.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const hour = new Date().getHours();
  const timeGreeting = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam';
  const whisperGreeting = `${timeGreeting}... Pembacaan aura Anda selaras dengan elemen ${gemObj.element_id || 'Kayu'} di angka 96 persen. Batu pelindung dan magnet rezeki yang dihadirkan untuk Anda adalah ${gemObj.name}.`;
  
  speakWithAuroraWhisper(whisperGreeting);

  // Update scientific and astrological metrics
  updateScienceAndAstroMetrics(gemObj);

  // Apply element-adaptive theming
  applyElementTheme(gemObj.element || gemObj.element_id || 'WOOD');

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
      ? 'Mohon maaf, AURORA AI khusus memandu seputar khasiat kesehatan, energi mistis, feng shui, dan rezeki dari batu mulia/giok.'
      : 'AURORA AI is strictly focused on gemstone healing, mystical armor, feng shui, and wealth attraction.');
    return;
  }

  // Find matching gemstone and reveal full luxury results
  const matched = GemstoneDatabase.find(g => g.keywords.some(k => query.toLowerCase().includes(k))) || GemstoneDatabase[0];
  revealFullResults(matched);
}

// ==========================================
// 7. LEVEL 3 CONTEXTUAL CHAT DRAWER
// ==========================================
function handleContextualAsk(customQuery) {
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

  const gem = AppState.user.metrics.selectedGem || GemstoneDatabase[0];
  let answer = '';

  if (query.toLowerCase().includes('fir') || query.toLowerCase().includes('sains') || query.toLowerCase().includes('darah')) {
    answer = `Secara bio-fisika, kisi kristal ${gem.name} (${gem.chemFormula}) memancarkan radiasi Far Infrared (FIR) pada puncak ${gem.firPeak || '9.35 µm'}. Resonansi ini menggetarkan molekul air darah, memulihkan Zeta Potential eritrosit (ζ ≤ -15 mV), dan meningkatkan oksigenasi mikrosirkulasi hingga ${gem.oxygenBoost || '+23.4%'} sesuai Hukum Poiseuille.`;
  } else if (query.toLowerCase().includes('zodiak') || query.toLowerCase().includes('shio') || query.toLowerCase().includes('kelahiran')) {
    answer = `Batu ${gem.name} memiliki resonansi harmonis luar biasa dengan Zodiak (${gem.zodiacMatch}) dan Shio (${gem.shioMatch}). Siklus energinya adalah ${gem.wuXingCycle}, menciptakan pelindung aura sekaligus magnet kemakmuran personal.`;
  } else if (query.toLowerCase().includes('lab') || query.toLowerCase().includes('mohs') || query.toLowerCase().includes('berat jenis') || query.toLowerCase().includes('formula')) {
    answer = `Data Laboratorium Resmi FW JADE: Formula ${gem.chemFormula}, Kekerasan Skala Mohs ${gem.mohs}, Berat Jenis ${gem.sg}, dan Uji FTIR menunjukkan ${gem.ftirPurity || 'Grade A murni tanpa resin sintetis'}.`;
  } else if (query.toLowerCase().includes('rawat') || query.toLowerCase().includes('bersih')) {
    answer = `Untuk merawat ${gem.name}, cukup bilas dengan air mineral mengalir setiap awal bulan lunar untuk melarutkan sisa energi statis. Hindari kontak langsung dengan bahan kimia keras.`;
  } else if (query.toLowerCase().includes('tidur')) {
    answer = `Ya, ${gem.name} sangat aman bahkan dianjurkan diletakkan di dekat bantal atau dikenakan saat tidur untuk menstabilkan gelombang otak delta dan mempercepat regenerasi Chi seluler.`;
  } else if (query.toLowerCase().includes('negosiasi') || query.toLowerCase().includes('bisnis') || query.toLowerCase().includes('kerja')) {
    answer = `Sangat ideal! Pancaran resonansi ${gem.element_id} pada ${gem.name} memperkuat wibawa batin dan menajamkan intuisi diplomasi Anda saat berhadapan dengan rekan bisnis penting.`;
  } else {
    answer = `Berdasarkan profil getaran aura Anda (${gem.element_id} 96%), ${gem.name} (${gem.chemFormula}) bekerja optimal saat bersentuhan langsung dengan denyut nadi leher atau pergelangan tangan kiri Anda.`;
  }

  // Add Aurora bubble with delay
  setTimeout(() => {
    const auroraBubble = document.createElement('div');
    auroraBubble.className = 'chat-bubble bubble-aurora';
    auroraBubble.innerHTML = `<strong>✦ Master Aurora:</strong> ${answer}`;
    streamBox.appendChild(auroraBubble);
    streamBox.scrollTop = streamBox.scrollHeight;
    speakWithAuroraWhisper(answer);
  }, 400);
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
  <title>Laporan Resmi Aura & Batu Mulia — AURORA AI by FW JADE</title>
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
    <div class="sub">AURORA AI AURA & GEMSTONE REPORT • DITERBITKAN: ${dateStr}</div>
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
  a.download = `AURORA_AI_Laporan_Aura_${Date.now()}.html`;
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

  ctx.fillStyle = '#080F0E';
  ctx.fillRect(0, 0, 450, 800);

  const grad = ctx.createRadialGradient(225, 260, 20, 225, 260, 220);
  grad.addColorStop(0, 'rgba(43, 224, 133, 0.4)');
  grad.addColorStop(0.5, 'rgba(255, 200, 87, 0.2)');
  grad.addColorStop(1, 'rgba(8, 15, 14, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 450, 800);

  ctx.strokeStyle = '#D7B65A';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 418, 768);

  ctx.fillStyle = '#FFC857';
  ctx.font = '700 13px Cinzel';
  ctx.textAlign = 'center';
  ctx.fillText('FW JADE MEDAN • AURA ORACLE', 225, 55);

  ctx.fillStyle = '#E6E9EC';
  ctx.font = '700 22px Cinzel';
  ctx.fillText('AURORA AI AURA REPORT', 225, 88);

  ctx.strokeStyle = '#2BE085';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(225, 220, 75, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#2BE085';
  ctx.font = '600 15px Poppins';
  ctx.fillText('✨ AURA ALIGNMENT 96% ✨', 225, 325);

  ctx.fillStyle = '#FFC857';
  ctx.font = '700 20px Poppins';
  ctx.fillText(AppState.user.name, 225, 360);

  ctx.fillStyle = '#13221F';
  ctx.fillRect(40, 390, 370, 240);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.strokeRect(40, 390, 370, 240);

  ctx.textAlign = 'left';
  ctx.font = '500 14px Poppins';
  ctx.fillStyle = '#8E9894';
  ctx.fillText('Elemen Dominan:', 60, 435);
  ctx.fillStyle = '#2BE085';
  ctx.fillText('WOOD (Kayu)', 250, 435);

  ctx.fillStyle = '#8E9894';
  ctx.fillText('Vitalitas Holistik:', 60, 480);
  ctx.fillStyle = '#FFC857';
  ctx.fillText('91% (Optimal)', 250, 480);

  ctx.fillStyle = '#8E9894';
  ctx.fillText('Batu Penjaga:', 60, 525);
  ctx.fillStyle = '#2BE085';
  ctx.font = '700 13px Poppins';
  ctx.fillText(gem.name, 200, 525);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#D7B65A';
  ctx.font = '600 11px Poppins';
  ctx.fillText('VERIFIED BY FW JADE MEDAN', 225, 680);

  document.getElementById('auraCardModal').classList.add('open');
}

function downloadAuraCard() {
  const canvas = document.getElementById('auraCardCanvas');
  const link = document.createElement('a');
  link.download = `AURORA-AI-Aura-Card-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ==========================================
// 11. DIGITAL CERTIFICATE & VIP PASS LOGIC
// ==========================================
function openCertModal() {
  const gem = AppState.user.metrics.selectedGem || GemstoneDatabase[0];
  document.getElementById('certItemName').textContent = `${gem.name} (Untreated)`;
  document.getElementById('certAuraScore').textContent = `96% (${gem.element_id})`;
  document.getElementById('certOwnerName').textContent = AppState.user.name;
  document.getElementById('vipCardHolder').textContent = AppState.user.name.toUpperCase();
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

  const input = document.getElementById('omniboxInput');
  if (input) input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearchQuery(e.target.value);
  });

  // Mic Button
  const micBtn = document.getElementById('voiceSearchBtn');
  if (micBtn) micBtn.addEventListener('click', toggleVoiceMic);

  // Trending Chips
  document.querySelectorAll('.topic-chip, .topic-pill-chip').forEach(chip => {
    chip.addEventListener('click', () => {
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
  if (closeAura) closeAura.addEventListener('click', () => {
    document.getElementById('auraCardModal').classList.remove('open');
  });

  const dlCard = document.getElementById('btnDownloadCard');
  if (dlCard) dlCard.addEventListener('click', downloadAuraCard);

  const shareWA = document.getElementById('btnShareWA');
  if (shareWA) shareWA.addEventListener('click', () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Lihat hasil pembacaan Aura Wajah & Batu Keberuntungan saya di AURORA AI by FW JADE: https://fwjade.com')}`, '_blank');
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
  if (btnAuthGoogle) btnAuthGoogle.addEventListener('click', () => simulateLogin('Google'));

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
  
  // Simulate saving to DB
  saveReadingToDatabase(AppState.tempReading);
  
  // Resume the flow
  revealFullResults(AppState.tempReading);

  // Optional: Prompt for WebAuthn (Passkeys) after 3 seconds
  setTimeout(() => {
    if (confirm("Aurora merekomendasikan: Aktifkan Face ID / Windows Hello untuk masuk instan di masa depan tanpa sandi? (WebAuthn Passkeys)")) {
      alert("Simulasi: Kredensial Passkey didaftarkan pada perangkat ini.");
    }
  }, 5000);
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
      console.log('AURORA SW Registered:', reg.scope);
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
  id: `Mereka yang membiarkan semesta berbicara terlebih dahulu memiliki intuisi elemen yang kuat dan jiwa yang terbuka. Aurora akan membaca aura wajah Anda sekarang...`,
  en: `Those who let the universe speak first carry a powerful elemental intuition and an open soul. Aurora will now read your facial aura...`
};

const SAGE_RESPONSES = {
  id: `Pikiran yang jernih dan terarah adalah tanda elemen yang seimbang. Apa yang ingin Anda ketahui dari Aurora hari ini?`,
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
    if (omnibox) omnibox.placeholder = 'Atau tanyakan sesuatu kepada Aurora...';
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
    sub.textContent = `Aurora telah membaca elemen ${gemObj.element_id || 'Anda'} dan menemukan resonansi terkuat dengan batu ini.`;
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
        ? '🔮 Oracle Mode — Let Aurora read your face and aura first.'
        : '🔮 Oracle Mode — Biarkan Aurora membaca wajah dan aura Anda terlebih dahulu.';
      switchMode(DUAL_MODE.ORACLE, msg);
    });
  }

  if (btnModeSage) {
    btnModeSage.addEventListener('click', () => {
      if (document.body.classList.contains('mode-sage')) return; // already active
      const msg = AppState.lang === 'en'
        ? '💎 Sage Mode — Ask Aurora anything. Direct and clear.'
        : '💎 Sage Mode — Tanyakan apa saja kepada Aurora. Langsung dan jelas.';
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
// 19. FITUR 4: DAILY CHI ALMANAC & JAM HOKI CONTROLLER
// ==========================================================================
function openDailyAlmanac() {
  const modal = document.getElementById('dailyAlmanacModal');
  if (!modal) return;
  
  // Format current date in Indonesian
  const dateBadge = document.getElementById('almCurrentDate');
  if (dateBadge) {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    dateBadge.textContent = today.toLocaleDateString('id-ID', options).toUpperCase();
  }

  modal.style.display = 'flex';
}

function closeDailyAlmanac() {
  const modal = document.getElementById('dailyAlmanacModal');
  if (modal) modal.style.display = 'none';
}

function initDailyAlmanac() {
  const luckyStoneBtn = document.getElementById('btnHeroLuckyStone');
  if (luckyStoneBtn) {
    luckyStoneBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDailyAlmanac();
    });
  }

  const closeBtn = document.getElementById('closeAlmanacBtn');
  const backdrop = document.getElementById('almanacBackdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeDailyAlmanac);
  if (backdrop) backdrop.addEventListener('click', closeDailyAlmanac);

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
    thickness: 1.2,
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


// Initialize All Features on startup
document.addEventListener('DOMContentLoaded', () => {
  const savedStyle = localStorage.getItem('aurora_ui_style') || 'sleek';
  setUIStyle(savedStyle);

  initMianXiangPalaces();
  initArJewelryMirror();
  initDailyAlmanac();
  initThreeJsJadeStudio();
  initMagneticTouchPhysics();
  initMiniSearchEngine();
});
