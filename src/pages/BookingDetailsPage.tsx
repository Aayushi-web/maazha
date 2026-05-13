import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Building, Calendar, CreditCard, Clock } from 'lucide-react';
import { fetchBookingById } from '../services/mockData';
import type { Booking } from '../types/dashboard';
import './BookingDetailsPage.css';

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooking = async () => {
      if (!id) return;
      try {
        const data = await fetchBookingById(id);
        if (data) {
          setBooking(data);
        }
      } catch (error) {
        console.error("Failed to load booking", error);
      } finally {
        setLoading(false);
      }
    };
    loadBooking();
  }, [id]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'mz-badge--success';
      case 'Pending': return 'mz-badge--warning';
      case 'Completed': return 'mz-badge--brand';
      case 'Cancelled': return 'mz-badge--error';
      default: return 'mz-badge--mist';
    }
  };

  const getPaymentBadgeClass = (status?: string) => {
    switch (status) {
      case 'Paid': return 'payment-badge paid';
      case 'Partial': return 'payment-badge partial';
      case 'Unpaid': return 'payment-badge unpaid';
      default: return 'payment-badge unpaid';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  if (loading) return <div className="loading-state animate-fade-up">Loading booking details...</div>;

  if (!booking) return (
    <div className="error-state animate-fade-up">
      <h2 className="text-h2">Booking not found</h2>
      <button className="mz-btn mz-btn--primary" onClick={() => navigate('/bookings')}>
        Back to Bookings
      </button>
    </div>
  );

  return (
    <div className="booking-details-page animate-fade-up">
      <div className="page-header">
        <button className="mz-btn mz-btn--ghost back-btn" onClick={() => navigate('/bookings')}>
          <ArrowLeft size={18} /> Back to Bookings
        </button>
        <div className="booking-status-header">
          <span className={`mz-badge ${getStatusBadgeClass(booking.status)}`}>{booking.status}</span>
          <button className="mz-btn mz-btn--primary mz-btn--sm">Edit Booking</button>
        </div>
      </div>

      <div className="booking-main-grid">
        {/* Left Column - Details */}
        <div className="booking-left-col">
          <div className="mz-card p-6">
            <h2 className="text-h2 mb-4">Booking #{booking.id.toUpperCase()}</h2>
            <div className="source-badge mb-6">Source: {booking.source || 'Direct'}</div>

            <div className="details-section">
              <h3 className="section-title"><Building size={16} /> Stay Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Property</span>
                  <span className="detail-value">{booking.propertyName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Room / Unit</span>
                  <span className="detail-value">{booking.roomNumber}</span>
                </div>
              </div>
            </div>

            <hr className="divider" />

            <div className="details-section">
              <h3 className="section-title"><Calendar size={16} /> Schedule</h3>
              <div className="schedule-box">
                <div className="schedule-item">
                  <span className="schedule-label">Check-in</span>
                  <span className="schedule-date">{new Date(booking.checkInDate).toLocaleDateString('en-GB', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'})}</span>
                  <span className="schedule-time">After 2:00 PM</span>
                </div>
                <div className="schedule-arrow">&rarr;</div>
                <div className="schedule-item">
                  <span className="schedule-label">Check-out</span>
                  <span className="schedule-date">{new Date(booking.checkOutDate).toLocaleDateString('en-GB', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'})}</span>
                  <span className="schedule-time">Before 11:00 AM</span>
                </div>
              </div>
            </div>

            <hr className="divider" />

            <div className="details-section">
              <h3 className="section-title"><User size={16} /> Guest Information</h3>
              <div className="guest-card">
                <div className="guest-avatar-medium">{booking.tenantName.charAt(0)}</div>
                <div className="guest-details">
                  <div className="guest-name">{booking.tenantName}</div>
                  <div className="guest-contact-item"><Mail size={14} /> {booking.guestEmail || 'N/A'}</div>
                  <div className="guest-contact-item"><Phone size={14} /> {booking.guestPhone || 'N/A'}</div>
                </div>
              </div>
              {booking.specialRequests && (
                <div className="special-requests">
                  <span className="special-label">Special Requests:</span>
                  <p>{booking.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Finance & Timeline */}
        <div className="booking-right-col">
          <div className="mz-card p-6 mb-6">
            <h3 className="section-title"><CreditCard size={16} /> Payment Summary</h3>
            <div className="payment-status-row mb-4">
              <span className="text-secondary">Status</span>
              <span className={getPaymentBadgeClass(booking.paymentStatus)}>{booking.paymentStatus || 'Unpaid'}</span>
            </div>
            
            <div className="receipt-box">
              <div className="receipt-row">
                <span>Room Charges</span>
                <span>{formatCurrency(booking.amount * 0.9)}</span>
              </div>
              <div className="receipt-row">
                <span>Taxes & Fees (10%)</span>
                <span>{formatCurrency(booking.amount * 0.1)}</span>
              </div>
              <hr className="receipt-divider" />
              <div className="receipt-row total">
                <span>Total Amount</span>
                <span>{formatCurrency(booking.amount)}</span>
              </div>
              
              {booking.paymentStatus === 'Paid' && (
                <div className="receipt-row paid-amount">
                  <span>Amount Paid</span>
                  <span>-{formatCurrency(booking.amount)}</span>
                </div>
              )}
              
              <div className="receipt-row due">
                <span>Amount Due</span>
                <span>{booking.paymentStatus === 'Paid' ? formatCurrency(0) : formatCurrency(booking.amount)}</span>
              </div>
            </div>
            
            {booking.paymentStatus !== 'Paid' && (
              <button className="mz-btn mz-btn--primary w-100 mt-4">Record Payment</button>
            )}
          </div>

          <div className="mz-card p-6">
            <h3 className="section-title"><Clock size={16} /> Activity Timeline</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot success"></div>
                <div className="timeline-content">
                  <div className="timeline-title">Booking Created</div>
                  <div className="timeline-time">via {booking.source || 'System'}</div>
                </div>
              </div>
              {booking.status !== 'Pending' && (
                <div className="timeline-item">
                  <div className="timeline-dot brand"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Status updated to {booking.status}</div>
                    <div className="timeline-time">System Auto-update</div>
                  </div>
                </div>
              )}
              {booking.paymentStatus === 'Paid' && (
                <div className="timeline-item">
                  <div className="timeline-dot success"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Payment Received</div>
                    <div className="timeline-time">Full amount</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
