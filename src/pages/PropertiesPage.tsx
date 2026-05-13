import { useState, useEffect } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import PropertiesFilter from '../components/properties/PropertiesFilter';
import PropertySearchBar from '../components/properties/PropertySearchBar';
import PropertyCard from '../components/properties/PropertyCard';
import { fetchProperties } from '../services/mockData';
import type { Property } from '../types/dashboard';
import './PropertiesPage.css';

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="properties-page animate-fade-up">
      <PropertySearchBar />
      
      <div className="properties-main-content">
        <PropertiesFilter />
        
        <div className="properties-list-container">
          <div className="list-header">
            <div className="sort-by">
              <span className="sort-label">Sort by:</span>
              <button className="sort-btn mz-btn mz-btn--ghost mz-btn--sm">
                Recommended <ChevronDown size={14} />
              </button>
              <button className="info-btn"><Info size={16} /></button>
            </div>
            <div className="result-count">
              Kas: {properties.length * 80} Facilities Found
            </div>
          </div>
          
          <div className="properties-list">
            {loading ? (
              <div className="loading-state">Loading properties...</div>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
