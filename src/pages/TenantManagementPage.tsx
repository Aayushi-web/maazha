import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Building2, Clock, Plus, Search, UserCheck, UserPlus, Users, X } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { fetchProperties, fetchRooms, fetchTenants } from '../services/mockData';
import type { Property, Room, Tenant } from '../types/dashboard';
import './ManagementPages.css';
import './TenantManagementPage.css';

type TenantFormData = {
  name: string;
  phone: string;
  tenantType: NonNullable<Tenant['tenantType']>;
  propertyId: string;
  roomId: string;
  address: string;
  parentName: string;
  parentMobileNumber: string;
  onboardingType: NonNullable<Tenant['onboardingType']>;
  moveInDate: string;
  fixedRent: string;
  securityDeposit: string;
  electricityUnitCost: string;
  electricityInitialReading: string;
  electricityRemarks: string;
};

const tenantStatusOptions: Tenant['status'][] = ['Active', 'Upcoming', 'Notice Period'];

const initialFormData: TenantFormData = {
  name: '',
  phone: '',
  tenantType: 'Bachelor',
  propertyId: '',
  roomId: '',
  address: '',
  parentName: '',
  parentMobileNumber: '',
  onboardingType: 'Long Stay',
  moveInDate: new Date().toISOString().slice(0, 10),
  fixedRent: '',
  securityDeposit: '',
  electricityUnitCost: '',
  electricityInitialReading: '',
  electricityRemarks: '',
};

const getStatusBadgeClass = (status: Tenant['status']) => {
  switch (status) {
    case 'Active':
      return 'mz-badge--success';
    case 'Upcoming':
      return 'mz-badge--warning';
    case 'Notice Period':
      return 'mz-badge--mist';
    default:
      return 'mz-badge--mist';
  }
};

const getRentBadgeClass = (status: Tenant['rentStatus']) => {
  switch (status) {
    case 'Paid':
      return 'mz-badge--success';
    case 'Pending':
      return 'mz-badge--warning';
    case 'Overdue':
      return 'mz-badge--error';
    default:
      return 'mz-badge--mist';
  }
};

const getTenantPropertyId = (tenant: Tenant, properties: Property[]) => {
  if (tenant.propertyId) {
    return tenant.propertyId;
  }

  return properties.find((property) => property.name === tenant.propertyName)?.id ?? '';
};

