import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validation check for environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create a single supabase client for browser-side usage
export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (for use in Server Components and API routes)
export const createServerSupabaseClient = () => {
  return createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
      }
    }
  );
};

// Helper function to get user session
export const getUserSession = async () => {
  const { data: { session }, error } = await supabaseClient.auth.getSession();
  if (error) {
    console.error('Error getting user session:', error.message);
    return null;
  }
  return session;
};

// Helper function to get current user
export const getCurrentUser = async () => {
  const session = await getUserSession();
  return session?.user || null;
};

// Database types for the dual-AI platform
// These will be used for type-safe database operations
export type HorizontalAIData = {
  id: string;
  user_id: string;
  company_name?: string;
  contact_name?: string;
  enriched_data: any; // From Exa.ai
  created_at: string;
  updated_at: string;
};

export type VerticalAIData = {
  id: string;
  user_id: string;
  horizontal_data_id: string; // Reference to horizontal data
  analysis_results: any; // From CrewAI
  created_at: string;
  updated_at: string;
};

// Export types for use throughout the application
export type { Database };
