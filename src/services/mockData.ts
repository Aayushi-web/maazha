import type { Complaint, DashboardStats, Property, RevenueData, Room, Tenant, Transaction } from '../types/dashboard';

export const mockProperties: Property[] = [
  {
    id: 'p1',
    name: 'Sunrise PG',
    type: 'PG',
    totalRooms: 40,
    availableRooms: 5,
    location: 'Kas',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 9.1,
    ratingText: 'Extraordinary',
    reviewCount: 895,
    pricePerNight: 8500,
    distance: '1 km from the City Centre',
    isAllInclusive: true,
    amenities: ['Free Wifi', 'Pool', 'Breakfast Included'],
    totalBeds: 52,
    filledBeds: 45,
    tenantCapacity: 52,
    upcomingTenants: 3,
    noticePeriodTenants: 2,
    monthlyRentTarget: 340000,
    monthlyExpenseBudget: 85000,
  },
  {
    id: 'p2',
    name: 'Blue Horizon Hostel',
    type: 'Hostel',
    totalRooms: 100,
    availableRooms: 12,
    location: 'Kas',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 7.5,
    ratingText: 'Good',
    reviewCount: 702,
    pricePerNight: 6500,
    distance: '1.2 km from the City Centre',
    isAllInclusive: true,
    amenities: ['Free Wifi', 'Pool'],
    totalBeds: 130,
    filledBeds: 118,
    tenantCapacity: 130,
    upcomingTenants: 8,
    noticePeriodTenants: 5,
    monthlyRentTarget: 650000,
    monthlyExpenseBudget: 140000,
  },
  {
    id: 'p3',
    name: 'Oakwood Apartments',
    type: 'Apartment',
    totalRooms: 20,
    availableRooms: 0,
    location: 'Kas',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 8.5,
    ratingText: 'Good',
    reviewCount: 600,
    pricePerNight: 25000,
    distance: '0.4 km from the City Centre',
    isAllInclusive: true,
    amenities: ['Free Wifi', 'Adults Only', 'Breakfast Included'],
    totalBeds: 48,
    filledBeds: 44,
    tenantCapacity: 48,
    upcomingTenants: 2,
    noticePeriodTenants: 1,
    monthlyRentTarget: 500000,
    monthlyExpenseBudget: 120000,
  },
  {
    id: 'p4',
    name: 'Marin Hotel',
    type: 'Hotel',
    totalRooms: 35,
    availableRooms: 8,
    location: 'Kas',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 8.7,
    ratingText: 'Very Good',
    reviewCount: 700,
    pricePerNight: 12000,
    distance: '0.1 km from the City Centre',
    isAllInclusive: true,
    amenities: ['Free Wifi', 'Pool', 'Beachfront'],
    totalBeds: 70,
    filledBeds: 54,
    tenantCapacity: 70,
    upcomingTenants: 4,
    noticePeriodTenants: 3,
    monthlyRentTarget: 420000,
    monthlyExpenseBudget: 105000,
  },
];

export const mockRooms: Room[] = [
  { id: 'r1', propertyId: 'p1', roomNumber: '101', type: 'Single', capacity: 1, price: 8500, status: 'Occupied' },
  { id: 'r2', propertyId: 'p1', roomNumber: '102', type: 'Double', capacity: 2, price: 8500, status: 'Occupied' },
  { id: 'r3', propertyId: 'p1', roomNumber: '105', type: 'Double', capacity: 2, price: 8500, status: 'Occupied' },
  { id: 'r4', propertyId: 'p1', roomNumber: '201', type: 'Suite', capacity: 4, price: 15000, status: 'Available' },
  { id: 'r5', propertyId: 'p1', roomNumber: '202', type: 'Suite', capacity: 4, price: 15000, status: 'Maintenance' },
  { id: 'r6', propertyId: 'p2', roomNumber: '301', type: 'Single', capacity: 1, price: 4500, status: 'Available' },
  { id: 'r7', propertyId: 'p2', roomNumber: '304B', type: 'Double', capacity: 2, price: 6500, status: 'Occupied' },
  { id: 'r8', propertyId: 'p2', roomNumber: '401', type: 'Dorm', capacity: 5, price: 2000, status: 'Available' },
  { id: 'r9', propertyId: 'p3', roomNumber: 'A-402', type: 'Suite', capacity: 4, price: 25000, status: 'Available' },
  { id: 'r10', propertyId: 'p3', roomNumber: 'B-201', type: 'Suite', capacity: 4, price: 25000, status: 'Occupied' },
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
  { id: 'txn_101', date: '2026-05-18T10:30:00Z', description: 'Rent Payment', amount: 8500, type: 'Income', status: 'Completed', propertyId: 'p1', roomNumber: '102', category: 'Rent', referenceId: 'rent_101' },
  { id: 'txn_102', date: '2026-05-18T14:15:00Z', description: 'Plumbing Repair - Blue Horizon', amount: 1500, type: 'Expense', status: 'Completed', propertyId: 'p2' },
  { id: 'txn_103', date: '2026-05-17T09:00:00Z', description: 'Advance Rent', amount: 25000, type: 'Income', status: 'Completed', propertyId: 'p3', roomNumber: 'B-201', category: 'Rent', referenceId: 'rent_103' },
  { id: 'txn_104', date: '2026-05-16T11:45:00Z', description: 'Partial Rent', amount: 4500, type: 'Income', status: 'Pending', propertyId: 'p1', roomNumber: '105', category: 'Rent', referenceId: 'rent_104' },
  { id: 'txn_105', date: '2026-05-15T16:20:00Z', description: 'Internet Bill Payment', amount: 2999, type: 'Expense', status: 'Completed', propertyId: 'p1' },
  { id: 'txn_106', date: '2026-05-14T08:30:00Z', description: 'Security Deposit Refund', amount: 4500, type: 'Refund', status: 'Completed', propertyId: 'p2', roomNumber: '304B', category: 'Security Deposit', referenceId: 'rent_106' },
  { id: 'txn_107', date: '2026-05-12T13:00:00Z', description: 'Electricity Bill - Oakwood', amount: 8500, type: 'Expense', status: 'Pending', propertyId: 'p3' },
  { id: 'txn_108', date: '2026-05-11T12:10:00Z', description: 'Rent Payment', amount: 12000, type: 'Income', status: 'Completed', propertyId: 'p4', roomNumber: '204', category: 'Rent', referenceId: 'rent_108' },
  { id: 'txn_109', date: '2026-05-10T09:30:00Z', description: 'Lift Service - Marin Hotel', amount: 6200, type: 'Expense', status: 'Completed', propertyId: 'p4' },
  { id: 'txn_110', date: '2026-05-08T10:00:00Z', description: 'Security Deposit', amount: 17000, type: 'Income', status: 'Completed', propertyId: 'p1', roomNumber: '101', category: 'Security Deposit', referenceId: 'dep_110' },
  { id: 'txn_111', date: '2026-05-07T11:00:00Z', description: 'Security Deposit', amount: 13000, type: 'Income', status: 'Pending', propertyId: 'p2', roomNumber: '401', category: 'Security Deposit', referenceId: 'dep_111' },
  { id: 'txn_112', date: '2026-05-06T09:30:00Z', description: 'Rent Payment', amount: 8500, type: 'Income', status: 'Pending', propertyId: 'p1', roomNumber: '201', category: 'Rent', referenceId: 'rent_112' },
  { id: 'txn_113', date: '2026-05-05T14:00:00Z', description: 'Security Deposit Refund', amount: 25000, type: 'Refund', status: 'Pending', propertyId: 'p3', roomNumber: 'A-402', category: 'Security Deposit', referenceId: 'dep_113' },
];

