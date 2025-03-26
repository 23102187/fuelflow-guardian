
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Droplet, 
  ShieldAlert, 
  BarChart3, 
  Smartphone, 
  Settings, 
  User, 
  Bell, 
  Moon, 
  Sun,
  Menu,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, href, active, onClick }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "nav-item",
      active && "nav-item-active"
    )}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const navItems = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: "Dashboard", 
      href: "/" 
    },
    { 
      icon: <Droplet size={20} />, 
      label: "Fuel Control", 
      href: "/fuel-control" 
    },
    { 
      icon: <ShieldAlert size={20} />, 
      label: "Security", 
      href: "/security" 
    },
    { 
      icon: <BarChart3 size={20} />, 
      label: "Reports", 
      href: "/reports" 
    },
    { 
      icon: <Smartphone size={20} />, 
      label: "Mobile App", 
      href: "/mobile" 
    },
    { 
      icon: <Settings size={20} />, 
      label: "Settings", 
      href: "/settings" 
    },
  ];

  return (
    <div className={cn("min-h-screen flex", isDarkMode && "dark")}>
      {/* Mobile sidebar backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-fuel-gray-900/50 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "w-64 bg-white dark:bg-fuel-gray-900 border-r border-fuel-gray-200 dark:border-fuel-gray-800 flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out",
          isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        <div className="p-4 border-b border-fuel-gray-200 dark:border-fuel-gray-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={closeSidebar}>
            <div className="w-8 h-8 rounded-md bg-fuel-blue-500 flex items-center justify-center">
              <Droplet size={20} className="text-white" />
            </div>
            <span className="font-semibold text-lg text-fuel-gray-900 dark:text-white">FuelFlow</span>
          </Link>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} className="p-1">
              <X size={20} className="text-fuel-gray-500 dark:text-fuel-gray-400" />
            </button>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={location.pathname === item.href}
              onClick={closeSidebar}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-fuel-gray-200 dark:border-fuel-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-fuel-gray-200 dark:bg-fuel-gray-700 flex items-center justify-center">
              <User size={18} className="text-fuel-gray-700 dark:text-fuel-gray-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-fuel-gray-900 dark:text-white">Admin User</p>
              <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">admin@fuelflow.com</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button className="p-2 rounded-lg bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-600 dark:text-fuel-gray-300">
              <Bell size={18} />
            </button>
            <button 
              className="p-2 rounded-lg bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-600 dark:text-fuel-gray-300"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="p-2 rounded-lg bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-600 dark:text-fuel-gray-300">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        isMobile ? "ml-0" : "ml-64"
      )}>
        {/* Header */}
        <header className="h-16 border-b border-fuel-gray-200 dark:border-fuel-gray-800 flex items-center px-4 sticky top-0 bg-background/80 backdrop-blur-md z-20">
          {isMobile && (
            <button 
              className="p-2 mr-4 rounded-lg text-fuel-gray-600 dark:text-fuel-gray-300 hover:bg-fuel-gray-100 dark:hover:bg-fuel-gray-800"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
          )}
          
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-fuel-gray-900 dark:text-white">
              {navItems.find(item => item.href === location.pathname)?.label || "Dashboard"}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-600 dark:text-fuel-gray-300 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-status-error rounded-full"></span>
            </button>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
