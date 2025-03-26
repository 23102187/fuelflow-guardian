
import React, { useState } from 'react';
import { Smartphone, Battery, Wifi, Bell, BarChart3, Droplet, ShieldCheck, AlertTriangle, Zap, Plus, Minus, Lock, TrendingUp, Play, Pause, Settings, Home, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusData = {
  fuelLevel: 78,
  flowStatus: 'active',
  flowRate: 12.5,
  dispensed: 148.2,
  alerts: [
    { id: 1, type: 'warning', message: 'Unusual flow rate detected', time: '10 min ago' },
    { id: 2, type: 'info', message: 'System maintenance scheduled', time: '1 hour ago' },
  ]
};

interface MobileDeviceProps {
  children: React.ReactNode;
}

const MobileDevice = ({ children }: MobileDeviceProps) => {
  return (
    <div className="mx-auto relative">
      <div className="w-[280px] h-[580px] bg-fuel-gray-900 rounded-[40px] p-2 shadow-xl border-[8px] border-fuel-gray-800">
        <div className="w-full h-full rounded-[32px] overflow-hidden relative bg-fuel-gray-50 dark:bg-fuel-gray-900">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-fuel-gray-800 rounded-b-xl z-10 flex items-center justify-center">
            <div className="w-16 h-2 bg-black rounded-full"></div>
          </div>
          
          {/* Mobile Content */}
          <div className="h-full pt-8 overflow-hidden flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MobileStatusBarProps {
  batteryLevel: number;
  signalStrength: number;
  time: string;
}

const MobileStatusBar = ({ batteryLevel, signalStrength, time }: MobileStatusBarProps) => {
  return (
    <div className="px-4 py-1 flex justify-between items-center text-xs text-fuel-gray-800 dark:text-white">
      <span>{time}</span>
      <div className="flex items-center gap-1">
        <Wifi size={12} />
        <div className="relative w-6 h-3 rounded-sm bg-fuel-gray-300 dark:bg-fuel-gray-700">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-green-500 rounded-sm" 
            style={{ width: `${batteryLevel}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface MobileTabBarProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const MobileTabBar = ({ activeTab, onChange }: MobileTabBarProps) => {
  return (
    <div className="flex justify-around items-center bg-white dark:bg-fuel-gray-800 py-2 px-4 border-t border-fuel-gray-200 dark:border-fuel-gray-700">
      <button 
        className={cn(
          "flex flex-col items-center py-1 px-3 rounded-lg",
          activeTab === 'home' ? "text-fuel-blue-500" : "text-fuel-gray-500 dark:text-fuel-gray-400"
        )}
        onClick={() => onChange('home')}
      >
        <Home size={20} />
        <span className="text-[10px] mt-1">Home</span>
      </button>
      
      <button 
        className={cn(
          "flex flex-col items-center py-1 px-3 rounded-lg",
          activeTab === 'control' ? "text-fuel-blue-500" : "text-fuel-gray-500 dark:text-fuel-gray-400"
        )}
        onClick={() => onChange('control')}
      >
        <Droplet size={20} />
        <span className="text-[10px] mt-1">Control</span>
      </button>
      
      <button 
        className={cn(
          "flex flex-col items-center py-1 px-3 rounded-lg",
          activeTab === 'alerts' ? "text-fuel-blue-500" : "text-fuel-gray-500 dark:text-fuel-gray-400"
        )}
        onClick={() => onChange('alerts')}
      >
        <Bell size={20} />
        <span className="text-[10px] mt-1">Alerts</span>
      </button>
      
      <button 
        className={cn(
          "flex flex-col items-center py-1 px-3 rounded-lg",
          activeTab === 'stats' ? "text-fuel-blue-500" : "text-fuel-gray-500 dark:text-fuel-gray-400"
        )}
        onClick={() => onChange('stats')}
      >
        <BarChart3 size={20} />
        <span className="text-[10px] mt-1">Stats</span>
      </button>
    </div>
  );
};

interface MobileHomeTabProps {
  data: typeof statusData;
}

const MobileHomeTab = ({ data }: MobileHomeTabProps) => {
  return (
    <div className="px-4 py-4 overflow-y-auto space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-fuel-gray-900 dark:text-white">Dashboard</h2>
        <div className="flex gap-2">
          <button className="p-1.5 rounded-full bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-500 dark:text-fuel-gray-400">
            <Bell size={16} />
          </button>
          <button className="p-1.5 rounded-full bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-500 dark:text-fuel-gray-400">
            <Settings size={16} />
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-fuel-gray-900 dark:text-white text-sm">System Status</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-status-success/10 text-status-success">
            Online
          </span>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Storage Level</span>
            <span className="text-xs font-medium text-fuel-gray-900 dark:text-white">{data.fuelLevel}%</span>
          </div>
          <div className="w-full h-2 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-300",
                data.fuelLevel > 70 ? "bg-status-success" : 
                data.fuelLevel > 30 ? "bg-status-warning" : 
                "bg-status-error"
              )} 
              style={{ width: `${data.fuelLevel}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-3 shadow-sm">
          <div className="mb-3">
            <Droplet size={18} className="text-fuel-blue-500" />
          </div>
          <p className="text-lg font-semibold text-fuel-gray-900 dark:text-white">{data.dispensed}</p>
          <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Total Dispensed</p>
        </div>
        
        <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-3 shadow-sm">
          <div className="mb-3">
            <Zap size={18} className="text-status-warning" />
          </div>
          <p className="text-lg font-semibold text-fuel-gray-900 dark:text-white">{data.flowRate}</p>
          <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Current Flow Rate</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-fuel-gray-900 dark:text-white text-sm">Recent Activity</h3>
          <span className="text-xs text-fuel-blue-500">View All</span>
        </div>
        
        <div className="space-y-3">
          {data.alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-2">
              <div className={cn(
                "p-1.5 rounded-full mt-0.5",
                alert.type === 'warning' ? "bg-status-warning/10 text-status-warning" : 
                "bg-status-info/10 text-status-info"
              )}>
                {alert.type === 'warning' ? <AlertTriangle size={14} /> : <Bell size={14} />}
              </div>
              <div>
                <p className="text-xs font-medium text-fuel-gray-900 dark:text-white">{alert.message}</p>
                <p className="text-[10px] text-fuel-gray-500 dark:text-fuel-gray-400">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-fuel-blue-500 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-full">
            <ShieldCheck size={16} className="text-white" />
          </div>
          <h3 className="font-medium text-white text-sm">Security Status</h3>
        </div>
        
        <p className="text-xs text-white/80 mb-3">All systems secured and operating normally. Last scan: 15 min ago.</p>
        
        <button className="w-full py-2 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
          Run Security Scan
        </button>
      </div>
    </div>
  );
};

interface MobileControlTabProps {
  flowStatus: 'active' | 'paused' | 'stopped';
  flowRate: number;
  onFlowToggle: () => void;
  onRateChange: (rate: number) => void;
}

const MobileControlTab = ({ flowStatus, flowRate, onFlowToggle, onRateChange }: MobileControlTabProps) => {
  return (
    <div className="px-4 py-4 overflow-y-auto space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-fuel-gray-900 dark:text-white">Fuel Control</h2>
        <button className="p-1.5 rounded-full bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-500 dark:text-fuel-gray-400">
          <Lock size={16} />
        </button>
      </div>
      
      <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-fuel-gray-900 dark:text-white text-sm">Flow Control</h3>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            flowStatus === 'active' ? "bg-status-success/10 text-status-success" : 
            flowStatus === 'paused' ? "bg-status-warning/10 text-status-warning" : 
            "bg-status-error/10 text-status-error"
          )}>
            {flowStatus === 'active' ? 'Active' : 
             flowStatus === 'paused' ? 'Paused' : 
             'Stopped'}
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-center pb-6">
          <div className="relative w-36 h-36 mb-6">
            <div className="absolute inset-0 rounded-full border-8 border-fuel-gray-200 dark:border-fuel-gray-700"></div>
            <div 
              className="absolute inset-0 rounded-full border-8 border-transparent border-t-fuel-blue-500 transform -rotate-90"
              style={{ 
                transform: `rotate(${flowStatus === 'stopped' ? -90 : (flowRate / 20 * 180) - 90}deg)`,
                transition: 'transform 0.5s ease-out'
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-fuel-gray-900 dark:text-white">{flowRate}</span>
              <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">gal/min</span>
            </div>
          </div>
          
          <div className="w-full flex items-center gap-4 mb-4">
            <button 
              className="p-2 rounded-full bg-fuel-gray-200 dark:bg-fuel-gray-700 text-fuel-gray-700 dark:text-fuel-gray-300"
              onClick={() => onRateChange(Math.max(0, flowRate - 1))}
              disabled={flowStatus === 'stopped'}
            >
              <Minus size={16} />
            </button>
            
            <div className="flex-1 h-2 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full">
              <div 
                className="h-full bg-fuel-blue-500 rounded-full"
                style={{ width: `${(flowRate / 20) * 100}%` }}
              ></div>
            </div>
            
            <button 
              className="p-2 rounded-full bg-fuel-gray-200 dark:bg-fuel-gray-700 text-fuel-gray-700 dark:text-fuel-gray-300"
              onClick={() => onRateChange(Math.min(20, flowRate + 1))}
              disabled={flowStatus === 'stopped'}
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            className={cn(
              "px-4 py-2 rounded-lg flex items-center gap-2 text-sm",
              flowStatus !== 'active' 
                ? "bg-status-success text-white" 
                : "bg-status-error text-white"
            )}
            onClick={onFlowToggle}
          >
            {flowStatus !== 'active' ? (
              <>
                <Play size={16} />
                <span>Start Flow</span>
              </>
            ) : (
              <>
                <Pause size={16} />
                <span>Pause Flow</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-3 shadow-sm">
          <div className="mb-3">
            <Droplet size={18} className="text-fuel-blue-500" />
          </div>
          <p className="text-sm font-semibold text-fuel-gray-900 dark:text-white">Pump #1</p>
          <p className="text-xs text-status-success flex items-center mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-status-success mr-1"></span>
            Active
          </p>
        </div>
        
        <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-3 shadow-sm">
          <div className="mb-3">
            <Droplet size={18} className="text-fuel-gray-400" />
          </div>
          <p className="text-sm font-semibold text-fuel-gray-900 dark:text-white">Pump #2</p>
          <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400 flex items-center mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-fuel-gray-400 mr-1"></span>
            Idle
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-fuel-gray-900 dark:text-white text-sm mb-3">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="p-2 bg-fuel-gray-100 dark:bg-fuel-gray-700 rounded-lg text-xs font-medium text-fuel-gray-700 dark:text-fuel-gray-300 flex flex-col items-center">
            <Lock size={16} className="mb-1" />
            <span>Lock All Pumps</span>
          </button>
          
          <button className="p-2 bg-fuel-gray-100 dark:bg-fuel-gray-700 rounded-lg text-xs font-medium text-fuel-gray-700 dark:text-fuel-gray-300 flex flex-col items-center">
            <TrendingUp size={16} className="mb-1" />
            <span>View Usage</span>
          </button>
          
          <button className="p-2 bg-fuel-gray-100 dark:bg-fuel-gray-700 rounded-lg text-xs font-medium text-fuel-gray-700 dark:text-fuel-gray-300 flex flex-col items-center">
            <ShieldCheck size={16} className="mb-1" />
            <span>Security Check</span>
          </button>
          
          <button className="p-2 bg-fuel-gray-100 dark:bg-fuel-gray-700 rounded-lg text-xs font-medium text-fuel-gray-700 dark:text-fuel-gray-300 flex flex-col items-center">
            <Settings size={16} className="mb-1" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface MobileAlertsTabProps {
  alerts: typeof statusData.alerts;
}

const MobileAlertsTab = ({ alerts }: MobileAlertsTabProps) => {
  return (
    <div className="px-4 py-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-fuel-gray-900 dark:text-white">Alerts</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search alerts..." 
            className="py-1.5 px-3 pl-8 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800 text-fuel-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-fuel-blue-500"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-fuel-gray-400" size={14} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-3 shadow-sm mb-4">
        <div className="flex justify-between">
          <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Filter by:</span>
          <div className="flex gap-2">
            <button className="text-xs px-2 py-0.5 rounded-full bg-fuel-blue-100 dark:bg-fuel-blue-900/30 text-fuel-blue-500">All</button>
            <button className="text-xs px-2 py-0.5 rounded-full bg-fuel-gray-100 dark:bg-fuel-gray-700 text-fuel-gray-500 dark:text-fuel-gray-400">Critical</button>
            <button className="text-xs px-2 py-0.5 rounded-full bg-fuel-gray-100 dark:bg-fuel-gray-700 text-fuel-gray-500 dark:text-fuel-gray-400">System</button>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm border-l-4 border-status-warning">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-status-warning/10 text-status-warning">
              <AlertTriangle size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-fuel-gray-900 dark:text-white">Unusual Flow Rate</h4>
                <span className="text-[10px] text-fuel-gray-500 dark:text-fuel-gray-400">10 min ago</span>
              </div>
              <p className="text-xs text-fuel-gray-600 dark:text-fuel-gray-300">Flow rate at Pump #3 exceeded normal threshold by 35%.</p>
              <div className="flex justify-end mt-2">
                <button className="text-xs text-fuel-blue-500">View Details</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm border-l-4 border-status-info">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-status-info/10 text-status-info">
              <Bell size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-fuel-gray-900 dark:text-white">System Maintenance</h4>
                <span className="text-[10px] text-fuel-gray-500 dark:text-fuel-gray-400">1 hour ago</span>
              </div>
              <p className="text-xs text-fuel-gray-600 dark:text-fuel-gray-300">Scheduled maintenance will occur tonight at 2:00 AM.</p>
              <div className="flex justify-end mt-2">
                <button className="text-xs text-fuel-blue-500">View Details</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm border-l-4 border-status-error">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-status-error/10 text-status-error">
              <AlertTriangle size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-fuel-gray-900 dark:text-white">Unauthorized Access</h4>
                <span className="text-[10px] text-fuel-gray-500 dark:text-fuel-gray-400">Yesterday</span>
              </div>
              <p className="text-xs text-fuel-gray-600 dark:text-fuel-gray-300">Unauthorized access attempt detected from IP 192.168.1.45.</p>
              <div className="flex justify-end mt-2">
                <button className="text-xs text-fuel-blue-500">View Details</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm border-l-4 border-status-success">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-status-success/10 text-status-success">
              <ShieldCheck size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-fuel-gray-900 dark:text-white">Security Scan Complete</h4>
                <span className="text-[10px] text-fuel-gray-500 dark:text-fuel-gray-400">Yesterday</span>
              </div>
              <p className="text-xs text-fuel-gray-600 dark:text-fuel-gray-300">Security scan completed with no issues found.</p>
              <div className="flex justify-end mt-2">
                <button className="text-xs text-fuel-blue-500">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MobileStatsTabProps {}

const MobileStatsTab = ({}: MobileStatsTabProps) => {
  return (
    <div className="px-4 py-4 overflow-y-auto space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-fuel-gray-900 dark:text-white">Statistics</h2>
        <select className="py-1 px-2 text-xs rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800 text-fuel-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuel-blue-500">
          <option>This Week</option>
          <option>This Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>
      
      <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-fuel-gray-900 dark:text-white text-sm mb-4">Consumption Overview</h3>
        
        <div className="h-40 bg-fuel-gray-100 dark:bg-fuel-gray-700/50 rounded-lg flex items-center justify-center mb-4">
          <div className="text-center">
            <BarChart3 size={24} className="mx-auto mb-2 text-fuel-gray-400" />
            <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Chart Visualization</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-fuel-gray-50 dark:bg-fuel-gray-700 rounded-lg p-2">
            <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Total Consumption</p>
            <p className="text-sm font-medium text-fuel-gray-900 dark:text-white">1,245 gal</p>
          </div>
          
          <div className="bg-fuel-gray-50 dark:bg-fuel-gray-700 rounded-lg p-2">
            <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Daily Average</p>
            <p className="text-sm font-medium text-fuel-gray-900 dark:text-white">178 gal</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-fuel-gray-900 dark:text-white text-sm mb-3">Usage by Fuel Type</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-fuel-gray-600 dark:text-fuel-gray-300">Regular</span>
              <span className="text-xs font-medium text-fuel-gray-900 dark:text-white">65%</span>
            </div>
            <div className="w-full h-2 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-fuel-blue-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-fuel-gray-600 dark:text-fuel-gray-300">Premium</span>
              <span className="text-xs font-medium text-fuel-gray-900 dark:text-white">25%</span>
            </div>
            <div className="w-full h-2 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-status-warning rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-fuel-gray-600 dark:text-fuel-gray-300">Diesel</span>
              <span className="text-xs font-medium text-fuel-gray-900 dark:text-white">10%</span>
            </div>
            <div className="w-full h-2 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-fuel-gray-500 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-fuel-gray-800 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-fuel-gray-900 dark:text-white text-sm mb-3">Fraud Detection Summary</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-fuel-gray-50 dark:bg-fuel-gray-700 rounded-lg p-2">
            <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Total Alerts</p>
            <p className="text-sm font-medium text-fuel-gray-900 dark:text-white">24</p>
          </div>
          
          <div className="bg-fuel-gray-50 dark:bg-fuel-gray-700 rounded-lg p-2">
            <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">False Positives</p>
            <p className="text-sm font-medium text-fuel-gray-900 dark:text-white">3</p>
          </div>
        </div>
        
        <button className="w-full py-2 text-xs font-medium bg-fuel-blue-500 hover:bg-fuel-blue-600 text-white rounded-lg transition-colors">
          View Detailed Report
        </button>
      </div>
    </div>
  );
};

const Mobile = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [flowStatus, setFlowStatus] = useState<'active' | 'paused' | 'stopped'>('active');
  const [flowRate, setFlowRate] = useState(12.5);
  
  const handleFlowToggle = () => {
    if (flowStatus === 'active') {
      setFlowStatus('paused');
    } else {
      setFlowStatus('active');
    }
  };
  
  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-2xl font-semibold text-fuel-gray-900 dark:text-white mb-8">Mobile Application</h2>
      
      <MobileDevice>
        <MobileStatusBar 
          batteryLevel={85}
          signalStrength={4}
          time="9:41"
        />
        
        <div className="flex-1 overflow-hidden">
          {activeTab === 'home' && (
            <MobileHomeTab data={statusData} />
          )}
          
          {activeTab === 'control' && (
            <MobileControlTab 
              flowStatus={flowStatus}
              flowRate={flowRate}
              onFlowToggle={handleFlowToggle}
              onRateChange={setFlowRate}
            />
          )}
          
          {activeTab === 'alerts' && (
            <MobileAlertsTab alerts={statusData.alerts} />
          )}
          
          {activeTab === 'stats' && (
            <MobileStatsTab />
          )}
        </div>
        
        <MobileTabBar 
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </MobileDevice>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-fuel-gray-600 dark:text-fuel-gray-400 max-w-md">
          The mobile app provides real-time monitoring and control of your fuel management system from anywhere. Download for iOS and Android devices.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button className="btn-primary">iOS App</button>
          <button className="btn-secondary">Android App</button>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
