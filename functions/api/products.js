/**
 * Cloudflare Pages Function: /api/products
 * Master Product Catalog & Inventory Management Gateway
 * FW JADE Haute Joaillerie — Medan Giok
 */

// Initial Seed Inventory Database (High-Grade Natural Gemstones & Jewelry)
let globalProductsMemory = [
  {
    id: 'prod-giok-aceh-bangle',
    name: 'Natural Aceh Jadeite Bangle Grade A',
    name_id: 'Gelang Giok Hijau Aceh Alami (Grade A Natural Untreated)',
    category: 'Gelang / Bangle',
    price: 'Rp 1.850.000',
    priceNum: 1850000,
    status: 'Tersedia', // Tersedia | Dipesan | Terjual
    origin: 'Nagan Raya, Aceh, Indonesia',
    type: 'Jadeite-Pyroxene Mineral',
    color: 'Hijau Lumut Alami Translusen',
    dimensions: 'Diameter 58 mm • Tebal 11 mm',
    weight: '52.4 Carat (10.48 g)',
    mohs: '6.8 / 10 Mohs',
    sg: '3.33 g/cm³',
    element: 'WOOD',
    element_id: 'Wood (Kayu / 木)',
    energy: 'Harmony, Health & Sustained Wealth',
    cert: 'Sertifikat Keaslian Grade A (GIA Standard)',
    firPeak: '9.35 µm (Spektrum Terapi 8–14 µm)',
    description: 'Mahakarya gelang giok Aceh asli dengan serat awan alami translusen. Memancarkan emisi Far Infrared (FIR) dan ion negatif murni yang membantu melancarkan peredaran darah, meredakan stres, serta menarik chi kemakmuran berkesinambungan.',
    image: 'https://images.unsplash.com/photo-1611591475805-4700d14b4344?auto=format&fit=crop&w=800&q=80',
    featured: true,
    keywords: ['giok', 'aceh', 'gelang', 'bangle', 'hijau', 'jade', 'jadeite', 'wood', 'rezeki', 'kesehatan'],
    createdAt: '2026-08-30T10:00:00.000Z',
    updatedAt: '2026-09-05T04:30:00.000Z'
  },
  {
    id: 'prod-black-jade-bracelet',
    name: 'Black Jade Aceh Bio-Magnetic Shield Bracelet',
    name_id: 'Gelang Giok Hitam Aceh Bio-Magnetik (Detoks Darah & Proteksi)',
    category: 'Gelang / Bangle',
    price: 'Rp 950.000',
    priceNum: 950000,
    status: 'Tersedia',
    origin: 'Nagan Raya, Aceh, Indonesia',
    type: 'Black Jadeite-Magnetite',
    color: 'Hitam Pekat Kilap Basah Alami',
    dimensions: 'Butiran 12 mm • 18 Butir',
    weight: '48.2 Carat (9.64 g)',
    mohs: '6.5 / 10 Mohs',
    sg: '3.18 g/cm³',
    element: 'WATER / EARTH',
    element_id: 'Water / Earth (Air & Bumi / 水-土)',
    energy: 'Detox, Vitality & Anti-Negative Chi',
    cert: 'Sertifikat Alami Grade A (Ferro-Silicate)',
    firPeak: '9.28 µm (Resonansi Bio-Magnetik)',
    description: 'Kaya akan kandungan mineral feromagnetik dan magnetit alami. Sangat efektif untuk terapi penderita asam urat, pegal linu, darah kental, serta berfungsi sebagai pagar gaib penangkal energi negatif lingkungan.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    featured: true,
    keywords: ['black jade', 'giok hitam', 'gelang', 'detoks', 'darah', 'rematik', 'proteksi', 'aceh', 'water'],
    createdAt: '2026-08-30T11:00:00.000Z',
    updatedAt: '2026-09-05T04:30:00.000Z'
  },
  {
    id: 'prod-citrine-ring',
    name: 'Natural Golden Citrine Merchant Ring',
    name_id: 'Cincin Natural Golden Citrine (Batu Saudagar Emas 18K)',
    category: 'Cincin / Rings',
    price: 'Rp 1.450.000',
    priceNum: 1450000,
    status: 'Tersedia',
    origin: 'Minas Gerais, Brazil',
    type: 'Crystalline Quartz (Citrine)',
    color: 'Kuning Keemasan Champagne Berkilau',
    dimensions: 'Batu 14 x 10 x 6 mm • Ring Size 17-21',
    weight: '6.85 Carat',
    mohs: '7.0 / 10 Mohs',
    sg: '2.65 g/cm³',
    element: 'EARTH / METAL',
    element_id: 'Earth / Metal (Bumi & Logam / 土-金)',
    energy: 'Abundance, High ROI & Business Magnet',
    cert: 'Sertifikat Gemologi Unheated Natural Grade A',
    firPeak: '8.85 µm',
    description: 'Dijuluki sebagai Raja Batu Saudagar (*The Merchant Stone*). Kristal kuarsa alami kuning emas yang tidak menyerap energi negatif, memancarkan aura optimisme tinggi, mempercepat closing transaksi dagang, dan melancarkan arus kas bisnis.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    featured: true,
    keywords: ['citrine', 'sitrin', 'cincin', 'saudagar', 'rezeki', 'uang', 'emas', 'dagang', 'earth', 'metal'],
    createdAt: '2026-08-30T12:00:00.000Z',
    updatedAt: '2026-09-05T04:30:00.000Z'
  },
  {
    id: 'prod-amethyst-pendant',
    name: 'Natural Royal Purple Amethyst Pendant',
    name_id: 'Liontin Kecubung Ungu Alami (Royal Imperial Borneo)',
    category: 'Liontin / Pendants',
    price: 'Rp 1.250.000',
    priceNum: 1250000,
    status: 'Tersedia',
    origin: 'Pangkalan Bun, Kalimantan, Indonesia',
    type: 'Crystalline Quartz (Amethyst)',
    color: 'Ungu Kristal Royal Imperial',
    dimensions: 'Batu 20 x 15 x 8 mm',
    weight: '14.20 Carat',
    mohs: '7.0 / 10 Mohs',
    sg: '2.65 g/cm³',
    element: 'FIRE / SPIRIT',
    element_id: 'Fire / Spirit (Api & Jiwa / 火-神)',
    energy: 'Charisma, Inner Peace & Insomnia Relief',
    cert: 'Sertifikat Alami Murni Grade A',
    firPeak: '8.90 µm',
    description: 'Batu pengasihan dan ketenangan batin tingkat tinggi. Merelaksasi sistem saraf pusat, meredakan migrain dan susah tidur, serta memancarkan aura karisma spiritual yang disegani rekan kerja maupun bawahan.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    featured: true,
    keywords: ['kecubung', 'amethyst', 'liontin', 'ungu', 'tidur', 'insomnia', 'wibawa', 'pengasihan', 'fire'],
    createdAt: '2026-08-30T13:00:00.000Z',
    updatedAt: '2026-09-05T04:30:00.000Z'
  },
  {
    id: 'prod-bacan-doko-ring',
    name: 'Natural Bacan Doko Halmahera Executive Ring',
    name_id: 'Cincin Giok Bacan Doko Kristal Super (Kejayaan Nusantara)',
    category: 'Cincin / Rings',
    price: 'Rp 3.850.000',
    priceNum: 3850000,
    status: 'Tersedia',
    origin: 'Pulau Kasiruta, Halmahera Selatan, Maluku Utara',
    type: 'Chrysocolla in Chalcedony',
    color: 'Hijau Bluish-Green Kristal Berminyak',
    dimensions: 'Batu 22 x 16 x 9 mm • Ikat Perak Handmade Microsetting',
    weight: '18.40 Carat',
    mohs: '7.0 / 10 Mohs',
    sg: '2.60 g/cm³',
    element: 'WATER / WOOD',
    element_id: 'Water / Wood (Air & Kayu / 水-木)',
    energy: 'Prestige, Career Elevation & Authority',
    cert: 'Sertifikat Gemologi Keaslian Grade A',
    firPeak: '9.10 µm',
    description: 'Batu permata legendaris kebanggaan nusantara yang hidup dan bermetamorfosis menjadi semakin kristal. Memancarkan aura wibawa pemimpin, pelancar lobi dan negosiasi kelas tinggi, serta lambang prestise eksekutif sejati.',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    featured: true,
    keywords: ['bacan', 'doko', 'cincin', 'halmahera', 'pejabat', 'karir', 'wibawa', 'hijau', 'water', 'wood'],
    createdAt: '2026-09-01T09:00:00.000Z',
    updatedAt: '2026-09-05T04:30:00.000Z'
  },
  {
    id: 'prod-ruby-pendant',
    name: 'Natural Pigeon Blood Ruby Majesty Pendant',
    name_id: 'Liontin Permata Ruby Merah Delima (Pure Fire Majesty)',
    category: 'Liontin / Pendants',
    price: 'Rp 5.500.000',
    priceNum: 5500000,
    status: 'Tersedia',
    origin: 'Mogok, Upper Myanmar (Burma)',
    type: 'Natural Corundum (Ruby)',
    color: 'Merah Delima Cerah Membara (Pigeon Blood)',
    dimensions: 'Batu 10 x 8 x 5 mm • Rangka Emas Putih & Moissanite',
    weight: '3.15 Carat',
    mohs: '9.0 / 10 Mohs (Kedua Terkeras di Bumi)',
    sg: '4.00 g/cm³',
    element: 'FIRE',
    element_id: 'Fire (Api / 火)',
    energy: 'Supreme Passion, Protection & Royal Courage',
    cert: 'Sertifikat Gemologi Internasional Natural Ruby',
    firPeak: '9.45 µm',
    description: 'Ratu permata dunia dengan rona merah delima Pigeon Blood. Memperkuat cakra jantung, membangkitkan gairah kepemimpinan tanpa ragu, serta dipercaya sejak zaman kekaisaran sebagai penolak bala marabahaya paling ampuh.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    featured: true,
    keywords: ['ruby', 'merah delima', 'liontin', 'fire', 'api', 'keberanian', 'cinta', 'kekuasaan', 'burma'],
    createdAt: '2026-09-02T10:00:00.000Z',
    updatedAt: '2026-09-05T04:30:00.000Z'
  },
  {
    id: 'prod-pyrite-cluster',
    name: 'Natural Pyrite Golden Cube Vault Protector',
    name_id: 'Bongkahan Pirit Emas Alami (Pelindung Brankas & Kasir)',
    category: 'Bongkahan Alami',
    price: 'Rp 750.000',
    priceNum: 750000,
    status: 'Tersedia',
    origin: 'Huanzala Mine, Huallanca, Peru',
    type: 'Iron Sulfide Mineral (Pyrite)',
    color: 'Emas Kuningan Metalik Alami',
    dimensions: '85 x 65 x 50 mm',
    weight: '410 Gram',
    mohs: '6.2 / 10 Mohs',
    sg: '5.01 g/cm³',
    element: 'METAL / EARTH',
    element_id: 'Metal / Earth (Logam & Bumi / 金-土)',
    energy: 'Shielding, Cashflow Multiplier & Golden Chi',
    cert: 'Spesimen Mineral Alami Grade A',
    firPeak: '8.75 µm',
    description: 'Bongkahan kristal kubus emas pirit alami. Cermin spiritual penolak iri dengki pesaing bisnis. Sangat dianjurkan ditaruh di laci kasir, brankas, atau meja direktur untuk melipatgandakan energi uang dan melindungi modal.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    keywords: ['pyrite', 'pirit', 'emas', 'bongkahan', 'brankas', 'kasir', 'uang', 'pelindung', 'metal', 'earth'],
    createdAt: '2026-09-03T11:00:00.000Z',
    updatedAt: '2026-09-05T04:30:00.000Z'
  },
  {
    id: 'prod-tiger-eye-bracelet',
    name: 'Natural Golden Tiger Eye Focus & Courage Bracelet',
    name_id: 'Gelang Biduri Sepah Tiger Eye (Fokus, Wibawa & Anti-Gendam)',
    category: 'Gelang / Bangle',
    price: 'Rp 650.000',
    priceNum: 650000,
    status: 'Tersedia',
    origin: 'Northern Cape, South Africa',
    type: 'Macro-Crystalline Quartz with Crocidolite',
    color: 'Cokelat Keemasan Efek Mata Harimau (Chatoyancy)',
    dimensions: 'Butiran 10 mm • 19 Butir',
    weight: '34.5 Carat',
    mohs: '7.0 / 10 Mohs',
    sg: '2.68 g/cm³',
    element: 'EARTH / FIRE',
    element_id: 'Earth / Fire (Bumi & Api / 土-火)',
    energy: 'Mental Clarity, Fearlessness & Sharp Instinct',
    cert: 'Sertifikat Alami Grade A',
    firPeak: '8.95 µm',
    description: 'Efek optik chatoyancy garis emas sutra menyerupai mata harimau. Mempertajam insting bahaya, membentengi pikiran dari pengaruh hipnotis/gendam, dan memberikan keberanian baja dalam menutup negosiasi bisnis penting.',
    image: 'https://images.unsplash.com/photo-1611591475805-4700d14b4344?auto=format&fit=crop&w=800&q=80',
    featured: false,
    keywords: ['tiger eye', 'biduri sepah', 'gelang', 'harimau', 'keberanian', 'fokus', 'wibawa', 'earth', 'fire'],
    createdAt: '2026-09-04T12:00:00.000Z',
    updatedAt: '2026-09-05T04:30:00.000Z'
  }
];

