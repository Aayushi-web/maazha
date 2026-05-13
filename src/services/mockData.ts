import type { Booking, DashboardStats, Property, RevenueData, Tenant, Transaction, Room } from '../types/dashboard';

export const mockProperties: Property[] = [
  { 
    id: 'p1', name: 'Narcissus Hotel', type: 'Hotel', totalRooms: 40, availableRooms: 5, location: 'Kas', status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 9.1, ratingText: 'Extraordinary', reviewCount: 895, pricePerNight: 100, distance: '1 km from the City Centre', isAllInclusive: true,
    amenities: ['Free Wifi', 'Pool', 'Breakfast Included']
  },
  { 
    id: 'p2', name: 'Viva Hotel', type: 'Hotel', totalRooms: 100, availableRooms: 12, location: 'Kas', status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 7.5, ratingText: 'Good', reviewCount: 702, pricePerNight: 98, distance: '1.2 km from the City Centre', isAllInclusive: true,
    amenities: ['Free Wifi', 'Pool']
  },
  { 
    id: 'p3', name: 'Lila Hotel', type: 'Hotel', totalRooms: 20, availableRooms: 0, location: 'Kas', status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 8.5, ratingText: 'Good', reviewCount: 600, pricePerNight: 120, distance: '0.4 km from the City Centre', isAllInclusive: true,
    amenities: ['Free Wifi', 'Adults Only', 'Breakfast Included']
  },
  { 
    id: 'p4', name: 'Marin Hotel', type: 'Hotel', totalRooms: 35, availableRooms: 8, location: 'Kas', status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 8.7, ratingText: 'Very Good', reviewCount: 700, pricePerNight: 150, distance: '0.1 km from the City Centre', isAllInclusive: true,
    amenities: ['Free Wifi', 'Pool', 'Beachfront']
  },
];

export const mockRooms: Room[] = [
  { id: 'r1', propertyId: 'p1', roomNumber: '101', type: 'Single', capacity: 1, price: 80, status: 'Occupied' },
  { id: 'r2', propertyId: 'p1', roomNumber: '102', type: 'Double', capacity: 2, price: 100, status: 'Available' },
  { id: 'r3', propertyId: 'p1', roomNumber: '103', type: 'Double', capacity: 2, price: 100, status: 'Occupied' },
  { id: 'r4', propertyId: 'p1', roomNumber: '201', type: 'Suite', capacity: 4, price: 250, status: 'Available' },
  { id: 'r5', propertyId: 'p1', roomNumber: '202', type: 'Suite', capacity: 4, price: 250, status: 'Maintenance' },
  
  { id: 'r6', propertyId: 'p2', roomNumber: 'A-10', type: 'Double', capacity: 2, price: 98, status: 'Available' },
  { id: 'r7', propertyId: 'p2', roomNumber: 'A-11', type: 'Double', capacity: 2, price: 98, status: 'Available' },
  { id: 'r8', propertyId: 'p2', roomNumber: 'B-01', type: 'Suite', capacity: 5, price: 300, status: 'Occupied' },
];

