import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables. See README for setup.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const auth = supabase.auth;
export const storage = supabase.storage;

export default supabase;
