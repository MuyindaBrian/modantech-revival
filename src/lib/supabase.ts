import { createClient, SupabaseClient } from '@supabase/supabase-js';

function envStr(key: string): string {
  const v = (import.meta.env[key] as string | undefined);
  if (v == null) return '';
  return String(v).replace(/^["'\s]+|["'\s]+$/g, '').trim();
}
const rawUrl = envStr('VITE_SUPABASE_URL').replace(/\/+$/, '');
const rawKey = envStr('VITE_SUPABASE_ANON_KEY');

const configured = Boolean(rawUrl && rawKey);

export const supabase: SupabaseClient | null = configured
  ? createClient(rawUrl, rawKey)
  : null;

export const isSupabaseConfigured = configured;
export const auth = supabase?.auth ?? null;
export const storage = supabase?.storage ?? null;

export default supabase;
