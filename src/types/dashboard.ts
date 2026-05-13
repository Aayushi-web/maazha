export interface Property {
  id: string;
  name: string;
  type: 'Hotel' | 'PG' | 'Hostel' | 'Apartment';
  totalRooms: number;
  availableRooms: number;
  location: string;
  status: 'Active' | 'Maintenance' | 'Inactive';
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  roomNumber: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
}

export interface Booking {
  id: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  amount: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface DashboardStats {
  totalProperties: number;
  totalRooms: number;
  occupancyRate: number; // percentage
  monthlyRevenue: number;
  activeGuests: number;
  pendingBookings: number;
}
