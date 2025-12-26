
import { Customer, Service, Appointment, AppointmentStatus } from './types';

export const SERVICES: Service[] = [
  { id: '1', name: 'Tuns Clasic', price: 50, durationMinutes: 30, category: 'Hair' },
  { id: '2', name: 'Tuns & Barbă', price: 80, durationMinutes: 45, category: 'Full' },
  { id: '3', name: 'Aranjat Barbă', price: 30, durationMinutes: 15, category: 'Beard' },
  { id: '4', name: 'Vopsit', price: 100, durationMinutes: 60, category: 'Color' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Andrei Popescu', phone: '0722123456', email: 'andrei@example.com', totalSpent: 450, visitsCount: 6, lastVisit: '2023-10-20' },
  { id: 'c2', name: 'Ion Marin', phone: '0733987654', email: 'ion.m@example.com', totalSpent: 120, visitsCount: 2, lastVisit: '2023-11-15' },
  { id: 'c3', name: 'Radu Ionescu', phone: '0744555666', email: 'radu@test.ro', totalSpent: 800, visitsCount: 12, lastVisit: '2023-11-28' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { 
    id: 'a1', 
    customerId: 'c1', 
    customerName: 'Andrei Popescu', 
    serviceId: '1', 
    serviceName: 'Tuns Clasic', 
    barberName: 'Alex', 
    date: '2023-12-01', 
    startTime: '10:00', 
    status: AppointmentStatus.CONFIRMED,
    price: 50
  },
  { 
    id: 'a2', 
    customerId: 'c3', 
    customerName: 'Radu Ionescu', 
    serviceId: '2', 
    serviceName: 'Tuns & Barbă', 
    barberName: 'Alex', 
    date: '2023-12-01', 
    startTime: '11:30', 
    status: AppointmentStatus.PENDING,
    price: 80
  }
];
