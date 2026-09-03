/**
 * Cloudflare Pages Function: /api/session-sync
 * Real-Time Cross-Device Companion Camera Session Synchronization
 * Powers instant handoff from PC/Laptop to Mobile Camera
 */

// In-memory sessions storage for edge worker lifecycle
let globalSessions = new Map();

// Helper to cleanup expired sessions (> 15 minutes)
function cleanExpiredSessions() {
  const now = Date.now();
  for (const [id, session] of globalSessions.entries()) {
    if (now - session.createdAt > 15 * 60 * 1000) {
      globalSessions.delete(id);
    }
  }
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;
  const action = url.searchParams.get('action') || 'get';
  const sessionId = url.searchParams.get('session');

  // CORS Headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  cleanExpiredSessions();

  // 1. CREATE SESSION (Invoked by PC/Laptop)
  if (method === 'POST' && action === 'create') {
    try {
      const body = await request.json().catch(() => ({}));
      const id = sessionId || `FW-CAM-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      const newSession = {
        id,
        status: 'waiting', // waiting -> connected -> scanning -> completed
        createdAt: Date.now(),
        clientInfo: body.clientInfo || {},
        payload: null
      };

      globalSessions.set(id, newSession);

      return new Response(JSON.stringify({
        success: true,
        session: newSession
      }), {
        status: 200,
        headers: corsHeaders
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }

  // 2. CONNECT SESSION (Invoked when Mobile scans QR)
  if (method === 'POST' && action === 'connect') {
    if (!sessionId || !globalSessions.has(sessionId)) {
      // Create on the fly if not found
      globalSessions.set(sessionId, {
        id: sessionId,
        status: 'connected',
        createdAt: Date.now(),
        payload: null
      });
    } else {
      const session = globalSessions.get(sessionId);
      session.status = 'connected';
      session.connectedAt = Date.now();
      globalSessions.set(sessionId, session);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Mobile camera connected successfully',
      status: 'connected'
    }), {
      status: 200,
      headers: corsHeaders
    });
  }

  // 3. SUBMIT CAPTURE DATA (Invoked by Mobile after camera capture)
  if (method === 'POST' && action === 'submit') {
    try {
      const body = await request.json();
      if (!sessionId) {
        return new Response(JSON.stringify({ success: false, error: 'Session ID required' }), {
          status: 400,
          headers: corsHeaders
        });
      }

      const session = globalSessions.get(sessionId) || {
        id: sessionId,
        createdAt: Date.now()
      };

      session.status = 'completed';
      session.completedAt = Date.now();
      session.payload = {
        photoBase64: body.photoBase64 || null,
        faceMetrics: body.faceMetrics || null,
        userData: body.userData || null,
        timestamp: new Date().toISOString()
      };

      globalSessions.set(sessionId, session);

      return new Response(JSON.stringify({
        success: true,
        message: 'Biometric capture transmitted successfully to PC',
        status: 'completed'
      }), {
        status: 200,
        headers: corsHeaders
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }

  // 4. GET SESSION STATUS (Polled by PC)
  if (method === 'GET') {
    if (!sessionId) {
      return new Response(JSON.stringify({ success: false, error: 'Session ID required' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const session = globalSessions.get(sessionId);
    if (!session) {
      return new Response(JSON.stringify({
        success: false,
        status: 'not_found',
        message: 'Session expired or not found'
      }), {
        status: 200,
        headers: corsHeaders
      });
    }

    return new Response(JSON.stringify({
      success: true,
      session
    }), {
      status: 200,
      headers: corsHeaders
    });
  }

  return new Response(JSON.stringify({ success: false, error: 'Invalid action or method' }), {
    status: 400,
    headers: corsHeaders
  });
}
