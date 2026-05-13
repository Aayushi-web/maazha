import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Clock, Search, Filter, Download, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../components/dashboard/StatCard';
import { fetchRevenueData, fetchTransactions } from '../services/mockData';
import type { RevenueData, Transaction } from '../types/dashboard';
import './FinancePage.css';

const FinancePage = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'All' | 'Income' | 'Expense'>('All');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [revData, txnData] = await Promise.all([
          fetchRevenueData(),
          fetchTransactions()
        ]);
        setRevenueData(revData);
        setTransactions(txnData);
      } catch (error) {
        console.error("Failed to load finance data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const getTransactionBadgeClass = (type: string) => {
    switch (type) {
      case 'Income': return 'txn-badge income';
      case 'Expense': return 'txn-badge expense';
      case 'Refund': return 'txn-badge refund';
      default: return 'txn-badge';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Completed': return 'mz-badge--success';
      case 'Pending': return 'mz-badge--warning';
      case 'Failed': return 'mz-badge--error';
      default: return 'mz-badge--mist';
    }
  };

  // KPIs
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const pendingAmount = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);

  const filteredTransactions = activeTab === 'All' 
    ? transactions 
    : transactions.filter(t => t.type === activeTab);

  if (loading) {
    return <div className="loading-state animate-fade-up">Loading financial data...</div>;
  }

  return (
    <div className="finance-page animate-fade-up">
      <div className="finance-header-section">
        <div>
          <h1 className="text-h1">Financial Overview</h1>
          <p className="text-body">Track revenue, monitor expenses, and manage accounting.</p>
        </div>
        <div className="header-actions">
          <button className="mz-btn mz-btn--ghost">
            <Download size={18} /> Export Report
          </button>
          <button className="mz-btn mz-btn--primary">
            <Plus size={18} /> Record Transaction
          </button>
        </div>
      </div>

      <div className="finance-stats-grid">
        <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={TrendingUp} colorClass="success" />
        <StatCard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={TrendingDown} colorClass="error" />
        <StatCard title="Net Profit" value={formatCurrency(netProfit)} icon={DollarSign} colorClass="brand" />
        <StatCard title="Pending Outstanding" value={formatCurrency(pendingAmount)} icon={Clock} colorClass="warning" />
      </div>

      <div className="finance-content-grid">
        {/* Chart Section */}
        <div className="mz-card chart-card">
          <h3 className="text-h3 mb-4">Revenue vs Expenses (Last 6 Months)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c8e6f5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  cursor={{fill: 'rgba(91, 174, 224, 0.05)'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 16px rgba(10,30,46,0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="revenue" name="Revenue" fill="#2ecc71" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="expenses" name="Expenses" fill="#e74c3c" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Ledger */}
        <div className="mz-card ledger-card">
          <div className="ledger-header">
            <h3 className="text-h3">Transaction Ledger</h3>
            <div className="ledger-tabs">
              <button 
                className={`tab-btn ${activeTab === 'All' ? 'active' : ''}`}
                onClick={() => setActiveTab('All')}
              >All</button>
              <button 
                className={`tab-btn ${activeTab === 'Income' ? 'active' : ''}`}
                onClick={() => setActiveTab('Income')}
              >Income</button>
              <button 
                className={`tab-btn ${activeTab === 'Expense' ? 'active' : ''}`}
                onClick={() => setActiveTab('Expense')}
              >Expense</button>
            </div>
          </div>

          <div className="ledger-toolbar">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search transactions..." className="mz-input search-input" />
            </div>
            <button className="mz-btn mz-btn--ghost mz-btn--sm">
              <Filter size={16} /> Filters
            </button>
          </div>

          <div className="table-responsive mt-4">
            <table className="mz-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date & Time</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>
                      <span className="txn-id">#{txn.id.toUpperCase()}</span>
                      {txn.referenceId && <div className="txn-ref">Ref: {txn.referenceId}</div>}
                    </td>
                    <td>
                      <div className="txn-date">{new Date(txn.date).toLocaleDateString()}</div>
                      <div className="txn-time">{new Date(txn.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </td>
                    <td>
                      <span className="txn-desc">{txn.description}</span>
                    </td>
                    <td>
                      <span className={getTransactionBadgeClass(txn.type)}>{txn.type}</span>
                    </td>
                    <td>
                      <span className={`txn-amount ${txn.type === 'Expense' ? 'text-error' : 'text-success'}`}>
                        {txn.type === 'Expense' || txn.type === 'Refund' ? '-' : '+'}
                        {formatCurrency(txn.amount)}
                      </span>
                    </td>
                    <td>
                      <span className={`mz-badge ${getStatusBadgeClass(txn.status)}`}>{txn.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
