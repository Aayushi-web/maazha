import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, CalendarDays, Wallet, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Building2, label: 'Properties', path: '/properties' },
    { icon: Users, label: 'Tenants', path: '/tenants' },
    { icon: CalendarDays, label: 'Bookings', path: '/bookings' },
    { icon: Wallet, label: 'Finance', path: '/finance' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">M</div>
        <span className="brand-text">Maazha</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" size={20} />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
