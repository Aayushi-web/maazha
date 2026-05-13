import { MapPin, Calendar, Users } from 'lucide-react';
import './PropertySearchBar.css';

const PropertySearchBar = () => {
  return (
    <div className="property-search-bar mz-card">
      <div className="search-bar-header">
        <h2 className="text-h2 search-title">Kas Hotels and Places to Stay</h2>
        <p className="search-subtitle">Find Hotel</p>
      </div>

      <div className="search-inputs-row">
        <div className="search-input-group location-group">
          <MapPin size={18} className="input-icon" />
          <input type="text" placeholder="Where are you going?" defaultValue="Kas" className="search-input-field" />
        </div>
        
        <div className="search-input-group date-group">
          <Calendar size={18} className="input-icon" />
          <input type="text" placeholder="Check-in Date - Check-out Date" className="search-input-field" />
        </div>
        
        <div className="search-input-group guests-group">
          <Users size={18} className="input-icon" />
          <select className="search-select-field">
            <option>2 Guest, 1 Room</option>
            <option>1 Guest, 1 Room</option>
            <option>3 Guests, 2 Rooms</option>
          </select>
        </div>
        
        <button className="mz-btn mz-btn--primary search-btn">
          Search
        </button>
      </div>
    </div>
  );
};

export default PropertySearchBar;
