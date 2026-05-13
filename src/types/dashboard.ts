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
  paymentStatus?: 'Paid' | 'Partial' | 'Unpaid';
  source?: 'Direct' | 'Booking.com' | 'Airbnb' | 'Agoda';
  guestEmail?: string;
  guestPhone?: string;
  specialRequests?: string;
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
  referenceId?: string; // e.g. Booking ID, Invoice #
}

export interface DashboardStats {
  totalProperties: number;
  totalRooms: number;
  occupancyRate: number; // percentage
  monthlyRevenue: number;
  activeGuests: number;
  pendingBookings: number;
}
