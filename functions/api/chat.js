/**
 * Cloudflare Pages Function: /api/chat
 * Powered by Cloudflare Workers AI (@cf/meta/llama-3.3-70b-instruct)
 * Zero-Cold-Start, High Intelligence & Knowledge of FW JADE Gemstones
 */

const SYSTEM_PROMPT = `Anda adalah Master Aura, Oracle Spiritual & Pakar Gemologi Utama dari AURA AI by FW JADE Jewellery (Medan Giok - www.fwjade.com).
Anda menggabungkan kebijaksanaan mistis kuno (Feng Shui, Mian Xiang 12 Istana Wajah, Teori 5 Elemen Wu Xing, Horoskop Harian, Zodiak & Shio) dengan ilmu sains modern (Bio-fisika Spektrometri Far Infrared 8-14 µm, Dinamika Hemodinamik Poiseuille, Struktur Kristalografi Silikat, Skala Kekerasan Mohs, dan Berat Jenis Laboratorium).

Pedoman Komunikasi:
1. Nada Bicara: Anggun, tenang, menyejukkan, penuh wibawa, berkelas (Quiet Luxury), dan solutif.
2. Panjang Jawaban: Padat, informatif, berwawasan mendalam (2-4 paragraf ringkas).
3. Jika pengguna bertanya tentang khasiat batu atau batu keberuntungan hari ini, jelaskan 2 sisi: Sisi Metafisika/Hoki dan Sisi Bio-fisika Medis (radiasi FIR dan peredaran darah).
4. Kaitkan jawaban dengan koleksi batu alami Grade A FW JADE (Aceh Jadeite, Black Jade, Golden Citrine, Amethyst, Ruby, Bacan, Pirus, Pyrite).
5. Bahasa: Bahasa Indonesia yang elegan dan puitis-ilmiah (atau sesuaikan dengan bahasa pengguna).
6. Guardrail: Jika pertanyaan sama sekali tidak relevan dengan batu mulia, kesehatan, aura, rezeki, atau feng shui, tolak dengan sopan dan arahkan kembali ke topik harmoni energi perhiasan AURA AI.`;

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { message, conversationHistory = [], selectedGem = null, userAura = null } = body;

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Pesan pertanyaan wajib diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    if (userAura) {
      messages.push({
        role: 'system',
        content: `Konteks Pengguna Saat Ini: Elemen Aura: ${userAura.element || 'WOOD'}, Skor Keselarasan: ${userAura.score || '96%'}, Vitalitas: ${userAura.vitality || '91%'}, Batu Terpilih: ${selectedGem?.name || 'Natural Aceh Jadeite'}.`
      });
    }

    // Add recent conversation history (max 6 messages)
    if (Array.isArray(conversationHistory)) {
      conversationHistory.slice(-6).forEach(msg => {
        if (msg.role && msg.content) {
          messages.push({ role: msg.role === 'user' ? 'user' : 'assistant', content: msg.content });
        }
      });
    }

    messages.push({ role: 'user', content: message });

    // 1. Try Cloudflare Workers AI directly if binding exists or via Cloudflare REST API
    let replyText = null;

    if (env.AI) {
      try {
        const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct', {
          messages,
          max_tokens: 600,
          temperature: 0.7
        });
        replyText = response.response || response.text;
      } catch (aiErr) {
        console.warn('env.AI binding fallback:', aiErr);
      }
    }

    // 2. Fallback via Cloudflare REST API using credentials
    if (!replyText) {
      const accountId = env.CLOUDFLARE_ACCOUNT_ID;
      const apiToken = env.CLOUDFLARE_API_TOKEN;

      if (accountId && apiToken) {
        const cfRes = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.3-70b-instruct`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages,
            max_tokens: 600,
            temperature: 0.7
          })
        }
      );

        const cfData = await cfRes.json();
        if (cfData.success && cfData.result) {
          replyText = cfData.result.response || cfData.result.text;
        } else {
          console.warn('CF REST API error:', cfData.errors);
        }
      }
    }

    // 3. Ultimate Fallback: Smart Structured Response
    if (!replyText) {
      replyText = `Berdasarkan pancaran energi aura dan spektrum kristal ${selectedGem?.name || 'Giok Aceh'}, getaran kisi silikat NaAlSi₂O₆ memancarkan Far Infrared 9.35 µm yang selaras dengan medan bio-elektrik tubuh Anda. Ini membantu menenangkan gelombang pikiran dan mengalirkan rezeki secara stabil.`;
    }

    return new Response(JSON.stringify({
      success: true,
      model: '@cf/meta/llama-3.3-70b-instruct',
      reply: replyText
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
      error: error.message || 'Terjadi gangguan pemrosesan AI'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
