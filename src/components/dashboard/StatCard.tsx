import type { LucideIcon } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, colorClass = 'brand' }) => {
  return (
    <div className={`mz-card stat-card border-top-${colorClass}`}>
      <div className="stat-card-header">
        <h3 className="stat-title">{title}</h3>
        <div className={`stat-icon-wrapper bg-${colorClass}`}>
          <Icon className="stat-icon" size={20} />
        </div>
      </div>
      
      <div className="stat-card-body">
        <div className="stat-value text-display">{value}</div>
        
        {trend && (
          <div className={`stat-trend ${trend.isPositive ? 'trend-up' : 'trend-down'}`}>
            <span className="trend-indicator">{trend.isPositive ? '↑' : '↓'}</span>
            <span className="trend-value">{Math.abs(trend.value)}%</span>
            <span className="trend-label">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
