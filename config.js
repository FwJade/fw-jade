/**
 * AURORA AI — Centralized Configuration & API Gateway Orchestrator
 * Memuat kredensial dari Environment Variables atau Fallback Defaults
 */

const AURORA_CONFIG = {
  // 1. Database Backend (Supabase)
  SUPABASE: {
    URL: window.ENV?.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co',
    ANON_KEY: window.ENV?.VITE_SUPABASE_ANON_KEY || 'your_anon_key_here',
    TABLES: {
      USERS: 'aurora_users',
      TRANSFERS: 'aurora_transactions',
      AURA_READINGS: 'aurora_readings'
    }
  },

  // 2. Payment Gateway (Midtrans Snap)
  MIDTRANS: {
    CLIENT_KEY: window.ENV?.VITE_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-demo12345678',
    IS_PRODUCTION: window.ENV?.VITE_MIDTRANS_IS_PRODUCTION === 'true' || false,
    SNAP_URL: (window.ENV?.VITE_MIDTRANS_IS_PRODUCTION === 'true')
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js'
  },

  // 3. Multi-Provider AI Fallback URLs & Models
  AI_PROVIDERS: {
    GEMINI: {
      KEY: window.ENV?.VITE_GEMINI_API_KEY || '',
      ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
    },
    GROQ: {
      KEY: window.ENV?.VITE_GROQ_API_KEY || '',
      ENDPOINT: 'https://api.groq.com/openai/v1/chat/completions',
      VISION_MODEL: 'llama-3.2-11b-vision-preview',
      TEXT_MODEL: 'llama-3.3-70b-versatile'
    },
    OPENROUTER: {
      KEY: window.ENV?.VITE_OPENROUTER_API_KEY || '',
      ENDPOINT: 'https://openrouter.ai/api/v1/chat/completions',
      MODEL: 'google/gemini-2.0-flash-exp:free'
    }
  },

  // 4. AI Image Transformation Generator (Before vs After)
  IMAGE_GENERATION: {
    // Menggunakan Pollinations AI Engine (100% Bebas Biaya & Otomatis)
    POLLINATIONS_BASE: 'https://image.pollinations.ai/prompt/',
    HF_TOKEN: window.ENV?.VITE_HF_API_TOKEN || ''
  },

  // 5. WhatsApp Hotline (FW JADE Medan)
  WHATSAPP: {
    NUMBER: '62811619173',
    NAME: 'FW JADE Medan'
  }
};

// Export to Global Scope
window.AURORA_CONFIG = AURORA_CONFIG;
