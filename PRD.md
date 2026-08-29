# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# AURORA AI — by FW JADE
### *The World's First Luxury Mystical Gemstone, Face Aura & Wealth Oracle*

---

## 1. DOKUMEN KONTROL & INFORMASI PRODUK
* **Nama Produk:** **AURORA AI**
* **Brand Induk:** **FW JADE (FW Jade Jewellery — Medan Giok)**
* **Versi Dokumen:** v1.0 (Production Blueprint)
* **Author / Architect:** Senior Software Architect & Lead AI Systems Engineer
* **Target Rilis:** Q3/Q4 2026
* **Status:** Approved / Ready for Prototype Implementation

---

## 2. EXECUTIVE SUMMARY & VISI PRODUK

### 2.1 Latar Belakang
Pasar batu mulia dan giok bernilai miliaran rupiah sering kali terhambat oleh minimnya literasi keaslian, mitos yang simpang siur, serta proses konsultasi fengshui/energi yang kaku dan mahal. Di sisi lain, tren spiritual wellness, fengshui modern, dan terapi kristal (*crystal healing*) mengalami ledakan minat di kalangan generasi muda, eksekutif, dan pebisnis global.

### 2.2 Visi Produk
**AURORA AI by FW JADE** adalah platform *Luxury Web AI Oracle* pertama di dunia yang menggabungkan:
1. **Zero-Login Biometric Face & Aura Scanner:** Pemindaian fisiognomi wajah (*Mian Xiang*) dan kebugaran holistik seketika.
2. **Conversational Multi-Modal Stone Intelligence:** Mesin penjawab suara bebas sentuhan (*hands-free voice*) dengan kurasi 100% mendalam tentang kesehatan bio-energi, mistis tuah, fengshui hoki, dan magnet kekayaan.
3. **Automated High-Conversion Sales Funnel:** Terintegrasi langsung dengan payment gateway instan (Midtrans) untuk pasar domestik dan WhatsApp Concierge VIP multi-bahasa untuk pasar internasional.

---

## 3. IDENTITAS BRAND & LUXURY DESIGN SYSTEM

### 3.1 Nilai & Karakteristik Brand
* **Opulent & Regal:** Menampilkan kemewahan batu giok kaisar (*Imperial Jade*) berpadu dengan aksen emas sampanye (*Champagne Gold*).
* **Mystical Yet Scientific:** Menggabungkan mistisisme kuno ribuan tahun dengan teknologi AI vision mutakhir.
* **Sleek, Minimalist & Simple:** Antarmuka yang sangat bersih, tanpa kerumitan menu berulang, mudah dipahami bahkan oleh pengguna awam dalam hitungan detik.

### 3.2 Palet Warna & Visual Tokens (*Luxury Jade Theme*)
* **Deep Obsidian Space (Background):** `#06090C` / `#0A1015`
* **Imperial Jade (Primary Brand):** `#00A86B`
* **Ethereal Aurora Neon (Accent/Glow):** `#00F59B` / `#0DF5A2`
* **Champagne Gold (Luxury Trim & Royal Badges):** `#D4AF37` / `#F3E5AB`
* **Mystic Violet Aura (Secondary Energy):** `#8A2BE2`
* **Glassmorphism:** `rgba(10, 20, 25, 0.75)` dengan `backdrop-filter: blur(20px)` dan border halus `1px solid rgba(0, 245, 155, 0.15)`.

### 3.3 Tipografi & Suara
* **Font Utama:** *Outfit* / *Cinzel Decorative* (Heading Luxury) + *Plus Jakarta Sans* / *Inter* (Body Text).
* **AI Voice Persona:** "Master Aurora" — Suara tenang, teduh, berkharisma, sopan, dan berwibawa layaknya Grandmaster kurator batu permata dunia.

---

## 4. TARGET AUDIENCE & USER PERSONAS

