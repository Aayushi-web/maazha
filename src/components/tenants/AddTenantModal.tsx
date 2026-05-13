import { useState } from 'react';
import { X } from 'lucide-react';
import './AddTenantModal.css';

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (tenantData: any) => void;
}

const AddTenantModal = ({ isOpen, onClose, onAdd }: AddTenantModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    roomNumber: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', email: '', phone: '', propertyId: '', roomNumber: '' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="mz-card modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-h3">Add New Tenant</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="tenant-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="mz-input" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="e.g. John Doe" 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="mz-input" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="john@example.com" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                className="mz-input" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                placeholder="+91 98765 43210" 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="propertyId">Assign Property</label>
              <select 
                id="propertyId" 
                name="propertyId" 
                className="mz-input" 
                value={formData.propertyId} 
                onChange={handleChange}
              >
                <option value="">Select Property</option>
                <option value="p1">Sunrise PG</option>
                <option value="p2">Blue Horizon Hostel</option>
                <option value="p3">Oakwood Apartments</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="roomNumber">Room Number</label>
              <input 
                type="text" 
                id="roomNumber" 
                name="roomNumber" 
                className="mz-input" 
                value={formData.roomNumber} 
                onChange={handleChange} 
                placeholder="e.g. 101" 
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="mz-btn mz-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="mz-btn mz-btn--primary">
              Add Tenant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTenantModal;
