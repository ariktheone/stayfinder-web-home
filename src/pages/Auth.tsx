
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Mail, Lock, User, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ 
    email: "", 
    password: "",
    confirmPassword: "",
    fullName: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!form.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ 
          email: form.email, 
          password: form.password 
        });
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({ 
              title: "Login failed", 
              description: "Invalid email or password. Please check your credentials and try again.", 
              variant: "destructive" 
            });
          } else {
            toast({ 
              title: "Login failed", 
              description: error.message, 
              variant: "destructive" 
            });
          }
        } else {
          toast({ 
            title: "Welcome back!", 
            description: "You have successfully logged in." 
          });
          navigate("/");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: form.fullName,
            }
          }
        });
        
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({ 
              title: "Account exists", 
              description: "An account with this email already exists. Please sign in instead.", 
              variant: "destructive" 
            });
          } else {
            toast({ 
              title: "Sign up failed", 
              description: error.message, 
              variant: "destructive" 
            });
          }
        } else {
          toast({ 
            title: "Check your email!", 
            description: "We've sent you a confirmation link to complete your registration.",
            duration: 6000
          });
          // Clear form after successful signup
          setForm({ email: "", password: "", confirmPassword: "", fullName: "" });
        }
      }
    } catch (error: any) {
      toast({ 
        title: "An error occurred", 
        description: "Something went wrong. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-rose-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors mb-4">
            <Home className="h-6 w-6" />
            <span className="text-lg font-semibold">Back to StayFinder</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? "Sign in to your account to continue" 
              : "Join thousands of travelers finding their perfect stay"
            }
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl">
              {isLogin ? "Sign In" : "Sign Up"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange}
                      disabled={loading}
                      className={`pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    placeholder={isLogin ? "Enter your password" : "Create a password (min. 6 characters)"}
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      type="password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                      className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white font-medium" 
                disabled={loading}
              >
                {loading 
                  ? (isLogin ? "Signing in..." : "Creating account...") 
                  : (isLogin ? "Sign In" : "Create Account")
                }
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                className="text-rose-600 hover:text-rose-700 font-medium underline-offset-4 hover:underline"
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setForm({ email: "", password: "", confirmPassword: "", fullName: "" });
                  setErrors({});
                }}
                disabled={loading}
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {!isLogin && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 text-center">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
