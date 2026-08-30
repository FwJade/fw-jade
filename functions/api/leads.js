/**
 * Cloudflare Pages Function: /api/leads
 * Lead Generation Storage & Admin Dashboard Gateway
 * Master Administrator: fwjade.com@gmail.com
 */

// In-memory global fallback storage for Edge workers
let globalLeadsMemory = [
  {
    id: 'lead-1',
    timestamp: '2026-08-30 11:30',
    name: 'Faisal Paisan',
    dob: '1988-06-18',
    zodiac: 'Gemini',
    shio: 'Naga (Dragon)',
    element: 'WOOD',
    phone: '+62811619173',
    email: 'kolektor.medan@gmail.com',
    gemstone: 'Natural Aceh Jadeite',
    price: 'Rp 1.850.000',
    status: 'Hot Lead'
  }
];

export async function onRequest(context) {
  const { request, env } = context;
  const method = request.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  // POST: Simpan Lead Baru dari Form Pre-Scan
  if (method === 'POST') {
    try {
      const body = await request.json();
      const { name, dob, zodiac, shio, phone, email, element, gemstone, price } = body;

      if (!name || !phone) {
        return new Response(JSON.stringify({ success: false, error: 'Nama dan No. WhatsApp wajib diisi' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      const newLead = {
        id: 'lead-' + Date.now(),
        timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        name: name.trim(),
        dob: dob || '-',
        zodiac: zodiac || '-',
        shio: shio || '-',
        element: element || 'WOOD',
        phone: phone.trim(),
        email: email ? email.trim() : '-',
        gemstone: gemstone || 'Natural Aceh Jadeite',
        price: price || 'Rp 1.850.000',
        status: 'New'
      };

      // Add to memory
      globalLeadsMemory.unshift(newLead);

      return new Response(JSON.stringify({
        success: true,
        message: 'Data spiritual Anda telah tersimpan dengan aman',
        leadId: newLead.id
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }

  // GET: Ambil Daftar Leads untuk Admin (fwjade.com@gmail.com)
  if (method === 'GET') {
    const url = new URL(request.url);
    const adminEmail = url.searchParams.get('admin');

    // Admin Verification
    if (adminEmail && adminEmail.toLowerCase() === 'fwjade.com@gmail.com') {
      return new Response(JSON.stringify({
        success: true,
        role: 'Master Admin',
        totalLeads: globalLeadsMemory.length,
        leads: globalLeadsMemory
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'Akses ditolak. Khusus Master Administrator fwjade.com@gmail.com'
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
