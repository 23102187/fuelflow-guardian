
import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, Droplet, WifiOff, Activity, TrendingUp, Users, Shield, FileText, Gauge, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusData = {
  online: true,
  lastUpdate: new Date().toLocaleTimeString(),
  dispensed: 1254.8,
  flowRate: 12.5,
  storageLevel: 78,
  alerts: [
    { id: 1, type: 'error', message: 'Unusual flow rate detected at Pump #3', time: '10:45 AM' },
    { id: 2, type: 'warning', message: 'Storage level below 80%', time: '09:30 AM' },
    { id: 3, type: 'info', message: 'System maintenance scheduled for tomorrow', time: 'Yesterday' },
  ]
};

const consumptionData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 145 },
  { name: 'Wed', value: 132 },
  { name: 'Thu', value: 167 },
  { name: 'Fri', value: 178 },
  { name: 'Sat', value: 145 },
  { name: 'Sun', value: 130 },
];

const hourlyData = [
  { time: '6AM', value: 12 },
  { time: '8AM', value: 28 },
  { time: '10AM', value: 35 },
  { time: '12PM', value: 42 },
  { time: '2PM', value: 38 },
  { time: '4PM', value: 30 },
  { time: '6PM', value: 25 },
  { time: '8PM', value: 15 },
];

const distributionData = [
  { name: 'Pump 1', value: 30 },
  { name: 'Pump 2', value: 25 },
  { name: 'Pump 3', value: 15 },
  { name: 'Pump 4', value: 30 },
];

