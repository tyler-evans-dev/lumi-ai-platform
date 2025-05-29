import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Auth callback handler for Supabase OAuth and email link authentication
 * This route is called by Supabase after a user signs in or signs up
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');

  // Handle authentication errors
  if (error) {
    console.error('Authentication error:', error, error_description);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(error_description || 'Authentication failed')}`
    );
  }

  // If no code is present, redirect to login
  if (!code) {
    console.warn('No code provided in callback');
    return NextResponse.redirect(`${requestUrl.origin}/login?error=No+authentication+code+provided`);
  }

  try {
    // Create a Supabase client for the auth exchange
    const supabase = createRouteHandlerClient({ cookies });

    // Exchange the code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError.message);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent(exchangeError.message)}`
      );
    }

    // Successfully authenticated, redirect to the main dashboard
    return NextResponse.redirect(requestUrl.origin);
  } catch (err) {
    console.error('Unexpected error during authentication callback:', err);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent('An unexpected error occurred')}`
    );
  }
}
