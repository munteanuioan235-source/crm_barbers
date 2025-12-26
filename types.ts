
export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  category: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit?: string;
  notes?: string;
  totalSpent: number;
  visitsCount: number;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  barberName: string;
  date: string;
  startTime: string;
  status: AppointmentStatus;
  price: number;
}

export interface DashboardStats {
  totalRevenue: number;
  activeCustomers: number;
  appointmentsToday: number;
  avgOrderValue: number;
}
