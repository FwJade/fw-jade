/**
 * Cloudflare Pages Function: /api/image
 * Face-Consistent Image-to-Image & Gemstone Manifestation Transformation
 * Powered by Cloudflare Workers AI (@cf/runwayml/stable-diffusion-v1-5-img2img) + Pollinations Luxury Engine
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { imageBase64, gemName = 'Natural Aceh Jadeite', gemColor = 'Emerald Green', promptAdd = '' } = body;

    const accountId = env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = env.CLOUDFLARE_API_TOKEN;

    const luxuryPrompt = `Hyper-realistic portrait of the same person wearing an exquisite luxury ${gemName} pendant with glowing 18K gold bezel, radiant ${gemColor} ethereal aura, 8k resolution, cinematic studio lighting, photorealistic, elegant, Cartier high jewellery aesthetic`;

    let generatedImageUrl = null;

    // 1. Try Cloudflare Workers AI Img2Img if imageBase64 and credentials are provided
    if (imageBase64 && accountId && apiToken) {
      const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
      try {
        const cfRes = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/runwayml/stable-diffusion-v1-5-img2img`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image: cleanBase64,
              prompt: luxuryPrompt,
              strength: 0.45, // Preserves 55% original facial features/identity
              guidance: 7.5,
              num_steps: 20
            })
          }
        );

        if (cfRes.status === 200) {
          const imageBuffer = await cfRes.arrayBuffer();
          // Convert arrayBuffer to base64 data URL
          const uint8 = new Uint8Array(imageBuffer);
          let binary = '';
          for (let i = 0; i < uint8.length; i++) {
            binary += String.fromCharCode(uint8[i]);
          }
          const base64Out = btoa(binary);
          generatedImageUrl = `data:image/jpeg;base64,${base64Out}`;
        }
      } catch (e) {
        console.warn('CF Img2Img call fallback:', e);
      }
    }

    // 2. Fallback: High-resolution Pollinations AI Luxury Gem Engine
    if (!generatedImageUrl) {
      const seed = Math.floor(Math.random() * 1000000);
      const encodedPrompt = encodeURIComponent(`${luxuryPrompt}, master craftsmanship, clean luxury aesthetic`);
      generatedImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${seed}&nologo=true`;
    }

    return new Response(JSON.stringify({
      success: true,
      imageUrl: generatedImageUrl,
      prompt: luxuryPrompt
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
      error: error.message || 'Gagal menghasilkan visual manifestasi'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
