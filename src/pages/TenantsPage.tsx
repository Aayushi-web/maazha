import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, UserX, Clock, Plus, Search, Filter } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import AddTenantModal from '../components/tenants/AddTenantModal';
import { fetchTenants } from '../services/mockData';
import type { Tenant } from '../types/dashboard';
import './TenantsPage.css';

const TenantsPage = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTenants();
        setTenants(data);
      } catch (error) {
        console.error("Failed to load tenants", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAddTenant = (newTenantData: any) => {
    // In a real app, you would make an API call here.
    const newTenant: Tenant = {
      id: `t${Date.now()}`,
      name: newTenantData.name,
      email: newTenantData.email,
      phone: newTenantData.phone,
      propertyId: newTenantData.propertyId || 'p1',
      roomNumber: newTenantData.roomNumber || 'TBD',
      status: 'Pending',
      joinDate: new Date().toISOString().split('T')[0],
    };
    setTenants([newTenant, ...tenants]);
    setIsModalOpen(false);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active': return 'mz-badge--success';
      case 'Pending': return 'mz-badge--warning';
      case 'Inactive': return 'mz-badge--mist';
      default: return 'mz-badge--mist';
    }
  };

  const activeCount = tenants.filter(t => t.status === 'Active').length;
  const pendingCount = tenants.filter(t => t.status === 'Pending').length;
  const inactiveCount = tenants.filter(t => t.status === 'Inactive').length;

  return (
    <div className="tenants-page animate-fade-up">
      <div className="tenants-header-section">
        <div>
          <h1 className="text-h1">Tenants Management</h1>
          <p className="text-body">Manage all your residents and guests across properties.</p>
        </div>
        <button className="mz-btn mz-btn--primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add Tenant
        </button>
      </div>

      <div className="tenants-stats-grid">
        <StatCard title="Total Tenants" value={tenants.length} icon={Users} colorClass="brand" />
        <StatCard title="Active" value={activeCount} icon={UserCheck} colorClass="success" />
        <StatCard title="Pending Review" value={pendingCount} icon={Clock} colorClass="warning" />
        <StatCard title="Vacated / Inactive" value={inactiveCount} icon={UserX} colorClass="mist" />
      </div>

      <div className="tenants-list-card mz-card">
        <div className="tenants-list-toolbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search by name, email or phone..." className="mz-input search-input" />
          </div>
          <div className="filter-controls">
            <button className="mz-btn mz-btn--ghost mz-btn--sm">
              <Filter size={16} /> Filter by Property
            </button>
            <button className="mz-btn mz-btn--ghost mz-btn--sm">
              Status <ChevronDownIcon size={16} />
            </button>
          </div>
        </div>

        <div className="table-responsive">
          {loading ? (
            <div className="loading-state">Loading tenants...</div>
          ) : (
            <table className="mz-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Property / Room</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="tenant-row">
                    <td className="font-medium text-primary">
                      <div className="tenant-name-cell">
                        <div className="tenant-avatar">{tenant.name.charAt(0)}</div>
                        <span>{tenant.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <span className="email">{tenant.email}</span>
                        <span className="phone">{tenant.phone}</span>
                      </div>
                    </td>
                    <td>
                      <div className="property-info">
                        <span className="property-id text-primary">{tenant.propertyId}</span>
                        <span className="room-number">Room: {tenant.roomNumber}</span>
                      </div>
                    </td>
                    <td>{new Date(tenant.joinDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`mz-badge ${getStatusBadgeClass(tenant.status)}`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="mz-btn mz-btn--ghost mz-btn--sm"
                        onClick={() => navigate(`/tenants/${tenant.id}`)}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <AddTenantModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddTenant} 
      />
    </div>
  );
};

// Quick inline component for the dropdown chevron to avoid extra imports if not strictly needed
const ChevronDownIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default TenantsPage;
