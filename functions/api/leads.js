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
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  // Helper to load leads from KV or memory
  async function getStoredLeads() {
    if (env && env.LEADS_KV) {
      try {
        const kvData = await env.LEADS_KV.get('leads_db', 'json');
        if (Array.isArray(kvData)) return kvData;
      } catch (e) {
        console.warn('KV read error:', e);
      }
    }
    return globalLeadsMemory;
  }

  // Helper to save leads to KV or memory
  async function saveStoredLeads(leads) {
    globalLeadsMemory = leads;
    if (env && env.LEADS_KV) {
      try {
        await env.LEADS_KV.put('leads_db', JSON.stringify(leads));
      } catch (e) {
        console.warn('KV write error:', e);
      }
    }
  }

  // POST: Simpan atau Sinkronkan Lead Baru (Google Login / Form Step 1)
  if (method === 'POST') {
    try {
      const body = await request.json();
      const { name, dob, zodiac, shio, phone, email, element, gemstone, price, picture, source } = body;

      if (!name && !email) {
        return new Response(JSON.stringify({ success: false, error: 'Nama atau Email wajib diisi' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      const cleanEmail = email && email !== '-' ? email.trim().toLowerCase() : null;
      const cleanName = name ? name.trim() : (cleanEmail ? cleanEmail.split('@')[0] : 'Pengguna FW JADE');

      let leadsList = await getStoredLeads();

      // Check if existing lead exists with same id, email or phone
      let existingIdx = -1;
      if (body.id) {
        existingIdx = leadsList.findIndex(l => l.id === body.id);
      }
      if (existingIdx === -1 && cleanEmail) {
        existingIdx = leadsList.findIndex(l => l.email && l.email.toLowerCase() === cleanEmail);
      } else if (existingIdx === -1 && phone && phone !== '-') {
        existingIdx = leadsList.findIndex(l => l.phone && l.phone === phone.trim());
      }

      const leadRecord = {
        id: existingIdx >= 0 ? leadsList[existingIdx].id : (body.id || 'lead-' + Date.now()),
        timestamp: (existingIdx >= 0 && leadsList[existingIdx].timestamp) ? leadsList[existingIdx].timestamp : new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        updatedAt: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        name: cleanName,
        dob: dob && dob !== '-' ? dob : (existingIdx >= 0 ? leadsList[existingIdx].dob : '-'),
        zodiac: zodiac && zodiac !== '-' ? zodiac : (existingIdx >= 0 ? leadsList[existingIdx].zodiac : '-'),
        shio: shio && shio !== '-' ? shio : (existingIdx >= 0 ? leadsList[existingIdx].shio : '-'),
        element: element && element !== '-' ? element : (existingIdx >= 0 ? leadsList[existingIdx].element : 'WOOD'),
        phone: phone && phone !== '-' ? phone.trim() : (existingIdx >= 0 ? (leadsList[existingIdx].phone || '-') : '-'),
        email: cleanEmail || (existingIdx >= 0 ? leadsList[existingIdx].email : '-'),
        gemstone: gemstone || (existingIdx >= 0 ? leadsList[existingIdx].gemstone : 'Natural Aceh Jadeite'),
        price: price || (existingIdx >= 0 ? leadsList[existingIdx].price : 'Rp 1.850.000'),
        picture: picture || (existingIdx >= 0 ? leadsList[existingIdx].picture : ''),
        notes: body.notes || (existingIdx >= 0 ? (leadsList[existingIdx].notes || '') : ''),
        source: source || (existingIdx >= 0 ? (leadsList[existingIdx].source || 'Website') : 'Website'),
        status: body.status || (existingIdx >= 0 ? (leadsList[existingIdx].status || 'Prospek Baru') : 'Prospek Baru')
      };

      if (existingIdx >= 0) {
        leadsList[existingIdx] = { ...leadsList[existingIdx], ...leadRecord };
      } else {
        leadsList.unshift(leadRecord);
      }

      await saveStoredLeads(leadsList);

      return new Response(JSON.stringify({
        success: true,
        message: 'Data prospek berhasil dicatat di Master Vault',
        leadId: leadRecord.id,
        totalLeads: leadsList.length
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

  // DELETE: Hapus Lead Tertentu oleh Admin
  if (method === 'DELETE') {
    try {
      const url = new URL(request.url);
      const adminEmail = url.searchParams.get('admin');
      const leadId = url.searchParams.get('id');

      if (!adminEmail || adminEmail.toLowerCase() !== 'fwjade.com@gmail.com') {
        return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 403, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }

      let leadsList = await getStoredLeads();
      if (leadId) {
        leadsList = leadsList.filter(l => l.id !== leadId);
        await saveStoredLeads(leadsList);
      }

      return new Response(JSON.stringify({ success: true, leads: leadsList, totalLeads: leadsList.length }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
  }

  // GET: Ambil Daftar Leads untuk Admin (fwjade.com@gmail.com)
  if (method === 'GET') {
    const url = new URL(request.url);
    const adminEmail = url.searchParams.get('admin');

    // Admin Verification
    if (adminEmail && adminEmail.toLowerCase() === 'fwjade.com@gmail.com') {
      const leadsList = await getStoredLeads();

      // Calculate order frequency per phone / email to track VIP
      const identCounts = {};
      leadsList.forEach(l => {
        const key = (l.email && l.email !== '-') ? l.email : l.phone;
        if (key && key !== '-') {
          identCounts[key] = (identCounts[key] || 0) + 1;
        }
      });

      const enrichedLeads = leadsList.map(l => {
        const key = (l.email && l.email !== '-') ? l.email : l.phone;
        const count = (key && identCounts[key]) ? identCounts[key] : 1;
        return {
          ...l,
          ordersCount: count,
          isVip: count > 2,
          tier: count > 2 ? 'Imperial Patron VIP (15% Disc)' : 'Collector'
        };
      });

      return new Response(JSON.stringify({
        success: true,
        role: 'Master Admin',
        totalLeads: enrichedLeads.length,
        leads: enrichedLeads
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
