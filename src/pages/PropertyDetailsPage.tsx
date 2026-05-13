import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Plus, BedDouble, Check } from 'lucide-react';
import { fetchPropertyById, fetchRoomsByPropertyId } from '../services/mockData';
import type { Property, Room } from '../types/dashboard';
import AddRoomModal from '../components/properties/AddRoomModal';
import './PropertyDetailsPage.css';

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      if (!id) return;
      try {
        const [propData, roomsData] = await Promise.all([
          fetchPropertyById(id),
          fetchRoomsByPropertyId(id)
        ]);
        if (propData) setProperty(propData);
        setRooms(roomsData);
      } catch (error) {
        console.error("Failed to load property details", error);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available': return 'mz-badge--success';
      case 'Occupied': return 'mz-badge--mist';
      case 'Maintenance': return 'mz-badge--warning';
      default: return 'mz-badge--mist';
    }
  };

  if (loading) return <div className="loading-state animate-fade-up">Loading property details...</div>;
  if (!property) return <div className="loading-state">Property not found.</div>;

  return (
    <div className="property-details-page animate-fade-up">
      <div className="header-actions mb-4">
        <button className="mz-btn mz-btn--ghost" onClick={() => navigate('/properties')}>
          <ArrowLeft size={18} /> Back to Properties
        </button>
      </div>

      <div className="property-hero mz-card">
        <div className="hero-image-wrapper">
          <img src={property.imageUrl} alt={property.name} className="hero-image" />
          <div className="hero-overlay">
            <h1 className="hero-title">{property.name}</h1>
            <div className="hero-meta">
              <span className="hero-location"><MapPin size={16} /> {property.location} ({property.distance})</span>
              <span className="hero-rating"><Star size={16} className="star filled" /> {property.rating} ({property.reviewCount} Reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="hero-info-bar">
          <div className="info-stats">
            <div className="stat-item">
              <span className="stat-label">Total Rooms</span>
              <span className="stat-value">{property.totalRooms}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Available</span>
              <span className="stat-value text-success">{property.availableRooms}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Base Price</span>
              <span className="stat-value">${property.pricePerNight}/night</span>
            </div>
          </div>
          
          <div className="hero-amenities">
            {property.isAllInclusive && <span className="amenity-pill success"><Check size={14}/> All-inclusive</span>}
            {property.amenities?.map((am, i) => <span key={i} className="amenity-pill">{am}</span>)}
          </div>
        </div>
      </div>

      <div className="rooms-management-section">
        <div className="section-header">
          <div>
            <h2 className="text-h2">Room Inventory</h2>
            <p className="text-body">Manage specific rooms and pricing for this property.</p>
          </div>
          <button className="mz-btn mz-btn--primary" onClick={() => setIsAddRoomModalOpen(true)}>
            <Plus size={18} /> Add Room
          </button>
        </div>

        <div className="mz-card p-0 overflow-hidden">
          {rooms.length === 0 ? (
            <div className="empty-state p-6 text-center">
              <BedDouble size={48} className="text-muted mx-auto mb-4" style={{opacity: 0.5}} />
              <p>No rooms configured for this property yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="mz-table">
                <thead>
                  <tr>
                    <th>Room No.</th>
                    <th>Type</th>
                    <th>Capacity</th>
                    <th>Price/Night</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(room => (
                    <tr key={room.id}>
                      <td className="font-bold">{room.roomNumber}</td>
                      <td>{room.type}</td>
                      <td>{room.capacity} Guests</td>
                      <td className="font-bold">${room.price}</td>
                      <td>
                        <span className={`mz-badge ${getStatusBadge(room.status)}`}>{room.status}</span>
                      </td>
                      <td>
                        <button className="mz-btn mz-btn--ghost mz-btn--sm">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AddRoomModal 
        isOpen={isAddRoomModalOpen} 
        onClose={() => setIsAddRoomModalOpen(false)} 
        propertyId={property.id} 
      />
    </div>
  );
};

export default PropertyDetailsPage;