| Persona | Profil & Karakteristik | Kebutuhan Utama | Trigger Konversi |
| :--- | :--- | :--- | :--- |
| **The Wealth Seeker (Pebisnis / Pengusaha)** | Pria/Wanita 28–55 thn, pemilik bisnis, investor saham/properti. | Mencari batu penglaris usaha, penangkal kerugian, pembuka hoki dan aura kepemimpinan. | Rekomendasi Citrine / Pyrite / Jadeite Liontin Penarik Rezeki + Scan Garis Dahi Keberuntungan. |
| **The Holistic Health Conscious** | Pria/Wanita 30–60 thn, memiliki keluhan migrain, darah kental, stres tinggi. | Terapi alami, bio-magnetik, detoksifikasi darah, insomnia. | Analisis kantung mata/kelelahan wajah + Rekomendasi Gelang Giok Hitam Aceh (*Black Jade FIR*). |
| **The Gemstone & Crystal Collector** | Kolektor batu nusantara & internasional, penikmat keindahan seni alami. | Uji keaslian, serat batu, skala Mohs, asal tambang, investasi jangka panjang. | Edukasi Grade A Jadeite FW Jade + Konsultasi langsung ke WhatsApp Om Faisal. |
| **International Spiritual Enthusiast** | Warga Singapore, Malaysia, Hong Kong, US, Eropa. | Pembacaan aura wajah modern, filosofi Wu Xing, perhiasan pelindung diri bersertifikat. | Antarmuka English + WhatsApp Global VIP Concierge Checkout. |

---

## 5. SPESIFIKASI FITUR FUNGSIONAL LENGKAP

```
                                  AURORA AI by FW JADE
                                            │
    ┌───────────────────┬───────────────────┼───────────────────┬───────────────────┐
    ▼                   ▼                   ▼                   ▼                   ▼
[1. Zero-Login]    [2. Voice &]        [3. Strict Stone]   [4. Paywall &]      [5. E-Commerce]
  Biometric Face     Omnibox Search      Guardrail Engine    Midtrans Gateway    WhatsApp Funnel
  & Aura Memory      Interaction         (100% Gem Domain)   (Rp 10.000 / Q)     & Viral Cards
```

---

### FITUR 1: Zero-Login Biometric Face & Aura Scanner (Kamera Pintar)

#### 1. Alur Pengguna (*User Flow*):
1. **Auto Camera Activation:** Saat aplikasi dibuka, layar menampilkan HUD scanner berbentuk oval kristal giok bercahaya lembut.
2. **Face Feature Extraction:** Kamera membaca landmark wajah (mata, dahi, hidung, warna rona kulit).
3. **Penyimpanan Memori Wajah:**
   * Jika wajah **baru**: AI menyapa dan meminta nama 1x via suara/input kilat. Wajah diubah menjadi vektor enkripsi unik dan disimpan di database lokal/cloud.
   * Jika wajah **lama (returning user)**: AI langsung mengenali dalam 0.3 detik tanpa perlu login/password!
4. **Sapaan Suara Berdasarkan Waktu & Nama:**
   * *Pagi (05:00 - 11:59):* "Selamat pagi [Nama], energi aura Anda hari ini sangat cerah di area dahi karir..."
   * *Siang (12:00 - 17:59):* "Selamat siang [Nama], bagaimana kelancaran bisnis Anda hari ini? Ada getaran hoki yang kuat..."
   * *Malam (18:00 - 04:59):* "Selamat malam [Nama], saatnya menyeimbangkan energi batin dan menetralkan lelah fisik..."

#### 2. Spektrum Analisis Wajah (Tri-Spectrum Analysis):
* **A. Fisiognomi Feng Shui (*Mian Xiang*):**
  * *Dahi (Guan Lu Gong):* Potensi kemajuan karir dan tender.
  * *Hidung (Cai Bo Gong):* Kekuatan menampung dan memutar uang.
  * *Pelipis & Pipi (Tian Zhai & Quan Gu):* Stabilitas emosi, wibawa, dan harmoni keluarga.
