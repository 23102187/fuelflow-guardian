
import React, { useState } from 'react';
import { Play, PauseCircle, StopCircle, Droplet, Gauge, RotateCcw, AlertTriangle, CheckCircle, Settings, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FuelPumpProps {
  pumpId: number;
  status: 'idle' | 'active' | 'paused' | 'error';
  flowRate: number;
  totalDispensed: number;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

const FuelPump = ({ pumpId, status, flowRate, totalDispensed, onStart, onPause, onStop }: FuelPumpProps) => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-fuel-gray-900 dark:text-white">Pump #{pumpId}</h3>
        <div className="flex items-center">
          {status === 'idle' && (
            <span className="status-indicator bg-fuel-gray-200 dark:bg-fuel-gray-700 text-fuel-gray-700 dark:text-fuel-gray-300">
              Idle
            </span>
          )}
          {status === 'active' && (
            <span className="status-indicator status-online">
              Active
            </span>
          )}
          {status === 'paused' && (
            <span className="status-indicator status-warning">
              Paused
            </span>
          )}
          {status === 'error' && (
            <span className="status-indicator status-offline">
              Error
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Gauge size={16} className="text-fuel-blue-500" />
            <p className="text-sm text-fuel-gray-600 dark:text-fuel-gray-400">Flow Rate</p>
          </div>
          <p className="text-xl font-semibold text-fuel-gray-900 dark:text-white">{flowRate} gal/min</p>
        </div>
        
        <div className="bg-fuel-gray-50 dark:bg-fuel-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Droplet size={16} className="text-fuel-blue-500" />
            <p className="text-sm text-fuel-gray-600 dark:text-fuel-gray-400">Dispensed</p>
          </div>
          <p className="text-xl font-semibold text-fuel-gray-900 dark:text-white">{totalDispensed} gal</p>
        </div>
      </div>
      
      <div className={cn(
        "relative w-full h-4 rounded-full overflow-hidden mb-6",
        status === 'error' ? "bg-status-error/20" : "bg-fuel-gray-200 dark:bg-fuel-gray-700"
      )}>
        {status === 'active' && (
          <div className="absolute inset-0 bg-fuel-blue-500 animate-pulse-glow" style={{ width: `${Math.min(flowRate * 10, 100)}%` }}></div>
        )}
        {status === 'paused' && (
          <div className="absolute inset-0 bg-status-warning" style={{ width: `${Math.min(flowRate * 10, 100)}%` }}></div>
        )}
        {status === 'idle' && (
          <div className="absolute inset-0 bg-fuel-gray-400 dark:bg-fuel-gray-600" style={{ width: "3%" }}></div>
        )}
        {status === 'error' && (
          <div className="absolute inset-0 bg-status-error" style={{ width: "60%" }}></div>
        )}
      </div>
      
      <div className="flex justify-between gap-3">
        {status === 'idle' && (
          <button 
            className="btn-primary flex-1 flex items-center justify-center gap-2"
            onClick={onStart}
          >
            <Play size={16} />
            <span>Start</span>
          </button>
        )}
        
        {status === 'active' && (
          <>
            <button 
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
              onClick={onPause}
            >
              <PauseCircle size={16} />
              <span>Pause</span>
            </button>
            <button 
              className="btn-danger flex-1 flex items-center justify-center gap-2"
              onClick={onStop}
            >
              <StopCircle size={16} />
              <span>Stop</span>
            </button>
          </>
        )}
        
        {status === 'paused' && (
          <>
            <button 
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              onClick={onStart}
            >
              <Play size={16} />
              <span>Resume</span>
            </button>
            <button 
              className="btn-danger flex-1 flex items-center justify-center gap-2"
              onClick={onStop}
            >
              <StopCircle size={16} />
              <span>Stop</span>
            </button>
          </>
        )}
        
        {status === 'error' && (
          <>
            <button 
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
              onClick={onStop}
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
            <button 
              className="btn-danger flex-1 flex items-center justify-center gap-2"
            >
              <AlertTriangle size={16} />
              <span>Report</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

interface TankLevelProps {
  tankId: number;
  fuelType: string;
  level: number;
  capacity: number;
}

const TankLevel = ({ tankId, fuelType, level, capacity }: TankLevelProps) => {
  const percentage = (level / capacity) * 100;
  
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-fuel-gray-900 dark:text-white">Tank #{tankId} - {fuelType}</h3>
        <div className={cn(
          "status-indicator",
          percentage > 70 ? "status-online" : 
          percentage > 30 ? "status-warning" : 
          "status-offline"
        )}>
          {percentage > 70 ? "Good" : percentage > 30 ? "Medium" : "Low"}
        </div>
      </div>
      
      <div className="flex items-end gap-6 mb-6">
        <div className="flex-1">
          <div className="flex justify-between text-sm text-fuel-gray-600 dark:text-fuel-gray-400 mb-2">
            <span>{level.toLocaleString()} gal</span>
            <span>{capacity.toLocaleString()} gal</span>
          </div>
          <div className="w-full h-6 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500 ease-in-out",
                percentage > 70 ? "bg-status-success" : 
                percentage > 30 ? "bg-status-warning" : 
                "bg-status-error"
              )} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-32 border-2 border-fuel-gray-300 dark:border-fuel-gray-600 rounded-xl overflow-hidden bg-white dark:bg-fuel-gray-900 relative">
            <div 
              className={cn(
                "absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out",
                percentage > 70 ? "bg-status-success" : 
                percentage > 30 ? "bg-status-warning" : 
                "bg-status-error"
              )} 
              style={{ height: `${percentage}%` }}
            ></div>
            
            <div className="absolute inset-0 flex flex-col justify-between p-1 pointer-events-none">
              <div className="w-full h-px bg-fuel-gray-300 dark:bg-fuel-gray-600"></div>
              <div className="w-full h-px bg-fuel-gray-300 dark:bg-fuel-gray-600"></div>
              <div className="w-full h-px bg-fuel-gray-300 dark:bg-fuel-gray-600"></div>
              <div className="w-full h-px bg-fuel-gray-300 dark:bg-fuel-gray-600"></div>
            </div>
          </div>
          <p className="text-sm font-medium text-fuel-gray-700 dark:text-fuel-gray-300 mt-2">{Math.round(percentage)}%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button className="btn-secondary flex items-center justify-center gap-2">
          <Settings size={16} />
          <span>Configure</span>
        </button>
        <button className="btn-primary flex items-center justify-center gap-2">
          <span>Refill</span>
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
};

interface FlowMeterProps {
  meterId: number;
  status: 'calibrated' | 'needs-calibration' | 'error';
  lastCalibration: string;
  accuracy: number;
}

const FlowMeter = ({ meterId, status, lastCalibration, accuracy }: FlowMeterProps) => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-fuel-gray-900 dark:text-white">Flow Meter #{meterId}</h3>
        <div className={cn(
          "status-indicator",
          status === 'calibrated' ? "status-online" : 
          status === 'needs-calibration' ? "status-warning" : 
          "status-offline"
        )}>
          {status === 'calibrated' ? "Calibrated" : 
           status === 'needs-calibration' ? "Needs Calibration" : 
           "Error"}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="mb-4">
          <p className="text-sm text-fuel-gray-600 dark:text-fuel-gray-400 mb-1">Last Calibration</p>
          <p className="text-base font-medium text-fuel-gray-900 dark:text-white">{lastCalibration}</p>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-fuel-gray-600 dark:text-fuel-gray-400">Accuracy</p>
            <p className="text-sm font-medium text-fuel-gray-900 dark:text-white">{accuracy}%</p>
          </div>
          <div className="w-full h-2 bg-fuel-gray-200 dark:bg-fuel-gray-700 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full",
                accuracy > 95 ? "bg-status-success" : 
                accuracy > 85 ? "bg-status-warning" : 
                "bg-status-error"
              )} 
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-fuel-gray-50 dark:bg-fuel-gray-800/50">
          {status === 'calibrated' ? (
            <>
              <CheckCircle size={20} className="text-status-success" />
              <p className="text-sm text-fuel-gray-700 dark:text-fuel-gray-300">
                Meter is properly calibrated and functioning normally.
              </p>
            </>
          ) : status === 'needs-calibration' ? (
            <>
              <AlertTriangle size={20} className="text-status-warning" />
              <p className="text-sm text-fuel-gray-700 dark:text-fuel-gray-300">
                Calibration recommended. Readings may be off by {100 - accuracy}%.
              </p>
            </>
          ) : (
            <>
              <AlertTriangle size={20} className="text-status-error" />
              <p className="text-sm text-fuel-gray-700 dark:text-fuel-gray-300">
                Meter readings are unreliable. Service required.
              </p>
            </>
          )}
        </div>
      </div>
      
      <div className="flex justify-between gap-3">
        <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
          <Settings size={16} />
          <span>Adjust</span>
        </button>
        <button className="btn-primary flex-1 flex items-center justify-center gap-2">
          <RotateCcw size={16} />
          <span>Calibrate</span>
        </button>
      </div>
    </div>
  );
};

