import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Download, FileText, Filter, FileSpreadsheet, Clock, Droplet, TrendingUp, TrendingDown, AlertTriangle, RefreshCcw, ChevronDown, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const reportsData = {
  consumptionOverview: [
    { month: 'Jan', regular: 4500, premium: 2300, diesel: 3800 },
    { month: 'Feb', regular: 5200, premium: 2800, diesel: 4100 },
    { month: 'Mar', regular: 4800, premium: 2400, diesel: 3900 },
    { month: 'Apr', regular: 6000, premium: 3100, diesel: 4500 },
    { month: 'May', regular: 5600, premium: 2900, diesel: 4200 },
    { month: 'Jun', regular: 7000, premium: 3600, diesel: 5200 },
  ],
  
  fraudData: [
    { name: 'Suspicious Transactions', value: 12 },
    { name: 'Unusual Hours', value: 8 },
    { name: 'Failed Authentications', value: 25 },
    { name: 'Manual Overrides', value: 5 },
  ],
  
  dailyConsumption: [
    { time: '12 AM', value: 10 },
    { time: '3 AM', value: 5 },
    { time: '6 AM', value: 20 },
    { time: '9 AM', value: 65 },
    { time: '12 PM', value: 80 },
    { time: '3 PM', value: 70 },
    { time: '6 PM', value: 60 },
    { time: '9 PM', value: 30 },
  ],
  
  recentReports: [
    { id: 1, title: 'Monthly Consumption Summary', date: '2023-09-01', type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Weekly Fraud Detection Report', date: '2023-09-15', type: 'CSV', size: '1.1 MB' },
    { id: 3, title: 'Daily Operations Log', date: '2023-09-22', type: 'XLSX', size: '3.7 MB' },
    { id: 4, title: 'System Security Audit', date: '2023-09-28', type: 'PDF', size: '5.2 MB' },
  ],
  
  savedReports: [
    { id: 1, title: 'Daily Consumption', schedule: 'Daily', lastRun: '2023-09-30', recipients: 3 },
    { id: 2, title: 'Weekly Security Overview', schedule: 'Weekly', lastRun: '2023-09-25', recipients: 5 },
    { id: 3, title: 'Monthly Management Report', schedule: 'Monthly', lastRun: '2023-09-01', recipients: 8 },
  ],
};

const COLORS = ['#2E7BFA', '#579BFF', '#8ABCFF', '#BCD9FF'];
const FUEL_COLORS = {
  regular: '#2E7BFA',
  premium: '#F59E0B',
  diesel: '#6B7280',
};

interface DateRangePickerProps {
  range: string;
  onChange: (range: string) => void;
}

const DateRangePicker = ({ range, onChange }: DateRangePickerProps) => {
  const ranges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date', 'Custom'];
  
  return (
    <div className="relative">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800 text-fuel-gray-900 dark:text-white text-sm">
        <Calendar size={16} className="text-fuel-gray-500 dark:text-fuel-gray-400" />
        <span>{range}</span>
        <ChevronDown size={16} className="text-fuel-gray-500 dark:text-fuel-gray-400" />
      </button>
    </div>
  );
};

const Reports = () => {
  const [dateRange, setDateRange] = useState('Last 30 days');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-fuel-gray-900 dark:text-white">Reports & Analytics</h2>
        
        <div className="flex items-center gap-2">
          <DateRangePicker range={dateRange} onChange={setDateRange} />
          
          <button className="p-2 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800 text-fuel-gray-600 dark:text-fuel-gray-400">
            <Filter size={16} />
          </button>
          
          <button className="btn-primary flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="dashboard-card">
          <p className="text-sm font-medium text-fuel-gray-500 dark:text-fuel-gray-400 mb-1">Total Consumption</p>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-semibold text-fuel-gray-900 dark:text-white">34,758</p>
            <div className="flex items-center text-status-success text-sm">
              <TrendingUp size={16} className="mr-1" />
              <span>12.5%</span>
            </div>
          </div>
          <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400 mt-1">vs previous period</p>
        </div>
        
        <div className="dashboard-card">
          <p className="text-sm font-medium text-fuel-gray-500 dark:text-fuel-gray-400 mb-1">Avg. Daily Usage</p>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-semibold text-fuel-gray-900 dark:text-white">1,158</p>
            <div className="flex items-center text-status-success text-sm">
              <TrendingUp size={16} className="mr-1" />
              <span>4.2%</span>
            </div>
          </div>
          <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400 mt-1">gallons per day</p>
        </div>
        
        <div className="dashboard-card">
          <p className="text-sm font-medium text-fuel-gray-500 dark:text-fuel-gray-400 mb-1">Peak Time Usage</p>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-semibold text-fuel-gray-900 dark:text-white">2-4 PM</p>
            <div className="flex items-center text-fuel-gray-500 dark:text-fuel-gray-400 text-sm">
              <Clock size={16} className="mr-1" />
            </div>
          </div>
          <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400 mt-1">consistent pattern</p>
        </div>
        
        <div className="dashboard-card">
          <p className="text-sm font-medium text-fuel-gray-500 dark:text-fuel-gray-400 mb-1">Fraud Alerts</p>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-semibold text-fuel-gray-900 dark:text-white">24</p>
            <div className="flex items-center text-status-error text-sm">
              <TrendingDown size={16} className="mr-1" />
              <span>8.3%</span>
            </div>
          </div>
          <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400 mt-1">8 require attention</p>
        </div>
      </section>
      
      {/* Main Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white">Fuel Consumption Trends</h3>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: FUEL_COLORS.regular }}></div>
                <span className="text-xs text-fuel-gray-600 dark:text-fuel-gray-400">Regular</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: FUEL_COLORS.premium }}></div>
                <span className="text-xs text-fuel-gray-600 dark:text-fuel-gray-400">Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: FUEL_COLORS.diesel }}></div>
                <span className="text-xs text-fuel-gray-600 dark:text-fuel-gray-400">Diesel</span>
              </div>
            </div>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportsData.consumptionOverview}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{ opacity: 0.5 }}
                />
                <Bar dataKey="regular" fill={FUEL_COLORS.regular} radius={[4, 4, 0, 0]} />
                <Bar dataKey="premium" fill={FUEL_COLORS.premium} radius={[4, 4, 0, 0]} />
                <Bar dataKey="diesel" fill={FUEL_COLORS.diesel} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white">Fraud Detection Analysis</h3>
            <button className="flex items-center gap-1 text-sm font-medium text-fuel-blue-500 hover:text-fuel-blue-600 dark:text-fuel-blue-400 dark:hover:text-fuel-blue-300">
              <RefreshCcw size={14} />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[180px]">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={reportsData.fraudData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {reportsData.fraudData.map((entry, index) => (
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
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="space-y-4">
                {reportsData.fraudData.map((item, index) => (
                  <div key={index} className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm font-medium text-fuel-gray-700 dark:text-fuel-gray-300">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-fuel-gray-900 dark:text-white">{item.value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          backgroundColor: COLORS[index % COLORS.length],
                          width: `${(item.value / reportsData.fraudData.reduce((acc, curr) => acc + curr.value, 0)) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-2">
                  <button className="w-full btn-secondary flex items-center justify-center gap-2">
                    <AlertTriangle size={16} />
                    <span>View All Alerts</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Daily Consumption Chart */}
      <section className="dashboard-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white">Daily Consumption Pattern</h3>
          <div className="flex items-center gap-2">
            <select className="py-1.5 px-3 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800 text-fuel-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-fuel-blue-500">
              <option>All Pumps</option>
              <option>Pump #1</option>
              <option>Pump #2</option>
              <option>Pump #3</option>
              <option>Pump #4</option>
            </select>
            <select className="py-1.5 px-3 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800 text-fuel-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-fuel-blue-500">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days Avg.</option>
            </select>
          </div>
        </div>
        
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={reportsData.dailyConsumption}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
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
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Droplet size={16} className="text-fuel-blue-500" />
              <p className="text-sm font-medium text-fuel-gray-700 dark:text-fuel-gray-300">Peak Hour</p>
            </div>
            <p className="text-lg font-semibold text-fuel-gray-900 dark:text-white">12 PM - 1 PM</p>
            <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400 mt-1">80 gallons dispensed</p>
          </div>
          
          <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Droplet size={16} className="text-fuel-blue-500" />
              <p className="text-sm font-medium text-fuel-gray-700 dark:text-fuel-gray-300">Low Hour</p>
            </div>
            <p className="text-lg font-semibold text-fuel-gray-900 dark:text-white">3 AM - 4 AM</p>
            <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400 mt-1">5 gallons dispensed</p>
          </div>
          
          <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Droplet size={16} className="text-fuel-blue-500" />
              <p className="text-sm font-medium text-fuel-gray-700 dark:text-fuel-gray-300">Total</p>
            </div>
            <p className="text-lg font-semibold text-fuel-gray-900 dark:text-white">450 gallons</p>
            <p className="text-xs text-status-success mt-1 flex items-center">
              <TrendingUp size={12} className="mr-1" />
              12% above average
            </p>
          </div>
          
          <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={16} className="text-status-warning" />
              <p className="text-sm font-medium text-fuel-gray-700 dark:text-fuel-gray-300">Anomalies</p>
            </div>
            <p className="text-lg font-semibold text-fuel-gray-900 dark:text-white">3 detected</p>
            <p className="text-xs text-status-warning mt-1">Unusual activity at 3:45 PM</p>
          </div>
        </div>
      </section>
      
      {/* Reports Management */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white">Recent Reports</h3>
            <button className="btn-primary flex items-center gap-2">
              <FileText size={16} />
              <span>Generate New</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {reportsData.recentReports.map((report) => (
              <div key={report.id} className="flex items-start p-4 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800/50">
                <div className={cn(
                  "p-3 rounded-lg mr-4",
                  report.type === 'PDF' ? "bg-status-error/10 text-status-error" : 
                  report.type === 'CSV' ? "bg-status-success/10 text-status-success" : 
                  "bg-fuel-blue-100 dark:bg-fuel-blue-900/30 text-fuel-blue-500"
                )}>
                  {report.type === 'PDF' ? <FileText size={24} /> : 
                   report.type === 'CSV' ? <FileText size={24} /> : 
                   <FileSpreadsheet size={24} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-fuel-gray-900 dark:text-white">{report.title}</h4>
                    <span className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400">{report.size}</span>
                  </div>
                  <p className="text-sm text-fuel-gray-600 dark:text-fuel-gray-400 mb-3">
                    Generated on {new Date(report.date).toLocaleDateString()}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full",
                      report.type === 'PDF' ? "bg-status-error/10 text-status-error" : 
                      report.type === 'CSV' ? "bg-status-success/10 text-status-success" : 
                      "bg-fuel-blue-100 dark:bg-fuel-blue-900/30 text-fuel-blue-500"
                    )}>
                      {report.type}
                    </span>
                    
                    <button className="text-sm font-medium text-fuel-blue-500 hover:text-fuel-blue-600 dark:text-fuel-blue-400 dark:hover:text-fuel-blue-300 flex items-center gap-1">
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-lg text-fuel-gray-900 dark:text-white">Scheduled Reports</h3>
            <button className="btn-secondary flex items-center gap-2">
              <Calendar size={16} />
              <span>Schedule New</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {reportsData.savedReports.map((report) => (
              <div key={report.id} className="p-4 rounded-lg border border-fuel-gray-200 dark:border-fuel-gray-700 bg-white dark:bg-fuel-gray-800/50">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-fuel-gray-900 dark:text-white">{report.title}</h4>
                  
                  <div className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full",
                    report.schedule === 'Daily' ? "bg-status-success/10 text-status-success" : 
                    report.schedule === 'Weekly' ? "bg-fuel-blue-100 dark:bg-fuel-blue-900/30 text-fuel-blue-500" : 
                    "bg-status-warning/10 text-status-warning"
                  )}>
                    {report.schedule}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400 mb-1">Last Generated</p>
                    <p className="text-sm font-medium text-fuel-gray-900 dark:text-white">
                      {new Date(report.lastRun).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-fuel-gray-500 dark:text-fuel-gray-400 mb-1">Recipients</p>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        <Mail size={14} className="text-fuel-gray-500 dark:text-fuel-gray-400 mr-1" />
                        <span className="text-sm font-medium text-fuel-gray-900 dark:text-white">{report.recipients}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <button className="text-sm font-medium text-fuel-gray-600 dark:text-fuel-gray-400 hover:text-fuel-gray-900 dark:hover:text-white transition-colors">
                    Edit
                  </button>
                  <button className="text-sm font-medium text-fuel-blue-500 hover:text-fuel-blue-600 dark:text-fuel-blue-400 dark:hover:text-fuel-blue-300 transition-colors">
                    Generate Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center">
            <button className="text-sm font-medium text-fuel-blue-500 hover:text-fuel-blue-600 dark:text-fuel-blue-400 dark:hover:text-fuel-blue-300">
              View all scheduled reports
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reports;
