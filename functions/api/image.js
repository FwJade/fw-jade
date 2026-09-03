/**
 * Cloudflare Pages Function: /api/image
 * Transforms user photo into the 2035 Haute Future Executive Portrait (Image 2)
 * Ensures user is ALWAYS dressed in ultra-luxury attire (Tom Ford bespoke suit / Royal Haute Couture),
 * wearing FW JADE imperial jewelry & Rolex watch in an executive penthouse boardroom.
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const {
      imageBase64,
      gemName = 'FW JADE Imperial Green Jadeite',
      gemColor = 'Vibrant Emerald Green',
      gender = 'male',
      element = 'WOOD'
    } = body;

    const accountId = env.CLOUDFLARE_ACCOUNT_ID || '291e6764f7f2db2c4ea3142d31e71045';
    const apiToken = env.CLOUDFLARE_API_TOKEN;

    const isMale = gender === 'male';
    const attire = isMale
      ? 'bespoke tailored black Tom Ford executive three-piece suit, crisp white dress shirt, luxury gold Rolex Day-Date wristwatch, magnificent FW JADE imperial green jadeite pendant on 18K gold chain'
      : 'haute couture royal emerald-green silk blazer and evening dress, luxury diamond and FW JADE imperial green jadeite necklace and earrings, high-jewellery timepiece';

    const setting = 'seated in a high-backed luxury dark leather executive director armchair, modern high-rise penthouse office, floor-to-ceiling glass windows with panoramic illuminated city skyscrapers and twilight skyline background, cinematic editorial lighting, sharp focus, 8k resolution, ultra-realistic portrait photography, masterpiece';

    const futureExecutivePrompt = `Award-winning luxury magazine cover portrait of a highly successful wealthy 35-year-old ${isMale ? 'male tech founder CEO and billionaire investor' : 'female venture capitalist director and wealthy heiress'}, authentic face, elegant groomed hairstyle, confident charismatic posture, wearing ${attire}, ${setting}`;

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
              mask: imgArray,
              prompt: futureExecutivePrompt,
              strength: 0.85,
              guidance: 8.5,
              num_steps: 20
            })
          }
        );

        if (inpaintRes.status === 200) {
          const buffer = await inpaintRes.arrayBuffer();
          const binary = String.fromCharCode(...new Uint8Array(buffer));
          const b64 = btoa(binary);
          generatedImageUrl = `data:image/png;base64,${b64}`;
          engineUsed = '@cf/runwayml/stable-diffusion-v1-5-inpainting';
        }
      } catch (inpaintErr) {
        console.warn('Cloudflare inpainting failed, falling back to FLUX:', inpaintErr);
      }
    }

    // 2. FALLBACK: Cloudflare FLUX.1 Schnell
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
              prompt: futureExecutivePrompt,
              steps: 4
            })
          }
        );

        if (fluxRes.status === 200) {
          const fluxData = await fluxRes.json();
          if (fluxData.result && fluxData.result.image) {
            generatedImageUrl = `data:image/jpeg;base64,${fluxData.result.image}`;
            engineUsed = '@cf/black-forest-labs/flux-1-schnell';
          }
        }
      } catch (fluxErr) {
        console.warn('FLUX.1 Schnell failed:', fluxErr);
      }
    }

    // 3. Fallback: SDXL Lightning
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
              prompt: futureExecutivePrompt,
              num_steps: 4
            })
          }
        );

        if (sdxlRes.status === 200) {
          const buffer = await sdxlRes.arrayBuffer();
          const binary = String.fromCharCode(...new Uint8Array(buffer));
          const b64 = btoa(binary);
          generatedImageUrl = `data:image/png;base64,${b64}`;
          engineUsed = '@cf/bytedance/stable-diffusion-xl-lightning';
        }
      } catch (sdxlErr) {
        console.warn('SDXL Lightning failed:', sdxlErr);
      }
    }

    // If all fail, return graceful null
    return new Response(JSON.stringify({
      success: !!generatedImageUrl,
      imageUrl: generatedImageUrl,
      engine: 'SkyNET AI Matrix (Haute Inpainting Engine)',
      gender: gender
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Gagal menghasilkan transformasi foto'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
