import { ChevronDown } from 'lucide-react';
import './PropertiesFilter.css';

const PropertiesFilter = () => {
  return (
    <aside className="properties-filter">
      {/* Price Section */}
      <div className="filter-section mz-card">
        <h4 className="filter-title">Price / Night</h4>
        <p className="filter-subtitle">Set your budget</p>
        <div className="price-histogram">
          {/* Mock Histogram Bars */}
          <div className="histogram-bars">
            {[2, 5, 8, 15, 20, 25, 18, 12, 8, 6, 4, 2, 1, 1, 1].map((h, i) => (
              <div key={i} className="bar" style={{ height: `${h * 3}px` }}></div>
            ))}
          </div>
          <div className="slider-track">
            <div className="slider-range"></div>
            <div className="slider-handle left"></div>
            <div className="slider-handle right"></div>
          </div>
          <div className="price-labels">
            <span>$40</span>
            <span>$500+</span>
          </div>
        </div>
      </div>

      {/* Property Type/Filter */}
      <div className="filter-section mz-card">
        <h4 className="filter-title">Price / Night</h4>
        <div className="checkbox-group">
          {[
            { label: 'Free Cancellation', count: 60 },
            { label: '5 Stars', count: 2 },
            { label: 'All Inclusive', count: 32 },
            { label: 'Book Without Credit Card', count: 3 },
            { label: 'Luxury', count: 12 },
            { label: 'Beachfront', count: 62 },
          ].map((item, i) => (
            <label key={i} className="checkbox-label">
              <input type="checkbox" className="mz-checkbox" />
              <span className="checkbox-text">{item.label}</span>
              <span className="checkbox-count">{item.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="filter-section mz-card">
        <h4 className="filter-title">Amenities</h4>
        <div className="checkbox-group">
          {[
            { label: 'Free Wifi', count: 102 },
            { label: 'Breakfast Included', count: 100 },
            { label: 'Pool', count: 48 },
            { label: 'Free Parking', count: 88 },
            { label: 'Adults Only', count: 8 },
            { label: 'Air Conditioning', count: 120 },
          ].map((item, i) => (
            <label key={i} className="checkbox-label">
              <input type="checkbox" className="mz-checkbox" />
              <span className="checkbox-text">{item.label}</span>
              <span className="checkbox-count">{item.count}</span>
            </label>
          ))}
        </div>
        <button className="show-more-btn">
          Show More <ChevronDown size={14} />
        </button>
      </div>

      {/* Fun things to do */}
      <div className="filter-section mz-card">
        <h4 className="filter-title">Fun things to do</h4>
        <div className="checkbox-group">
          {[
            { label: 'Beach', count: 200 },
            { label: 'Fitness Centre', count: 24 },
            { label: 'Sauna', count: 52 },
            { label: 'Cycling', count: 31 },
            { label: 'Animation Show', count: 8 },
            { label: 'Shopping Centre', count: 4 },
          ].map((item, i) => (
            <label key={i} className="checkbox-label">
              <input type="checkbox" className="mz-checkbox" />
              <span className="checkbox-text">{item.label}</span>
              <span className="checkbox-count">{item.count}</span>
            </label>
          ))}
        </div>
        <button className="show-more-btn">
          Show More <ChevronDown size={14} />
        </button>
      </div>
    </aside>
  );
};

export default PropertiesFilter;
