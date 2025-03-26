
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="dashboard-card max-w-md w-full text-center px-8 py-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-status-error/10 flex items-center justify-center">
            <AlertTriangle size={40} className="text-status-error" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-fuel-gray-900 dark:text-white">404</h1>
        <p className="text-xl text-fuel-gray-600 dark:text-fuel-gray-300 mb-6">Oops! Page not found</p>
        <p className="text-fuel-gray-500 dark:text-fuel-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home size={18} />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
