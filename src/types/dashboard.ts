export interface Property {
  id: string;
  name: string;
  type: 'Hotel' | 'PG' | 'Hostel' | 'Apartment';
  totalRooms: number;
  availableRooms: number;
  location: string;
  status: 'Active' | 'Maintenance' | 'Inactive';
  // New fields for the rich properties view
  imageUrl?: string;
  rating?: number;
  ratingText?: string;
  reviewCount?: number;
  pricePerNight?: number;
  amenities?: string[];
  distance?: string;
  isAllInclusive?: boolean;
  totalBeds?: number;
  filledBeds?: number;
  tenantCapacity?: number;
  upcomingTenants?: number;
  noticePeriodTenants?: number;
  monthlyRentTarget?: number;
  monthlyExpenseBudget?: number;
}

export interface Room {
  id: string;
  propertyId: string;
  roomNumber: string;
  type: 'Single' | 'Double' | 'Suite' | 'Dorm';
  capacity: number;
  price: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense' | 'Refund';
  status: 'Completed' | 'Pending' | 'Failed';
  propertyId?: string;
  roomNumber?: string;
  category?: 'Rent' | 'Security Deposit' | 'Expense';
  expenseCategory?: 'All Property' | 'Property' | 'Others';
  expenseName?: string;
  expenseType?: string;
  referenceId?: string;
}

export interface Complaint {
  id: string;
  propertyId: string;
  timestamp: string;
  complaint: string;
  type: 'Maintenance' | 'Rent' | 'Housekeeping' | 'Security';
  action: 'Solved' | 'Solving' | 'Denied';
}

export interface Tenant {
  id: string;
  name: string;
  tenantType?: 'Bachelor' | 'Family' | 'Couple';
  propertyId?: string;
  propertyName: string;
  roomId?: string;
  roomNumber: string;
  bedNumber: string;
  phone: string;
  address?: string;
  parentName?: string;
  parentMobileNumber?: string;
  onboardingType?: 'One Day' | 'One Week' | 'Long Stay';
  fixedRent?: number;
  securityDeposit?: number;
  electricity?: {
    unitCost: number;
    initialReading: number;
    remarks?: string;
  };
  rentStatus: 'Paid' | 'Pending' | 'Overdue';
  moveInDate: string;
  status: 'Active' | 'Upcoming' | 'Notice Period';
}

export interface DashboardStats {
  totalProperties: number;
  totalRooms: number;
  occupancyRate: number; // percentage
  monthlyRevenue: number;
  activeGuests: number;
  pendingRentItems: number;
}
