import { Search, Bell, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h2 className="header-title">Overview</h2>
        <p className="header-subtitle">Welcome back to your dashboard</p>
      </div>
      
      <div className="header-right">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." className="mz-input search-input" />
        </div>
        
        <button className="header-icon-btn notifications-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-role">Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
