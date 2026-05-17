import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Building2, Plus, Search, TrendingDown, X } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { fetchProperties, fetchTransactions } from '../services/mockData';
import type { Property, Transaction } from '../types/dashboard';
import './ManagementPages.css';
import './ExpenseManagementPage.css';

type ExpenseFilter = 'All' | 'Completed' | 'Pending';

type ExpenseFormData = {
  category: NonNullable<Transaction['expenseCategory']>;
  propertyId: string;
  nameMode: 'existing' | 'new';
  name: string;
  newName: string;
  expenseType: string;
  customExpenseType: string;
  amount: string;
  date: string;
};

const expenseTypeOptions = ['Salary', 'Plumbing', 'Others'];

const initialFormData: ExpenseFormData = {
  category: 'Property',
  propertyId: '',
  nameMode: 'existing',
  name: '',
  newName: '',
  expenseType: 'Salary',
  customExpenseType: '',
  amount: '',
  date: new Date().toISOString().slice(0, 10),
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

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

const getExpenseName = (expense: Transaction) => expense.expenseName || expense.description;

const isSameMonth = (dateValue: string, date: Date) => {
  const itemDate = new Date(dateValue);
  return itemDate.getFullYear() === date.getFullYear() && itemDate.getMonth() === date.getMonth();
};

const ExpenseManagementPage = () => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ExpenseFilter>('All');
  const [selectedPropertyId, setSelectedPropertyId] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState<ExpenseFormData>(initialFormData);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const [transactionData, propertyData] = await Promise.all([fetchTransactions(), fetchProperties()]);
        setExpenses(transactionData.filter((item) => item.type === 'Expense'));
        setProperties(propertyData);
      } catch (error) {
        console.error('Failed to load expense management data', error);
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, []);

  const propertyNameMap = useMemo(
    () => Object.fromEntries(properties.map((property) => [property.id, property.name])),
    [properties]
  );

  const propertyFilteredExpenses = useMemo(() => {
    if (selectedPropertyId === 'all') {
      return expenses;
    }

    return expenses.filter((expense) => expense.propertyId === selectedPropertyId);
  }, [expenses, selectedPropertyId]);

  const filteredExpenses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return propertyFilteredExpenses.filter((item) => {
      const matchesFilter = activeFilter === 'All' || item.status === activeFilter;
      const propertyName = propertyNameMap[item.propertyId ?? ''] ?? '';
      const matchesQuery = !normalizedQuery
        || item.description.toLowerCase().includes(normalizedQuery)
        || getExpenseName(item).toLowerCase().includes(normalizedQuery)
        || (item.expenseType ?? '').toLowerCase().includes(normalizedQuery)
        || propertyName.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, propertyFilteredExpenses, propertyNameMap, query]);

  const existingExpenseNames = useMemo(() => {
    const names = expenses.map(getExpenseName).filter(Boolean);
    return Array.from(new Set(names));
  }, [expenses]);

  const totalExpenses = propertyFilteredExpenses.reduce((sum, item) => sum + item.amount, 0);

  const currentMonth = new Date();
  const previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  const currentMonthTotal = propertyFilteredExpenses
    .filter((expense) => isSameMonth(expense.date, currentMonth))
    .reduce((sum, expense) => sum + expense.amount, 0);
  const previousMonthTotal = propertyFilteredExpenses
    .filter((expense) => isSameMonth(expense.date, previousMonth))
    .reduce((sum, expense) => sum + expense.amount, 0);
  const monthDifference = currentMonthTotal - previousMonthTotal;
  const monthTrendText = monthDifference === 0
    ? 'Same as previous month'
    : `${formatCurrency(Math.abs(monthDifference))} ${monthDifference > 0 ? 'higher' : 'lower'} than previous month`;

  const propertyExpenseData = properties.map((property) => {
    const total = expenses
      .filter((expense) => expense.propertyId === property.id)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      name: property.name.replace(' Apartments', '').replace(' Hostel', ''),
      total,
    };
  });

  const openAddForm = () => {
    const defaultProperty = selectedPropertyId === 'all'
      ? properties[0]
      : properties.find((property) => property.id === selectedPropertyId) ?? properties[0];
    const defaultName = existingExpenseNames[0] ?? '';

    setFormData({
      ...initialFormData,
      propertyId: defaultProperty?.id ?? '',
      name: defaultName,
      nameMode: defaultName ? 'existing' : 'new',
    });
    setIsAddOpen(true);
  };

  const closeAddForm = () => {
    setFormData(initialFormData);
    setIsAddOpen(false);
  };

  const handleAddExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedProperty = properties.find((property) => property.id === formData.propertyId);
    const expenseName = formData.nameMode === 'new' ? formData.newName.trim() : formData.name.trim();
    const expenseType = formData.expenseType === 'Others'
      ? formData.customExpenseType.trim() || 'Others'
      : formData.expenseType;

    const newExpense: Transaction = {
      id: `txn_expense_${Date.now()}`,
      date: new Date(formData.date).toISOString(),
      description: expenseName,
      amount: Number(formData.amount),
      type: 'Expense',
      status: 'Completed',
      propertyId: formData.category === 'Property' ? selectedProperty?.id : undefined,
      category: 'Expense',
      expenseCategory: formData.category,
      expenseName,
      expenseType,
      referenceId: `exp_${Date.now()}`,
    };

    setExpenses((currentExpenses) => [newExpense, ...currentExpenses]);
    closeAddForm();
  };

  if (loading) {
    return <div className="loading-state animate-fade-up">Loading expense management...</div>;
  }

  return (
    <div className="management-page animate-fade-up">
      <div className="management-header">
        <div>
          <h1 className="text-h1">Expense Management</h1>
          <p className="text-body">Review operating expenses, approvals, and pending vendor payments.</p>
        </div>
        <button className="mz-btn mz-btn--primary" type="button" onClick={openAddForm}>
          <Plus size={18} /> Add Expense
        </button>
      </div>

      <section className="expense-property-filter" aria-label="Property filter">
        <label className="expense-property-filter__control">
          <span className="expense-property-filter__label">Property</span>
          <span className="expense-property-filter__select-wrap">
            <Building2 size={17} aria-hidden="true" />
            <select
              className="expense-property-filter__select"
              value={selectedPropertyId}
              onChange={(event) => setSelectedPropertyId(event.target.value)}
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

      <section className="expense-summary-grid" aria-label="Expense summary">
        <article className="expense-total-card mz-card">
          <div className="expense-total-card__icon">
            <TrendingDown size={22} />
          </div>
          <div>
            <span>Total Expense</span>
            <strong>{formatCurrency(totalExpenses)}</strong>
            <small className={monthDifference > 0 ? 'is-higher' : monthDifference < 0 ? 'is-lower' : ''}>
              {monthTrendText}
            </small>
          </div>
        </article>

        <article className="expense-chart-card mz-card">
          <div className="expense-chart-card__header">
            <h2 className="text-h3">Property-wise Expense</h2>
          </div>
          <div className="expense-chart-area">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={propertyExpenseData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c8e6f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b9ab8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b9ab8', fontSize: 12 }} tickFormatter={(value) => `Rs ${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value || 0))} cursor={{ fill: 'rgba(91, 174, 224, 0.08)' }} />
                <Bar dataKey="total" name="Expense" fill="#f5a623" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <div className="management-card mz-card">
        <div className="management-toolbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search expenses..."
              className="mz-input search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="management-tabs" aria-label="Expense status filters">
            {(['All', 'Completed', 'Pending'] as ExpenseFilter[]).map((filter) => (
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
                <th>Name</th>
                <th>Property</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td className="expense-empty-cell" colSpan={6}>
                    No expenses found.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((item) => (
                  <tr key={item.id}>
                    <td className="font-medium text-primary">{getExpenseName(item)}</td>
                    <td>{propertyNameMap[item.propertyId ?? ''] ?? item.expenseCategory ?? 'Others'}</td>
                    <td>{item.expenseType ?? 'Operations'}</td>
                    <td>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="font-semibold text-primary">{formatCurrency(item.amount)}</td>
                    <td><span className={`mz-badge ${getStatusBadgeClass(item.status)}`}>{item.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddOpen && (
        <div className="management-modal-overlay" role="presentation">
          <div className="management-modal expense-modal" role="dialog" aria-modal="true" aria-labelledby="add-expense-title">
            <div className="management-modal-header">
              <div>
                <h2 className="text-h3" id="add-expense-title">Add Expense</h2>
                <p className="text-body">Add an expense with category, name, type, amount, and date.</p>
              </div>
              <button
                className="management-icon-button"
                type="button"
                aria-label="Close add expense form"
                onClick={closeAddForm}
              >
                <X size={18} />
              </button>
            </div>

            <form className="management-form expense-form" onSubmit={handleAddExpense}>
              <div className="management-form-grid">
                <label>
                  <span>Category</span>
                  <select
                    className="mz-input"
                    value={formData.category}
                    onChange={(event) => setFormData((current) => ({ ...current, category: event.target.value as ExpenseFormData['category'] }))}
                  >
                    <option value="Property">Property</option>
                    <option value="All Property">All Property</option>
                    <option value="Others">Others</option>
                  </select>
                </label>

                {formData.category === 'Property' && (
                  <label>
                    <span>Property</span>
                    <select
                      className="mz-input"
                      value={formData.propertyId}
                      onChange={(event) => setFormData((current) => ({ ...current, propertyId: event.target.value }))}
                      required
                    >
                      {properties.map((property) => (
                        <option key={property.id} value={property.id}>
                          {property.name}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                <label>
                  <span>Name</span>
                  <select
                    className="mz-input"
                    value={formData.nameMode === 'new' ? 'new' : formData.name}
                    onChange={(event) => {
                      const value = event.target.value;
                      setFormData((current) => ({
                        ...current,
                        nameMode: value === 'new' ? 'new' : 'existing',
                        name: value === 'new' ? current.name : value,
                      }));
                    }}
                  >
                    {existingExpenseNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                    <option value="new">Add new name</option>
                  </select>
                </label>

                {formData.nameMode === 'new' && (
                  <label>
                    <span>New Name</span>
                    <input
                      className="mz-input"
                      type="text"
                      value={formData.newName}
                      onChange={(event) => setFormData((current) => ({ ...current, newName: event.target.value }))}
                      required
                    />
                  </label>
                )}

                <label>
                  <span>Type of Expense</span>
                  <select
                    className="mz-input"
                    value={formData.expenseType}
                    onChange={(event) => setFormData((current) => ({ ...current, expenseType: event.target.value }))}
                  >
                    {expenseTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                {formData.expenseType === 'Others' && (
                  <label>
                    <span>Other Expense Type</span>
                    <input
                      className="mz-input"
                      type="text"
                      value={formData.customExpenseType}
                      onChange={(event) => setFormData((current) => ({ ...current, customExpenseType: event.target.value }))}
                    />
                  </label>
                )}

                <label>
                  <span>Amount in Rupee</span>
                  <input
                    className="mz-input"
                    type="number"
                    min="0"
                    value={formData.amount}
                    onChange={(event) => setFormData((current) => ({ ...current, amount: event.target.value }))}
                    required
                  />
                </label>

                <label>
                  <span>Date</span>
                  <input
                    className="mz-input"
                    type="date"
                    value={formData.date}
                    onChange={(event) => setFormData((current) => ({ ...current, date: event.target.value }))}
                    required
                  />
                </label>
              </div>

              <div className="management-modal-actions">
                <button className="mz-btn mz-btn--ghost" type="button" onClick={closeAddForm}>
                  Cancel
                </button>
                <button className="mz-btn mz-btn--primary" type="submit">
                  <Plus size={18} /> Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseManagementPage;
