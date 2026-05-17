import { useEffect, useMemo, useState } from 'react';
import {
  BedDouble,
  Building2,
  CalendarDays,
  ClipboardList,
  DoorOpen,
  Megaphone,
  ReceiptIndianRupee,
  TrendingDown,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { fetchComplaints, fetchProperties, fetchTransactions } from '../services/mockData';
import type { Complaint, Property, Transaction } from '../types/dashboard';
import './Dashboard.css';

type ComplaintAction = Complaint['action'];

const formatMoney = (amount: number) => {
  return `Rs ${amount.toLocaleString('en-IN')}`;
};

const getMonthOptions = () => {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat('en-IN', { month: 'short', year: 'numeric' });
  const firstMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return [
    {
      value: 'current',
      label: `${today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${firstMonthEnd.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`,
    },
    ...Array.from({ length: 5 }, (_, index) => {
      const month = new Date(today.getFullYear(), today.getMonth() - index - 1, 1);
      return {
        value: `${month.getFullYear()}-${month.getMonth() + 1}`,
        label: formatter.format(month),
      };
    }),
  ];
};

const getActionClass = (action: ComplaintAction) => {
  switch (action) {
    case 'Solved': return 'mz-badge--success';
    case 'Solving': return 'mz-badge--warning';
    case 'Denied': return 'mz-badge--mist';
    default: return 'mz-badge--mist';
  }
};

const Dashboard = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('current');
  const [occupancyPropertyId, setOccupancyPropertyId] = useState('all');
  const [loading, setLoading] = useState(true);

  const monthOptions = useMemo(() => getMonthOptions(), []);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [propertyData, transactionData, complaintData] = await Promise.all([
          fetchProperties(),
          fetchTransactions(),
          fetchComplaints(),
        ]);
        setProperties(propertyData);
        setTransactions(transactionData);
        setComplaints(complaintData.map((complaint) => ({ ...complaint, action: 'Solving' })));
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleComplaintActionChange = (complaintId: string, action: ComplaintAction) => {
    setComplaints((currentComplaints) => (
      currentComplaints.map((complaint) => (
        complaint.id === complaintId ? { ...complaint, action } : complaint
      ))
    ));
  };

  const selectedProperties = useMemo(() => {
    if (selectedPropertyId === 'all') {
      return properties;
    }

    return properties.filter((property) => property.id === selectedPropertyId);
  }, [properties, selectedPropertyId]);

  const selectedPropertyIds = useMemo(() => {
    return new Set(selectedProperties.map((property) => property.id));
  }, [selectedProperties]);

  const filteredTransactions = useMemo(() => {
    if (selectedPropertyId === 'all') {
      return transactions;
    }

    return transactions.filter((transaction) => transaction.propertyId === selectedPropertyId);
  }, [selectedPropertyId, transactions]);

  const filteredComplaints = useMemo(() => {
    if (selectedPropertyId === 'all') {
      return complaints;
    }

    return complaints.filter((complaint) => complaint.propertyId === selectedPropertyId);
  }, [complaints, selectedPropertyId]);

  const summary = useMemo(() => {
    const totalRooms = selectedProperties.reduce((sum, property) => sum + property.totalRooms, 0);
    const vacantRooms = selectedProperties.reduce((sum, property) => sum + property.availableRooms, 0);
    const filledRooms = totalRooms - vacantRooms;
    const totalBeds = selectedProperties.reduce((sum, property) => sum + (property.totalBeds || 0), 0);
    const filledBeds = selectedProperties.reduce((sum, property) => sum + (property.filledBeds || 0), 0);
    const tenantCapacity = selectedProperties.reduce((sum, property) => sum + (property.tenantCapacity || property.totalBeds || 0), 0);
    const upcomingTenants = selectedProperties.reduce((sum, property) => sum + (property.upcomingTenants || 0), 0);
    const noticePeriodTenants = selectedProperties.reduce((sum, property) => sum + (property.noticePeriodTenants || 0), 0);
    const totalRent = selectedProperties.reduce((sum, property) => sum + (property.monthlyRentTarget || 0), 0);
    return {
      filledRooms,
      noticePeriodTenants,
      tenantCapacity,
      totalBeds,
      totalRent,
      totalRooms,
      upcomingTenants,
      vacantRooms,
      filledBeds,
    };
  }, [selectedProperties]);

  const rentCollected = filteredTransactions
    .filter((transaction) => transaction.type === 'Income' && transaction.status === 'Completed')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = filteredTransactions
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const propertyRentData = properties
    .filter((property) => selectedPropertyId === 'all' || selectedPropertyIds.has(property.id))
    .map((property) => {
      const collected = transactions
        .filter((transaction) => (
          transaction.propertyId === property.id
          && transaction.type === 'Income'
          && transaction.status === 'Completed'
        ))
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return {
        name: property.name.replace(' Apartments', '').replace(' Hostel', ''),
        collected,
        target: property.monthlyRentTarget || 0,
      };
    });

  const occupancyProperties = occupancyPropertyId === 'all'
    ? properties
    : properties.filter((property) => property.id === occupancyPropertyId);

  const occupancySummary = occupancyProperties.reduce(
    (totals, property) => {
      const occupied = property.totalRooms - property.availableRooms;
      return {
        noticePeriodTenants: totals.noticePeriodTenants + (property.noticePeriodTenants || 0),
        occupiedRooms: totals.occupiedRooms + occupied,
        upcomingTenants: totals.upcomingTenants + (property.upcomingTenants || 0),
        vacantRooms: totals.vacantRooms + property.availableRooms,
      };
    },
    { noticePeriodTenants: 0, occupiedRooms: 0, upcomingTenants: 0, vacantRooms: 0 },
  );

  const occupancyChartData = occupancyProperties.map((property) => ({
    name: property.name.replace(' Apartments', '').replace(' Hostel', ''),
    occupied: property.totalRooms - property.availableRooms,
    vacant: property.availableRooms,
  }));

  const selectedPropertyLabel = selectedPropertyId === 'all'
    ? 'All properties'
    : properties.find((property) => property.id === selectedPropertyId)?.name || 'Selected property';

  if (loading) {
    return <div className="loading-state animate-fade-up">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard-page animate-fade-up">
      <div className="dashboard-header-section">
        <div>
          <h1 className="text-h1">Dashboard Overview</h1>
          <p className="text-body">Track property capacity, rent, expenses, occupancy, and complaints from one view.</p>
        </div>
        <label className="dashboard-select-label">
          <span>Property</span>
          <select
            className="mz-input dashboard-select"
            value={selectedPropertyId}
            onChange={(event) => setSelectedPropertyId(event.target.value)}
          >
            <option value="all">All properties</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>{property.name}</option>
            ))}
          </select>
        </label>
      </div>

      <section className="dashboard-card-grid" aria-label="Property capacity summary">
        <SummaryCard icon={DoorOpen} label="Total Rooms / Filled" value={`${summary.totalRooms}/${summary.filledRooms}`} tone="brand" />
        <SummaryCard icon={BedDouble} label="Total Beds / Filled" value={`${summary.totalBeds}/${summary.filledBeds}`} tone="success" />
        <SummaryCard icon={Users} label="Tenant Capacity" value={summary.tenantCapacity} tone="purple" />
        <SummaryCard icon={UserPlus} label="Upcoming Tenants" value={summary.upcomingTenants} tone="warning" />
      </section>

      <section className="dashboard-filter-cards" aria-label="Dashboard filters">
        <div className="dashboard-filter-card mz-card">
          <CalendarDays size={22} />
          <div>
            <span>Current Month</span>
            <select className="mz-input dashboard-select" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)}>
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="dashboard-filter-card mz-card">
          <Building2 size={22} />
          <div>
            <span>Property Scope</span>
            <strong>{selectedPropertyLabel}</strong>
            <small>{selectedProperties.length} property record{selectedProperties.length === 1 ? '' : 's'} from property management</small>
          </div>
        </div>
      </section>

      <section className="dashboard-finance-section" aria-label="Rent and expenses">
        <div className="dashboard-finance-cards">
          <SummaryCard
            icon={ReceiptIndianRupee}
            label="Rent Collected / Total Rent"
            value={`${formatMoney(rentCollected)} / ${formatMoney(summary.totalRent)}`}
            tone="success"
          />
          <SummaryCard
            icon={TrendingDown}
            label="Expenses"
            value={formatMoney(expenses)}
            tone="error"
          />
        </div>

        <div className="dashboard-chart-card mz-card">
          <div className="dashboard-section-title">
            <h2 className="text-h3">Property Wise Rent Collection</h2>
            <span>{selectedPropertyLabel}</span>
          </div>
          <div className="dashboard-chart-area">
            <ResponsiveContainer width="100%" height={310}>
              <BarChart data={propertyRentData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c8e6f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b9ab8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b9ab8', fontSize: 12 }} tickFormatter={(value) => `Rs ${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => formatMoney(Number(value || 0))} cursor={{ fill: 'rgba(91, 174, 224, 0.08)' }} />
                <Legend iconType="circle" />
                <Bar dataKey="target" name="Total Rent" fill="#c8e6f5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="collected" name="Collected" fill="#2ecc71" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="dashboard-occupancy-section" aria-label="Occupancy">
        <div className="dashboard-section-title dashboard-section-title--with-select">
          <div>
            <h2 className="text-h3">Occupancy</h2>
            <p className="text-body">Occupied vs vacant rooms across the selected property scope.</p>
          </div>
          <select
            className="mz-input dashboard-select"
            value={occupancyPropertyId}
            onChange={(event) => setOccupancyPropertyId(event.target.value)}
          >
            <option value="all">All properties</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>{property.name}</option>
            ))}
          </select>
        </div>

        <div className="dashboard-card-grid">
          <SummaryCard icon={DoorOpen} label="Occupied Rooms" value={occupancySummary.occupiedRooms} tone="success" />
          <SummaryCard icon={BedDouble} label="Vacant Rooms" value={occupancySummary.vacantRooms} tone="brand" />
          <SummaryCard icon={UserPlus} label="Upcoming Tenants" value={occupancySummary.upcomingTenants} tone="warning" />
          <SummaryCard icon={Users} label="Notice Period Tenants" value={occupancySummary.noticePeriodTenants} tone="purple" />
        </div>

        <div className="dashboard-chart-card mz-card">
          <div className="dashboard-section-title">
            <h2 className="text-h3">Occupied vs Vacant Rooms</h2>
          </div>
          <div className="dashboard-chart-area">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={occupancyChartData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c8e6f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b9ab8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b9ab8', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(91, 174, 224, 0.08)' }} />
                <Legend iconType="circle" />
                <Bar dataKey="occupied" name="Occupied" fill="#5baee0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="vacant" name="Vacant" fill="#f5a623" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="dashboard-complaints mz-card" aria-label="Complaints">
        <div className="dashboard-section-title">
          <div>
            <h2 className="text-h3">Complaints</h2>
            <p className="text-body">Timestamp, complaint, type, and current action status.</p>
          </div>
          <Megaphone size={22} />
        </div>

        <div className="table-responsive">
          <table className="mz-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Complaint</th>
                <th>Complaint Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>{new Date(complaint.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="font-medium text-primary">{complaint.complaint}</td>
                  <td>{complaint.type}</td>
                  <td>
                    <select
                      className={`dashboard-action-select ${getActionClass(complaint.action)}`}
                      value={complaint.action}
                      onChange={(event) => handleComplaintActionChange(complaint.id, event.target.value as ComplaintAction)}
                      aria-label={`Change action for ${complaint.complaint}`}
                    >
                      <option value="Solving">Solving</option>
                      <option value="Solved">Solved</option>
                      <option value="Denied">Denied</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

interface SummaryCardProps {
  icon: typeof ClipboardList;
  label: string;
  value: string | number;
  tone: 'brand' | 'success' | 'warning' | 'purple' | 'error';
}

const SummaryCard = ({ icon: Icon, label, value, tone }: SummaryCardProps) => (
  <article className="dashboard-summary-card mz-card">
    <div className={`dashboard-summary-card__icon bg-${tone}`}>
      <Icon size={20} />
    </div>
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  </article>
);

export default Dashboard;
