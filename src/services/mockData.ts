import type { Booking, DashboardStats, Property, RevenueData, Tenant } from '../types/dashboard';

export const mockProperties: Property[] = [
  { 
    id: 'p1', name: 'Narcissus Hotel', type: 'Hotel', totalRooms: 40, availableRooms: 5, location: 'Kas', status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 9.1, reviewCount: 895, pricePerNight: 100, distance: '1 km from the City Centre', isAllInclusive: true,
    amenities: ['Free Wifi', 'Pool', 'Breakfast Included']
  },
  { 
    id: 'p2', name: 'Viva Hotel', type: 'Hotel', totalRooms: 100, availableRooms: 12, location: 'Kas', status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 7.5, reviewCount: 702, pricePerNight: 98, distance: '1.2 km from the City Centre', isAllInclusive: true,
    amenities: ['Free Wifi', 'Pool']
  },
  { 
    id: 'p3', name: 'Lila Hotel', type: 'Hotel', totalRooms: 20, availableRooms: 0, location: 'Kas', status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 8.5, reviewCount: 600, pricePerNight: 120, distance: '0.4 km from the City Centre', isAllInclusive: true,
    amenities: ['Free Wifi', 'Adults Only', 'Breakfast Included']
  },
  { 
    id: 'p4', name: 'Marin Hotel', type: 'Hotel', totalRooms: 35, availableRooms: 8, location: 'Kas', status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 8.7, reviewCount: 700, pricePerNight: 150, distance: '0.1 km from the City Centre', isAllInclusive: true,
    amenities: ['Free Wifi', 'Pool', 'Beachfront']
  },
];

export const mockTenants: Tenant[] = [
  { id: 't1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 9876543210', propertyId: 'p1', roomNumber: '101', status: 'Active', joinDate: '2023-10-15' },
  { id: 't2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 9876543211', propertyId: 'p2', roomNumber: '205A', status: 'Active', joinDate: '2024-01-20' },
  { id: 't3', name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 9876543212', propertyId: 'p3', roomNumber: 'A-402', status: 'Pending', joinDate: '2024-05-15' },
];

export const mockBookings: Booking[] = [
  { id: 'b1', tenantName: 'Vikram Singh', propertyId: 'p1', propertyName: 'Sunrise PG', roomNumber: '102', checkInDate: '2024-05-10', checkOutDate: '2025-05-09', amount: 8500, status: 'Confirmed' },
  { id: 'b2', tenantName: 'Neha Gupta', propertyId: 'p2', propertyName: 'Blue Horizon Hostel', roomNumber: '304B', checkInDate: '2024-05-14', checkOutDate: '2024-11-13', amount: 6500, status: 'Pending' },
  { id: 'b3', tenantName: 'Sanjay Reddy', propertyId: 'p3', propertyName: 'Oakwood Apartments', roomNumber: 'B-201', checkInDate: '2024-04-01', checkOutDate: '2025-03-31', amount: 25000, status: 'Completed' },
  { id: 'b4', tenantName: 'Anjali Desai', propertyId: 'p1', propertyName: 'Sunrise PG', roomNumber: '105', checkInDate: '2024-05-16', checkOutDate: '2024-08-15', amount: 8500, status: 'Confirmed' },
];

export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 125000, expenses: 45000, profit: 80000 },
  { month: 'Feb', revenue: 132000, expenses: 48000, profit: 84000 },
  { month: 'Mar', revenue: 145000, expenses: 50000, profit: 95000 },
  { month: 'Apr', revenue: 138000, expenses: 52000, profit: 86000 },
  { month: 'May', revenue: 160000, expenses: 55000, profit: 105000 },
  { month: 'Jun', revenue: 175000, expenses: 50000, profit: 125000 },
];

export const mockStats: DashboardStats = {
  totalProperties: 3,
  totalRooms: 160,
  occupancyRate: 89,
  monthlyRevenue: 160000,
  activeGuests: 143,
  pendingBookings: 8,
};

// Simulated API calls for future Firebase integration
export const fetchProperties = async (): Promise<Property[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockProperties), 500));
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockStats), 600));
};

export const fetchRevenueData = async (): Promise<RevenueData[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockRevenueData), 800));
};

export const fetchRecentBookings = async (): Promise<Booking[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockBookings), 500));
};
