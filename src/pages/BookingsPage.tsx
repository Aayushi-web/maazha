import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Clock, CheckCircle, XCircle, Search, Filter, Download, Plus } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import CreateBookingModal from '../components/bookings/CreateBookingModal';
import { fetchAllBookings } from '../services/mockData';
import type { Booking } from '../types/dashboard';
import './BookingsPage.css';

const BookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

  // Stats calculation
  const totalRevenue = bookings.filter(b => b.status !== 'Cancelled').reduce((sum, b) => sum + b.amount, 0);
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;

  return (
    <div className="bookings-page animate-fade-up">
      <div className="bookings-header-section">
        <div>
          <h1 className="text-h1">Bookings Management</h1>
          <p className="text-body">Track reservations, payments, and guest itineraries.</p>
        </div>
        <div className="header-actions">
          <button className="mz-btn mz-btn--ghost">
            <Download size={18} /> Export CSV
          </button>
          <button className="mz-btn mz-btn--primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Create Booking
          </button>
        </div>
      </div>

      <div className="bookings-stats-grid">
        <StatCard title="Total Expected Revenue" value={formatCurrency(totalRevenue)} icon={CalendarCheck} colorClass="brand" />
        <StatCard title="Confirmed Bookings" value={confirmedCount} icon={CheckCircle} colorClass="success" />
        <StatCard title="Pending Approvals" value={pendingCount} icon={Clock} colorClass="warning" />
        <StatCard title="Cancellations" value={bookings.filter(b => b.status === 'Cancelled').length} icon={XCircle} colorClass="error" />
      </div>

      <div className="bookings-list-card mz-card">
        <div className="bookings-list-toolbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search by guest name, email, or ID..." className="mz-input search-input" />
          </div>
          <div className="filter-controls">
            <button className="mz-btn mz-btn--ghost mz-btn--sm">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="table-responsive">
          {loading ? (
            <div className="loading-state">Loading bookings...</div>
          ) : (
            <table className="mz-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest Details</th>
                  <th>Property / Dates</th>
                  <th>Amount & Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="booking-row">
                    <td>
                      <span className="booking-id">#{booking.id.toUpperCase()}</span>
                      <div className="booking-source">{booking.source || 'Direct'}</div>
                    </td>
                    <td>
                      <div className="guest-info">
                        <span className="guest-name">{booking.tenantName}</span>
                        <span className="guest-contact">{booking.guestEmail || 'No email provided'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="stay-info">
                        <span className="property-name">{booking.propertyName} (Rm {booking.roomNumber})</span>
                        <span className="stay-dates">
                          {new Date(booking.checkInDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'})} 
                          &nbsp;&rarr;&nbsp; 
                          {new Date(booking.checkOutDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'})}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="payment-info">
                        <span className="amount-total">{formatCurrency(booking.amount)}</span>
                        <span className={getPaymentBadgeClass(booking.paymentStatus)}>
                          {booking.paymentStatus || 'Unpaid'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`mz-badge ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="mz-btn mz-btn--ghost mz-btn--sm"
                        onClick={() => navigate(`/bookings/${booking.id}`)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <CreateBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BookingsPage;
