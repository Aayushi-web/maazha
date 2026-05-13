import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, Heart, Check, ChevronDown, Plus } from 'lucide-react';
import { fetchProperties } from '../services/mockData';
import type { Property } from '../types/dashboard';
import AddPropertyModal from '../components/properties/AddPropertyModal';
import './PropertiesPage.css';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('Kas');
  const [filters, setFilters] = useState({
    freeCancellation: false,
    fiveStars: false,
    allInclusive: false,
    noCreditCard: false,
    luxury: false,
    beachfront: false
  });

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties", error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Applying filters dynamically based on mock data
    const matchesFiveStars = filters.fiveStars ? p.rating && p.rating >= 8.5 : true;
    const matchesAllInclusive = filters.allInclusive ? p.isAllInclusive : true;
    const matchesBeachfront = filters.beachfront ? p.amenities?.includes('Beachfront') : true;
    const matchesLuxury = filters.luxury ? p.amenities?.includes('Luxury') : true;

    return matchesSearch && matchesFiveStars && matchesAllInclusive && matchesBeachfront && matchesLuxury;
  });

  if (loading) {
    return <div className="loading-state animate-fade-up">Loading properties...</div>;
  }

  return (
    <div className="properties-page animate-fade-up">
      <div className="properties-header">
        <div>
          <h1 className="text-h1">Hotels and Places to Stay</h1>
          <p className="text-body mt-1">Find Hotel</p>
        </div>
        <button className="mz-btn mz-btn--primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} /> Add Property
        </button>
      </div>

      {/* Top Search Bar */}
      <div className="search-container mz-card">
        <div className="search-field">
          <MapPin size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Where are you going?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="search-divider"></div>
        <div className="search-field">
          <Calendar size={18} className="search-icon" />
          <input type="text" placeholder="Check-in Date - Check-out Date" defaultValue="14 May - 16 May" />
        </div>
        <div className="search-divider"></div>
        <div className="search-field dropdown-field">
          <Users size={18} className="search-icon" />
          <span className="dropdown-text">2 Guest, 1 Room</span>
          <ChevronDown size={16} className="dropdown-caret" />
        </div>
        <button className="mz-btn mz-btn--brand search-btn">Search</button>
      </div>

      <div className="properties-content">
        {/* Left Sidebar Filters */}
        <div className="filters-sidebar">
          <div className="mz-card filter-card">
            <h4 className="filter-title">Price / Night</h4>
            <p className="filter-subtitle">Set your budget</p>
            
            <div className="price-histogram">
              {/* Mock Histogram bars */}
              <div className="hist-bar" style={{height: '20%'}}></div>
              <div className="hist-bar" style={{height: '35%'}}></div>
              <div className="hist-bar" style={{height: '50%'}}></div>
              <div className="hist-bar" style={{height: '80%'}}></div>
              <div className="hist-bar" style={{height: '100%'}}></div>
              <div className="hist-bar" style={{height: '75%'}}></div>
              <div className="hist-bar" style={{height: '45%'}}></div>
              <div className="hist-bar" style={{height: '30%'}}></div>
              <div className="hist-bar" style={{height: '20%'}}></div>
              <div className="hist-bar" style={{height: '15%'}}></div>
              <div className="hist-bar" style={{height: '10%'}}></div>
            </div>
            
            <div className="price-slider">
              <div className="slider-track">
                <div className="slider-fill"></div>
                <div className="slider-handle left"></div>
                <div className="slider-handle right"></div>
              </div>
              <div className="price-labels">
                <span>₹40</span>
                <span>₹500+</span>
              </div>
            </div>
          </div>

          <div className="mz-card filter-card">
            <h4 className="filter-title mb-4">Filters</h4>
            
            <div className="filter-checklist">
              <label className="checkbox-item">
                <input type="checkbox" checked={filters.freeCancellation} onChange={() => handleFilterChange('freeCancellation')} />
                <span className="checkbox-label">Free Cancellation</span>
                <span className="checkbox-count">60</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={filters.fiveStars} onChange={() => handleFilterChange('fiveStars')} />
                <span className="checkbox-label">5 Stars</span>
                <span className="checkbox-count">2</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={filters.allInclusive} onChange={() => handleFilterChange('allInclusive')} />
                <span className="checkbox-label">All Inclusive</span>
                <span className="checkbox-count">32</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={filters.noCreditCard} onChange={() => handleFilterChange('noCreditCard')} />
                <span className="checkbox-label">Book Without Credit Card</span>
                <span className="checkbox-count">3</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={filters.luxury} onChange={() => handleFilterChange('luxury')} />
                <span className="checkbox-label">Luxury</span>
                <span className="checkbox-count">12</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={filters.beachfront} onChange={() => handleFilterChange('beachfront')} />
                <span className="checkbox-label">Beachfront</span>
                <span className="checkbox-count">62</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Property List */}
        <div className="properties-list-container">
          <div className="list-toolbar">
            <div className="sort-dropdown">
              <span className="sort-label">Sort by:</span>
              <button className="mz-btn mz-btn--ghost mz-btn--sm sort-btn">
                Recommended <ChevronDown size={14} />
              </button>
            </div>
            <div className="results-count">Results: {filteredProperties.length} Facilities Found</div>
          </div>

          <div className="properties-list">
            {filteredProperties.length === 0 ? (
              <div className="no-results mz-card">
                <p>No properties match your exact filters. Try adjusting them.</p>
              </div>
            ) : (
              filteredProperties.map((property) => (
                <div key={property.id} className="mz-card property-listing-card">
                  <div className="property-image-wrapper">
                    <img src={property.imageUrl} alt={property.name} className="property-image" />
                    <button className="fav-btn">
                      <Heart size={18} />
                    </button>
                  </div>
                  
                  <div className="property-details">
                    <div className="property-header-row">
                      <h2 className="property-name">{property.name}</h2>
                      <div className="property-rating-block">
                        <div className="rating-text">
                          <span className="rating-word">{property.ratingText}</span>
                          <span className="review-count">{property.reviewCount} Reviews</span>
                        </div>
                        <div className="rating-score">{property.rating}</div>
                      </div>
                    </div>

                    <div className="property-meta">
                      <button className="show-map-btn">
                        <MapPin size={12} /> Show on Map
                      </button>
                      <span className="distance-text">{property.distance}</span>
                    </div>

                    <div className="property-stars">
                      {[1, 2, 3, 4].map(i => <Star key={i} size={14} className="star filled" />)}
                      <Star size={14} className="star" />
                      <span className="type-label">{property.type}</span>
                    </div>

                    <div className="property-amenities">
                      {property.isAllInclusive && (
                        <div className="amenity-badge success">
                          <Check size={14} /> All-inclusive
                        </div>
                      )}
                      {property.amenities?.map((amenity, idx) => (
                        <div key={idx} className="amenity-badge">
                          {amenity}
                        </div>
                      ))}
                    </div>

                    <div className="property-pricing">
                      <div className="pricing-info">
                        <span className="stay-duration">1 night, 2 adults</span>
                        <h3 className="price-total">₹{property.pricePerNight}</h3>
                        <span className="tax-info">Including Taxes and Fees</span>
                      </div>
                      <button 
                        className="mz-btn mz-btn--brand view-hotel-btn"
                        onClick={() => navigate(`/properties/${property.id}`)}
                      >
                        View {property.type} &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <AddPropertyModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={(newProperty) => {
          setProperties(prev => [newProperty, ...prev]);
        }}
      />
    </div>
  );
};

export default PropertiesPage;
