import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from '@/hooks/useAuth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    try {
      await signIn(email, password);
      navigate('/admin');
    } catch {
      setError(true);
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
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your ModanTech account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); setError(false); }} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }} />
                  </div>
                  {error && <p className="text-sm text-amber-600 dark:text-amber-400">Invalid email or password. Please try again.</p>}
                  <Button type="submit" className="w-full" variant="hero">Sign in</Button>
                </form>

                <div className="text-center">
                  <Button variant="link" asChild>
                    <Link to="/forgot-password">Forgot your password?</Link>
                  </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button variant="link" className="p-0" asChild>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SignIn;