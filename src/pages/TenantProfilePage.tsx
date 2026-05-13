import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, CalendarDays, Edit, Trash2 } from 'lucide-react';
import { fetchTenantById } from '../services/mockData';
import type { Tenant } from '../types/dashboard';
import './TenantProfilePage.css';

const TenantProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenant = async () => {
      if (!id) return;
      try {
        const data = await fetchTenantById(id);
        if (data) {
          setTenant(data);
        }
      } catch (error) {
        console.error("Failed to load tenant", error);
      } finally {
        setLoading(false);
      }
    };
    loadTenant();
  }, [id]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active': return 'mz-badge--success';
      case 'Pending': return 'mz-badge--warning';
      case 'Inactive': return 'mz-badge--mist';
      default: return 'mz-badge--mist';
    }
  };

  if (loading) {
    return <div className="loading-state animate-fade-up">Loading tenant profile...</div>;
  }

  if (!tenant) {
    return (
      <div className="error-state animate-fade-up">
        <h2 className="text-h2">Tenant not found</h2>
        <button className="mz-btn mz-btn--primary" onClick={() => navigate('/tenants')}>
          Back to Tenants
        </button>
      </div>
    );
  }

  return (
    <div className="tenant-profile-page animate-fade-up">
      <div className="profile-header-actions">
        <button className="mz-btn mz-btn--ghost back-btn" onClick={() => navigate('/tenants')}>
          <ArrowLeft size={18} /> Back to Tenants
        </button>
        <div className="action-buttons">
          <button className="mz-btn mz-btn--ghost mz-btn--sm">
            <Edit size={16} /> Edit Profile
          </button>
          <button className="mz-btn mz-btn--ghost mz-btn--sm delete-btn">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      <div className="profile-main-grid">
        <div className="profile-sidebar mz-card">
          <div className="profile-avatar-large">
            {tenant.name.charAt(0)}
          </div>
          <h2 className="text-h2 text-center mt-4">{tenant.name}</h2>
          <div className="text-center mt-2 mb-6">
            <span className={`mz-badge ${getStatusBadgeClass(tenant.status)}`}>
              {tenant.status}
            </span>
          </div>

          <div className="profile-contact-info">
            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <span>{tenant.email}</span>
            </div>
            <div className="contact-item">
              <Phone size={16} className="contact-icon" />
              <span>{tenant.phone}</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} className="contact-icon" />
              <span>Property ID: {tenant.propertyId}</span>
            </div>
            <div className="contact-item">
              <CalendarDays size={16} className="contact-icon" />
              <span>Joined: {new Date(tenant.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="profile-content mz-card">
          <h3 className="text-h3 mb-6">Lease Details</h3>
          
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Property Assigned</span>
              <span className="detail-value">{tenant.propertyId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Room Number</span>
              <span className="detail-value">{tenant.roomNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Lease Start</span>
              <span className="detail-value">{new Date(tenant.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Lease End</span>
              <span className="detail-value">-- / -- / ----</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Rent Amount</span>
              <span className="detail-value">₹ --,---</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Security Deposit</span>
              <span className="detail-value">₹ --,---</span>
            </div>
          </div>

          <hr className="divider" />

          <h3 className="text-h3 mb-6">Recent Documents</h3>
          <div className="documents-list">
            <div className="document-item">
              <div className="doc-info">
                <span className="doc-icon">📄</span>
                <span className="doc-name">Lease Agreement.pdf</span>
              </div>
              <button className="mz-btn mz-btn--ghost mz-btn--sm">Download</button>
            </div>
            <div className="document-item">
              <div className="doc-info">
                <span className="doc-icon">🖼️</span>
                <span className="doc-name">ID Proof.jpg</span>
              </div>
              <button className="mz-btn mz-btn--ghost mz-btn--sm">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantProfilePage;
