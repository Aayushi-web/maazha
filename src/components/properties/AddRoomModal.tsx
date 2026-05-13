import { useState } from 'react';
import { X, Hash, Users, IndianRupee } from 'lucide-react';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

const AddRoomModal = ({ isOpen, onClose, propertyId }: AddRoomModalProps) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: 'Double',
    capacity: 2,
    price: 0,
    status: 'Available'
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting room for property", propertyId, formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="mz-card modal-content" style={{maxWidth: '500px'}} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-h3">Add New Room</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group">
            <label>Room Number *</label>
            <div className="input-with-icon">
              <Hash size={16} className="input-icon" />
              <input type="text" name="roomNumber" className="mz-input" placeholder="e.g. 101, A-12" value={formData.roomNumber} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Room Type *</label>
              <select name="type" className="mz-input" value={formData.type} onChange={handleChange}>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
                <option value="Dorm">Dorm</option>
              </select>
            </div>
            <div className="form-group">
              <label>Capacity (Guests) *</label>
              <div className="input-with-icon">
                <Users size={16} className="input-icon" />
                <input type="number" name="capacity" className="mz-input" value={formData.capacity} onChange={handleChange} required min="1" />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price Per Night (₹) *</label>
              <div className="input-with-icon">
                <IndianRupee size={16} className="input-icon" />
                <input type="number" name="price" className="mz-input" value={formData.price} onChange={handleChange} required min="0" />
              </div>
            </div>
            <div className="form-group">
              <label>Status *</label>
              <select name="status" className="mz-input" value={formData.status} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="mz-btn mz-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="mz-btn mz-btn--primary">Save Room</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;
