import { useEffect, useState } from 'react';

export interface SiteSettings {
  displayName: string;
  initials: string;
  avatar?: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/settings/site.json');
        if (!res.ok) throw new Error('Failed to load settings');
        const data = await res.json();
        setSettings(data as SiteSettings);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { settings, loading };
};


