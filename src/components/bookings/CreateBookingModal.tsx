import { useState } from 'react';
import { X } from 'lucide-react';
import './CreateBookingModal.css';

interface CreateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onAdd: (data: any) => void;
}

const CreateBookingModal = ({ isOpen, onClose }: CreateBookingModalProps) => {
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    propertyId: '',
    checkInDate: '',
    checkOutDate: '',
    amount: '',
    paymentStatus: 'Unpaid',
    source: 'Direct'
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    console.log("Submitting booking", formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="mz-card modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-h3">Create Manual Booking</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-section">
            <h4 className="section-title">Guest Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Guest Name *</label>
                <input type="text" name="guestName" className="mz-input" value={formData.guestName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Guest Email</label>
                <input type="email" name="guestEmail" className="mz-input" value={formData.guestEmail} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Stay Information</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Property *</label>
                <select name="propertyId" className="mz-input" value={formData.propertyId} onChange={handleChange} required>
                  <option value="">Select Property</option>
                  <option value="p1">Sunrise PG</option>
                  <option value="p2">Blue Horizon Hostel</option>
                  <option value="p3">Oakwood Apartments</option>
                </select>
              </div>
              <div className="form-group">
                <label>Source</label>
                <select name="source" className="mz-input" value={formData.source} onChange={handleChange}>
                  <option value="Direct">Direct (Walk-in/Phone)</option>
                  <option value="Booking.com">Booking.com</option>
                  <option value="Airbnb">Airbnb</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Check-in Date *</label>
                <input type="date" name="checkInDate" className="mz-input" value={formData.checkInDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Check-out Date *</label>
                <input type="date" name="checkOutDate" className="mz-input" value={formData.checkOutDate} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Payment Information</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Total Amount (₹) *</label>
                <input type="number" name="amount" className="mz-input" value={formData.amount} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Payment Status</label>
                <select name="paymentStatus" className="mz-input" value={formData.paymentStatus} onChange={handleChange}>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Partial">Partial</option>
                  <option value="Paid">Paid Fully</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="mz-btn mz-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="mz-btn mz-btn--primary">Confirm Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingModal;
