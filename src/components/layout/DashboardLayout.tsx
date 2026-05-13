import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import './DashboardLayout.css';

const DashboardLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <main className="dashboard-content">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