const COLORS = ['#2E7BFA', '#579BFF', '#8ABCFF', '#BCD9FF'];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Status overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="dashboard-card flex flex-col">
          <div className="mb-2 flex justify-between items-center">
            <h3 className="text-sm font-medium text-fuel-gray-500 dark:text-fuel-gray-400">System Status</h3>
            <span className={cn(
              "status-indicator",
              statusData.online ? "status-online" : "status-offline"
            )}>
              {statusData.online ? "Online" : "Offline"}
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center mt-4">
            <div className="relative">
              {statusData.online ? (
                <Activity size={50} className="text-status-success animate-pulse-glow" />
              ) : (
                <WifiOff size={50} className="text-status-error" />
              )}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-status-success rounded-full animate-pulse-glow"></span>
            </div>
            <p className="mt-3 text-sm text-fuel-gray-500 dark:text-fuel-gray-400">
              Last update: {statusData.lastUpdate}
            </p>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3 className="text-sm font-medium text-fuel-gray-500 dark:text-fuel-gray-400 mb-2">Total Dispensed</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="data-value">{statusData.dispensed.toLocaleString()}</p>
              <p className="data-label">Gallons</p>
            </div>
            <Droplet size={40} className="text-fuel-blue-500 opacity-80" />
          </div>
          <div className="mt-4 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consumptionData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Area type="monotone" dataKey="value" stroke="#2E7BFA" fill="#2E7BFA20" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3 className="text-sm font-medium text-fuel-gray-500 dark:text-fuel-gray-400 mb-2">Current Flow Rate</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="data-value">{statusData.flowRate}</p>
              <p className="data-label">Gal/min</p>
            </div>
            <Gauge size={40} className="text-fuel-blue-500 opacity-80" />
          </div>
          <div className="mt-4 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Line type="monotone" dataKey="value" stroke="#2E7BFA" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3 className="text-sm font-medium text-fuel-gray-500 dark:text-fuel-gray-400 mb-2">Storage Level</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="data-value">{statusData.storageLevel}%</p>
              <p className="data-label">Capacity</p>
            </div>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-fuel-blue-100 dark:bg-fuel-blue-900/30"></div>
              <div 
                className="absolute bottom-0 rounded-full bg-fuel-blue-500" 
                style={{ 
                  width: '100%', 
                  height: `${statusData.storageLevel}%`,
                  transition: 'height 1s ease-in-out'
                }}
              ></div>
              <span className="relative text-xs font-bold text-white">{statusData.storageLevel}%</span>
            </div>
          </div>
          <div className="w-full bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full h-2.5 mt-4">
            <div 
              className="bg-fuel-blue-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${statusData.storageLevel}%` }}
            ></div>
          </div>
          <p className="mt-2 text-xs text-fuel-gray-500 dark:text-fuel-gray-400">
            {statusData.storageLevel < 30 ? (
              <span className="text-status-error">Low storage - refill soon</span>
            ) : statusData.storageLevel < 70 ? (
              <span className="text-status-warning">Moderate level</span>
            ) : (
              <span className="text-status-success">Good level</span>
            )}
          </p>
        </div>
      </section>
      
      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-fuel-gray-900 dark:text-white">Weekly Consumption</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Last 7 days</span>
              <TrendingUp size={16} className="text-status-success" />
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumptionData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Bar dataKey="value" fill="#2E7BFA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-fuel-gray-900 dark:text-white">Hourly Activity</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">Today</span>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2E7BFA" 
                  strokeWidth={3}
                  dot={{ stroke: '#2E7BFA', strokeWidth: 2, r: 4, fill: 'white' }}
                  activeDot={{ stroke: '#2E7BFA', strokeWidth: 2, r: 6, fill: 'white' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      
      {/* Distribution and alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="dashboard-card lg:col-span-1">
          <h3 className="font-medium text-fuel-gray-900 dark:text-white mb-4">Distribution by Pump</h3>
          <div className="flex justify-center items-center h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {distributionData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm text-fuel-gray-600 dark:text-fuel-gray-400">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-card lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-fuel-gray-900 dark:text-white">Recent Alerts</h3>
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-fuel-blue-500" />
              <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">
                {statusData.alerts.length} notifications
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {statusData.alerts.map((alert) => (
              <div 
                key={alert.id}
                className={cn(
                  "p-4 rounded-lg flex items-start gap-3",
                  alert.type === 'error' ? "bg-status-error/10" : 
                  alert.type === 'warning' ? "bg-status-warning/10" : 
                  "bg-status-info/10"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full",
                  alert.type === 'error' ? "bg-status-error/20" : 
                  alert.type === 'warning' ? "bg-status-warning/20" : 
                  "bg-status-info/20"
                )}>
                  <AlertCircle size={16} className={cn(
                    alert.type === 'error' ? "text-status-error" : 
                    alert.type === 'warning' ? "text-status-warning" : 
                    "text-status-info"
                  )} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className={cn(
                      "font-medium",
                      alert.type === 'error' ? "text-status-error" : 
                      alert.type === 'warning' ? "text-status-warning" : 
                      "text-status-info"
                    )}>
                      {alert.type === 'error' ? 'Critical Alert' : 
                       alert.type === 'warning' ? 'Warning' : 
                       'Information'}
                    </p>
                    <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">{alert.time}</span>
                  </div>
                  <p className="text-sm text-fuel-gray-600 dark:text-fuel-gray-300 mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button className="text-sm font-medium text-fuel-blue-500 hover:text-fuel-blue-600 dark:text-fuel-blue-400 dark:hover:text-fuel-blue-300">
              View all alerts
            </button>
          </div>
        </div>
      </section>
      
      {/* Quick actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="dashboard-card flex flex-col">
          <h3 className="font-medium text-fuel-gray-900 dark:text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3 flex-1">
            <button className="btn-primary flex items-center justify-center gap-2">
              <Droplet size={18} />
              <span>Control Fuel</span>
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2">
              <Users size={18} />
              <span>User Access</span>
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2">
              <Shield size={18} />
              <span>Security</span>
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2">
              <FileText size={18} />
              <span>Reports</span>
            </button>
          </div>
        </div>
        
        <div className="dashboard-card md:col-span-2">
          <h3 className="font-medium text-fuel-gray-900 dark:text-white mb-3">System Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-fuel-blue-100 dark:bg-fuel-blue-900/30 flex items-center justify-center">
                  <Users size={16} className="text-fuel-blue-500" />
                </div>
                <span className="font-medium text-fuel-gray-800 dark:text-white">Users</span>
              </div>
              <p className="text-2xl font-semibold text-fuel-gray-900 dark:text-white">15</p>
              <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">3 active now</p>
            </div>
            
            <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-fuel-blue-100 dark:bg-fuel-blue-900/30 flex items-center justify-center">
                  <Shield size={16} className="text-fuel-blue-500" />
                </div>
                <span className="font-medium text-fuel-gray-800 dark:text-white">Security</span>
              </div>
              <p className="text-2xl font-semibold text-fuel-gray-900 dark:text-white">98%</p>
              <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">2 open issues</p>
            </div>
            
            <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-fuel-blue-100 dark:bg-fuel-blue-900/30 flex items-center justify-center">
                  <Bell size={16} className="text-fuel-blue-500" />
                </div>
                <span className="font-medium text-fuel-gray-800 dark:text-white">Alerts</span>
              </div>
              <p className="text-2xl font-semibold text-fuel-gray-900 dark:text-white">7</p>
              <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">1 critical alert</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
