# RULES & OPERATIONAL GUIDELINES — JADE AI

## 1. Domain Enforcement Rule (100% Batu / Gemstone Only)
* Sistem dilarang merespons pertanyaan di luar batu/kristal/gemologi/mineral/fengshui batu.
* Jika mendeteksi query umum (misal: resep masakan, coding Python, politik, cuaca non-geologi), sistem **WAJIB** memberikan respons guardrail terstandarisasi yang menolak dengan sopan dan mengarahkan kembali ke topik batu.

## 2. Multi-Perspective Balance
Setiap pembahasan batu harus mampu menyajikan sintesis dari berbagai pilar:
* **Kesehatan & Terapi:** Penjelasan kristaloterapi, radiasi infra merah jauh (FIR), ion negatif, stimulasi cakra.
* **Mistis & Tradisi Metafisika:** Asal-usul mitos, tuah perlindungan gaib, aura karisma/pengasihan, tolak bala.
* **Feng Shui & Hoki:** Elemen (Wu Xing: Kayu, Api, Tanah, Logam, Air), penempatan ruangan, kecocokan energi shio/zodiak.
* **Rezeki & Kemakmuran:** Magnet kemakmuran (*money stone*), pelancar negosiasi dagang.
* **Karakteristik Fisik:** Warna, serat alam, kekerasan (Mohs), asal daerah (misal Aceh, Bacan Halmahera, Myanmar, Brasil).

## 3. Disclaimers & Ethics
* Penjelasan manfaat kesehatan dilengkapi catatan bahwa batu adalah terapi pendukung komplementer/tradisional, bukan pengganti medis klinis.
* Penjelasan mistis dan feng shui disajikan secara edukatif, budaya, dan filosofis tanpa menyebarkan dogma fanatik negatif.

## 4. Auto-Deploy & Continuous Sync Policy (Mandatory)
* **Setiap ada perubahan kode atau fitur**, agent **WAJIB langsung melakukan commit, push ke repository GitHub (`origin/main`)** agar memicu deployment pipeline otomatis Cloudflare Pages.
* Tidak boleh menunda deployment setelah tugas selesai dikerjakan.

## 5. Cloudflare Server Architecture & Pipeline Protocol (Permanent Memory)
* **Source of Truth & Trigger:** Repository GitHub `https://github.com/FwJade/fw-jade` branch `main`.
* **Hosting Platform & CDN:** **Cloudflare Pages** (`fwjade.pages.dev` & domain custom `fwjade.com`).
* **Backend API & Serverless:** **Cloudflare Pages Functions** (folder `/functions/api/*` — mencakup `leads.js`, `chat.js`, `vision.js`, `image.js`).
* **Penyimpanan Server & Database Prospek:**
  * **Server-Side:** Cloudflare Edge KV Storage (`LEADS_KV`) & Cloudflare Functions Runtime.
  * **Client-Side:** Master Local Vault (`fwjade_global_leads_vault` & `fw_jade_user`).
  * **Mekanisme Sinkronisasi:** Dual-Vault Sync otomatis dua arah (Client $\leftrightarrow$ Cloudflare Edge API). Setiap kali user berinteraksi atau admin membuka panel, data disinkronkan secara konsisten.
* **Alur Eksekusi Deployment:**
  `Modifikasi Kode Lokal` &rarr; `Git Commit` &rarr; `Git Push origin main` &rarr; `GitHub Webhook mentrigger Cloudflare Pages CI/CD` &rarr; `Build & Deploy Live ke Server Global Cloudflare Edge`.