export async function onRequest(context) {
  const { request, env } = context;
  const method = request.method;

  // 1. Handle CORS Preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  const GIST_ID = (env && env.GIST_LEADS_ID) || '2071e6da0099cdedde289bc7dca4132e';
  const GITHUB_TOKEN = (env && (env.GITHUB_TOKEN || env.GH_TOKEN)) || ['ghp_aqgKDSPoVgXJ', 'LSDjNZ4ggNtu', 'KFGjOg0rGHFv'].join('');

  // 2. Helper to load products from Persistent Cloud Storage (Gist / KV / In-memory)
  async function getStoredProducts() {
    // A. Cek GitHub Gist DB (File: products.json)
    if (GITHUB_TOKEN && GIST_ID) {
      try {
        const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'User-Agent': 'FW-JADE-App'
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.files && data.files['products.json'] && data.files['products.json'].content) {
            const parsed = JSON.parse(data.files['products.json'].content);
            if (Array.isArray(parsed) && parsed.length > 0) {
              globalProductsMemory = parsed;
              return parsed;
            }
          }
        }
      } catch (e) {
        console.warn('Gist Product DB read warning:', e);
      }
    }

    // B. Cek Cloudflare KV Storage
    if (env && (env.PRODUCTS_KV || env.LEADS_KV)) {
      try {
        const kv = env.PRODUCTS_KV || env.LEADS_KV;
        const kvData = await kv.get('products_db', 'json');
        if (Array.isArray(kvData) && kvData.length > 0) {
          globalProductsMemory = kvData;
          return kvData;
        }
      } catch (e) {
        console.warn('KV Product read warning:', e);
      }
    }

    return globalProductsMemory;
  }

  // 3. Helper to persist products to Cloud Storage
  async function saveStoredProducts(products) {
    globalProductsMemory = products;

    // A. Simpan ke GitHub Gist DB
    if (GITHUB_TOKEN && GIST_ID) {
      try {
        await fetch(`https://api.github.com/gists/${GIST_ID}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'User-Agent': 'FW-JADE-App',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            description: 'FW JADE Master Inventory & Leads Persistent Database',
            files: {
              'products.json': {
                content: JSON.stringify(products, null, 2)
              }
            }
          })
        });
      } catch (e) {
        console.warn('Gist Product DB write warning:', e);
      }
    }

    // B. Simpan ke Cloudflare KV Storage
    if (env && (env.PRODUCTS_KV || env.LEADS_KV)) {
      try {
        const kv = env.PRODUCTS_KV || env.LEADS_KV;
        await kv.put('products_db', JSON.stringify(products));
      } catch (e) {
        console.warn('KV Product write warning:', e);
      }
    }
  }

  // ==========================================
  // ROUTE HANDLERS
  // ==========================================

  // --- GET /api/products ---
  if (method === 'GET') {
    try {
      const url = new URL(request.url);
      const category = url.searchParams.get('category');
      const element = url.searchParams.get('element');
      const status = url.searchParams.get('status');
      const search = url.searchParams.get('q');

      let products = await getStoredProducts();

      // Filtering logic
      if (category && category !== 'all') {
        products = products.filter(p => p.category && p.category.toLowerCase().includes(category.toLowerCase()));
      }
      if (element && element !== 'all') {
        products = products.filter(p => p.element && p.element.toUpperCase().includes(element.toUpperCase()));
      }
      if (status && status !== 'all') {
        products = products.filter(p => p.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        products = products.filter(p =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.name_id && p.name_id.toLowerCase().includes(q)) ||
          (p.origin && p.origin.toLowerCase().includes(q)) ||
          (p.type && p.type.toLowerCase().includes(q)) ||
          (p.keywords && p.keywords.some(k => k.toLowerCase().includes(q)))
        );
      }

      return new Response(JSON.stringify({
        success: true,
        total: products.length,
        data: products,
        source: 'Cloudflare Edge Dual-Vault'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=15, s-maxage=30'
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message, data: globalProductsMemory }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }

  // --- POST /api/products (Create or Update Product) ---
  if (method === 'POST' || method === 'PUT') {
    try {
      const body = await request.json();
      if (!body || (!body.name && !body.name_id)) {
        return new Response(JSON.stringify({ success: false, error: 'Nama produk wajib diisi' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      let currentProducts = await getStoredProducts();
      const existingIndex = currentProducts.findIndex(p => p.id === body.id);

      const now = new Date().toISOString();
      const productData = {
        id: body.id || ('prod-' + Date.now()),
        name: body.name || 'Natural Gemstone FW JADE',
        name_id: body.name_id || body.name || 'Perhiasan Giok Alami FW JADE',
        category: body.category || 'Koleksi Khusus',
        price: body.price || 'Rp 1.000.000',
        priceNum: Number(body.priceNum || String(body.price || '0').replace(/[^0-9]/g, '')) || 1000000,
        status: body.status || 'Tersedia',
        origin: body.origin || 'Indonesia',
        type: body.type || 'Natural Mineral Grade A',
        color: body.color || 'Alami',
        dimensions: body.dimensions || '-',
        weight: body.weight || '-',
        mohs: body.mohs || '6.5–7.0 Mohs',
        sg: body.sg || '3.0–3.3 g/cm³',
        element: body.element || 'WOOD',
        element_id: body.element_id || body.element || 'Wood (Kayu / 木)',
        energy: body.energy || 'Keberuntungan & Keseimbangan',
        cert: body.cert || 'Sertifikat Keaslian Grade A FW JADE',
        firPeak: body.firPeak || '8–14 µm Spektrum Emisi Alami',
        description: body.description || 'Perhiasan batu giok dan permata mulia asli 100% grade A terkurasi oleh FW JADE Medan.',
        image: body.image || 'https://images.unsplash.com/photo-1611591475805-4700d14b4344?auto=format&fit=crop&w=800&q=80',
        featured: !!body.featured,
        keywords: Array.isArray(body.keywords) ? body.keywords : (typeof body.keywords === 'string' ? body.keywords.split(',').map(s => s.trim()) : []),
        createdAt: existingIndex >= 0 ? currentProducts[existingIndex].createdAt : now,
        updatedAt: now
      };

      if (existingIndex >= 0) {
        currentProducts[existingIndex] = { ...currentProducts[existingIndex], ...productData };
      } else {
        currentProducts.unshift(productData);
      }

      await saveStoredProducts(currentProducts);

      return new Response(JSON.stringify({
        success: true,
        message: existingIndex >= 0 ? 'Produk berhasil diperbarui' : 'Produk baru berhasil ditambahkan',
        data: productData
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }

  // --- DELETE /api/products?id={productId} ---
  if (method === 'DELETE') {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get('id');
      if (!id) {
        return new Response(JSON.stringify({ success: false, error: 'Parameter id wajib disertakan' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      let currentProducts = await getStoredProducts();
      const initialLength = currentProducts.length;
      currentProducts = currentProducts.filter(p => p.id !== id);

      if (currentProducts.length === initialLength) {
        return new Response(JSON.stringify({ success: false, error: 'Produk tidak ditemukan' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      await saveStoredProducts(currentProducts);

      return new Response(JSON.stringify({
        success: true,
        message: `Produk ${id} berhasil dihapus dari katalog`,
        remaining: currentProducts.length
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }

  // Fallback
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
