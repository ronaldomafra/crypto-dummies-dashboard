
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-crypto-dark p-4">
      <div className="text-center max-w-md">
        <Logo className="mx-auto mb-6" size="lg" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-crypto-text mb-8">
          Oops! The page you were looking for doesn't exist
        </p>
        <Button asChild className="bg-crypto-yellow hover:bg-crypto-yellow/90 text-black">
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