* **B. Vitalitas Medis & Energi Tubuh:**
  * Deteksi rona lelah bawah mata, kekusaman kulit, ketegangan rahang.
  * Menghitung persentase energi vital tubuh (Vitality Score: 0 - 100%).
* **C. Penentuan Elemen Dominan & Batu Wajib:**
  * Memetakan elemen kelahiran dan kondisi energi saat ini (Kayu, Api, Tanah, Logam, Air) dan menentukan batu yang **wajib dipakai** untuk menyeimbangkan Chi.

---

### FITUR 2: Conversational Multi-Modal Stone Oracle (Voice & Search)

#### 1. Hands-Free Voice AI (Mode Suara Bebas Sentuhan):
* **Speech-to-Text (STT):** Pengenalan suara ultra-presisi yang mendukung dialek bahasa Indonesia dan English secara natural.
* **Real-time Voice Visualizer:** Animasi gelombang suara aurora hijau zamrud (*orb waveform*) yang bergerak dinamis mengikuti desibel percakapan.
* **Text-to-Speech (TTS):** Sintesis suara natural yang hangat dan menenangkan, memberikan pengalaman seperti berkonsultasi langsung dengan tetua master giok.

#### 2. Hybrid Omnibox Search Bar (Google Style):
* Bar pencarian di bagian atas dengan saran instan (*predictive auto-suggestions*), misal:
  * *"Giok apa yang cocok untuk menarik pembeli toko?"*
  * *"Khasiat Black Jade Aceh untuk darah kental"*
  * *"Batu pelindung dari kiriman santet atau guna-guna"*
  * *"Batu elemen Tanah untuk shio Naga"*
* **Filter Chips:** `[Semua]`, `[Kesehatan]`, `[Mistis & Tuah]`, `[Kekayaan]`, `[Feng Shui]`, `[Keaslian Giok]`.

---

### FITUR 3: Strict Stone Guardrail Engine (100% Filter Domain Batu)

Sistem memiliki *hardcoded firewall* yang memblokir secara elegan segala topik di luar batu dan mineral:
* **Logika:** Jika pengguna bertanya tentang politik, resep kue, coding pemrograman, selebriti non-batu, dll.
* **Respons Standar Elegan:**
  > *"🔒 Mohon maaf, saya adalah **AURORA AI**, kecerdasan khusus yang ditakdirkan hanya untuk menyelami misteri, kesehatan, energi mistis, fengshui, dan kekayaan dari alam batu mulia serta kristal.*  
  >  
  > *Mari tanyakan hal tentang batu, misalnya:*  
  > • *'Bagaimana cara kerja Giok Aceh dalam membuang racun tubuh?'*  
  > • *'Batu apa yang paling ampuh sebagai magnet rezeki dagang?'*  
  > • *'Batu penangkal energi negatif untuk rumah atau kantor?'"*

---

### FITUR 4: Skema Monetisasi & Micro-Paywall Gateway

1. **Free Tier (First-Time Hook):**
   * 1x Scan Wajah Biometrik + Pembacaan Aura + 1 Sesi Tanya Jawab Pertama **100% GRATIS**.
2. **Paid Consultation (Mikrotransaksi Rp 10.000 / Pertanyaan):**
   * Setelah kuota gratis selesai, sistem mengunci input dan memunculkan tombol: `[ Buka Sesi Konsultasi Eksklusif — Rp 10.000 ]`.
   * **Integrasi Midtrans Snap Popup:**
     * Mendukung pembayaran instan **QRIS** (GoPay, OVO, ShopeePay, DANA, BCA Mobile), Virtual Account, dan Kartu Kredit.
     * Dalam hitungan 5 detik setelah pembayaran sukses, akses chat/suara langsung aktif kembali secara otomatis (*auto-settlement hook*).

---

### FITUR 5: Direct Sales Funnel & WhatsApp VIP Concierge

