import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId?: string) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    try {
      const { data, error } = await supabase.from('profiles').select('is_admin').eq('id', userId).single();
      if (error) {
        setIsAdmin(false);
      } else {
        setIsAdmin(Boolean(data?.is_admin));
      }
    } catch (e) {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user ?? null;
      setUser(currentUser);
      await fetchProfile(currentUser?.id);
      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      fetchProfile(currentUser?.id);
      setLoading(false);
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string, options?: { redirectTo?: string }) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, options);
    if (error) throw error;
  };

  return { user, isAdmin, loading, signIn, signUp, signOut, resetPassword } as const;
};

export default useAuth;
