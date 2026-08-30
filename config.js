/**
 * AURA AI — Centralized Configuration & Edge AI Gateway Orchestrator
 * Powered by Cloudflare Pages Functions & Google Identity Services
 */

const AURA_CONFIG = {
  // 1. Google OAuth 2.0 Client ID (Official Google Cloud)
  GOOGLE_AUTH: {
    CLIENT_ID: '734583908123-ugbaqutk7pr713hmmbk03nnk1kij2hor.apps.googleusercontent.com',
    ADMIN_EMAIL: 'fwjade.com@gmail.com'
  },

  // 2. Edge AI Gateways (Cloudflare Pages Functions)
  EDGE_AI: {
    CHAT_ENDPOINT: '/api/chat',
    VISION_ENDPOINT: '/api/vision',
    IMAGE_ENDPOINT: '/api/image',
    LEADS_ENDPOINT: '/api/leads',
    MODELS: {
      TEXT: '@cf/meta/llama-3.3-70b-instruct',
      VISION: '@cf/meta/llama-3.2-11b-vision-instruct',
      IMAGE: '@cf/runwayml/stable-diffusion-v1-5-img2img'
    }
  },

  // 3. Database Backend (Supabase)
  SUPABASE: {
    URL: window.ENV?.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co',
    ANON_KEY: window.ENV?.VITE_SUPABASE_ANON_KEY || 'your_anon_key_here',
    TABLES: {
      USERS: 'aura_users',
      TRANSFERS: 'aura_transactions',
      AURA_READINGS: 'aura_readings'
    }
  },

  // 4. Payment Gateway (Midtrans Snap)
  MIDTRANS: {
    CLIENT_KEY: window.ENV?.VITE_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-demo12345678',
    IS_PRODUCTION: window.ENV?.VITE_MIDTRANS_IS_PRODUCTION === 'true' || false,
    SNAP_URL: (window.ENV?.VITE_MIDTRANS_IS_PRODUCTION === 'true')
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js'
  },

  // 5. Multi-Provider AI Fallback Pools
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

  // 6. AI Image Generation & Face Preservation
  IMAGE_GENERATION: {
    POLLINATIONS_BASE: 'https://image.pollinations.ai/prompt/',
    HF_TOKEN: window.ENV?.VITE_HF_API_TOKEN || ''
  },

  // 7. WhatsApp Hotline (FW JADE Medan)
  WHATSAPP: {
    NUMBER: '62811619173',
    NAME: 'FW JADE Medan'
  }
};

// Export to Global Scope
window.AURA_CONFIG = AURA_CONFIG;
window.AURORA_CONFIG = AURA_CONFIG; // Alias for backward compatibility