const TenantManagementPage = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState<TenantFormData>(initialFormData);

  useEffect(() => {
    const loadTenantData = async () => {
      try {
        const [tenantData, propertyData, roomData] = await Promise.all([
          fetchTenants(),
          fetchProperties(),
          fetchRooms(),
        ]);
        setTenants(tenantData);
        setProperties(propertyData);
        setRooms(roomData);
      } catch (error) {
        console.error('Failed to load tenant management data', error);
      } finally {
        setLoading(false);
      }
    };

    loadTenantData();
  }, []);

  const propertyFilteredTenants = useMemo(() => {
    if (selectedPropertyId === 'all') {
      return tenants;
    }

    return tenants.filter((tenant) => getTenantPropertyId(tenant, properties) === selectedPropertyId);
  }, [properties, selectedPropertyId, tenants]);

  const filteredTenants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return propertyFilteredTenants;
    }

    return propertyFilteredTenants.filter((tenant) => (
      [
        tenant.name,
        tenant.propertyName,
        tenant.roomNumber,
        tenant.phone,
        tenant.status,
        tenant.tenantType ?? '',
        tenant.parentName ?? '',
        tenant.parentMobileNumber ?? '',
      ].some((value) => value.toLowerCase().includes(normalizedQuery))
    ));
  }, [propertyFilteredTenants, query]);

  const formRooms = useMemo(
    () => rooms.filter((room) => room.propertyId === formData.propertyId),
    [formData.propertyId, rooms]
  );

  const activeTenants = tenants.filter((tenant) => tenant.status === 'Active').length;
  const upcomingTenants = tenants.filter((tenant) => tenant.status === 'Upcoming').length;
  const noticePeriodTenants = tenants.filter((tenant) => tenant.status === 'Notice Period').length;

  const openAddForm = () => {
    const defaultProperty = selectedPropertyId === 'all'
      ? properties[0]
      : properties.find((property) => property.id === selectedPropertyId) ?? properties[0];
    const defaultRoom = defaultProperty
      ? rooms.find((room) => room.propertyId === defaultProperty.id)
      : undefined;

    setFormData({
      ...initialFormData,
      propertyId: defaultProperty?.id ?? '',
      roomId: defaultRoom?.id ?? '',
      fixedRent: defaultRoom ? String(defaultRoom.price) : '',
    });
    setIsAddOpen(true);
  };

  const closeAddForm = () => {
    setFormData(initialFormData);
    setIsAddOpen(false);
  };

  const handlePropertyChange = (propertyId: string) => {
    const firstRoom = rooms.find((room) => room.propertyId === propertyId);

    setFormData((current) => ({
      ...current,
      propertyId,
      roomId: firstRoom?.id ?? '',
      fixedRent: firstRoom ? String(firstRoom.price) : '',
    }));
  };

  const handleRoomChange = (roomId: string) => {
    const selectedRoom = rooms.find((room) => room.id === roomId);

    setFormData((current) => ({
      ...current,
      roomId,
      fixedRent: selectedRoom ? String(selectedRoom.price) : current.fixedRent,
    }));
  };

  const handleAddTenant = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedProperty = properties.find((property) => property.id === formData.propertyId);
    const selectedRoom = rooms.find((room) => room.id === formData.roomId);

    if (!selectedProperty || !selectedRoom) {
      return;
    }

    const newTenant: Tenant = {
      id: `tenant-${Date.now()}`,
      name: formData.name.trim(),
      tenantType: formData.tenantType,
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.name,
      roomId: selectedRoom.id,
      roomNumber: selectedRoom.roomNumber,
      bedNumber: 'B1',
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      parentName: formData.parentName.trim(),
      parentMobileNumber: formData.parentMobileNumber.trim(),
      onboardingType: formData.onboardingType,
      fixedRent: Number(formData.fixedRent),
      securityDeposit: Number(formData.securityDeposit),
      electricity: {
        unitCost: Number(formData.electricityUnitCost),
        initialReading: Number(formData.electricityInitialReading),
        remarks: formData.electricityRemarks.trim(),
      },
      rentStatus: 'Pending',
      moveInDate: formData.moveInDate,
      status: new Date(formData.moveInDate) > new Date() ? 'Upcoming' : 'Active',
    };

    setTenants((currentTenants) => [newTenant, ...currentTenants]);
    closeAddForm();
  };

  const handleTenantStatusChange = (tenantId: string, status: Tenant['status']) => {
    setTenants((currentTenants) => (
      currentTenants.map((tenant) => (
        tenant.id === tenantId ? { ...tenant, status } : tenant
      ))
    ));
  };

  if (loading) {
    return <div className="loading-state animate-fade-up">Loading tenant management...</div>;
  }

  return (
    <div className="management-page animate-fade-up">
      <div className="management-header">
        <div>
          <h1 className="text-h1">Tenant Management</h1>
          <p className="text-body">Track tenant occupancy, room assignment, rent status, and upcoming move-ins.</p>
        </div>
        <button className="mz-btn mz-btn--primary" type="button" onClick={openAddForm}>
          <Plus size={18} /> Add Tenant
        </button>
      </div>

      <section className="tenant-property-filter" aria-label="Property filter">
        <label className="tenant-property-filter__control">
          <span className="tenant-property-filter__label">Property</span>
          <span className="tenant-property-filter__select-wrap">
            <Building2 size={17} aria-hidden="true" />
            <select
              className="tenant-property-filter__select"
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

      <div className="management-stats-grid">
        <StatCard title="Total Tenants" value={tenants.length} icon={Users} colorClass="brand" />
        <StatCard title="Active Tenants" value={activeTenants} icon={UserCheck} colorClass="success" />
        <StatCard title="Upcoming Tenants" value={upcomingTenants} icon={UserPlus} colorClass="warning" />
        <StatCard title="Notice Period" value={noticePeriodTenants} icon={Clock} colorClass="purple" />
      </div>

      <div className="management-card mz-card">
        <div className="management-toolbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search tenants..."
              className="mz-input search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <span className="management-result-count">{filteredTenants.length} listed</span>
        </div>

        <div className="table-responsive">
          <table className="mz-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Property</th>
                <th>Room / Bed</th>
                <th>Phone</th>
                <th>Move In</th>
                <th>Rent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.length === 0 ? (
                <tr>
                  <td className="tenant-empty-cell" colSpan={8}>
                    No tenants found.
                  </td>
                </tr>
              ) : (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td className="font-medium text-primary">{tenant.name}</td>
                    <td>{tenant.tenantType ?? '-'}</td>
                    <td>{tenant.propertyName}</td>
                    <td>{tenant.roomNumber} / {tenant.bedNumber}</td>
                    <td>{tenant.phone}</td>
                    <td>{new Date(tenant.moveInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td><span className={`mz-badge ${getRentBadgeClass(tenant.rentStatus)}`}>{tenant.rentStatus}</span></td>
                    <td>
                      <select
                        className={`tenant-status-select ${getStatusBadgeClass(tenant.status)}`}
                        value={tenant.status}
                        onChange={(event) => handleTenantStatusChange(tenant.id, event.target.value as Tenant['status'])}
                        aria-label={`Change status for ${tenant.name}`}
                      >
                        {tenantStatusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddOpen && (
        <div className="management-modal-overlay" role="presentation">
          <div className="management-modal tenant-modal" role="dialog" aria-modal="true" aria-labelledby="add-tenant-title">
            <div className="management-modal-header">
              <div>
                <h2 className="text-h3" id="add-tenant-title">Add Tenant</h2>
                <p className="text-body">Add resident, room, onboarding, and electricity details.</p>
              </div>
              <button
                className="management-icon-button"
                type="button"
                aria-label="Close add tenant form"
                onClick={closeAddForm}
              >
                <X size={18} />
              </button>
            </div>

            <form className="management-form tenant-form" onSubmit={handleAddTenant}>
              <section className="tenant-form-section">
                <h3>Tenant Details</h3>
                <div className="management-form-grid">
                  <label>
                    <span>Tenant Name</span>
                    <input
                      className="mz-input"
                      type="text"
                      value={formData.name}
                      onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                      required
                    />
                  </label>

                  <label>
                    <span>Phone Number</span>
                    <input
                      className="mz-input"
                      type="tel"
                      value={formData.phone}
                      onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                      required
                    />
                  </label>

                  <label>
                    <span>Type</span>
                    <select
                      className="mz-input"
                      value={formData.tenantType}
                      onChange={(event) => setFormData((current) => ({ ...current, tenantType: event.target.value as TenantFormData['tenantType'] }))}
                    >
                      <option value="Bachelor">Bachelor</option>
                      <option value="Family">Family</option>
                      <option value="Couple">Couple</option>
                    </select>
                  </label>

                  <label>
                    <span>Property Name</span>
                    <select
                      className="mz-input"
                      value={formData.propertyId}
                      onChange={(event) => handlePropertyChange(event.target.value)}
                      required
                    >
                      {properties.map((property) => (
                        <option key={property.id} value={property.id}>
                          {property.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Select Room</span>
                    <select
                      className="mz-input"
                      value={formData.roomId}
                      onChange={(event) => handleRoomChange(event.target.value)}
                      required
                    >
                      {formRooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.roomNumber} - {room.type}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  <span>Address</span>
                  <textarea
                    className="mz-input tenant-textarea"
                    value={formData.address}
                    onChange={(event) => setFormData((current) => ({ ...current, address: event.target.value }))}
                    rows={3}
                  />
                </label>

                <div className="management-form-grid">
                  <label>
                    <span>Parent Name</span>
                    <input
                      className="mz-input"
                      type="text"
                      value={formData.parentName}
                      onChange={(event) => setFormData((current) => ({ ...current, parentName: event.target.value }))}
                    />
                  </label>

                  <label>
                    <span>Parent Mobile Number</span>
                    <input
                      className="mz-input"
                      type="tel"
                      value={formData.parentMobileNumber}
                      onChange={(event) => setFormData((current) => ({ ...current, parentMobileNumber: event.target.value }))}
                    />
                  </label>
                </div>
              </section>

              <section className="tenant-form-section">
                <h3>Onboarding Details</h3>
                <div className="management-form-grid">
                  <label>
                    <span>Onboarding Type</span>
                    <select
                      className="mz-input"
                      value={formData.onboardingType}
                      onChange={(event) => setFormData((current) => ({ ...current, onboardingType: event.target.value as TenantFormData['onboardingType'] }))}
                    >
                      <option value="One Day">One Day</option>
                      <option value="One Week">One Week</option>
                      <option value="Long Stay">Long Stay</option>
                    </select>
                  </label>

                  <label>
                    <span>Move In Date</span>
                    <input
                      className="mz-input"
                      type="date"
                      value={formData.moveInDate}
                      onChange={(event) => setFormData((current) => ({ ...current, moveInDate: event.target.value }))}
                      required
                    />
                  </label>

                  <label>
                    <span>Fixed Rent</span>
                    <input
                      className="mz-input"
                      type="number"
                      min="0"
                      value={formData.fixedRent}
                      onChange={(event) => setFormData((current) => ({ ...current, fixedRent: event.target.value }))}
                      required
                    />
                  </label>

                  <label>
                    <span>Security Deposit</span>
                    <input
                      className="mz-input"
                      type="number"
                      min="0"
                      value={formData.securityDeposit}
                      onChange={(event) => setFormData((current) => ({ ...current, securityDeposit: event.target.value }))}
                      required
                    />
                  </label>
                </div>
              </section>

              <section className="tenant-form-section">
                <h3>Electricity</h3>
                <div className="management-form-grid">
                  <label>
                    <span>Unit Cost</span>
                    <input
                      className="mz-input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.electricityUnitCost}
                      onChange={(event) => setFormData((current) => ({ ...current, electricityUnitCost: event.target.value }))}
                      required
                    />
                  </label>

                  <label>
                    <span>Initial Reading</span>
                    <input
                      className="mz-input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.electricityInitialReading}
                      onChange={(event) => setFormData((current) => ({ ...current, electricityInitialReading: event.target.value }))}
                      required
                    />
                  </label>
                </div>

                <label>
                  <span>Remarks</span>
                  <textarea
                    className="mz-input tenant-textarea"
                    value={formData.electricityRemarks}
                    onChange={(event) => setFormData((current) => ({ ...current, electricityRemarks: event.target.value }))}
                    rows={3}
                  />
                </label>
              </section>

              <div className="management-modal-actions">
                <button className="mz-btn mz-btn--ghost" type="button" onClick={closeAddForm}>
                  Cancel
                </button>
                <button className="mz-btn mz-btn--primary" type="submit">
                  <Plus size={18} /> Add Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantManagementPage;
