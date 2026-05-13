import { useState } from 'react';
import { X, Building, MapPin, DollarSign, Image as ImageIcon } from 'lucide-react';
import './AddPropertyModal.css';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyModal = ({ isOpen, onClose }: AddPropertyModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Hotel',
    location: '',
    pricePerNight: '',
    totalRooms: '',
    imageUrl: '',
    isAllInclusive: false
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting property", formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="mz-card modal-content property-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-h3">Add New Property</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-section">
            <h4 className="section-title">Basic Information</h4>
            <div className="form-group">
              <label>Property Name *</label>
              <div className="input-with-icon">
                <Building size={16} className="input-icon" />
                <input type="text" name="name" className="mz-input" placeholder="e.g. Seaside Resort" value={formData.name} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Property Type *</label>
                <select name="type" className="mz-input" value={formData.type} onChange={handleChange}>
                  <option value="Hotel">Hotel</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Apartment">Apartment</option>
                  <option value="PG">PG</option>
                </select>
              </div>
              <div className="form-group">
                <label>Total Rooms *</label>
                <input type="number" name="totalRooms" className="mz-input" placeholder="e.g. 50" value={formData.totalRooms} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Location & Media</h4>
            <div className="form-group">
              <label>Location / Address *</label>
              <div className="input-with-icon">
                <MapPin size={16} className="input-icon" />
                <input type="text" name="location" className="mz-input" placeholder="e.g. Kas Center, Antalya" value={formData.location} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <div className="input-with-icon">
                <ImageIcon size={16} className="input-icon" />
                <input type="url" name="imageUrl" className="mz-input" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} />
              </div>
              <span className="help-text">Provide a direct link to the property's cover image.</span>
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Pricing & Amenities</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Price Per Night ($) *</label>
                <div className="input-with-icon">
                  <DollarSign size={16} className="input-icon" />
                  <input type="number" name="pricePerNight" className="mz-input" placeholder="e.g. 100" value={formData.pricePerNight} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-item mt-4">
                  <input type="checkbox" name="isAllInclusive" checked={formData.isAllInclusive} onChange={handleChange} />
                  <span className="checkbox-label">All-Inclusive</span>
                </label>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="mz-btn mz-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="mz-btn mz-btn--primary">Save Property</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;
