import { MapPin, Check, Heart, Star } from 'lucide-react';
import type { Property } from '../../types/dashboard';
import './PropertyCard.css';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="property-card mz-card">
      <div className="property-image-container">
        <img src={property.imageUrl} alt={property.name} className="property-image" />
        <button className="favorite-btn" aria-label="Add to favorites">
          <Heart size={18} />
        </button>
      </div>

      <div className="property-details">
        <div className="property-info-main">
          <div className="property-title-section">
            <h3 className="property-title">{property.name}</h3>
            <div className="property-rating-badge">
              <span className="rating-word">{property.rating && property.rating >= 9 ? 'Extraordinary' : 'Good'}</span>
              <span className="review-count">{property.reviewCount} Reviews</span>
              <div className="rating-score">{property.rating}</div>
            </div>
          </div>
          
          <button className="map-btn mz-btn mz-btn--ghost mz-btn--sm">
            <MapPin size={14} />
            Show on Map
          </button>

          <div className="property-distance">
            <MapPin size={14} className="text-muted" />
            <span>{property.distance}</span>
          </div>

          <div className="property-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < 4 ? 'star-filled' : 'star-empty'} />
            ))}
            <span className="property-type-label">{property.type}</span>
          </div>

          {property.isAllInclusive && (
            <div className="all-inclusive">
              <Check size={14} className="check-icon" />
              <span>All-inclusive</span>
            </div>
          )}
        </div>

        <div className="property-price-section">
          <div className="price-details">
            <span className="stay-duration">1 night, 2 adults</span>
            <span className="price-amount">${property.pricePerNight}</span>
            <span className="price-taxes">Including Taxes and Fees</span>
          </div>
          <button className="mz-btn mz-btn--primary view-hotel-btn">
            View {property.type} &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