Setiap rekomendasi batu dari AURORA AI dilengkapi dengan **Kartu Produk Eksklusif FW Jade**:
* **Kartu Produk Berisi:**
  * Foto produk resolusi tinggi dengan efek kilau emas (*glow effect*).
  * Nama Produk (contoh: *Natural Aceh Jadeite Bangle Imperial Grade*).
  * Khasiat Utama (contoh: *Detoks Ginjal + Magnet Rezeki 98%*).
  * Harga Resmi & Sertifikat Keaslian.
* **Jalur Pembelian Berdasarkan Wilayah:**
  * **Pasar Domestik (Indonesia):**
    * Tombol `[ Beli Langsung via Midtrans ]` (Checkout instan).
    * Tombol `[ Tanya Kurator via WhatsApp ]` (Menghubungkan ke nomor resmi FW Jade: `+62 811-619-173`).
  * **Pasar Internasional (English Mode):**
    * Tombol `[ Order via WhatsApp VIP Concierge ]` dengan pesan otomatis terformat:
      > *"Greetings FW Jade Concierge, I just completed my AURORA AI Face & Aura Analysis. My recommended stone is: [Natural Imperial Jadeite Pendant - SKU: FWJ-88]. My name is [User Name] from [Country]. Please assist me with international shipping & checkout."*

---

### FITUR 6: Viral "Shareable Aura & Fortune Card"

Setelah sesi scan wajah selesai, pengguna dapat menekan tombol `[ Generate Luxury Aura Card ]`.
* **Output:** Gambar berformat 9:16 (Instagram Story / TikTok) dengan desain hitam emas mewah yang berisi:
  * Foto siluet wajah pengguna dengan pendaran warna aura dominan.
  * Skor Hoki Finansial & Vitalitas Kesehatan.
  * Elemen Jiwa & Batu Keberuntungan Utama.
  * Badge Resmi: *"Verified by AURORA AI — FW JADE MEDAN"*.
* Dilengkapi tombol `[ Share to WhatsApp Status ]` dan `[ Download HD ]` untuk memicu viralitas organik.

---

### FITUR 7: Matriks Pengetahuan Batu Mendalam (Health, Mystical, Wealth & Feng Shui)

