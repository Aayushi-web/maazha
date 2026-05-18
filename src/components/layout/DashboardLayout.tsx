import type { ReactNode } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ArrowLeft, Building2, LayoutDashboard, ReceiptIndianRupee, Users, WalletCards } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import './DashboardLayout.css';

const mobileNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Building2, label: 'Property', path: '/property-management' },
  { icon: Users, label: 'Tenant', path: '/tenant-management' },
  { icon: ReceiptIndianRupee, label: 'Rent', path: '/rent-management' },
  { icon: WalletCards, label: 'Expense', path: '/expense-management' },
];

const DashboardLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-mobile-nav" aria-label="Mobile dashboard navigation">
          <div className="dashboard-mobile-nav__top">
            <Link className="dashboard-mobile-nav__back" to="/" aria-label="Go to main page">
              <ArrowLeft size={18} />
            </Link>
            <Link className="dashboard-mobile-nav__brand" to="/" aria-label="Go to Maazha home page">
              <span className="dashboard-mobile-nav__logo">M</span>
              <span>Maazha</span>
            </Link>
          </div>

          <nav className="dashboard-mobile-tabs" aria-label="Dashboard sections">
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `dashboard-mobile-tab ${isActive ? 'is-active' : ''}`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <Header />
        <main className="dashboard-content">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