export const mockTenants: Tenant[] = [
  { id: 't1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 9876543210', propertyId: 'p1', roomNumber: '101', status: 'Active', joinDate: '2023-10-15' },
  { id: 't2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 9876543211', propertyId: 'p2', roomNumber: '205A', status: 'Active', joinDate: '2024-01-20' },
  { id: 't3', name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 9876543212', propertyId: 'p3', roomNumber: 'A-402', status: 'Pending', joinDate: '2024-05-15' },
  { id: 't4', name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 9876543213', propertyId: 'p1', roomNumber: '102', status: 'Active', joinDate: '2024-02-10' },
  { id: 't5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 9876543214', propertyId: 'p2', roomNumber: '304B', status: 'Inactive', joinDate: '2023-08-05' },
  { id: 't6', name: 'Neha Gupta', email: 'neha@example.com', phone: '+91 9876543215', propertyId: 'p1', roomNumber: '105', status: 'Active', joinDate: '2024-03-22' },
  { id: 't7', name: 'Sanjay Das', email: 'sanjay@example.com', phone: '+91 9876543216', propertyId: 'p3', roomNumber: 'B-201', status: 'Active', joinDate: '2024-04-01' },
];

export const mockBookings: Booking[] = [
  { id: 'b1', tenantName: 'Vikram Singh', propertyId: 'p1', propertyName: 'Sunrise PG', roomNumber: '102', checkInDate: '2024-05-10', checkOutDate: '2025-05-09', amount: 8500, status: 'Confirmed', paymentStatus: 'Paid', source: 'Direct', guestEmail: 'vikram@example.com', guestPhone: '+91 9876543210' },
  { id: 'b2', tenantName: 'Neha Gupta', propertyId: 'p2', propertyName: 'Blue Horizon Hostel', roomNumber: '304B', checkInDate: '2024-05-14', checkOutDate: '2024-11-13', amount: 6500, status: 'Pending', paymentStatus: 'Unpaid', source: 'Booking.com', guestEmail: 'neha@example.com', guestPhone: '+91 9876543211', specialRequests: 'Late Check-in' },
  { id: 'b3', tenantName: 'Sanjay Reddy', propertyId: 'p3', propertyName: 'Oakwood Apartments', roomNumber: 'B-201', checkInDate: '2024-04-01', checkOutDate: '2025-03-31', amount: 25000, status: 'Completed', paymentStatus: 'Paid', source: 'Airbnb', guestEmail: 'sanjay@example.com', guestPhone: '+91 9876543212' },
  { id: 'b4', tenantName: 'Anjali Desai', propertyId: 'p1', propertyName: 'Sunrise PG', roomNumber: '105', checkInDate: '2024-05-16', checkOutDate: '2024-08-15', amount: 8500, status: 'Confirmed', paymentStatus: 'Partial', source: 'Agoda', guestEmail: 'anjali@example.com', guestPhone: '+91 9876543213' },
  { id: 'b5', tenantName: 'John Doe', propertyId: 'p2', propertyName: 'Blue Horizon Hostel', roomNumber: '301', checkInDate: '2024-05-01', checkOutDate: '2024-05-05', amount: 4500, status: 'Cancelled', paymentStatus: 'Unpaid', source: 'Direct', guestEmail: 'john@example.com', guestPhone: '+1 555 1234', specialRequests: 'Changed mind' },
  { id: 'b6', tenantName: 'Rahul Sharma', propertyId: 'p1', propertyName: 'Sunrise PG', roomNumber: '101', checkInDate: '2023-10-15', checkOutDate: '2024-10-14', amount: 12000, status: 'Confirmed', paymentStatus: 'Paid', source: 'Direct', guestEmail: 'rahul@example.com', guestPhone: '+91 9876543215' }
];

export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 125000, expenses: 45000, profit: 80000 },
  { month: 'Feb', revenue: 132000, expenses: 48000, profit: 84000 },
  { month: 'Mar', revenue: 145000, expenses: 50000, profit: 95000 },
  { month: 'Apr', revenue: 138000, expenses: 52000, profit: 86000 },
  { month: 'May', revenue: 160000, expenses: 55000, profit: 105000 },
  { month: 'Jun', revenue: 175000, expenses: 50000, profit: 125000 },
];

export const mockTransactions: Transaction[] = [
  { id: 'txn_101', date: '2024-05-18T10:30:00Z', description: 'Rent Payment - Sunrise PG (102)', amount: 8500, type: 'Income', status: 'Completed', referenceId: 'b1' },
  { id: 'txn_102', date: '2024-05-18T14:15:00Z', description: 'Plumbing Repair - Blue Horizon', amount: 1500, type: 'Expense', status: 'Completed' },
  { id: 'txn_103', date: '2024-05-17T09:00:00Z', description: 'Advance Booking - Oakwood Apts', amount: 25000, type: 'Income', status: 'Completed', referenceId: 'b3' },
  { id: 'txn_104', date: '2024-05-16T11:45:00Z', description: 'Partial Rent - Sunrise PG (105)', amount: 4500, type: 'Income', status: 'Pending', referenceId: 'b4' },
  { id: 'txn_105', date: '2024-05-15T16:20:00Z', description: 'Internet Bill Payment', amount: 2999, type: 'Expense', status: 'Completed' },
  { id: 'txn_106', date: '2024-05-14T08:30:00Z', description: 'Booking Cancellation Refund', amount: 4500, type: 'Refund', status: 'Completed', referenceId: 'b5' },
  { id: 'txn_107', date: '2024-05-12T13:00:00Z', description: 'Electricity Bill - Oakwood', amount: 8500, type: 'Expense', status: 'Pending' },
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

export const fetchTenants = async (): Promise<Tenant[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTenants), 500));
};

export const fetchTenantById = async (id: string): Promise<Tenant | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTenants.find(t => t.id === id));
    }, 400);
  });
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockStats), 600));
};

export const fetchRevenueData = async (): Promise<RevenueData[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockRevenueData), 800));
};

export const fetchRecentBookings = async (): Promise<Booking[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockBookings.slice(0, 4)), 500));
};

export const fetchAllBookings = async (): Promise<Booking[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockBookings), 500));
};

export const fetchBookingById = async (id: string): Promise<Booking | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBookings.find(b => b.id === id));
    }, 400);
  });
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTransactions), 600));
};

export const fetchPropertyById = async (id: string): Promise<Property | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProperties.find(p => p.id === id));
    }, 300);
  });
};

export const fetchRoomsByPropertyId = async (propertyId: string): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRooms.filter(r => r.propertyId === propertyId));
    }, 400);
  });
};
