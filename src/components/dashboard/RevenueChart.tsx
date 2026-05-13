import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockRevenueData } from '../../services/mockData';
import './RevenueChart.css';

const RevenueChart = () => {
  return (
    <div className="mz-card chart-card">
      <div className="chart-header">
        <h3 className="text-h3">Revenue Overview</h3>
        <select className="mz-input chart-filter">
          <option>This Year</option>
          <option>Last Year</option>
          <option>Last 6 Months</option>
        </select>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={mockRevenueData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5baee0" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#5baee0" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b9ab8' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b9ab8' }} tickFormatter={(value) => `₹${value/1000}k`} />
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 16px rgba(10, 30, 46, 0.1)' }}
              itemStyle={{ color: '#1a3d5c', fontWeight: 600 }}
              formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Revenue']}
            />
            <Area type="monotone" dataKey="revenue" stroke="#5baee0" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