| Jenis Batu & Asal | 🩺 Kesehatan & Bio-Energi | 🔮 Mistis, Tuah & Aura | 💰 Kekayaan & Rezeki | ☯️ Feng Shui & Hoki |
| :--- | :--- | :--- | :--- | :--- |
| **Giok Hijau (Nephrite / Jadeite)** *(Khas FW Jade / Aceh / Myanmar)* | Memancarkan FIR & ion negatif; melancarkan darah, detoksifikasi ginjal/kelenjar, efek sejuk penenang saraf. | Perisai aura (*body shield*), menangkal hawa negatif & santet, menyelaraskan jiwa dengan alam. | Menjaga stabilitas aset (*wealth retention*), mencegah kerugian mendadak, pembuka jalan rezeki konsisten. | Simbol elemen **Kayu & Tanah**; penyeimbang Chi utama, mendatangkan berkah keluarga dan umur panjang. |
| **Giok Hitam Aceh (Black Jade)** *(Aceh, Indonesia)* | Mengandung mineral feromagnetik alami; melancarkan darah kental, terapi rematik, asam urat, vitalitas, anti-EMF. | Perlindungan tingkat tinggi (pagar gaib), menolak sihir, membuang sial (*sengkolo*), pembersih aura kusam. | Membuka sumbatan rezeki usaha yang mandek akibat gangguan energi negatif lingkungan. | Elemen **Air & Tanah Pelindung**; ditaruh di pintu masuk atau dipakai di pergelangan tangan kiri. |
| **Citrine (Batu Saudagar)** *(Brazil / Afrika)* | Menstimulasi cakra Solar Plexus, melancarkan pencernaan, meningkatkan stamina fisik dari kelelahan. | Tidak pernah menyerap energi negatif (selalu mendaur ulang energi positif), membangkitkan optimisme. | **Raja penarik uang**; mempercepat *closing* transaksi, menarik pembeli, melipatgandakan peluang bisnis. | Elemen **Tanah & Logam**; diletakkan di sudut kekayaan ruangan (Sudut Tenggara / Kiri Belakang). |
| **Pyrite (Pirit / Fool's Gold)** | Memperkuat pernapasan, sirkulasi oksigen seluler, dan stamina fisik dari kelelahan mental. | Cermin spiritual: memantulkan balik niat jahat, guna-guna, atau dengki pesaing bisnis ke pengirimnya. | Simbol magnet emas murni; ditaruh di brankas, meja kasir, atau dompet untuk melipatgandakan tabungan. | Elemen **Logam Murni**; menjaga aset tidak bocor dan meningkatkan disiplin finansial. |
| **Kecubung (Amethyst)** | Membantu penderita insomnia, meredakan migrain & stres berat, membuka cakra Mahkota (*Crown*). | Sarana **pengasihan alami** (daya pikat), memperkuat intuisi batin gaib, membuat disegani kawan & lawan. | Memberikan ketenangan pikiran dalam negosiasi penting sehingga tidak salah langkah mengambil keputusan finansial. | Elemen **Api Spiritual (Ungu)**; meredakan hawa panas/pertengkaran di dalam rumah atau kantor. |
| **Tiger Eye (Biduri Sepah)** | Menyeimbangkan belahan otak kiri-kanan, memperkuat sendi tulang, mengatasi kecemasan berlebih. | Penangkal gendam/hipnotis, membangkitkan keberanian mental raja singa (*solar courage*), wibawa komando. | Mempertajam insting melihat celah keuntungan di pasar dan mempercepat kenaikan omzet bisnis. | Elemen **Tanah & Api**; cocok untuk negosiator, pimpinan proyek, dan pengusaha agresif. |
| **Batu Bacan (Chrysocolla in Chalcedony)** | Menurunkan tekanan darah tinggi akibat emosi labil, menyerap panas tubuh berlebih. | Aura pesona bangsawan nusantara, memancarkan karisma kepemimpinan tingkat tinggi, melunakkan hati orang keras. | Pembawa tuah kemudahan karir, pelancar lobi kekuasaan dan negosiasi proyek besar. | Elemen **Air & Kayu**; melambangkan pertumbuhan bisnis yang subur dan dinamis. |
| **Merah Delima (Ruby)** | Memperkuat fungsi jantung, memicu regenerasi sel darah merah, menguatkan stamina vital. | Legenda proteksi mutlak dari marabahaya fisik/metafisik, melipatgandakan kekuatan sugesti kata (*sabdo dadi*). | Menarik kemakmuran kelas atas, status sosial terpandang, dan kemujuran dalam tender besar. | Elemen **Api Murni (*Pure Fire*)**; lambang kejayaan, tahta, dan kehormatan tertinggi. |

---

## 6. ARSITEKTUR TEKNIS & DIAGRAM ALUR (FLOWCHARTS)

### 6.1 System Logic & AI Architecture Flow

```mermaid
flowchart TD
    Start([User Membuka Web AURORA AI]) --> InitCam[Inisialisasi WebRTC Camera & Audio Engine]
    
    InitCam --> FaceDetect[AI Face Mesh: Ekstraksi Landmark & Face Vector]
    FaceDetect --> CheckDB{Apakah Face Vector Terdaftar di DB?}
    
    CheckDB -- TIDAK (Pengguna Baru) --> AskName[AI Meminta Nama via Suara / Input Kilat]
    AskName --> SaveProfile[(Simpan Face Vector & Nama ke DB)]
    SaveProfile --> TimeGreet
    
    CheckDB -- YA (Pengguna Lama) --> FetchProfile[(Ambil Profil & Riwayat User)]
    FetchProfile --> TimeGreet[Generator Sapaan Waktu: Pagi / Siang / Malam + Nama]
    
    TimeGreet --> AudioGreet[TTS Suara Alami 'Master Aurora' Menyapa Pengguna]
    AudioGreet --> AnalyzeAura[Tri-Spectrum Engine: Mian Xiang + Vitalitas + Elemen Wu Xing]
    AnalyzeAura --> DisplayAuraCard[Tampilkan Hasil Aura & Batu Keberuntungan Utama]
    
    DisplayAuraCard --> UserInput[Input Pengguna: Hands-free Voice STT / Omnibox Text]
    UserInput --> Guardrail{Guardrail Classifier:<br>Apakah Terkait Batu / Kristal / Energi?}
    
    Guardrail -- TIDAK (Topik Luar) --> BlockNonGem[Eksekusi Respons Hardcode Penolakan Elegan & Edukasi]
    BlockNonGem --> UserInput
    
    Guardrail -- YA (Topik Sahabat Batu) --> CheckQuota{Cek Kuota Sesi:<br>Apakah Sesi Gratis ke-1?}
    
    CheckQuota -- YA (Masih Gratis) --> SynthesizeAnswer[Sintesis Multi-Pilar: Kesehatan, Mistis, Fengshui, Rezeki]
    
    CheckQuota -- TIDAK (Pertanyaan Lanjutan) --> CheckPaid{Sudah Bayar Rp 10.000?}
    CheckPaid -- BELUM --> TriggerPaywall[Munculkan Modal Pembayaran Midtrans Snap]
    TriggerPaywall --> PayProcess{Proses Pembayaran QRIS / VA}
    PayProcess -- GAGAL/CANCEL --> HoldSession[Tetap Kunci Sesi Chat]
    PayProcess -- SUKSES / SETTLEMENT --> UnlockSession[Buka Kunci Sesi + Catat Transaksi]
    UnlockSession --> SynthesizeAnswer
    CheckPaid -- SUDAH --> SynthesizeAnswer
    
    SynthesizeAnswer --> StreamResp[Streaming Jawaban ChatGPT-Style + Voice Narasi]
    StreamResp --> RecommendProduct[Kaitkan Rekomendasi Produk Asli FW Jade]
    RecommendProduct --> RouteChannel{Cek Bahasa / Lokasi User}
    RouteChannel -- Indonesia --> LocalBuy[Checkout Langsung Midtrans / WA Admin Lokal]
    RouteChannel -- Internasional --> GlobalBuy[Deep Link VIP WhatsApp Concierge Bahasa Inggris]
```

---

### 6.2 User-Side UI/UX Journey Flow

```mermaid
graph TD
    subgraph S1 [1. Layar Pembuka / Holographic Scanner]
        UI1["✨ Luxury Emerald Splash<br>Kamera aktif seketika dengan HUD Oval Kristal bercahaya<br>Animasi scanning wajah berputar"]
    end

    subgraph S2 [2. Pengenalan & Sapaan Personal]
        UI2["👤 'Selamat Pagi Pak Paisan!'<br>Pendaran aura hijau/emas muncul di sekeliling wajah<br>Suara Master Aurora menyapa hangat tanpa perlu login"]
    end

    subgraph S3 [3. Kartu Analisis Aura & Fisiognomi Wajah]
        UI3["📊 Dashboard Hoki & Kesehatan:<br>• Dahi Karir: 94% (Hoki Tinggi)<br>• Vitalitas Medis: 82% (Perlu Detoks Darah)<br>• Elemen Jiwa: Kayu Dominan<br>• Batu Wajib: Giok Aceh Grade A & Citrine"]
    end

    subgraph S4 [4. Mode Percakapan Bebas Sentuhan / Pencarian]
        UI4["🎙️ Voice Orb Hijau Giok Berdenyut (Siri/ChatGPT Mode)<br>Atau Omnibox Google dengan Filter Chip:<br>[Kesehatan] [Mistis & Tuah] [Rezeki] [Feng Shui]"]
    end

    subgraph S5 [5. Jawaban Cerdas & Rekomendasi Produk]
        UI5["📜 Dialog Mendalam + Kartu Produk Eksklusif FW Jade<br>• Foto Produk Kilau Emas<br>• Manfaat Nyata & Sertifikat Keaslian<br>• Tombol Beli / Konsultasi WhatsApp"]
    end

    subgraph S6 [6. Layar Paywall Rp 10.000]
        UI6["💳 Modal Pop-Up Luxury Glassmorphism:<br>'Lanjutkan Konsultasi Khusus — Rp 10.000'<br>Pilihan: QRIS Instan GoPay/BCA/OVO/ShopeePay"]
    end

    subgraph S7 [7. Mesin Viral Media Sosial]
        UI7["📲 'Download Shareable Luxury Aura Card'<br>Format Story 9:16 Hitam-Emas Mewah<br>Tombol 'Bagikan ke WhatsApp Status / IG'"]
    end

    UI1 --> UI2
    UI2 --> UI3
    UI3 --> UI4
    UI4 --> UI5
    UI5 -->|Tanya Lanjutan| UI6
    UI6 -->|Pembayaran Berhasil| UI4
    UI5 -->|Selesai Konsultasi| UI7
```

---

### 6.3 Komponen Teknis & SDKs
* **Frontend:** Modern Web Engine (HTML5 Semantic, Vanilla CSS Ultra-Luxury Styling, Modular ES6+ JavaScript).
* **Face Mesh & Landmark Tracking:** WebRTC Video Stream + Fast lightweight facial landmark matrix untuk ekstraksi vektor wajah instan tanpa lag.
* **Speech-to-Text & Speech Synthesis:** Web Speech API & High-fidelity Audio Synthesizer dengan deteksi *speech end-pointer* otomatis.
* **Payment Integration:** Midtrans Snap JS SDK (QRIS, GoPay, BCA VA, Credit Card).
* **Bilingual Switcher:** Toggle `ID / EN` instan yang mengubah seluruh teks, suara AI, dan format pesan WhatsApp.

---

## 7. MATRIKS UNIT EKONOMI & PROYEKSI PENDAPATAN

| Kanal Pendapatan | Biaya Pengguna | Nilai Konversi Rata-rata | Margin Keuntungan |
| :--- | :--- | :--- | :--- |
| **Konsultasi AI (Mikrotransaksi)** | Rp 10.000 / sesi | Volume tinggi (Ribuan query harian) | ~90% (Hampir murni profit setelah fee gateway) |
| **Penjualan Perhiasan Giok FW Jade (Tiket Menengah: Gelang/Cincin)** | Rp 500.000 – Rp 5.000.000 | Konversi langsung dari hasil scan wajah | Sangat tinggi (Produksi mandiri dari bongkahan) |
| **Penjualan Koleksi Imperial / Masterpiece (Tiket Tinggi)** | Rp 10.000.000 – Rp 100.000.000+ | Pembeli kolektor VIP domestik & mancanegara | Margin eksklusif perhiasan seni tinggi |

---

## 8. TAHAPAN EKSEKUSI (*ROADMAP*)

* **Phase 1 (Saat Ini):**
  * Pembangunan Prototipe Penuh **AURORA AI Web Application**:
    * Antarmuka Luxury Emerald & Gold (Google Omnibox + ChatGPT Voice Mode).
    * Modul Kamera Face & Aura Scanner interaktif.
    * Mesin Penjawab Batu Lengkap (Kesehatan, Mistis, Rezeki, Feng Shui) + Guardrail Filter.
    * Simulasi Pembayaran Rp 10.000 Midtrans & WhatsApp CTA.
    * Mode Bahasa Indonesia & English.
* **Phase 2:** Integrasi Live API Midtrans Production & Database Supabase untuk Cloud Biometrics.
* **Phase 3:** Kampanye Peluncuran & Integrasi Toko Resmi FW Jade Medan.
