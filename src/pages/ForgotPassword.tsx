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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    try {
      await resetPassword(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setStatus("success");
    } catch {
      setStatus("error");
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
                    Auth is not configured.
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }} />
                    </div>
                    {status === "success" && (
                      <p className="text-sm text-green-600 dark:text-green-400">Check your email for a reset link.</p>
                    )}
                    {status === "error" && (
                      <p className="text-sm text-amber-600 dark:text-amber-400">Something went wrong. Please try again.</p>
                    )}
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
