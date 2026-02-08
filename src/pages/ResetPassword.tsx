import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !password.trim()) return;

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: password.trim() });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setDone(true);
      alert("Password updated. You can now sign in.");
      navigate("/signin", { replace: true });
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>Not configured</CardTitle>
            <CardDescription>Auth is not configured. Cannot reset password.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/">Back to home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Set new password</CardTitle>
                <CardDescription>
                  Enter your new password below. You were sent here from the reset link in your email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      disabled={loading || done}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    variant="hero"
                    disabled={loading || done}
                  >
                    {loading ? "Updating…" : "Update password"}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  <Link to="/signin" className="underline hover:text-foreground">
                    Back to sign in
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResetPassword;
