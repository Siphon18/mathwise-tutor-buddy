import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // New state to store form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Determine endpoint and payload based on mode
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const payload = isLogin
      ? { email, password }
      : { fullName, email, password };
  
    try {
      const response = await fetch(`http://localhost:5020${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      
      alert(data.message);
      
      if (!isLogin) {
        // After signup, navigate to login page
        navigate("/login");
      } else {
        // After successful login, store token and navigate to index page
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/index");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-auth-background flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-auth-border hover:shadow-xl transition-shadow duration-300">
          <div className="text-center mb-8">
            <h1
              className="text-2xl font-semibold text-auth-foreground animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p
              className="text-auth-muted mt-2 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              {isLogin
                ? "Enter your credentials to access your account"
                : "Fill in the form to create your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div
                className="space-y-2 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Label htmlFor="name">Full Name</Label>
                <div className="relative group">
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10 transition-all duration-300 border-opacity-50 focus:border-opacity-100 group-hover:border-primary/50"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-auth-muted transition-colors group-hover:text-primary/70" />
                </div>
              </div>
            )}

            <div
              className="space-y-2 animate-slide-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Label htmlFor="email">Email</Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 transition-all duration-300 border-opacity-50 focus:border-opacity-100 group-hover:border-primary/50"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-auth-muted transition-colors group-hover:text-primary/70" />
              </div>
            </div>

            <div
              className="space-y-2 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 transition-all duration-300 border-opacity-50 focus:border-opacity-100 group-hover:border-primary/50"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-auth-muted transition-colors group-hover:text-primary/70" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-auth-muted hover:text-auth-foreground transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div
                className="flex items-center space-x-2 animate-slide-up"
                style={{ animationDelay: "0.7s" }}
              >
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-auth-muted cursor-pointer hover:text-auth-foreground transition-colors"
                >
                  Remember me
                </label>
              </div>
            )}

            <Button
              className="w-full transform hover:scale-[1.02] transition-all duration-300 animate-slide-up"
              type="submit"
              disabled={loading}
              style={{ animationDelay: "0.8s" }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div
            className="mt-6 text-center animate-slide-up"
            style={{ animationDelay: "0.9s" }}
          >
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-auth-muted hover:text-auth-foreground transition-colors hover:underline focus:outline-none"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
