import { useState } from 'react';
import { User, Bell, CreditCard, Shield, Camera } from 'lucide-react';
import './SettingsPage.css';

type Tab = 'profile' | 'notifications' | 'billing' | 'security';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  // Mock Settings State
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'Manager',
    email: 'admin@maazha.com',
    phone: '+1 234 567 8900',
    companyName: 'Maazha Properties LLC'
  });

  const [notifications, setNotifications] = useState({
    newBookings: true,
    cancellations: true,
    reviews: false,
    marketing: false,
    weeklyReports: true
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderProfileTab = () => (
    <div className="settings-pane animate-fade-up">
      <h2 className="text-h2 mb-6">Profile Information</h2>
      
      <div className="profile-avatar-section mb-8">
        <div className="avatar-wrapper">
          <div className="avatar-placeholder">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </div>
          <button className="avatar-upload-btn">
            <Camera size={14} />
          </button>
        </div>
        <div className="avatar-info">
          <h3 className="text-h3">Profile Picture</h3>
          <p className="text-body text-muted">PNG, JPEG under 5MB</p>
        </div>
      </div>

      <div className="settings-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" className="mz-input" value={profile.firstName} onChange={handleProfileChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" className="mz-input" value={profile.lastName} onChange={handleProfileChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" className="mz-input" value={profile.email} onChange={handleProfileChange} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" className="mz-input" value={profile.phone} onChange={handleProfileChange} />
          </div>
        </div>
        <div className="form-group mb-6">
          <label>Company Name</label>
          <input type="text" name="companyName" className="mz-input" value={profile.companyName} onChange={handleProfileChange} />
        </div>
        
        <button className="mz-btn mz-btn--primary">Save Changes</button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-pane animate-fade-up">
      <h2 className="text-h2 mb-2">Notification Preferences</h2>
      <p className="text-body text-muted mb-6">Choose what updates you want to receive via email.</p>
      
      <div className="toggle-list">
        <div className="toggle-item">
          <div className="toggle-info">
            <h4 className="toggle-title">New Bookings</h4>
            <p className="toggle-desc">Get notified when a new booking is confirmed.</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notifications.newBookings} onChange={() => toggleNotification('newBookings')} />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="toggle-item">
          <div className="toggle-info">
            <h4 className="toggle-title">Cancellations</h4>
            <p className="toggle-desc">Get notified if a guest cancels their stay.</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notifications.cancellations} onChange={() => toggleNotification('cancellations')} />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="toggle-item">
          <div className="toggle-info">
            <h4 className="toggle-title">New Reviews</h4>
            <p className="toggle-desc">Get notified when a guest leaves a review.</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notifications.reviews} onChange={() => toggleNotification('reviews')} />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="toggle-item">
          <div className="toggle-info">
            <h4 className="toggle-title">Weekly Reports</h4>
            <p className="toggle-desc">Receive a weekly summary of your property performance.</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notifications.weeklyReports} onChange={() => toggleNotification('weeklyReports')} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="settings-pane animate-fade-up">
      <h2 className="text-h2 mb-6">Billing & Subscription</h2>
      
      <div className="billing-card mz-card mb-6">
        <div className="plan-header">
          <div>
            <h3 className="plan-name">Professional Plan</h3>
            <p className="plan-status">Active until Dec 31, 2026</p>
          </div>
          <div className="plan-price">
            <span className="amount">$49</span><span className="period">/mo</span>
          </div>
        </div>
        <div className="plan-actions">
          <button className="mz-btn mz-btn--ghost mz-btn--sm">Cancel Plan</button>
          <button className="mz-btn mz-btn--brand mz-btn--sm">Upgrade to Enterprise</button>
        </div>
      </div>

      <h3 className="text-h3 mb-4">Payment Method</h3>
      <div className="payment-method-card mz-card">
        <div className="card-info">
          <div className="card-icon">💳</div>
          <div>
            <p className="card-number">Visa ending in 4242</p>
            <p className="card-expiry">Expires 12/28</p>
          </div>
        </div>
        <button className="mz-btn mz-btn--ghost mz-btn--sm">Update</button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="settings-pane animate-fade-up">
      <h2 className="text-h2 mb-2">Security Settings</h2>
      <p className="text-body text-muted mb-6">Update your password and secure your account.</p>

      <div className="settings-form">
        <div className="form-group mb-4">
          <label>Current Password</label>
          <input type="password" placeholder="••••••••" className="mz-input" />
        </div>
        <div className="form-group mb-4">
          <label>New Password</label>
          <input type="password" placeholder="••••••••" className="mz-input" />
        </div>
        <div className="form-group mb-6">
          <label>Confirm New Password</label>
          <input type="password" placeholder="••••••••" className="mz-input" />
        </div>
        
        <button className="mz-btn mz-btn--primary">Update Password</button>
      </div>

      <hr className="my-8 border-default" />

      <div className="two-factor-section">
        <div>
          <h3 className="text-h3">Two-Factor Authentication (2FA)</h3>
          <p className="text-body text-muted mt-1">Add an extra layer of security to your account.</p>
        </div>
        <button className="mz-btn mz-btn--ghost">Enable 2FA</button>
      </div>
    </div>
  );

  return (
    <div className="settings-page animate-fade-up">
      <div className="settings-header">
        <h1 className="text-h1">Settings</h1>
        <p className="text-body">Manage your account preferences and system configurations.</p>
      </div>

      <div className="settings-layout">
        {/* Sidebar Menu */}
        <aside className="settings-sidebar mz-card p-0">
          <nav className="settings-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> Profile
            </button>
            <button 
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={18} /> Notifications
            </button>
            <button 
              className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
              onClick={() => setActiveTab('billing')}
            >
              <CreditCard size={18} /> Billing
            </button>
            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} /> Security
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="settings-content mz-card">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'billing' && renderBillingTab()}
          {activeTab === 'security' && renderSecurityTab()}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
