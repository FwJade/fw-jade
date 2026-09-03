const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read .env file
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.substring(0, idx).trim();
          const val = trimmed.substring(idx + 1).trim();
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  }
} catch (e) {}

// Prefer CLOUDFLARE_PAGES_DEPLOY_TOKEN for Pages deploy
process.env.CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_PAGES_DEPLOY_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
process.env.CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '291e6764f7f2db2c4ea3142d31e71045';

console.log('[DEPLOY] Starting Cloudflare Pages Direct Production Deployment for fwjade.com...');
try {
  execSync('npx wrangler pages deploy . --project-name fwjade --branch main --commit-dirty=true', {
    stdio: 'inherit',
    env: process.env
  });
  console.log('[DEPLOY] ✅ Production Deployment to Cloudflare Pages & fwjade.com SUCCEEDED!');
} catch (err) {
  console.error('[DEPLOY] ❌ Deployment failed:', err.message);
  process.exit(1);
}
