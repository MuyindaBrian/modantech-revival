import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { isSupabaseConfigured } from "@/lib/supabase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // No redirectTo: use Supabase Site URL (Authentication > URL Configuration).
      // Your Site URL should be https://modantech.netlify.app so the email link lands there;
      // index.html then redirects to /reset-password when it sees type=recovery in the hash.
      await resetPassword(email);
      alert('If that email exists, you will receive reset instructions shortly. Check your inbox and spam.');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      const isNetworkError = /fetch|network|failed to fetch|cannot fetch/i.test(msg);
      if (isNetworkError) {
        alert(
          'Network error sending reset email. Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in Netlify (Site settings → Environment variables) and that you redeployed after adding them.'
        );
      } else {
        alert(msg || 'Failed to send reset email.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Reset Password</CardTitle>
                <CardDescription>
                  Enter your email and we'll send password reset instructions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isSupabaseConfigured ? (
                  <p className="text-sm text-muted-foreground">
                    Auth is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify environment variables and redeploy.
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <Button type="submit" className="w-full" variant="hero">Send reset email</Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
