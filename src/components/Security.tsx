
import React, { useState } from 'react';
import { Shield, AlertTriangle, Clock, User, MapPin, Droplet, FileText, Lock, Eye, EyeOff, Users, PanelLeft, Play, Pause, ChevronRight, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const securityData = {
  alerts: [
    { id: 1, severity: 'high', title: 'Unusual flow rate detected', description: 'Flow rate at Pump #3 exceeded normal threshold by 35%', time: '10:45 AM', location: 'Station 2', status: 'new' },
    { id: 2, severity: 'medium', title: 'Off-hours fuel dispensing', description: 'Fuel dispensed from Pump #1 outside of operational hours', time: '02:30 AM', location: 'Station 1', status: 'investigating' },
    { id: 3, severity: 'low', title: 'Multiple authorization attempts', description: 'User ID 5432 had 3 failed authentication attempts', time: 'Yesterday', location: 'Mobile App', status: 'resolved' },
    { id: 4, severity: 'high', title: 'Unauthorized storage access', description: 'Unknown user attempted to access primary storage tank', time: 'Yesterday', location: 'Station 1', status: 'investigating' },
    { id: 5, severity: 'medium', title: 'Manual override activated', description: 'Manual override used on Pump #2 without prior authorization', time: '2 days ago', location: 'Station 3', status: 'resolved' },
  ],
  logs: [
    { id: 1, type: 'access', user: 'John Doe', action: 'Logged in to system', time: '10:23 AM', ip: '192.168.1.45' },
    { id: 2, type: 'operation', user: 'Sara Johnson', action: 'Started fuel pump #2', time: '10:15 AM', ip: '192.168.1.32' },
    { id: 3, type: 'system', user: 'System', action: 'Automatic calibration completed', time: '09:30 AM', ip: '-' },
    { id: 4, type: 'alert', user: 'System', action: 'Detected unusual flow rate at Pump #3', time: '09:25 AM', ip: '-' },
    { id: 5, type: 'operation', user: 'Mike Wilson', action: 'Stopped fuel pump #1', time: '09:10 AM', ip: '192.168.1.56' },
    { id: 6, type: 'access', user: 'Sara Johnson', action: 'Logged in to system', time: '09:05 AM', ip: '192.168.1.32' },
    { id: 7, type: 'system', user: 'System', action: 'Daily system check completed', time: '08:00 AM', ip: '-' },
  ],
  permissions: [
    { id: 1, role: 'Administrator', count: 3, permissions: ['Full Access', 'System Configuration', 'User Management', 'Report Generation'] },
    { id: 2, role: 'Manager', count: 5, permissions: ['Flow Control', 'Report Generation', 'Alert Management', 'Limited User Management'] },
    { id: 3, role: 'Operator', count: 12, permissions: ['Flow Control', 'Basic Reporting', 'View-only Access'] },
    { id: 4, role: 'Auditor', count: 2, permissions: ['Report Generation', 'Read-only System Access', 'Audit Trail Access'] },
  ],
};

interface SecurityAlertProps {
  alert: typeof securityData.alerts[0];
}

const SecurityAlert = ({ alert }: SecurityAlertProps) => {
  return (
    <div className={cn(
      "p-4 rounded-lg border-l-4 bg-white dark:bg-fuel-gray-800/50 shadow-sm hover:shadow-md transition-shadow",
      alert.severity === 'high' ? "border-status-error" : 
      alert.severity === 'medium' ? "border-status-warning" : 
      "border-status-info"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-full",
          alert.severity === 'high' ? "bg-status-error/10 text-status-error" : 
          alert.severity === 'medium' ? "bg-status-warning/10 text-status-warning" : 
          "bg-status-info/10 text-status-info"
        )}>
          <AlertTriangle size={20} />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
            <h4 className="font-medium text-fuel-gray-900 dark:text-white">{alert.title}</h4>
            <div className={cn(
              "px-2 py-0.5 text-xs font-medium rounded-full",
              alert.status === 'new' ? "bg-status-error/10 text-status-error" : 
              alert.status === 'investigating' ? "bg-status-warning/10 text-status-warning" : 
              "bg-status-success/10 text-status-success"
            )}>
              {alert.status === 'new' ? 'New' : 
               alert.status === 'investigating' ? 'Investigating' : 
               'Resolved'}
            </div>
          </div>
          
          <p className="text-sm text-fuel-gray-600 dark:text-fuel-gray-300 mb-3">
            {alert.description}
          </p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-fuel-gray-500 dark:text-fuel-gray-400">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{alert.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>{alert.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ActivityLogProps {
  log: typeof securityData.logs[0];
}

const ActivityLog = ({ log }: ActivityLogProps) => {
  return (
    <div className="py-3 border-b border-fuel-gray-200 dark:border-fuel-gray-700 flex items-center gap-3">
      <div className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
        log.type === 'access' ? "bg-fuel-blue-100 dark:bg-fuel-blue-900/30 text-fuel-blue-500" : 
        log.type === 'operation' ? "bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-600 dark:text-fuel-gray-400" : 
        log.type === 'alert' ? "bg-status-error/10 text-status-error" : 
        "bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-600 dark:text-fuel-gray-400"
      )}>
        {log.type === 'access' ? <User size={16} /> : 
         log.type === 'operation' ? <Droplet size={16} /> : 
         log.type === 'alert' ? <AlertTriangle size={16} /> : 
         <FileText size={16} />}
      </div>
      
      <div className="flex-1">
        <div className="flex flex-wrap justify-between items-start gap-2">
          <p className="text-sm font-medium text-fuel-gray-900 dark:text-white">{log.action}</p>
          <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">{log.time}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs font-medium text-fuel-gray-700 dark:text-fuel-gray-300">{log.user}</span>
          {log.ip !== '-' && (
            <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">· {log.ip}</span>
          )}
        </div>
      </div>
    </div>
  );
};

