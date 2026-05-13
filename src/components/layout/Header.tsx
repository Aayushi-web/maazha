import { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import './Header.css';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'success', message: 'Booking #B1 confirmed successfully', time: '10 mins ago', read: false },
  { id: 2, type: 'warning', message: 'Payment pending for Oakwood Apartments', time: '1 hour ago', read: false },
  { id: 3, type: 'info', message: 'New tenant added: Rahul Sharma', time: '2 hours ago', read: false },
  { id: 4, type: 'info', message: 'System maintenance scheduled for tonight', time: '1 day ago', read: true },
];

const Header = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: localStorage.getItem('userName') || 'Admin',
    email: localStorage.getItem('userEmail') || 'admin@maazha.com',
    role: 'Manager'
  });

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setIsEditingProfile(false); // Reset edit state when closing
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', profileData.name);
    localStorage.setItem('userEmail', profileData.email);
    setIsEditingProfile(false);
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-success" />;
      case 'warning': return <AlertTriangle size={16} className="text-warning" />;
      default: return <Info size={16} className="text-brand" />;
    }
  };

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
        
        <div className="notifications-wrapper" ref={notifRef}>
          <button 
            className={`header-icon-btn notifications-btn ${isNotifOpen ? 'active' : ''}`}
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              if (isProfileOpen) setIsProfileOpen(false);
            }}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {isNotifOpen && (
            <div className="notifications-panel animate-fade-up">
              <div className="notifications-header">
                <h3 className="text-h3">Notifications</h3>
                <button className="mark-all-read">Mark all as read</button>
              </div>
              <div className="notifications-list">
                {MOCK_NOTIFICATIONS.map((notif) => (
                  <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
                    <div className="notification-icon-box">
                      {getNotifIcon(notif.type)}
                    </div>
                    <div className="notification-content">
                      <p className="notification-message">{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                    {!notif.read && <div className="unread-dot"></div>}
                  </div>
                ))}
              </div>
              <div className="notifications-footer">
                <button className="view-all-btn">View All Activity</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="profile-wrapper" ref={profileRef}>
          <div 
            className={`user-profile ${isProfileOpen ? 'active' : ''}`}
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              if (isNotifOpen) setIsNotifOpen(false);
            }}
          >
            <div className="avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <span className="user-name">{profileData.name}</span>
              <span className="user-role">{profileData.role}</span>
            </div>
          </div>

          {isProfileOpen && (
            <div className="profile-panel animate-fade-up">
              <div className="profile-panel-header">
                <div className="avatar-large">
                  <User size={32} />
                </div>
                {!isEditingProfile ? (
                  <div className="profile-summary">
                    <h3 className="text-h3">{profileData.name}</h3>
                    <p className="text-secondary">{profileData.email}</p>
                    <span className="mz-badge mz-badge--blue mt-2">{profileData.role}</span>
                  </div>
                ) : (
                  <h3 className="text-h3">Edit Profile</h3>
                )}
              </div>

              <div className="profile-panel-body">
                {isEditingProfile ? (
                  <form onSubmit={handleProfileSave} className="profile-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        className="mz-input" 
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        className="mz-input" 
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-actions mt-4">
                      <button type="button" className="mz-btn mz-btn--ghost mz-btn--sm" onClick={() => setIsEditingProfile(false)}>Cancel</button>
                      <button type="submit" className="mz-btn mz-btn--primary mz-btn--sm">Save Changes</button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-actions">
                    <button className="mz-btn mz-btn--ghost w-100 justify-start" onClick={() => setIsEditingProfile(true)}>
                      Edit Profile Details
                    </button>
                    <button className="mz-btn mz-btn--ghost w-100 justify-start">
                      Account Settings
                    </button>
                    <div className="divider"></div>
                    <button className="mz-btn mz-btn--ghost text-error w-100 justify-start" onClick={() => window.location.href = '/'}>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
