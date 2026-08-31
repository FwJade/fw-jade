/**
 * Cloudflare Pages Function: /api/vision
 * Powered by Cloudflare Workers AI (@cf/meta/llama-3.2-11b-vision-instruct)
 * Multimodal Face & Aura Scanner (Mian Xiang 12 Palaces, Vitality, Chi & Gemstone Matcher)
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

    // Clean base64 string if it contains data URL prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const accountId = env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = env.CLOUDFLARE_API_TOKEN;

    const prompt = `Anda adalah Master Aura Vision AI Pakar Mian Xiang (Fisiognomi Wajah Tionghoa), Aura Chi, dan Gemologi AURA AI by FW JADE Medan.
Analisis foto wajah pengguna ini dan berikan output JSON yang valid (HANYA JSON, tanpa markdown backticks atau teks tambahan):
{
  "element": "WOOD" | "FIRE" | "WATER" | "EARTH" | "METAL",
  "element_id": "Kayu (Wood / 木)" | "Api (Fire / 火)" | "Air (Water / 水)" | "Tanah (Earth / 土)" | "Logam (Metal / 金)",
  "alignmentScore": 88-99,
  "vitality": 85-98,
  "energyBalance": "Optimal" | "Tinggi" | "Harmonis",
  "fortuneLevel": "Sangat Tinggi" | "Meningkat" | "Puncak Kemakmuran",
  "energyReco": "Saran ringkas pemeliharaan energi",
  "recommendedGemId": "giok-aceh" | "black-jade" | "citrine" | "kecubung",
  "mianXiangAnalysis": {
    "forehead": "Analisis dahi/istana karier",
    "nose": "Analisis hidung/istana rezeki",
    "eyesCheek": "Analisis mata & pipi/istana vitalitas",
    "chin": "Analisis dagu/istana perisai"
  },
  "whisperGreeting": "Sapaan pembacaan aura personal yang hangat dalam bahasa Indonesia"
}`;

    let visionResult = null;
    let usedModel = 'seed-fallback';

    // 1. High-Accuracy: Google Gemini 3.6 Flash Vision
    const geminiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: prompt },
                    {
                      inlineData: {
                        mimeType: 'image/jpeg',
                        data: cleanBase64
                      }
                    }
                  ]
                }
              ],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.3
              }
            })
          }
        );

        if (geminiRes.ok) {
          const gData = await geminiRes.json();
          const rawText = gData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            visionResult = JSON.parse(rawText);
            usedModel = 'gemini-3.6-flash';
          }
        }
      } catch (gemErr) {
        console.warn('Gemini Vision API error, falling back:', gemErr);
      }
    }

    // 2. Fallback: Cloudflare Workers AI Vision (@cf/meta/llama-3.2-11b-vision-instruct)
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
              max_tokens: 800
            })
          }
        );

        const cfData = await cfRes.json();
        if (cfData.success && cfData.result) {
          const rawText = cfData.result.response || cfData.result.description || '';
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            visionResult = JSON.parse(jsonMatch[0]);
            usedModel = '@cf/meta/llama-3.2-11b-vision-instruct';
          }
        }
      } catch (e) {
        console.warn('Cloudflare Vision model API call error:', e);
      }
    }

    // Dynamic Seed-based Fallback if AI quota or vision parsing drops
    if (!visionResult) {
      const elements = [
        { el: 'WOOD', name: 'Kayu (Wood / 木)', gem: 'giok-aceh', reco: 'Menjaga pertumbuhan, relaksasi pikiran, dan stabilitas rezeki' },
        { el: 'WATER', name: 'Air & Bumi (Water / 水)', gem: 'black-jade', reco: 'Detoksifikasi sirkulasi darah dan perlindungan perisai aura' },
        { el: 'EARTH', name: 'Bumi & Logam (Earth / 土)', gem: 'citrine', reco: 'Mengunci magnet rezeki, kelancaran transaksi dagang & modal' },
        { el: 'FIRE', name: 'Api & Jiwa (Fire / 火)', gem: 'kecubung', reco: 'Meredakan stres tidur, meningkatkan karisma wibawa batin' }
      ];
      // Pick based on timestamp variation
      const pick = elements[Date.now() % elements.length];
      const score = 92 + (Date.now() % 7);
      const vit = 88 + (Date.now() % 9);

      visionResult = {
        element: pick.el,
        element_id: pick.name,
        alignmentScore: score,
        vitality: vit,
        energyBalance: 'Optimal',
        fortuneLevel: 'Tinggi & Terbuka',
        energyReco: pick.reco,
        recommendedGemId: pick.gem,
        mianXiangAnalysis: {
          forehead: 'Pancaran dahi menunjukkan fokus strategis dan intuisi kepemimpinan yang sedang menguat.',
          nose: 'Cuping dan batang hidung memancarkan chi kemakmuran yang sangat terbuka.',
          eyesCheek: 'Rona sirkulasi di area mata dan pipi menunjukkan kepekaan spiritual tinggi.',
          chin: 'Garis rahang dan dagu menunjukkan stabilitas pendirian yang kokoh dan perisai alami.'
        },
        whisperGreeting: `Aura wajah Anda selaras dengan elemen ${pick.name} di angka ${score} persen. Energi Anda sangat harmonis dan siap menerima gelombang kemakmuran.`
      };
    }

    return new Response(JSON.stringify({
      success: true,
      model: usedModel,
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
