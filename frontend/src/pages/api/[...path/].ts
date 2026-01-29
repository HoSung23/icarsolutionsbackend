// src/pages/api/[...path].ts
import type { APIRoute } from 'astro';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

export const ALL: APIRoute = async ({ request, params }) => {
  const path = params.path;
  
  try {
    const url = new URL(request.url);
    const targetUrl = `${BACKEND_URL}/api/${path}${url.search}`;
    
    console.log(`[API Proxy] ${request.method} ${targetUrl}`);
    
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: new Headers(request.headers),
      body: request.method !== 'GET' && request.method !== 'HEAD' 
        ? await request.text() 
        : undefined,
    });
    
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('[API Proxy Error]', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to proxy request',
        message: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
