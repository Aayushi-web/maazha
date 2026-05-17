import { useEffect, useMemo, useState } from 'react';
import { Building2, Download, Search } from 'lucide-react';
import { fetchProperties, fetchTransactions } from '../services/mockData';
import type { Property, Transaction } from '../types/dashboard';
import './ManagementPages.css';
import './RentManagementPage.css';

type RentFilter = 'All' | 'Completed' | 'Pending';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'mz-badge--success';
    case 'Pending':
      return 'mz-badge--warning';
    case 'Failed':
      return 'mz-badge--error';
    default:
      return 'mz-badge--mist';
  }
};

const sumAmounts = (items: Transaction[]) => items.reduce((sum, item) => sum + item.amount, 0);

const RentManagementPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<RentFilter>('All');

  useEffect(() => {
    const load = async () => {
      try {
        const [txns, props] = await Promise.all([fetchTransactions(), fetchProperties()]);
        setTransactions(txns.filter((transaction) => (
          transaction.category === 'Rent' || transaction.category === 'Security Deposit'
        )));
        setProperties(props);
      } catch (err) {
        console.error('Failed to load rent data', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const propertyNameMap = useMemo(
    () => Object.fromEntries(properties.map((property) => [property.id, property.name])),
    [properties]
  );

  const propertyFiltered = useMemo(
    () => selectedProperty === 'all'
      ? transactions
      : transactions.filter((transaction) => transaction.propertyId === selectedProperty),
    [transactions, selectedProperty]
  );

  const rentCollected = sumAmounts(
    propertyFiltered.filter((transaction) => (
      transaction.category === 'Rent' && transaction.status === 'Completed' && transaction.type === 'Income'
    ))
  );
  const rentPending = sumAmounts(
    propertyFiltered.filter((transaction) => transaction.category === 'Rent' && transaction.status === 'Pending')
  );
  const totalRent = rentCollected + rentPending;

  const securityToCollect = sumAmounts(
    propertyFiltered.filter((transaction) => (
      transaction.category === 'Security Deposit' && transaction.type === 'Income' && transaction.status === 'Pending'
    ))
  );
  const securityCollected = sumAmounts(
    propertyFiltered.filter((transaction) => (
      transaction.category === 'Security Deposit' && transaction.type === 'Income' && transaction.status === 'Completed'
    ))
  );
  const securityToRefund = sumAmounts(
    propertyFiltered.filter((transaction) => transaction.category === 'Security Deposit' && transaction.type === 'Refund')
  );
  const totalSecurity = securityCollected + securityToCollect + securityToRefund;

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return propertyFiltered.filter((transaction) => {
      const matchesFilter = activeFilter === 'All' || transaction.status === activeFilter;
      const propertyName = propertyNameMap[transaction.propertyId ?? ''] ?? '';
      const matchesQuery = !normalizedQuery
        || propertyName.toLowerCase().includes(normalizedQuery)
        || (transaction.roomNumber ?? '').toLowerCase().includes(normalizedQuery)
        || (transaction.category ?? '').toLowerCase().includes(normalizedQuery)
        || transaction.type.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [propertyFiltered, activeFilter, query, propertyNameMap]);

  if (loading) {
    return <div className="loading-state animate-fade-up">Loading rent management...</div>;
  }

  return (
    <div className="management-page animate-fade-up">
      <div className="management-header">
        <div>
          <h1 className="text-h1">Rent Management</h1>
          <p className="text-body">Track collections, pending dues, refunds, and security deposits.</p>
        </div>
        <button className="mz-btn mz-btn--ghost" type="button">
          <Download size={18} /> Export Report
        </button>
      </div>

      <section className="rm-property-filter" aria-label="Property filter">
        <label className="rm-property-filter__control">
          <span className="rm-property-filter__label">Property</span>
          <span className="rm-property-filter__select-wrap">
            <Building2 size={17} aria-hidden="true" />
            <select
              className="rm-property-filter__select"
              value={selectedProperty}
              onChange={(event) => setSelectedProperty(event.target.value)}
            >
              <option value="all">All Properties</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </span>
        </label>
      </section>

      <section className="rm-summary-grid" aria-label="Rent and security deposit summary">
        <article className="rm-summary-card rm-summary-card--rent">
          <div className="rm-summary-card__header">
            <span className="rm-summary-card__label">Total Rent</span>
            <span className="rm-summary-card__badge rm-summary-card__badge--rent">Rent</span>
          </div>
          <div className="rm-summary-card__amount">{formatCurrency(totalRent)}</div>
          <div className="rm-summary-card__sub-grid">
            <div className="rm-sub-card rm-sub-card--success">
              <span className="rm-sub-card__label">Collected</span>
              <span className="rm-sub-card__amount">{formatCurrency(rentCollected)}</span>
            </div>
            <div className="rm-sub-card rm-sub-card--warning">
              <span className="rm-sub-card__label">Pending</span>
              <span className="rm-sub-card__amount">{formatCurrency(rentPending)}</span>
            </div>
          </div>
        </article>

        <article className="rm-summary-card rm-summary-card--security">
          <div className="rm-summary-card__header">
            <span className="rm-summary-card__label">Total Security Deposit</span>
            <span className="rm-summary-card__badge rm-summary-card__badge--security">Deposit</span>
          </div>
          <div className="rm-summary-card__amount">{formatCurrency(totalSecurity)}</div>
          <div className="rm-summary-card__sub-grid">
            <div className="rm-sub-card rm-sub-card--info">
              <span className="rm-sub-card__label">To Collect</span>
              <span className="rm-sub-card__amount">{formatCurrency(securityToCollect)}</span>
            </div>
            <div className="rm-sub-card rm-sub-card--mist">
              <span className="rm-sub-card__label">To Refund</span>
              <span className="rm-sub-card__amount">{formatCurrency(securityToRefund)}</span>
            </div>
          </div>
        </article>
      </section>

      <section className="management-card mz-card" aria-label="Rent records">
        <div className="management-toolbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by property, room, or type..."
              className="mz-input search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="management-tabs" aria-label="Rent status filters">
            {(['All', 'Completed', 'Pending'] as RentFilter[]).map((filter) => (
              <button
                key={filter}
                className={`tab-btn ${activeFilter === filter ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive">
          <table className="mz-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Room Number</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="rm-empty-cell">
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredRows.map((item) => (
                  <tr key={item.id}>
                    <td className="font-medium text-primary">
                      {propertyNameMap[item.propertyId ?? ''] ?? '-'}
                    </td>
                    <td>{item.roomNumber ?? '-'}</td>
                    <td>{new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>
                      <span className={`mz-badge ${item.category === 'Rent' ? 'mz-badge--brand' : 'mz-badge--mist'}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="font-semibold text-primary">{formatCurrency(item.amount)}</td>
                    <td>
                      <span className={`mz-badge ${getStatusBadgeClass(item.status)}`}>{item.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default RentManagementPage;
