import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { BedDouble, Building2, DoorOpen, MapPin, Plus, Search, Trash2, X } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { fetchProperties } from '../services/mockData';
import type { Property } from '../types/dashboard';
import './ManagementPages.css';

type PropertyFormData = {
  name: string;
  location: string;
  type: Property['type'];
  totalRooms: string;
  totalBeds: string;
};

const initialFormData: PropertyFormData = {
  name: '',
  location: '',
  type: 'PG',
  totalRooms: '',
  totalBeds: '',
};

const PropertyManagementPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        console.error('Failed to load property management data', error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return properties;
    }

    return properties.filter((property) => {
      return [property.name, property.location, property.type, property.status]
        .some((value) => value.toLowerCase().includes(normalizedQuery));
    });
  }, [properties, query]);

  const totalRooms = properties.reduce((sum, property) => sum + property.totalRooms, 0);
  const totalBeds = properties.reduce((sum, property) => sum + (property.totalBeds || 0), 0);

  const closeAddForm = () => {
    setFormData(initialFormData);
    setIsAddOpen(false);
  };

  const handleAddProperty = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const totalRoomCount = Number(formData.totalRooms);
    const totalBedCount = Number(formData.totalBeds);

    const newProperty: Property = {
      id: `property-${Date.now()}`,
      name: formData.name.trim(),
      location: formData.location.trim(),
      type: formData.type,
      totalRooms: totalRoomCount,
      availableRooms: totalRoomCount,
      status: 'Active',
      imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: totalBedCount,
      filledBeds: 0,
      tenantCapacity: totalBedCount,
      upcomingTenants: 0,
      noticePeriodTenants: 0,
      monthlyRentTarget: 0,
      monthlyExpenseBudget: 0,
    };

    setProperties((currentProperties) => [newProperty, ...currentProperties]);
    closeAddForm();
  };

  const handleDeleteProperty = (propertyId: string) => {
    setProperties((currentProperties) => (
      currentProperties.filter((property) => property.id !== propertyId)
    ));
  };

  if (loading) {
    return <div className="loading-state animate-fade-up">Loading property management...</div>;
  }

  return (
    <div className="management-page animate-fade-up">
      <div className="management-header">
        <div>
          <h1 className="text-h1">Property Management</h1>
          <p className="text-body">Manage property status, room capacity, and operational readiness.</p>
        </div>
        <button className="mz-btn mz-btn--primary" onClick={() => setIsAddOpen(true)}>
          <Plus size={18} /> Add Property
        </button>
      </div>

      <div className="management-stats-grid management-stats-grid--three">
        <StatCard title="Total Properties" value={properties.length} icon={Building2} colorClass="brand" />
        <StatCard title="Total Rooms" value={totalRooms} icon={DoorOpen} colorClass="success" />
        <StatCard title="Total Beds" value={totalBeds} icon={BedDouble} colorClass="purple" />
      </div>

      <div className="management-card mz-card">
        <div className="management-toolbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search properties..."
              className="mz-input search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <span className="management-result-count">{filteredProperties.length} listed</span>
        </div>

        <div className="management-list">
          {filteredProperties.map((property) => {
            const occupiedRooms = property.totalRooms - property.availableRooms;
            const occupancyRate = property.totalRooms > 0
              ? Math.round((occupiedRooms / property.totalRooms) * 100)
              : 0;

            return (
              <article className="management-list-item" key={property.id}>
                <div className="management-list-image">
                  <img src={property.imageUrl} alt={property.name} />
                </div>
                <div className="management-list-content">
                  <div>
                    <h2>{property.name}</h2>
                    <p><MapPin size={14} /> {property.location} - {property.type}</p>
                  </div>
                  <div className="management-meter" aria-label={`${property.name} occupancy ${occupancyRate}%`}>
                    <span style={{ width: `${occupancyRate}%` }} />
                  </div>
                  <div className="management-list-meta">
                    <span>{occupiedRooms}/{property.totalRooms} occupied</span>
                    <span>{property.availableRooms} available</span>
                    <span>{property.filledBeds || 0}/{property.totalBeds || 0} beds filled</span>
                    <span>{property.upcomingTenants || 0} upcoming</span>
                    <span>{property.noticePeriodTenants || 0} notice period</span>
                    <span className="mz-badge mz-badge--success">{property.status}</span>
                  </div>
                  <div className="management-list-actions">
                    <button
                      className="mz-btn mz-btn--ghost mz-btn--sm management-delete-btn"
                      type="button"
                      onClick={() => handleDeleteProperty(property.id)}
                      aria-label={`Delete ${property.name}`}
                    >
                      <Trash2 size={16} /> Delete Property
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {isAddOpen && (
        <div className="management-modal-overlay" role="presentation">
          <div className="management-modal" role="dialog" aria-modal="true" aria-labelledby="add-property-title">
            <div className="management-modal-header">
              <div>
                <h2 className="text-h3" id="add-property-title">Add Property</h2>
                <p className="text-body">Add the core details that appear in property management.</p>
              </div>
              <button
                className="management-icon-button"
                type="button"
                aria-label="Close add property form"
                onClick={closeAddForm}
              >
                <X size={18} />
              </button>
            </div>

            <form className="management-form" onSubmit={handleAddProperty}>
              <label>
                <span>Property Name</span>
                <input
                  className="mz-input"
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                  required
                />
              </label>

              <label>
                <span>Location</span>
                <input
                  className="mz-input"
                  type="text"
                  value={formData.location}
                  onChange={(event) => setFormData((current) => ({ ...current, location: event.target.value }))}
                  required
                />
              </label>

              <label>
                <span>Property Type</span>
                <select
                  className="mz-input"
                  value={formData.type}
                  onChange={(event) => setFormData((current) => ({ ...current, type: event.target.value as Property['type'] }))}
                >
                  <option value="PG">PG</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Hotel">Hotel</option>
                </select>
              </label>

              <div className="management-form-grid">
                <label>
                  <span>Total Rooms</span>
                  <input
                    className="mz-input"
                    type="number"
                    min="1"
                    value={formData.totalRooms}
                    onChange={(event) => setFormData((current) => ({ ...current, totalRooms: event.target.value }))}
                    required
                  />
                </label>

                <label>
                  <span>Total Beds</span>
                  <input
                    className="mz-input"
                    type="number"
                    min="1"
                    value={formData.totalBeds}
                    onChange={(event) => setFormData((current) => ({ ...current, totalBeds: event.target.value }))}
                    required
                  />
                </label>
              </div>

              <div className="management-modal-actions">
                <button className="mz-btn mz-btn--ghost" type="button" onClick={closeAddForm}>
                  Cancel
                </button>
                <button className="mz-btn mz-btn--primary" type="submit">
                  <Plus size={18} /> Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagementPage;
