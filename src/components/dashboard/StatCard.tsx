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

const StatCard = ({ title, value, icon: Icon, trend, colorClass = 'brand' }: StatCardProps) => {
  return (
    <div className="mz-card stat-card-custom">
      <div className="stat-card-header">
        <div className={`stat-card-icon bg-${colorClass}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="stat-card-title">{title}</p>
      <h3 className="stat-card-value">{value}</h3>
      
      {trend && (
        <div className={`stat-trend mt-2 ${trend.isPositive ? 'trend-up' : 'trend-down'}`}>
          <span className="trend-indicator">{trend.isPositive ? '↑' : '↓'}</span>
          <span className="trend-value">{Math.abs(trend.value)}%</span>
          <span className="trend-label">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
