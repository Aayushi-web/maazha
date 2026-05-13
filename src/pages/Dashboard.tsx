import { useEffect, useState } from 'react';
import { Building2, Users, CreditCard, CalendarCheck } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import RecentBookings from '../components/dashboard/RecentBookings';
import { fetchDashboardStats } from '../services/mockData';
import type { DashboardStats } from '../types/dashboard';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    getStats();
  }, []);

  return (
    <div className="dashboard-page animate-fade-up">
      <div className="dashboard-header-section">
        <h1 className="text-h1">Dashboard Overview</h1>
        <p className="text-body">Here's what's happening with your properties today.</p>
      </div>

      {loading ? (
        <div className="loading-state">Loading dashboard data...</div>
      ) : (
        <>
          <div className="dashboard-stats-grid">
            <StatCard 
              title="Total Properties" 
              value={stats?.totalProperties || 0} 
              icon={Building2} 
              colorClass="brand"
            />
            <div className="stat-card-wrapper">
              <StatCard 
                title="Occupancy Rate" 
                value={`${stats?.occupancyRate || 0}%`} 
                icon={Users} 
                colorClass="success"
                trend={{ value: 4.2, isPositive: true }}
              />
            </div>
            <StatCard 
              title="Monthly Revenue" 
              value={`₹${((stats?.monthlyRevenue || 0) / 1000).toFixed(0)}k`} 
              icon={CreditCard} 
              colorClass="purple"
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard 
              title="Pending Bookings" 
              value={stats?.pendingBookings || 0} 
              icon={CalendarCheck} 
              colorClass="warning"
              trend={{ value: 2.1, isPositive: false }}
            />
          </div>

          <div className="dashboard-charts-grid">
            <div className="revenue-chart-wrapper">
              <RevenueChart />
            </div>
            <div className="secondary-chart-wrapper mz-card">
              <div className="bookings-header">
                <h3 className="text-h3">Occupancy by Property</h3>
              </div>
              <div className="dummy-chart-area">
                {/* Placeholder for a secondary chart (e.g. pie chart for occupancy) */}
                <div className="pie-placeholder">
                  <div className="pie-slice slice-1"></div>
                  <div className="pie-slice slice-2"></div>
                  <div className="pie-slice slice-3"></div>
                </div>
                <div className="pie-legend">
                  <div className="legend-item"><span className="dot dot-1"></span> Sunrise PG</div>
                  <div className="legend-item"><span className="dot dot-2"></span> Blue Horizon</div>
                  <div className="legend-item"><span className="dot dot-3"></span> Oakwood</div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-tables-section">
            <RecentBookings />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;