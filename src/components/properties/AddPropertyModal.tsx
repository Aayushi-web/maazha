import { useState } from 'react';
import { X, Building, MapPin, IndianRupee, Image as ImageIcon, Map } from 'lucide-react';
import type { Property } from '../../types/dashboard';
import './AddPropertyModal.css';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (property: Property) => void;
}

const AddPropertyModal = ({ isOpen, onClose, onAdd }: AddPropertyModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Hotel' as Property['type'],
    location: '',
    distance: '',
    pricePerNight: '',
    totalRooms: '',
    imageUrl: '',
  });

  const [amenities, setAmenities] = useState({
    'Free Wifi': false,
    'Pool': false,
    'Spa': false,
    'Parking': false,
    'Gym': false,
    'Breakfast Included': false,
    'Beachfront': false,
    'All-inclusive': false,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAmenities(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedAmenities = Object.entries(amenities)
      .filter(([_, isSelected]) => isSelected)
      .map(([name]) => name);

    const newProperty: Property = {
      id: `p${Math.floor(Math.random() * 10000)}`,
      name: formData.name,
      type: formData.type,
      location: formData.location,
      distance: formData.distance || '0 km from the City Centre',
      totalRooms: parseInt(formData.totalRooms) || 0,
      availableRooms: parseInt(formData.totalRooms) || 0, // Assume all available initially
      status: 'Active',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      pricePerNight: parseInt(formData.pricePerNight) || 0,
      rating: 0,
      ratingText: 'New',
      reviewCount: 0,
      isAllInclusive: amenities['All-inclusive'],
      amenities: selectedAmenities
    };

    onAdd(newProperty);
    
    // Reset form
    setFormData({
      name: '', type: 'Hotel', location: '', distance: '', pricePerNight: '', totalRooms: '', imageUrl: ''
    });
    setAmenities({
      'Free Wifi': false, 'Pool': false, 'Spa': false, 'Parking': false, 'Gym': false, 'Breakfast Included': false, 'Beachfront': false, 'All-inclusive': false
    });
    
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
                <input type="number" name="totalRooms" className="mz-input" placeholder="e.g. 50" value={formData.totalRooms} onChange={handleChange} required min="1" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Location & Media</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Location / Address *</label>
                <div className="input-with-icon">
                  <MapPin size={16} className="input-icon" />
                  <input type="text" name="location" className="mz-input" placeholder="e.g. Kas Center, Antalya" value={formData.location} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Distance from Center</label>
                <div className="input-with-icon">
                  <Map size={16} className="input-icon" />
                  <input type="text" name="distance" className="mz-input" placeholder="e.g. 1.5 km" value={formData.distance} onChange={handleChange} />
                </div>
              </div>
            </div>
            
            <div className="form-group mt-2">
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
            <div className="form-group mb-4">
              <label>Price Per Night (₹) *</label>
              <div className="input-with-icon" style={{width: '50%'}}>
                <IndianRupee size={16} className="input-icon" />
                <input type="number" name="pricePerNight" className="mz-input" placeholder="e.g. 8500" value={formData.pricePerNight} onChange={handleChange} required min="0" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Select Amenities</label>
              <div className="amenities-grid">
                {Object.keys(amenities).map((am) => (
                  <label key={am} className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name={am} 
                      checked={amenities[am as keyof typeof amenities]} 
                      onChange={handleAmenityChange} 
                    />
                    <span className="checkbox-label">{am}</span>
                  </label>
                ))}
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
