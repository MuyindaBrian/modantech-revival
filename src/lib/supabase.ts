import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const configured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = configured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export const isSupabaseConfigured = configured;
export const auth = supabase?.auth ?? null;
export const storage = supabase?.storage ?? null;

export default supabase;