const FuelControl = () => {
  const [pumps, setPumps] = useState([
    { id: 1, status: 'active', flowRate: 12.5, totalDispensed: 243.8 },
    { id: 2, status: 'idle', flowRate: 0, totalDispensed: 0 },
    { id: 3, status: 'paused', flowRate: 8.2, totalDispensed: 152.4 },
    { id: 4, status: 'error', flowRate: 0, totalDispensed: 78.2 },
  ] as const);
  
  const tanks = [
    { id: 1, fuelType: 'Regular Unleaded', level: 3450, capacity: 5000 },
    { id: 2, fuelType: 'Premium Unleaded', level: 1850, capacity: 4000 },
    { id: 3, fuelType: 'Diesel', level: 850, capacity: 3000 },
  ];
  
  const flowMeters = [
    { id: 1, status: 'calibrated', lastCalibration: '2023-09-15', accuracy: 98.7 },
    { id: 2, status: 'needs-calibration', lastCalibration: '2023-06-22', accuracy: 92.3 },
    { id: 3, status: 'error', lastCalibration: '2023-04-10', accuracy: 78.5 },
  ] as const;
  
  const handlePumpStart = (pumpId: number) => {
    setPumps(pumps.map(pump => 
      pump.id === pumpId 
        ? { ...pump, status: 'active', flowRate: pump.status === 'paused' ? pump.flowRate : 10.0 } 
        : pump
    ));
  };
  
  const handlePumpPause = (pumpId: number) => {
    setPumps(pumps.map(pump => 
      pump.id === pumpId 
        ? { ...pump, status: 'paused' } 
        : pump
    ));
  };
  
  const handlePumpStop = (pumpId: number) => {
    setPumps(pumps.map(pump => 
      pump.id === pumpId 
        ? { ...pump, status: 'idle', flowRate: 0 } 
        : pump
    ));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-fuel-gray-900 dark:text-white mb-6">Fuel Control Panel</h2>
      
      <section className="mb-8">
        <h3 className="text-lg font-medium text-fuel-gray-900 dark:text-white mb-4">Pump Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pumps.map(pump => (
            <FuelPump 
              key={pump.id}
              pumpId={pump.id}
              status={pump.status}
              flowRate={pump.flowRate}
              totalDispensed={pump.totalDispensed}
              onStart={() => handlePumpStart(pump.id)}
              onPause={() => handlePumpPause(pump.id)}
              onStop={() => handlePumpStop(pump.id)}
            />
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-lg font-medium text-fuel-gray-900 dark:text-white mb-4">Tank Monitoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tanks.map(tank => (
            <TankLevel 
              key={tank.id}
              tankId={tank.id}
              fuelType={tank.fuelType}
              level={tank.level}
              capacity={tank.capacity}
            />
          ))}
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-medium text-fuel-gray-900 dark:text-white mb-4">Flow Meter Calibration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flowMeters.map(meter => (
            <FlowMeter 
              key={meter.id}
              meterId={meter.id}
              status={meter.status}
              lastCalibration={meter.lastCalibration}
              accuracy={meter.accuracy}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FuelControl;
