// Next.js API route acting as a proxy to the backend when NEXT_PUBLIC_API_BASE is unset
export async function POST(request: Request) {
  const body = await request.json();
  const base = process.env.NEXT_PUBLIC_API_BASE || '';
  const res = await fetch(base + '/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}