interface PermissionRoleProps {
  role: typeof securityData.permissions[0];
}

const PermissionRole = ({ role }: PermissionRoleProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white dark:bg-fuel-gray-800/50 rounded-lg shadow-sm overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-fuel-blue-100 dark:bg-fuel-blue-900/30 text-fuel-blue-500 p-2 rounded-full">
            <Lock size={16} />
          </div>
          <div>
            <h4 className="font-medium text-fuel-gray-900 dark:text-white">{role.role}</h4>
            <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">{role.count} users</p>
          </div>
        </div>
        
        <ChevronRight 
          size={20} 
          className={cn(
            "text-fuel-gray-400 transition-transform", 
            expanded && "rotate-90"
          )} 
        />
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800 rounded-lg p-3">
            <h5 className="text-sm font-medium text-fuel-gray-700 dark:text-fuel-gray-300 mb-2">Permissions</h5>
            <ul className="space-y-2">
              {role.permissions.map((permission, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-fuel-gray-600 dark:text-fuel-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuel-blue-500"></div>
                  {permission}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Security = () => {
  const [detectStatus, setDetectStatus] = useState<'active' | 'paused'>('active');
  const [visibilityStatus, setVisibilityStatus] = useState<'hidden' | 'visible'>('visible');
  
  const toggleDetection = () => {
    setDetectStatus(detectStatus === 'active' ? 'paused' : 'active');
  };
  
  const toggleVisibility = () => {
    setVisibilityStatus(visibilityStatus === 'visible' ? 'hidden' : 'visible');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-fuel-gray-900 dark:text-white">Security & Fraud Detection</h2>
        
        <div className="flex gap-2">
          <button 
            className={cn(
              "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
              detectStatus === 'active' 
                ? "bg-status-success/10 text-status-success hover:bg-status-success/20" 
                : "bg-status-error/10 text-status-error hover:bg-status-error/20"
            )}
            onClick={toggleDetection}
          >
            {detectStatus === 'active' ? (
              <>
                <Play size={16} />
                <span>Detection Active</span>
              </>
            ) : (
              <>
                <Pause size={16} />
                <span>Detection Paused</span>
              </>
            )}
          </button>
          
          <button 
            className="px-4 py-2 rounded-lg bg-fuel-gray-100 dark:bg-fuel-gray-800 text-fuel-gray-600 dark:text-fuel-gray-300 hover:bg-fuel-gray-200 dark:hover:bg-fuel-gray-700 flex items-center gap-2 transition-colors"
            onClick={toggleVisibility}
          >
            {visibilityStatus === 'visible' ? (
              <>
                <EyeOff size={16} />
                <span>Hide Sensitive</span>
              </>
            ) : (
              <>
                <Eye size={16} />
                <span>Show Sensitive</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="dashboard-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white">Security Alerts</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fuel-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search alerts..." 
                    className="pl-9 pr-4 py-2 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800 text-fuel-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-fuel-blue-500"
                  />
                </div>
                <button className="p-2 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800 text-fuel-gray-600 dark:text-fuel-gray-400">
                  <Filter size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {securityData.alerts.map(alert => (
                <SecurityAlert key={alert.id} alert={alert} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="text-sm font-medium text-fuel-blue-500 hover:text-fuel-blue-600 dark:text-fuel-blue-400 dark:hover:text-fuel-blue-300">
                View all alerts
              </button>
            </div>
          </div>
          
          <div className="dashboard-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white">Activity Logs</h3>
              <div className="flex gap-2">
                <select className="py-2 px-3 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800 text-fuel-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-fuel-blue-500">
                  <option>All Activities</option>
                  <option>Access Events</option>
                  <option>Operations</option>
                  <option>System Events</option>
                  <option>Alerts</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-hidden">
              {securityData.logs.map(log => (
                <ActivityLog key={log.id} log={log} />
              ))}
              <div className="py-3 flex justify-center">
                <button className="text-sm font-medium text-fuel-blue-500 hover:text-fuel-blue-600 dark:text-fuel-blue-400 dark:hover:text-fuel-blue-300">
                  Load more
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <div className="dashboard-card">
            <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white mb-6">Security Status</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-fuel-gray-600 dark:text-fuel-gray-400">System Security</p>
                  <span className="text-sm font-medium text-fuel-gray-900 dark:text-white">92%</span>
                </div>
                <div className="w-full h-2 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full overflow-hidden">
                  <div className="bg-status-success h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-fuel-gray-600 dark:text-fuel-gray-400">Fraud Detection</p>
                  <span className="text-sm font-medium text-fuel-gray-900 dark:text-white">86%</span>
                </div>
                <div className="w-full h-2 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full overflow-hidden">
                  <div className="bg-fuel-blue-500 h-full rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-fuel-gray-600 dark:text-fuel-gray-400">Unauthorized Access</p>
                  <span className="text-sm font-medium text-fuel-gray-900 dark:text-white">100%</span>
                </div>
                <div className="w-full h-2 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full overflow-hidden">
                  <div className="bg-status-success h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-fuel-gray-50 dark:bg-fuel-gray-800/80 border border-fuel-gray-200 dark:border-fuel-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-status-success/10 text-status-success">
                  <Shield size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-fuel-gray-900 dark:text-white">Security Assessment</h4>
                  <p className="text-sm text-fuel-gray-600 dark:text-fuel-gray-300 mt-1">Your system is well protected. Last scan completed 2 hours ago.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white">User Permissions</h3>
              <button className="text-sm font-medium text-fuel-blue-500 hover:text-fuel-blue-600 dark:text-fuel-blue-400 dark:hover:text-fuel-blue-300 flex items-center gap-1">
                <Users size={16} />
                <span>Manage</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {securityData.permissions.map(role => (
                <PermissionRole key={role.id} role={role} />
              ))}
            </div>
          </div>
          
          <div className="dashboard-card">
            <div className="flex items-center gap-3 mb-4">
              <PanelLeft size={20} className="text-fuel-blue-500" />
              <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white">Quick Actions</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <button className="btn-primary flex items-center justify-center gap-2">
                <Shield size={18} />
                <span>Run Security Scan</span>
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <Users size={18} />
                <span>Review User Access</span>
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <FileText size={18} />
                <span>Export Security Report</span>
              </button>
              <button className="btn-danger flex items-center justify-center gap-2">
                <Lock size={18} />
                <span>Lock All Pumps</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Security;
