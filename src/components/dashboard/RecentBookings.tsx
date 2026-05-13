import { useEffect, useState } from 'react';
import { fetchRecentBookings } from '../../services/mockData';
import type { Booking } from '../../types/dashboard';
import './RecentBookings.css';

const RecentBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const data = await fetchRecentBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };
    getBookings();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'mz-badge--success';
      case 'Pending': return 'mz-badge--warning';
      case 'Completed': return 'mz-badge--blue';
      case 'Cancelled': return 'mz-badge--mist'; // You might want an error badge class here instead
      default: return 'mz-badge--mist';
    }
  };

  return (
    <div className="mz-card bookings-card">
      <div className="bookings-header">
        <h3 className="text-h3">Recent Bookings</h3>
        <button className="mz-btn mz-btn--ghost mz-btn--sm">View All</button>
      </div>

      <div className="table-responsive">
        {loading ? (
          <div className="loading-state">Loading bookings...</div>
        ) : (
          <table className="mz-table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Property</th>
                <th>Room</th>
                <th>Check In</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="font-medium text-primary">{booking.tenantName}</td>
                  <td>{booking.propertyName}</td>
                  <td>{booking.roomNumber}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td className="font-semibold text-primary">₹{booking.amount.toLocaleString()}</td>
                  <td>
                    <span className={`mz-badge ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentBookings;
