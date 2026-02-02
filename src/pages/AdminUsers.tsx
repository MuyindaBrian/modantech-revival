import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Profile = {
  id: string;
  email: string | null;
  is_admin: boolean;
};

const AdminUsers = () => {
  const { user, isAdmin, loading } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [busy, setBusy] = useState(false);

  const loadProfiles = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.from('profiles').select('id, email, is_admin').order('email', { ascending: true });
      if (error) throw error;
      setProfiles((data || []) as Profile[]);
    } catch (err) {
      console.error('Failed to load profiles', err);
      alert('Failed to load profiles. Check console for details.');
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) loadProfiles();
    else setProfiles([]);
  }, [user, isAdmin]);

  const toggleAdmin = async (id: string, makeAdmin: boolean) => {
    if (!confirm(`Are you sure you want to ${makeAdmin ? 'promote' : 'demote'} this user?`)) return;
    setBusy(true);
    try {
      const { error } = await supabase.from('profiles').update({ is_admin: makeAdmin }).eq('id', id);
      if (error) throw error;
      await loadProfiles();
    } catch (err) {
      console.error('Failed to update profile', err);
      alert('Failed to update profile. Check console for details.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || !isAdmin) return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Unauthorized</CardTitle>
          <CardDescription>You do not have permission to view this page.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.href = '/admin'}>Back</Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Users</h1>
          <div className="flex items-center gap-2">
            <Button onClick={loadProfiles} disabled={busy}>Refresh</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4">
          {profiles.length === 0 && <div className="text-muted-foreground">No users found.</div>}
          {profiles.map(p => (
            <Card key={p.id}>
              <CardContent className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{p.email || <span className="text-muted-foreground">(no email)</span>}</div>
                  <div className="text-sm text-muted-foreground">ID: {p.id}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={p.is_admin ? 'default' : 'secondary'}>{p.is_admin ? 'Admin' : 'User'}</Badge>
                  <Button size="sm" variant={p.is_admin ? 'destructive' : 'default'} onClick={() => toggleAdmin(p.id, !p.is_admin)}>
                    {p.is_admin ? 'Demote' : 'Promote'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
