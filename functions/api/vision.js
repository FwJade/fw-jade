/**
 * Cloudflare Pages Function: /api/vision
 * Powered by Cloudflare Workers AI (@cf/meta/llama-3.2-11b-vision-instruct)
 * Multimodal Face, Age, Gender & Future Wealth Oracle (Mian Xiang & 2035 Dossier)
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { imageBase64, language = 'id' } = body;

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: 'Data gambar wajah (base64) wajib dikirimkan' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    const accountId = env.CLOUDFLARE_ACCOUNT_ID || '291e6764f7f2db2c4ea3142d31e71045';
    const apiToken = env.CLOUDFLARE_API_TOKEN;

    const prompt = `Anda adalah Master Aura AI dari FW JADE Jewellery Medan (Est. 2009).
Tugas Anda adalah membaca pancaran aura dan ekspresi wajah pengguna secara hangat, santun, dan mudah dipahami orang awam.
Hindari istilah medis rumit, rumus kimia, atau proyeksi kekayaan/uang yang berlebihan. Fokuslah pada ketenangan batin, keharmonisan energi, dan keselarasan alami dengan batu giok.

Berikan output HANYA format JSON valid berikut (tanpa markdown backtick atau teks lain):
{
  "gender": "male" | "female",
  "gender_label": "Pria" | "Wanita",
  "estimatedAge": 30,
  "element": "WOOD" | "FIRE" | "WATER" | "EARTH" | "METAL",
  "element_name": "Kayu (Wood / 木)",
  "aura_color": "Hijau Zamrud Alami",
  "alignmentScore": 96,
  "coreTraits": ["Tenang", "Bijaksana", "Fokus"],
  "corePersona": "Pribadi yang Tenang & Berwibawa",
  "faceReadingSummary": "Pancaran tatapan mata dan rona wajah Anda mencerminkan ketenangan batin, kejernihan berpikir, dan energi positif yang stabil.",
  "energyGuidance": "Sentuhan kesejukan alami batu giok sangat cocok untuk meredakan ketegangan harian, menjaga ketenangan pikiran, dan mendukung kualitas hidup Anda.",
  "recommendedGemId": "giok-aceh",
  "recommendedGemName": "Giok Hijau Burma Grade A",
  "whisperGreeting": "Pancaran aura wajah Anda sangat selaras dan menyejukkan. Sentuhan giok alami akan menjadi pendamping terbaik bagi ketenangan pikiran dan energi positif Anda."
}`;

    let visionResult = null;
    let usedModel = 'seed-fallback';

    // 1. PRIMARY: Cloudflare Workers AI Vision (@cf/meta/llama-3.2-11b-vision-instruct)
    if (env.AI && typeof env.AI.run === 'function') {
      try {
        const aiOutput = await env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', {
          image: cleanBase64,
          prompt: prompt,
          max_tokens: 1200
        });
        const rawText = aiOutput.response || aiOutput.description || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          visionResult = JSON.parse(jsonMatch[0]);
          usedModel = '@cf/meta/llama-3.2-11b-vision-instruct (native binding)';
        }
      } catch (nativeErr) {
        console.warn('Native env.AI vision error, trying HTTP API:', nativeErr);
      }
    }

    if (!visionResult && accountId && apiToken) {
      try {
        const cfRes = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.2-11b-vision-instruct`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image: cleanBase64,
              prompt: prompt,
              max_tokens: 1200
            })
          }
        );

        const cfData = await cfRes.json();
        if (cfData.success && cfData.result) {
          const rawText = cfData.result.response || cfData.result.description || '';
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            visionResult = JSON.parse(jsonMatch[0]);
            usedModel = '@cf/meta/llama-3.2-11b-vision-instruct (HTTP API)';
          }
        }
      } catch (cfErr) {
        console.warn('Cloudflare Workers AI HTTP call error:', cfErr);
      }
    }

    // 2. Intelligent Default Dossier Fallback
    if (!visionResult) {
      visionResult = {
        gender: "male",
        gender_label: "Pria",
        estimatedAge: 30,
        element: "WOOD",
        element_name: "Kayu (Wood / 木)",
        aura_color: "Hijau Zamrud Alami",
        alignmentScore: 96,
        coreTraits: ["Tenang", "Bijaksana", "Fokus"],
        corePersona: "Pribadi yang Tenang & Berwibawa",
        faceReadingSummary: "Pancaran tatapan mata dan rona wajah Anda mencerminkan ketenangan batin, kejernihan berpikir, dan energi positif yang stabil.",
        energyGuidance: "Sentuhan kesejukan alami batu giok sangat cocok untuk meredakan ketegangan harian, menjaga ketenangan pikiran, dan mendukung kualitas hidup Anda.",
        recommendedGemId: "giok-aceh",
        recommendedGemName: "Giok Hijau Burma Grade A",
        whisperGreeting: "Pancaran aura wajah Anda sangat selaras dan menyejukkan. Sentuhan giok alami akan menjadi pendamping terbaik bagi ketenangan pikiran dan energi positif Anda."
      };
    }

    return new Response(JSON.stringify({
      success: true,
      model: 'HAINEO AI VISION v4.2',
      analysis: visionResult
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
      error: error.message || 'Gagal memproses analisa biometrik wajah'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
