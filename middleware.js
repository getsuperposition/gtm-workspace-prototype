import { NextResponse } from 'next/server';

// Simple password protection for the prototype
// Password: "workspace2026"
const SITE_PASSWORD = process.env.SITE_PASSWORD || 'workspace2026';
const AUTH_COOKIE_NAME = 'prototype_auth';

export function middleware(request) {
  // Skip auth for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Check for password in query param (for initial auth)
  const password = request.nextUrl.searchParams.get('password');
  if (password === SITE_PASSWORD) {
    const response = NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
    response.cookies.set(AUTH_COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  }

  // Show password form
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>GTM Workspace Prototype</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 48px;
            max-width: 400px;
            width: 100%;
            text-align: center;
          }
          h1 {
            color: #fff;
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 8px;
          }
          p {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            margin-bottom: 32px;
          }
          form { display: flex; flex-direction: column; gap: 16px; }
          input {
            padding: 14px 16px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
            font-size: 16px;
            outline: none;
            transition: border-color 0.2s;
          }
          input:focus { border-color: rgba(255, 255, 255, 0.3); }
          input::placeholder { color: rgba(255, 255, 255, 0.4); }
          button {
            padding: 14px 24px;
            background: #fff;
            color: #1a1f2e;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: opacity 0.2s;
          }
          button:hover { opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>GTM Workspace Prototype</h1>
          <p>Enter the password to view this prototype</p>
          <form method="GET">
            <input type="password" name="password" placeholder="Password" autofocus required />
            <button type="submit">Enter</button>
          </form>
        </div>
      </body>
    </html>`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    }
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
