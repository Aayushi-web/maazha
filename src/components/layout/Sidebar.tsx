import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, ReceiptIndianRupee, Users, WalletCards, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Building2, label: 'Property Management', path: '/property-management' },
    { icon: Users, label: 'Tenant Management', path: '/tenant-management' },
    { icon: ReceiptIndianRupee, label: 'Rent Management', path: '/rent-management' },
    { icon: WalletCards, label: 'Expense Management', path: '/expense-management' },
  ];

  return (
    <aside className="dashboard-sidebar">
      <Link className="sidebar-brand" to="/" aria-label="Go to Maazha home page">
        <div className="brand-logo">M</div>
        <span className="brand-text">Maazha</span>
      </Link>

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