export const mockComplaints: Complaint[] = [
  { id: 'cmp_101', propertyId: 'p1', timestamp: '2026-05-17T09:20:00Z', complaint: 'Bathroom tap leakage in room 102', type: 'Maintenance', action: 'Solving' },
  { id: 'cmp_102', propertyId: 'p2', timestamp: '2026-05-16T16:45:00Z', complaint: 'Common area cleaning delayed', type: 'Housekeeping', action: 'Solved' },
  { id: 'cmp_103', propertyId: 'p3', timestamp: '2026-05-15T11:10:00Z', complaint: 'Rent receipt correction requested', type: 'Rent', action: 'Solving' },
  { id: 'cmp_104', propertyId: 'p4', timestamp: '2026-05-14T21:35:00Z', complaint: 'Visitor entry dispute at reception', type: 'Security', action: 'Denied' },
  { id: 'cmp_105', propertyId: 'p1', timestamp: '2026-05-13T08:05:00Z', complaint: 'Wi-Fi speed issue on second floor', type: 'Maintenance', action: 'Solved' },
];

export const mockTenants: Tenant[] = [
  { id: 'tenant_101', name: 'Rahul Sharma', propertyName: 'Sunrise PG', roomNumber: '102', bedNumber: 'B1', phone: '+91 98765 43210', rentStatus: 'Paid', moveInDate: '2026-02-10', status: 'Active' },
  { id: 'tenant_102', name: 'Priya Patel', propertyName: 'Blue Horizon Hostel', roomNumber: '304B', bedNumber: 'B2', phone: '+91 98765 43211', rentStatus: 'Pending', moveInDate: '2026-05-22', status: 'Upcoming' },
  { id: 'tenant_103', name: 'Amit Kumar', propertyName: 'Oakwood Apartments', roomNumber: 'B-201', bedNumber: 'B1', phone: '+91 98765 43212', rentStatus: 'Paid', moveInDate: '2026-01-18', status: 'Active' },
  { id: 'tenant_104', name: 'Sneha Reddy', propertyName: 'Marin Hotel', roomNumber: '204', bedNumber: 'B1', phone: '+91 98765 43213', rentStatus: 'Overdue', moveInDate: '2025-11-05', status: 'Notice Period' },
  { id: 'tenant_105', name: 'Vikram Singh', propertyName: 'Sunrise PG', roomNumber: '105', bedNumber: 'B2', phone: '+91 98765 43214', rentStatus: 'Paid', moveInDate: '2026-03-01', status: 'Active' },
];

export const mockStats: DashboardStats = {
  totalProperties: 3,
  totalRooms: 160,
  occupancyRate: 89,
  monthlyRevenue: 160000,
  activeGuests: 143,
  pendingRentItems: 8,
};

export const fetchProperties = async (): Promise<Property[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockProperties), 500));
};

export const fetchRooms = async (): Promise<Room[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockRooms), 500));
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockStats), 600));
};

export const fetchRevenueData = async (): Promise<RevenueData[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockRevenueData), 800));
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTransactions), 600));
};

export const fetchComplaints = async (): Promise<Complaint[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockComplaints), 500));
};

export const fetchTenants = async (): Promise<Tenant[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTenants), 500));
};

export const fetchRoomsByPropertyId = async (propertyId: string): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRooms.filter((room) => room.propertyId === propertyId));
    }, 400);
  });
};
