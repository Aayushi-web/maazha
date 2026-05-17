import { useEffect, useState } from 'react';
import { fetchTransactions } from '../../services/mockData';
import type { Transaction } from '../../types/dashboard';
import './RecentRentActivity.css';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Completed': return 'mz-badge--success';
    case 'Pending': return 'mz-badge--warning';
    case 'Failed': return 'mz-badge--error';
    default: return 'mz-badge--mist';
  }
};

const normalizeDescription = (description: string) => {
  return description;
};

const RecentRentActivity = () => {
  const [rentActivity, setRentActivity] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRentActivity = async () => {
      try {
        const data = await fetchTransactions();
        setRentActivity(data.filter((item) => item.type === 'Income' || item.type === 'Refund').slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch rent activity', error);
      } finally {
        setLoading(false);
      }
    };
    getRentActivity();
  }, []);

  return (
    <div className="mz-card rent-activity-card">
      <div className="rent-activity-header">
        <h3 className="text-h3">Recent Rent Activity</h3>
        <button className="mz-btn mz-btn--ghost mz-btn--sm">View All</button>
      </div>

      <div className="table-responsive">
        {loading ? (
          <div className="loading-state">Loading rent activity...</div>
        ) : (
          <table className="mz-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rentActivity.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium text-primary">#{item.id.toUpperCase()}</td>
                  <td>{normalizeDescription(item.description)}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td className="font-semibold text-primary">{formatCurrency(item.amount)}</td>
                  <td>
                    <span className={`mz-badge ${getStatusBadgeClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentRentActivity;
