
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      console.log("Attempting to connect to:", 'http://69.62.98.55:3000/api/auth/login');
      const response = await fetch('http://69.62.98.55:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok && data.token) {
        login(data.token);
        toast({
          title: "Login successful",
          description: "Welcome back to TradingForDummies!",
        });
        navigate("/dashboard");
      } else {
        // Show the specific error message from the API
        const apiErrorMessage = data.message || data.error || "Invalid email or password.";
        setErrorMessage(apiErrorMessage);
        toast({
          title: "Login failed",
          description: apiErrorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      // This error occurs when the API is unreachable (network error)
      const networkErrorMsg = "Unable to connect to authentication server. Please check your internet connection or try again later.";
      setErrorMessage(networkErrorMsg);
      toast({
        title: "Connection error",
        description: networkErrorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-crypto-dark p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>
        
        <Card className="bg-crypto-gray border-crypto-lightgray">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-crypto-text" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-crypto-lightgray pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-crypto-text" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-crypto-lightgray pl-10 pr-10"
                    required
                  />
                  <div 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-crypto-text" />
                    ) : (
                      <Eye className="h-4 w-4 text-crypto-text" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-crypto-yellow hover:bg-crypto-yellow/90 text-black"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="text-sm text-crypto-text text-center">
                Demo credentials: demo@example.com / password
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
