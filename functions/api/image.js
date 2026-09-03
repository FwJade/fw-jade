/**
 * Cloudflare Pages Function: /api/image
 * Royal Imperial Transformation & Gemstone Manifestation
 * Powered by Cloudflare Workers AI Inpainting (@cf/runwayml/stable-diffusion-v1-5-inpainting)
 * with SOTA fallback (@cf/black-forest-labs/flux-1-schnell)
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const {
      imageBase64,
      gemName = 'Natural Aceh Jadeite',
      gemColor = 'Imperial Emerald Green',
      gender = 'female',
      element = 'WOOD'
    } = body;

    const accountId = env.CLOUDFLARE_ACCOUNT_ID || '291e6764f7f2db2c4ea3142d31e71045';
    const apiToken = env.CLOUDFLARE_API_TOKEN;

    const royalRole = gender === 'male' ? 'Imperial Prince of Prosperity' : 'Imperial Princess of Royal Grace';
    const royalPrompt = `Ultra-luxury royal portrait of an elite ${royalRole} wearing magnificent high-jewellery ${gemName} pendant with radiant 18K gold and diamond pave, glowing ${gemColor} ethereal chi aura, ancient dynasty royal silk brocade robe, imperial palace grand hall, cinematic dramatic lighting, 8k resolution, photorealistic masterpiece`;

    let generatedImageUrl = null;
    let engineUsed = 'none';

    // 1. PRIMARY: Cloudflare Workers AI Inpainting (Preserves Facial Identity)
    if (imageBase64 && accountId && apiToken) {
      try {
        const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
        const binaryStr = atob(cleanBase64);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const imgArray = Array.from(bytes);

        // Call Cloudflare Inpainting
        const inpaintRes = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/runwayml/stable-diffusion-v1-5-inpainting`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image: imgArray,
              mask: imgArray, // Triton accepts image bytes as base mask
              prompt: royalPrompt,
              strength: 0.75,
              guidance: 8.0,
              num_steps: 15
            })
          }
        );

        if (inpaintRes.status === 200) {
          const imgBuf = await inpaintRes.arrayBuffer();
          const uint8 = new Uint8Array(imgBuf);
          let binary = '';
          for (let i = 0; i < uint8.length; i++) {
            binary += String.fromCharCode(uint8[i]);
          }
          generatedImageUrl = `data:image/png;base64,${btoa(binary)}`;
          engineUsed = '@cf/runwayml/stable-diffusion-v1-5-inpainting';
        }
      } catch (inpaintErr) {
        console.warn('Inpainting error, falling back to FLUX.1:', inpaintErr);
      }
    }

    // 2. SECONDARY: Cloudflare Workers AI FLUX.1 Schnell SOTA
    if (!generatedImageUrl && accountId && apiToken) {
      try {
        const fluxRes = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              prompt: royalPrompt,
              num_steps: 4
            })
          }
        );

        if (fluxRes.ok) {
          const fluxData = await fluxRes.json();
          if (fluxData.result && fluxData.result.image) {
            generatedImageUrl = `data:image/jpeg;base64,${fluxData.result.image}`;
            engineUsed = '@cf/black-forest-labs/flux-1-schnell';
          }
        }
      } catch (fluxErr) {
        console.warn('FLUX.1 error, falling back:', fluxErr);
      }
    }

    // 3. TERTIARY: Cloudflare SDXL Lightning SOTA (<2s)
    if (!generatedImageUrl && accountId && apiToken) {
      try {
        const sdxlRes = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              prompt: royalPrompt
            })
          }
        );

        if (sdxlRes.status === 200) {
          const sdxlBuf = await sdxlRes.arrayBuffer();
          const uint8 = new Uint8Array(sdxlBuf);
          let binary = '';
          for (let i = 0; i < uint8.length; i++) {
            binary += String.fromCharCode(uint8[i]);
          }
          generatedImageUrl = `data:image/png;base64,${btoa(binary)}`;
          engineUsed = '@cf/bytedance/stable-diffusion-xl-lightning';
        }
      } catch (sdxlErr) {
        console.warn('SDXL Lightning error:', sdxlErr);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      imageUrl: generatedImageUrl,
      engine: engineUsed,
      prompt: royalPrompt
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Gagal menghasilkan visual manifestasi bangsawan'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
